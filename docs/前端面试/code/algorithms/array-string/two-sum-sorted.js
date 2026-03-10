function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left, right];
    }
    if (sum < target) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return [];
}

console.log(twoSumSorted([2, 7, 11, 15], 9));
