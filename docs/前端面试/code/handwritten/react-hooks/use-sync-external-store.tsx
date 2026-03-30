/*
 * 实现目标：
 * - 手写一个最小版 `useSyncExternalStore`，理解 React 如何订阅外部状态源。
 *
 * 核心思路：
 * - 使用 `useState` 驱动组件刷新。
 * - 在 effect 中调用外部 `subscribe` 注册监听。
 * - 监听到变化后重新读取 `getSnapshot`，并触发一次本地更新。
 *
 * 复杂度 / 运行特征：
 * - 单次订阅和快照读取都可视为 O(1)，真实成本取决于外部 store 和 snapshot 计算。
 *
 * 易错点：
 * - 重点不是 Context，而是“外部源订阅 + 快照读取”。
 * - 真实 React 版本要处理并发一致性问题，这里只是最小理解版。
 */

import { useEffect, useState } from 'react';

export function useSyncExternalStore<T>(
  subscribe: (listener: () => void) => () => void,
  getSnapshot: () => T
) {
  const [snapshot, setSnapshot] = useState(() => getSnapshot());

  useEffect(() => {
    const checkForUpdates = () => {
      setSnapshot(getSnapshot());
    };

    const unsubscribe = subscribe(checkForUpdates);
    checkForUpdates();

    return unsubscribe;
  }, [subscribe, getSnapshot]);

  return snapshot;
}
