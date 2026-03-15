/**
 * 题目目标：计算二叉树的最小深度，即从根节点到最近叶子节点的最短路径长度。
 * 核心思路：使用广度优先搜索按层遍历，因为 BFS 第一次遇到叶子节点时，
 * 当前深度一定就是最小深度，可以立即返回，无需继续遍历更深层。
 * 时间复杂度：O(n)，最坏情况下仍需访问全部节点。
 * 空间复杂度：O(n)，队列在最宽层时可能存放较多节点。
 * 易错点 / 面试表达点：
 * 1. 叶子节点定义是左右孩子都为空，不能把“单侧为空”误判为叶子。
 * 2. 这题 BFS 往往比 DFS 更直观，因为它自带“最先到达即最短”的语义。
 * 3. 若用 DFS，要特别处理只有一侧子树为空的情况，不能直接取 `min(left, right)`。
 */
function minDepth(root) {
  if (!root) {
    return 0;
  }

  const queue = [[root, 1]];
  while (queue.length) {
    const [node, depth] = queue.shift();
    // BFS 第一次遇到叶子节点时，当前深度就是最小深度。
    if (!node.left && !node.right) {
      return depth;
    }
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }

  return 0;
}
