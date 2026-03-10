/*
面试讲解点：useCounter Hook
- 题目本质：本质是把计数状态和增减重置逻辑封装为可复用 Hook。
- 复杂度：单次更新通常 O(1)。
- 易错点：闭包更新、批量更新、API 设计清晰度。
- 追问方向：可以追问 reducer 版本和状态机化。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useEffect, useState } from 'react';

export function useCounter(interval = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((prev) => prev + 1);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval]);

  return count;
}
