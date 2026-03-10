/*
面试讲解点：动态高度虚拟列表
- 题目本质：本质是只渲染可视区域元素，但要额外维护真实高度和偏移量。
- 复杂度：滚动时通常只处理可视区，理想渲染成本接近 O(visibleCount)。
- 易错点：高度测量、缓存失效、滚动跳动、overscan 设计。
- 追问方向：这是比固定高度版本更能体现前端能力的题。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useMemo } from 'react';

export function buildDynamicOffsets(heights: number[]) {
  const offsets = [0];
  for (let i = 0; i < heights.length; i += 1) {
    offsets[i + 1] = offsets[i] + heights[i];
  }
  return offsets;
}

export function useDynamicVirtualMeta(heights: number[]) {
  return useMemo(() => {
    const offsets = buildDynamicOffsets(heights);
    return {
      offsets,
      totalHeight: offsets[offsets.length - 1] ?? 0,
    };
  }, [heights]);
}
