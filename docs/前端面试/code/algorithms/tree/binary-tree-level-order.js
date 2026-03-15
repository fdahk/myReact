/**
 * 题目目标：按层序遍历二叉树，返回每一层节点值组成的二维数组。
 * 核心思路：使用队列做广度优先搜索。每次先记录当前队列长度，
 * 这个长度就代表当前层节点数，随后只处理这一层并把下一层子节点加入队列。
 * 时间复杂度：O(n)，每个节点入队出队各一次。
 * 空间复杂度：O(n)，最宽层节点数可能接近 n。
 * 易错点 / 面试表达点：
 * 1. 分层的关键不是额外存层号，而是固定本轮循环开始时的队列长度。
 * 2. `queue.shift()` 在 JavaScript 数组中不是最优实现，面试时可补充可用下标模拟队列优化。
 * 3. BFS 非常适合处理“最短步数”“按层输出”“最近距离”这类问题。
 */
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function levelOrder(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;
    const level = [];

    // 固定当前层节点数量，避免把下一层节点混进本层结果。
    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(levelOrder(root));
