# HTML 标签和属性完整参考

## 全局属性 (Global Attributes)
所有 HTML 元素都可以使用的属性：

### `accesskey` - 定义访问元素的快捷键
**概念解释**：为元素定义键盘快捷键，用户可以通过组合键快速访问该元素。
**使用场景**：提高网页可访问性，让用户能够快速导航到重要元素。
```html
<!-- Alt + S 快速聚焦到搜索框 -->
<input type="text" accesskey="s" placeholder="搜索内容">
<!-- Alt + H 快速跳转到首页链接 -->
<a href="/" accesskey="h">首页</a>
```

### `autocapitalize` - 控制文本输入的自动大写
**概念解释**：控制移动设备虚拟键盘的自动大写行为。
**取值说明**：
- `off/none`: 不自动大写
- `on/sentences`: 句首字母大写
- `words`: 每个单词首字母大写
- `characters`: 所有字母大写
```html
<!-- 姓名输入，每个单词首字母大写 -->
<input type="text" autocapitalize="words" placeholder="请输入姓名">
<!-- 邮箱输入，不自动大写 -->
<input type="email" autocapitalize="off" placeholder="请输入邮箱">
```

### `autofocus` - 页面加载时自动获得焦点
**概念解释**：页面加载完成后，自动将焦点设置到该元素上。
**注意事项**：一个页面只能有一个元素设置此属性。
```html
<!-- 搜索页面，自动聚焦搜索框 -->
<input type="search" autofocus placeholder="输入搜索关键词">
<!-- 登录页面，自动聚焦用户名输入框 -->
<input type="text" name="username" autofocus placeholder="用户名">
```

### `class` - 定义元素的类名
**概念解释**：为元素指定一个或多个CSS类名，用于样式设置和JavaScript操作。
**使用规则**：多个类名用空格分隔，类名区分大小写。
```html
<!-- 单个类名 -->
<div class="container">内容容器</div>
<!-- 多个类名 -->
<button class="btn btn-primary btn-large">主要按钮</button>
<!-- CSS样式 -->
<style>
.container { max-width: 1200px; margin: 0 auto; }
.btn { padding: 10px 20px; border: none; }
.btn-primary { background-color: #007bff; color: white; }
</style>
```

### `contenteditable` - 定义元素内容是否可编辑
**概念解释**：使普通HTML元素变成可编辑状态，类似于文本编辑器。
**取值说明**：`true`(可编辑)、`false`(不可编辑)、`inherit`(继承父元素)
```html
<!-- 可编辑的文本区域 -->
<div contenteditable="true" style="border: 1px solid #ccc; padding: 10px;">
  这段文字可以直接编辑，点击后即可修改内容。
</div>
<!-- 富文本编辑器基础结构 -->
<div contenteditable="true" style="min-height: 200px; border: 1px solid #ddd;">
  <h3>可编辑标题</h3>
  <p>可编辑段落内容...</p>
</div>
```

### `data-*` - 自定义数据属性
**概念解释**：在HTML元素上存储自定义数据，可通过JavaScript的dataset API访问。
**命名规则**：以`data-`开头，后跟自定义名称（小写，可用连字符）。
```html
<!-- 存储用户信息 -->
<div data-user-id="123" data-user-name="张三" data-user-role="admin">
  用户信息
</div>
<!-- 配置信息 -->
<button data-action="delete" data-confirm="确定要删除吗？">删除</button>

<script>
// JavaScript访问data属性
const userDiv = document.querySelector('[data-user-id]');
console.log(userDiv.dataset.userId);    // "123"
console.log(userDiv.dataset.userName);  // "张三"
console.log(userDiv.dataset.userRole);  // "admin"
</script>
```

### `dir` - 定义文本方向
**概念解释**：指定元素内文本的阅读方向，支持从左到右、从右到左等。
**取值说明**：`ltr`(从左到右)、`rtl`(从右到左)、`auto`(自动检测)
```html
<!-- 中文/英文文本（从左到右） -->
<p dir="ltr">这是从左到右的文本 This is left-to-right text</p>
<!-- 阿拉伯文/希伯来文（从右到左） -->
<p dir="rtl">هذا نص من اليمين إلى اليسار</p>
<!-- 自动检测方向 -->
<p dir="auto">Auto direction: مرحبا Hello</p>
```

### `draggable` - 定义元素是否可拖拽
**概念解释**：控制元素是否可以被拖拽，实现拖放功能的基础。
**取值说明**：`true`(可拖拽)、`false`(不可拖拽)、`auto`(默认行为)
```html
<!-- 可拖拽的图片 -->
<img src="image.jpg" draggable="true" alt="可拖拽图片">
<!-- 可拖拽的文本块 -->
<div draggable="true" style="width: 100px; height: 100px; background: lightblue;">
  拖拽我
</div>
<!-- 拖放区域 -->
<div id="dropzone" style="width: 200px; height: 200px; border: 2px dashed #ccc;">
  拖放区域
</div>

<script>
// 拖拽事件处理
document.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);
});
</script>
```

### `hidden` - 隐藏元素
**概念解释**：完全隐藏元素，相当于CSS的`display: none`。
**使用场景**：动态显示/隐藏内容，条件渲染等。
```html
<!-- 默认隐藏的元素 -->
<div hidden>这个内容默认是隐藏的</div>
<!-- 可切换显示的内容 -->
<button onclick="toggleContent()">切换显示</button>
<div id="content" hidden>
  <h3>隐藏的内容</h3>
  <p>点击按钮可以显示/隐藏这部分内容</p>
</div>

<script>
function toggleContent() {
  const content = document.getElementById('content');
  content.hidden = !content.hidden;
}
</script>
```

### `id` - 定义元素的唯一标识符
**概念解释**：为元素指定唯一的标识符，在整个文档中必须唯一。
**使用场景**：CSS选择器、JavaScript操作、锚点链接、表单关联等。
```html
<!-- 页面导航锚点 -->
<nav>
  <a href="#section1">第一节</a>
  <a href="#section2">第二节</a>
</nav>

<section id="section1">
  <h2>第一节标题</h2>
  <p>第一节内容...</p>
</section>

<section id="section2">
  <h2>第二节标题</h2>
  <p>第二节内容...</p>
</section>

<!-- 表单关联 -->
<label for="username">用户名:</label>
<input type="text" id="username" name="username">

<!-- CSS和JavaScript使用 -->
<style>
#header { background-color: #f0f0f0; }
</style>
<script>
document.getElementById('username').focus();
</script>
```

### `lang` - 定义元素的语言
**概念解释**：指定元素内容的自然语言，有助于搜索引擎理解和屏幕阅读器正确发音。
**格式说明**：使用ISO 639语言代码，可包含国家/地区代码。
```html
<!-- 中文内容 -->
<p lang="zh-CN">这是中文内容</p>
<!-- 英文内容 -->
<p lang="en-US">This is English content</p>
<!-- 混合语言文档 -->
<article lang="zh-CN">
  <h1>文章标题</h1>
  <p>这是中文段落。</p>
  <blockquote lang="en">
    "This is an English quote in Chinese article."
  </blockquote>
</article>
```

### `style` - 定义内联样式
**概念解释**：直接在HTML元素上定义CSS样式，优先级高于外部样式表。
**注意事项**：不推荐大量使用，应优先使用外部CSS文件。
```html
<!-- 基本内联样式 -->
<p style="color: red; font-size: 18px;">红色大字体文本</p>
<!-- 复杂样式 -->
<div style="
  width: 300px; 
  height: 200px; 
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
">
  渐变背景盒子
</div>
```

