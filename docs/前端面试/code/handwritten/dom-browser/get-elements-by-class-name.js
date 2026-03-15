/*
 * 实现目标：
 * - 手写一个最小版 `getElementsByClassName`，从指定根节点出发收集带有目标类名的元素。
 * - 用它说明浏览器原生 DOM 查询 API 背后的核心工作：树遍历与条件匹配。
 *
 * 核心思路：
 * - 从根节点开始做深度优先遍历。
 * - 只处理元素节点，并把 `className` 按空白拆成类名数组后做包含判断。
 * - 命中则收集当前节点，再继续递归遍历其子元素。
 *
 * 复杂度 / 运行特征：
 * - 时间复杂度通常是 O(n)，其中 n 为遍历到的 DOM 节点数。
 * - 额外空间主要来自结果数组和递归调用栈，最坏情况下与树深度相关。
 *
 * 易错点：
 * - `className` 可能是空字符串，拆分时要过滤空项。
 * - 需要区分元素节点和文本节点，否则访问 `children` 或 `className` 容易出错。
 * - 面试实现里通常默认 `root` 合法，真实场景还可补充空值防御。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 DOM 树遍历、DFS 与 BFS 取舍、类名匹配细节。
 * - 面试里可以继续扩展到 `querySelectorAll`、事件委托、虚拟 DOM 与真实 DOM 查询成本。
 */

function getElementsByClassName(root, className) {
  const result = [];

  function dfs(node) {
    if (node.nodeType !== 1) {
      return;
    }

    // 原生 className 可能包含多个类名，需要先拆分再做精确匹配。
    const classes = (node.className || '').split(/\s+/).filter(Boolean);
    if (classes.includes(className)) {
      result.push(node);
    }

    // 递归遍历当前元素的直接子元素，覆盖整棵 DOM 子树。
    Array.from(node.children).forEach(dfs);
  }

  dfs(root);
  return result;
}

// const items = getElementsByClassName(document.body, 'card');
// console.log(items.length);
