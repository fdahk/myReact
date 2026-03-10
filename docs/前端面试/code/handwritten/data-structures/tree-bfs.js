/*
面试讲解点：树的 BFS 遍历
- 题目本质：本质是按层遍历，核心数据结构是队列。
- 复杂度：时间复杂度 O(n)，空间复杂度最坏 O(n)。
- 易错点：根节点为空、层级边界、队列顺序。
- 追问方向：可以延伸到最短路径、层序遍历、腐烂的橘子这类题。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function treeBFS(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);
    if (node.children) {
      queue.push(...node.children);
    }
  }

  return result;
}

const tree = { value: 'A', children: [{ value: 'B', children: [{ value: 'D' }] }, { value: 'C' }] };
console.log(treeBFS(tree));
