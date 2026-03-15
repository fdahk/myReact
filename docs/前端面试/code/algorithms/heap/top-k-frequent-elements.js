/**
 * 题目目标：返回数组中出现频率最高的前 k 个元素。
 * 核心思路：先用哈希表统计每个元素出现次数，再按频次从高到低排序，
 * 截取前 k 项并映射回元素值。
 * 时间复杂度：O(n + m log m)，n 为原数组长度，m 为不同元素个数；排序成本主导。
 * 空间复杂度：O(m)，主要来自频次表和排序过程中的中间结果。
 * 易错点 / 面试表达点：
 * 1. 这份实现的核心是“哈希统计 + 排序”，不是堆优化版。
 * 2. 如果面试追问更优解，可扩展到最小堆或桶排序，把复杂度降到 O(n log k) 或 O(n)。
 * 3. `Map` 很适合做频次统计，语义清晰且键类型更通用。
 */
function topKFrequent(nums, k) {
  const freq = new Map();
  // 先统计每个数字出现次数，为后续排序提供依据。
  nums.forEach((num) => freq.set(num, (freq.get(num) ?? 0) + 1));

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
