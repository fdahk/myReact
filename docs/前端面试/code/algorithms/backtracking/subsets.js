/**
 * 题目目标：返回数组的所有子集（幂集）。
 * 核心思路：把问题看成一棵决策树，从某个起点开始不断决定“选哪些后续元素”。
 * 在回溯的每一层，都先把当前路径加入结果，因为任意阶段的路径本身就是一个合法子集。
 * 时间复杂度：O(n * 2^n)，共有 2^n 个子集，每次加入结果需要拷贝当前路径。
 * 空间复杂度：O(n)，主要来自递归栈和路径数组。
 * 易错点 / 面试表达点：
 * 1. 子集问题与排列问题不同，不需要 `used` 数组，因为元素只会按顺序向后选择。
 * 2. 每一层先收集当前路径，是这类“组合枚举”题的常见写法。
 * 3. 递归参数 `start` 用来保证不会回头选前面的元素，避免重复子集。
 */
function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    // 当前路径本身就是一个合法子集，包括空集。
    result.push([...path]);

    for (let i = start; i < nums.length; i += 1) {
      path.push(nums[i]);
      backtrack(i + 1);
      // 撤销选择，继续枚举同层下一个元素。
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

console.log(subsets([1, 2, 3]));
