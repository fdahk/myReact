/**
 * 题目目标：返回二叉树的中序遍历结果，顺序为 left -> root -> right。
 * 核心思路：使用显式栈模拟递归，不断向左走到底并沿路入栈；
 * 当左侧为空时弹出栈顶访问节点，再转向其右子树继续同样过程。
 * 时间复杂度：O(n)，每个节点最多入栈、出栈各一次。
 * 空间复杂度：O(h)，h 为树高；最坏退化为 O(n)。
 * 易错点 / 面试表达点：
 * 1. 外层循环条件必须是 `current || stack.length`，否则无法回到父节点。
 * 2. 中序的访问时机是“左子树处理完后，弹栈时访问当前节点”。
 * 3. 显式栈写法是递归转迭代的经典模板，面试中非常高频。
 */
function inorderTraversal(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length) {
    while (current) {
      // 持续向左下探，先把回溯路径保存起来。
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    // 访问完当前节点后，再转去处理它的右子树。
    current = current.right;
  }

  return result;
}
