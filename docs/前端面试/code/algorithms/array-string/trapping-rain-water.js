function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let result = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      result += leftMax - height[left];
      left += 1;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      result += rightMax - height[right];
      right -= 1;
    }
  }

  return result;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
