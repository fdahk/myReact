/*
 * 实现目标：
 * - 给出一个固定高度场景下的基础虚拟列表实现，只渲染当前视窗附近的少量项目。
 * - 用最小代码说明“完整高度占位 + 可视窗口裁剪 + 绝对定位回填”的经典方案。
 *
 * 核心思路：
 * - 通过 `scrollTop / itemHeight` 计算当前滚动起点对应的数据索引。
 * - 只截取可视区所需的数据切片，并在一个总高度占位容器中按真实索引绝对定位。
 * - 额外多渲染一个元素，减少滚动临界点时的闪烁感。
 *
 * 复杂度 / 运行特征：
 * - 滚动时窗口计算是 O(1)，实际渲染成本接近 O(visibleCount)。
 * - 占位容器仍然模拟了完整列表总高度，因此滚动条行为与真实长列表保持一致。
 *
 * 易错点：
 * - 固定高度前提必须成立，否则索引和偏移都会失真。
 * - `startIndex`、`visibleCount` 和容器总高度三者必须互相匹配。
 * - 若没有预渲染缓冲，快速滚动到边界时可能出现短暂白屏。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲超长列表性能优化、虚拟滚动基础原理、`react-window` 背后的核心思想。
 * - 面试里可继续扩展到 overscan、动态高度、滚动定位恢复等进阶问题。
 */

import { useMemo, useState } from 'react';

export function SimpleVirtualList({ items, itemHeight = 40, height = 240 }: {
  items: string[];
  itemHeight?: number;
  height?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  // 多渲染一个元素，减少临界滚动位置的空白闪烁。
  const visibleCount = Math.ceil(height / itemHeight) + 1;
  // 固定高度场景下，滚动距离可以直接换算成起始索引。
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleItems = useMemo(
    () => items.slice(startIndex, startIndex + visibleCount),
    [items, startIndex, visibleCount]
  );

  return (
    <div
      style={{ height, overflowY: 'auto' }}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div style={{ position: 'relative', height: items.length * itemHeight }}>
        {visibleItems.map((item, index) => {
          const realIndex = startIndex + index;
          return (
            <div
              key={`${item}-${realIndex}`}
              // 用真实索引计算绝对定位，模拟其在完整列表中的原始位置。
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
