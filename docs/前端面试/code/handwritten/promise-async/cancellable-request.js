/*
面试讲解点：可取消请求控制
- 题目本质：本质是把“请求结果是否还应该生效”和“底层请求是否中断”分开考虑。
- 复杂度：核心控制逻辑通常 O(1)。
- 易错点：取消后的状态一致性、旧请求结果污染新界面、AbortController 使用。
- 追问方向：可以追问搜索切换、会话切换场景。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function createCancellableRequest(request) {
  const controller = new AbortController();
  const promise = request(controller.signal);

  return {
    promise,
    cancel() {
      controller.abort();
    },
  };
}

function mockFetch(signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve('success'), 500);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('request aborted'));
    });
  });
}

const task = createCancellableRequest(mockFetch);
setTimeout(() => task.cancel(), 100);
task.promise.catch((error) => console.log(error.message));
