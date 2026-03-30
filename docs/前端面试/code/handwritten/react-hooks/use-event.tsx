/*
 * 实现目标：
 * - 手写一个稳定回调 Hook，让外部拿到的函数引用稳定，但内部始终调用最新逻辑。
 *
 * 核心思路：
 * - 用 `useRef` 保存最新的回调函数。
 * - 用 `useCallback` 返回一个空依赖的稳定函数引用。
 * - 稳定函数执行时，实际调用 `ref.current` 指向的最新回调。
 *
 * 复杂度 / 运行特征：
 * - 单次调用为 O(1)。
 * - 它解决的是“稳定引用 + 最新逻辑”同时成立的问题。
 *
 * 易错点：
 * - 只做 `useCallback` 不能解决闭包旧值。
 * - 只做 `useRef` 又拿不到稳定对外函数签名。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲事件监听、定时器、订阅回调中的 stale closure 问题。
 */

import { useCallback, useRef } from 'react';

export function useEvent<T extends (...args: never[]) => unknown>(handler: T) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  return useCallback((...args: Parameters<T>) => {
    return handlerRef.current(...args);
  }, []) as T;
}
