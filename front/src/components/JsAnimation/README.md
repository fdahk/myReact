### 1. DOM渲染优化

#### 1.1 使用 `transform` 替代 `left/top`
- **问题**：使用 `left/top` 会触发重排(reflow)，性能开销大
- **解决方案**：使用 `transform: translate()` 只触发重绘(repaint)
```tsx
// 优化前
style={{ left: particle.x, top: particle.y }}

// 优化后  
style={{ transform: `translate(${particle.x}px, ${particle.y}px)` }}
```

#### 1.2 添加 `will-change` 属性
- **作用**：提示浏览器该元素将发生变化，提前优化渲染层
```css
.particle {
  will-change: transform, opacity;
}
```

#### 1.3 固定粒子尺寸，使用 `scale` 控制大小
- **优势**：避免频繁修改 `width/height` 属性
```tsx
// 固定基础尺寸，用scale控制
style={{
  transform: `translate(${particle.x}px, ${particle.y}px) scale(${particle.size / 4})`,
}}
```

### 2. 动画循环优化

#### 2.1 动画节流机制
- **问题**：`requestAnimationFrame` 在高刷新率屏幕上可能过于频繁
- **解决方案**：添加时间间隔控制
```tsx
const animate = useCallback((currentTime: number = performance.now()) => {
  // 节流：限制动画更新频率
  if (currentTime - lastAnimationTime.current < PERFORMANCE_CONFIG.ANIMATION_THROTTLE) {
    animationIdRef.current = requestAnimationFrame(animate)
    return
  }
  lastAnimationTime.current = currentTime
  // ... 动画逻辑
}, [])
```

#### 2.2 减少对象创建
- **问题**：每帧都创建新的粒子对象导致频繁GC
- **解决方案**：直接修改现有对象属性
```tsx
// 优化前：创建新对象
.map(particle => ({
  ...particle,
  x: particle.x + particle.vx,
  y: particle.y + particle.vy,
}))

// 优化后：直接修改
.map(particle => {
  particle.x += particle.vx
  particle.y += particle.vy
  return particle
})
```

### 3. 内存管理优化

#### 3.1 对象池(Object Pool)模式
- **目的**：复用粒子对象，减少内存分配和垃圾回收
- **实现**：
```tsx
const particlePool = useRef<Particle[]>([])

const getParticleFromPool = useCallback((): Particle => {
  const pooled = particlePool.current.pop()
  if (pooled) {
    return pooled
  }
  // 池中没有则创建新对象
  return { id: 0, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, color: '', size: 0 }
}, [])

const returnParticleToPool = useCallback((particle: Particle) => {
  if (particlePool.current.length < 200) { // 限制池大小
    particlePool.current.push(particle)
  }
}, [])
```

#### 3.2 提前清理机制
- **策略**：不等粒子完全消失就清理，减少渲染负担
```tsx
.filter(particle => {
  if (particle.life <= PERFORMANCE_CONFIG.PARTICLE_CLEANUP_THRESHOLD) {
    returnParticleToPool(particle) // 回收到对象池
    return false
  }
  return true
})
```

#### 6.1 无障碍支持
- **减少动画模式**：为运动敏感用户禁用动画
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
