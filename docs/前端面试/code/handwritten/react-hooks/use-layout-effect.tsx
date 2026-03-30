/*
 * 实现目标：
 * - 手写一个最小版 `useLayoutEffect` 思路模型，理解它和 `useEffect` 的执行时机差异。
 *
 * 核心思路：
 * - 从语义上看，它与 `useEffect` 类似，都会在依赖变化时执行 effect 和 cleanup。
 * - 差别在于它应在浏览器绘制前同步执行，因此更适合测量布局和同步修正 DOM。
 * - 这里用最小模型表达“先 cleanup，再执行最新 effect”的机制。
 *
 * 复杂度 / 运行特征：
 * - 单次依赖比较 O(n)。
 *
 * 易错点：
 * - `useLayoutEffect` 不是性能优化工具，反而更容易阻塞绘制。
 * - 面试里要主动说它与 `useEffect` 的时机差异，而不只是 API 形状相似。
 */

const layoutEffectStates: Array<{ deps?: unknown[]; cleanup?: (() => void) | void }> = [];
let layoutEffectIndex = 0;

function depsChanged(prevDeps = [], nextDeps = []) {
  if (prevDeps.length !== nextDeps.length) {
    return true;
  }

  for (let index = 0; index < prevDeps.length; index += 1) {
    if (!Object.is(prevDeps[index], nextDeps[index])) {
      return true;
    }
  }

  return false;
}

function createLayoutEffectRuntime(component: () => void) {
  function render() {
    layoutEffectIndex = 0;
    component();
  }

  function useLayoutEffect(effect: () => void | (() => void), deps?: unknown[]) {
    const currentIndex = layoutEffectIndex;
    const previousState = layoutEffectStates[currentIndex];
    const shouldRun = !previousState || !deps || depsChanged(previousState.deps, deps);

    if (shouldRun) {
      previousState?.cleanup?.();
      const cleanup = effect();
      layoutEffectStates[currentIndex] = { deps, cleanup };
    }

    layoutEffectIndex += 1;
  }

  return { render, useLayoutEffect };
}

const runtime = createLayoutEffectRuntime(() => {
  runtime.useLayoutEffect(() => {
    console.log('layout effect run');
    return () => console.log('layout effect cleanup');
  }, [1]);
});

runtime.render();
