function searchRange(nums, target) {
  function lowerBound(value) {
    let left = 0;
    let right = nums.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] < value) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }

  const start = lowerBound(target);
  const end = lowerBound(target + 1) - 1;
  if (start >= nums.length || nums[start] !== target) {
    return [-1, -1];
  }
  return [start, end];
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
