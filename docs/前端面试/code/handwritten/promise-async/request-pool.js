/*
面试讲解点：请求池
- 题目本质：本质和并发限制器类似，但更强调批量请求场景下的队列调度。
- 复杂度：总体调度通常 O(n)。
- 易错点：最大并发、失败重试、结果顺序、某个请求失败时整体策略。
- 追问方向：可以延伸到图片上传、批量接口调度。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
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
      .then(request)
      .then(resolve, reject)
      .finally(() => {
        activeCount -= 1;
        run();
      });
  };

  return function addRequest(request) {
    return new Promise((resolve, reject) => {
      queue.push({ request, resolve, reject });
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
