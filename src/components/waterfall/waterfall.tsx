import React, { useState, useEffect, useRef, useCallback } from 'react';
import style from './waterfall.module.scss';

// 瀑布流项目接口
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

// 生成模拟数据
const generateMockData = (count: number): WaterfallItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    image: `https://picsum.photos/300/${200 + Math.floor(Math.random() * 200)}?random=${index}`,
    height: 200 + Math.floor(Math.random() * 200),
    content: `这是第${index + 1}个项目的内容描述...`
  }));
};

const Waterfall: React.FC<WaterfallProps> = ({ 
  items = generateMockData(20), 
  columns = 3, 
  gap = 16 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentColumns, setCurrentColumns] = useState(columns);
  const [columnHeights, setColumnHeights] = useState<number[]>(new Array(columns).fill(0));
  const [itemPositions, setItemPositions] = useState<Array<{left: number, top: number}>>([]);
  const [containerWidth, setContainerWidth] = useState(0);

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
    
    const containerWidth = containerRef.current.offsetWidth;
    const responsiveColumns = getResponsiveColumns(containerWidth);
    const columnWidth = (containerWidth - gap * (responsiveColumns - 1)) / responsiveColumns;
    const heights = new Array(responsiveColumns).fill(0);
    const positions: Array<{left: number, top: number}> = [];

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
    let timeoutId: number;
    
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
  }, [calculateLayout]);

  // 容器高度为最高列的高度
  const containerHeight = Math.max(...columnHeights);

  return (
    <div className={style.container}>
      <h2 className={style.title}>瀑布流布局演示</h2>
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