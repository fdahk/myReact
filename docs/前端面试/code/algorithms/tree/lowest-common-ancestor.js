/**
 * 题目目标：在二叉树中找到两个节点 `p` 和 `q` 的最近公共祖先。
 * 核心思路：递归搜索左右子树。
 * 1. 若当前节点为空，或当前节点就是 `p / q`，直接返回当前节点；
 * 2. 若左右子树都找到了目标节点，说明当前节点就是最近公共祖先；
 * 3. 若只有一侧非空，则答案在那一侧继续向上返回。
 * 时间复杂度：O(n)，最坏需要遍历整棵树。
 * 空间复杂度：O(h)，主要来自递归栈。
 * 易错点 / 面试表达点：
 * 1. 返回值含义很关键：表示“当前子树中找到的目标节点或公共祖先”。
 * 2. 这题不需要额外存父指针，递归回溯过程天然能完成汇总。
 * 3. 如果题目改成二叉搜索树，还可以利用大小关系进一步剪枝。
 */
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 两边都能找到目标，说明当前节点是第一次“汇合”的位置。
  if (left && right) {
    return root;
  }

  return left ?? right;
}
