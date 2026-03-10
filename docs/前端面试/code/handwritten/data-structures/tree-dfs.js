/*
面试讲解点：树的 DFS 遍历
- 题目本质：本质是沿一条路径尽量走到底，再回溯，常见写法是递归或显式栈。
- 复杂度：时间复杂度 O(n)，空间复杂度取决于树高。
- 易错点：空树、递归出口、前中后序差异。
- 追问方向：可以延伸到回溯、图搜索、组件树遍历。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function treeDFS(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.value);

    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i -= 1) {
        stack.push(node.children[i]);
      }
    }
  }

  return result;
}

const tree = { value: 'A', children: [{ value: 'B', children: [{ value: 'D' }] }, { value: 'C' }] };
console.log(treeDFS(tree));
