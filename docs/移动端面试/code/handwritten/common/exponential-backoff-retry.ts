function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retryWithBackoff<T>(
  task: () => Promise<T>,
  options: {
    retries?: number;
    baseDelay?: number;
  } = {},
) {
  const { retries = 3, baseDelay = 300 } = options;

  let attempt = 0;
  let lastError: unknown;

  while (attempt <= retries) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt === retries) {
        break;
      }

      const delay = baseDelay * 2 ** attempt;
      await sleep(delay);
      attempt += 1;
    }
  }

  throw lastError;
}

/*
面试讲解点：
1. 这题本质是在弱网场景下做“可恢复但不过度打爆服务端”的重试。
2. 指数退避的关键不是重试本身，而是让每次失败后的等待逐步拉长。
3. 真项目里要补可重试请求筛选、抖动 jitter、最大等待时间和取消能力。
*/
