/**
 * 题目：盛最多水的容器（Container With Most Water）
 * 目标：在数组中选择两条线，使它们与 x 轴围成的容器装水量最大。
 * 核心思路：
 * 1. 使用左右双指针从数组两端向中间收缩。
 * 2. 每一步面积由“短板高度 * 宽度”决定，因此短板才是瓶颈。
 * 3. 想要得到更大面积，只能移动较短的一侧，保留较长一侧作为潜在高边界。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 不能移动较高的那根线，因为短板不变时宽度只会变小，面积不可能更优。
 * 2. 面积公式里的高度必须取两边较小值，而不是较大值。
 * 3. 面试时可强调这是“双指针贪心”的典型证明题。
 */
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let result = 0;

  while (left < right) {
    const width = right - left;
    const area = Math.min(height[left], height[right]) * width;
    result = Math.max(result, area);

    // 只移动短板，才有机会遇到更高的边从而提升面积上限。
    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return result;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