### `tabindex` - 定义Tab键顺序
**概念解释**：控制元素在Tab键导航中的顺序和是否可聚焦。
**取值说明**：
- 正数：Tab导航顺序（数值越小越先访问）
- `0`：正常Tab顺序，可聚焦
- `-1`：不参与Tab导航，但可通过脚本聚焦
```html
<!-- 自定义Tab顺序 -->
<input type="text" tabindex="2" placeholder="第二个">
<input type="text" tabindex="1" placeholder="第一个">
<input type="text" tabindex="3" placeholder="第三个">

<!-- 可通过脚本聚焦但不在Tab序列中 -->
<div tabindex="-1" id="notification" style="background: #ffffcc; padding: 10px;">
  通知消息（可通过脚本聚焦）
</div>
<button onclick="document.getElementById('notification').focus()">
  聚焦通知
</button>
```

### `title` - 定义元素的提示信息
**概念解释**：鼠标悬停时显示的工具提示文本，提供额外的说明信息。
**使用场景**：按钮说明、图标解释、链接描述等。
```html
<!-- 按钮提示 -->
<button title="点击保存当前文档">💾</button>
<!-- 链接说明 -->
<a href="https://example.com" title="访问示例网站">示例链接</a>
<!-- 图片说明 -->
<img src="chart.png" alt="销售图表" title="2023年第三季度销售数据图表">
<!-- 缩写解释 -->
<abbr title="HyperText Markup Language">HTML</abbr>
```

### 其他重要全局属性

#### `enterkeyhint` - 虚拟键盘回车键的提示
**概念解释**：为移动设备虚拟键盘的回车键提供行为提示，改善用户体验。
**取值说明**：`enter`(换行)、`done`(完成)、`go`(前往)、`next`(下一项)、`previous`(上一项)、`search`(搜索)、`send`(发送)
```html
<!-- 搜索框，回车键显示"搜索" -->
<input type="search" enterkeyhint="search" placeholder="搜索内容">
<!-- 表单中的下一步 -->
<input type="text" enterkeyhint="next" placeholder="姓名">
<!-- 发送消息 -->
<textarea enterkeyhint="send" placeholder="输入消息"></textarea>
```

#### `inert` - 使元素及其子元素变为惰性
**概念解释**：使元素及其所有子元素变为"惰性"，无法接收焦点、点击等交互。
**使用场景**：模态框背景、禁用的内容区域等。
```html
<!-- 模态框示例 -->
<div id="main-content" inert>
  <!-- 当模态框打开时，主内容变为惰性 -->
  <h1>页面标题</h1>
  <button>这个按钮无法点击</button>
  <input type="text" placeholder="这个输入框无法聚焦">
</div>

<div id="modal">
  <h2>模态框</h2>
  <button onclick="closeModal()">关闭</button>
</div>

<script>
function openModal() {
  document.getElementById('main-content').inert = true;
}
function closeModal() {
  document.getElementById('main-content').inert = false;
}
</script>
```

#### `inputmode` - 输入模式提示
**概念解释**：为移动设备提供虚拟键盘类型提示，优化输入体验。
**取值说明**：`none`(无键盘)、`text`(文本)、`decimal`(小数)、`numeric`(数字)、`tel`(电话)、`search`(搜索)、`email`(邮箱)、`url`(网址)
```html
<!-- 数字输入，显示数字键盘 -->
<input type="text" inputmode="numeric" placeholder="请输入数字">
<!-- 邮箱输入，显示邮箱键盘（包含@符号） -->
<input type="text" inputmode="email" placeholder="请输入邮箱">
<!-- 电话输入，显示电话键盘 -->
<input type="text" inputmode="tel" placeholder="请输入电话号码">
<!-- 小数输入，显示带小数点的数字键盘 -->
<input type="text" inputmode="decimal" placeholder="请输入价格">
```

#### `popover` - 弹出框行为
**概念解释**：HTML原生弹出框API，无需JavaScript即可创建弹出层。
**取值说明**：`auto`(自动管理)、`manual`(手动管理)
```html
<!-- 自动弹出框 -->
<button popovertarget="my-popover">显示弹出框</button>
<div id="my-popover" popover="auto">
  <h3>弹出框标题</h3>
  <p>这是弹出框内容</p>
  <button popovertarget="my-popover" popovertargetaction="hide">关闭</button>
</div>

<!-- 手动弹出框 -->
<button onclick="showManualPopover()">手动弹出框</button>
<div id="manual-popover" popover="manual">
  <p>需要JavaScript手动控制的弹出框</p>
  <button onclick="hideManualPopover()">关闭</button>
</div>

<script>
function showManualPopover() {
  document.getElementById('manual-popover').showPopover();
}
function hideManualPopover() {
  document.getElementById('manual-popover').hidePopover();
}
</script>
```

#### `role` - ARIA角色属性
**概念解释**：为元素定义无障碍访问角色，帮助屏幕阅读器理解元素的用途。
**使用场景**：提高网页可访问性，让残障用户更好地使用网页。
```html
<!-- 导航角色 -->
<div role="navigation">
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</div>

<!-- 按钮角色（用于非button元素） -->
<div role="button" tabindex="0" onclick="handleClick()">
  自定义按钮
</div>

<!-- 警告角色 -->
<div role="alert">
  错误：请填写必填字段
</div>

<!-- 选项卡面板 -->
<div role="tabpanel" id="panel1">
  <h3>选项卡1内容</h3>
</div>
```

#### `spellcheck` - 定义是否检查拼写
**概念解释**：控制浏览器是否对元素内容进行拼写检查。
**取值说明**：`true`(检查拼写)、`false`(不检查拼写)
```html
<!-- 需要拼写检查的文本区域 -->
<textarea spellcheck="true" placeholder="请输入文章内容（会检查拼写）"></textarea>
<!-- 不需要拼写检查（如代码、用户名等） -->
<input type="text" spellcheck="false" placeholder="用户名（不检查拼写）">
<!-- 代码编辑器 -->
<div contenteditable="true" spellcheck="false" style="font-family: monospace;">
function helloWorld() {
  console.log("Hello, World!");
}
</div>
```

#### `translate` - 定义是否翻译元素内容
**概念解释**：指示翻译工具是否应该翻译该元素的内容。
**取值说明**：`yes`(可翻译)、`no`(不翻译)
```html
<!-- 可翻译的内容 -->
<p translate="yes">这段文字可以被翻译工具翻译。</p>
<!-- 不应翻译的内容（如品牌名、代码等） -->
<p>我们的产品叫做 <span translate="no">TechCorp Pro</span>，欢迎使用。</p>
<!-- 代码块不翻译 -->
<pre translate="no">
const message = "Hello, World!";
console.log(message);
</pre>
<!-- 公司名称不翻译 -->
<footer>
  <p>&copy; 2023 <span translate="no">Microsoft Corporation</span>. All rights reserved.</p>
</footer>
```

#### 微数据属性 (Microdata)
**概念解释**：用于在HTML中嵌入结构化数据，帮助搜索引擎理解内容。
**相关属性**：`itemscope`, `itemtype`, `itemprop`, `itemid`, `itemref`
```html
<!-- 人员信息微数据 -->
<div itemscope itemtype="https://schema.org/Person">
  <h1 itemprop="name">张三</h1>
  <p>职位: <span itemprop="jobTitle">软件工程师</span></p>
  <p>公司: <span itemprop="worksFor">科技公司</span></p>
  <p>邮箱: <a href="mailto:zhang@example.com" itemprop="email">zhang@example.com</a></p>
</div>

<!-- 产品信息微数据 -->
<div itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">智能手机</h2>
  <p itemprop="description">最新款智能手机，性能卓越。</p>
  <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <span itemprop="price">¥3999</span>
    <span itemprop="priceCurrency">CNY</span>
  </div>
</div>
```

