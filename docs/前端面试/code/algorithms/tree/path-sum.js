/**
 * 题目目标：判断二叉树中是否存在一条从根节点到叶子节点的路径，使路径和等于给定目标值。
 * 核心思路：深度优先递归遍历，每向下走一层就用目标和减去当前节点值；
 * 当走到叶子节点时，判断剩余目标值是否恰好等于该叶子值。
 * 时间复杂度：O(n)，最坏情况下需要访问所有节点。
 * 空间复杂度：O(h)，h 为树高，主要来自递归栈。
 * 易错点 / 面试表达点：
 * 1. 题目要求必须是“根到叶子”的完整路径，不能在中途节点提前返回 true。
 * 2. 到达叶子时再判断是否命中目标，是这道题最关键的边界条件。
 * 3. 参数递减式写法很适合面试表达，因为含义直接、代码简洁。
 */
function hasPathSum(root, targetSum) {
  if (!root) {
    return false;
  }
  // 只有真正走到叶子节点时，当前剩余目标值才构成有效答案。
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }
  // 向下递归时，把当前节点值从目标和里扣掉。
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}
