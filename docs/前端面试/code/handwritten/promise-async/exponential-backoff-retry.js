/*
实现目标：
- 手写一个指数退避重试器，让失败任务按递增延迟自动重试。
-
核心思路：
- 失败后不是固定间隔重试，而是让等待时间按 `baseDelay * factor^attempt` 增长。
- 每次失败后判断是否还允许继续重试，以及当前错误是否值得重试。
- 重试前等待一段时间，再重新执行任务。
-
复杂度 / 运行特征：
- 最坏情况下会执行 `retries + 1` 次任务。
- 延迟时间随重试次数增长，可以减轻雪崩和瞬时打满下游服务的风险。
-
易错点：
- 要区分“最大重试次数”和“总尝试次数”。
- 并不是所有错误都应该重试，像参数错误这类通常应快速失败。
- 生产场景常会再加随机抖动，避免多个客户端同一时间重试。
-
适用场景 / 面试表达点：
- 常见于接口容错、轮询恢复、消息投递。
- 面试里可以补充“指数退避 + jitter + 熔断”的工程升级方向。
*/

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function retryWithBackoff(task, options = {}) {
  const {
    retries = 3,
    baseDelay = 100,
    factor = 2,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await task(attempt);
    } catch (error) {
      const canRetry = attempt < retries && shouldRetry(error, attempt);
      if (!canRetry) {
        throw error;
      }

      const delay = baseDelay * factor ** attempt;
      await sleep(delay);
      attempt += 1;
    }
  }
}

let count = 0;
retryWithBackoff(
  async () => {
    count += 1;
    if (count < 3) {
      throw new Error(`failed at ${count}`);
    }
    return 'success';
  },
  { retries: 4, baseDelay: 50 }
).then(console.log);