#### Web组件相关属性
**概念解释**：用于自定义元素和Shadow DOM的属性。
**相关属性**：`is`, `slot`, `part`, `exportparts`
```html
<!-- 自定义元素 -->
<script>
class MyButton extends HTMLButtonElement {
  connectedCallback() {
    this.textContent = '自定义按钮';
  }
}
customElements.define('my-button', MyButton, { extends: 'button' });
</script>
<button is="my-button"></button>

<!-- Shadow DOM插槽 -->
<template id="my-template">
  <style>
    .container { padding: 20px; border: 1px solid #ccc; }
  </style>
  <div class="container">
    <h2>组件标题</h2>
    <slot name="content">默认内容</slot>
  </div>
</template>

<my-component>
  <p slot="content">这是插槽内容</p>
</my-component>
```

## 文档结构标签

### `<!DOCTYPE html>`
**概念解释**：文档类型声明，告诉浏览器这是HTML5文档。
**使用规则**：必须放在HTML文档的第一行，大小写不敏感。
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>文档标题</title>
</head>
<body>
  <h1>页面内容</h1>
</body>
</html>
```

### `<html>`
**概念解释**：HTML文档的根元素，包含整个页面的所有内容。
**重要属性**：
- `lang` - 指定文档主要语言，有助于搜索引擎和屏幕阅读器
- `dir` - 文本方向（ltr从左到右，rtl从右到左）
```html
<!-- 中文网站 -->
<html lang="zh-CN">
  <!-- 页面内容 -->
</html>

<!-- 阿拉伯文网站 -->
<html lang="ar" dir="rtl">
  <!-- 从右到左的页面内容 -->
</html>

<!-- 多语言支持 -->
<html lang="zh-CN" prefix="og: http://ogp.me/ns#">
  <!-- 支持Open Graph的页面 -->
</html>
```

### `<head>`
**概念解释**：文档头部，包含页面元数据，不会在页面中显示。
**包含内容**：标题、样式表、脚本、元数据等。
```html
<head>
  <!-- 字符编码，必须在前1024个字节内 -->
  <meta charset="UTF-8">
  
  <!-- 页面标题，显示在浏览器标签页 -->
  <title>我的网站</title>
  
  <!-- 视口设置，响应式设计必需 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO元数据 -->
  <meta name="description" content="网站描述">
  <meta name="keywords" content="关键词1,关键词2">
  
  <!-- 外部样式表 -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- 网站图标 -->
  <link rel="icon" href="favicon.ico">
</head>
```

### `<title>`
**概念解释**：定义文档标题，显示在浏览器标签页和搜索结果中。
**SEO重要性**：是搜索引擎优化的重要因素，建议50-60个字符。
```html
<!-- 基本标题 -->
<title>首页 - 我的网站</title>

<!-- 电商产品页面 -->
<title>iPhone 15 Pro - 智能手机 - 苹果官网</title>

<!-- 博客文章 -->
<title>如何学习HTML - 前端开发博客</title>

<!-- 动态标题（通过JavaScript更新） -->
<title id="page-title">加载中...</title>
<script>
document.getElementById('page-title').textContent = '动态标题 - 我的网站';
</script>
```

### `<meta>`
**概念解释**：提供关于HTML文档的元数据信息。
**常用类型**：字符编码、视口、SEO信息、社交媒体等。
```html
<!-- 基础元数据 -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="这是一个关于HTML学习的网站">
<meta name="keywords" content="HTML,CSS,JavaScript,前端开发">
<meta name="author" content="张三">

<!-- HTTP等效头部 -->
<meta http-equiv="refresh" content="30">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- Open Graph社交媒体 -->
<meta property="og:title" content="文章标题">
<meta property="og:description" content="文章描述">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="文章标题">
<meta name="twitter:description" content="文章描述">

<!-- 移动端设置 -->
<meta name="theme-color" content="#007bff">
<meta name="apple-mobile-web-app-capable" content="yes">
```

### `<base>`
**概念解释**：为页面中所有相对URL设置基础URL。
**注意事项**：一个文档只能有一个base元素，且必须在head中。
```html
<head>
  <base href="https://example.com/docs/">
  <base target="_blank">
</head>
<body>
  <!-- 相对链接会基于base href解析 -->
  <a href="page1.html">页面1</a> <!-- 实际指向 https://example.com/docs/page1.html -->
  <img src="images/logo.png" alt="Logo"> <!-- 实际指向 https://example.com/docs/images/logo.png -->
  
  <!-- 绝对链接不受影响 -->
  <a href="https://other.com/page">其他网站</a>
</body>
```

### `<link>`
**概念解释**：定义文档与外部资源的关系，最常用于链接样式表。
**重要属性**：`rel`(关系)、`href`(地址)、`type`(类型)等。
```html
<!-- 样式表 -->
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="print.css" media="print">

<!-- 网站图标 -->
<link rel="icon" href="favicon.ico">
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<!-- 预加载资源 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="prefetch" href="next-page.html">
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- DNS预解析 -->
<link rel="dns-prefetch" href="https://example.com">

<!-- 规范URL（SEO） -->
<link rel="canonical" href="https://example.com/page">

<!-- RSS订阅 -->
<link rel="alternate" type="application/rss+xml" href="feed.xml" title="RSS订阅">

<!-- 多语言版本 -->
<link rel="alternate" hreflang="en" href="https://example.com/en/page">
<link rel="alternate" hreflang="zh" href="https://example.com/zh/page">
```

### `<style>`
**概念解释**：在HTML文档中嵌入CSS样式。
**使用场景**：小量样式、关键CSS内联、组件样式等。
```html
<!-- 基本样式 -->
<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
.highlight {
  background-color: yellow;
  font-weight: bold;
}
</style>

<!-- 媒体查询 -->
<style media="screen and (max-width: 768px)">
.mobile-only {
  display: block;
}
.desktop-only {
  display: none;
}
</style>

<!-- 关键CSS内联（提升性能） -->
<style>
/* 首屏关键样式 */
.header { background: #333; color: white; padding: 1rem; }
.main { max-width: 1200px; margin: 0 auto; }
</style>

<!-- 组件样式（配合JavaScript） -->
<style id="theme-styles">
:root {
  --primary-color: #007bff;
  --text-color: #333;
}
</style>
```

### `<script>`
**概念解释**：在HTML中嵌入或引用JavaScript代码。
**加载方式**：同步、异步(async)、延迟(defer)等。
```html
<!-- 外部脚本 -->
<script src="script.js"></script>

<!-- 异步加载（不阻塞页面解析） -->
<script src="analytics.js" async></script>

<!-- 延迟执行（页面解析完成后执行） -->
<script src="main.js" defer></script>

<!-- ES6模块 -->
<script type="module" src="app.js"></script>

<!-- 内联脚本 -->
<script>
console.log('页面加载完成');
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM构建完成');
});
</script>

<!-- 条件加载 -->
<script nomodule src="legacy.js"></script>

<!-- 导入映射（Import Maps） -->
<script type="importmap">
{
  "imports": {
    "lodash": "https://cdn.skypack.dev/lodash",
    "react": "https://cdn.skypack.dev/react"
  }
}
</script>

<!-- 完整性验证 -->
<script 
  src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous">
</script>
```

### `<noscript>`
**概念解释**：当浏览器不支持JavaScript或JavaScript被禁用时显示的内容。
**使用场景**：优雅降级、重要信息提示等。
```html
<script>
// JavaScript代码
document.getElementById('dynamic-content').innerHTML = '动态内容';
</script>

<noscript>
  <div style="background: #fff3cd; padding: 10px; border: 1px solid #ffeaa7;">
    <strong>注意：</strong>此网站需要JavaScript才能正常工作。
    请启用JavaScript或使用支持JavaScript的浏览器。
  </div>
  
  <!-- 静态版本的内容 -->
  <div>
    <h2>静态内容</h2>
    <p>这是JavaScript禁用时显示的静态内容。</p>
  </div>
</noscript>

<!-- 样式表备用方案 -->
<link rel="stylesheet" href="styles.css">
<noscript>
  <link rel="stylesheet" href="no-js.css">
