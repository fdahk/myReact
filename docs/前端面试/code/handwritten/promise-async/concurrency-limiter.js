/*
实现目标：
- 实现一个通用并发限制器，控制同一时刻最多只有 `limit` 个异步任务同时运行。
-
核心思路：
- 维护两个核心状态：`activeCount` 表示当前正在执行的任务数，`queue` 表示等待执行的任务队列。
- 每当有新任务加入时，尝试触发 `runNext`；如果当前还有并发额度，就取出队头任务执行。
- 任务完成后在 `finally` 中释放一个执行名额，并立即拉起下一个等待中的任务。
-
复杂度 / 运行特征：
- 每个任务只会经历一次入队、一次出队和一次调度，总体调度复杂度可以认为是 O(n)。
- 该实现不会打乱调用方通过 `Promise.all` 收集结果时的顺序，因为顺序由外层 Promise 的位置决定。
- 任务失败不会阻塞队列继续推进，失败只会影响对应任务返回的 Promise。
-
易错点：
- 最容易漏掉的是“任务结束后要补位”，否则队列会卡住。
- 如果不把 `task` 放进 `Promise.resolve().then(task)`，同步抛错就可能绕过后续统一处理。
- 并发限制的是“同时执行数”，不是“总任务数”，面试时要把这两个概念说清楚。
-
适用场景 / 面试表达点：
- 常见于批量请求、图片上传、爬虫抓取、任务调度器等场景。
- 面试时可以总结成一句话：核心就是“队列 + 计数器 + 完成后补位”。
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
      // 用微任务包一层，统一处理同步任务和异步任务。
      .then(task)
      .then(resolve, reject)
      .finally(() => {
        // 无论成功还是失败，都要释放并发名额并继续调度。
        activeCount -= 1;
        runNext();
      });
  };

  return function limitTask(task) {
    return new Promise((resolve, reject) => {
      queue.push({ task, resolve, reject });
      // 每次有新任务入队后，都尝试消费一个可用并发槽位。
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
