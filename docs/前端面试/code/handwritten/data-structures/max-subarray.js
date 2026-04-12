/*
实现目标：
- 找出一个数组中和最大的连续子数组。

核心思路：
- 使用 Kadane 算法。
- `current` 表示“以当前位置结尾的最大连续和”。
- `max` 记录全局最大值。
*/

function maxSubArray(nums) {
  let current = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    max = Math.max(max, current);
  }

  return max;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
