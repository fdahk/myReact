import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import style from './animation.module.scss'

// 烟花形状常量 - 定义不同的烟花绽放形状
const FireworkShape = {
  HEART: 'heart',
  CIRCLE: 'circle', 
  STAR: 'star',
  FLOWER: 'flower'
} as const //as const 表示常量: 阻止类型推断

// 烟花形状类型
type FireworkShape = typeof FireworkShape[keyof typeof FireworkShape]

// 烟花粒子接口 - 每个烟花粒子的属性
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

// 烟花实例接口 - 定义整个烟花的属性
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
  
  // DOM引用，避免重复查找
  const containerRef = useRef<HTMLDivElement>(null) // 烟花容器引用
  const animationIdRef = useRef<number | undefined>(undefined) // 动画ID引用
  
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
   * 使用数学函数生成不同的粒子分布
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

    switch (shape) {
      case FireworkShape.HEART:
        // 心形数学公式: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
        particleCount = 50
        for (let i = 0; i < particleCount; i++) {
          const t = (i / particleCount) * Math.PI * 2
          const heartX = 16 * Math.pow(Math.sin(t), 3)
          const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
          
          particles.push({
            id: i, // 粒子ID
            x: centerX, // 中心X坐标
            y: centerY, // 中心Y坐标
            vx: heartX * 0.3, // 控制扩散速度
            vy: heartY * 0.3,
            life: 2, // 生命周期
            maxLife: 2, // 最大生命周期
            color: color, // 颜色
            size: Math.random() * 3 + 2 // 大小
          })
        }
        break

      case FireworkShape.CIRCLE:
        // 圆形分布 - 使用极坐标系统
        particleCount = 40
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2
          const radius = 100 + Math.random() * 50
          
          particles.push({
            id: i,
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * radius * 0.1,
            vy: Math.sin(angle) * radius * 0.1,
            life: 1,
            maxLife: 1,
            color: color,
            size: Math.random() * 4 + 2
          })
        }
        break

      case FireworkShape.STAR:
        // 五角星形状 - 使用正五角星的数学公式
        particleCount = 35
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2
          // 五角星有内外两个半径，创造尖角效果
          const radius = (i % 7 === 0) ? 120 : 60
          
          particles.push({
            id: i,
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * radius * 0.1,
            vy: Math.sin(angle) * radius * 0.1,
            life: 1,
            maxLife: 1,
            color: color,
            size: Math.random() * 3 + 2
          })
        }
        break

      case FireworkShape.FLOWER:
        // 花朵形状 - 使用玫瑰曲线公式
        particleCount = 60
        for (let i = 0; i < particleCount; i++) {
          const t = (i / particleCount) * Math.PI * 4
          const r = 80 * Math.sin(6 * t) // 玫瑰曲线，6个花瓣
          
          particles.push({
            id: i,
            x: centerX,
            y: centerY,
            vx: r * Math.cos(t) * 0.1,
            vy: r * Math.sin(t) * 0.1,
            life: 1,
            maxLife: 1,
            color: color,
            size: Math.random() * 3 + 2
          })
        }
        break
    }

    return particles
  }, [])

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

    // 更新烟花数组，使用函数式更新避免状态竞争
    setFireworks(prev => [...prev, newFirework])
  }, [selectedShape, colors])

  /**
   * 动画循环函数 - 使用requestAnimationFrame实现流畅动画，负责更新所有烟花和粒子的状态
   */
  const animate = useCallback(() => {
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
          // 粒子扩散和衰减阶段
          const updatedParticles = firework.particles
            .map(particle => ({
              ...particle,
              x: particle.x + particle.vx, // 粒子x轴位置
              y: particle.y + particle.vy, // 粒子y轴位置
              vy: particle.vy + 0.1, // 重力
              vx: particle.vx * 0.98, // 空气阻力
              life: particle.life - 0.02, // 生命周期衰减
              size: particle.size * 0.99 // 尺寸缩小
            }))
            .filter(particle => particle.life > 0) // 移除生命周期结束的粒子

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
  }, [generateShapeParticles])

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
   * 组件卸载时的清理工作
   */
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
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
            {/* 未爆炸的烟花火箭 */}
            {!firework.exploded && (
              <div
                className={style.rocket}
                style={{
                  left: firework.x,
                  top: firework.y,
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

            {/* 已爆炸的烟花粒子 */}
            {firework.exploded && firework.particles.map(particle => (
              <div
                key={particle.id}
                className={style.particle}
                style={{
                  left: particle.x,
                  top: particle.y,
                  backgroundColor: particle.color,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.life,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* 底部控制面板 */}
      <div className={style.controlPanel}>
        <h3 className={style.panelTitle}>选择烟花形状</h3>
        <div className={style.shapeSelector}>
          {Object.values(FireworkShape).map(shape => (
            <button
              key={shape}
              className={`${style.shapeButton} ${
                selectedShape === shape ? style.active : ''
              }`}
              onClick={() => setSelectedShape(shape)}
            >
              {/* 为每种形状添加对应的emoji图标 */}
              <span className={style.shapeIcon}>
                {shape === FireworkShape.HEART && '💖'}
                {shape === FireworkShape.CIRCLE && '⭕'}
                {shape === FireworkShape.STAR && '⭐'}
                {shape === FireworkShape.FLOWER && '🌸'}
              </span>
              <span className={style.shapeName}>
                {shape === FireworkShape.HEART && '心形'}
                {shape === FireworkShape.CIRCLE && '圆形'}
                {shape === FireworkShape.STAR && '星形'}
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