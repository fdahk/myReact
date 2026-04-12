type Requester<T> = (signal: AbortSignal) => Promise<T>;

export function createCancellableRequest<T>(requester: Requester<T>) {
  let controller: AbortController | null = null;

  async function run() {
    controller?.abort();
    controller = new AbortController();

    try {
      return await requester(controller.signal);
    } finally {
      controller = null;
    }
  }

  function cancel() {
    controller?.abort();
    controller = null;
  }

  return {
    run,
    cancel,
  };
}

/*
面试讲解点：
1. 这题本质是在解决“用户切页后，旧请求不应该继续污染新页面”。
2. 核心状态是当前正在使用的 AbortController。
3. run 时先取消旧请求，再发新请求，是最常见的移动端页面切换策略。
4. 真项目里通常还会补 requestId 校验，防止某些底层请求不支持真正 abort。
*/
