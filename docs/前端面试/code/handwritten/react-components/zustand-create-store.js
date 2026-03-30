/*
 * 核心思路：
 * - `createStore` 先在内部创建 `state / setState / getState / subscribe` 这些基础设施。
 * - 然后把 `setState`、`getState` 注入给 `createState`。
 * - `createState` 返回“最终这份 store 里要放什么内容”，通常既包含数据，也包含操作数据的方法。
 *
 * 易错点：
 * - 返回的 `useStore` 不是“状态对象本身”，而是“读取这份 store 的 Hook 函数”。
 * - `bear` 这类字段不是直接挂在 `useStore` 函数上的普通属性，组件里要通过 `useStore(selector)` 或 `useStore.getState()` 来读。
 * - 一个 store 完全可以同时包含很多数据字段和很多 action，不是只能有一组。
 */

function createStore(createState) {
  let state;
  const listeners = new Set();

  // 读取当前 store 的完整快照。
  // 注意它读到的是“这份 store 当前的全部 state 对象”。
  const getState = () => state;

  const setState = (partial) => {
    const nextState =
      typeof partial === "function" ? partial(state) : partial;

    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  // 得到一个包含action和数据的state对象
  state = createState(setState, getState);
  function useStore(selector = (s) => s) {
    return useSyncExternalStore(
      subscribe,
      () => selector(getState()),
      () => selector(getState())
    );
  }

  // 这里给 Hook 函数本身再挂几个静态方法。
  // 所以 `useStore` 既可以在 React 组件里当 Hook 用，
  // 也可以在组件外通过 `useStore.getState()` 这种形式直接操作底层 store。
  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
}

// ()
// 有时它表示分组
// 有时它表示调用
// 有时它表示参数列表
// 有时它表示强制把某段内容当成表达式来解析
// 得到一个带选择器的hook函数
const useBearStore = createStore((setState, getState) => ({
  bear: 0,

  // 这里的 action 直接闭包拿到了 `setState`，
  // 所以后面调用 `increase()` 时，它可以直接更新 store。
  increase: () => setState((state) => ({ bear: state.bear + 1 })),
  increaseIfBelowTen: () => {
    const currentBear = getState().bear;

    if (currentBear < 10) {
      setState({ bear: currentBear + 1 });
    }
  },
}));

// 很多人第一次看到这里会误解为：
// “createStore 返回的对象里不是已经有 `bear` 了吗？那我是不是可以直接 `useBearStore.bear`？”
//
// 不行。
//
// 原因是：
// `createStore` 返回的不是“state 对象”，而是“读取这份 store 的 Hook 函数”。
//
// 所以：
// - 在 React 组件里，应该这样读：
//   const bear = useBearStore((state) => state.bear)
//
// - 在 React 组件外，如果只是临时拿一下当前完整 state：
//   const bear = useBearStore.getState().bear
//
// 两种方式的区别是：
// - `useBearStore(selector)`：会参与 React 订阅与重新渲染
// - `useBearStore.getState()`：只是同步读当前快照，不会自动触发组件更新