/*
实现目标：
- 手写一个虚拟 DOM 转真实 DOM 的最小实现。
-
核心思路：
- 如果节点是字符串或数字，直接创建文本节点。
- 如果节点是对象，就根据 `type` 创建元素节点，再把 `props` 挂上去。
- 最后递归处理 `children`，把子节点依次 append 到父节点。
-
复杂度 / 运行特征：
- 若把整棵虚拟树的节点数记为 n，则总体构建复杂度为 O(n)。
- 这个版本只覆盖最小主流程，不包含事件代理、diff、组件、Fragment 等高级能力。
-
易错点：
- 文本节点和元素节点要分开处理。
- `className`、`style`、事件监听等属性不能直接一把梭赋值，需要分类型处理。
- 面试里要说明“虚拟 DOM 转真实 DOM”只是首渲染，更新阶段还需要 diff。
-
适用场景 / 面试表达点：
- 适合讲虚拟 DOM 的最小落地过程。
- 面试里可继续追问 patch、diff、Fiber、批量提交。
*/

function setProp(element, key, value) {
  if (key === 'className') {
    element.setAttribute('class', value);
    return;
  }

  if (key === 'style' && value && typeof value === 'object') {
    Object.assign(element.style, value);
    return;
  }

  if (/^on[A-Z]/.test(key) && typeof value === 'function') {
    const eventName = key.slice(2).toLowerCase();
    element.addEventListener(eventName, value);
    return;
  }

  element.setAttribute(key, value);
}

function createElement(vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }

  const { type, props = {}, children = [] } = vnode;
  const element = document.createElement(type);

  Object.keys(props).forEach((key) => {
    setProp(element, key, props[key]);
  });

  children.forEach((child) => {
    element.appendChild(createElement(child));
  });

  return element;
}

const vnode = {
  type: 'div',
  props: { className: 'card' },
  children: ['hello virtual dom'],
};

// document.body.appendChild(createElement(vnode));
