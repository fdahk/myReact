/**
 * 题目：打家劫舍（House Robber）
 * 目标：在不能偷相邻房屋的前提下，求可偷到的最大金额。
 * 核心思路：
 * 1. 这是线性 DP：走到当前房屋时，只有“偷”或“不偷”两种选择。
 * 2. 设 prev1 表示前一间房结束时的最优值，prev2 表示前两间房结束时的最优值。
 * 3. 当前最优值为 max(不偷当前房 = prev1, 偷当前房 = prev2 + num)。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(1)，使用滚动变量代替 DP 数组。
 * 易错点 / 面试表达：
 * 1. 状态压缩时更新顺序不能错，必须先算 current，再推进 prev2/prev1。
 * 2. 本题的约束核心是“相邻不能同时选”，所以转移只会依赖 i - 1 和 i - 2。
 * 3. 面试里可说清楚：这是从一维 DP 数组优化到滚动变量的经典例子。
 */
function rob(nums) {
  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    // 偷当前房就要接 prev2，不偷当前房就延续 prev1。
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

console.log(rob([2, 7, 9, 3, 1]));
