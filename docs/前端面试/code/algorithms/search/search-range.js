/**
 * 题目：在排序数组中查找元素的第一个和最后一个位置（Search Range）
 * 目标：在有序数组中找到 target 的起始和结束下标。
 * 核心思路：
 * 1. 不直接写两个不同的二分，而是抽象成 lowerBound(value)：返回第一个 >= value 的位置。
 * 2. target 的左边界是 lowerBound(target)。
 * 3. target 的右边界可以转化为 lowerBound(target + 1) - 1。
 * 时间复杂度：O(log n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 这里使用的是左闭右开区间 [left, right)，所以 right 初始化为 nums.length。
 * 2. 右边界不是直接找最后一个等于 target 的位置，而是找第一个大于 target 的位置再减一。
 * 3. 面试中可强调：统一 lowerBound 模板能减少边界错误。
 */
function searchRange(nums, target) {
  function lowerBound(value) {
    let left = 0;
    let right = nums.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] < value) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  const start = lowerBound(target);
  const end = lowerBound(target + 1) - 1;

  if (start >= nums.length || nums[start] !== target) {
    return [-1, -1];
  }

  return [start, end];
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
