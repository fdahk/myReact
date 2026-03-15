/*
 * 实现目标：
 * - 提供一个 `usePrevious` Hook，用来读取某个值在上一次渲染提交后的快照。
 * - 让组件能够方便地做前后值对比，例如动画触发、表单变更提示、差异日志记录。
 *
 * 核心思路：
 * - 用 `ref` 存储“上一次提交后的值”。
 * - 当前渲染先返回旧值；等本次渲染提交后，再在 effect 中把当前值写入 ref，供下一轮读取。
 *
 * 复杂度 / 运行特征：
 * - 每次更新只做 O(1) 的 ref 写入。
 * - 首次渲染还没有历史值，因此会返回 `undefined`，这正是该 Hook 的自然边界。
 *
 * 易错点：
 * - 若把赋值放在渲染期间而不是 effect 中，拿到的就不再是“上一次值”。
 * - 使用方要处理首屏 `undefined`，不能假设它一定存在。
 * - 它适合做对比辅助，不适合替代正式状态管理。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲前后值比较、提交时机、`useRef` 持久化存储的典型用法。
 * - 面试里可以强调：返回旧值的关键在于“先读后写”，而写入发生在 effect 阶段。
 */

import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    // 提交后再记录当前值，下一次渲染读取到的才是“上一次值”。
    ref.current = value;
  }, [value]);

  return ref.current;
}
