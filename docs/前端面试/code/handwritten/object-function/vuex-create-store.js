/*
实现目标：
- 手写一个最小版 Vuex store，覆盖 `state`、`getters`、`mutations`、`actions` 的核心语义。
-
核心思路：
- `state` 作为单一状态树。
- `commit` 触发同步 `mutations` 修改 state。
- `dispatch` 触发 `actions`，支持异步逻辑，再在内部调用 `commit`。
- `getters` 通过属性访问计算派生值。
-
复杂度 / 运行特征：
- 单次 `commit` / `dispatch` 的包装层成本通常为 O(1)。
- 重点不在算法，而在状态流转边界：同步改状态走 mutation，异步流程走 action。
-
易错点：
- Vuex 约定不能在 action 里直接改 state，而应通过 commit。
- 真正 Vuex 还会继续支持模块、插件、严格模式、devtools。
-
适用场景 / 面试表达点：
- 适合讲 Vue 状态管理最小实现，以及和 Redux / Pinia 的差异。
*/

class Store {
  constructor(options) {
    this.state = options.state || {};
    this.mutations = options.mutations || {};
    this.actions = options.actions || {};
    this.getters = {};

    const rawGetters = options.getters || {};
    Object.keys(rawGetters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => rawGetters[key](this.state),
      });
    });
  }

  commit = (type, payload) => {
    const mutation = this.mutations[type];
    if (!mutation) {
      throw new Error(`Unknown mutation: ${type}`);
    }
    mutation(this.state, payload);
  };

  dispatch = (type, payload) => {
    const action = this.actions[type];
    if (!action) {
      throw new Error(`Unknown action: ${type}`);
    }
    return action(
      {
        state: this.state,
        commit: this.commit,
        dispatch: this.dispatch,
        getters: this.getters,
      },
      payload
    );
  };
}

const store = new Store({
  state: { count: 0 },
  getters: {
    doubled: (state) => state.count * 2,
  },
  mutations: {
    increment(state, payload = 1) {
      state.count += payload;
    },
  },
  actions: {
    asyncIncrement({ commit }, payload) {
      setTimeout(() => commit('increment', payload), 100);
    },
  },
});

store.commit('increment', 2);
console.log(store.state.count, store.getters.doubled);
