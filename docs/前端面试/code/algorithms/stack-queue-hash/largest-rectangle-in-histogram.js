/**
 * 题目：柱状图中最大的矩形（Largest Rectangle in Histogram）
 * 目标：在柱状图中找出面积最大的矩形。
 * 核心思路：
 * 1. 用单调递增栈维护柱子的下标，保证栈内高度从低到高。
 * 2. 当遇到更矮的柱子时，说明栈顶柱子向右扩展的边界已经确定，可以立即结算面积。
 * 3. 在数组首尾补 0，能统一触发结算逻辑，避免单独清栈处理。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. 宽度计算是 i - stackTop - 1，其中 stackTop 是弹栈后新的左边界。
 * 2. 栈里存的是下标，不是高度，因为面积结算需要同时拿到高度和宽度边界。
 * 3. 面试中可强调：单调栈擅长找“左侧/右侧第一个更小元素”。
 */
function largestRectangleArea(heights) {
  const stack = [];
  const nums = [0, ...heights, 0];
  let result = 0;

  for (let i = 0; i < nums.length; i += 1) {
    while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
      const height = nums[stack.pop()];
      // 弹栈后新的栈顶就是左边第一个更小元素。
      const width = i - stack[stack.length - 1] - 1;
      result = Math.max(result, height * width);
    }
    stack.push(i);
  }

  return result;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
