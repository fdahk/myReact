/**
 * 题目：最长递增子序列（Longest Increasing Subsequence）
 * 目标：求数组中最长严格递增子序列的长度。
 * 核心思路：
 * 1. 使用贪心 + 二分维护数组 tails。
 * 2. tails[k] 表示“长度为 k + 1 的递增子序列，其结尾最小能是多少”。
 * 3. 对每个 num，用二分找到第一个大于等于它的位置并替换，从而让后续更容易接长。
 * 时间复杂度：O(n log n)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. tails 本身不一定是真实子序列，但它的长度一定等于 LIS 长度。
 * 2. 二分找的是第一个 >= num 的位置，不是第一个 > num 的位置。
 * 3. 面试中可强调：这是“让结尾尽可能小”的贪心思想。
 */
function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    // 二分查找第一个 >= num 的位置，用更小的尾值去更新它。
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    tails[left] = num;
  }

  return tails.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