</noscript>
```

### `<body>`
**概念解释**：HTML文档的主体部分，包含所有可见内容。
**事件属性**：支持多种页面级事件处理。
```html
<body onload="pageLoaded()" onunload="pageUnloaded()">
  <!-- 页面内容 -->
  <header>
    <h1>网站标题</h1>
  </header>
  
  <main>
    <article>
      <h2>文章标题</h2>
      <p>文章内容...</p>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2023 我的网站</p>
  </footer>
</body>

<!-- 现代JavaScript事件处理方式 -->
<body>
  <!-- 内容 -->
  
  <script>
  // 推荐使用addEventListener而不是内联事件
  window.addEventListener('load', function() {
    console.log('页面加载完成');
  });
  
  window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    e.returnValue = '确定要离开此页面吗？';
  });
  
  // 离线/在线状态检测
  window.addEventListener('online', function() {
    console.log('网络连接恢复');
  });
  
  window.addEventListener('offline', function() {
    console.log('网络连接断开');
  });
  </script>
</body>
```

## 区块内容标签

### `<address>`
**概念解释**：表示联系信息，通常包含文档或文章作者的联系方式。
**语义含义**：不应用于任意地址，仅用于联系信息。
```html
<!-- 文章作者联系信息 -->
<article>
  <h1>如何学习HTML</h1>
  <p>这是一篇关于HTML学习的文章...</p>
  
  <address>
    <p>作者: <a href="mailto:author@example.com">张三</a></p>
    <p>网站: <a href="https://example.com">个人博客</a></p>
    <p>发布时间: 2023年12月1日</p>
  </address>
</article>

<!-- 公司联系信息 -->
<footer>
  <address>
    <h3>联系我们</h3>
    <p><strong>ABC科技有限公司</strong></p>
    <p>地址: 北京市朝阳区xxx路123号</p>
    <p>电话: <a href="tel:+8610-12345678">010-12345678</a></p>
    <p>邮箱: <a href="mailto:info@abc.com">info@abc.com</a></p>
  </address>
</footer>
```

### `<article>`
**概念解释**：表示独立的、完整的内容单元，可以独立分发或重用。
**使用场景**：博客文章、新闻报道、论坛帖子、产品评论等。
```html
<!-- 博客文章 -->
<article>
  <header>
    <h1>深入理解CSS Grid布局</h1>
    <p>发布于 <time datetime="2023-12-01">2023年12月1日</time></p>
    <p>作者: 李四</p>
  </header>
  
  <p>CSS Grid是一个强大的二维布局系统...</p>
  
  <section>
    <h2>基本概念</h2>
    <p>Grid容器和Grid项目的关系...</p>
  </section>
  
  <footer>
    <p>标签: <a href="#css">CSS</a>, <a href="#layout">布局</a></p>
  </footer>
</article>

<!-- 产品卡片 -->
<article class="product-card">
  <img src="phone.jpg" alt="智能手机">
  <h2>智能手机X1</h2>
  <p>最新款智能手机，配备强大处理器...</p>
  <p class="price">¥2999</p>
  <button>立即购买</button>
</article>

<!-- 嵌套文章（评论） -->
<article>
  <h1>主文章标题</h1>
  <p>主文章内容...</p>
  
  <section>
    <h2>评论</h2>
    <article>
      <h3>用户A的评论</h3>
      <p>很好的文章，学到了很多！</p>
      <time datetime="2023-12-02">2天前</time>
    </article>
  </section>
</article>
```

### `<aside>`
**概念解释**：表示与主内容相关但可以独立存在的辅助内容。
**使用场景**：侧边栏、广告、相关链接、作者简介等。
```html
<!-- 页面侧边栏 -->
<main>
  <article>
    <h1>主要文章内容</h1>
    <p>文章正文...</p>
  </article>
</main>

<aside>
  <section>
    <h2>相关文章</h2>
    <ul>
      <li><a href="article1.html">HTML基础教程</a></li>
      <li><a href="article2.html">CSS入门指南</a></li>
    </ul>
  </section>
  
  <section>
    <h2>广告</h2>
    <div class="ad-banner">
      <!-- 广告内容 -->
    </div>
  </section>
</aside>

<!-- 文章内的侧边注释 -->
<article>
  <h1>JavaScript闭包详解</h1>
  <p>闭包是JavaScript中的重要概念...</p>
  
  <aside>
    <h3>💡 提示</h3>
    <p>理解闭包需要先掌握作用域和变量提升的概念。</p>
  </aside>
  
  <p>继续文章内容...</p>
</article>
```

### `<blockquote>`
**概念解释**：表示从其他来源引用的块级内容。
**重要属性**：`cite`属性指定引用来源的URL。
```html
<!-- 基本引用 -->
<blockquote>
  <p>生活就像一盒巧克力，你永远不知道下一颗是什么味道。</p>
</blockquote>

<!-- 带来源的引用 -->
<blockquote cite="https://example.com/book">
  <p>在编程中，简洁性是复杂性的最终形式。</p>
  <footer>
    —— <cite>《代码整洁之道》</cite>，Robert C. Martin
  </footer>
</blockquote>

<!-- 多段落引用 -->
<blockquote>
  <p>第一段引用内容...</p>
  <p>第二段引用内容...</p>
  <footer>
    <cite><a href="https://example.com">引用来源</a></cite>
  </footer>
</blockquote>

<!-- 带样式的引用 -->
<blockquote style="border-left: 4px solid #ccc; padding-left: 20px; margin: 20px 0;">
  <p style="font-style: italic; color: #666;">
    "代码是写给人看的，只是顺便能在机器上运行。"
  </p>
  <footer style="margin-top: 10px; font-size: 0.9em;">
    —— Harold Abelson
  </footer>
</blockquote>
```

### `<details>`
**概念解释**：创建可展开/收起的详情内容，提供交互式的信息披露。
**重要属性**：`open`(是否展开)、`name`(分组名称，同名组只能展开一个)
```html
<!-- 基本展开详情 -->
<details>
  <summary>点击查看详情</summary>
  <p>这里是隐藏的详细内容，只有点击摘要后才会显示。</p>
</details>

<!-- 默认展开 -->
<details open>
  <summary>默认展开的内容</summary>
  <p>这个详情默认是展开状态的。</p>
</details>

<!-- FAQ常见问题 -->
<section>
  <h2>常见问题</h2>
  
  <details name="faq">
    <summary>如何重置密码？</summary>
    <p>1. 点击登录页面的"忘记密码"链接</p>
    <p>2. 输入您的邮箱地址</p>
    <p>3. 检查邮箱中的重置链接</p>
  </details>
  
  <details name="faq">
    <summary>如何更改个人信息？</summary>
    <p>登录后进入个人中心，点击"编辑资料"按钮即可修改。</p>
  </details>
</section>

<!-- 复杂内容的详情 -->
<details>
  <summary>JavaScript代码示例</summary>
  <pre><code>
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
  </code></pre>
</details>
```

### `<dialog>`
**概念解释**：HTML原生对话框/模态框元素，提供弹出式交互界面。
**重要属性**：`open`(显示状态)
```html
<!-- 基本对话框 -->
<dialog id="my-dialog">
  <form method="dialog">
    <h2>确认操作</h2>
    <p>您确定要删除这个项目吗？</p>
    <div>
      <button value="cancel">取消</button>
      <button value="confirm">确认</button>
    </div>
  </form>
</dialog>

<button onclick="document.getElementById('my-dialog').showModal()">
  打开对话框
</button>

<!-- 复杂对话框 -->
<dialog id="user-form" style="padding: 20px; border: none; border-radius: 8px;">
  <form method="dialog">
    <h2>用户信息</h2>
    <div>
      <label for="name">姓名:</label>
      <input type="text" id="name" required>
    </div>
    <div>
      <label for="email">邮箱:</label>
      <input type="email" id="email" required>
    </div>
    <div style="margin-top: 20px;">
      <button type="button" onclick="this.closest('dialog').close()">取消</button>
      <button type="submit">保存</button>
    </div>
  </form>
