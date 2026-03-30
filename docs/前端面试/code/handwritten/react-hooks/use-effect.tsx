/*
 * 实现目标：
 * - 手写一个教学版 `useEffect` 运行模型，理解依赖比较、执行副作用、清理副作用的基本流程。
 *
 * 核心思路：
 * - 每次渲染后比较新旧依赖。
 * - 依赖变化时先执行上一次 cleanup，再执行新的 effect。
 * - 把 cleanup 和 deps 一起存到 Hook 槽位中。
 *
 * 复杂度 / 运行特征：
 * - 单次依赖比较 O(n)，n 为依赖项数量。
 * - 这是最小原理版，不包含真实 React 的提交阶段、优先级和并发渲染细节。
 *
 * 易错点：
 * - `useEffect` 不会在渲染期间直接同步执行 DOM 副作用，真实 React 是 commit 后执行。
 * - 依赖数组错误会导致副作用重复执行或拿到旧值。
 */

const effectStates: Array<{ deps?: unknown[]; cleanup?: (() => void) | void }> = [];
let effectIndex = 0;

function areDepsEqual(prevDeps = [], nextDeps = []) {
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

function createEffectRuntime(component: () => void) {
  function render() {
    effectIndex = 0;
    component();
  }

  function useEffect(effect: () => void | (() => void), deps?: unknown[]) {
    const currentIndex = effectIndex;
    const previousState = effectStates[currentIndex];
    const changed = !previousState || !deps || !areDepsEqual(previousState.deps, deps);

    if (changed) {
      previousState?.cleanup?.();
      const cleanup = effect();
      effectStates[currentIndex] = { deps, cleanup };
    }

    effectIndex += 1;
  }

  return { render, useEffect };
}

const runtime = createEffectRuntime(() => {
  runtime.useEffect(() => {
    console.log('effect run');
    return () => console.log('effect cleanup');
  }, [1]);
});

runtime.render();
