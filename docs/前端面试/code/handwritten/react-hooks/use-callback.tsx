/*
 * 实现目标：
 * - 手写一个最小版 `useCallback`，理解“按依赖缓存函数引用”的核心语义。
 *
 * 核心思路：
 * - 本质上它可以看成 `useMemo(() => callback, deps)` 的语法糖。
 * - 用 `useRef` 记住上一次依赖和函数引用。
 * - 依赖没变时直接返回旧函数，依赖变化时更新为新函数。
 *
 * 复杂度 / 运行特征：
 * - 单次依赖比较复杂度为 O(n)。
 * - 它优化的是“函数引用稳定性”，常用于配合子组件 memo 或事件订阅解绑。
 *
 * 易错点：
 * - `useCallback` 不会自动解决闭包旧值问题，依赖写错依然会拿到旧状态。
 * - 不是所有函数都要缓存，过度使用反而会增加心智负担。
 * - 面试里要说明它缓存的是函数引用，不是函数执行结果。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 React 性能优化、闭包依赖、函数稳定性。
 * - 可继续对比 `useMemo`、`useRef`、事件稳定回调 Hook。
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

export function useCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  deps: unknown[]
) {
  const cacheRef = useRef<{ deps: unknown[]; callback: T } | null>(null);

  if (!cacheRef.current || !areDepsEqual(cacheRef.current.deps, deps)) {
    cacheRef.current = {
      deps,
      callback,
    };
  }

  return cacheRef.current.callback;
}

// 示例：
// const handleClick = useCallback(() => onSave(id), [id, onSave]);