</dialog>

<script>
// JavaScript控制对话框
const dialog = document.getElementById('user-form');
const openBtn = document.getElementById('open-dialog');

openBtn?.addEventListener('click', () => {
  dialog.showModal();
});

dialog.addEventListener('close', () => {
  console.log('对话框已关闭，返回值:', dialog.returnValue);
});
</script>
```

### `<div>`
**概念解释**：通用的块级容器元素，没有特定的语义含义。
**使用原则**：当没有更合适的语义化元素时才使用div。
```html
<!-- 布局容器 -->
<div class="container">
  <div class="header">
    <h1>网站标题</h1>
  </div>
  <div class="content">
    <div class="sidebar">侧边栏</div>
    <div class="main">主内容</div>
  </div>
</div>

<!-- 样式包装器 -->
<div class="card">
  <div class="card-header">
    <h3>卡片标题</h3>
  </div>
  <div class="card-body">
    <p>卡片内容...</p>
  </div>
  <div class="card-footer">
    <button>操作按钮</button>
  </div>
</div>

<!-- 功能性分组 -->
<div class="form-group">
  <label for="username">用户名</label>
  <input type="text" id="username">
  <div class="error-message" style="color: red; display: none;">
    用户名不能为空
  </div>
</div>

<!-- CSS Grid/Flexbox布局 -->
<div class="grid-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
  <div class="grid-item">项目1</div>
  <div class="grid-item">项目2</div>
  <div class="grid-item">项目3</div>
</div>
```

### `<dl>`, `<dt>`, `<dd>` - 定义列表
**概念解释**：定义列表用于显示术语及其描述的键值对结构。
**元素关系**：`<dl>`(定义列表) > `<dt>`(术语) + `<dd>`(描述)
```html
<!-- 基本定义列表 -->
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，用于创建网页结构</dd>
  
  <dt>CSS</dt>
  <dd>层叠样式表，用于控制网页的外观和布局</dd>
  
  <dt>JavaScript</dt>
  <dd>编程语言，为网页添加交互功能</dd>
</dl>

<!-- 多个描述对应一个术语 -->
<dl>
  <dt>HTTP状态码</dt>
  <dd>200 - 请求成功</dd>
  <dd>404 - 页面未找到</dd>
  <dd>500 - 服务器内部错误</dd>
</dl>

<!-- 多个术语对应一个描述 -->
<dl>
  <dt>前端</dt>
  <dt>客户端</dt>
  <dd>用户直接接触的网站界面部分</dd>
</dl>

<!-- 复杂的定义列表 -->
<dl>
  <dt>响应式设计</dt>
  <dd>
    <p>一种网页设计方法，使网站能够在不同设备上提供最佳浏览体验。</p>
    <p>主要技术包括：</p>
    <ul>
      <li>弹性网格布局</li>
      <li>媒体查询</li>
      <li>可缩放图像</li>
    </ul>
  </dd>
</dl>
```

### `<figure>` 和 `<figcaption>`
**概念解释**：figure用于包装独立的内容单元（如图片、代码、表格），figcaption提供标题。
**语义关系**：内容与标题形成一个完整的单元，可以整体移动而不影响文档流。
```html
<!-- 图片与标题 -->
<figure>
  <img src="chart.png" alt="销售数据图表">
  <figcaption>图1: 2023年第三季度销售数据统计</figcaption>
</figure>

<!-- 代码块与标题 -->
<figure>
  <pre><code>
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
  </code></pre>
  <figcaption>代码1: 快速排序算法的JavaScript实现</figcaption>
</figure>

<!-- 表格与标题 -->
<figure>
  <table>
    <thead>
      <tr><th>产品</th><th>销量</th><th>收入</th></tr>
    </thead>
    <tbody>
      <tr><td>产品A</td><td>1000</td><td>¥50,000</td></tr>
      <tr><td>产品B</td><td>800</td><td>¥40,000</td></tr>
    </tbody>
  </table>
  <figcaption>表1: 产品销售数据汇总</figcaption>
</figure>

<!-- 引用与标题 -->
<figure>
  <blockquote>
    <p>简洁是复杂的最终形式。</p>
  </blockquote>
  <figcaption>—— 达芬奇</figcaption>
</figure>
```

### `<header>`, `<main>`, `<footer>`
**概念解释**：语义化的页面结构元素，用于组织页面的主要区域。
**语义含义**：header(头部)、main(主要内容)、footer(底部)
```html
<!-- 页面级结构 -->
<!DOCTYPE html>
<html>
<head>
  <title>我的网站</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/about">关于</a></li>
        <li><a href="/contact">联系</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <header>
        <h1>文章标题</h1>
        <p>发布时间: 2023年12月1日</p>
      </header>
      
      <p>文章内容...</p>
      
      <footer>
        <p>作者: 张三</p>
        <p>标签: HTML, 教程</p>
      </footer>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2023 我的网站. 保留所有权利.</p>
    <address>
      <p>邮箱: <a href="mailto:info@example.com">info@example.com</a></p>
    </address>
  </footer>
</body>
</html>

<!-- 文章内的header和footer -->
<article>
  <header>
    <h2>技术博客文章</h2>
    <p>作者: <a href="/author/zhangsan">张三</a></p>
    <time datetime="2023-12-01">2023年12月1日</time>
  </header>
  
  <p>文章正文内容...</p>
  
  <footer>
    <p>分类: <a href="/category/tech">技术</a></p>
    <p>标签: 
      <a href="/tag/html">HTML</a>, 
      <a href="/tag/css">CSS</a>
    </p>
  </footer>
</article>
```

### `<h1>` - `<h6>` 标题标签
**概念解释**：六级标题层次结构，h1最重要，h6最不重要。
**SEO重要性**：搜索引擎使用标题理解页面结构和内容层次。
```html
<!-- 正确的标题层次结构 -->
<h1>网站主标题</h1>
  <h2>章节标题</h2>
    <h3>小节标题</h3>
      <h4>子小节标题</h4>
        <h5>段落标题</h5>
          <h6>最小标题</h6>

<!-- 文档大纲示例 -->
<article>
  <h1>前端开发完整指南</h1>
  
  <h2>HTML基础</h2>
    <h3>语义化标签</h3>
    <h3>表单元素</h3>
      <h4>输入控件</h4>
      <h4>验证属性</h4>
  
  <h2>CSS样式</h2>
    <h3>选择器</h3>
    <h3>布局系统</h3>
      <h4>Flexbox</h4>
      <h4>Grid</h4>
  
  <h2>JavaScript交互</h2>
    <h3>DOM操作</h3>
    <h3>事件处理</h3>
</article>

