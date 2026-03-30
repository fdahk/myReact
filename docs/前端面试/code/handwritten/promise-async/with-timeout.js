/*
实现目标：
- 手写一个 `withTimeout`，给任意异步任务加上超时控制。
-
核心思路：
- 同时启动“真实任务 Promise”和“超时 Promise”。
- 谁先结束就采用谁的结果，本质上是 `Promise.race` 的典型应用。
- 无论谁先完成，都要清理超时定时器，避免资源泄漏。
-
复杂度 / 运行特征：
- 额外只引入一个定时器和一次竞速包装，可视为 O(1)。
- 超时后只是让包装后的 Promise 失败，不一定真的能中断底层请求；若要真取消，还需配合 `AbortController`。
-
易错点：
- 不清理定时器会导致任务已结束后超时回调仍被触发。
- 要区分“包装层超时”与“底层任务真中断”是两回事。
- 如果传入的是函数而不是 Promise，要先执行再包裹，避免调用方每次都自己写一层。
-
适用场景 / 面试表达点：
- 常用于接口超时兜底、任务保护、批处理容错。
- 面试里可以继续展开 `AbortController`、重试、并发池组合方案。
*/

function withTimeout(task, timeout, message = 'Request timeout') {
  const runTask = typeof task === 'function' ? task : () => task;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(message));
    }, timeout);

    Promise.resolve()
      .then(runTask)
      .then(resolve, reject)
      .finally(() => {
        clearTimeout(timer);
      });
  });
}

const slowTask = () => new Promise((resolve) => setTimeout(() => resolve('ok'), 300));

withTimeout(slowTask, 100).catch((error) => console.log(error.message));
