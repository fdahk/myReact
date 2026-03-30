/*
 * 实现目标：
 * - 手写一个最小版 `useImperativeHandle`，理解如何自定义暴露给父组件的 ref 能力。
 *
 * 核心思路：
 * - `ref.current` 默认指向某个实例或 DOM。
 * - `useImperativeHandle` 允许把 `ref.current` 改写成自定义 API 对象。
 * - 这通常和 `forwardRef` 配合使用。
 *
 * 复杂度 / 运行特征：
 * - 设置句柄本身 O(1)。
 *
 * 易错点：
 * - 它的目标是暴露有限的命令式 API，不是把整个内部实现随意暴露出去。
 * - 面试里可继续讲为何命令式能力应尽量收敛。
 */

export function useImperativeHandle<T>(
  ref: { current: T | null } | null,
  createHandle: () => T
) {
  if (ref) {
    ref.current = createHandle();
  }
}

const ref = { current: null as null | { focus: () => void } };
useImperativeHandle(ref, () => ({
  focus() {
    console.log('focus input');
  },
}));
ref.current?.focus();
