/*
实现目标：
- 封装一个可取消请求的最小模型，让调用方既能拿到请求 Promise，也能在需要时主动取消。
-
核心思路：
- “取消请求”通常包含两层含义：一层是业务上忽略旧结果，另一层是底层真正终止异步任务。
- 这里使用 `AbortController` 来表达第二层含义：把 `signal` 传给请求函数，由请求函数决定如何响应取消。
- 外部只暴露两个能力：`promise` 用于等待结果，`cancel` 用于触发取消信号。
-
复杂度 / 运行特征：
- 封装本身是 O(1)，不额外引入调度队列或复杂状态机。
- 实际是否“真正取消”取决于底层请求是否监听 `AbortSignal`。
- 这个模式很适合说明前端请求取消并不是“把 Promise 杀掉”，而是通过信号协调底层任务结束。
-
易错点：
- 仅仅忽略结果不等于真正中断请求，两者在资源占用和副作用上不同。
- 如果底层逻辑没有监听 `abort` 事件，调用 `cancel` 也不会产生实际取消效果。
- 取消后应避免旧请求回流覆盖新界面，这是搜索联想、切换 tab 等场景的经典坑点。
-
适用场景 / 面试表达点：
- 适用于搜索联想、页面切换、会话切换、重复点击触发的新旧请求竞争问题。
- 面试时可以主动补充“现代浏览器里 fetch + AbortController 是最常见组合”。
*/

function createCancellableRequest(request) {
  const controller = new AbortController();
  // 把取消信号交给底层请求，让请求内部决定如何响应中断。
  const promise = request(controller.signal);

  return {
    promise,
    cancel() {
      // 触发 abort 后，底层若已订阅 signal，就会走取消分支。
      controller.abort();
    },
  };
}

function mockFetch(signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve('success'), 500);
    signal.addEventListener('abort', () => {
      // 请求被取消时清理定时器，并让 Promise 以失败态结束。
      clearTimeout(timer);
      reject(new Error('request aborted'));
    });
  });
}

const task = createCancellableRequest(mockFetch);
setTimeout(() => task.cancel(), 100);
task.promise.catch((error) => console.log(error.message));
