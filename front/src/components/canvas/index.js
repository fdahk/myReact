class Canvas {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    // 设置canvas画布
    this.setupCanvas();
    
    // 创建控制按钮界面
    this.setupControls();
    
    // 初始化
    this.init();
  }
  // 创建主画布的方法
  setupCanvas() {
    // 创建一个canvas元素
    this.canvas = document.createElement('canvas');
    
    // 设置画布的宽度为800像素
    // 注意：这里设置的是canvas的实际像素大小，不是CSS样式大小
    this.canvas.width = 800;
    
    // 设置画布的高度为600像素
    this.canvas.height = 600;
    
    // 通过CSS样式给画布添加边框
    this.canvas.style.border = '2px solid #333';
    
    // 获取2D渲染上下文，这是绘制2D图形的核心对象
    // ctx是context的缩写，包含了所有绘制方法
    this.ctx = this.canvas.getContext('2d');
    // Canvas上下文类型说明：
    // '2d' - 2D渲染上下文（最常用）
    //   - 用于绘制2D图形、文本、图像等
    //   - 返回CanvasRenderingContext2D对象
    //   - 提供丰富的绘图API：矩形、圆形、路径、文本、渐变等
    // 
    // 'webgl'或'experimental-webgl' - WebGL上下文
    //   - 用于3D图形渲染，基于OpenGL ES
    //   - 提供硬件加速的3D渲染能力
    //   - 适用于复杂的3D场景和游戏
    // 
    // 'webgl2' - WebGL 2.0上下文
    //   - WebGL的升级版本，功能更强大
    //   - 支持更多高级特性和着色器功能
    // 
    // 'bitmaprenderer' - 位图渲染上下文
    //   - 专门用于高效显示ImageBitmap对象
    //   - 适用于图像处理和显示优化
    
    // 创建离屏画布（用于双缓冲和图像处理）
    // 离屏画布是不显示在页面上的canvas，但可以在内存中进行绘制操作
    this.offscreenCanvas = document.createElement('canvas');
    
    // 设置离屏画布的尺寸与主画布相同
    this.offscreenCanvas.width = this.canvas.width;
    this.offscreenCanvas.height = this.canvas.height;
    
    // 获取离屏画布的2D上下文，用于在内存中绘制
    this.offscreenCtx = this.offscreenCanvas.getContext('2d');
    
    // 将canvas元素添加到HTML容器中，显示画布
    this.container.appendChild(this.canvas);
  }

  // 创建控制按钮界面的方法
  setupControls() {
    const controls = document.createElement('div');
    
    // 使用innerHTML设置按钮的HTML结构
    // 这里使用模板字符串（反引号）来定义多行HTML
    controls.innerHTML = `
      <div style="margin: 10px auto; display: flex; min-width: 0; gap: 10px; flex-wrap: wrap;">
        <!-- 每个按钮都绑定了一个onclick事件，调用demo对象的相应方法 -->
        <button onclick="demo.showBasicDrawing()">基础绘制</button>
        <button onclick="demo.showTransformations()">变换操作</button>
        <button onclick="demo.showAnimations()">动画演示</button>
        <button onclick="demo.showInteractions()">交互功能</button>
        <button onclick="demo.showImageProcessing()">图像处理</button>
        <button onclick="demo.showDataVisualization()">数据可视化</button>
        <button onclick="demo.showGameDemo()">游戏演示</button>
        <button onclick="demo.showParticleSystem()">粒子系统</button>
        <button onclick="demo.clear()">清空画布</button>
      </div>
    `;

    this.container.appendChild(controls);
  }

  // 初始化
  init() {
    // 设置鼠标事件监听器，用于处理交互功能
    this.setupEventListeners();
    
    this.showWelcome();
  }

  // ==================== 基础绘制 ====================
  showBasicDrawing() {
    this.clear();// 清空画布
    const ctx = this.ctx;

    // 1.1 基本形状绘制
    ctx.save(); // 保存当前状态
    
    // 矩形
    ctx.fillStyle = '#ff6b6b';// 填充颜色
    ctx.fillRect(50, 50, 100, 80);// 参数：x, y, width, height
    ctx.strokeStyle = '#333';// 描边颜色
    ctx.lineWidth = 2;// 线宽
    ctx.strokeRect(50, 50, 100, 80);
    
    // 圆形
    ctx.beginPath();// 开始新路径
    ctx.arc(250, 90, 40, 0, Math.PI * 2);// 参数：x, y, radius, startAngle, endAngle
    ctx.fillStyle = '#4ecdc4';
    ctx.fill();
    ctx.stroke();
    
    // 路径绘制
    ctx.beginPath();
    ctx.moveTo(350, 50);// 作用：将当前点移动到指定位置
    ctx.lineTo(400, 100);// 作用：画线到指定位置
    ctx.lineTo(450, 50);
    ctx.lineTo(500, 130);
    ctx.strokeStyle = '#45b7d1';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 贝塞尔曲线：一种平滑的曲线，用于绘制复杂的形状
    ctx.beginPath();
    ctx.moveTo(550, 50);
    ctx.quadraticCurveTo(600, 20, 650, 50);// 参数：controlX, controlY, endX, endY，作用：画二次贝塞尔曲线
    ctx.bezierCurveTo(650, 80, 700, 80, 700, 130);// 参数：control1X, control1Y, control2X, control2Y, endX, endY，作用：画三次贝塞尔曲线
    ctx.strokeStyle = '#f39c12'; // 橙色
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // restore()：恢复到最近一次save()保存的状态
    // 这会恢复变换矩阵、样式设置等到save()时的状态
    ctx.restore();

    // 1.2 文本绘制演示
    ctx.save();
    
    // font：设置字体样式，格式为"[font-style] [font-weight] [font-size] [font-family]"
    // 可以设置字体大小、粗细、字体类型等
    ctx.font = 'bold 24px Arial'; // 粗体 24像素 Arial字体
    ctx.fillStyle = '#2c3e50';    // 深蓝灰色
    
    // fillText()：绘制填充文本
    ctx.fillText('Canvas 基础绘制', 50, 200);// 参数：文本内容, x坐标, y坐标，注意：y坐标是文本的基线位置，不是顶部
    
    // 设置不同的字体样式绘制描边文本
    ctx.font = '16px Arial';
    ctx.strokeStyle = '#e74c3c';  
    ctx.lineWidth = 1;
    
    // strokeText()：绘制文本轮廓（不填充），参数与fillText相同
    ctx.strokeText('描边文本', 250, 200);
    
    // 文本度量演示：获取文本的尺寸信息
    const text = '测量文本宽度';
    
    // measureText()：测量文本的尺寸信息，返回TextMetrics对象，包含文本的宽度等信息
    const metrics = ctx.measureText(text);
    
    ctx.fillStyle = '#8e44ad';
    ctx.fillText(text, 400, 200);
    
    // 绘制一个矩形框来显示文本的实际宽度，metrics.width 就是文本的像素宽度
    ctx.strokeRect(400, 180, metrics.width, 25);
    
    // 恢复到文本绘制前的状态
    ctx.restore();

    // 1.3 渐变和图案
    this.drawGradients();
    
    // 功能说明
    this.addDescription('基础绘制：矩形、圆形、路径、贝塞尔曲线、文本、渐变');
  }

  // 绘制渐变效果
  drawGradients() {
    const ctx = this.ctx;
    
    // 线性渐变
    // createLinearGradient()：创建线性渐变对象
    // 参数：起点x, 起点y, 终点x, 终点y
    // 渐变方向由起点到终点的直线决定
    const linearGrad = ctx.createLinearGradient(50, 250, 200, 250);
    
    // addColorStop()：在渐变中添加颜色停止点
    // 参数：位置(0-1之间), 颜色值，0表示渐变起点，1表示渐变终点
    linearGrad.addColorStop(0, '#ff6b6b');     // 起点：红色
    linearGrad.addColorStop(0.5, '#4ecdc4');   // 中点：青色
    linearGrad.addColorStop(1, '#45b7d1');     // 终点：蓝色
    
    // 将渐变颜色设置为填充样式
    ctx.fillStyle = linearGrad;
    
    // 绘制使用线性渐变填充的矩形
    ctx.fillRect(50, 250, 150, 80);
    
    // 径向渐变
    // createRadialGradient()：创建径向渐变对象
    // 参数：内圆心x, 内圆心y, 内圆半径, 外圆心x, 外圆心y, 外圆半径，渐变从内圆向外圆辐射扩散
    const radialGrad = ctx.createRadialGradient(325, 290, 10, 325, 290, 60);
    
    // 设置径向渐变的颜色停止点
    radialGrad.addColorStop(0, '#f39c12');     // 中心：橙色
    radialGrad.addColorStop(1, '#e74c3c');     // 边缘：红色
    
    // 使用径向渐变作为填充样式
    ctx.fillStyle = radialGrad;
    
    // 绘制使用径向渐变填充的矩形
    ctx.fillRect(250, 250, 150, 80);
    
    // 图案填充
    // 创建一个小的canvas作为图案模板
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 20;   
    patternCanvas.height = 20;  
    const patternCtx = patternCanvas.getContext('2d');
    
    // 在canvas上绘制棋盘格效果
    patternCtx.fillStyle = '#3498db'; // 蓝色
    patternCtx.fillRect(0, 0, 10, 10);     // 左上角方块
    patternCtx.fillRect(10, 10, 10, 10);   // 右下角方块
    
    // createPattern()：创建图案对象
    // 参数：图案源(可以是canvas、图片等), 重复模式
    // 重复模式：'repeat'(全方向), 'repeat-x'(水平), 'repeat-y'(垂直), 'no-repeat'(不重复)
    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    
    // 使用图案作为填充样式
    ctx.fillStyle = pattern;
    ctx.fillRect(450, 250, 150, 80);
  }

  // ==================== 变换操作 ====================
  // 包括：平移、旋转、缩放、矩阵变换等
  showTransformations() {
    this.clear();
    const ctx = this.ctx;

    // 2.1 平移变换
    // 保存当前状态，以便后续恢复
    ctx.save();
    
    // translate()：平移坐标系原点
    // 所有后续的绘制操作都会基于新的原点位置
    ctx.translate(100, 100);
    
    // 绘制一个矩形来显示平移效果
    this.drawRect(ctx, '#ff6b6b', '平移');
    
    // 恢复到平移前的状态
    ctx.restore();

    // 2.2 旋转变换
    ctx.save();
    
    // 先平移到旋转中心点，这样旋转不会改变图形的位置
    ctx.translate(300, 100);
    
    // rotate()：旋转坐标系
    // 参数：旋转角度（弧度制），正值为顺时针旋转，负值为逆时针旋转
    ctx.rotate(Math.PI / 2); // 旋转30度
    
    this.drawRect(ctx, '#4ecdc4', '旋转');
    ctx.restore();

    // 2.3 缩放变换
    ctx.save();
    
    // 先平移到缩放中心点
    ctx.translate(500, 100);
    
    // scale()：缩放坐标系
    // 参数：x轴缩放系数, y轴缩放系数
    // 负值会导致翻转效果
    ctx.scale(1.5, 0.8); // x方向放大1.5倍，y方向缩小到0.8倍
    
    this.drawRect(ctx, '#f39c12', '缩放');
    ctx.restore();

    // 2.4 矩阵变换
    ctx.save();
    
    // setTransform()：设置变换矩阵
    // 理解：矩阵变换是线性变换，可以实现平移、旋转、缩放等效果
    // 参数：a, b, c, d, e, f
    // 矩阵形式：[a c e]
    //           [b d f]
    //           [0 0 1]
    // a=1:   x方向缩放倍数（1=原大小，2=放大2倍，0.5=缩小一半）
    // b=0.2: x轴向y方向倾斜（正数向下倾斜，负数向上倾斜）
    // c=-0.3: y轴向x方向倾斜（正数向右倾斜，负数向左倾斜）
    // d=1:   y方向缩放倍数（1=原大小）
    // e=100: x方向平移距离（正数向右移，负数向左移）
    // f=300: y方向平移距离（正数向下移，负数向上移）
    // 这里实现斜切变换效果，注：x为横向
    ctx.setTransform(1, 0, -0.3, 2, 200, 300);
    
    this.drawRect(ctx, '#e74c3c', '矩阵变换');
    ctx.restore();

    // 2.5 组合变换动画
    this.animateTransform();
    
    // 添加功能说明
    this.addDescription('变换操作：平移、旋转、缩放、矩阵变换');
  }

  // 封装示例矩形创建方法
  drawRect(ctx, color, text) {
    // 设置矩形填充颜色
    ctx.fillStyle = color;
    
    // 绘制以原点为中心的矩形
    // 坐标(-30, -20)到(30, 20)，尺寸60x40像素
    ctx.fillRect(-30, -20, 60, 40);
    
    // 设置文本样式
    ctx.fillStyle = '#333';      // 深灰色文本
    ctx.font = '12px Arial';     // 12像素Arial字体
    
    // textAlign：文本水平对齐方式
    // 'left'、'center'、'right'、'start'、'end'
    ctx.textAlign = 'center';
    
    // 在矩形下方绘制标签文本
    ctx.fillText(text, 0, 50);
    
    // 恢复默认的左对齐方式
    ctx.textAlign = 'left';
  }

  // 组合变换动画：旋转、缩放和颜色变化的组合效果
  animateTransform() {
    // 记录动画开始时间
    const startTime = Date.now();
    
    // 动画循环函数
    const animate = () => {
      // 计算已经过去的时间
      const elapsed = Date.now() - startTime;
      
      // 3秒一个循环
      const progress = (elapsed % 3000) / 3000;
      
      // 保存当前状态
      this.ctx.save();
      
      // 平移到动画位置
      this.ctx.translate(600, 350);
      
      // 根据进度旋转，一个循环旋转360度
      this.ctx.rotate(progress * Math.PI * 2);
      
      // 动态缩放，使用三角函数创建波动效果
      // Math.sin和Math.cos使缩放在x和y方向上呈现不同的波动
      this.ctx.scale(
        1 + Math.sin(progress * Math.PI * 4) * 0.3,  // x方向缩放：0.7-1.3倍
        1 + Math.cos(progress * Math.PI * 4) * 0.3   // y方向缩放：0.7-1.3倍
      );
      
      // 动态颜色：使用 HSL颜色模式实现彩虹效果
      // HSL: Hue(色相), Saturation(饱和度), Lightness(亮度)
      this.ctx.fillStyle = `hsl(${progress * 360}, 70%, 50%)`;
      
      // 绘制中心对齐的方块
      this.ctx.fillRect(-25, -25, 50, 50);
      
      // 恢复状态
      this.ctx.restore();
      
      // 如果动画时间未超过10秒，继续下一帧动画
      if (elapsed < 1000) {
        // requestAnimationFrame：请求下一个动画帧
        // 浏览器会在下次重绘时调用该函数，通常是60FPS
        // 自动匹配显示器刷新率（通常60Hz = 60FPS）
        // 页面不可见时自动暂停，节省资源
        // 与浏览器渲染同步，更流畅
        requestAnimationFrame(animate);
      }
    };
    
    // 启动动画循环
    animate();
  }

  // ==================== 动画系统 ====================
  // 包括：物理动画、波浪效果、帧动画等
  showAnimations() {
    this.clear();
    
    // 启动动画
    this.startAnimationDemo();
    
    // 添加功能说明
    this.addDescription('动画演示：球体弹跳、波浪效果、缓动动画');
  }

  // 包含弹跳球物理动画和波浪效果
  startAnimationDemo() {
    // 初始化弹跳球数组
    const balls = [];
    
    // 创建若干弹跳球，每个球都有不同的属性
    for (let i = 0; i < 2; i++) {
      balls.push({
        x: 100 + i * 120,                        // x位置：水平分布
        y: 100,                                   // y位置：起始高度
        vx: (Math.random() - 0.5) * 4,           // x方向速度：随机水平运动
        vy: 0,                                    // y方向速度：初始为0
        radius: 20 + Math.random() * 20,         // 半径：20-40像素随机
        color: `hsl(${i * 60}, 70%, 50%)`,       // 颜色：使用HSL实现不同色相
        bounce: 0.8,                             // 弹性系数：碑撞后保留80%的能量
        gravity: 0.5                             // 重力加速度
      });
    }

    // 波浪效果：waveOffset用于控制波浪的相位，使波浪产生流动效果
    let waveOffset = 0;

    // 主动画循环函数
    const animate = () => {
      // 部分清空画布：只清除波浪区域，保留上方的球体动画
      // clearRect(x, y, width, height)：清除指定矩形区域
      // this.ctx.clearRect(0, 400, 800, 200);

      // 全部清除
      this.ctx.clearRect(0, 0, 800, 600);
      
      // 更新和绘制每个弹跳球
      balls.forEach(ball => {
        // 物理更新：模拟真实的物理运动
        // 重力影响：垂直速度逐渐增加
        ball.vy += ball.gravity;
        
        // 位置更新：根据速度移动位置
        ball.x += ball.vx;  // 水平位置
        ball.y += ball.vy;  // 垂直位置
        
        // 边界碰撞检测和处理
        // 左右边界碰撞
        if (ball.x + ball.radius > 800 || ball.x - ball.radius < 0) {
          ball.vx *= -ball.bounce;  // 水平速度反向并损失能量
          // 修正位置，防止球体卡在边界外
          ball.x = Math.max(ball.radius, Math.min(800 - ball.radius, ball.x));
        }
        
        // 底部边界碰撞
        if (ball.y + ball.radius > 350) {
          ball.vy *= -ball.bounce;  // 垂直速度反向并损失能量
          ball.y = 350 - ball.radius;  // 修正位置
        }
        
        // 绘制当前球体
        this.ctx.save();  // 保存状态，为阴影效果做准备
        
        // 绘制球体的基本形状
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = ball.color;
        this.ctx.fill();
        
        // 添加发光阴影效果
        // shadowColor：设置阴影颜色
        // this.ctx.shadowColor = ball.color;

        // shadowBlur：设置阴影模糊程度，值越大越模糊
        // this.ctx.shadowBlur = 10;
        // 再次填充以应用阴影效果
        // this.ctx.fill();
        
        this.ctx.restore();  // 恢复状态，清除阴影设置
      });

      // 绘制波浪效果
      this.drawWave(waveOffset);
      
      // 更新波浪偏移量，创建流动效果
      // 每帧增加0.1，控制波浪的流动速度
      waveOffset += 0.1;
      
      // 继续动画循环
      // 只有在animationActive为true时才继续动画
      if (this.animationActive) {
        requestAnimationFrame(animate);
      }
    };

    // 设置动画活跃标志为true
    this.animationActive = true;
    
    // 启动动画循环
    animate();

    setTimeout(() => {
      this.animationActive = false;  
    }, 100000); 
  }

  // 绘制波浪效果，使用三角函数创建自然的波浪形状
  drawWave(offset) {
    const ctx = this.ctx;
    ctx.save();  
    
    // 开始绘制波浪路径
    ctx.beginPath();
    
    // 从左下角开始绘制
    ctx.moveTo(0, 500);
    
    // 绘制波浪曲线：使用两个不同频率的正弦波叠加
    for (let x = 0; x <= 800; x += 5) {  // 每5像素计算一个点
      // 复合波浪公式：两个正弦波的叠加
      // 第一个波：频率较高，振幅较大（30像素）
      // 第二个波：频率较低，振幅较小（20像素）
      // offset控制波浪的相位，实现流动效果
      const y = 500 + 
                Math.sin((x * 0.02) + offset) * 30 +      // 主波浪
                Math.sin((x * 0.01) + offset * 2) * 20;    // 辅助波浪
      
      // 连接到计算出的波浪点
      ctx.lineTo(x, y);
    }
    
    // 完成波浪区域的封闭路径
    ctx.lineTo(800, 600);  
    ctx.lineTo(0, 600);    
    ctx.closePath();   // 封闭路径
    
    // 创建垂直渐变，模拟水的透明度变化
    const gradient = ctx.createLinearGradient(0, 450, 0, 600);
    gradient.addColorStop(0, 'rgba(52, 152, 219, 0.8)');  // 顶部：较不透明的蓝色
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.3)');  // 底部：较透明的蓝色
    
    // 应用渐变填充并绘制波浪
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.restore();  
  }

  // ==================== 交互 ====================
  // Canvas交互功能，包括：鼠标点击、拖拽、悬停效果等
  showInteractions() {
    this.clear();
    
    // 设置交互元素并绘制到画布上
    this.setupInteractiveElements();
    
    // 功能说明
    this.addDescription('交互功能：点击、拖拽、悬停效果（与画布交互）');
  }

  // 创建各种类型的交互对象并初始化其属性
  setupInteractiveElements() {
    // 定义交互对象数组，每个对象都有不同的交互类型和属性
    this.interactiveObjects = [
      // 点击按钮：矩形形状，可点击
      { 
        x: 100,              
        y: 100,              
        width: 80,           
        height: 60,          
        color: '#ff6b6b',    
        type: 'button',      
        text: '点击我'        
      },
      // 悬停效果按钮：矩形形状，鼠标悬停时变色
      { 
        x: 400,              
        y: 100,              
        width: 100,          
        height: 80,          
        color: '#f39c12',    
        type: 'hover',       
        text: '悬停效果'      
      },
      // 可拖拽小圆：小圆形，可拖拽
      { 
        x: 600,              
        y: 100,              
        radius: 30,          
        color: '#e74c3c',    
        type: 'drag-circle', 
        draggable: true      
      }
    ];

    // 绘制所有交互对象到画布上
    this.drawInteractiveObjects();
  }

  // 绘制所有交互对象到画布上
  drawInteractiveObjects() {
    const ctx = this.ctx;  
    
    // 遍历所有交互对象，逐个绘制
    this.interactiveObjects.forEach(obj => {
      ctx.save();  
      
      // 判断对象类型：如果是按钮或悬停效果类型
      if (obj.type === 'button' || obj.type === 'hover') {
        // 绘制矩形按钮
        // 根据是否悬停来决定颜色
        ctx.fillStyle = obj.hovered ? this.lightenColor(obj.color, 20) : obj.color;
        // 绘制填充的矩形按钮
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

        // 设置边框样式
        ctx.strokeStyle = '#333';  
        ctx.lineWidth = obj.hovered ? 3 : 2;  // 悬停时边框更粗
        // 绘制矩形边框
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        
        // 绘制按钮上的文本
        ctx.fillStyle = '#fff';  
        ctx.font = '14px Arial';  
        ctx.textAlign = 'center';
        // 在按钮中心位置绘制文字（y坐标+5是为了视觉上更居中，视觉居中细节）
        ctx.fillText(obj.text, obj.x + obj.width/2, obj.y + obj.height/2 + 5);
        
      } else if (obj.type === 'circle' || obj.type === 'drag-circle') {
        // 绘制圆形对象
        ctx.beginPath();  
        // 绘制圆形路径：中心点(obj.x, obj.y)，半径obj.radius，从0到2π（
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        // 根据是否正在拖拽来决定颜色
        ctx.fillStyle = obj.dragging ? this.lightenColor(obj.color, 30) : obj.color;
        ctx.fill(); 
        
        // 设置圆形边框
        ctx.strokeStyle = obj.dragging ? '#333' : '#666';  
        ctx.lineWidth = obj.dragging ? 3 : 1;  
        ctx.stroke();  
        
        // 如果圆形可拖拽，在圆形中心显示提示文字
        if (obj.draggable) {
          ctx.fillStyle = '#fff';  
          ctx.font = '12px Arial';  
          ctx.textAlign = 'center';  
          ctx.fillText('拖拽', obj.x, obj.y + 4);
        }
      }
      
      ctx.restore();
    });
    
    ctx.textAlign = 'left';
  }

  // 设置鼠标事件监听器，处理用户交互
  setupEventListeners() {
    // 鼠标按下事件
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    // 鼠标移动事件
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    // 鼠标抬起事件
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    // 鼠标点击事件
    this.canvas.addEventListener('click', this.handleClick.bind(this));
  }

  // 处理鼠标按下事件
  handleMouseDown(e) {
    if (!this.interactiveObjects) return;  // 如果没有交互对象，直接返回
    
    // 获取鼠标在Canvas中的相对位置
    const rect = this.canvas.getBoundingClientRect();  // 获取Canvas元素的边界信息
    const x = e.clientX - rect.left;  // 计算鼠标在Canvas中的x坐标
    const y = e.clientY - rect.top;   // 计算鼠标在Canvas中的y坐标
    
    // 遍历所有交互对象，检查是否开始拖拽
    this.interactiveObjects.forEach(obj => {
      // 如果对象可拖拽且鼠标点击在对象内部
      if (obj.draggable && this.isPointInObject(x, y, obj)) {
        obj.dragging = true;  // 标记对象为正在拖拽状态
        // 记录鼠标点击位置与对象中心的偏移量，保持拖拽时的相对位置
        obj.dragOffsetX = x - obj.x;  // x方向的偏移量
        obj.dragOffsetY = y - obj.y;  // y方向的偏移量
        // 重新绘制所有交互对象，显示拖拽状态的视觉效果
        this.drawInteractiveObjects();
      }
    });
  }

  // 处理鼠标移动事件
  handleMouseMove(e) {
    if (!this.interactiveObjects) return;
    
    // 获取鼠标在Canvas中的当前位置
    const rect = this.canvas.getBoundingClientRect();  
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    let needsRedraw = false;  // 标记是否需要重新绘制画布
    
    this.interactiveObjects.forEach(obj => {
      // 如果对象正在被拖拽
      if (obj.dragging) {
        // 根据鼠标位置和之前记录的偏移量，更新对象位置
        obj.x = x - obj.dragOffsetX;  // 更新x坐标，保持相对位置
        obj.y = y - obj.dragOffsetY;  // 更新y坐标，保持相对位置
        needsRedraw = true;  // 标记需要重绘
      } else if (obj.type === 'hover') {
        // 处理悬停效果对象
        const wasHovered = obj.hovered;  // 记录之前的悬停状态
        // 检查鼠标是否在对象上，更新悬停状态
        obj.hovered = this.isPointInObject(x, y, obj);
        // 如果悬停状态发生变化，需要重绘以显示视觉变化
        if (wasHovered !== obj.hovered) {
          needsRedraw = true;
        }
      }
    });
    
    // 如果有任何变化需要重绘
    if (needsRedraw) {
      this.ctx.clearRect(0, 0, 800, 300);  
      this.drawInteractiveObjects();
    }
  }

  // 处理鼠标抬起事件
  handleMouseUp(e) {
    if (!this.interactiveObjects) return;
    
    this.interactiveObjects.forEach(obj => {
      // 如果对象正在被拖拽
      if (obj.dragging) {
        obj.dragging = false;  // 取消拖拽状态
        this.drawInteractiveObjects();  // 重绘对象，更新视觉状态
      }
    });
  }

  // 处理鼠标点击事件
  handleClick(e) {
    if (!this.interactiveObjects) return;
    
    const rect = this.canvas.getBoundingClientRect();  
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    this.interactiveObjects.forEach(obj => {
      // 如果是按钮类型且点击位置在按钮内部
      if (obj.type === 'button' && this.isPointInObject(x, y, obj)) {
        // 按钮点击效果
        obj.clicked = true;  // 标记按钮为已点击状态
        this.drawInteractiveObjects();  // 重绘按钮
        
        // 显示点击反馈：在按钮上覆盖一层半透明白色
        this.ctx.save();  
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';  
        // 在按钮位置绘制反馈矩形
        this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        this.ctx.restore();  
        
        // 恢复按钮正常状态
        setTimeout(() => {
          obj.clicked = false;  // 取消点击状态
          this.drawInteractiveObjects();  // 重绘按钮，恢复正常外观
        }, 150);
      }
    });
  }

  // 检查指定点是否在对象内部（碰撞检测）
  isPointInObject(x, y, obj) {
    // 如果是圆形对象
    if (obj.type === 'circle' || obj.type === 'drag-circle') {
      // 计算点到圆心的距离
      const dx = x - obj.x;  // x方向距离
      const dy = y - obj.y;  // y方向距离
      // 使用距离公式判断：如果距离小于等于半径，则点在圆内
      return dx * dx + dy * dy <= obj.radius * obj.radius;
    } else {
      // 如果是矩形对象（按钮）
      // 检查点是否在矩形边界内
      return x >= obj.x && x <= obj.x + obj.width &&   // x坐标在左右边界内
             y >= obj.y && y <= obj.y + obj.height;    // y坐标在上下边界内
    }
  }

  // ==================== 图像处理 ====================
  // 图像处理功能
  showImageProcessing() {
    this.clear();  
    this.loadAndProcessImage(); 
    this.addDescription('图像处理：滤镜效果、像素操作、图像合成');
  }

  // 加载并处理图像的主函数
  loadAndProcessImage() {
    // 创建测试图像
    const testImg = this.createTestImage();
    
    // 延迟100毫秒后处理图像，确保图像创建完成
    setTimeout(() => {
      this.processImage(testImg);  // 对测试图像应用各种滤镜效果
    }, 100);
  }

  // 创建测试图像（离屏画布）
  createTestImage() {
    // 在离屏画布上创建测试图像（不直接显示在主画布上）
    const ctx = this.offscreenCtx;  // 获取离屏画布的绘图上下文
    ctx.clearRect(0, 0, 200, 150); 
    
    // 创建彩色线性渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 200, 150);  // 从左上到右下的渐变
    gradient.addColorStop(0, '#ff6b6b');      // 0%位置：红色
    gradient.addColorStop(0.33, '#4ecdc4');  // 33%位置：青色
    gradient.addColorStop(0.66, '#45b7d1');  // 66%位置：蓝色
    gradient.addColorStop(1, '#f39c12');     // 100%位置：橙色
    
    ctx.fillStyle = gradient;  
    ctx.fillRect(0, 0, 200, 150);  
    
    // 在渐变背景上添加一些几何图形
    // 添加半透明白色圆形
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';  // 80%透明度的白色
    ctx.beginPath(); 
    ctx.arc(100, 75, 30, 0, Math.PI * 2);  // 在中心绘制圆形，半径30
    ctx.fill(); 
    
    // 添加半透明黑色矩形
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';  // 60%透明度的黑色
    ctx.fillRect(50, 50, 100, 50);  // 绘制矩形
    
    return this.offscreenCanvas;  // 返回包含测试图像的离屏画布
  }

  // 处理测试图像并应用各种滤镜效果
  processImage(sourceCanvas) {
    const ctx = this.ctx;  
    
    // 在主画布上绘制原图作为对比
    ctx.drawImage(sourceCanvas, 50, 50, 150, 112); 
    ctx.fillStyle = '#333';  
    ctx.font = '14px Arial';  
    ctx.fillText('原图', 50, 40);  
    
    // 应用灰度滤镜并显示结果
    this.applyGrayscaleFilter(sourceCanvas, 250, 50);  
    ctx.fillText('灰度', 250, 40);  
    
    // 应用反色滤镜并显示结果
    this.applyInvertFilter(sourceCanvas, 450, 50);  
    ctx.fillText('反色', 450, 40);  
    
    // 应用模糊效果并显示结果
    this.applyBlurEffect(sourceCanvas, 50, 250);  
    ctx.fillText('模糊', 50, 240);  
    
    // 应用边缘检测并显示结果
    this.applyEdgeDetection(sourceCanvas, 250, 250);  
    ctx.fillText('边缘检测', 250, 240);  
    
    // 应用色彩调整并显示结果
    this.applyColorAdjustment(sourceCanvas, 450, 250);  
    ctx.fillText('色彩调整', 450, 240);  
  }

  // 应用灰度滤镜效果
  applyGrayscaleFilter(sourceCanvas, x, y) {
    // 创建临时画布用于图像处理
    const tempCanvas = document.createElement('canvas');  // 创建新的canvas元素
    tempCanvas.width = 150;
    tempCanvas.height = 112;  
    const tempCtx = tempCanvas.getContext('2d');  
    
    // 将源图像绘制到临时画布上，同时进行尺寸缩放
    tempCtx.drawImage(sourceCanvas, 0, 0, 200, 150, 0, 0, 150, 112);
    
    // 获取图像的像素数据
    // 参数：x、y、宽、高
    const imageData = tempCtx.getImageData(0, 0, 150, 112);  // 获取所有像素数据
    const data = imageData.data;  // 像素数据数组，每4个值代表一个像素(R,G,B,A)
    
    // 遍历所有像素，应用灰度转换
    for (let i = 0; i < data.length; i += 4) {  // 每次跳4个值处理一个像素，因为每个像素由4个值组成（RGBA）：
      // 使用加权平均公式计算灰度值（人眼对不同颜色的敏感度不同）
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      data[i] = gray;         // 设置红色通道为灰度值
      data[i + 1] = gray;     // 设置绿色通道为灰度值
      data[i + 2] = gray;     // 设置蓝色通道为灰度值
      // data[i + 3] 是alpha通道（透明度），保持不变
    }
    
    // 将处理后的像素数据放回临时画布
    tempCtx.putImageData(imageData, 0, 0);
    // 将处理后的图像绘制到主画布的指定位置
    this.ctx.drawImage(tempCanvas, x, y);
  }

  // 应用反色滤镜效果（颜色反转）
  applyInvertFilter(sourceCanvas, x, y) {
    // 创建临时画布用于图像处理
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 150;  
    tempCanvas.height = 112; 
    const tempCtx = tempCanvas.getContext('2d');  
    
    // 将源图像绘制到临时画布上，同时进行尺寸缩放
    tempCtx.drawImage(sourceCanvas, 0, 0, 200, 150, 0, 0, 150, 112);
    
    // 获取图像的像素数据
    const imageData = tempCtx.getImageData(0, 0, 150, 112);  // 获取所有像素数据
    const data = imageData.data;  // 像素数据数组，每4个值代表一个像素(R,G,B,A)
    
    // 遍历所有像素，应用颜色反转
    for (let i = 0; i < data.length; i += 4) {  // 每次跳4个值处理一个像素
      data[i] = 255 - data[i];         // 反转红色通道：255-原值
      data[i + 1] = 255 - data[i + 1]; // 反转绿色通道：255-原值
      data[i + 2] = 255 - data[i + 2]; // 反转蓝色通道：255-原值
      // data[i + 3] 是alpha通道（透明度），保持不变
    }
    
    // 将处理后的像素数据放回临时画布
    tempCtx.putImageData(imageData, 0, 0);
    // 将处理后的图像绘制到主画布的指定位置
    this.ctx.drawImage(tempCanvas, x, y);
  }

  // 应用模糊效果（简单的多重绘制模拟）
  applyBlurEffect(sourceCanvas, x, y) {
    const ctx = this.ctx;
    ctx.save();  
    
    // 使用多次绘制模拟模糊效果（简单但有效的方法）
    ctx.globalAlpha = 0.2;  // 设置透明度为20%，每次绘制都很淡
    // 在稍微不同的位置绘制同一图像5次，创建模糊效果
    for (let i = 0; i < 5; i++) {
      // 每次绘制时位置稍有偏移，形成模糊的视觉效果
      ctx.drawImage(sourceCanvas, 0, 0, 200, 150, x + i - 2, y + i - 2, 150, 112);
    }
    
    ctx.restore(); 
  }

  // 应用边缘检测效果（使用Sobel算子）
  applyEdgeDetection(sourceCanvas, x, y) {
    // 创建临时画布用于图像处理
    const tempCanvas = document.createElement('canvas'); 
    tempCanvas.width = 150;   
    tempCanvas.height = 112;   
    const tempCtx = tempCanvas.getContext('2d');  
    
    // 将源图像绘制到临时画布上
    tempCtx.drawImage(sourceCanvas, 0, 0, 200, 150, 0, 0, 150, 112);
    
    // 获取图像的像素数据
    const imageData = tempCtx.getImageData(0, 0, 150, 112);  // 获取所有像素数据
    const data = imageData.data;  // 原始像素数据数组
    const output = new Uint8ClampedArray(data.length);  // 创建输出数组，存储处理后的像素
    
    const width = 150;   // 图像宽度
    const height = 112;  // 图像高度
    
    // Sobel边缘检测算法实现
    // 遍历图像的每个像素（跳过边界像素，因为需要访问周围像素）
    for (let y = 1; y < height - 1; y++) {  // y从1到height-2
      for (let x = 1; x < width - 1; x++) {  // x从1到width-2
        const idx = (y * width + x) * 4;  // 计算当前像素在数据数组中的索引
        
        // 辅助函数：获取指定位置像素的灰度值
        const getGray = (px, py) => {
          const pidx = (py * width + px) * 4;  // 计算像素索引
          // 使用加权平均公式将RGB转换为灰度
          return data[pidx] * 0.299 + data[pidx + 1] * 0.587 + data[pidx + 2] * 0.114;
        };
        
        // Sobel X方向梯度计算（检测垂直边缘）
        // 使用3x3的Sobel X核：[-1, 0, 1; -2, 0, 2; -1, 0, 1]
        const gx = -1 * getGray(x-1, y-1) + 1 * getGray(x+1, y-1) +  // 上排
                   -2 * getGray(x-1, y) + 2 * getGray(x+1, y) +      // 中排
                   -1 * getGray(x-1, y+1) + 1 * getGray(x+1, y+1);   // 下排
        
        // Sobel Y方向梯度计算（检测水平边缘）
        // 使用3x3的Sobel Y核：[-1, -2, -1; 0, 0, 0; 1, 2, 1]
        const gy = -1 * getGray(x-1, y-1) + -2 * getGray(x, y-1) + -1 * getGray(x+1, y-1) +  // 上排
                   1 * getGray(x-1, y+1) + 2 * getGray(x, y+1) + 1 * getGray(x+1, y+1);       // 下排
        
        // 计算梯度幅值（边缘强度）
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        
        // 将边缘强度值设置到输出数组的RGB通道
        output[idx] = magnitude;       // 红色通道
        output[idx + 1] = magnitude;   // 绿色通道
        output[idx + 2] = magnitude;   // 蓝色通道
        output[idx + 3] = 255;         // alpha通道设为不透明
      }
    }
    
    // 将处理后的像素数据转换为ImageData对象
    const outputImageData = new ImageData(output, width, height);
    // 将处理后的图像数据放回临时画布
    tempCtx.putImageData(outputImageData, 0, 0);
    // 将边缘检测结果绘制到主画布的指定位置
    this.ctx.drawImage(tempCanvas, x, y);
  }

  // 应用色彩调整效果（调整RGB通道强度）
  applyColorAdjustment(sourceCanvas, x, y) {
    const tempCanvas = document.createElement('canvas'); 
    tempCanvas.width = 150;  
    tempCanvas.height = 112; 
    const tempCtx = tempCanvas.getContext('2d');  
    
    tempCtx.drawImage(sourceCanvas, 0, 0, 200, 150, 0, 0, 150, 112);
    
    // 获取图像的像素数据
    const imageData = tempCtx.getImageData(0, 0, 150, 112);
    const data = imageData.data;  
    
    // 调整颜色通道：增强红色通道，减少蓝色通道，创造暖色调效果
    for (let i = 0; i < data.length; i += 4) {  // 每次跳4个值处理一个像素
      data[i] = Math.min(255, data[i] * 1.3);     // 红色通道增强30%，使用Math.min防止溢出
      data[i + 1] = data[i + 1] * 1.1;           // 绿色通道轻微增强10%
      data[i + 2] = data[i + 2] * 0.7;           // 蓝色通道减少30%，营造暖色调
      // data[i + 3] 是alpha通道，保持不变
    }
    
    tempCtx.putImageData(imageData, 0, 0);
    this.ctx.drawImage(tempCanvas, x, y);
  }

  // ==================== 数据可视化 ====================
  // 数据可视化功能
  showDataVisualization() {
    this.clear();  
    this.drawCharts();  // 绘制各种图表
    this.addDescription('数据可视化：柱状图、折线图、饼图、散点图');
  }

  // 绘制各种类型的图表
  drawCharts() {    
    // 柱状图数据：一组数值，表示不同类别的数量
    const barData = [65, 85, 45, 90, 75, 60, 95];
    
    // 折线图数据：包含x,y坐标的点集合，表示趋势变化
    const lineData = [
      {x: 0, y: 50}, {x: 50, y: 80}, {x: 100, y: 30}, 
      {x: 150, y: 90}, {x: 200, y: 60}, {x: 250, y: 85}
    ];
    
    // 饼图数据：包含标签、数值和颜色的对象数组，表示比例关系
    const pieData = [
      {label: 'A', value: 30, color: '#ff6b6b'},  // A类别占30%
      {label: 'B', value: 25, color: '#4ecdc4'},  // B类别占25%
      {label: 'C', value: 20, color: '#45b7d1'},  // C类别占20%
      {label: 'D', value: 15, color: '#f39c12'},  // D类别占15%
      {label: 'E', value: 10, color: '#e74c3c'}   // E类别占10%
    ];

    // 在画布的不同区域绘制各种图表
    this.drawBarChart(barData, 50, 50, 200, 150);      // 左上角绘制柱状图
    this.drawLineChart(lineData, 300, 50, 250, 150);   // 右上角绘制折线图
    this.drawPieChart(pieData, 150, 350, 80);          // 左下角绘制饼图
    this.drawScatterPlot(400, 300, 200, 150);          // 右下角绘制散点图
  }

  // 绘制柱状图
  drawBarChart(data, x, y, width, height) {
    const ctx = this.ctx;  
    const barWidth = width / data.length;  // 计算每个柱子的宽度
    const maxValue = Math.max(...data);    // 找出数据中的最大值，用于缩放
    
    ctx.save();  
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';  // 设置坐标轴颜色为深灰色
    ctx.lineWidth = 2;         // 设置坐标轴线宽
    ctx.beginPath();           // 开始新路径
    // 绘制x轴（水平线）
    ctx.moveTo(x, y + height);           // 移动到左下角
    ctx.lineTo(x + width, y + height);   // 画线到右下角
    // 绘制y轴（垂直线）
    ctx.moveTo(x, y);                    // 移动到左上角
    ctx.lineTo(x, y + height);           // 画线到左下角
    ctx.stroke();  // 绘制路径
    
    // 遍历数据，绘制每个柱子
    data.forEach((value, index) => {
      // 计算柱子的高度（按比例缩放）
      const barHeight = (value / maxValue) * height;
      // 计算柱子的x坐标位置
      const barX = x + index * barWidth + 5;  // +5留出间距
      // 计算柱子的y坐标位置（从上往下计算）
      const barY = y + height - barHeight;
      
      // 创建渐变填充效果
      const gradient = ctx.createLinearGradient(0, barY, 0, barY + barHeight);
      gradient.addColorStop(0, '#4ecdc4');  // 顶部颜色（青色）
      gradient.addColorStop(1, '#45b7d1');  // 底部颜色（蓝色）
      
      ctx.fillStyle = gradient;  // 设置填充样式为渐变
      // 绘制柱子矩形，宽度减10是为了柱子之间有间隙
      ctx.fillRect(barX, barY, barWidth - 10, barHeight);
      
      // 在柱子顶部显示数值标签
      ctx.fillStyle = '#333';    
      ctx.font = '12px Arial';   
      ctx.textAlign = 'center'; 
      // 在柱子中心上方5像素处显示数值
      ctx.fillText(value.toString(), barX + (barWidth - 10) / 2, barY - 5);
    });
    
    // 绘制图表标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';     
    ctx.textAlign = 'center';        
    ctx.fillText('柱状图', x + width / 2, y - 10);
    
    ctx.restore();  
  }

  drawLineChart(data, x, y, width, height) {
    const ctx = this.ctx;
    
    ctx.save();
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
    
    // 绘制网格
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const gridY = y + (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, gridY);
      ctx.lineTo(x + width, gridY);
      ctx.stroke();
    }
    
    // 绘制折线
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
      const plotX = x + (point.x / 250) * width;
      const plotY = y + height - (point.y / 100) * height;
      
      if (index === 0) {
        ctx.moveTo(plotX, plotY);
      } else {
        ctx.lineTo(plotX, plotY);
      }
    });
    ctx.stroke();
    
    // 绘制数据点
    data.forEach(point => {
      const plotX = x + (point.x / 250) * width;
      const plotY = y + height - (point.y / 100) * height;
      
      ctx.beginPath();
      ctx.arc(plotX, plotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#e74c3c';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    // 标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('折线图', x + width / 2, y - 10);
    
    ctx.restore();
  }

  drawPieChart(data, centerX, centerY, radius) {
    const ctx = this.ctx;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2; // 从顶部开始
    
    ctx.save();
    
    // 绘制饼图扇形
    data.forEach(item => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // 标签
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
      const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
      
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${item.label}: ${item.value}%`, labelX, labelY);
      
      currentAngle += sliceAngle;
    });
    
    // 标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('饼图', centerX, centerY - radius - 30);
    
    ctx.restore();
  }

  drawScatterPlot(x, y, width, height) {
    const ctx = this.ctx;
    
    // 生成随机散点数据
    const points = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 4,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }
    
    ctx.save();
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
    
    // 绘制散点
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(x + point.x, y + height - point.y, point.size, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // 标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('散点图', x + width / 2, y - 10);
    
    ctx.restore();
  }

  // ==================== 游戏 ====================
  // 显示游戏演示功能
  showGameDemo() {
    this.clear();  
    this.startSimpleGame();  
    this.addDescription('游戏演示：简单的躲避游戏（用方向键控制蓝色方块）');
  }

  // 简单的躲避游戏
  startSimpleGame() {
    // 游戏状态对象，包含所有游戏相关的数据（设为实例属性，便于外部控制）
    this.game = {
      // 玩家对象：包含位置、尺寸和移动速度
      player: { 
        x: 400,      // 玩家初始x坐标（屏幕中央）
        y: 500,      // 玩家初始y坐标（靠近底部）
        width: 30,   // 玩家宽度
        height: 30,  // 玩家高度
        speed: 5     // 玩家移动速度（每帧移动像素数）
      },
      enemies: [],     // 敌人数组，存储所有敌人对象
      score: 0,        // 玩家得分
      gameOver: false  // 游戏是否结束标志
    };
    const game = this.game;  // 局部使用

    // 创建敌人的函数
    const createEnemy = () => {
      // 向敌人数组添加新的敌人对象
      game.enemies.push({
        x: Math.random() * (800 - 20),                    // 随机x坐标（确保不超出屏幕）
        y: -20,                                           // 从屏幕上方开始（负y坐标）
        width: 10,                                        // 敌人宽度
        height: 20,                                       // 敌人高度
        speed: 5 + Math.random() * 3,                     // 随机移动速度（像素/帧）
        color: `hsl(${Math.random() * 60}, 70%, 50%)`     // 随机颜色（HSL格式，色调0-60度）
      });
    };

    // 键盘控制系统
    const keys = {};  // 存储按键状态的对象
    // 键盘事件处理函数
    const keyHandler = (e) => {
      // 根据事件类型设置按键状态：按下为true，抬起为false
      keys[e.key] = e.type === 'keydown';
    };
    
    // 添加键盘事件监听器
    document.addEventListener('keydown', keyHandler);  
    document.addEventListener('keyup', keyHandler);    

    // 游戏主循环函数
    let enemySpawnTimer = 0;  // 敌人生成计时器
    const gameLoop = () => {
      // 如果游戏结束，清理资源并退出循环
      if (game.gameOver) {
        // 移除键盘事件监听器，防止内存泄漏
        document.removeEventListener('keydown', keyHandler);
        document.removeEventListener('keyup', keyHandler);
        return;  // 退出游戏循环
      }

      // 清空整个画布，准备绘制新的一帧
      this.ctx.clearRect(0, 0, 800, 600);

      // 根据按键状态更新玩家位置
      // 左箭头键：向左移动（检查左边界）
      if (keys['ArrowLeft'] && game.player.x > 0) {
        game.player.x -= game.player.speed;
      }
      // 右箭头键：向右移动（检查右边界）
      if (keys['ArrowRight'] && game.player.x < 800 - game.player.width) {
        game.player.x += game.player.speed;
      }
      // 上箭头键：向上移动（检查上边界）
      if (keys['ArrowUp'] && game.player.y > 0) {
        game.player.y -= game.player.speed;
      }
      // 下箭头键：向下移动（检查下边界）
      if (keys['ArrowDown'] && game.player.y < 600 - game.player.height) {
        game.player.y += game.player.speed;
      }

      // 敌人生成逻辑
      enemySpawnTimer++;  // 增加计时器
      if (enemySpawnTimer > 20) {  // 每60帧（约1秒，假设60FPS）生成一个敌人
        createEnemy();       // 创建新敌人
        enemySpawnTimer = 0; // 重置计时器
      }

      // 更新敌人状态并进行碰撞检测
      game.enemies = game.enemies.filter(enemy => {
        enemy.y += enemy.speed;  // 敌人向下移动
        
        // 矩形碰撞检测：检查玩家和敌人是否重叠
        if (enemy.x < game.player.x + game.player.width &&      // 敌人左边 < 玩家右边
            enemy.x + enemy.width > game.player.x &&            // 敌人右边 > 玩家左边
            enemy.y < game.player.y + game.player.height &&     // 敌人上边 < 玩家下边
            enemy.y + enemy.height > game.player.y) {           // 敌人下边 > 玩家上边
          game.gameOver = true;  // 发生碰撞，游戏结束
          return false;          // 从数组中移除这个敌人
        }
        
        // 移除超出屏幕底部的敌人
        if (enemy.y > 600) {
          game.score += 1;  // 玩家成功躲避，增加分数
          return false;      // 从数组中移除这个敌人
        }
        
        return true;  // 保留这个敌人在数组中
      });

      // 绘制玩家（蓝色方块）
      this.ctx.fillStyle = '#3498db';  // 设置玩家颜色为蓝色
      // 绘制玩家矩形
      this.ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
      
      // 绘制玩家边框
      this.ctx.strokeStyle = '#2980b9';  // 深蓝色边框
      this.ctx.lineWidth = 2;            // 边框线宽
      // 绘制玩家边框
      this.ctx.strokeRect(game.player.x, game.player.y, game.player.width, game.player.height);

      // 绘制所有敌人
      game.enemies.forEach(enemy => {
        this.ctx.fillStyle = enemy.color;  // 使用敌人的随机颜色
        // 绘制敌人矩形
        this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // 为敌人添加黑色边框
        this.ctx.strokeStyle = '#333';  // 深灰色边框
        this.ctx.lineWidth = 1;         // 较细的边框
        this.ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
      });

      // 绘制游戏分数
      this.ctx.fillStyle = '#333';         
      this.ctx.font = 'bold 20px Arial';   
      this.ctx.fillText(`分数: ${game.score}`, 20, 30);  // 在左上角显示分数

      // 绘制控制说明
      this.ctx.font = '14px Arial';        // 较小的字体
      this.ctx.fillText('用方向键控制', 20, 580);  // 在左下角显示操作提示

      // 控制游戏循环
      if (!game.gameOver) {
        // 游戏继续进行，请求下一帧动画
        requestAnimationFrame(gameLoop);
      } else {
        // 游戏结束，显示结束画面
        this.ctx.save();  // 保存当前绘图状态
        
        // 绘制半透明黑色遮罩层
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';  // 70%透明度的黑色
        this.ctx.fillRect(0, 0, 800, 600);          // 覆盖整个画布
        
        // 绘制游戏结束文字
        this.ctx.fillStyle = '#fff';           
        this.ctx.font = 'bold 36px Arial';     
        this.ctx.textAlign = 'center';         
        this.ctx.fillText('游戏结束', 400, 280);  
        
        // 显示最终分数
        this.ctx.font = '24px Arial';          
        this.ctx.fillText(`最终分数: ${game.score}`, 400, 320);  
        
        // 显示重新开始提示
        this.ctx.font = '16px Arial';          
        this.ctx.fillText('点击其他按钮重新开始', 400, 350);
        
        this.ctx.restore();  
      }
    };

    // 启动游戏循环
    gameLoop();
  }

  // ==================== 粒子系统 ====================
  showParticleSystem() {
    this.clear();
    this.startParticleSystem();
    this.addDescription('粒子系统：烟花效果、重力模拟（点击画布创建烟花）');
  }

  // 启动粒子系统演示
  startParticleSystem() {
    const particles = [];  // 存储所有粒子的数组
    const gravity = 0.1;   // 重力加速度，影响粒子下落速度
    const friction = 0.99; // 摩擦系数，模拟空气阻力，使粒子逐渐减速

    // 创建烟花爆炸效果的函数
    const createFirework = (x, y) => {
      const particleCount = 50;  // 每次爆炸产生的粒子数量
      // 定义粒子可能的颜色数组
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#e74c3c', '#9b59b6'];
      
      // 循环创建指定数量的粒子
      for (let i = 0; i < particleCount; i++) {
        // 计算粒子的发射角度，均匀分布在360度范围内
        const angle = (Math.PI * 2 / particleCount) * i;
        // 随机生成粒子的初始速度（2-8之间）
        const velocity = 2 + Math.random() * 6;
        
        // 创建新粒子并添加到粒子数组中
        particles.push({
          x: x,  // 粒子初始x坐标（爆炸中心）
          y: y,  // 粒子初始y坐标（爆炸中心）
          vx: Math.cos(angle) * velocity,  // x方向速度分量
          vy: Math.sin(angle) * velocity,  // y方向速度分量
          life: 1.0,  // 粒子生命值（1.0为满血，0为死亡）
          decay: 0.005 + Math.random() * 0.01,  // 生命衰减速度（随机）
          size: 2 + Math.random() * 4,  // 粒子大小（2-6像素）
          color: colors[Math.floor(Math.random() * colors.length)]  // 随机选择颜色
        });
      }
    };

    // 点击事件处理函数：在点击位置创建烟花
    const clickHandler = (e) => {
      // 获取Canvas边界信息
      const rect = this.canvas.getBoundingClientRect();
      // 计算点击位置在Canvas中的坐标
      const x = e.clientX - rect.left;  // 点击的x坐标
      const y = e.clientY - rect.top;   // 点击的y坐标
      // 在点击位置创建烟花爆炸
      createFirework(x, y);
    };
    
    // 为Canvas添加点击事件监听器
    this.canvas.addEventListener('click', clickHandler);

    // 创建两个初始烟花作为演示
    createFirework(200, 200);  // 在(200,200)位置创建烟花
    createFirework(600, 150);  // 在(600,150)位置创建烟花

    // 动画循环函数：持续更新和绘制粒子
    const animate = () => {
      // 使用半透明黑色覆盖画布，创建拖尾效果（而不是完全清空）
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';  // 10%透明度的黑色
      this.ctx.fillRect(0, 0, 800, 600);  // 覆盖整个画布

      // 从后向前遍历粒子数组（便于安全删除元素）
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];  // 获取当前粒子
        
        // 物理更新：模拟重力和摩擦力
        particle.vy += gravity;      // y方向速度增加（重力影响）
        particle.vx *= friction;     // x方向速度衰减（摩擦力）
        particle.vy *= friction;     // y方向速度衰减（摩擦力）
        particle.x += particle.vx;   // 更新x位置
        particle.y += particle.vy;   // 更新y位置
        particle.life -= particle.decay;  // 生命值衰减
        
        // 如果粒子生命值耗尽，从数组中移除
        if (particle.life <= 0) {
          particles.splice(i, 1);  // 删除死亡粒子
          continue;  // 跳过绘制，处理下一个粒子
        }
        
        // 绘制粒子
        this.ctx.save();  
        this.ctx.globalAlpha = particle.life;  // 透明度随生命值变化
        this.ctx.fillStyle = particle.color;   // 设置粒子颜色
        this.ctx.beginPath();  // 开始新路径
        // 绘制圆形粒子，大小随生命值缩小
        this.ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        this.ctx.fill();  
        
        // 添加发光效果
        this.ctx.shadowColor = particle.color;  // 阴影颜色与粒子颜色相同
        this.ctx.shadowBlur = 10;  // 阴影模糊半径，创建发光效果
        this.ctx.fill();  // 再次填充以应用发光效果
        this.ctx.restore();  // 恢复绘图状态
      }

      // 在画布上显示信息文字
      this.ctx.fillStyle = '#fff';  
      this.ctx.font = '16px Arial';  
      this.ctx.fillText(`粒子数量: ${particles.length}`, 20, 30);  // 显示当前粒子数量
      this.ctx.fillText('点击创建烟花', 20, 50);  

      // 如果粒子系统仍然活跃，继续下一帧动画
      if (this.particleSystemActive) {
        requestAnimationFrame(animate);  
      } else {
        // 粒子系统停止时，清理事件监听器
        this.canvas.removeEventListener('click', clickHandler);
      }
    };

    this.particleSystemActive = true;  
    animate();  // 开始动画循环
    
    setTimeout(() => {
      this.particleSystemActive = false;  
    }, 15000);
  }

  // ==================== 工具 ====================
  // 清空画布并重置状态
  clear() {
    // clearRect()：清除指定矩形区域的所有内容
    // 参数：x, y, width, height
    // 这里清除整个画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 停止所有正在运行的动画
    this.animationActive = false;        
    this.particleSystemActive = false;   

    // 停止游戏：设置游戏结束标志，并清理事件监听器
    if (this.game) {
      this.game.gameOver = true;
      // 给游戏循环一点时间来清理事件监听器
      setTimeout(() => {
        this.game = null;  // 清除游戏对象引用
      }, 100);
    }
    
    // 清除交互对象，释放内存
    this.interactiveObjects = null;
  }

  // 颜色变亮工具函数
  // 将给定的十六进制颜色变亮指定的百分比
  lightenColor(color, percent) {
    // 将十六进制颜色转换为数字
    // 移除'#'号，然后使用parseInt解析为16进制数
    const num = parseInt(color.replace("#", ""), 16);
    
    // 计算变亮量：百分比转换为0-255的数值
    const amt = Math.round(2.55 * percent);
    
    // 使用位运算提取RGB各通道的值并增加亮度
    const R = (num >> 16) + amt;              // 红色通道：右移16位获取高8位
    const G = (num >> 8 & 0x00FF) + amt;      // 绿色通道：右移8位后与0xFF按位与
    const B = (num & 0x0000FF) + amt;         // 蓝色通道：直接与0xFF按位与
    
    // 将RGB值限制在0-255范围内，然后组合成新的十六进制颜色
    return "#" + (0x1000000 +  // 加上0x1000000保证6位十六进制数
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +  // 红色通道，位移到高位
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +    // 绿色通道，位移到中位
      (B < 255 ? B < 1 ? 0 : B : 255)              // 蓝色通道，位于低位
    ).toString(16).slice(1);  // 转为16进制并移除前导的'1'
  }

  // 首页
  showWelcome() {
    const ctx = this.ctx;
    
    // 创建背景渐变效果
    // 从左上角到右下角的对角线性渐变
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#667eea');  // 起点：深蓝紫色
    gradient.addColorStop(1, '#764ba2');  // 终点：紫色
    ctx.fillStyle = gradient;
    
    // 填充整个画布作为背景
    ctx.fillRect(0, 0, 800, 600);
    
    // 标题
    ctx.fillStyle = '#fff';              
    ctx.font = 'bold 48px Arial';        
      ctx.textAlign = 'center';            
      ctx.fillText('Canvas', 400, 200);    
      
      // 添加装饰图形：随机分布的半透明白色小方块
    for (let i = 0; i < 20; i++) {
      ctx.save();  
      
      // 随机位置和旋转角度
      ctx.translate(Math.random() * 800, Math.random() * 600);
      ctx.rotate(Math.random() * Math.PI * 2);
      
      // 随机透明度的白色
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      
      // 绘制小方块（以原点为中心）
      ctx.fillRect(-10, -10, 20, 20);
      
      ctx.restore();  
    }
    
    ctx.textAlign = 'left';
  }

  // 在画布下方添加功能说明
  addDescription(text) {
    // 尝试获取已存在的说明文字元素
    let descDiv = document.getElementById('canvas-description');
    
    // 如果说明元素不存在，创建一个新的
    if (!descDiv) {
      descDiv = document.createElement('div');
      descDiv.id = 'canvas-description';  // 设置ID以便后续查找
      
      // 使用cssText设置完整的CSS样式
      descDiv.style.cssText = `
        margin-top: 10px;           /* 上边距 */
        padding: 10px;              /* 内边距 */
        background-color: #f8f9fa;  /* 浅灰色背景 */
        border-radius: 5px;         /* 圆角边框 */
        font-family: Arial, sans-serif;  /* 字体 */
        font-size: 14px;            /* 字体大小 */
        color: #333;                /* 深灰色文字 */
      `;
      
      // 将说明元素添加到主容器中
      this.container.appendChild(descDiv);
    }
    
    // 设置或更新说明文字内容
    descDiv.textContent = text;
  }
}

export default Canvas;

// 浏览器环境
if (typeof window !== 'undefined') {
  // 将Canvas类挂载到全局window对象上，在HTML页面中可以直接使用 new window.Canvas() 或 new Canvas()
  window.Canvas = Canvas;
}
