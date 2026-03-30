/*
 * 实现目标：
 * - 手写一个最小版 `useRef`，理解“稳定容器对象 + current 可变引用”的核心语义。
 *
 * 核心思路：
 * - 在首次渲染时创建一个 `{ current }` 对象并保存起来。
 * - 后续渲染直接复用同一个对象，不再重新创建。
 * - 修改 `current` 不会触发重新渲染，这正是它和 `useState` 的本质区别。
 *
 * 复杂度 / 运行特征：
 * - 首次初始化 O(1)，后续读取也是 O(1)。
 *
 * 易错点：
 * - `useRef` 保存的是可变容器，不是响应式状态。
 * - 把 `ref.current` 改了，界面不会自动更新。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 DOM 引用、定时器句柄、最新值容器、避免闭包旧值。
 */

import { useRef as reactUseRef } from 'react';

export function useRef<T>(initialValue: T) {
  const ref = reactUseRef<{ current: T } | null>(null);

  if (ref.current === null) {
    ref.current = { current: initialValue };
  }

  return ref.current;
}
