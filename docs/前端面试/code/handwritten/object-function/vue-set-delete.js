/*
实现目标：
- 手写一个最小版 Vue2 风格的 `set` / `delete` 思路，解释为什么新增 / 删除属性需要额外处理。
-
核心思路：
- 在 `defineProperty` 体系下，已有属性会被提前劫持，但新增属性默认不会响应。
- `set` 的最小思路是：补上新属性并重新做一次 defineReactive。
- `delete` 的最小思路是：删除属性后手动通知依赖更新。
-
复杂度 / 运行特征：
- 单次新增 / 删除本身可近似看作 O(1)。
-
易错点：
- 这道题重点在说明 Vue2 的限制，而不是把它写成完美的响应式系统。
- Vue3 改用 Proxy 后，这一限制就大幅缓解了。
-
适用场景 / 面试表达点：
- 适合讲 Vue2 为什么需要 `Vue.set` / `Vue.delete`。
*/

function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
      console.log('notify update:', key);
    },
  });
}

function vueSet(target, key, value) {
  if (key in target) {
    target[key] = value;
    return;
  }

  defineReactive(target, key, value);
  console.log('notify add:', key);
}

function vueDelete(target, key) {
  if (!(key in target)) {
    return;
  }

  delete target[key];
  console.log('notify delete:', key);
}

const state = {};
vueSet(state, 'name', 'vue');
vueDelete(state, 'name');

export { vueSet, vueDelete };
