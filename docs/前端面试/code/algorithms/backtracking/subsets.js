function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push([...path]);

    for (let i = start; i < nums.length; i += 1) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

console.log(subsets([1, 2, 3]));
