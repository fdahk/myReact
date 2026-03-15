/*
 * 实现目标：
 * - 封装一个可复用的 `useInterval` Hook，让组件可以用声明式方式启动、停止周期任务。
 * - 解决定时器回调里常见的 stale closure 问题，保证每次 tick 执行的都是最新逻辑。
 *
 * 核心思路：
 * - 用 `ref` 保存最新的 `callback`，让定时器始终读取 `ref.current` 而不是旧闭包。
 * - 用一个 effect 同步最新回调，用另一个 effect 负责定时器的创建与销毁。
 * - 当 `delay` 为 `null` 时直接不创建定时器，作为暂停语义。
 *
 * 复杂度 / 运行特征：
 * - Hook 自身维护成本是 O(1)，每次定时 tick 的真实开销取决于外部传入回调。
 * - 回调更新不会强制重建 interval，只有 `delay` 变化才会重新注册。
 *
 * 易错点：
 * - 直接把 `callback` 写进 `setInterval` 的闭包里，很容易在后续渲染中读到旧状态。
 * - 卸载不清理定时器会造成内存泄漏和越界更新。
 * - 需要明确 `delay = null`、`delay = 0` 等边界语义。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲轮询、倒计时、自动刷新、Hook 封装与 stale closure 规避。
 * - 面试时可以顺带解释为什么“最新回调 ref + 独立定时器 effect”是最常见写法。
 */

import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    // 始终保存最新回调，避免 interval 内部读到旧闭包。
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      // 真正执行时从 ref 读取最新逻辑，而不是依赖首次创建时的 callback。
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay]);
}
