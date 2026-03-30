/*
实现目标：
- 手写一个最小版虚拟 DOM diff，输出更新补丁而不是直接操作真实 DOM。
-
核心思路：
- 比较旧节点与新节点的类型、文本、属性和子节点。
- 如果节点类型不同，直接替换。
- 如果是相同类型节点，则继续比较属性变化和子节点变化。
-
复杂度 / 运行特征：
- 最小实现通常按树结构递归遍历，时间复杂度约为 O(n)。
- 真正框架中的 diff 会结合 key、同层比较、批量提交等更复杂策略。
-
易错点：
- 面试里要明确：这是“最小思路版”，不是 React/Vue 生产级 diff。
- 文本节点、属性更新和子节点长度变化要分别处理。
*/

function diffProps(oldProps = {}, newProps = {}) {
  const patches = [];
  const keys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);

  keys.forEach((key) => {
    if (oldProps[key] !== newProps[key]) {
      patches.push({
        type: 'PROP',
        key,
        value: newProps[key],
      });
    }
  });

  return patches;
}

function diffVNode(oldNode, newNode) {
  if (!oldNode) {
    return [{ type: 'CREATE', node: newNode }];
  }

  if (!newNode) {
    return [{ type: 'REMOVE' }];
  }

  if (typeof oldNode !== typeof newNode) {
    return [{ type: 'REPLACE', node: newNode }];
  }

  if (typeof oldNode === 'string' || typeof oldNode === 'number') {
    return oldNode !== newNode ? [{ type: 'TEXT', value: newNode }] : [];
  }

  if (oldNode.type !== newNode.type) {
    return [{ type: 'REPLACE', node: newNode }];
  }

  const patches = [];
  const propPatches = diffProps(oldNode.props, newNode.props);
  if (propPatches.length > 0) {
    patches.push(...propPatches);
  }

  const maxLength = Math.max(oldNode.children.length, newNode.children.length);
  for (let index = 0; index < maxLength; index += 1) {
    const childPatch = diffVNode(oldNode.children[index], newNode.children[index]);
    if (childPatch.length > 0) {
      patches.push({
        type: 'CHILD',
        index,
        patches: childPatch,
      });
    }
  }

  return patches;
}

const oldTree = { type: 'div', props: { className: 'box' }, children: ['hello'] };
const newTree = { type: 'div', props: { className: 'card' }, children: ['hello', 'world'] };
console.log(diffVNode(oldTree, newTree));
