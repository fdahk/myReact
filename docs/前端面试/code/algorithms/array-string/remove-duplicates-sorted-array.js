function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let slow = 1;
  for (let fast = 1; fast < nums.length; fast += 1) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow += 1;
    }
  }

  return slow;
}

const nums = [1, 1, 2, 2, 3];
const len = removeDuplicates(nums);
console.log(len, nums.slice(0, len));
