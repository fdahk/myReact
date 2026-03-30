/*
 * 实现目标：
 * - 手写一个最小版 `forwardRef`，理解父组件如何把 ref 透传给函数组件内部。
 *
 * 核心思路：
 * - 普通函数组件默认拿不到 ref。
 * - `forwardRef` 本质上是包一层高阶函数，把 `ref` 作为第二个参数传给内部渲染函数。
 * - 真正 React 内部会用特殊类型标记组件，而这里用最小模型表达调用关系。
 *
 * 复杂度 / 运行特征：
 * - 包装层本身 O(1)。
 *
 * 易错点：
 * - `ref` 不是普通 props。
 * - 面试里通常会继续追问 `useImperativeHandle`。
 */

function forwardRef<Props, RefValue>(
  render: (props: Props, ref: { current: RefValue | null } | null) => unknown
) {
  return function ForwardRefComponent(props: Props & { ref?: { current: RefValue | null } }) {
    return render(props, props.ref || null);
  };
}

const Input = forwardRef<{ placeholder: string }, HTMLInputElement>((props, ref) => {
  return { ...props, ref };
});

console.log(Input({ placeholder: 'type here', ref: { current: null } }));

export { forwardRef };
