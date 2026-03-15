/*
实现目标：
- 使用队列实现多叉树的广度优先遍历，返回按层访问得到的节点值数组。
-
核心思路：
- BFS 的关键是“先到先处理”，因此要维护一个队列存放待访问节点。
- 每次从队头取出当前节点，把它的所有子节点按原顺序追加到队尾。
- 这样天然形成逐层推进的访问顺序。
-
复杂度 / 运行特征：
- 每个节点最多入队、出队一次，时间复杂度为 O(n)。
- 队列最坏情况下会同时保存某一整层节点，空间复杂度最坏 O(n)。
- 当前实现用数组 + `shift` 模拟队列，表达清晰，但大数据量下出队成本不是最优。
-
易错点：
- 空树要直接返回空数组。
- 子节点入队顺序会直接影响同层节点的输出顺序。
- 如果题目要求“按层返回二维数组”，则需要额外记录每层边界，而不是简单平铺结果。
-
适用场景 / 面试表达点：
- 常见于层序遍历、最短步数问题、扩散传播类题目。
- 面试时可以顺带说明 BFS 和 DFS 的核心区别：一个是队列推进层级，一个是栈/递归深入路径。
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
      // 子节点按原顺序进入队尾，保证后续按层、按从左到右处理。
      queue.push(...node.children);
    }
  }

  return result;
}

const tree = { value: 'A', children: [{ value: 'B', children: [{ value: 'D' }] }, { value: 'C' }] };
console.log(treeBFS(tree));
