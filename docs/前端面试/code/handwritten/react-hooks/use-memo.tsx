/*
 * 实现目标：
 * - 手写一个最小版 `useMemo`，理解“按依赖缓存计算结果”的核心语义。
 * - 它适合缓存昂贵计算结果，而不是缓存副作用。
 *
 * 核心思路：
 * - 用 `useRef` 保存上一次依赖数组和计算结果。
 * - 每次渲染时做一轮浅比较；依赖没变就直接返回旧结果。
 * - 依赖变化时才重新执行 `factory`，并更新缓存。
 *
 * 复杂度 / 运行特征：
 * - 单次依赖比较复杂度为 O(n)，n 为依赖项数量。
 * - 真正节省的是“跳过昂贵计算”的成本，而不是让组件完全不渲染。
 *
 * 易错点：
 * - `useMemo` 缓存的是“值”，不是“副作用”。
 * - 依赖数组写错会导致值过期或频繁失效。
 * - 面试里要说明它是“性能优化提示”，不是语义正确性的基础设施。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲昂贵派生计算、引用稳定性和依赖比较。
 * - 可继续对比 `useCallback`、`React.memo` 的职责区别。
 */

import { useRef } from 'react';

function areDepsEqual(prevDeps: unknown[], nextDeps: unknown[]) {
  if (prevDeps.length !== nextDeps.length) {
    return false;
  }

  for (let index = 0; index < prevDeps.length; index += 1) {
    if (!Object.is(prevDeps[index], nextDeps[index])) {
      return false;
    }
  }

  return true;
}

export function useMemo<T>(factory: () => T, deps: unknown[]) {
  const cacheRef = useRef<{ deps: unknown[]; value: T } | null>(null);

  if (!cacheRef.current || !areDepsEqual(cacheRef.current.deps, deps)) {
    cacheRef.current = {
      deps,
      value: factory(),
    };
  }

  return cacheRef.current.value;
}

// 示例：
// const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);
