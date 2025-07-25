import React, { useRef, useState, useEffect, useCallback } from "react";

interface VirtualListProps<T> {
  data: T[];
  height: number; // 容器高度
  itemHeight: number; // 预估单项高度（支持动态高度时为预估值）
  renderItem: (item: T, index: number) => React.ReactNode;
  buffer?: number; // 预渲染缓冲区，默认5
  getItemKey?: (item: T, index: number) => React.Key;
}

export function VirtualList<T>({
  data,
  height,
  itemHeight,
  renderItem,
  buffer = 5,
  getItemKey,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 计算可见区域的起止索引
  const total = data.length;
  const visibleCount = Math.ceil(height / itemHeight);
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const end = Math.min(
    total - 1,
    Math.ceil((scrollTop + height) / itemHeight) + buffer
  );

  // 滚动事件
  const onScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  // 总高度
  const totalHeight = total * itemHeight;

  // 偏移量
  const offsetY = start * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        height,
        position: "relative",
        width: "100%",
        willChange: "transform",
      }}
      onScroll={onScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: offsetY,
            left: 0,
            width: "100%",
          }}
        >
          {data.slice(start, end + 1).map((item, idx) =>
            renderItem(
              item,
              start + idx
            )
          )}
        </div>
      </div>
    </div>
  );
}