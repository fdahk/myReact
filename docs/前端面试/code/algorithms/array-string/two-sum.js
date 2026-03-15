/**
 * 题目：两数之和（Two Sum）
 * 目标：在数组中找到两个数，使它们的和等于 target，返回下标。
 * 核心思路：
 * 1. 一边遍历数组，一边用哈希表记录“某个值最后一次出现的位置”。
 * 2. 对当前 nums[i]，先看 target - nums[i] 是否已经出现过。
 * 3. 如果出现过，直接得到答案；否则把当前值写入哈希表，供后续元素匹配。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. 顺序上必须先查 need 再写当前值，避免把同一个元素重复使用。
 * 2. 哈希表存的是值到下标的映射，适合无序数组。
 * 3. 面试里可对比有序数组版本：无序用哈希，有序可降到双指针 + O(1) 空间。
 */
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    const need = target - nums[i];

    // 先找补数，再记录当前值，避免同一元素被重复匹配。
    if (map.has(need)) {
      return [map.get(need), i];
    }

    map.set(nums[i], i);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
