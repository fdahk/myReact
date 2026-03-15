/**
 * 题目目标：判断一棵二叉树是否为高度平衡二叉树。
 * 核心思路：使用后序遍历，自底向上计算每个节点左右子树高度；一旦发现某个节点左右高度差大于 1，
 * 则返回哨兵值 -1 向上层持续传递，避免在已经失衡的情况下继续做无意义的高度计算。
 * 时间复杂度：O(n)，每个节点最多访问一次。
 * 空间复杂度：O(h)，h 为树高，主要来自递归调用栈；最坏退化为 O(n)。
 * 易错点 / 面试表达点：
 * 1. 不要对每个节点重复调用“求高度”函数，否则会退化为 O(n^2)。
 * 2. 用特殊返回值同时承载“高度”和“是否平衡”两类信息，是常见的剪枝技巧。
 * 3. 这是典型的“后序位置收集子问题答案”，因为当前节点必须先知道左右子树高度。
 */
function isBalanced(root) {
  function height(node) {
    if (!node) {
      return 0;
    }

    const left = height(node.left);
    const right = height(node.right);
    // 任一子树已失衡，或当前节点高度差超过 1，都直接返回失衡标记。
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1;
    }
    // 只有在左右子树都平衡时，当前节点高度才有意义。
    return Math.max(left, right) + 1;
  }

  return height(root) !== -1;
}