<!-- 样式化标题 -->
<style>
h1 { font-size: 2.5em; color: #333; border-bottom: 2px solid #007bff; }
h2 { font-size: 2em; color: #555; }
h3 { font-size: 1.5em; color: #666; }
h4 { font-size: 1.25em; color: #777; }
h5 { font-size: 1.1em; color: #888; }
h6 { font-size: 1em; color: #999; font-weight: normal; }
</style>
```

### `<nav>`
**概念解释**：表示导航链接的集合，帮助用户在网站中导航。
**使用场景**：主导航、面包屑、分页、目录等。
```html
<!-- 主导航 -->
<nav>
  <ul>
    <li><a href="/" aria-current="page">首页</a></li>
    <li><a href="/products">产品</a></li>
    <li><a href="/services">服务</a></li>
    <li><a href="/about">关于我们</a></li>
    <li><a href="/contact">联系我们</a></li>
  </ul>
</nav>

<!-- 面包屑导航 -->
<nav aria-label="面包屑">
  <ol>
    <li><a href="/">首页</a></li>
    <li><a href="/products">产品</a></li>
    <li><a href="/products/phones">手机</a></li>
    <li aria-current="page">iPhone 15</li>
  </ol>
</nav>

<!-- 文章内目录 -->
<nav class="table-of-contents">
  <h2>目录</h2>
  <ul>
    <li><a href="#introduction">介绍</a></li>
    <li><a href="#getting-started">开始使用</a>
      <ul>
        <li><a href="#installation">安装</a></li>
        <li><a href="#configuration">配置</a></li>
      </ul>
    </li>
    <li><a href="#advanced">高级用法</a></li>
  </ul>
</nav>

<!-- 分页导航 -->
<nav aria-label="页面导航">
  <ul class="pagination">
    <li><a href="?page=1" aria-label="上一页">&laquo;</a></li>
    <li><a href="?page=1">1</a></li>
    <li><a href="?page=2" aria-current="page">2</a></li>
    <li><a href="?page=3">3</a></li>
    <li><a href="?page=3" aria-label="下一页">&raquo;</a></li>
  </ul>
</nav>
```

### `<ol>`, `<ul>`, `<li>` - 列表元素
**概念解释**：有序列表(ol)、无序列表(ul)和列表项(li)。
**属性详解**：ol支持start、type、reversed等属性。
```html
<!-- 基本有序列表 -->
<ol>
  <li>第一步：准备材料</li>
  <li>第二步：开始制作</li>
  <li>第三步：完成作品</li>
</ol>

<!-- 自定义起始数字和类型 -->
<ol start="5" type="A">
  <li>项目E</li>
  <li>项目F</li>
  <li>项目G</li>
</ol>

<!-- 反向排序 -->
<ol reversed>
  <li>最后一项</li>
  <li>倒数第二项</li>
  <li>第一项</li>
</ol>

<!-- 无序列表 -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>

<!-- 嵌套列表 -->
<ul>
  <li>前端技术
    <ul>
      <li>HTML</li>
      <li>CSS
        <ul>
          <li>Flexbox</li>
          <li>Grid</li>
          <li>动画</li>
        </ul>
      </li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>后端技术
    <ul>
      <li>Node.js</li>
      <li>Python</li>
      <li>Java</li>
    </ul>
  </li>
</ul>

<!-- 自定义列表项值 -->
<ol>
  <li value="10">第十项</li>
  <li>第十一项</li>
  <li value="20">第二十项</li>
  <li>第二十一项</li>
</ol>
```

### `<p>` - 段落标签
**概念解释**：表示文本段落，是最常用的文本容器元素。
**使用规则**：每个独立的文本段落都应该用p标签包装。
```html
<!-- 基本段落 -->
<p>这是一个普通的段落文本。段落会自动在前后添加间距，形成视觉上的分离效果。</p>
<p>这是另一个段落。每个段落都是独立的文本块。</p>

<!-- 包含内联元素的段落 -->
<p>
  这个段落包含了<strong>粗体文本</strong>、<em>斜体文本</em>和
  <a href="https://example.com">链接</a>等内联元素。
</p>

<!-- 长段落 -->
<p>
  这是一个很长的段落文本，用来演示段落的自动换行功能。
  当文本超过容器宽度时，会自动换行显示。段落标签是块级元素，
  会占据整行的宽度，并且与其他段落之间有默认的上下边距。
</p>

<!-- 特殊用途的段落 -->
<p class="lead">这是一个引导段落，通常字体更大，用于文章开头。</p>
<p class="small">这是一个小字段落，包含次要信息。</p>
<p class="text-center">这是一个居中对齐的段落。</p>
```

### `<pre>` - 预格式化文本
**概念解释**：保留文本的空白字符和换行，按原样显示文本格式。
**使用场景**：代码块、ASCII艺术、保持格式的文本等。
```html
<!-- 代码块 -->
<pre>
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55
</pre>

<!-- ASCII艺术 -->
<pre>
    ∩───∩
   (  ◕   ◕ )
  /           \
 (  \_______/  )
  \___________/
</pre>

<!-- 保持格式的文本 -->
<pre>
姓名:    张三
年龄:    25
职业:    程序员
邮箱:    zhangsan@example.com
地址:    北京市朝阳区
         某某街道123号
</pre>

<!-- 与code结合使用 -->
<pre><code class="language-javascript">
// 这是一个JavaScript函数
function greet(name) {
    return `Hello, ${name}!`;
}

const message = greet('World');
console.log(message);
</code></pre>

<!-- 可滚动的代码块 -->
<pre style="max-height: 200px; overflow-y: auto; background: #f5f5f5; padding: 15px;">
// 很长的代码内容...
const longArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    // ... 更多数据
];
</pre>
```

### `<section>`
**概念解释**：表示文档中的一个独立节段，通常包含标题。
**使用原则**：当内容可以独立成章节时使用，应包含标题元素。
```html
<!-- 文章章节 -->
<article>
  <h1>前端开发指南</h1>
  
  <section>
    <h2>HTML基础</h2>
    <p>HTML是网页的骨架结构...</p>
  </section>
  
  <section>
    <h2>CSS样式</h2>
    <p>CSS负责网页的外观和布局...</p>
  </section>
  
  <section>
    <h2>JavaScript交互</h2>
    <p>JavaScript为网页添加动态功能...</p>
  </section>
</article>

<!-- 页面功能区域 -->
<section class="hero">
  <h1>欢迎来到我们的网站</h1>
  <p>这里是网站的主要宣传内容</p>
  <button>了解更多</button>
</section>

<section class="features">
  <h2>主要特性</h2>
  <div class="feature-list">
    <div class="feature">
      <h3>特性1</h3>
      <p>特性描述...</p>
    </div>
    <div class="feature">
      <h3>特性2</h3>
      <p>特性描述...</p>
    </div>
  </div>
</section>

<!-- 带有导航的章节 -->
<section id="about">
  <h2>关于我们</h2>
  <p>公司简介内容...</p>
</section>

<section id="services">
  <h2>我们的服务</h2>
  <ul>
    <li>网站开发</li>
    <li>移动应用</li>
    <li>系统集成</li>
  </ul>
</section>
```

### `<ul>`
无序列表

## 内联文本语义标签

### `<a>`
超链接
- `href` - 链接地址
- `target` - 打开方式 (_blank, _self, _parent, _top)
- `download` - 下载文件名
- `ping` - ping URL 列表
- `rel` - 链接关系 (nofollow, noopener, noreferrer, etc.)
- `hreflang` - 链接语言
- `type` - 链接类型
- `referrerpolicy` - 引用策略

### `<abbr>`
缩写
- `title` - 完整形式

### `<b>`
粗体文本

### `<bdi>`
双向隔离
- `dir` - 文本方向

### `<bdo>`
双向覆盖
- `dir` - 文本方向 (ltr, rtl)

### `<br>`
换行标签

### `<cite>`
引用作品标题

### `<code>`
代码文本

### `<data>`
数据值
- `value` - 机器可读值

### `<dfn>`
定义术语

### `<em>`
强调文本

### `<i>`
斜体文本

### `<kbd>`
键盘输入

### `<mark>`
高亮文本

### `<q>`
短引用
- `cite` - 引用来源

### `<ruby>`
注音符号

### `<rp>`
注音括号

### `<rt>`
注音文本

### `<s>`
删除线文本

### `<samp>`
示例输出

### `<small>`
小号文本

### `<span>`
内联容器

### `<strong>`
重要文本

### `<sub>`
下标

### `<sup>`
上标

### `<time>`
时间
- `datetime` - 机器可读时间

### `<u>`
下划线文本

### `<var>`
变量

### `<wbr>`
换行机会

## 图像和多媒体标签

### `<area>`
图像映射区域
- `alt` - 替代文本
- `coords` - 坐标
- `shape` - 形状 (rect, circle, poly, default)
- `href` - 链接地址
- `target` - 目标窗口
- `download` - 下载
- `ping` - ping URL
- `rel` - 关系
- `referrerpolicy` - 引用策略

### `<audio>`
音频
- `src` - 音频 URL
- `crossorigin` - 跨域设置
- `preload` - 预加载 (none, metadata, auto)
- `autoplay` - 自动播放
- `loop` - 循环播放
- `muted` - 静音
- `controls` - 显示控件
- `controlslist` - 控件列表 (nodownload, nofullscreen, noremoteplayback)
- `disableremoteplayback` - 禁用远程播放

### `<img>`
图像
- `alt` - 替代文本
- `src` - 图像 URL
- `srcset` - 响应式图像集
- `sizes` - 响应式尺寸
- `crossorigin` - 跨域设置
- `usemap` - 图像映射
- `ismap` - 服务器端图像映射
- `width` - 宽度
- `height` - 高度
- `referrerpolicy` - 引用策略
- `decoding` - 解码方式 (sync, async, auto)
- `loading` - 加载方式 (lazy, eager)
- `fetchpriority` - 获取优先级 (high, low, auto)
- `elementtiming` - 元素时序标识符

### `<map>`
图像映射
- `name` - 映射名称

### `<track>`
媒体轨道
- `default` - 默认轨道
- `kind` - 轨道类型 (subtitles, captions, descriptions, chapters, metadata)
- `label` - 轨道标签
- `src` - 轨道文件
- `srclang` - 轨道语言

### `<video>`
视频
- `src` - 视频 URL
- `crossorigin` - 跨域设置
- `poster` - 封面图
- `preload` - 预加载
- `autoplay` - 自动播放
- `playsinline` - 内联播放
- `loop` - 循环播放
- `muted` - 静音
- `controls` - 显示控件
- `controlslist` - 控件列表
- `disableremoteplayback` - 禁用远程播放
- `width` - 宽度
- `height` - 高度

## 嵌入内容标签

### `<embed>`
嵌入内容
- `src` - 内容 URL
- `type` - MIME 类型
- `width` - 宽度
- `height` - 高度

### `<fencedframe>`
围栏框架（实验性）
- `config` - 配置对象
- `width` - 宽度
- `height` - 高度

### `<iframe>`
内联框架
- `src` - 框架 URL
- `srcdoc` - 内联 HTML 内容
- `name` - 框架名称
- `sandbox` - 安全限制 (allow-downloads, allow-forms, allow-modals, allow-orientation-lock, allow-pointer-lock, allow-popups, allow-popups-to-escape-sandbox, allow-presentation, allow-same-origin, allow-scripts, allow-storage-access-by-user-activation, allow-top-navigation, allow-top-navigation-by-user-activation, allow-top-navigation-to-custom-protocols)
- `allow` - 功能策略
- `allowfullscreen` - 允许全屏
- `width` - 宽度
- `height` - 高度
- `referrerpolicy` - 引用策略
- `loading` - 加载方式 (lazy, eager)

### `<object>`
嵌入对象
- `data` - 对象数据
- `type` - MIME 类型
- `name` - 对象名称
- `form` - 关联表单
- `width` - 宽度
- `height` - 高度
- `usemap` - 图像映射

### `<picture>`
响应式图像容器

### `<portal>`
门户（实验性）
- `src` - 门户 URL
- `referrerpolicy` - 引用策略

### `<source>`
媒体资源
- `src` - 资源 URL
- `type` - MIME 类型
- `srcset` - 图像集
- `sizes` - 尺寸
- `media` - 媒体查询
- `width` - 宽度
- `height` - 高度

## 脚本标签

### `<canvas>`
画布
- `width` - 宽度
- `height` - 高度

### `<noscript>`
无脚本内容

### `<script>`
脚本（已在文档结构标签中列出）

## 编辑标识标签

### `<del>`
删除的文本
- `cite` - 修改说明 URL
- `datetime` - 修改时间

### `<ins>`
插入的文本
- `cite` - 修改说明 URL
- `datetime` - 修改时间

## 表格内容标签

### `<caption>`
表格标题

### `<col>`
列
- `span` - 跨列数

### `<colgroup>`
列组
- `span` - 跨列数

### `<table>`
表格

### `<tbody>`
表体

### `<td>`
表格单元格
- `colspan` - 跨列数
- `rowspan` - 跨行数
- `headers` - 关联表头 ID

### `<tfoot>`
表脚

### `<th>`
表头单元格
- `colspan` - 跨列数
- `rowspan` - 跨行数
- `headers` - 关联表头 ID
- `scope` - 作用域 (row, col, rowgroup, colgroup)
- `abbr` - 缩写

### `<thead>`
表头

### `<tr>`
表格行

## 表单标签

### `<button>`
按钮
- `autofocus` - 自动焦点
- `disabled` - 禁用
- `form` - 关联表单
- `formaction` - 提交地址
- `formenctype` - 编码类型
- `formmethod` - 提交方法
- `formnovalidate` - 禁用验证
- `formtarget` - 提交目标
- `name` - 按钮名称
- `type` - 按钮类型 (submit, reset, button)
- `value` - 按钮值

### `<datalist>`
数据列表

### `<fieldset>`
字段集
- `disabled` - 禁用
- `form` - 关联表单
- `name` - 字段集名称

### `<form>`
表单（已在区块内容标签中列出）

### `<input>`
输入控件
- `accept` - 接受文件类型
- `alt` - 图像替代文本
- `autocomplete` - 自动完成
- `capture` - 捕获方式 (user, environment)
- `checked` - 选中状态
- `dirname` - 文本方向字段名
- `disabled` - 禁用
- `form` - 关联表单
- `formaction` - 提交地址
- `formenctype` - 编码类型
- `formmethod` - 提交方法
- `formnovalidate` - 禁用验证
- `formtarget` - 提交目标
- `height` - 高度
- `list` - 数据列表
- `max` - 最大值
- `maxlength` - 最大长度
- `min` - 最小值
- `minlength` - 最小长度
- `multiple` - 多选
- `name` - 控件名称
- `pattern` - 正则模式
- `placeholder` - 占位符
- `popovertarget` - 弹出框目标
- `popovertargetaction` - 弹出框动作 (hide, show, toggle)
- `readonly` - 只读
- `required` - 必填
- `size` - 显示宽度
- `src` - 图像 URL
- `step` - 步长
- `type` - 输入类型 (button, checkbox, color, date, datetime-local, email, file, hidden, image, month, number, password, radio, range, reset, search, submit, tel, text, time, url, week)
- `value` - 控件值
- `width` - 宽度

### `<label>`
标签
- `for` - 关联控件

### `<legend>`
字段集标题

### `<meter>`
度量器
- `value` - 当前值
- `min` - 最小值
- `max` - 最大值
- `low` - 低值
- `high` - 高值
- `optimum` - 最佳值
- `form` - 关联表单

### `<optgroup>`
选项组
- `disabled` - 禁用
- `label` - 组标签

### `<option>`
选项
- `disabled` - 禁用
- `label` - 选项标签
- `selected` - 选中状态
- `value` - 选项值

### `<output>`
输出结果
- `for` - 关联控件
- `form` - 关联表单
- `name` - 输出名称

### `<progress>`
进度条
- `value` - 当前值
- `max` - 最大值

### `<select>`
下拉选择
- `autocomplete` - 自动完成
- `disabled` - 禁用
- `form` - 关联表单
- `multiple` - 多选
- `name` - 控件名称
- `required` - 必填
- `size` - 显示选项数

### `<textarea>`
多行文本
- `autocomplete` - 自动完成
- `cols` - 列数
- `dirname` - 文本方向字段名
- `disabled` - 禁用
- `form` - 关联表单
- `maxlength` - 最大长度
- `minlength` - 最小长度
- `name` - 控件名称
- `placeholder` - 占位符
- `readonly` - 只读
- `required` - 必填
- `rows` - 行数
- `wrap` - 换行方式 (soft, hard)

## Web 组件标签

### `<slot>`
插槽
- `name` - 插槽名称

### `<template>`
模板

## 过时和废弃的标签

### HTML4/XHTML 废弃标签
- `<acronym>` → 使用 `<abbr>`
- `<applet>` → 使用 `<object>` 或 `<embed>`
- `<basefont>` → 使用 CSS
- `<big>` → 使用 CSS font-size
- `<center>` → 使用 CSS text-align
- `<dir>` → 使用 `<ul>`
- `<font>` → 使用 CSS
- `<frame>` → 使用 `<iframe>`
- `<frameset>` → 使用 CSS Grid/Flexbox
- `<isindex>` → 使用表单控件
- `<listing>` → 使用 `<pre>`
- `<marquee>` → 使用 CSS 动画
- `<multicol>` → 使用 CSS 多列布局
- `<nextid>` → 不再需要
- `<nobr>` → 使用 CSS white-space
- `<noembed>` → 不再需要
- `<noframes>` → 不再需要
- `<plaintext>` → 使用 `<pre>`
- `<spacer>` → 使用 CSS margin/padding
- `<strike>` → 使用 `<s>` 或 CSS text-decoration
- `<tt>` → 使用 `<code>` 或 CSS font-family
- `<xmp>` → 使用 `<pre>`

### 实验性/非标准标签 (部分浏览器支持)
- `<blink>` → 使用 CSS 动画
- `<comment>` → 使用 `<!-- -->`
- `<keygen>` → 已从标准中移除
- `<layer>` → 使用 CSS 定位
- `<nolayer>` → 不再需要
- `<server>` → 服务器端标签

## 事件属性 (Event Attributes)

### 窗口事件
- `onafterprint` - 打印后
- `onbeforeprint` - 打印前
- `onbeforeunload` - 页面卸载前
- `onhashchange` - URL 锚点改变
- `onlanguagechange` - 语言改变
- `onmessage` - 接收消息
- `onmessageerror` - 消息错误
- `onoffline` - 网络离线
- `ononline` - 网络在线
- `onpagehide` - 页面隐藏
- `onpageshow` - 页面显示
- `onpopstate` - 历史状态改变
- `onrejectionhandled` - Promise 拒绝被处理
- `onstorage` - 存储改变
- `onunhandledrejection` - 未处理的 Promise 拒绝
- `onunload` - 页面卸载

### 表单事件
- `onchange` - 值改变
- `oninput` - 输入
- `oninvalid` - 验证失败
- `onreset` - 表单重置
- `onselect` - 文本选择
- `onsubmit` - 表单提交
- `onformdata` - 表单数据构建

### 焦点事件
- `onblur` - 失去焦点
- `onfocus` - 获得焦点
- `onfocusin` - 获得焦点（冒泡）
- `onfocusout` - 失去焦点（冒泡）

### 鼠标事件
- `onauxclick` - 辅助点击
- `onclick` - 点击
- `oncontextmenu` - 右键菜单
- `ondblclick` - 双击
- `onmousedown` - 鼠标按下
- `onmouseenter` - 鼠标进入
- `onmouseleave` - 鼠标离开
- `onmousemove` - 鼠标移动
- `onmouseout` - 鼠标移出
- `onmouseover` - 鼠标悬停
- `onmouseup` - 鼠标松开

### 拖拽事件
- `ondrag` - 拖拽
- `ondragend` - 拖拽结束
- `ondragenter` - 拖拽进入
- `ondragleave` - 拖拽离开
- `ondragover` - 拖拽悬停
- `ondragstart` - 拖拽开始
- `ondrop` - 拖拽放下

### 键盘事件
- `onkeydown` - 键盘按下
- `onkeyup` - 键盘松开

### 滚动事件
- `onscroll` - 滚动
- `onscrollend` - 滚动结束

### 选择事件
- `onselectstart` - 选择开始
- `onselectionchange` - 选择改变

### 媒体事件
- `onabort` - 中止
- `oncanplay` - 可以播放
- `oncanplaythrough` - 可以播放完整
- `ondurationchange` - 时长改变
- `onemptied` - 清空
- `onended` - 播放结束
- `onerror` - 错误
- `onloadeddata` - 加载数据
- `onloadedmetadata` - 加载元数据
- `onloadstart` - 开始加载
- `onpause` - 暂停
- `onplay` - 播放
- `onplaying` - 正在播放
- `onprogress` - 进度
- `onratechange` - 播放速率改变
- `onseeked` - 寻找结束
- `onseeking` - 寻找
- `onstalled` - 停滞
- `onsuspend` - 暂停
- `ontimeupdate` - 时间更新
- `onvolumechange` - 音量改变
- `onwaiting` - 等待

### 加载事件
- `onerror` - 错误
- `onload` - 加载完成
- `onloadend` - 加载结束
- `onloadstart` - 开始加载

### 其他事件
- `onbeforeinput` - 输入前
- `onbeforematch` - 匹配前
- `onbeforetoggle` - 切换前
- `oncancel` - 取消
- `onclose` - 关闭
- `oncopy` - 复制
- `oncut` - 剪切
- `onpaste` - 粘贴
- `onresize` - 尺寸改变
- `onsecuritypolicyviolation` - 安全策略违反
- `onslotchange` - 插槽改变
- `ontoggle` - 切换
- `onwheel` - 滚轮

## HTML5 新特性

### 语义化标签
- `<article>` - 独立文章内容
- `<aside>` - 侧边栏内容
- `<details>` - 可展开的详情
- `<figcaption>` - 图形标题
- `<figure>` - 图形内容
- `<footer>` - 页脚内容
- `<header>` - 页眉内容
- `<main>` - 主要内容
- `<mark>` - 高亮文本
- `<nav>` - 导航链接
- `<section>` - 文档节
- `<summary>` - 详情摘要
- `<time>` - 时间标记

### 表单增强
- 新的 input 类型：`color`, `date`, `datetime-local`, `email`, `month`, `number`, `range`, `search`, `tel`, `time`, `url`, `week`
- 新属性：`autocomplete`, `autofocus`, `form`, `formaction`, `formenctype`, `formmethod`, `formnovalidate`, `formtarget`, `list`, `max`, `min`, `multiple`, `pattern`, `placeholder`, `required`, `step`

### 多媒体支持
- `<audio>` - 音频播放
- `<video>` - 视频播放
- `<source>` - 多媒体源
- `<track>` - 媒体轨道

### 图形支持
- `<canvas>` - 画布绘图
- `<svg>` - 矢量图形

### 交互元素
- `<details>` - 可展开详情
- `<dialog>` - 对话框
- `<summary>` - 详情摘要

### Web 组件
- `<template>` - 模板
- `<slot>` - 插槽

### 微数据支持
- `itemid`, `itemprop`, `itemref`, `itemscope`, `itemtype` 属性

### 可访问性增强
- ARIA 角色和属性支持
- 更好的语义化标签

---

*注意：此文档基于 HTML Living Standard 和 WHATWG 规范。某些实验性功能可能在不同浏览器中的支持程度不同。建议在使用时查阅最新的浏览器兼容性信息。*




rel 值	浏览器行为	是否阻塞渲染	作用对象
stylesheet	下载→解析→应用样式	✅ 是	页面外观
icon	下载→显示图标	❌ 否	浏览器UI
preload	下载→缓存（不执行）	❌ 否	性能优化
preconnect	建立连接（不下载）	❌ 否	性能优化
canonical	读取元数据（不处理）	❌ 否	SEO



span文本间距问题
间距来自你写在三个 span 标签之间的换行和缩进空格。HTML 会把这些空白当作普通文本节点渲染成一个可见空格，所以 O 左右会多出间距。
只要把三个 span 紧挨在一起（去掉换行/空格，或者注释掉中间的空白，也可以在父元素上加 font-size:0 后对子元素单独设置字体大小），间距就会消失。