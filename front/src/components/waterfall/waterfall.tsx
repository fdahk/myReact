import React, { useState, useEffect, useRef, useCallback } from 'react';
import style from './waterfall.module.scss';

interface WaterfallItem {
  id: number;
  title: string;
  image: string;
  height: number;
  content?: string;
}

// 瀑布流组件属性
interface WaterfallProps {
  items: WaterfallItem[];
  columns?: number;
  gap?: number;
}

const Waterfall: React.FC<WaterfallProps> = ({ 
  items = [], 
  columns = 3, 
  gap = 16 
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // 容器引用
  const [currentColumns, setCurrentColumns] = useState(columns); // 当前列数
  const [columnHeights, setColumnHeights] = useState<number[]>(new Array(columns).fill(0)); // 列高度
  const [itemPositions, setItemPositions] = useState<Array<{left: number, top: number}>>([]); // 元素位置
  const [containerWidth, setContainerWidth] = useState(0); // 容器宽度

  // 响应式列数计算
  const getResponsiveColumns = useCallback((width: number) => {
    if (width < 480) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return columns;
  }, [columns]);

  // 计算布局
  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth; // 容器宽度
    const responsiveColumns = getResponsiveColumns(containerWidth); // 响应式列数
    const columnWidth = (containerWidth - gap * (responsiveColumns - 1)) / responsiveColumns; // 列宽度
    const heights = new Array(responsiveColumns).fill(0); // 列高度
    const positions: Array<{left: number, top: number}> = []; // 元素位置

    items.forEach((item) => {
      // 找到最短的列
      const shortestColumnIndex = heights.indexOf(Math.min(...heights));
      
      // 计算位置
      const left = shortestColumnIndex * (columnWidth + gap);
      const top = heights[shortestColumnIndex];
      
      positions.push({ left, top });
      
      // 更新该列的高度
      heights[shortestColumnIndex] += item.height + gap;
    });

    setCurrentColumns(responsiveColumns);
    setColumnHeights(heights);
    setItemPositions(positions);
    setContainerWidth(containerWidth);
  }, [items, gap, getResponsiveColumns]);

  // 防抖的窗口大小变化处理
  useEffect(() => {
    let timeoutId: number; // 防抖定时器
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        calculateLayout();
      }, 150); // 150ms防抖
    };

    window.addEventListener('resize', handleResize);
    calculateLayout(); // 初始计算

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [calculateLayout]); // 依赖项：计算布局函数

  // 容器高度为最高列的高度
  const containerHeight = Math.max(...columnHeights);
  
  return (
    <div className={style.container}>
      <div 
        ref={containerRef}
        className={style.waterfall}
        style={{ 
          height: containerHeight,
          position: 'relative'
        }}
      >
        {items.map((item, index) => {

          const position = itemPositions[index];
          if (!position) return null;

          const columnWidth = containerWidth > 0 
            ? (containerWidth - gap * (currentColumns - 1)) / currentColumns 
            : 300;

          return (
            <div
              key={item.id}
              className={style.item}
              style={{
                position: 'absolute',
                left: position.left,
                top: position.top,
                width: columnWidth,
                height: item.height,
                transition: 'all 0.3s ease'
              }}
            >
              <div className={style.itemContent}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={style.image}
                />
                <div className={style.info}>
                  <h3 className={style.itemTitle}>{item.title}</h3>
                  <p className={style.content}>{item.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Waterfall;