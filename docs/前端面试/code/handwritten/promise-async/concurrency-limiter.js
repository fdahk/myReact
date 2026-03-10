/*
面试讲解点：并发限制器
- 题目本质：本质是维护一个运行中的任务池，保证同时执行数不超过上限。
- 复杂度：调度过程总体 O(n)。
- 易错点：任务完成后及时补位、错误是否中断整体、结果顺序是否保留。
- 追问方向：可以追问请求池、大文件上传并发、爬虫调度。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function createLimiter(limit) {
  let activeCount = 0;
  const queue = [];

  const runNext = () => {
    if (activeCount >= limit || queue.length === 0) {
      return;
    }

    const { task, resolve, reject } = queue.shift();
    activeCount += 1;

    Promise.resolve()
      .then(task)
      .then(resolve, reject)
      .finally(() => {
        activeCount -= 1;
        runNext();
      });
  };

  return function limitTask(task) {
    return new Promise((resolve, reject) => {
      queue.push({ task, resolve, reject });
      runNext();
    });
  };
}

const limitTask = createLimiter(2);
const sleep = (time, value) => new Promise((resolve) => setTimeout(() => resolve(value), time));

Promise.all([
  limitTask(() => sleep(300, 'A')),
  limitTask(() => sleep(100, 'B')),
  limitTask(() => sleep(200, 'C')),
]).then(console.log);
