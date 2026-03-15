/*
 * 实现目标：
 * - 封装一个节流值版 `useThrottle`，把高频变化的输入值压缩成固定时间窗口内最多更新一次。
 * - 适合在 React 场景里处理滚动位置、窗口尺寸、输入联动等高频变化数据。
 *
 * 核心思路：
 * - 维护一个真正对外暴露的 `throttledValue`。
 * - 每次输入变化时判断距离上次更新时间是否已超过 `delay`。
 * - 若已到窗口边界则立即同步，否则补一个剩余时间的定时器，在窗口结束时更新。
 *
 * 复杂度 / 运行特征：
 * - 单次判断与调度是 O(1)。
 * - 该实现属于“立即更新 + 尾部补偿”的节流值方案，输出值会比原值有意延迟。
 *
 * 易错点：
 * - `remaining` 的计算容易写反，导致节流窗口失效。
 * - 忘记在 effect 清理旧定时器，会出现尾部多次提交。
 * - 节流值和节流函数并不等价，前者更适合参与渲染，后者更适合包裹事件处理器。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲高频状态治理、节流与防抖区别、Hook 化封装思路。
 * - 面试里可以继续展开 leading/trailing 语义，以及为什么要区分“值节流”和“函数节流”。
 */

import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastTimeRef.current);

    if (remaining <= 0) {
      // 超过节流窗口则立即同步最新值。
      lastTimeRef.current = now;
      setThrottledValue(value);
      return;
    }

    const timer = window.setTimeout(() => {
      // 窗口结束后再补一次，保证不会一直停留在旧值。
      lastTimeRef.current = Date.now();
      setThrottledValue(value);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return throttledValue;
}
