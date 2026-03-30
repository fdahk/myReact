/*
 * 实现目标：
 * - 手写一个最小版 `React.memo`，理解基于 props 比较跳过组件重复渲染的思路。
 *
 * 核心思路：
 * - 用闭包保存上一次 props 和渲染结果。
 * - 比较函数判断 props 是否相等；若相等则复用上次结果。
 * - 若不相等，重新执行组件函数并更新缓存。
 *
 * 复杂度 / 运行特征：
 * - 默认浅比较复杂度与 props 数量 n 成正比。
 * - 它优化的是“重复执行组件函数”的成本，不会阻止父组件自身渲染。
 *
 * 易错点：
 * - 若 props 中经常传入新对象 / 新函数，浅比较很容易失效。
 * - 这是教学版思路，不是真正 React 内部 Fiber 级 memo 实现。
 *
 * 适用场景 / 面试表达点：
 * - 适合解释 `React.memo`、浅比较和引用稳定性。
 */

function shallowEqual(prevProps: Record<string, unknown>, nextProps: Record<string, unknown>) {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  return prevKeys.every((key) => Object.is(prevProps[key], nextProps[key]));
}

export function reactMemo<Props extends Record<string, unknown>>(
  Component: (props: Props) => unknown,
  areEqual = shallowEqual
) {
  let prevProps: Props | null = null;
  let prevResult: unknown;

  return function MemoizedComponent(props: Props) {
    if (prevProps && areEqual(prevProps, props)) {
      return prevResult;
    }

    prevProps = props;
    prevResult = Component(props);
    return prevResult;
  };
}
