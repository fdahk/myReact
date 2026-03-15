/*
实现目标：
- 实现一个请求池，在批量请求场景下控制最大并发数，避免一次性打爆网络或服务端。
-
核心思路：
- 这类题和并发限制器本质一致，都是“队列 + 运行中计数”的调度模型。
- 新请求先进入等待队列；当活跃请求数小于上限时，从队列中取一个开始执行。
- 请求结束后释放槽位，再继续拉起队列中的下一个请求。
-
复杂度 / 运行特征：
- 每个请求入队、出队和完成回收各发生一次，总体调度复杂度可近似看作 O(n)。
- 当前请求池本身不关心结果聚合顺序，外层若用 `Promise.all`，最终结果顺序依然由调用顺序决定。
- 失败请求不会阻塞池子继续工作，只会让对应 Promise 进入 rejected 状态。
-
易错点：
- 只控制“发起数量”而不在结束后继续补位，队列会停住。
- 若某个请求同步抛错，没有统一包装就可能绕过错误处理。
- 面试时要区分“请求池”和“重试机制”，它们常同时出现，但解决的问题不同。
-
适用场景 / 面试表达点：
- 常见于文件上传、批量数据拉取、图片预加载等需要平衡速度与资源占用的场景。
- 表达时可以把请求池概括成“面向请求任务的并发限制器”，这句话通常很加分。
*/

function createRequestPool(limit) {
  let activeCount = 0;
  const queue = [];

  const run = () => {
    if (activeCount >= limit || queue.length === 0) {
      return;
    }

    const { request, resolve, reject } = queue.shift();
    activeCount += 1;

    Promise.resolve()
      // 统一包裹 request，兼容其同步抛错和异步返回 Promise 两种情况。
      .then(request)
      .then(resolve, reject)
      .finally(() => {
        // 一个请求完成后立刻释放额度，并补位下一个等待请求。
        activeCount -= 1;
        run();
      });
  };

  return function addRequest(request) {
    return new Promise((resolve, reject) => {
      queue.push({ request, resolve, reject });
      // 每次加入请求后都尝试启动调度。
      run();
    });
  };
}

const addRequest = createRequestPool(2);
const request = (name, time) => () => new Promise((resolve) => setTimeout(() => resolve(name), time));

Promise.all([
  addRequest(request('A', 300)),
  addRequest(request('B', 100)),
  addRequest(request('C', 200)),
]).then(console.log);
