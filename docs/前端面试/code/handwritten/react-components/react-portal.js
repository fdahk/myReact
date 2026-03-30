/*
实现目标：
- 手写一个最小版 Portal，理解组件内容如何渲染到当前树外的 DOM 容器中。
-
核心思路：
- 接收内容和目标容器。
- 直接把内容挂到指定容器，而不是当前父节点。
- Portal 的关键是“逻辑上仍在 React 树中，物理上渲染到别处”。
-
复杂度 / 运行特征：
- 单次挂载近似 O(1)。
-
易错点：
- Portal 不是简单的 DOM append，它仍然保留框架层事件与上下文语义。
- 这里是最小思路，不覆盖完整 React 运行时行为。
*/

function createPortal(content, container) {
  if (typeof content === 'string') {
    container.textContent = content;
  } else {
    container.appendChild(content);
  }

  return {
    container,
    content,
  };
}

export { createPortal };
