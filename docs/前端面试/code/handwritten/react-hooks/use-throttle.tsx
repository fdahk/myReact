/*
面试讲解点：useThrottle Hook
- 题目本质：本质是让高频变化在固定间隔内最多更新一次。
- 复杂度：每次变更核心逻辑 O(1)。
- 易错点：leading/trailing 语义、清理定时器、值同步延迟。
- 追问方向：可以追问节流值版和节流函数版差异。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastTimeRef.current);

    if (remaining <= 0) {
      lastTimeRef.current = now;
      setThrottledValue(value);
      return;
    }

    const timer = window.setTimeout(() => {
      lastTimeRef.current = Date.now();
      setThrottledValue(value);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return throttledValue;
}
