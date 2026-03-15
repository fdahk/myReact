/**
 * 题目：零钱兑换（Coin Change）
 * 目标：给定若干硬币面额，求凑出指定金额所需的最少硬币数。
 * 核心思路：
 * 1. 设 dp[i] 表示凑出金额 i 所需的最少硬币数。
 * 2. 枚举每个金额 i，再尝试每一种硬币 coin，看能否从 dp[i - coin] 转移过来。
 * 3. 若某金额无法凑出，就保持为 Infinity，最后统一转成 -1。
 * 时间复杂度：O(amount * coins.length)。
 * 空间复杂度：O(amount)。
 * 易错点 / 面试表达：
 * 1. dp[0] 必须初始化为 0，它是所有状态转移的起点。
 * 2. Infinity 是“不可达”的哨兵值，返回时别忘了转为 -1。
 * 3. 面试里可以强调：这是完全背包的最小值版本。
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i += 1) {
    for (const coin of coins) {
      if (i >= coin) {
        // 选择最后一枚硬币为 coin，尝试更新更优解。
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11));
