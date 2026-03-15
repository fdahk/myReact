/**
 * 题目目标：返回二叉树的前序遍历结果，顺序为 root -> left -> right。
 * 核心思路：使用栈做迭代遍历。每次弹出栈顶即访问当前节点，
 * 为了保证左子树先处理，需要先压入右孩子、再压入左孩子。
 * 时间复杂度：O(n)，每个节点最多进栈出栈各一次。
 * 空间复杂度：O(h) 到 O(n)，取决于树形态和栈中节点数量。
 * 易错点 / 面试表达点：
 * 1. 栈是后进先出，因此入栈顺序必须和目标访问顺序反着来。
 * 2. 前序访问时机最早，弹栈后立刻记录当前值即可。
 * 3. 面试里可把它和中序、后序迭代写法一起对比说明。
 */
function preorderTraversal(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    // 先压右再压左，这样左子树会更早弹出。
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}
