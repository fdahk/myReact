/*
实现目标：
- 手写一个基于 `fetch` 的最小请求封装。

核心思路：
- 统一合并默认配置和用户传参。
- `fetch` 返回后先判断 `response.ok`。
- 再按 JSON 形式解析结果。

易错点：
- `fetch` 默认不会因为 4xx/5xx 自动 reject。
- 请求取消通常要结合 `AbortController`。
*/

export async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function demo() {
  const user = await request<{ id: number; name: string }>('/api/user');
  console.log(user.name);
}

void demo();
