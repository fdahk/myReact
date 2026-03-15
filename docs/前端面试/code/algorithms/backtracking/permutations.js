/**
 * 题目目标：返回数组的所有全排列。
 * 核心思路：回溯逐位构造排列。
 * `path` 表示当前已经选出的排列前缀，`used[i]` 表示下标 `i` 的元素是否已被当前分支使用；
 * 当 `path` 长度等于数组长度时，说明得到一个完整排列。
 * 时间复杂度：O(n * n!)，共有 n! 个排列，每次生成结果需要拷贝长度为 n 的路径。
 * 空间复杂度：O(n)，主要来自递归栈、`used` 数组和 `path`。
 * 易错点 / 面试表达点：
 * 1. 全排列题的关键是“同一层枚举候选，同一路径上避免重复使用”。
 * 2. 结果入数组时必须拷贝 `path`，否则后续回溯会污染结果。
 * 3. 如果题目包含重复元素，还需要额外的去重策略。
 */
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
      // 回溯时恢复现场，供上一层尝试其他数字。
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

console.log(permute([1, 2, 3]));
