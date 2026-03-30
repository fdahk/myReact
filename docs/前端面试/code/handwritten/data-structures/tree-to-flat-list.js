/*
实现目标：
- 手写一个树转扁平数组函数，把树形节点按遍历顺序展开成线性列表。
-
核心思路：
- 用 DFS 递归遍历整棵树。
- 每访问到一个节点，就把当前节点信息先写入结果数组。
- 再继续展开它的 `children`。
-
复杂度 / 运行特征：
- 每个节点只访问一次，时间复杂度 O(n)。
- 结果数组和递归栈最坏都可能达到 O(n)。
-
易错点：
- 展平时通常不要把原始 `children` 原样带出去，否则“扁平数组”仍然保留嵌套结构。
- 若节点量很大，可以改成显式栈的非递归版，避免调用栈过深。
- 面试里要说明遍历顺序是前序 DFS；如果要求层序，就要改成队列版。
-
适用场景 / 面试表达点：
- 常见于树表格、目录面包屑、搜索索引、树形权限回填。
- 面试里很适合和“数组转树”配成一组讲。
*/

function treeToFlatList(tree) {
  const result = [];

  function traverse(nodes, parentId = null) {
    nodes.forEach((node) => {
      result.push({
        id: node.id,
        parentId,
        name: node.name,
      });

      if (Array.isArray(node.children) && node.children.length > 0) {
        traverse(node.children, node.id);
      }
    });
  }

  traverse(tree);
  return result;
}

const tree = [
  {
    id: 1,
    name: 'root',
    children: [
      { id: 2, name: 'child-a', children: [] },
      { id: 3, name: 'child-b', children: [{ id: 4, name: 'leaf', children: [] }] },
    ],
  },
];

console.log(treeToFlatList(tree));
