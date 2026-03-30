/*
 * 实现目标：
 * - 手写一个最小版 `react-redux` Hooks 接入层，提供 `Provider`、`useDispatch`、`useSelector`。
 *
 * 核心思路：
 * - 用 Context 把 Redux store 向下传递。
 * - `useDispatch` 直接返回 store.dispatch。
 * - `useSelector` 借助 `useSyncExternalStore` 订阅 store 变化，并在每次变更后重新计算选中值。
 *
 * 复杂度 / 运行特征：
 * - `useSelector` 的计算成本取决于 selector 本身。
 * - 这个最小版没有做 equalityFn 优化，因此 store 更新时会重新计算 selector。
 *
 * 易错点：
 * - 如果组件没有包在 `Provider` 里，取 Context 时必须显式报错。
 * - `useSelector` 重点不是 Context 取值，而是“订阅外部 store 并驱动组件更新”。
 *
 * 适用场景 / 面试表达点：
 * - 适合解释 Redux 核心和 React 视图层是如何衔接的。
 * - 面试里经常是 `createStore` 写完后顺势追问 `useSelector` / `useDispatch` 怎么做。
 */

import type { ReactNode } from 'react';
import { createContext, useContext, useSyncExternalStore } from 'react';

type Store<State, Action> = {
  getState: () => State;
  dispatch: (action: Action) => Action;
  subscribe: (listener: () => void) => () => void;
};

const StoreContext = createContext<Store<unknown, unknown> | null>(null);

export function ReduxProvider<State, Action>({
  store,
  children,
}: {
  store: Store<State, Action>;
  children: ReactNode;
}) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

function useStore<State, Action>() {
  const store = useContext(StoreContext) as Store<State, Action> | null;
  if (!store) {
    throw new Error('Redux hooks must be used within ReduxProvider');
  }
  return store;
}

export function useDispatch<Action>() {
  const store = useStore<unknown, Action>();
  return store.dispatch;
}

export function useSelector<State, Selected>(selector: (state: State) => Selected) {
  const store = useStore<State, unknown>();

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}
