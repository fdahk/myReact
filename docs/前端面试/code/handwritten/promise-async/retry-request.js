/*
面试讲解点：重试请求
- 题目本质：本质是在失败后按策略再次尝试，但不能无脑无限重试。
- 复杂度：最坏时间和重试次数成线性关系。
- 易错点：最大重试次数、退避策略、哪些错误值得重试。
- 追问方向：可以追问指数退避和幂等性。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

async function retryRequest(request, retries = 3, delay = 200) {
  let lastError;

  for (let i = 0; i <= retries; i += 1) {
    try {
      return await request();
    } catch (error) {
      lastError = error;
      if (i === retries) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

let count = 0;
retryRequest(async () => {
  count += 1;
  if (count < 3) {
    throw new Error('temporary failure');
  }
  return 'success';
}).then(console.log);
