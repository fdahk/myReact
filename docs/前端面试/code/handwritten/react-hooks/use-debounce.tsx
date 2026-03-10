/*
面试讲解点：useDebounce Hook
- 题目本质：本质是把值变化延迟一段时间再生效，避免高频状态抖动。
- 复杂度：每次变更核心逻辑 O(1)。
- 易错点：依赖变化重置定时器、卸载清理、delay 变化边界。
- 追问方向：可以追问防抖函数版和防抖值版的区别。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// 示例：
// const debouncedKeyword = useDebounce(keyword, 300);
