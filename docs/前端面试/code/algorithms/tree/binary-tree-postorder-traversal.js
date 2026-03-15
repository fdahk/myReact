/**
 * 题目目标：返回二叉树的后序遍历结果，顺序为 left -> right -> root。
 * 核心思路：使用迭代法模拟遍历。先按 root -> right -> left 的顺序收集结果，
 * 再通过头部插入把结果逆转成 left -> right -> root。
 * 时间复杂度：O(n)，每个节点进栈出栈各一次；这里 `unshift` 在数组语义下可能带来额外搬移成本，
 * 面试里可补充若追求严格 O(n)，可改为尾插后整体反转。
 * 空间复杂度：O(n)，栈和结果数组都可能存储全部节点。
 * 易错点 / 面试表达点：
 * 1. 迭代后序常见技巧是“变形前序 + 反转结果”。
 * 2. 入栈顺序决定最终结果，想得到 root -> right -> left，就要先压 left 再压 right。
 * 3. 若直接手写纯迭代后序，代码更复杂，面试里说明当前技巧通常更稳。
 */
function postorderTraversal(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    // 头插相当于把 root -> right -> left 逆成后序结果。
    result.unshift(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return result;
}
