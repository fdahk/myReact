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

### 组合选择器
- **后代选择器**: `A B` - A元素内的所有B元素
- **子选择器**: `A > B` - A元素的直接子元素B
- **相邻兄弟选择器**: `A + B` - A元素后紧邻的B元素
- **通用兄弟选择器**: `A ~ B` - A元素后的所有兄弟B元素

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
