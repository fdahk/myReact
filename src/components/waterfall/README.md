# 瀑布流组件 (Waterfall Component)

## 特性
    根据屏幕宽度自动调整列数
    防抖处理窗口resize事件
    支持自定义列数、间距等参数
    hover效果和过渡动画
    毛玻璃效果和渐变背景

## 数据类型

```tsx
interface WaterfallItem {
  id: number;          // 唯一标识
  title: string;       // 标题
  image: string;       // 图片URL
  height: number;      // 项目高度
  content?: string;    // 可选的内容描述
}
```

## 响应式断点

手机：(`< 480px`): 1列
平板 (`480px - 768px`): 2列  
小屏幕： (`768px - 1024px`): 3列
大屏幕： (`> 1024px`): 使用传入的columns值

## 实现原理

1. 使用"最短列优先"算法，每个新项目都放到当前最短的列中
2. 通过绝对定位精确控制每个项目的位置
3. 监听窗口大小变化，重新计算布局
4. 使用防抖技术避免频繁重排

注：
1. 图片高度需要预先计算好，以保证布局正确
