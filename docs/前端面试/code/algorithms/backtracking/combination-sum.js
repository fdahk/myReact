/**
 * 题目目标：从候选数组中找出所有和为目标值的组合，同一个数字可以被重复选择。
 * 核心思路：使用回溯枚举所有组合。
 * `path` 记录当前组合，`remain` 记录剩余目标值，`start` 控制下一层从哪个位置开始选，
 * 从而避免生成顺序不同但内容相同的重复组合。
 * 时间复杂度：取决于搜索树规模，最坏可近似看作指数级。
 * 空间复杂度：O(target) 到 O(n)，主要来自递归栈和路径数组，取决于组合深度。
 * 易错点 / 面试表达点：
 * 1. 因为允许重复使用当前元素，递归下一层仍然传 `i`，而不是 `i + 1`。
 * 2. 命中答案时要拷贝 `path`，不能直接推入引用。
 * 3. 回溯模板可以概括为“做选择 -> 递归 -> 撤销选择”。
 */
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
      // 允许重复选择同一元素，所以递归仍从 i 开始。
      backtrack(i, remain - candidates[i]);
      // 撤销本轮选择，回到上一层状态继续尝试别的分支。
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}

console.log(combinationSum([2, 3, 6, 7], 7));
