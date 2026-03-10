/*
面试讲解点：usePrevious Hook
- 题目本质：本质是用 ref 保存上一次渲染值，便于做差异比较。
- 复杂度：核心逻辑 O(1)。
- 易错点：首次渲染返回值、更新时机、和 useRef 的关系。
- 追问方向：可以追问动画比较、表单变更提示。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
