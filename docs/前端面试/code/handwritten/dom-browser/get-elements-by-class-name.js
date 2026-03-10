/*
面试讲解点：手写 getElementsByClassName
- 题目本质：本质是遍历 DOM 树并判断 className 是否匹配目标类名。
- 复杂度：时间复杂度通常 O(n)，n 为 DOM 节点数。
- 易错点：多类名拆分、根节点为空、递归遍历完整性。
- 追问方向：可以延伸到 querySelector、DOM 树遍历方式。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function getElementsByClassName(root, className) {
  const result = [];

  function dfs(node) {
    if (node.nodeType !== 1) {
      return;
    }

    const classes = (node.className || '').split(/\s+/).filter(Boolean);
    if (classes.includes(className)) {
      result.push(node);
    }

    Array.from(node.children).forEach(dfs);
  }

  dfs(root);
  return result;
}

// const items = getElementsByClassName(document.body, 'card');
// console.log(items.length);
