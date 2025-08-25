
- **useState**: 状态管理（烟花数组、选中形状、动画状态）
- **useCallback**: 性能优化，防止不必要的重新渲染
- **useRef**: DOM引用管理和动画ID存储
- **useEffect**: 生命周期管理和清理工作
- **useMemo**: 颜色数组缓存，避免每次渲染重新创建

### CSS 动画技术
#### 2. CSS渐变背景
```css
background: linear-gradient(
  135deg,
  #0c0c1e 0%,    /* 深蓝紫色 - 夜空效果 */
  #1a1a2e 25%,   /* 深紫色 */
  #16213e 50%,   /* 深蓝色 */
  #0f3460 75%,   /* 蓝色 */
  #533483 100%   /* 紫色 */
);
```
- 多色渐变创造夜空效果
- 135度角度实现对角渐变

#### 3. 伪元素星空背景
```css
.container::before {
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    /* ... 更多星星 */
}
```
- 使用伪元素创建星空背景
- 多个径向渐变叠加形成星星效果
- 不影响鼠标事件（pointer-events: none）

#### 4. CSS Keyframes 动画

**星星闪烁动画**
```css
@keyframes twinkle {
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
}
```

**火箭震动动画**
```css
@keyframes rocketShake {
  0% { transform: translate(-50%, -50%) rotate(-1deg); }
  100% { transform: translate(-50%, -50%) rotate(1deg); }
}
```

**粒子发光动画**
```css
@keyframes particleGlow {
  0% { transform: translate(-50%, -50%) scale(0.8); }
  100% { transform: translate(-50%, -50%) scale(1.2); }
}
```

#### 5. CSS Transform 变换
- **translate()**: 元素定位和居中
- **scale()**: 元素缩放效果
- **rotate()**: 旋转动画
- **组合变换**: 多个变换函数组合使用

#### 6. CSS Transition 过渡
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```
- 自定义缓动函数（贝塞尔曲线）
- 平滑的状态变化
- 提升用户体验

#### 7. 发光效果（Box-shadow）
```css
box-shadow: 
  0 0 10px currentColor,
  0 0 20px currentColor,
  0 0 30px currentColor;
```
- 多层阴影创建发光效果
- currentColor使用当前文字颜色
- 不同扩散半径创建光晕层次

#### 8. 毛玻璃效果
```css
backdrop-filter: blur(20px);
background: rgba(255, 255, 255, 0.1);
```
- backdrop-filter实现背景模糊
- 半透明背景增强层次感

## 🚀 JavaScript动画技术

### 1. requestAnimationFrame
```javascript
const animate = useCallback(() => {
  // 更新动画状态
  setFireworks(prevFireworks => {
    // 状态更新逻辑
  })
  
  // 继续动画循环
  animationIdRef.current = requestAnimationFrame(animate)
}, [])
```
- 浏览器优化的动画循环
- 与屏幕刷新率同步
- 自动暂停非活跃标签页

### 2. 数学公式实现形状

**心形公式**
```javascript
// x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
const heartX = 16 * Math.pow(Math.sin(t), 3)
const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
```

**圆形分布**
```javascript
const angle = (i / particleCount) * Math.PI * 2
const radius = 100 + Math.random() * 50
vx: Math.cos(angle) * radius * 0.1
vy: Math.sin(angle) * radius * 0.1
```

**五角星形状**
```javascript
const radius = (i % 7 === 0) ? 120 : 60 // 内外半径交替
```

**花朵形状（玫瑰曲线）**
```javascript
const r = 80 * Math.sin(6 * t) // 6个花瓣的玫瑰曲线
```

### 3. 物理模拟
```javascript
// 重力效果
vy: particle.vy + 0.2

// 空气阻力
vx: particle.vx * 0.98

// 生命周期衰减
life: particle.life - 0.02

// 尺寸缩小
size: particle.size * 0.99
```

### 4. 性能优化技术

**内存管理**
```javascript
.filter(particle => particle.life > 0) // 移除死亡粒子
.filter(firework => !firework.exploded || firework.particles.length > 0) // 清理完成的烟花
```

**状态批量更新**
```javascript
setFireworks(prevFireworks => {
  return prevFireworks.map(firework => {
    // 批量处理所有烟花
  })
})
```

**useCallback优化**
```javascript
const handleClick = useCallback((event) => {
  // 缓存事件处理函数
}, [selectedShape, colors])
```

## 🎨 用户体验设计

### 1. 响应式设计
```css
@media (max-width: 768px) {
  .clickHint { font-size: 1.2rem; }
  .shapeButton { min-width: 60px; }
}
```

### 2. 无障碍支持
```css
@media (prefers-contrast: high) {
  .container { background: #000; }
  .shapeButton { border-color: #fff; }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. 交互反馈
- 鼠标悬停效果
- 点击反馈动画
- 状态指示器
- 视觉层次设计

## 🔧 代码架构特点

### 1. TypeScript类型安全
```typescript
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}
```

### 2. 组件化设计
- 单一职责原则
- 状态集中管理
- 清晰的接口定义

### 3. 错误处理和边界情况
```javascript
if (!containerRef.current) return // 防御性编程
if (animationIdRef.current) {      // 清理动画
  cancelAnimationFrame(animationIdRef.current)
}
```

## 🎯 学习要点总结

### CSS动画核心概念
1. **Keyframes**: 定义动画关键帧
2. **Transform**: 2D/3D变换
3. **Transition**: 状态过渡
4. **Animation**: 复杂动画序列
5. **Timing Functions**: 缓动函数控制动画节奏

### React动画最佳实践
1. **状态驱动**: 用状态控制动画
2. **性能优化**: 使用useCallback、useMemo
3. **内存管理**: 及时清理动画和事件监听器
4. **用户体验**: 考虑可访问性和性能

### 数学在动画中的应用
1. **三角函数**: 圆形、波形动画
2. **参数方程**: 复杂形状绘制
3. **物理模拟**: 重力、摩擦力、弹性
4. **插值算法**: 平滑过渡效果

这个项目展示了如何将数学、物理、设计和编程完美结合，创造出令人印象深刻的动画效果！🎉