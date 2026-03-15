/*
 * 实现目标：
 * - 提供一个通用 `useLatest` Hook，用来在不触发重新渲染的前提下保存“当前最新值”。
 * - 典型用途是给事件处理器、定时器、订阅回调提供一个稳定可读的最新引用。
 *
 * 核心思路：
 * - 用 `useRef` 承载值，因为 `ref.current` 可变且不会触发重新渲染。
 * - 在 effect 中把最新传入值同步到 `ref.current`，保证后续异步逻辑读取到的是新值。
 *
 * 复杂度 / 运行特征：
 * - 每次同步只做一次 O(1) 赋值。
 * - 该 Hook 不会直接驱动视图更新，适合做“读最新值”的辅助容器，而不是 UI 状态本身。
 *
 * 易错点：
 * - `ref` 变化不会导致组件重新渲染，因此不能把它当作普通 state 使用。
 * - 若希望渲染层立即体现变化，仍然应该用 `useState` 或其他响应式状态。
 * - 是否用 effect 同步、还是直接在渲染期赋值，要结合团队规范和语义选择。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 stale closure、异步回调最新值获取、`useRef` 与 `useState` 的职责边界。
 * - 面试里可以举例说明：事件监听、定时器、Promise 回调里为什么经常会配合它使用。
 */

import { useEffect, useRef } from 'react';

export function useLatest<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    // 这里仅同步引用，不触发额外渲染。
    ref.current = value;
  }, [value]);

  return ref;
}
