/**
 * 题目：接雨水（Trapping Rain Water）
 * 目标：给定柱状图高度数组，计算总共能接多少雨水。
 * 核心思路：
 * 1. 某个位置能接的水量由 min(左侧最高, 右侧最高) - 当前高度决定。
 * 2. 双指针从两端向中间移动，同时维护 leftMax 和 rightMax。
 * 3. 哪一侧更低，就先结算哪一侧，因为它的上界已经确定。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 结算左侧还是右侧，判断依据是当前左右高度，而不是 leftMax/rightMax。
 * 2. 每次都要先更新当前侧最大值，再计算能接的水量。
 * 3. 面试可对比三种解法：暴力、前后缀数组、双指针优化。
 */
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let result = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      // 左侧较低时，当前位置水位由 leftMax 决定。
      result += leftMax - height[left];
      left += 1;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      // 右侧较低时，当前位置水位由 rightMax 决定。
      result += rightMax - height[right];
      right -= 1;
    }
  }

  return result;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
