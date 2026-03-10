/*
面试讲解点：useLatest Hook
- 题目本质：本质是用 ref 始终保存最新值，解决闭包读到旧值的问题。
- 复杂度：读写 ref 都是 O(1)。
- 易错点：ref 不触发重渲染、只适合读最新值不适合做 UI 驱动。
- 追问方向：可以追问 stale closure 和 useRef 使用边界。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useEffect, useRef } from 'react';

export function useLatest<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
