/*
实现目标：
- 手写一个最小版 Pinia 风格 store，理解“定义 store + 直接调用 hook 获取 store”的思路。
-
核心思路：
- `defineStore` 返回一个获取 store 的函数。
- 首次调用时创建 state 和 actions，后续调用复用同一 store 实例。
- 这种写法比传统 Vuex 更轻，接近现代状态库的组合式风格。
-
复杂度 / 运行特征：
- 首次创建 O(1)，后续读取实例 O(1)。
-
易错点：
- Pinia 风格更强调组合式 API 和模块天然拆分，不是简单改名版 Vuex。
- 真正 Pinia 还会处理响应式代理、插件、SSR、devtools。
-
适用场景 / 面试表达点：
- 适合回答 Vue 状态管理从 Vuex 到 Pinia 的设计演进。
*/

function defineStore(id, options) {
  let storeInstance = null;

  return function useStore() {
    if (storeInstance) {
      return storeInstance;
    }

    const state = options.state ? options.state() : {};
    const actions = {};

    Object.keys(options.actions || {}).forEach((key) => {
      actions[key] = options.actions[key].bind(storeInstance || state);
    });

    storeInstance = {
      $id: id,
      ...state,
      ...actions,
    };

    Object.keys(options.actions || {}).forEach((key) => {
      storeInstance[key] = options.actions[key].bind(storeInstance);
    });

    return storeInstance;
  };
}

const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count += 1;
    },
  },
});

const store = useCounterStore();
store.increment();
console.log(store.count);

export { defineStore };
