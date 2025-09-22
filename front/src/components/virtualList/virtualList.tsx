import React, { useState, useMemo, useRef } from 'react';
import style from './virtualList.module.scss'

// 组件参数 
interface VirtualListProps<T> {
    data: T[]; //数据 
    itemHeight: number; //元素高度
    scrollHeight: number; //可视区高度
    scrollWidth: number;
    bufferSize: number; //缓冲数量
    getItemKey: (item: T) => number | string; //获取元素key
    renderItem: (item: T, id: number | string) => React.ReactNode
}
function VirtualList<T>({scrollWidth, data, itemHeight, scrollHeight, bufferSize, getItemKey, renderItem}: VirtualListProps<T>) {
    const [topOffset, setTopOffset] = useState(0) //滚动区域顶部偏移量，这是唯一的响应式数据
    const ticking = useRef(false); //作为“锁”，防止同一帧内多次 setState
    const totalHeight = data.length * itemHeight //data变化会触发整个组件渲染，所以这个也会刷新，直接计算就可以
    // 注意左闭右开    
    const startIndex = Math.max( Math.floor(topOffset / itemHeight) - bufferSize - 1, 0 )
    const endIndex = Math.min( Math.ceil( (topOffset + scrollHeight) / itemHeight) + bufferSize, data.length ) 
    // 占位计算 
    const topPlaceholder = startIndex * itemHeight 
    // 异步更新
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (!ticking.current) {
            ticking.current = true;
            // 先取出 scrollTop，避免react事件合成系统销毁事件e
            const scrollTop = e.currentTarget.scrollTop;
            window.requestAnimationFrame(() => {
                setTopOffset(scrollTop);
                ticking.current = false;
            });
        }
    }
    // 性能优化
    const visibleItems = useMemo(() => data.slice(startIndex, endIndex)
        ,[data, startIndex, endIndex]);

    return (
        <div className={style.container} style={{width: scrollWidth, height: scrollHeight}}>
        {/* 滚动容器（可视范围） */}
        <div className={style.box} onScroll={handleScroll}>
            {/* 虚拟列表内容：总高度撑开容器，模拟真实滚动条 */}
            <div className={style.virtual_list} style={{height: totalHeight}}>
                {/* 顶部占位 */}
                <div style={{height: topPlaceholder}}></div> 
                {/* 可视项渲染 */}
                {
                    visibleItems.map((item) => {
                        return renderItem(item, getItemKey(item))
                    })
                }
            </div>
        </div>
        </div>
    )
}

export default VirtualList