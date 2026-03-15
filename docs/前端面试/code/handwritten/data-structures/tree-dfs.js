/*
实现目标：
- 使用显式栈实现一棵多叉树的深度优先遍历，并按访问顺序返回节点值列表。
-
核心思路：
- DFS 的本质是“优先沿一条路径走到底，再回退到分叉点继续”。
- 这里不用递归，而是手动维护一个栈，把待访问节点压栈；每次弹出栈顶节点进行处理。
- 为了保持从左到右的访问顺序，需要把子节点按从右到左的顺序压栈。
-
复杂度 / 运行特征：
- 每个节点只会入栈、出栈一次，时间复杂度为 O(n)。
- 栈空间与树的宽高结构有关，最坏情况下可达 O(n)。
- 显式栈版本适合面试时说明“递归其实就是隐式调用栈”的等价关系。
-
易错点：
- 忘记处理空树会导致后续读取属性报错。
- 子节点压栈顺序写反后，输出顺序就会和预期不一致。
- 题目如果要求前序 / 后序 / 中序，需要先确认遍历定义；多叉树通常默认前序 DFS。
-
适用场景 / 面试表达点：
- 可用于组件树遍历、目录树处理、图搜索的基础版本。
- 面试表达时可以主动对比“递归 DFS 更短，显式栈 DFS 更容易展示状态控制”。
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
      // 先压右侧、后压左侧，这样出栈时仍然是从左到右访问。
      for (let i = node.children.length - 1; i >= 0; i -= 1) {
        stack.push(node.children[i]);
      }
    }
  }

  return result;
}

const tree = { value: 'A', children: [{ value: 'B', children: [{ value: 'D' }] }, { value: 'C' }] };
console.log(treeDFS(tree));
