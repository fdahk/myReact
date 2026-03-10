/*
面试讲解点：简化版全局状态
- 题目本质：本质是把共享状态和订阅机制抽到组件树外，让多个组件响应同一数据源。
- 复杂度：单次分发取决于订阅者数量。
- 易错点：订阅取消、局部更新、避免无意义重渲染。
- 追问方向：可以追问 Redux、Zustand、Context 的边界。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
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
      increment: () => setCount((prev) => prev + 1),
    }),
    [count]
  );

  return <CounterStoreContext.Provider value={value}>{children}</CounterStoreContext.Provider>;
}

export function useCounterStore() {
  const store = useContext(CounterStoreContext);
  if (!store) {
    throw new Error('useCounterStore must be used within CounterStoreProvider');
  }
  return store;
}
