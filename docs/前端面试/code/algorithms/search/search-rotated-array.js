/**
 * 题目：搜索旋转排序数组（Search in Rotated Sorted Array）
 * 目标：在经过旋转的升序数组中查找 target 的下标，不存在则返回 -1。
 * 核心思路：
 * 1. 数组虽然整体被旋转，但任意时刻 [left, mid] 或 [mid, right] 至少有一半仍然有序。
 * 2. 先判断哪一半有序，再判断 target 是否落在该有序区间中。
 * 3. 如果落在有序区间，就在那一半继续二分；否则去另一半搜索。
 * 时间复杂度：O(log n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 判断左半有序的条件是 nums[left] <= nums[mid]，等号不能漏。
 * 2. 判断 target 所在区间时，边界不等式要和二分区间保持一致。
 * 3. 面试中可强调：旋转数组的关键不是恢复有序，而是识别“哪半边有序”。
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[left] <= nums[mid]) {
      // 左半边有序，先判断目标是否落在左半边。
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else if (nums[mid] < target && target <= nums[right]) {
      // 否则右半边有序，并且目标在右半边。
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0));
