/*
 * 实现目标：
 * - 提供一个极简的共享计数状态示例，让多个组件可以通过同一个 Provider 读取并修改状态。
 * - 用最少代码说明“全局状态”在 React 里的基础构成：状态承载、上下文分发、消费 Hook。
 *
 * 核心思路：
 * - 在 Provider 内用 `useState` 保存共享的 `count`。
 * - 通过 `createContext` 把状态和操作方法向下提供。
 * - 用自定义 Hook 包一层 `useContext`，统一消费入口并补充运行时保护。
 *
 * 复杂度 / 运行特征：
 * - `increment` 更新本身是 O(1)，但所有读取该 context 的消费者都会参与更新流程。
 * - 这里用 `useMemo` 稳定上下文对象引用，避免无关渲染周期下生成新对象。
 *
 * 易错点：
 * - 忘记把组件包在 Provider 里，会导致 `useContext` 取到 `null`。
 * - Context 适合共享中低频状态；高频更新场景若直接透传整个对象，容易产生额外重渲染。
 * - 实战里通常还会继续拆分 selector、订阅粒度或引入专门状态库。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 Context + Hook 封装、共享状态最小实现、状态库原理入门。
 * - 面试里可继续展开 Redux、Zustand 与 Context 在订阅模型和性能优化上的差异。
 */

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

const CounterStoreContext = createContext<null | {
  count: number;
  increment: () => void;
}>(null);

export function CounterStoreProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const value = useMemo(
    () => ({
      count,
      // 使用函数式更新，避免闭包读到旧值。
      increment: () => setCount((prev) => prev + 1),
    }),
    [count]
  );

  return <CounterStoreContext.Provider value={value}>{children}</CounterStoreContext.Provider>;
}

export function useCounterStore() {
  const store = useContext(CounterStoreContext);
  if (!store) {
    // 显式报错比静默失败更容易定位 Provider 缺失问题。
    throw new Error('useCounterStore must be used within CounterStoreProvider');
  }
  return store;
}
