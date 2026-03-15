/**
 * 题目目标：计算二叉树的最大深度。
 * 核心思路：递归求左右子树最大深度，当前节点的深度就是 `max(left, right) + 1`。
 * 这是典型的树形 DP / 分治写法，答案由左右子问题合并得到。
 * 时间复杂度：O(n)，每个节点只访问一次。
 * 空间复杂度：O(h)，h 为树高，递归栈最深等于树高。
 * 易错点 / 面试表达点：
 * 1. 空树深度是 0，不是 1。
 * 2. 这道题适合说明“树的深度类问题通常看后序位置返回值”。
 * 3. 如果追问迭代写法，也可以用 BFS 按层统计层数。
 */
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function maxDepth(root) {
  if (!root) {
    return 0;
  }

  // 当前节点深度等于左右子树更深的一侧再加上自己这一层。
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

const root = new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3));
console.log(maxDepth(root));
