/**
 * 题目：删除有序数组中的重复项（Remove Duplicates from Sorted Array）
 * 目标：原地删除有序数组中的重复元素，并返回去重后长度。
 * 核心思路：
 * 1. 因为数组已经有序，相同元素一定相邻。
 * 2. 用 fast 遍历数组，用 slow 指向“下一个应写入唯一值的位置”。
 * 3. 当 fast 遇到新值时，把它覆盖写到 slow 位置，并让 slow 前进。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 该题要求原地修改，不能额外开数组存结果。
 * 2. 判断是否为新值时，可以和前一个元素比较，因为数组有序。
 * 3. 面试中可明确 slow 的含义：它既是写指针，也是当前有效长度。
 */
function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let slow = 1;
  for (let fast = 1; fast < nums.length; fast += 1) {
    // 只有遇到新值时，才写入有效区间。
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow += 1;
    }
  }

  return slow;
}

const nums = [1, 1, 2, 2, 3];
const len = removeDuplicates(nums);
console.log(len, nums.slice(0, len));
