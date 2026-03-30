/*
 * 实现目标：
 * - 手写一个极简版 `useState` 运行模型，帮助理解 Hook 为什么依赖调用顺序。
 *
 * 核心思路：
 * - 用数组按顺序存储每个 Hook 的状态。
 * - 每次“渲染”时通过全局游标读取当前槽位。
 * - `setState` 更新对应槽位后，再触发一次重新渲染。
 *
 * 复杂度 / 运行特征：
 * - 单次读取 / 更新都可近似看作 O(1)。
 * - 这只是教学级最小模型，不是真实 React 的 Fiber / 调度 / 批处理实现。
 *
 * 易错点：
 * - 一旦 Hook 调用顺序变化，状态槽位就会错位。
 * - 面试里要主动说明真实 React 远比这个复杂，这里只是帮助理解基本原理。
 *
 * 适用场景 / 面试表达点：
 * - 非常适合解释“为什么 Hook 不能写在条件判断里”。
 */

const hookStates: unknown[] = [];
let hookIndex = 0;

function createRenderer(component: () => void) {
  function render() {
    hookIndex = 0;
    component();
  }

  function useState<T>(initialValue: T) {
    const currentIndex = hookIndex;

    if (hookStates[currentIndex] === undefined) {
      hookStates[currentIndex] = initialValue;
    }

    const setState = (value: T | ((prev: T) => T)) => {
      const prevState = hookStates[currentIndex] as T;
      hookStates[currentIndex] =
        typeof value === 'function' ? (value as (prev: T) => T)(prevState) : value;
      render();
    };

    const state = hookStates[currentIndex] as T;
    hookIndex += 1;
    return [state, setState] as const;
  }

  return { render, useState };
}

const app = createRenderer(() => {
  const [count, setCount] = app.useState(0);
  console.log('render count:', count);

  if (count < 1) {
    setCount((prev) => prev + 1);
  }
});

app.render();
