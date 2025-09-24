# HTML 标签和属性完整参考

## 全局属性 (Global Attributes)
所有 HTML 元素都可以使用的属性：

- `accesskey` - 定义访问元素的快捷键
- `autocapitalize` - 控制文本输入的自动大写 (off, none, on, sentences, words, characters)
- `autofocus` - 页面加载时自动获得焦点
- `class` - 定义元素的类名（多个类名用空格分隔）
- `contenteditable` - 定义元素内容是否可编辑 (true, false, inherit)
- `contextmenu` - 定义元素的上下文菜单（已废弃）
- `data-*` - 自定义数据属性（用于存储页面或应用程序的私有自定义数据）
- `dir` - 定义文本方向 (ltr, rtl, auto)
- `draggable` - 定义元素是否可拖拽 (true, false, auto)
- `dropzone` - 定义拖拽数据的类型（已废弃）
- `enterkeyhint` - 虚拟键盘回车键的提示 (enter, done, go, next, previous, search, send)
- `exportparts` - 导出 shadow DOM 的部分
- `hidden` - 隐藏元素（布尔属性）
- `id` - 定义元素的唯一标识符
- `inert` - 使元素及其子元素变为惰性
- `inputmode` - 输入模式提示 (none, text, decimal, numeric, tel, search, email, url)
- `is` - 指定自定义内置元素
- `itemid` - 微数据项的全局标识符
- `itemprop` - 微数据项的属性
- `itemref` - 微数据项的引用
- `itemscope` - 定义微数据项的范围
- `itemtype` - 微数据项的类型
- `lang` - 定义元素的语言（ISO 语言代码）
- `nonce` - 内容安全策略的一次性令牌
- `part` - shadow DOM 中元素的部分名称
- `popover` - 弹出框行为 (auto, manual)
- `role` - ARIA 角色属性
- `slot` - shadow DOM 插槽名称
- `spellcheck` - 定义是否检查拼写 (true, false)
- `style` - 定义内联样式
- `tabindex` - 定义 Tab 键顺序（数字，-1 表示不可聚焦但可通过脚本聚焦）
- `title` - 定义元素的提示信息
- `translate` - 定义是否翻译元素内容 (yes, no)

## 文档结构标签

### `<!DOCTYPE html>`
声明文档类型

### `<html>`
HTML 文档的根元素
- `lang` - 文档语言
- `dir` - 文本方向
- `manifest` - 应用缓存清单（已废弃）
- `xmlns` - XML 命名空间
- `prefix` - RDFa 前缀

### `<head>`
文档头部信息容器

### `<title>`
文档标题

### `<meta>`
元数据标签
- `charset` - 字符编码
- `name` - 元数据名称
- `content` - 元数据内容
- `http-equiv` - HTTP 头部信息
- `property` - Open Graph 属性
- `scheme` - 元数据方案（已废弃）

### `<base>`
文档基础 URL
- `href` - 基础 URL
- `target` - 默认目标窗口

### `<link>`
外部资源链接
- `href` - 资源 URL
- `rel` - 关系类型 (stylesheet, icon, preload, prefetch, dns-prefetch, preconnect, modulepreload, etc.)
- `type` - MIME 类型
- `media` - 媒体查询
- `sizes` - 图标尺寸
- `crossorigin` - 跨域设置 (anonymous, use-credentials)
- `integrity` - 完整性验证
- `referrerpolicy` - 引用策略
- `as` - 预加载资源类型
- `color` - 主题颜色
- `disabled` - 禁用样式表
- `hreflang` - 链接语言
- `imagesizes` - 图像尺寸
- `imagesrcset` - 图像源集
- `title` - 链接标题

### `<style>`
内部样式表
- `type` - 样式类型
- `media` - 媒体查询
- `nonce` - CSP 令牌
- `title` - 样式表标题
- `blocking` - 渲染阻塞

### `<script>`
脚本标签
- `src` - 脚本文件路径
- `type` - 脚本类型 (text/javascript, module, importmap, speculationrules)
- `async` - 异步加载
- `defer` - 延迟执行
- `crossorigin` - 跨域设置
- `integrity` - 完整性验证
- `nomodule` - 非模块脚本
- `nonce` - CSP 令牌
- `referrerpolicy` - 引用策略
- `blocking` - 渲染阻塞
- `fetchpriority` - 获取优先级 (high, low, auto)

### `<noscript>`
无脚本内容

### `<body>`
文档主体
- `onafterprint` - 打印后事件
- `onbeforeprint` - 打印前事件
- `onbeforeunload` - 页面卸载前事件
- `onhashchange` - 锚点改变事件
- `onlanguagechange` - 语言改变事件
- `onmessage` - 消息事件
- `onmessageerror` - 消息错误事件
- `onoffline` - 离线事件
- `ononline` - 在线事件
- `onpagehide` - 页面隐藏事件
- `onpageshow` - 页面显示事件
- `onpopstate` - 历史状态改变事件
- `onrejectionhandled` - Promise 拒绝处理事件
- `onstorage` - 存储改变事件
- `onunhandledrejection` - 未处理的 Promise 拒绝事件
- `onunload` - 页面卸载事件

## 区块内容标签

### `<address>`
联系信息

### `<article>`
独立文章

### `<aside>`
侧边内容

### `<blockquote>`
块引用
- `cite` - 引用来源 URL

### `<details>`
详情展开
- `open` - 展开状态
- `name` - 详情组名称

### `<dialog>`
对话框
- `open` - 显示状态

### `<dd>`
定义描述

### `<div>`
通用容器

### `<dl>`
定义列表

### `<dt>`
定义术语

### `<figcaption>`
图形标题

### `<figure>`
图形内容

### `<footer>`
底部内容

### `<form>`
表单
- `accept-charset` - 字符编码
- `action` - 提交地址
- `autocomplete` - 自动完成 (on, off)
- `enctype` - 编码类型 (application/x-www-form-urlencoded, multipart/form-data, text/plain)
- `method` - 提交方法 (GET, POST, dialog)
- `name` - 表单名称
- `novalidate` - 禁用验证
- `rel` - 链接关系
- `target` - 提交目标

### `<h1>` - `<h6>`
标题标签

### `<header>`
头部内容

### `<hgroup>`
标题组

### `<hr>`
水平分割线

### `<li>`
列表项
- `value` - 项目值

### `<main>`
主要内容

### `<nav>`
导航链接

### `<ol>`
有序列表
- `reversed` - 反向排序
- `start` - 起始数字
- `type` - 编号类型 (1, A, a, I, i)

### `<p>`
段落标签

### `<pre>`
预格式化文本

### `<search>`
搜索区域

### `<section>`
文档节

### `<summary>`
详情摘要

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