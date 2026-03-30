    1.translate属性的参数：
        - translate(x) - 只在x轴平移，y轴默认为0
        - translate(x, y) - x轴和y轴同时平移
        - translateX(x) - 只在x轴平移
        - translateY(y) - 只在y轴平移
        - translate3d(x, y, z) - 3D平移，包含z轴
        - translateZ(z) - 只在z轴平移
        
    2.CSS/HTML坐标轴系统：
        **2D坐标系 (屏幕坐标系)**：
        - X轴：从左到右为正方向 (→)
        - Y轴：从上到下为正方向 (↓)
        - 原点(0,0)：通常在元素的左上角
        
        **3D坐标系 (右手坐标系)**：
        - X轴：从左到右为正方向 (→)
        - Y轴：从上到下为正方向 (↓)  
        - Z轴：从屏幕向外为正方向 (朝向用户)
        
        **统一性**：
        - CSS transform、position、margin、padding等都遵循相同坐标系
        - HTML Canvas 2D context也使用相同坐标系
        - SVG默认也使用相同坐标系
        - WebGL使用标准3D坐标系(Y轴向上)，与CSS 3D有差异
        
    3.旋转的统一规律：
        **2D旋转**：
        - 旋转方向：顺时针为正值，逆时针为负值
        - 旋转中心：默认为元素的中心点(50% 50%)
        - 角度单位：deg(度)、rad(弧度)、turn(圈)、grad(梯度)
        
        **3D旋转**：
        - rotateX()：绕X轴旋转(水平轴)，正值向下翻转
        - rotateY()：绕Y轴旋转(垂直轴)，正值向右翻转  
        - rotateZ()：绕Z轴旋转(深度轴)，等同于2D旋转，正值顺时针
        - 遵循右手定则：拇指指向轴的正方向，四指弯曲方向为正旋转方向
        
        **统一性说明**：
        - CSS transform rotate
        - SVG transform rotate
        - Canvas 2D context rotate()
        - 都遵循相同的顺时针正值规则

        **注意**：
        - WebGL/Three.js的旋转方向可能因库而异
        - 某些图形库可能使用逆时针为正值的约定
        - CSS中可用transform-origin改变旋转中心点
    
    4.动画中的 transform 会于静态transform 产生冲突，动画执行完后会被静态的 transform 覆盖

    5.animation-fill-mode 的四个值：
        none (默认)：动画结束后恢复原始状态
        forwards ：保持动画结束时的状态
        backwards：动画开始前就应用第一帧的状态
        both：同时应用 forwards 和 backwards

    6.background: linear-gradient(to right, #f0f0f0 %0, #01ff52 %100);
        /* 关键字方向 */
        to top          /* 从下到上 */

        /* 对角线方向 */
        to top left     /* 到左上角 */。。。。。

        /* 角度值（更精确） */
        0deg            /* 从下到上 */
        90deg           /* 从左到右 */
    
    7.drop-shadow() 和 box-shadow 区别：
        **box-shadow**：
        - 作用于元素的盒模型边界
        - 基于矩形边框创建阴影
        - 即使元素有透明部分，阴影仍是完整矩形
        - box-shadow: offset-x offset-y blur-radius spread-radius color inset;
        
        **filter: drop-shadow()**：
        - 作用于元素的实际可见内容
        - 基于元素的Alpha通道（透明度）创建阴影
        - 只在不透明部分创建阴影，透明部分不会有阴影
        - filter: drop-shadow(offset-x offset-y blur-radius color);

    8.backface-visibility ：控制元素背面（翻转后）是否可见的属性
        backface-visibility: visible | hidden;
        - visible（默认）：背面可见，即使元素被翻转也能看到
        - hidden：背面不可见，元素翻转180度后完全隐藏
        - 当元素通过3D变换（如rotateY(180deg)）翻转时
        - visible：会显示元素的"背面"（内容会镜像显示）
        - hidden：翻转后元素完全消失，不占用视觉空间

        1. 初始状态：显示正面，背面隐藏（因为背面已旋转180度）
        2. hover时：整个卡片旋转180度
        3. 结果：正面旋转到背面位置被隐藏，背面旋转到正面位置显示
        - 必须配合3D变换使用（rotateX, rotateY, rotateZ）
        - 需要设置 transform-style: preserve-3d
        - 通常需要设置 perspective 创建3D空间
        - 对2D变换（如rotate）无效
        

 9.25：
     1.CSS 3D 变换详解：

        A. **perspective（透视）**：
           - 定义：设置观察者到3D元素的距离，创建透视效果
           - 语法：perspective: <length> | none;
           - 作用：数值越小，透视效果越强烈；数值越大，透视效果越平缓
           - 应用位置：设置在3D元素的父容器上
           
        B. **transform-style**：
           - 定义：控制子元素是否保持3D变换效果
           - 语法：transform-style: flat | preserve-3d;
           - flat（默认）：子元素在2D平面内渲染
           - preserve-3d：子元素保持3D空间位置关系
           
        C. **perspective-origin**：
           - 定义：设置透视的观察点位置
           - 语法：perspective-origin: x-position y-position;
           - 默认值：50% 50%（中心点）
           perspective-origin: left top;    /* 从左上角观察 */
           perspective-origin: 100% 0;      /* 从右上角观察 */
           
        **3D矩阵**：
           matrix3d(16个参数)     /* 4x4变换矩阵 */


# CSS 参考文档
- [CSS语法](#css语法)
- [选择器](#选择器)
- [布局属性](#布局属性)
- [文字和字体属性](#文字和字体属性)
- [视觉效果属性](#视觉效果属性)
- [动画和过渡](#动画和过渡)
- [单位和值类型](#单位和值类型)
- [函数](#函数)
- [高级特性](#高级特性)

CSS (Cascading Style Sheets) 层叠样式表，用于描述HTML或XML文档的表现形式。

### 核心概念
- **层叠 (Cascading)**: 样式规则的优先级和继承机制
- **继承 (Inheritance)**: 子元素继承父元素的某些样式属性
- **特异性 (Specificity)**: 选择器的权重计算规则
- **盒模型 (Box Model)**: 元素的内容、内边距、边框、外边距

### 样式来源优先级
1. 用户代理样式 (浏览器默认)
2. 用户样式
3. 作者样式 (开发者编写)
4. !important 声明
5. 内联样式

## CSS语法

### @规则详解

#### @charset - 字符编码声明
**定义**：声明CSS文件的字符编码格式

**语法**：
```css
@charset "encoding-name";
```
1. **位置要求**：必须是CSS文件的第一行，前面不能有任何字符（包括注释、空格）
2. **语法严格**：必须使用双引号，不能用单引号
3. **分号必需**：语句必须以分号结尾
4. **大小写敏感**：编码名称区分大小写

**常用编码**：
- `@charset "UTF-8";` - 最常用，支持全球所有字符
- `@charset "ISO-8859-1";` - 西欧字符集
- `@charset "GBK";` - 中文字符集（较旧）

**示例**：
```css
@charset "UTF-8";
/* 现在可以安全使用中文、emoji等字符 */
.chinese-text {
    content: "你好世界 🌍";
    font-family: "微软雅黑", sans-serif;
}
```

**注意事项**：
- 如果不声明，浏览器会根据HTTP头部、BOM或启发式方法猜测编码
- HTML中的`<meta charset="UTF-8">`与CSS中的`@charset`是独立的
- 现代开发中，UTF-8是标准选择
- 服务器的Content-Type头部优先级高于@charset

**最佳实践**：
1. 总是在CSS文件开头声明`@charset "UTF-8";`
2. 确保文件实际保存为UTF-8编码
3. 配置服务器正确发送Content-Type头部

#### @font-face - 自定义字体
**定义**：允许网页使用自定义字体，而不依赖用户系统字体

**语法**：
```css
@font-face {
    font-family: "字体名称";
    src: url("字体文件路径") format("字体格式");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
```

**核心属性**：
- `font-family`: 自定义字体名称（后续可用此名称引用）
- `src`: 字体文件来源，支持多个备选源
- `font-weight`: 字体粗细（100-900, normal, bold等）
- `font-style`: 字体样式（normal, italic, oblique）
- `font-display`: 字体加载显示策略

**font-display 值详解**：
- `auto`: 浏览器默认行为
- `block`: 先隐藏文本，字体加载完成后显示
- `swap`: 先用备用字体显示，字体加载完成后替换
- `fallback`: 短暂隐藏后显示备用字体，有限时间内替换
- `optional`: 仅在网络状况良好时使用自定义字体

**示例**：
```css
@font-face {
    font-family: "MyCustomFont";
    src: url("fonts/mycustomfont.woff2") format("woff2"),
         url("fonts/mycustomfont.woff") format("woff"),
         url("fonts/mycustomfont.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* 优化加载体验 */
}

/* 使用自定义字体 */
.custom-text {
    font-family: "MyCustomFont", Arial, sans-serif;
}
```

**字体格式支持**：
- `woff2`: 最现代，压缩率最高，推荐首选
- `woff`: 广泛支持的现代格式
- `ttf/otf`: 传统格式，文件较大
- `eot`: IE专用格式（已过时）

#### @supports - 特性查询
**定义**：检测浏览器是否支持特定CSS特性，实现渐进增强

**语法**：
```css
@supports (属性: 值) {
    /* 支持时的样式 */
}

@supports not (属性: 值) {
    /* 不支持时的样式 */
}
```

**逻辑操作符**：
- `and`: 且逻辑 - 所有条件都满足
- `or`: 或逻辑 - 任一条件满足
- `not`: 非逻辑 - 条件不满足

**示例**：
```css
/* 检测Grid支持 */
@supports (display: grid) {
    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}

@supports not (display: grid) {
    .container {
        display: flex;
        flex-wrap: wrap;
    }
}

/* 复合条件检测 */
@supports (display: grid) and (gap: 1rem) {
    .modern-grid {
        display: grid;
        gap: 1rem;
    }
}

/* 检测CSS自定义属性 */
@supports (--custom: value) {
    .theme {
        --primary-color: #007acc;
        color: var(--primary-color);
    }
}

/* 检测新的CSS函数 */
@supports (width: clamp(1rem, 5vw, 3rem)) {
    .responsive-text {
        font-size: clamp(1rem, 2.5vw, 2rem);
    }
}
```

**常见检测场景**：
- CSS Grid/Flexbox支持
- CSS变量支持
- 新的CSS函数（clamp, min, max）
- 现代布局特性
- 滤镜效果支持

#### @namespace - 命名空间声明
**定义**：为CSS选择器声明XML命名空间，主要用于处理XML/XHTML文档

**语法**：
```css
@namespace url("命名空间URI");
@namespace 前缀 url("命名空间URI");
```

**使用场景**：
主要用于处理包含多个XML命名空间的文档，如SVG内嵌的XHTML

**示例**：
```css
/* 声明默认命名空间 */
@namespace url("http://www.w3.org/1999/xhtml");

/* 声明带前缀的命名空间 */
@namespace svg url("http://www.w3.org/2000/svg");
@namespace mathml url("http://www.w3.org/1998/Math/MathML");

/* 使用命名空间选择器 */
/* 选择XHTML中的div元素 */
div {
    color: blue;
}

/* 选择SVG命名空间中的circle元素 */
svg|circle {
    fill: red;
}

/* 选择MathML命名空间中的math元素 */
mathml|math {
    font-family: serif;
}
```

**注意事项**：
- 现代Web开发中很少使用
- 主要用于复杂的XML文档处理
- HTML5中通常不需要命名空间声明
- 必须在所有其他CSS规则之前声明

#### 其他@规则
- `@import` - 导入外部样式表
- `@media` - 媒体查询  
- `@keyframes` - 定义动画关键帧


## 选择器

### 基础选择器
- **通用选择器**: `*` - 选择所有元素
- **元素选择器**: `div`, `p`, `h1` - 选择指定元素
- **类选择器**: `.classname` - 选择指定类名的元素
- **ID选择器**: `#idname` - 选择指定ID的元素
- **属性选择器**: `[attr]`, `[attr=value]` - 按属性选择

### 属性选择器详细语法
- `[attr]` - 存在attr属性
- `[attr=value]` - attr属性值等于value
- `[attr~=value]` - attr属性值包含value单词，例如en-US
- `[attr|=value]` - attr属性值以value开头，后跟连字符，如zh-CN
- `[attr^=value]` - attr属性值以value开头
- `[attr$=value]` - attr属性值以value结尾
- `[attr*=value]` - attr属性值包含value子串
- `[attr=value i]` - 不区分大小写匹配

**使用实例**：

```html
<ul class="link-list">
    <li><a href="https://example.com">Official Site</a></li>
    <li><a href="/guide.pdf">CSS Guide</a></li>
    <li><a data-role="button primary" data-lang="en-US">Primary Button</a></li>
    <li><a data-role="button secondary" data-lang="zh-CN">Secondary Button</a></li>
    <li><input type="TEXT" value="Search" /></li>
</ul>
```

```css
/* 只要有 href 属性就会命中 */
[href] {
    text-decoration: none;
}

/* 精确匹配属性值 */
[href="/guide.pdf"] {
    color: #d97706;
}

/* 属性值里包含某个独立单词 */
[data-role~="primary"] {
    font-weight: 700;
}

/* 常用于匹配语言代码 */
[data-lang|="zh"] {
    background: #f0f9ff;
}

/* 以前缀开头 */
[href^="https"] {
    color: #2563eb;
}

/* 以后缀结尾 */
[href$=".pdf"] {
    border-bottom: 2px solid currentColor;
}

/* 只要属性值中包含该片段即可 */
[data-role*="button"] {
    padding: 4px 8px;
}

/* 不区分大小写 */
[type="text" i] {
    border: 1px solid #22c55e;
}
```

### 组合选择器
- **后代选择器**: `A B` - A元素内的所有B元素
- **子选择器**: `A > B` - A元素的直接子元素B
- **相邻兄弟选择器**: `A + B` - A元素后紧邻的B元素
- **通用兄弟选择器**: `A ~ B` - A元素后的所有兄弟B元素

**使用实例**：

```html
<div class="card">
    <h3>Card Title</h3>
    <p>Intro Text</p>
    <section>
        <p>Nested Text</p>
    </section>
    <button>Confirm</button>
    <span>Hint</span>
    <span>Status</span>
</div>
```

```css
/* 选中 .card 里面所有 p，包括嵌套在 section 里的 */
.card p {
    color: #475569;
}

/* 只选中 .card 的直接子元素 button */
.card > button {
    background: #2563eb;
    color: #fff;
}

/* 选中 button 后面紧挨着的第一个 span */
button + span {
    color: #f59e0b;
}

/* 选中 button 后面所有同级 span */
button ~ span {
    font-size: 12px;
}
```

### 伪类选择器
#### 状态伪类
- `:hover` - 鼠标悬停
- `:active` - 激活状态
- `:focus` - 获得焦点
- `:visited` - 已访问链接
- `:link` - 未访问链接
- `:disabled` - 禁用元素
- `:enabled` - 启用元素
- `:checked` - 选中的表单元素
- `:indeterminate` - 不确定状态

#### 结构伪类
- `:first-child` - 第一个子元素
- `:last-child` - 最后一个子元素
- `:nth-child(n)` - 第n个子元素
- `:nth-last-child(n)` - 倒数第n个子元素
- `:first-of-type` - 同类型第一个元素
- `:last-of-type` - 同类型最后一个元素
- `:nth-of-type(n)` - 同类型第n个元素
- `:nth-last-of-type(n)` - 同类型倒数第n个元素
- `:only-child` - 唯一子元素
- `:only-of-type` - 同类型唯一元素
- `:empty` - 空元素
- `:root` - 根元素

**使用实例**：

```html
<ul class="menu">
    <li>Home</li>
    <li>Docs</li>
    <li>Blog</li>
    <li>About</li>
</ul>

<div class="article">
    <p>First Paragraph</p>
    <p>Second Paragraph</p>
    <span>Inline Note</span>
    <p>Third Paragraph</p>
</div>

<div class="single-wrap">
    <span>Only Item</span>
</div>

<div class="empty-box"></div>
```

```css
.menu li:first-child {
    color: #2563eb;
}

.menu li:last-child {
    color: #dc2626;
}

.menu li:nth-child(2) {
    font-weight: 700;
}

.menu li:nth-last-child(2) {
    text-decoration: underline;
}

.article p:first-of-type {
    font-size: 18px;
}

.article p:last-of-type {
    color: #16a34a;
}

.article p:nth-of-type(2) {
    background: #fef3c7;
}

.article p:nth-last-of-type(2) {
    border-left: 3px solid #7c3aed;
}

.single-wrap span:only-child {
    display: inline-block;
    padding: 4px 8px;
}

.single-wrap span:only-of-type {
    background: #e0f2fe;
}

.empty-box:empty {
    height: 24px;
    background: #f1f5f9;
}

:root {
    --brand-color: #2563eb;
}
```

**重点理解**：
- `:first-child` / `:last-child` 看的是“是不是父元素的第一个或最后一个孩子”。
- `:nth-child(n)` 不关心元素类型，只看它在兄弟节点里的整体顺序。
- `:first-of-type` / `:nth-of-type(n)` 只在同类型元素里排顺序。
- `:only-child` 要求父元素下只有这一个子元素。
- `:only-of-type` 表示同级里这种标签只出现一次，即使旁边还有别的标签也可能命中。
- `:empty` 要求元素内部没有文本、没有子元素，连空格都可能影响匹配。
- `:root` 在 HTML 文档里通常就是 `<html>`，常用于定义全局 CSS 变量。

#### 其他伪类
- `:not(selector)` - 非选择器
- `:target` - 目标元素
- `:lang(language)` - 指定语言

### 伪元素选择器
- `::before` - 元素前插入内容
- `::after` - 元素后插入内容
- `::first-line` - 第一行
- `::first-letter` - 首字母
- `::selection` - 选中文本
- `::placeholder` - 占位符文本


## 布局属性

### Display 属性
```css
display: none;           /* 不显示 */
display: block;          /* 块级元素 */
display: inline;         /* 行内元素 */
display: inline-block;   /* 行内块元素 */
display: flex;           /* 弹性布局 */
display: grid;           /* 网格布局 */
display: table;          /* 表格显示 */
display: table-cell;     /* 表格单元格 */
display: list-item;      /* 列表项 */
display: run-in;         /* 根据上下文决定 */
```

### Position 属性
```css
position: static;        /* 默认定位 */
position: relative;      /* 相对定位 */
position: absolute;      /* 绝对定位 */
position: fixed;         /* 固定定位 */
position: sticky;        /* 粘性定位 */
```

### 定位属性
```css
top: <length> | <percentage> | auto;
right: <length> | <percentage> | auto;
bottom: <length> | <percentage> | auto;
left: <length> | <percentage> | auto;
z-index: <integer> | auto;
```

### Float 属性
```css
float: none | left | right;
clear: none | left | right | both;
```

### Flexbox 属性
#### 容器属性
```css
display: flex;
flex-direction: row | row-reverse | column | column-reverse;
flex-wrap: nowrap | wrap | wrap-reverse;
flex-flow: <flex-direction> <flex-wrap>;
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
align-items: stretch | flex-start | flex-end | center | baseline;
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
gap: <length>;
row-gap: <length>;
column-gap: <length>;
```

#### 项目属性
```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
flex-grow: <number>;
flex-shrink: <number>;
flex-basis: <length> | auto;
align-self: auto | flex-start | flex-end | center | baseline | stretch;
order: <integer>;
```

### Grid 属性
#### 容器属性
```css
display: grid;
grid-template-columns: <track-size> | <line-name> <track-size>;
grid-template-rows: <track-size> | <line-name> <track-size>;
grid-template-areas: "<grid-area-name> | . | none";
grid-template: <grid-template-rows> / <grid-template-columns>;
grid-column-gap: <length>;
grid-row-gap: <length>;
grid-gap: <grid-row-gap> <grid-column-gap>;
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;
place-items: <align-items> <justify-items>;
justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
align-content: start | end | center | stretch | space-around | space-between | space-evenly;
place-content: <align-content> <justify-content>;
grid-auto-columns: <track-size>;
grid-auto-rows: <track-size>;
grid-auto-flow: row | column | row dense | column dense;
```

#### 项目属性
```css
grid-column-start: <number> | <name> | span <number> | span <name> | auto;
grid-column-end: <number> | <name> | span <number> | span <name> | auto;
grid-row-start: <number> | <name> | span <number> | span <name> | auto;
grid-row-end: <number> | <name> | span <number> | span <name> | auto;
grid-column: <start-line> / <end-line> | <start-line> / span <value>;
grid-row: <start-line> / <end-line> | <start-line> / span <value>;
grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
justify-self: start | end | center | stretch;
align-self: start | end | center | stretch;
place-self: <align-self> <justify-self>;
```

### 盒模型属性
```css
/* 盒模型计算方式 */
box-sizing: content-box | border-box;
```


### 边框属性
```css
border: <border-width> <border-style> <border-color>;
border-width: thin | medium | thick | <length>;
border-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset;
border-color: <color>;

/* 单边边框 */
border-top: <border-width> <border-style> <border-color>;

/* 圆角 */
border-radius: <length> | <percentage>;
border-top-left-radius: <length> | <percentage>;

/* 边框图像 */
border-image: <source> <slice> <width> <outset> <repeat>;
border-image-source: none | <image>;
border-image-slice: <number> | <percentage>;
border-image-width: <length> | <percentage> | <number> | auto;
border-image-outset: <length> | <number>;
border-image-repeat: stretch | repeat | round | space;
```


## 文字和字体属性

### 字体属性
```css
font-family: <family-name> | <generic-family>;
font-size: <absolute-size> | <relative-size> | <length> | <percentage>;
font-weight: normal | bold | bolder | lighter | 100-900;
font-style: normal | italic | oblique;
font-variant: normal | small-caps;
font-stretch: normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded;
font: <font-style> <font-variant> <font-weight> <font-size>/<line-height> <font-family>;
```

### 文本属性
```css
color: <color>;
text-align: left | right | center | justify;
text-decoration: none | underline | overline | line-through;
text-decoration-line: none | underline | overline | line-through;
text-decoration-color: <color>;
text-decoration-style: solid | double | dotted | dashed | wavy;
text-decoration-thickness: auto | from-font | <length> | <percentage>;
text-transform: none | capitalize | uppercase | lowercase;
text-indent: <length> | <percentage>;
text-shadow: <offset-x> <offset-y> <blur-radius> <color>;
letter-spacing: normal | <length>;
word-spacing: normal | <length>;
line-height: normal | <number> | <length> | <percentage>;
white-space: normal | nowrap | pre | pre-wrap | pre-line;
word-wrap: normal | break-word;
word-break: normal | break-all | keep-all;
text-overflow: clip | ellipsis;
direction: ltr | rtl;
unicode-bidi: normal | embed | bidi-override;
```

### 列表属性
```css
list-style: <list-style-type> <list-style-position> <list-style-image>;
list-style-type: disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | none;
list-style-position: inside | outside;
list-style-image: <url> | none;
```

## 视觉效果属性

### 颜色属性
```css
color: <color>;
opacity: <number>;
```

### 背景属性
```css
background: <bg-color> <bg-image> <bg-repeat> <bg-attachment> <bg-position>;
background-color: <color>;
background-image: <url> | none;
background-repeat: repeat | repeat-x | repeat-y | no-repeat;
background-attachment: scroll | fixed | local;
background-position: <percentage> | <length> | left | center | right | top | bottom;
background-size: auto | cover | contain | <length> | <percentage>;
background-origin: padding-box | border-box | content-box;
background-clip: border-box | padding-box | content-box | text;
```

### 渐变
```css
/* 线性渐变 */
background-image: linear-gradient(<angle>, <color-stop>, <color-stop>);
/* 径向渐变 */
background-image: radial-gradient(<shape> <size> at <position>, <color-stop>, <color-stop>);
/* 圆锥渐变 */
background-image: conic-gradient(from <angle> at <position>, <color-stop>, <color-stop>);
```

### 阴影属性
```css
box-shadow: <offset-x> <offset-y> <blur-radius> <spread-radius> <color> inset;
text-shadow: <offset-x> <offset-y> <blur-radius> <color>;
```

### 滤镜属性
```css
filter: blur(<length>) | brightness(<number>) | contrast(<number>) | drop-shadow(<offset-x> <offset-y> <blur-radius> <color>) | grayscale(<number>) | hue-rotate(<angle>) | invert(<number>) | opacity(<number>) | saturate(<number>) | sepia(<number>);
backdrop-filter: <filter-functions>;
```

### 变换属性
```css
transform: none | <transform-functions>;
transform-origin: <percentage> | <length> | left | center | right | top | bottom;
transform-style: flat | preserve-3d;
perspective: none | <length>;
perspective-origin: <percentage> | <length> | left | center | right | top | bottom;
backface-visibility: visible | hidden;
```

#### 变换函数
```css
/* 2D变换 */
translate(<length>, <length>)
translateX(<length>)
translateY(<length>)
scale(<number>, <number>)
scaleX(<number>)
scaleY(<number>)
rotate(<angle>)
skew(<angle>, <angle>)
skewX(<angle>)
skewY(<angle>)
matrix(<number>, <number>, <number>, <number>, <number>, <number>)

/* 3D变换 */
translate3d(<length>, <length>, <length>)
translateZ(<length>)
scale3d(<number>, <number>, <number>)
scaleZ(<number>)
rotate3d(<number>, <number>, <number>, <angle>)
rotateX(<angle>)
rotateY(<angle>)
rotateZ(<angle>)
matrix3d(<number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>, <number>)
```

### 裁剪属性
```css
clip: rect(<top>, <right>, <bottom>, <left>) | auto;
clip-path: <basic-shape> | <clip-source> | none;
```

### 遮罩属性
```css
mask: <mask-image> <mask-mode> <mask-repeat> <mask-position> / <mask-size> <mask-composite> <mask-origin> <mask-clip>;
mask-image: <image> | none;
mask-mode: alpha | luminance | match-source;
mask-repeat: repeat | repeat-x | repeat-y | space | round | no-repeat;
mask-position: <position>;
mask-size: <bg-size>;
mask-origin: content-box | padding-box | border-box | margin-box | fill-box | stroke-box | view-box;
mask-clip: content-box | padding-box | border-box | margin-box | fill-box | stroke-box | view-box | no-clip;
mask-composite: add | subtract | intersect | exclude;
```

## 动画和过渡

### 过渡属性
```css
transition: <property> <duration> <timing-function> <delay>;
transition-property: none | all | <property>;
transition-duration: <time>;
transition-timing-function: linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>);
transition-delay: <time>;
```

### 动画属性
```css
animation: <name> <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode> <play-state>;
animation-name: none | <keyframes-name>;
animation-duration: <time>;
animation-timing-function: linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>);
animation-delay: <time>;
animation-iteration-count: <number> | infinite;
animation-direction: normal | reverse | alternate | alternate-reverse;
animation-fill-mode: none | forwards | backwards | both;
animation-play-state: running | paused;
```

### 关键帧
```css
@keyframes <keyframes-name> {
    0% { /* 样式 */ }
    25% { /* 样式 */ }
    50% { /* 样式 */ }
    75% { /* 样式 */ }
    100% { /* 样式 */ }
}

@keyframes <keyframes-name> {
    from { /* 样式 */ }
    to { /* 样式 */ }
}
```

## 单位和值类型

### 长度单位
#### 绝对长度单位
```css
px  /* 像素 */
cm  /* 厘米 */
mm  /* 毫米 */
in  /* 英寸 */
pt  /* 点 (1/72英寸) */
pc  /* 派卡 (12点) */
```

#### 相对长度单位
```css
em    /* 相对于父元素字体大小 */
rem   /* 相对于根元素字体大小 */
ex    /* 相对于字体的x-height */
ch    /* 相对于数字0的宽度 */
vw    /* 视窗宽度的1% */
vh    /* 视窗高度的1% */
vmin  /* 视窗较小尺寸的1% */
vmax  /* 视窗较大尺寸的1% */
%     /* 相对于父元素 */
```

### 角度单位
```css
deg   /* 度 */
grad  /* 梯度 */
rad   /* 弧度 */
turn  /* 圈 */
```

### 时间单位
```css
s   /* 秒 */
ms  /* 毫秒 */
```

### 频率单位
```css
Hz  /* 赫兹 */
kHz /* 千赫兹 */
```

### 分辨率单位
```css
dpi   /* 每英寸点数 */
dpcm  /* 每厘米点数 */
dppx  /* 每像素点数 */
```

### 颜色值类型
```css
/* 关键字 */
red, blue, green, black, white, transparent

/* 十六进制 */
#ff0000, #f00

/* RGB */
rgb(255, 0, 0)
rgba(255, 0, 0, 0.5)

/* HSL */
hsl(0, 100%, 50%)
hsla(0, 100%, 50%, 0.5)

/* 系统颜色 */
currentColor
```


## 函数

### 数学函数
```css
calc(<expression>)        /* 计算 */
min(<value>, <value>)     /* 最小值 */
max(<value>, <value>)     /* 最大值 */
clamp(<min>, <val>, <max>) /* 限制值 */
```

### 变换函数
```css
matrix(<number>)          /* 矩阵变换 */
translate(<length>)       /* 平移 */
scale(<number>)           /* 缩放 */
rotate(<angle>)           /* 旋转 */
skew(<angle>)            /* 倾斜 */
```

### 滤镜函数
```css
blur(<length>)            /* 模糊 */
brightness(<number>)      /* 亮度 */
contrast(<number>)        /* 对比度 */
grayscale(<number>)       /* 灰度 */
hue-rotate(<angle>)       /* 色相旋转 */
invert(<number>)          /* 反转 */
opacity(<number>)         /* 透明度 */
saturate(<number>)        /* 饱和度 */
sepia(<number>)          /* 棕褐色 */
drop-shadow(<shadow>)     /* 投影 */
```

### 形状函数
```css
circle(<radius> at <position>)
ellipse(<radius-x> <radius-y> at <position>)
polygon(<point>, <point>, ...)
inset(<offset>)
```

### 图像函数
```css
url(<string>)             /* URL */
image(<string>)           /* 图像 */
linear-gradient(<angle>, <color-stop>)  /* 线性渐变 */
radial-gradient(<shape>, <color-stop>)  /* 径向渐变 */
conic-gradient(<angle>, <color-stop>)   /* 圆锥渐变 */
repeating-linear-gradient(<angle>, <color-stop>)  /* 重复线性渐变 */
repeating-radial-gradient(<shape>, <color-stop>)  /* 重复径向渐变 */
```

### 计数器函数
```css
counter(<name>)           /* 计数器 */
counters(<name>, <string>) /* 嵌套计数器 */
```

### 属性函数
```css
attr(<attribute>)         /* 属性值 */
var(<custom-property>)    /* 自定义属性 */
```

## 高级特性

### 自定义属性 (CSS变量)
```css
/* 定义 */
:root {
    --main-color: #ff0000;
    --main-font: Arial, sans-serif;
}

/* 使用 */
.element {
    color: var(--main-color);
    font-family: var(--main-font);
}

/* 带默认值 */
.element {
    color: var(--main-color, blue);
}
```

### 媒体查询
```css
@media screen and (max-width: 600px) {
    /* 移动端样式 */
}

@media print {
    /* 打印样式 */
}

@media (prefers-color-scheme: dark) {
    /* 深色模式 */
}

@media (orientation: landscape) {
    /* 横屏样式 */
}
```

#### 媒体类型
- `all` - 所有设备
- `print` - 打印设备
- `screen` - 屏幕设备
- `speech` - 语音设备

#### 媒体特性
- `width`, `min-width`, `max-width`
- `height`, `min-height`, `max-height`
- `device-width`, `device-height`
- `orientation: portrait | landscape`
- `aspect-ratio`, `device-aspect-ratio`
- `resolution`, `min-resolution`, `max-resolution`
- `color`, `min-color`, `max-color`
- `monochrome`, `min-monochrome`, `max-monochrome`
- `prefers-color-scheme: light | dark`
- `prefers-reduced-motion: no-preference | reduce`

### 容器查询
```css
@container (min-width: 400px) {
    .card {
        display: flex;
    }
}
```

### 特性查询
```css
@supports (display: grid) {
    .grid-container {
        display: grid;
    }
}

@supports not (display: grid) {
    .fallback {
        display: table;
    }
}
```

### 计数器
```css
/* 重置计数器 */
counter-reset: section;

/* 增加计数器 */
counter-increment: section;

/* 显示计数器 */
content: counter(section);
```

### 内容生成
```css
.element::before {
    content: "前缀";
}

.element::after {
    content: attr(data-suffix);
}

.element::before {
    content: counter(section) ". ";
}
```

### 多列布局
```css
column-count: <integer> | auto;
column-width: <length> | auto;
columns: <column-width> <column-count>;
column-gap: <length> | normal;
column-rule: <column-rule-width> <column-rule-style> <column-rule-color>;
column-rule-width: <border-width>;
column-rule-style: <border-style>;
column-rule-color: <color>;
column-span: none | all;
column-fill: auto | balance;
break-before: auto | avoid | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region;
break-after: auto | avoid | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region;
break-inside: auto | avoid | avoid-page | avoid-column | avoid-region;
```

### 表格属性
```css
table-layout: auto | fixed;
border-collapse: separate | collapse;
border-spacing: <length>;
caption-side: top | bottom;
empty-cells: show | hide;
```

### 用户界面属性
```css
cursor: auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out;
outline: <outline-width> <outline-style> <outline-color>;
outline-width: thin | medium | thick | <length>;
outline-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset;
outline-color: <color> | invert;
outline-offset: <length>;
resize: none | both | horizontal | vertical;
user-select: auto | none | text | all;
```

### 打印属性
```css
page-break-before: auto | always | avoid | left | right;
page-break-after: auto | always | avoid | left | right;
page-break-inside: auto | avoid;
orphans: <integer>;
widows: <integer>;
```

### 书写模式
```css
writing-mode: horizontal-tb | vertical-rl | vertical-lr;
text-orientation: mixed | upright | sideways;
direction: ltr | rtl;
unicode-bidi: normal | embed | isolate | bidi-override | isolate-override | plaintext;
```

### 逻辑属性
```css
/* 逻辑尺寸 */
inline-size: <width>;
block-size: <height>;
min-inline-size: <min-width>;
min-block-size: <min-height>;
max-inline-size: <max-width>;
max-block-size: <max-height>;

/* 逻辑外边距 */
margin-inline-start: <margin-left>;
margin-inline-end: <margin-right>;
margin-block-start: <margin-top>;
margin-block-end: <margin-bottom>;
margin-inline: <margin-left> <margin-right>;
margin-block: <margin-top> <margin-bottom>;

/* 逻辑内边距 */
padding-inline-start: <padding-left>;
padding-inline-end: <padding-right>;
padding-block-start: <padding-top>;
padding-block-end: <padding-bottom>;
padding-inline: <padding-left> <padding-right>;
padding-block: <padding-top> <padding-bottom>;

/* 逻辑边框 */
border-inline-start: <border-left>;
border-inline-end: <border-right>;
border-block-start: <border-top>;
border-block-end: <border-bottom>;
border-inline: <border-left> <border-right>;
border-block: <border-top> <border-bottom>;
```

### 滚动行为
```css
scroll-behavior: auto | smooth;
scroll-snap-type: none | [ x | y | block | inline | both ] [ mandatory | proximity ];
scroll-snap-align: none | start | end | center;
scroll-margin: <length>;
scroll-padding: <length>;
overscroll-behavior: auto | contain | none;
```

### 可访问性属性
```css
speak: none | normal | spell-out;
speak-punctuation: code | none;
speak-numeral: digits | continuous;
speak-header: once | always;
```

---

## 开发注意
1. **浏览器兼容性**: 新特性需要检查浏览器支持情况
2. **性能考虑**: 某些属性会触发重排重绘，影响性能
3. **响应式设计**: 使用媒体查询和弹性单位适配不同设备
4. **可访问性**: 考虑色彩对比度、键盘导航等无障碍需求
5. **语义化**: 选择合适的HTML元素和CSS类名
6. **代码组织**: 使用预处理器、CSS模块或其他工具组织代码


## 高级与现代特性补充

### 级联层（Cascade Layers）
**核心**：使用 `@layer` 明确层级顺序，降低样式冲突；`revert-layer` 快速回退当前层设置。
```css
@layer reset, theme, components;

@layer reset {
  *, *::before, *::after { margin: 0; padding: 0; }
}

@layer theme {
  :root { --brand: oklch(65% 0.15 260); }
}

@layer components {
  .btn { color: var(--brand); }
}

.btn { color: red; /* 普通层，晚于已声明层，仍被 components 层覆盖 */ }

.btn.alt { color: revert-layer; /* 回退到更低层对该属性的定义 */ }
```
要点：
- `@layer` 顺序定义优先于来源顺序；未声明的层按首次出现顺序加入。
- `:where()` 零特异性常与 `@layer` 配合以最小化冲突。

### 现代选择器与关系伪类
- `:has()` 关系伪类（父选子/同级联动）：
```css
/* 父元素包含 .error 子孙时高亮自己 */
form:has(.error) { outline: 1px solid color-mix(in oklch, red 70%, black); }

/* 卡片内有选中复选框时显示工具栏 */
.card:has(input[type="checkbox"]:checked) .toolbar { display: block; }
```
- `:is()`、`:where()` 简化复杂选择器，`where` 特异性为0；
- `:not()` 支持复杂选择器；
- 扩展的 `:nth-child(An+B of <selector-list>)`：
```css
/* 仅统计可见项中的奇数序 */
.list > :nth-child(odd of :not([hidden])) { background: hsl(0 0% 95%); }
```
- 可用性增强：`:focus-visible`、`:focus-within`、`:target-within`、`:dir()`。

### 容器查询（Container Queries）与容器单位
```css
/* 声明容器 */
.card { container-type: inline-size; container-name: card; }

/* 尺寸查询 */
@container card (min-width: 480px) {
  .card .media { grid-template-columns: 1fr 2fr; }
}

/* 样式查询（Style Queries）*/
@container style(--variant: "dense") {
  .card { gap: 8px; }
}

/* 容器相对单位 */
.title { font-size: clamp(16px, 4cqw, 24px); }
```
要点：
- 必须指定 `container-type`（常用 `inline-size`）；
- 容器单位：`cqw` `cqh` `cqi` `cqb` `cqmin` `cqmax`；
- 样式查询依赖容器 `@container style(...)` 与自定义属性。

### CSS 嵌套（CSS Nesting）
```css
.card {
  & .title { font-weight: 600; }
  &:hover { box-shadow: 0 4px 16px rgb(0 0 0 / 0.1); }
  .btn {
    &.primary { background: color-mix(in oklch, var(--brand) 80%, white); }
  }
}
```
规则：
- 使用 `&` 明确当前选择器位置；
- 顶层可直接嵌套 `@media`、`@supports`、`@layer`；
- 复杂嵌套建议配合 `:is()` 限制特异性与展开规模。

### 新一代颜色与颜色函数（CSS Color 4/5）
```css
.swatch {
  /* 新色彩空间 */
  color: oklch(65% 0.12 265);
  background: color(display-p3 0.2 0.6 0.9);

  /* 颜色混合 */
  border-color: color-mix(in oklab, red 40%, blue);

  /* 相对颜色语法 */
  --bg: #0af;
  background-color: color(from var(--bg) oklch l c h / 0.85);
}
```
要点：`lab()` `lch()` `oklab()` `oklch()` `hwb()` `color()` `color-mix()`；广色域需配合媒体查询 `@media (color-gamut: p3)` 做降级。

### 视口与动态视口单位
- 新单位：`svw/svh`（小视口），`lvw/lvh`（大视口），`dvw/dvh`（动态视口）；
- 文本相关单位：`lh`、`rlh`；字体单位：`cap`、`ic`；
- 逻辑视口单位：`vi`、`vb`；
```css
header { min-height: 100dvh; }
.hero { padding-block: 10svh; }
.title { margin-block-start: 1lh; font-size: clamp(1rem, 2vi, 2rem); }
```

### 媒体查询 Level 4/5 与范围语法
```css
/* 范围语法 */
@media (600px <= width <= 1200px) { /* ... */ }

/* 对比度与数据节省偏好 */
@media (prefers-contrast: more) { /* 强化边界与阴影 */ }
@media (prefers-reduced-data: reduce) { /* 降低大图/动画 */ }

/* 显示能力 */
@media (dynamic-range: high) { /* HDR 优化 */ }
```

### 滚动驱动动画（Scroll-Linked Animations）
```css
@scroll-timeline gallery {
  source: auto; /* 或者选择器 */
  orientation: block;
}

.card {
  animation: fade-in 1s linear both;
  animation-timeline: gallery;
  animation-range: entry 0% cover 60%;
}

@keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
```
补充：`view-timeline-*` 适用于基于元素视图进入/离开区间的动画；`timeline-scope` 用于限定时间线作用域。

### 视图过渡（View Transitions）
```css
/* 单页/同源导航过渡伪元素 */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 400ms;
}
```
要点：可为命名视图创建过渡，复杂场景需配合脚本触发与命名分片。

### 子网格（Subgrid）
```css
.layout { display: grid; grid-template-columns: 200px 1fr; }
.sidebar, .content { display: grid; grid-template-rows: subgrid; grid-row: 1 / -1; }
```
要点：子元素继承轨道对齐和线命名，统一跨层栅格对齐。

### 文本与排版增强
```css
/* 自动平衡标题换行 */
h1 { text-wrap: balance; }

/* 更自然的断行 */
p { overflow-wrap: anywhere; hyphens: auto; }
```
更多：`text-wrap: pretty`、`text-spacing-trim`、`text-box-trim`（部分实现/实验性）。

### 性能与渲染控制
```css
/* 跳过不可见内容布局绘制，提升长列表性能 */
.section { content-visibility: auto; contain-intrinsic-size: 600px; }

/* 组件隔离 */
.widget { contain: content paint; }
```

### 锚点定位（Anchor Positioning）
```css
.trigger { anchor-name: --menu; }
.popover {
  position: absolute;
  position-anchor: --menu;
  inset-area: bottom;
  inset: anchor(bottom center);
}
```
说明：用于“贴附定位”的浮层/弹出；当前实现与兼容性仍在演进，需做降级方案。

### 运动路径（Motion Path）
```css
.dot {
  offset-path: path("M0,0 C 50,100 150,-100 200,0");
  offset-distance: 0%;
  animation: move 3s linear infinite;
}
@keyframes move { to { offset-distance: 100%; } }
```

### 表单与交互样式
```css
input[type="checkbox"] { accent-color: var(--brand); }
input, select { appearance: auto; }
input, textarea { field-sizing: content; }
input[type="file"]::file-selector-button { padding: 0.5em 1em; }
```

### 顶层与遮罩
```css
dialog::backdrop { backdrop-filter: blur(6px) saturate(120%); }
```
补充：顶层（top layer）元素如 `dialog[open]`、`popover` 可通过 `::backdrop` 自定义遮罩。

### 自定义属性注册（@property）
```css
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.spinner {
  --angle: 0deg;
  transform: rotate(var(--angle));
  transition: --angle 300ms linear; /* 可动画化 */
}
```

### 数学与三角函数（CSS Values 4）
```css
.wave { transform: translateX(sin(1turn * var(--i) / 12) * 20px); }
.scale { transform: scale(pow(1.2, var(--level))); }
/* 还支持：cos(), tan(), asin(), acos(), atan(), atan2(), sqrt(), hypot(), log(), exp(), sign(), round() 等 */
```

### 图像与分辨率
```css
.hero {
  background-image: image-set(
    url(bg@1x.avif) 1x,
    url(bg@2x.avif) 2x
  );
  image-rendering: crisp-edges; /* 像素风 */
}
```

### 其他常用补充
- `aspect-ratio`：内置保持宽高比；
- 滚动吸附细节：`scroll-margin`/`scroll-padding` 已列出，配合锚点导航更稳定；
- 自定义滚动条：Firefox `scrollbar-color/width`，Chromium `::-webkit-scrollbar*`（非标准）。



“主轴为 x（flex-direction: row）的 flex 容器宽度不会被子元素撑大”要看它是 块级 还是 行内级：
对默认的块级 flex（display: flex）来说，width: auto 会先取父容器的可用宽度，所以看起来不会被子元素“撑大”；子元素空间不够就挤压/换行/溢出。
但如果是 display: inline-flex（或父元素本身宽度不固定），容器的实际宽度仍然可能跟着子元素的内容变化。
高度方面，无论 flex 方向如何，容器在未指定 height 时都是由子元素决定的（默认 align-items: stretch 时还会让子元素高度跟着容器走）。

因为 scroll-view 里的内容会按“行内流”来排布。当你把容器设成 white-space: nowrap 时，它会让这一行的文本和行内元素禁止自动换行；再把每个卡片改成 display: inline-block，它们就和“文字”一样在同一行顺次排列。这样一来，容器本身不够宽就会出现横向溢出，scroll-view 的横向滚动就能生效，形成连续横排的滑动效果。换句话说：nowrap 负责阻止换行，inline-block 让元素参与行内排版，两者结合就能在不依赖 flex 的前提下实现横向列表。

Post 的根节点确实写了 width: 100%，但它所在的 .content-body 被你设置成了 display: flex; flex-direction: column; align-items: center;。在列方向的 flex 容器里，交叉轴（横向）的对齐由 align-items 控制：当是 center 时，子项会按照自身内容宽度居中显示，不会被“拉伸”到跟父容器一样宽，所以看起来没占满。
改法任选其一即可：
把 .content-body 的 align-items 改成 stretch（默认值）或 flex-start；
或者只给帖子单独拉满：.content-body :deep(.post-wrapper) { align-self: stretch; } / width: 100%（配合 align-self: stretch 更稳）。
这样帖子就能撑满父容器的横向宽度了。

box-sizing 的默认值是 content-box。在这个模式下，width/height 只计算内容区，额外的 padding、border 会把盒子撑得更大。
box-sizing: border-box 会把 padding 和 border 都算进宽高里，也就是说，设置成 width: 200px 后，无论内边距/边框是多少，盒子的总宽仍然是 200px；内部内容区会按剩余空间自动压缩。这样在做自适应布局时更省心，所以很多项目会全局切到 border-box。

这两个 text 被分成两行，是因为它们的父节点 .post-header-title 写了 display: flex; flex-direction: column;。在列方向的 flex 容器中，子项会按“从上到下”一行一个地排列，而且默认 align-items: stretch，所以每个子项会被拉满父容器宽度，看起来就像各自占了一整行。

uv-icon 的 color="#3D3D3D" 会直接生成内联样式，优先级比类选择器高，所以即使绑定了 active，颜色仍然按内联样式显示

百分比高度必须向上层逐级“有确定高度”才能成立。你给 scroll-view 写了 height: 100%，要想生效，它的父级（.body）、再往上的祖先都得有明确的 height。
用 height: 100vh 时，.page 的高度是确定的，.body 的 flex: 1 能算出具体像素，scroll-view 的 height: 100% 也就成立，从而只滚动内容区。
换成 max-height: 100vh 后，.page 的高度不再固定，而是“内容多少就多高，但不超过 100vh”。这种情况下它不算“确定高度”，子元素的百分比高度会被当成 auto，scroll-view 实际高度随内容增长，滚动就失效了。
要既限制上限又保留滚动效果，可以写成 height: 100vh; max-height: 100vh;，或者保持 height: 100vh，再配合 min-height 控底线。

overflow实际上描述内容和滚动条的显示

line-height: 1 表示行高等于字体大小的 1 倍（即 100%），所以行框高度恰好包住文字本身，没有额外的上下空间。这比默认值（一般 1.2～1.5）更紧凑，常用来做视觉上“贴着内容”的标签或按钮；如果是多行文本，就会显得有点拥挤。

z-index 不会继承父级。只有在元素设了“定位”（position 不是 static）之后，没写 z-index 才会使用默认值 auto，它会跟父元素处在同一个层叠上下文里，既不是固定的 0，也不是继承父级的具体数值。当你在元素上显式写 z-index（比如 5 或 -1），它就会在所属层叠上下文中按数值大小排序；如果父元素本身创建了新的层叠上下文，那子元素的 z-index 只能在这个局部生效，无法跨上下文去压过外部元素。判断某个元素是否创建了独立的层叠上下文（stacking context），看它或它的祖先是否触发了“建立新层叠上下文”的条件。常见触发条件如下：
根元素（html 或小程序页面顶层）天然就是一个层叠上下文。
任何设置了定位（position: relative/absolute/fixed/sticky）并且 z-index 不是 auto 的元素。
opacity 小于 1。
transform 不是 none（例如 translate/scale/rotate）。
filter、backdrop-filter、perspective、clip-path、mask/mask-image、mix-blend-mode 等不为默认值。
isolation: isolate。
will-change 声明了上面这些属性（浏览器会提前创建上下文）。
某些特定的 CSS 属性值（如 contain、overscroll-behavior 等也可能触发）。
在 Flex/Grid 容器中，子元素如果 z-index 不是 auto 同样会单独形成层叠上下文。
判断方法：
浏览 CSS：检查元素及其祖先是否满足以上条件。
调试工具：浏览器 DevTools（Chrome、Edge 等）里选中元素，查看 Layout/Computed 面板，通常会显示它所属的 stacking context；或者在“层叠上下文”视图里直接看到哪些元素建立了新的上下文。
观察 z-index 行为：若子元素设置很大的 z-index 仍压不过兄弟节点，通常是因为它被限制在自己的层叠上下文里，这也是一个侧面判断。
掌握谁创建了层叠上下文，就能理解为什么某些元素“压不住”别人，也就能有针对性地调整（例如移动元素、拆掉多余的 transform、把 z-index 设置到正确的上下文里等）。


当前 .pageBackground 是 position: absolute，却缺少父层的参考坐标系（.page 没设 position: relative），并且其它模块也全写了 z-index: 2。这样既难以维护，又容易出现背景反而在上面、内容被遮挡的现象。  &::before {
    content: '';
    position: absolute;
    inset: 0;
    height: 50vh;
    background: linear-gradient(180deg, #E4C48D 0%, #fff 100%);
    z-index: 0;
  }更好


inset: 0; 是一个速写，相当于同时写 top: 0; right: 0; bottom: 0; left: 0;。常用在绝对定位或固定定位元素上，让它四个方向都贴紧父元素的边界。
z-index: 0; 明确把当前层叠上下文里的层级设为 0；如果不写（默认 auto），它会跟父节点处于同一层叠顺序，通常跟兄弟元素比大小时处在“默认层级”。当父元素或元素本身创建了新的层叠上下文时，显式写 0 可以保证它在这个上下文里正好处于最底层（但仍在上一个上下文的范围里），避免 auto 情况下因层级不确定导致遮挡问题。


是的。浏览器里文档的根元素（html）默认就是第一个层叠上下文；在小程序或 uni-app 的页面里，顶层的页面容器同样会作为根层叠上下文存在。也就是说，即使你没写 position、z-index，最外层节点依然天然充当“基准层级”，后续的层叠顺序都是在它这个上下文里再分层。根元素实际上没有一个具体的 “数值” z-index。它的 z-index 默认为 auto，但因为它是最外层的层叠上下文，对它本身来说并不存在跟其他兄弟元素比较层级的场景，所以你可以把它理解成“无需设置的基准层”。所有后续的 z-index 计算都是在它这个上下文里继续层叠的。层叠顺序并不一定需要具体的数值 z-index 才能决定。浏览器遵循一套固定的优先规则：
层叠上下文：页面顶层（根元素）默认就是第一个层叠上下文。每个层叠上下文内部会整体参与上一层的排序。
在同一个层叠上下文里，按以下顺序叠放（由底到顶）：
背景和边框；
z-index < 0 的定位元素；
普通块级/行内内容（包括 z-index: auto 或没有 position 的元素）；
z-index >= 0 的定位元素（数值越大越靠上，相同数值的按照 DOM 顺序后来的在上面）。
因为根元素本身没有兄弟元素，它所在的上下文就只有自己，所以不用实际比较数值。“没有 z-index 的普通文档流”遵循上面第三点的规则：同级元素之间按照 DOM 顺序依次渲染，后面的覆盖在前面的上面。当你引入 position + 非 auto 的 z-index 时，才会跳到最后一步，以数值和 DOM 顺序决定谁在上面。
换句话说，z-index 只是其中一个参与排序的维度；没有它时，浏览器仍然能根据默认规则（来源顺序、是否定位等）确定叠放关系
.section-title 仍然是默认的 position: static，这时写 z-index 会被当成 auto 忽略掉（除非它是 flex/grid 子项，或者本身通过其它属性先创建了层叠上下文）。pageBackground 是定位元素，z-index: 0 会把它放到一个独立层级；而 .section-title 还是普通文档流元素，所以层叠顺序依旧按默认规则走，自然没法“盖”在背景之上。


伪元素会被当成元素的“内部子节点”来看待：
::before 按顺序插在真实内容之前，相当于在元素打开标签后立刻放进一个子节点再渲染。
它默认的层叠顺序遵循普通文档流：先渲染 ::before，再渲染元素内容，最后是 ::after。如果没设置定位，渲染顺序就是 ::before → 内容 → ::after。
一旦给伪元素加了定位（如 position: absolute）并且配上 z-index，它就会在当前层叠上下文里按 z-index 的规则排序（同级别数值大的在上面，数值相同按先后顺序）。
所以你现在的 ::before 会被插在 .page 的内容之前，但它用了 position: absolute 而 .page 没有 position，它会相对最近的定位祖先（页面根节点）定位，看起来像覆盖在内容上。为了让内容在视觉上盖住背景，通常做法是：

text 组件是内联元素，line-height: 1 会把该行的行高压到等于字体大小，也就是整条基线的可用高度只有 32rpx。上下 padding 虽然仍在盒模型里，但内联盒的高度不会随之扩大，所以看上去“被吃掉”——背景色会紧贴文字，留不出额内距。要让上下留出空间，还是得让标签变成 inline-block / inline-flex 等能撑开的盒子，并放松 line-height，padding 才能真正发挥作用


box-shadow 的语法是 box-shadow: offset-x offset-y blur spread color inset;，每个参数含义如下：
offset-x：阴影在水平方向的偏移量，正值往右，负值往左；
offset-y：阴影在垂直方向的偏移量，正值往下，负值往上；
blur：模糊半径，越大越虚；为 0 时边缘锐利；
spread：扩散半径，正值让阴影向外扩张，负值向内收缩；
color：阴影颜色，默认取元素的 color（不指定时易出现看不见的情况）；
inset（可选关键字）：加上后阴影变为内阴影，从元素内部向里投射


scroll-view 写了 height: 100%，但它的父容器 .body 没有一个可用于百分比计算的“确定高度”——.body 只是 flex: 1，在 App/小程序端编译后常常算不到具体像素，于是 scroll-view 被判定为 0 高度，自然无法滚动。flex: 1 并不等同于有一个 “可供百分比继承” 的确定高度。它只是告诉父容器按剩余空间分配，真实像素是在布局过程中动态计算出来的；对 scroll-view 这种组件而言，它仍然看不到一个可用的父级高度去套 height: 100%，所以最终高度会退化成 0。你把子级改成 flex: 1（让父子一起参与 flex 布局）或直接给子级写固定/计算后的高度，才能让滚动区域真正得到尺寸。
注意：flex: 1 给 view 用是会生效的，但 scroll-view 本身在小程序/UniApp 里不把 flex 当高度；它仍然需要显式的尺寸才能滚动。
之前讨论的 communitySection 里，.body 虽然也是 flex: 1，但在 H5/小程序渲染时还要叠加额外的安全区、导航栏等计算；如果上层没有把整个链条的高度“锁死”，scroll-view 的百分比就会落空，表现就是不滚动。因此关键不是 flex1 本身没作用，而是要保证整条父子链上某一层提供了明确的大小。这个页面恰好满足，所以能滚动。即flex1的上层元素没有再嵌套flex1，只有一层 flex 时能滚，是因为 scroll-view 的父节点在这一层就已经拿到了具体高度；一旦嵌套两层 flex: 1，第二层（scroll-view 的直接父元素）虽然在语义上“占满剩余空间”，但它自己并没有一个可用于百分比继承的明确高度，导致内部的 height: 100% 失效，scroll-view 得不到尺寸，自然不能滚动。