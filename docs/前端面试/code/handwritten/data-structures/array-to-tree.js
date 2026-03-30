/*
实现目标：
- 手写一个数组转树函数，把扁平节点列表组装成树形结构。
-
核心思路：
- 先遍历一遍把所有节点放进 `Map`，顺便给每个节点补 `children`。
- 再遍历一次，根据 `parentId` 把当前节点挂到父节点的 `children` 下。
- 没有父节点的项就是根节点。
-
复杂度 / 运行特征：
- 两次线性遍历，时间复杂度 O(n)。
- 额外使用一个 `Map`，空间复杂度 O(n)。
-
易错点：
- 不能直接修改原数组项时，要先克隆，避免污染输入。
- `parentId` 可能不存在对应父节点，要决定是丢弃、报错还是当根节点处理。
- 面试里要说明为何比“每次都去全表找父节点”的 O(n^2) 写法更优。
-
适用场景 / 面试表达点：
- 常见于菜单树、组织架构、评论回复树。
- 面试里可以顺带再讲树转扁平数组、按路径展开等衍生题。
*/

function arrayToTree(list, rootParentId = null) {
  const nodeMap = new Map();
  const result = [];

  list.forEach((item) => {
    nodeMap.set(item.id, { ...item, children: [] });
  });

  nodeMap.forEach((node) => {
    if (node.parentId === rootParentId || !nodeMap.has(node.parentId)) {
      result.push(node);
      return;
    }

    nodeMap.get(node.parentId).children.push(node);
  });

  return result;
}

const source = [
  { id: 1, parentId: null, name: 'root' },
  { id: 2, parentId: 1, name: 'child-a' },
  { id: 3, parentId: 1, name: 'child-b' },
  { id: 4, parentId: 2, name: 'leaf' },
];

console.log(JSON.stringify(arrayToTree(source), null, 2));
