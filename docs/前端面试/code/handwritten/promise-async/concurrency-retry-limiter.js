/*
实现目标：
- 实现并发控制器，并支持失败重试和重试次数上限。

核心思路：
- `runWithRetry` 负责单任务重试。
- 多个 worker 共同消费任务队列，实现并发上限控制。
*/

async function runWithRetry(task, retries) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function promisePool(tasks, limit, retries = 2) {
  const results = new Array(tasks.length);
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const current = index++;
      results[current] = await runWithRetry(tasks[current], retries);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, () => worker()),
  );

  return results;
}

export { promisePool, runWithRetry };
