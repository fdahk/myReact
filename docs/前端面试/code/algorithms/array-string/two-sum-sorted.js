/**
 * 题目：两数之和 II - 输入有序数组（Two Sum II）
 * 目标：在有序数组中找到两个数，使其和等于 target，返回对应下标。
 * 核心思路：
 * 1. 利用数组递增有序的性质，使用左右双指针从两端向中间逼近。
 * 2. 当前和偏小就移动左指针，当前和偏大就移动右指针。
 * 3. 因为每次移动都能排除一部分不可能解，所以无需回头搜索。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 该写法返回的是 0-based 下标，若题目要求 1-based 需要额外处理。
 * 2. 双指针能成立的前提是“数组有序”，这是和哈希解法的本质区别。
 * 3. 面试里可以顺带说明：比哈希表更省空间，但依赖输入有序。
 */
function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left, right];
    }
    if (sum < target) {
      // 和偏小，增大较小的一侧。
      left += 1;
    } else {
      // 和偏大，减小较大的一侧。
      right -= 1;
    }
  }

  return [];
}

console.log(twoSumSorted([2, 7, 11, 15], 9));
