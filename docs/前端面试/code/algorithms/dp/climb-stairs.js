/**
 * 题目：爬楼梯（Climbing Stairs）
 * 目标：每次爬 1 或 2 阶，求到第 n 阶共有多少种不同走法。
 * 核心思路：
 * 1. 到第 n 阶之前，最后一步只能来自第 n - 1 阶或第 n - 2 阶。
 * 2. 因此状态转移为 f(n) = f(n - 1) + f(n - 2)，本质是斐波那契数列。
 * 3. 用两个滚动变量保存前两项，避免开完整 DP 数组。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. n <= 2 是天然边界，直接返回 n。
 * 2. 这是“计数型 DP”，不要误写成最值问题。
 * 3. 面试里可顺带说明状态压缩的原因：当前值只依赖前两项。
 */
function climbStairs(n) {
  if (n <= 2) {
    return n;
  }

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i += 1) {
    const next = first + second;
    first = second;
    second = next;
  }

  return second;
}

console.log(climbStairs(5));
