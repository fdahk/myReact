/*
实现目标：
- 手写一个最小版 `effectScope`，理解 Vue 如何把多个 effect 归组并统一清理。
-
核心思路：
- `effectScope` 创建一个作用域对象，内部收集本作用域创建的 effect。
- 作用域停止时，统一把这些 effect 标记为失效。
- 这能帮助在组件卸载或模块销毁时集中释放副作用。
-
复杂度 / 运行特征：
- 单次收集近似 O(1)，停止作用域的成本与 effect 数量 n 成正比。
-
易错点：
- 作用域管理的是副作用生命周期，不是值本身。
- 真实 Vue 版本还会处理嵌套 scope、detach 等更复杂能力。
-
适用场景 / 面试表达点：
- 适合回答 Vue3 高阶响应式能力和副作用清理机制。
*/

let activeScope = null;

function effectScope() {
  const effects = [];

  return {
    run(fn) {
      const parentScope = activeScope;
      activeScope = effects;
      try {
        fn();
      } finally {
        activeScope = parentScope;
      }
    },
    stop() {
      effects.forEach((effect) => {
        effect.active = false;
      });
    },
  };
}

function recordEffect(effect) {
  if (activeScope) {
    activeScope.push(effect);
  }
}

const scope = effectScope();
scope.run(() => {
  const effect = { active: true };
  recordEffect(effect);
  console.log('effect registered in scope');
});
scope.stop();

export { effectScope };
