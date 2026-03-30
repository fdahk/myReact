/*
实现目标：
- 手写快速排序，理解分治与基准划分。
-
核心思路：
- 选择一个 pivot，把数组划分成小于 pivot 和大于等于 pivot 两部分。
- 分别递归排序左右两边，最后拼接结果。
- 这是面试里最容易先写清思路的“非原地版”。
-
复杂度 / 运行特征：
- 平均时间复杂度 O(n log n)，最坏 O(n^2)。
- 当前实现空间复杂度不是 O(1)，因为使用了额外数组。
-
易错点：
- 要主动说明“这是易讲解版，若面试官要求原地分区可以继续升级”。
- 选基准不当会导致最坏复杂度退化。
*/

function quickSort(nums) {
  if (nums.length <= 1) {
    return nums.slice();
  }

  const pivot = nums[0];
  const left = [];
  const right = [];

  for (let index = 1; index < nums.length; index += 1) {
    if (nums[index] < pivot) {
      left.push(nums[index]);
    } else {
      right.push(nums[index]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([5, 1, 6, 2, 4, 3]));
