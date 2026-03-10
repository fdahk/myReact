/*
面试讲解点：基础虚拟列表
- 题目本质：本质是只渲染可视区元素，通过占位高度模拟完整列表。
- 复杂度：渲染成本接近 O(visibleCount)。
- 易错点：开始索引计算、滚动容器高度、buffer 设计。
- 追问方向：可以追问动态高度版和 react-window。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useMemo, useState } from 'react';

export function SimpleVirtualList({ items, itemHeight = 40, height = 240 }: {
  items: string[];
  itemHeight?: number;
  height?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const visibleCount = Math.ceil(height / itemHeight) + 1;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleItems = useMemo(
    () => items.slice(startIndex, startIndex + visibleCount),
    [items, startIndex, visibleCount]
  );

  return (
    <div style={{ height, overflowY: 'auto' }} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
      <div style={{ position: 'relative', height: items.length * itemHeight }}>
        {visibleItems.map((item, index) => {
          const realIndex = startIndex + index;
          return (
            <div
              key={`${item}-${realIndex}`}
              style={{ position: 'absolute', top: realIndex * itemHeight, height: itemHeight, left: 0, right: 0 }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
