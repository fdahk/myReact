type TokenGetter = () => string | null;
type TokenRefresher = () => Promise<string>;

export function createTokenManager(
  getToken: TokenGetter,
  refreshToken: TokenRefresher,
) {
  let refreshingPromise: Promise<string> | null = null;

  async function getValidToken() {
    const current = getToken();
    if (current) {
      return current;
    }

    if (!refreshingPromise) {
      refreshingPromise = refreshToken().finally(() => {
        refreshingPromise = null;
      });
    }

    return refreshingPromise;
  }

  return {
    getValidToken,
  };
}

/*
面试讲解点：
1. 这题本质是“避免多个请求同时发现 token 过期后一起刷新”。
2. 核心状态只有一个：refreshingPromise。
3. 第一个请求负责真正刷新，后续请求直接复用同一个 Promise。
4. 真项目里通常还会补失败清理、登出、原请求排队重放等能力。
*/
