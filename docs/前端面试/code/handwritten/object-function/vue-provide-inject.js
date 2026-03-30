/*
实现目标：
- 手写一个最小版 `provide / inject` 机制，理解组件树如何跨层级共享依赖。
-
核心思路：
- 每个组件上下文持有一个 `provides` 对象，并通过原型链继承父级提供的数据。
- `provide` 往当前上下文写值。
- `inject` 沿着 `provides` 原型链查找对应 key。
-
复杂度 / 运行特征：
- 当前层写入 O(1)，查找平均成本与组件层级深度有关。
-
易错点：
- `provide/inject` 适合依赖注入，不是为了替代响应式全局状态管理。
- 面试里可顺带说明它非常适合插件、表单、主题、i18n 等场景。
*/

function createComponentContext(parent = null) {
  return {
    parent,
    provides: parent ? Object.create(parent.provides) : Object.create(null),
  };
}

function provide(instance, key, value) {
  instance.provides[key] = value;
}

function inject(instance, key, defaultValue) {
  if (key in instance.provides) {
    return instance.provides[key];
  }

  return defaultValue;
}

const parent = createComponentContext();
provide(parent, 'theme', 'dark');

const child = createComponentContext(parent);
console.log(inject(child, 'theme', 'light'));

export { createComponentContext, provide, inject };
