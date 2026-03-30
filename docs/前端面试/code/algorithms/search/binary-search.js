/*
实现目标：
- 手写经典二分查找，在有序数组中查找目标值下标。
-
核心思路：
- 使用左右指针夹逼中间位置。
- 若中间值大于目标，收缩右边界；反之收缩左边界。
- 找到目标立即返回下标，找不到返回 `-1`。
-
复杂度 / 运行特征：
- 时间复杂度 O(log n)，空间复杂度 O(1)。
-
易错点：
- 题目前提必须是有序数组。
- `mid` 计算要注意避免某些语言的整型溢出；JS 虽然影响较小，但面试表达最好说出来。
*/

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 7));
