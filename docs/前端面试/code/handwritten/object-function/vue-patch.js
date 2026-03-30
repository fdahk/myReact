/*
实现目标：
- 手写一个最小版 Vue 风格 patch 思路，把 vnode 差异同步到真实 DOM。
-
核心思路：
- 节点类型不同则直接替换。
- 文本节点不同则只更新文本内容。
- 同类型元素继续比较属性，再递归 patch 子节点。
-
复杂度 / 运行特征：
- 最小模型通常按节点数递归，整体可近似看作 O(n)。
-
易错点：
- 这不是 Vue 真实生产级 patch，只是帮助理解“同类型复用，不同类型替换”的核心思想。
- 面试里常会继续追问 key、双端比较、LIS 优化。
-
适用场景 / 面试表达点：
- 适合接在虚拟 DOM / diff 之后继续讲 patch 落地。
*/

function patch(oldVNode, newVNode, element) {
  if (oldVNode.type !== newVNode.type) {
    const nextElement = document.createElement(newVNode.type);
    element.replaceWith(nextElement);
    return nextElement;
  }

  if (typeof newVNode.children === 'string') {
    if (element.textContent !== newVNode.children) {
      element.textContent = newVNode.children;
    }
    return element;
  }

  const oldProps = oldVNode.props || {};
  const newProps = newVNode.props || {};
  const keys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);

  keys.forEach((key) => {
    const value = newProps[key];
    if (value == null) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, value);
    }
  });

  return element;
}

export { patch };
