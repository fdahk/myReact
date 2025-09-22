// WebGL着色器代码
const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    uniform mat4 u_matrix;
    varying vec4 v_color;
    
    void main() {
        gl_Position = u_matrix * a_position;
        v_color = a_color;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_color;
    
    void main() {
        gl_FragColor = v_color;
    }
`;

class WebGLCube {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl');
        
        if (!this.gl) {
            throw new Error('WebGL不可用');
        }
        
        // 设置视口
        this.gl.viewport(0, 0, canvas.width, canvas.height);
        
        // 设置清除颜色为深灰色，这样更容易看到是否在渲染
        this.gl.clearColor(0.2, 0.2, 0.2, 1.0);
        
        this.program = this.createProgram();
        this.setupGeometry();
        this.rotation = 0;
        
        console.log('WebGL初始化成功');
    }
    
    createProgram() {
        const gl = this.gl;
        const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        // 检查程序链接是否成功
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const error = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error('着色器程序链接失败: ' + error);
        }
        
        console.log('着色器程序创建成功');
        return program;
    }
    
    createShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        // 检查编译是否成功
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const error = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error('着色器编译失败: ' + error);
        }
        
        return shader;
    }
    
    setupGeometry() {
        const gl = this.gl;
        
        // 立方体顶点数据（位置 + 颜色）
        // 每个顶点7个浮点数：x, y, z, r, g, b, a
        const vertices = new Float32Array([
            // 前面 - 红色
            -0.5, -0.5,  0.5,  1.0, 0.0, 0.0, 1.0,
             0.5, -0.5,  0.5,  1.0, 0.0, 0.0, 1.0,
             0.5,  0.5,  0.5,  1.0, 0.0, 0.0, 1.0,
            -0.5,  0.5,  0.5,  1.0, 0.0, 0.0, 1.0,
            
            // 后面 - 绿色
            -0.5, -0.5, -0.5,  0.0, 1.0, 0.0, 1.0,
             0.5, -0.5, -0.5,  0.0, 1.0, 0.0, 1.0,
             0.5,  0.5, -0.5,  0.0, 1.0, 0.0, 1.0,
            -0.5,  0.5, -0.5,  0.0, 1.0, 0.0, 1.0,
        ]);
        
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        
        // 索引数据
        const indices = new Uint16Array([
            0, 1, 2,  0, 2, 3,  // 前面
            4, 5, 6,  4, 6, 7,  // 后面
            0, 4, 7,  0, 7, 3,  // 左面
            1, 5, 6,  1, 6, 2,  // 右面
            3, 2, 6,  3, 6, 7,  // 上面
            0, 1, 5,  0, 5, 4   // 下面
        ]);
        
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        
        this.indexCount = indices.length;
        
        console.log('几何体数据设置完成，顶点数:', vertices.length / 7, '三角形数:', indices.length / 3);
    }
    
    render() {
        const gl = this.gl;
        
        // 清空画布
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        
        // 使用着色器程序
        gl.useProgram(this.program);
        
        // 绑定顶点数据
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        
        const positionLocation = gl.getAttribLocation(this.program, 'a_position');
        const colorLocation = gl.getAttribLocation(this.program, 'a_color');
        
        // 检查属性位置是否有效
        if (positionLocation === -1 || colorLocation === -1) {
            console.error('无法获取着色器属性位置');
            return;
        }
        
        // 位置属性 (3个浮点数，从偏移0开始)
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 28, 0);
        
        // 颜色属性 (4个浮点数，从偏移12开始)
        gl.enableVertexAttribArray(colorLocation);
        gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 28, 12);
        
        // 创建变换矩阵
        const matrix = this.createTransformMatrix();
        const matrixLocation = gl.getUniformLocation(this.program, 'u_matrix');
        
        if (matrixLocation === null) {
            console.error('无法获取矩阵uniform位置');
            return;
        }
        
        gl.uniformMatrix4fv(matrixLocation, false, matrix);
        
        // 绑定索引缓冲区并绘制
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
        
        // 检查WebGL错误
        const error = gl.getError();
        if (error !== gl.NO_ERROR) {
            console.error('WebGL渲染错误:', error);
        }
    }
    
    createTransformMatrix() {
        const canvas = this.canvas;
        const aspect = canvas.width / canvas.height;
        
        // 旋转矩阵
        const cos = Math.cos(this.rotation);
        const sin = Math.sin(this.rotation);
        
        // 创建透视投影矩阵
        const fov = Math.PI / 4; // 45度视角
        const near = 0.1;
        const far = 100.0;
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        const rangeInv = 1.0 / (near - far);
        
        // 组合变换：透视投影 * 平移 * 旋转
        return new Float32Array([
            f / aspect * cos, 0, f / aspect * sin, 0,
            0, f, 0, 0,
            -f / aspect * sin, 0, f / aspect * cos, 0,
            0, 0, -3 * (near + far) * rangeInv, (2 * far * near * rangeInv) - 3
        ]);
    }
    
    updateRotation(deltaTime = 0.016) {
        this.rotation += deltaTime;
    }
}

// 全局变量，用于HTML页面控制
// cube变量在HTML中声明

// 初始化函数
function initWebGLCube() {
    try {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas) {
            throw new Error('找不到canvas元素');
        }
        
        cube = new WebGLCube(canvas);
        console.log('WebGL立方体初始化成功');
        return true;
    } catch (error) {
        console.error('WebGL初始化失败:', error);
        return false;
    }
}

// 渲染函数
function renderFrame() {
    if (cube) {
        cube.render();
    }
}

// 更新旋转
function updateRotation() {
    if (cube) {
        cube.updateRotation(0.02);
    }
}