/*
实现目标：
- 手写一个最小版 render / commit 两阶段模型，理解 React 更新为什么分阶段进行。
-
核心思路：
- render 阶段只负责计算新的 UI 描述和副作用列表。
- commit 阶段才真正把变更应用到真实 DOM。
- 这种分层让 render 更容易被打断，而 commit 保持集中提交。
-
复杂度 / 运行特征：
- 两阶段总体仍与节点数相关，最小模型可视为 O(n)。
-
易错点：
- render 不等于 DOM 已经变化。
- commit 通常是不可中断的集中提交阶段，这一点面试里很重要。
-
适用场景 / 面试表达点：
- 适合解释 React render / commit 边界和 Fiber 的意义。
*/

function renderPhase(vnode) {
  const effects = [];

  function walk(node) {
    effects.push({ type: 'PLACEMENT', node });
    if (node.children) {
      node.children.forEach(walk);
    }
  }

  walk(vnode);
  return effects;
}

function commitPhase(effects) {
  effects.forEach((effect) => {
    console.log('commit effect:', effect.type, effect.node.type);
  });
}

const vnode = {
  type: 'App',
  children: [{ type: 'Header', children: [] }, { type: 'Main', children: [] }],
};

const effects = renderPhase(vnode);
commitPhase(effects);

export { renderPhase, commitPhase };
