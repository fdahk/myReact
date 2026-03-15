/*
实现目标：
- 在异步请求失败时按固定次数和固定间隔进行重试，直到成功或达到最大重试上限。
-
核心思路：
- 用循环包裹请求调用：每次尝试执行 `request()`，成功就立刻返回结果。
- 一旦失败，先记录最后一次错误；如果还没达到重试上限，就等待一段时间后再次尝试。
- 所有重试都失败时，最终把最后一次错误抛给调用方。
-
复杂度 / 运行特征：
- 如果最多尝试 `retries + 1` 次，则请求执行次数与重试次数线性相关。
- 总耗时大致等于“所有失败请求耗时 + 重试间隔之和 + 最终一次成功/失败耗时”。
- 当前实现采用固定延迟，便于讲清核心流程；工程里常扩展为指数退避。
-
易错点：
- `retries` 通常表示“失败后还能再试几次”，因此总尝试次数是 `retries + 1`。
- 不是所有错误都适合重试，例如参数错误、权限错误通常重试没有意义。
- 面试时最好主动提到幂等性，否则重试可能带来重复下单、重复写入等副作用问题。
-
适用场景 / 面试表达点：
- 适用于网络抖动、瞬时服务不可用、弱网环境下的接口容错。
- 面试表达时可顺带补充“真实项目会结合错误码过滤、指数退避和最大等待时间”。
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
      // 本例使用固定间隔重试，工程里常升级为指数退避。
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // 所有尝试都失败后，把最后一次错误抛给外层统一处理。
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
