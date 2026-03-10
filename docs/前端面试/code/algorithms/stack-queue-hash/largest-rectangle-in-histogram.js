function largestRectangleArea(heights) {
  const stack = [];
  const nums = [0, ...heights, 0];
  let result = 0;

  for (let i = 0; i < nums.length; i += 1) {
    while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
      const height = nums[stack.pop()];
      const width = i - stack[stack.length - 1] - 1;
      result = Math.max(result, height * width);
    }
    stack.push(i);
  }

  return result;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
