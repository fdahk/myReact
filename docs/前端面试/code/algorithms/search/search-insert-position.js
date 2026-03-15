/**
 * 题目：搜索插入位置（Search Insert Position）
 * 目标：在有序数组中找到 target 的位置；若不存在，返回它应插入的位置。
 * 核心思路：
 * 1. 标准二分查找，持续缩小目标所在区间。
 * 2. 如果找到 target 直接返回 mid。
 * 3. 如果最终未找到，left 会停在第一个大于 target 的位置，也就是插入位置。
 * 时间复杂度：O(log n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 循环结束条件是 left > right，此时 left 恰好表示插入点。
 * 2. 这里采用闭区间 [left, right] 写法，所以更新时要用 mid +/- 1。
 * 3. 面试时可以强调：二分不只是“查找存在性”，也常用于“找边界/找插入点”。
 */
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

console.log(searchInsert([1, 3, 5, 6], 5));
console.log(searchInsert([1, 3, 5, 6], 2));
