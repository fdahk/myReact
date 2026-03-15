/**
 * 题目：最长连续序列（Longest Consecutive Sequence）
 * 目标：求数组中最长连续整数序列的长度，要求线性时间。
 * 核心思路：
 * 1. 用 Set 支持 O(1) 判断某个数字是否存在。
 * 2. 只有当 num - 1 不存在时，num 才可能是一段连续序列的起点。
 * 3. 从每个真正的起点向后扩展，统计连续长度并更新答案。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. 不能从每个数字都往后扫，否则会退化成 O(n^2)。
 * 2. 去重后再遍历 Set 更自然，也避免重复起点。
 * 3. 面试时重点表达“只从序列起点开始扩展”的优化理由。
 */
function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (const num of set) {
    // 只有前驱不存在时，num 才是某段连续序列的起点。
    if (set.has(num - 1)) {
      continue;
    }

    let current = num;
    let length = 1;
    while (set.has(current + 1)) {
      current += 1;
      length += 1;
    }
    longest = Math.max(longest, length);
  }

  return longest;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
