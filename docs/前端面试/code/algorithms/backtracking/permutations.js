function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  const path = [];

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) {
        continue;
      }

      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

console.log(permute([1, 2, 3]));
