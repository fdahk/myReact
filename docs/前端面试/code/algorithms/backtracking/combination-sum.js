function combinationSum(candidates, target) {
  const result = [];
  const path = [];

  function backtrack(start, remain) {
    if (remain === 0) {
      result.push([...path]);
      return;
    }
    if (remain < 0) {
      return;
    }

    for (let i = start; i < candidates.length; i += 1) {
      path.push(candidates[i]);
      backtrack(i, remain - candidates[i]);
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}

console.log(combinationSum([2, 3, 6, 7], 7));
