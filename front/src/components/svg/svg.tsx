import React from 'react';
import styles from './svg.module.scss';

const SvgAnimation: React.FC = () => {
  return (
    <div className={styles.svgContainer}>
      {/* 旋转的齿轮 */}
      {/* svg标签 用来绘制矢量图形  
        viewBox="0 0 200 200"：SVG 内部的坐标系统
        前两个数字 0 0：坐标系的起始点（左上角）
        后两个数字 200 200：坐标系的宽度和高度*/}
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* <g> 标签用于分组，类似 HTML 中的 <div>*/}
        <g className={styles.gear}>
          <circle cx="100" cy="100" r="60" fill="#3498db" stroke="#2980b9" strokeWidth="4"/>
          <circle cx="100" cy="100" r="30" fill="#2980b9"/>
          {/* 齿轮齿 */}
          {Array.from({length: 12}).map((_, i) => (
            <rect
              key={i}
              x="96"
              y="40"
              width="8"
              height="20"
              fill="#2980b9"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </g>
      </svg>

      {/* 脉冲圆环 */}
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          className={styles.pulseRing}
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="#e74c3c"
          strokeWidth="3"
        />
        <circle
          className={styles.pulseRing2}
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="#e74c3c"
          strokeWidth="2"
        />
      </svg>

      {/* 路径动画 */}
      <svg width="300" height="200" viewBox="0 0 300 200">
        <path
          className={styles.drawPath}
          d="M20,100 Q150,20 280,100" // d: 定义路径
          fill="none"
          stroke="#9b59b6"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle className={styles.movingCircle} r="8" fill="#9b59b6">
          {/* animateMotion: SVG 的内置动画元素，专门用于路径运动动画，mpath: 引用路径 */}
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#path"/>
          </animateMotion>
        </circle>
        {/* 路径命令解析：
          M20,100：Move to，移动到起点 (20, 100)
          Q150,20 280,100：Quadratic curve，二次贝塞尔曲线
          150,20：控制点（曲线弯曲的方向）
          280,100：终点 */}
        <path id="path" d="M20,100 Q150,20 280,100" fill="none" stroke="none"/>
      </svg>

      {/* 变形动画 */}
      <svg width="400" height="400" viewBox="0 0 400 400">
        <polygon
          className={styles.morphShape}
          points="150,100 200,200 100,200" // points: 定义多边形的顶点
          fill="#f39c12"
        />
      </svg>

      {/* 文字路径动画 */}
      <svg width="800" height="200" viewBox="0 0 800 200">
        {/* defs: definitions（定义） 作用：定义可重用的图形元素，但不会直接显示定义共享的图形元素，可以被其他元素引用 */}
        <defs>
          {/* 延长路径到 750 像素 */}
          <path id="text-path" d="M50,100 Q200,50 350,100 T650,100 T750,100"/>
        </defs>
        <text className={styles.pathText} fontSize="20" fill="#27ae60">
          {/* textPath: 定义文本路径，href: 引用路径 */}
          <textPath href="#text-path">666666666666666666666666666666666666666666666666666666666666666666</textPath>
        </text>
      </svg>
    </div>
  );
};

export default SvgAnimation;
