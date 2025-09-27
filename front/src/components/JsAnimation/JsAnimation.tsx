import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import style from './JsAnimation.module.scss'

// 性能配置
const PERFORMANCE_CONFIG = {
  MAX_FIREWORKS: 20, // 最大同时存在的烟花数
  MAX_PARTICLES_PER_FIREWORK: 30, // 每个烟花的最大粒子数
  ANIMATION_THROTTLE: 16, // 动画节流间隔(ms)
  PARTICLE_CLEANUP_THRESHOLD: 0.1, // 粒子清理阈值
  USE_TRANSFORM: true, // 使用transform而不是left/top
} as const

// 烟花形状常量
const FireworkShape = {
  HEART: 'heart',
  FLOWER: 'flower'
} as const //as const 表示常量: 阻止类型推断

// 烟花形状模型
// 使用联合类型获取的也是联合类型
type FireworkShape = typeof FireworkShape[keyof typeof FireworkShape]

// 烟花粒子模型
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number; // x轴速度
  vy: number; // y轴速度
  life: number; // 生命周期
  maxLife: number; // 最大生命周期
  color: string;
  size: number;
}

// 性能质量等级
const QUALITY_LEVELS = {
  LOW: { particles: 20, fireworks:  10},
  MEDIUM: { particles: 30, fireworks: 20 },
  HIGH: { particles: 50, fireworks: 30 }
} as const

type QualityLevel = keyof typeof QUALITY_LEVELS

// 烟花实例模型
interface Firework {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  particles: Particle[];
  exploded: boolean;
  shape: FireworkShape;
  color: string;
}

