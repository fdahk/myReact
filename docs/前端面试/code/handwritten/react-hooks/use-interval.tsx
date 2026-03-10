/*
面试讲解点：useInterval Hook
- 题目本质：本质是把定时器副作用和最新回调解耦，避免 stale closure。
- 复杂度：单次 tick 执行成本由回调决定。
- 易错点：回调引用更新、清理时机、暂停恢复。
- 追问方向：可以追问为什么不能直接在 effect 里裸写 setInterval。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay]);
}