function Animation() {
  const [fireworks, setFireworks] = useState<Firework[]>([]) // 存储所有烟花实例
  const [selectedShape, setSelectedShape] = useState<FireworkShape>(FireworkShape.HEART) // 当前选中的形状
  const [qualityLevel, setQualityLevel] = useState<QualityLevel>('MEDIUM') // 性能质量等级
  
  // DOM引用，避免重复查找
  const containerRef = useRef<HTMLDivElement>(null) // 烟花容器引用
  const animationIdRef = useRef<number | undefined>(undefined) // 动画ID引用
  const lastAnimationTime = useRef<number>(0) // 上次动画时间，用于节流
  const particlePool = useRef<Particle[]>([]) // 粒子对象池，复用对象减少GC
  
  // 颜色配置 - 预定义的烟花颜色数组（使用useMemo优化性能）
  const colors = useMemo(() => [
    '#FF6B6B', // 红色
    '#4ECDC4', // 蓝色
    '#45B7D1', // 绿色
    '#96CEB4', // 黄色
    '#FFEAA7', // 粉色
    '#DDA0DD', // 紫色
    '#98D8C8', // 青色
    '#F7DC6F' // 橙色
  ], [])

  /**
   * 从对象池获取或创建粒子对象，减少内存分配
   */
  const getParticleFromPool = useCallback((): Particle => {
    const pooled = particlePool.current.pop()
    if (pooled) {
      return pooled
    }
    // 如果池中没有，创建新对象
    return {
      id: 0, x: 0, y: 0, vx: 0, vy: 0, 
      life: 0, maxLife: 0, color: '', size: 0
    }
  }, [])

  /**
   * 将粒子对象返回池中复用
   */
  const returnParticleToPool = useCallback((particle: Particle) => {
    if (particlePool.current.length < 200) { // 限制池大小
      particlePool.current.push(particle)
    }
  }, [])

  /**
   * 使用数学函数生成不同的粒子分布（使用对象池）
   * @param shape 烟花形状
   * @param centerX 中心X坐标
   * @param centerY 中心Y坐标
   * @param color 粒子颜色
   * @returns 粒子数组
   */
  const generateShapeParticles = useCallback((
    shape: FireworkShape, 
    centerX: number, 
    centerY: number, 
    color: string
  ): Particle[] => {
    const particles: Particle[] = []
    let particleCount = 0

    // 根据性能等级调整粒子数量
    const maxParticles = QUALITY_LEVELS[qualityLevel].particles
    
    switch (shape) {
      case FireworkShape.HEART:
        // 心形数学公式: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
        particleCount = Math.min(50, maxParticles)
        for (let i = 0; i < particleCount; i++) {
          const t = (i / particleCount) * Math.PI * 2
          const heartX = 16 * Math.pow(Math.sin(t), 3)
          const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
          
          const particle = getParticleFromPool()
          particle.id = i
          particle.x = centerX
          particle.y = centerY
          particle.vx = heartX * 0.3
          particle.vy = heartY * 0.3
          particle.life = 2
          particle.maxLife = 2
          particle.color = color
          particle.size = Math.random() * 3 + 2
          
          particles.push(particle)
        }
        break
      case FireworkShape.FLOWER:
        // 花朵形状 - 使用玫瑰曲线公式
        particleCount = Math.min(60, maxParticles)
        for (let i = 0; i < particleCount; i++) {
          const t = (i / particleCount) * Math.PI * 4
          const r = 80 * Math.sin(6 * t) // 玫瑰曲线，6个花瓣
          
          const particle = getParticleFromPool()
          particle.id = i
          particle.x = centerX
          particle.y = centerY
          particle.vx = r * Math.cos(t) * 0.1
          particle.vy = r * Math.sin(t) * 0.1
          particle.life = 1
          particle.maxLife = 1
          particle.color = color
          particle.size = Math.random() * 3 + 2
          
          particles.push(particle)
        }
        break
    }

    return particles
  }, [qualityLevel, getParticleFromPool]) // 使用对象池，减少内存分配

  /**
   * 处理鼠标点击事件 - 创建新的烟花
   * 使用事件委托和坐标转换
   * @param event 鼠标事件对象
   */
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    // 获取容器的边界信息，用于坐标转换
    const rect = containerRef.current.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    // 随机选择颜色
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    // 创建新的烟花实例
    const newFirework: Firework = {
      id: Date.now() + Math.random(), // 使用时间戳+随机数确保唯一性
      x: clickX,
      y: rect.height, // 从底部开始
      targetX: clickX,
      targetY: clickY,
      speed: 4, // 上升速度
      particles: [],
      exploded: false,
      shape: selectedShape,
      color: randomColor
    }

    // 更新烟花数组，限制最大数量以优化性能
    setFireworks(prev => {
      const maxFireworks = QUALITY_LEVELS[qualityLevel].fireworks
      const newFireworks = [...prev, newFirework]
      // 如果超过最大数量，移除最老的烟花
      return newFireworks.length > maxFireworks 
        ? newFireworks.slice(-maxFireworks)
        : newFireworks
    })
  }, [selectedShape, colors, qualityLevel])

  /**
   * 动画循环函数 - 使用requestAnimationFrame实现流畅动画，负责更新所有烟花和粒子的状态
   * 添加节流机制以优化性能
   */
  const animate = useCallback((currentTime: number = performance.now()) => {
    // 节流：限制动画更新频率
    if (currentTime - lastAnimationTime.current < PERFORMANCE_CONFIG.ANIMATION_THROTTLE) {
      animationIdRef.current = requestAnimationFrame(animate)
      return
    }
    lastAnimationTime.current = currentTime
    
    setFireworks(prevFireworks => {
      return prevFireworks.map(firework => {
        if (!firework.exploded) {
          // 烟花上升阶段 - 使用线性插值和缓动函数
          const newY = firework.y - firework.speed
          
          // 检查是否到达目标位置（添加一些容差）
          if (newY <= firework.targetY + 20) {
            // 到达目标位置，开始爆炸
            const particles = generateShapeParticles(
              firework.shape,
              firework.targetX,
              firework.targetY,
              firework.color
            )
            
            return {
              ...firework,
              y: firework.targetY,
              exploded: true,
              particles: particles
            }
          }
          
          return { ...firework, y: newY }
        } else {
          // 粒子扩散和衰减阶段 - 优化：减少对象创建
          const updatedParticles = firework.particles
            .map(particle => {
              // 直接修改属性，避免创建新对象
              particle.x += particle.vx
              particle.y += particle.vy
              particle.vy += 0.1 // 重力
              particle.vx *= 0.98 // 空气阻力
              particle.life -= 0.02 // 生命周期衰减
              particle.size *= 0.99 // 尺寸缩小
              return particle
            })
            .filter(particle => {
              if (particle.life <= PERFORMANCE_CONFIG.PARTICLE_CLEANUP_THRESHOLD) {
                // 将死亡粒子返回对象池
                returnParticleToPool(particle)
                return false
              }
              return true
            })

          return {
            ...firework,
            particles: updatedParticles
          }
        }
      }).filter(firework => {
        // 清理完全消失的烟花，优化内存使用
        return !firework.exploded || firework.particles.length > 0
      })
    })

    // 继续动画循环
    animationIdRef.current = requestAnimationFrame(animate)
  }, [generateShapeParticles, returnParticleToPool])

  /**
   * 使用useEffect管理动画生命周期
   * 确保在组件卸载时清理动画，防止内存泄漏
   */
  useEffect(() => {
    if (fireworks.length > 0) {
      animationIdRef.current = requestAnimationFrame(animate)
    } else {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }

    // 清理函数
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [fireworks.length, animate])

  /**
   * 组件卸载时的清理工作（添加内存清理）
   */
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      // 清空对象池释放内存
      particlePool.current = []
    }
  }, [])

  return (
    <div className={style.container}>
      {/* 主要的烟花显示区域 */}
      <div 
        ref={containerRef}
        className={style.fireworkArea}
        onClick={handleClick}
      >
        {/* 渲染所有烟花 */}
        {fireworks.map(firework => (
          <div key={firework.id}>
            {/* 未爆炸的烟花火箭 - 使用transform优化性能 */}
            {!firework.exploded && (
              <div
                className={style.rocket}
                style={{
                  transform: `translate(${firework.x}px, ${firework.y}px)`,
                  backgroundColor: firework.color
                }}
              >
                {/* 火箭尾焰效果 */}
                <div 
                  className={style.trail}
                  style={{ backgroundColor: firework.color }}
                />
              </div>
            )}

            {/* 已爆炸的烟花粒子 - 使用transform和will-change优化 */}
            {firework.exploded && firework.particles.map(particle => (
              <div
                key={particle.id}
                className={style.particle}
                style={{
                  transform: `translate(${particle.x}px, ${particle.y}px) scale(${particle.size / 4})`,
                  backgroundColor: particle.color,
                  opacity: particle.life / particle.maxLife,
                  willChange: 'transform, opacity'
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* 底部操作面板 */}
      <div className={style.controlPanel}>
        <h3 className={style.panelTitle}>选择烟花形状</h3>
        
        {/* 性能质量选择器 */}
        <div className={style.qualitySelector}>
          <span className={style.qualityLabel}>性能模式：</span>
          {Object.keys(QUALITY_LEVELS).map(level => (
            <button
              key={level}
              className={`${style.qualityButton} ${
                qualityLevel === level ? style.active : ''
              }`}
              onClick={() => setQualityLevel(level as QualityLevel)}
            >
              {level === 'LOW' && '低'}
              {level === 'MEDIUM' && '中'}
              {level === 'HIGH' && '高'}
            </button>
          ))}
        </div>
        
        <div className={style.shapeSelector}>
          {Object.values(FireworkShape).map(shape => (
            <button
              key={shape}
              className={`${style.shapeButton} ${
                selectedShape === shape ? style.active : ''
              }`}
              onClick={() => setSelectedShape(shape)}
            >
              <span className={style.shapeIcon}>
                {shape === FireworkShape.HEART && '💖'}
                {shape === FireworkShape.FLOWER && '🌸'}
              </span>
              <span className={style.shapeName}>
                {shape === FireworkShape.HEART && '心形'}
                {shape === FireworkShape.FLOWER && '花朵'}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Animation;