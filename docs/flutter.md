# record
Flutter 的样式系统特点：

1. **一体化**：不需要分离的 HTML/CSS，所有样式都在 Dart 代码中
2. **类型安全**：编译时检查，减少样式错误
3. **组件化**：每个 Widget 都包含结构和样式
4. **响应式**：内置响应式设计支持
5. **主题化**：统一的主题管理系统
6. **性能优化**：编译时优化，运行时高效



# 大厂常用的系统变化导致重建的性能优化技术：
✅ resizeToAvoidBottomInset: false - 标配
阿里闲鱼、腾讯微信等都会用
防止键盘弹出导致页面重建
✅ RepaintBoundary - 性能优化标准手段
用于隔离重建区域
Flutter官方推荐，大厂必用
✅ 防抖机制 - 通用优化模式
不限于Flutter，前端开发标准做法

任何依赖 MediaQuery 的 Widget 都会在键盘状态变化时重建。
解决方案：使用 WidgetsBindingObserver
这是大厂真正使用的方案，通过监听系统事件而不是依赖 MediaQuery：

# record
9.13：
  1.泛型 和 dynamic的区别
    泛型：
    类型参数化，在编译时确定具体类型
    提供类型安全的同时保持代码复用性
    编译时进行类型检查
    dynamic：
    运行时类型，编译时跳过类型检查
    完全动态，可以是任何类型
    运行时才进行类型检查

  2.在Dart中，以///开头的注释是文档注释，可以被工具自动提取生成API文档

  3.ConsumerStatefulWidget是Riverpod库提供的有状态组件基类

  4.  // {super.key}是命名参数语法，super.key调用父类构造函数
     // Key是Flutter用来识别组件的唯一标识符

  5.ConsumerState是泛型状态类

  6.下划线开头表示这是私有类，只能在当前文件中访问

  7.final 和 const 

  8.Dart中的null safety特性，?表示这个变量可以为空

  9.ValueNotifier是Flutter提供的一种响应式变量，当其值改变时，会通知所有依赖它的组件重新构建

  10.late表示延迟初始化但保证在使用前被赋值,late关键字告诉Dart这个变量会在使用前被初始化，但不是在声明时,如果在初始化前使用会抛出运行时错误

  11.geolocator是Flutter提供的一种定位服务，用于获取用户GPS位置

  12.initState是StatefulWidget的生命周期方法，在组件创建时只调用一次
    @override
    void initState() {
      // 必须先调用父类的initState，这是Flutter的规定
      // super关键字用于调用父类的方法
      super.initState();
    }

  13.Future<void>表示这个方法返回一个Future对象，但不返回具体值

  14.Platform.isIOS是Flutter提供的一种方法，用于检查当前平台是否是iOS

  15.setState是Flutter提供的一种方法，用于更新组件状态

  16.mounted是Flutter提供的一种方法，用于检查组件是否已挂载

  17.ScaffoldMessenger.of(context).showSnackBar是Flutter提供的一种方法，用于显示SnackBar

  18..of(context)是Flutter提供的一种方法，用于获取当前上下文

  19.behavior: SnackBarBehavior.floating, // 浮动行为，SnackBar会浮动在屏幕上

  20.MediaQuery.of(context).size.height是Flutter提供的一种方法，用于获取当前屏幕的高度

  21.SnackBarAction是Flutter提供的一种方法，用于显示SnackBarAction

  22.Future.wait是Flutter提供的一种方法，用于等待多个Future对象完成

9.14：
  1.fenceMap.values.toList()是Flutter提供的一种方法，用于将Map的值转换为List

  2.  setState(() {}); // 用于触发更新组件状态

  3.resizeToAvoidBottomInset

  4.elevation

  5.RepaintBoundary是Flutter提供的一种组件，用于完全隔离重建，避免不必要的重建

  6.CircularProgressIndicator是Flutter提供的一种组件，用于显示圆形进度条

  7.ValueListenableBuilder是Flutter提供的一种组件，用于监听ValueNotifier的变化，当变化时，重新构建组件
    
  8.Image.asset：Image.asset是用于加载一个本地资源图片。

9.15：
  1.响应式布局
  flutter没有web的响应式单位，需自己实现
  LayoutBuilder - 基于约束的响应式
  OrientationBuilder - 屏幕方向响应
  Flexible & Expanded - 弹性布局
  Wrap - 自动换行布局

9.16:
  1.// 'dart:' 前缀表示Dart内置库
    // 'package:' 前缀表示第三方包或内部项目模块

  2.Material Design是Google的UI设计语言,常用

# 创建新项目（基础脚手架）
flutter create my_app

创建特定平台项目
flutter create --platforms=android,ios my_app

创建包/插件
flutter create --template=package my_package
flutter create --template=plugin my_plugin


# Flutter 容器类型详解

## 1. 基础约束容器

### Container
- 最通用的容器，集成了绘制、定位、尺寸约束
- 可设置：`padding`、`margin`、`decoration`、`width`、`height`、`color` 等
- 相当于 Web 的 `<div>`
- **适用场景**：需要装饰、边距、约束的单一子组件

### SizedBox
- 固定尺寸容器，性能优于 `Container`
- 只能设置 `width`、`height`
- `SizedBox.shrink()` 创建零尺寸组件
- `SizedBox.expand()` 填充父容器
- **适用场景**：固定尺寸占位、间距控制

### ConstrainedBox
- 对子组件施加额外约束
- 通过 `BoxConstraints` 设置最小/最大宽高
- **适用场景**：限制子组件尺寸范围

### UnconstrainedBox
- 解除父组件的约束
- 允许子组件超出父容器
- **适用场景**：突破父容器限制

### LimitedBox
- 当父组件无限大时提供约束
- **适用场景**：无限滚动列表中的子项

### AspectRatio
- 强制子组件保持特定宽高比
- **适用场景**：视频播放器、图片展示

### FractionallySizedBox
- 按父容器比例设置尺寸
- **适用场景**：百分比布局

---

## 2. 内边距/外边距容器

### Padding
- 专门处理内边距
- 性能优于 `Container`（单一职责）
- **适用场景**：纯内边距需求

### Center
- 居中子组件
- 等价于 `Align(alignment: Alignment.center)`

### Align
- 按对齐方式定位子组件
- 可设置 9 种基础对齐 + 自定义对齐

---

## 3. 滚动容器

### SingleChildScrollView
- 单一子组件可滚动
- 类似 Web 的 `overflow: scroll`
- **适用场景**：内容可能超出屏幕的单一组件

### ListView
- 线性列表滚动容器
- 懒加载优化（只渲染可见区域）
- **适用场景**：长列表、聊天记录

### GridView
- 网格布局滚动容器
- **适用场景**：相册、商品列表

### CustomScrollView
- 自定义滚动效果
- 配合 Sliver 系列组件使用
- **适用场景**：复杂滚动效果（吸顶、折叠头部）

### PageView
- 页面滑动容器
- **适用场景**：轮播图、引导页

---

## 4. 响应式布局容器

### LayoutBuilder
- 根据父容器约束构建子组件
- 获取可用空间大小
- **适用场景**：响应式布局、自适应设计

### MediaQuery
- 获取屏幕/设备信息
- 不是组件，但常用于响应式设计

### OrientationBuilder
- 根据屏幕方向构建不同布局
- **适用场景**：横竖屏适配

---

## 5. 多子组件布局容器

### Row / Column
- 线性布局（水平/垂直）
- 类似 Flexbox
- 配合 `Expanded`、`Flexible` 使用

### Stack
- 层叠布局
- 类似 CSS `position: absolute`
- 配合 `Positioned` 精确定位

### Wrap
- 自动换行布局
- 类似 CSS `flex-wrap: wrap`

### Flow
- 自定义流式布局（较少使用）

---

## 6. 装饰容器

### DecoratedBox
- 纯装饰容器（边框、圆角、阴影、渐变）
- 性能优于 `Container`

### Card
- Material Design 卡片
- 自带阴影和圆角

### ClipRRect / ClipOval / ClipPath
- 裁剪子组件形状
- **适用场景**：圆角图片、异形裁剪

---

## 7. 交互容器

### GestureDetector
- 手势识别容器（点击、滑动、长按等）

### InkWell / InkResponse
- 带水波纹效果的点击容器
- Material Design 交互反馈

### AbsorbPointer / IgnorePointer
- 阻止/忽略触摸事件

---

## 8. 性能优化容器

### RepaintBoundary
- 隔离重绘区域
- **适用场景**：动画优化、避免不必要的重绘

### Offstage
- 隐藏子组件但保持状态
- 不同于 `Visibility`（会占位）

---



---

## 容器的排斥规则（不能同时使用）

```dart
// ❌ 错误：Expanded 不能直接放在 Expanded 中
Expanded(
  child: Expanded(...) // 错误
)

// ❌ 错误：Flexible 与固定尺寸冲突
Row(
  children: [
    SizedBox(width: 100), // 固定宽度
    Expanded(...) // 弹性宽度 - 可以共存
    Flexible(...) // 但同一子组件不能既固定又弹性
  ]
)

// ❌ 错误：无限约束冲突
SingleChildScrollView(
  child: Column(
    children: [
      ListView(...) // 错误：ListView 需要有限高度
    ]
  )
)

// ✅ 正确：给 ListView 明确高度
SingleChildScrollView(
  child: Column(
    children: [
      SizedBox(
        height: 300,
        child: ListView(...) // 给 ListView 明确高度
      )
    ]
  )
)
```

---

## 常用容器组合模式

1. **固定尺寸 + 内边距**：`SizedBox` + `Padding`
2. **滚动内容**：`SingleChildScrollView` + `Column`/`Row`
3. **响应式布局**：`LayoutBuilder` + `MediaQuery`
4. **弹性布局**：`Row`/`Column` + `Expanded`
5. **网格布局**：`GridView`
6. **层叠布局**：`Stack` + `Positioned`

---

# 生命周期、状态管理

### 导航与状态管理
- 通过 `navigationIndexProvider` 切换。路由不会变化，只有 Tab 索引会变化
- 使用全局 `ScaffoldMessengerKey`（推荐）
- 给每个 `Scaffold` 分配独立的 key，消息绑定到具体的 Scaffold 上，页面销毁时自动清除
- 当前方案已经是 SnackBar 能做到的极限了。如果还想更完美，建议换 `bot_toast` 或自己写 `Overlay`

### 生命周期相关
- `addPostFrameCallback`：在帧渲染完成后执行回调


# Widget 基础

## StatelessWidget vs StatefulWidget

### StatelessWidget（无状态组件）
- **特点**：不可变，创建后不会改变
- **适用场景**：纯展示型组件，不需要交互或状态变化
- **性能**：更轻量，性能更好
- **重要原则**：当父组件重建时，StatelessWidget 会重新创建，但如果参数没变化，Flutter 会优化重建过程

```dart
class MyText extends StatelessWidget {
  // final 确保属性不可变，这是 StatelessWidget 的核心要求
  final String text;
  
  // const 构造函数：
  // 1. 允许 Flutter 在编译时创建常量实例，提升性能
  // 2. 相同参数的实例会被复用，节省内存
  // 3. super.key 传递给父类，用于 Widget 树的标识和优化
  const MyText({super.key, required this.text});
  
  // build 方法：
  // - 描述如何构建 UI
  // - 可能被多次调用（父组件重建、屏幕旋转等）
  // - 应该是纯函数，不应有副作用
  @override
  Widget build(BuildContext context) {
    // context 是 BuildContext 类型，提供：
    // 1. 访问主题：Theme.of(context)
    // 2. 访问媒体查询：MediaQuery.of(context)
    // 3. 导航：Navigator.of(context)
    // 4. 访问 InheritedWidget
    return Text(text);
  }
}

// 使用场景示例
class ProfileCard extends StatelessWidget {
  final String name;
  final String avatar;
  final int age;
  
  const ProfileCard({
    super.key,
    required this.name,
    required this.avatar,
    required this.age,
  });
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          Image.network(avatar),
          Text(name),
          Text('Age: $age'),
        ],
      ),
    );
  }
}
```

### StatefulWidget（有状态组件）
- **特点**：可变，可以响应用户交互或数据变化
- **适用场景**：需要用户交互、动画、数据更新的组件
- **组成**：Widget 类（不可变）+ State 类（可变）
- **生命周期**：State 对象可以在 Widget 重建时保持状态

```dart
// Widget 类：不可变的配置信息
// 注意：即使是 StatefulWidget，Widget 本身也是不可变的
class Counter extends StatefulWidget {
  // 可以接收外部参数（不可变）
  final int initialValue;
  final String title;
  
  const Counter({
    super.key,
    this.initialValue = 0,  // 默认值
    this.title = 'Counter',
  });
  
  // createState 方法：
  // - 只调用一次，创建 State 对象
  // - State 对象会被 Flutter 框架管理
  @override
  State<Counter> createState() => _CounterState();
}

// State 类：可变的状态和逻辑
// 下划线开头 _ 表示私有类，只能在当前文件访问
class _CounterState extends State<Counter> {
  // 私有状态变量（可变）
  // 注意：不是 final，因为需要修改
  late int _count;  // late 表示稍后初始化
  
  @override
  void initState() {
    super.initState();
    // 通过 widget 访问 StatefulWidget 的属性
    _count = widget.initialValue;
    
    // 这里适合做：
    // - 初始化数据
    // - 订阅事件
    // - 启动定时器
    // - 发起网络请求
  }
  
  // 增加计数的方法
  void _increment() {
    // setState 是核心方法：
    // 1. 告诉 Flutter 状态已改变
    // 2. 触发 build 方法重新执行
    // 3. 只重建当前 Widget 子树，不影响父组件
    setState(() {
      // 所有状态修改都应在 setState 回调中
      _count++;
      
      // ⚠️ 常见错误：
      // _count++; 
      // setState(() {}); // 这样写虽然能工作，但不推荐
    });
  }
  
  void _decrement() {
    setState(() {
      _count--;
    });
  }
  
  void _reset() {
    setState(() {
      _count = widget.initialValue;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    // build 方法会在以下情况被调用：
    // 1. initState 之后
    // 2. setState 被调用后
    // 3. 父 Widget 重建时
    // 4. InheritedWidget 变化时
    
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // 显示标题（来自 Widget 配置）
        Text(
          widget.title,
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),
        
        // 显示当前计数（来自 State）
        Text(
          'Count: $_count',
          style: TextStyle(fontSize: 48),
        ),
        SizedBox(height: 20),
        
        // 按钮行
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _decrement,  // 传递方法引用
              child: const Text('-'),
            ),
            SizedBox(width: 10),
            ElevatedButton(
              onPressed: _reset,
              child: const Text('Reset'),
            ),
            SizedBox(width: 10),
            ElevatedButton(
              onPressed: _increment,
              child: const Text('+'),
            ),
          ],
        ),
      ],
    );
  }
  
  @override
  void dispose() {
    // 清理资源，防止内存泄漏
    // 这里适合：
    // - 取消订阅
    // - 关闭流
    // - 停止定时器
    // - 释放控制器
    super.dispose();
  }
}
```


### 性能优化技巧

```dart
// ✅ 好的做法：将不变的部分提取为 StatelessWidget
class MyPage extends StatefulWidget {
  @override
  State<MyPage> createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 静态内容使用 StatelessWidget，不会因为 setState 重建
        const Header(),  // const 关键字告诉 Flutter 这是常量
        
        // 动态内容
        Text('Count: $_counter'),
        
        ElevatedButton(
          onPressed: () => setState(() => _counter++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}

class Header extends StatelessWidget {
  const Header({super.key});
  
  @override
  Widget build(BuildContext context) {
    print('Header rebuilt');  // 不会打印（除非父组件首次构建）
    return Text('Header');
  }
}

// ❌ 不好的做法：所有内容都在 build 中
class _MyPageStateBad extends State<MyPage> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 每次 setState 都会重建这个 Text
        Text('Header'),  // 虽然内容不变，但会重建
        
        Text('Count: $_counter'),
        
        ElevatedButton(
          onPressed: () => setState(() => _counter++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

---

## StatefulWidget 完整生命周期

```dart
class LifecycleDemo extends StatefulWidget {
  const LifecycleDemo({super.key});
  
  @override
  State<LifecycleDemo> createState() => _LifecycleDemoState();
}

class _LifecycleDemoState extends State<LifecycleDemo> {
  // 1. 构造函数（只调用一次）
  _LifecycleDemoState() {
    print('1. Constructor');
  }
  
  // 2. initState - 组件创建时调用（只调用一次）
  @override
  void initState() {
    super.initState();
    print('2. initState');
    // 适合：初始化数据、订阅事件、启动定时器
  }
  
  // 3. didChangeDependencies - 依赖变化时调用
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('3. didChangeDependencies');
    // 适合：依赖 InheritedWidget 的初始化
  }
  
  // 4. build - 构建 UI（多次调用）
  @override
  Widget build(BuildContext context) {
    print('4. build');
    return Container();
  }
  
  // 5. didUpdateWidget - 父组件重建导致配置变化
  @override
  void didUpdateWidget(LifecycleDemo oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('5. didUpdateWidget');
  }
  
  // 6. setState - 手动触发重建
  void _updateState() {
    setState(() {
      print('6. setState called');
    });
  }
  
  // 7. deactivate - 组件从树中移除（但可能重新插入）
  @override
  void deactivate() {
    print('7. deactivate');
    super.deactivate();
  }
  
  // 8. dispose - 组件永久销毁
  @override
  void dispose() {
    print('8. dispose');
    // 适合：清理资源、取消订阅、停止定时器
    super.dispose();
  }
}
```

### 生命周期图示
```
创建阶段：
Constructor → initState → didChangeDependencies → build

更新阶段（循环）：
setState → build
didUpdateWidget → build
didChangeDependencies → build

销毁阶段：
deactivate → dispose
```

---

## 常用基础 Widget

### 1. 文本组件

```dart
// ========== Text - 普通文本组件 ==========
Text(
  'Hello Flutter',
  // style: 文本样式，TextStyle 对象
  style: TextStyle(
    fontSize: 20,              // 字体大小（逻辑像素）
    fontWeight: FontWeight.bold, // 字重：normal, bold, w100-w900
    color: Colors.blue,        // 文字颜色
    letterSpacing: 1.5,        // 字母间距
    wordSpacing: 2.0,          // 单词间距
    height: 1.5,               // 行高倍数（1.5 = 1.5倍行高）
    decoration: TextDecoration.underline, // 装饰：underline, lineThrough, overline
    decorationColor: Colors.red,  // 装饰线颜色
    fontFamily: 'Roboto',      // 字体（需在 pubspec.yaml 中配置）
  ),
  // textAlign: 文本对齐方式
  textAlign: TextAlign.center,  // left, right, center, justify
  
  // maxLines: 最大行数
  maxLines: 2,
  
  // overflow: 溢出处理
  overflow: TextOverflow.ellipsis,  // ellipsis(...), clip(裁剪), fade(渐变)
  
  // softWrap: 是否自动换行
  softWrap: true,  // false 则不换行
)

// ========== 常用文本样式示例 ==========
Text(
  'Title Text',
  style: Theme.of(context).textTheme.headlineLarge, // 使用主题样式
)

Text(
  'Body Text',
  style: Theme.of(context).textTheme.bodyMedium,
)

// ========== RichText - 富文本（不同样式的文本混合） ==========
RichText(
  // text: 必须是 TextSpan 对象
  text: TextSpan(
    // 默认样式（作用于所有子 TextSpan）
    style: TextStyle(
      color: Colors.black,
      fontSize: 16,
    ),
    // children: 子文本片段数组
    children: [
      TextSpan(text: 'Hello '),  // 使用默认样式
      
      TextSpan(
        text: 'Flutter',
        style: TextStyle(
          color: Colors.blue,
          fontWeight: FontWeight.bold,
          fontSize: 20,  // 覆盖默认大小
        ),
      ),
      
      TextSpan(text: ' and '),
      
      TextSpan(
        text: 'Dart',
        style: TextStyle(
          color: Colors.green,
          fontStyle: FontStyle.italic,
        ),
        // recognizer: 可以添加手势识别
        // recognizer: TapGestureRecognizer()
        //   ..onTap = () {
        //     print('Dart tapped');
        //   },
      ),
    ],
  ),
)

// ========== Text.rich - RichText 的便捷写法 ==========
Text.rich(
  TextSpan(
    children: [
      TextSpan(text: 'Price: '),
      TextSpan(
        text: '\$99.99',
        style: TextStyle(
          color: Colors.red,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
      ),
    ],
  ),
)

// ========== SelectableText - 可选择复制的文本 ==========
SelectableText(
  'This text can be selected and copied',
  style: TextStyle(fontSize: 16),
  // 用户可以长按选择并复制文本
)

// ========== 性能提示 ==========
// 1. 使用 const 构造函数可以提升性能
const Text('Static text');

// 2. 复杂样式优先考虑 RichText
// 3. 大量文本考虑使用 ListView 分段显示
```

**文本相关知识扩展**：

1. **字体配置**（pubspec.yaml）：
```yaml
flutter:
  fonts:
    - family: CustomFont
      fonts:
        - asset: fonts/CustomFont-Regular.ttf
        - asset: fonts/CustomFont-Bold.ttf
          weight: 700
```

2. **主题文本样式**：
- `displayLarge/Medium/Small`：超大标题
- `headlineLarge/Medium/Small`：页面标题
- `titleLarge/Medium/Small`：组件标题
- `bodyLarge/Medium/Small`：正文
- `labelLarge/Medium/Small`：按钮、标签

### 2. 按钮组件

```dart
// ========== ElevatedButton - 凸起按钮（Material Design） ==========
ElevatedButton(
  // onPressed: 点击回调
  // null 时按钮禁用，会自动显示禁用样式
  onPressed: () {
    print('Button pressed');
  },
  
  // onLongPress: 长按回调（可选）
  onLongPress: () {
    print('Button long pressed');
  },
  
  // child: 按钮内容（必需）
  child: Text('Elevated Button'),
  
  // style: 按钮样式
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.blue,      // 背景色（旧版本用 primary）
    foregroundColor: Colors.white,     // 前景色/文字色（旧版本用 onPrimary）
    
    // 阴影高度
    elevation: 5,                      // 默认 2
    
    // 内边距
    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
    
    // 最小尺寸
    minimumSize: Size(100, 48),
    
    // 形状
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),  // 圆角
    ),
    
    // 文字样式
    textStyle: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.bold,
    ),
  ),
)

// 禁用状态示例
ElevatedButton(
  onPressed: null,  // null = 禁用
  child: Text('Disabled Button'),
)

// 图标 + 文字按钮
ElevatedButton.icon(
  onPressed: () {},
  icon: Icon(Icons.send),  // 图标在文字前面
  label: Text('Send'),     // 文字标签
)

// ========== TextButton - 文本按钮（扁平，无背景） ==========
TextButton(
  onPressed: () {},
  child: Text('Text Button'),
  
  style: TextButton.styleFrom(
    foregroundColor: Colors.blue,  // 文字和图标颜色
    padding: EdgeInsets.all(16),
    
    // 覆盖层颜色（按下时的波纹效果）
    overlayColor: Colors.blue.withOpacity(0.1),
    
    // 文字样式
    textStyle: TextStyle(fontSize: 16),
  ),
)

// 带图标的文本按钮
TextButton.icon(
  onPressed: () {},
  icon: Icon(Icons.download),
  label: Text('Download'),
)

// ========== OutlinedButton - 边框按钮 ==========
OutlinedButton(
  onPressed: () {},
  child: Text('Outlined Button'),
  
  style: OutlinedButton.styleFrom(
    foregroundColor: Colors.blue,  // 文字和边框颜色
    
    // 边框样式
    side: BorderSide(
      color: Colors.blue,
      width: 2,
    ),
    
    // 形状
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    
    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
  ),
)

// 带图标的边框按钮
OutlinedButton.icon(
  onPressed: () {},
  icon: Icon(Icons.add),
  label: Text('Add'),
)

// ========== IconButton - 纯图标按钮 ==========
IconButton(
  // icon: 图标（必需）
  icon: Icon(Icons.favorite),
  
  // onPressed: 点击回调
  onPressed: () {
    print('Icon button pressed');
  },
  
  // color: 图标颜色
  color: Colors.red,
  
  // iconSize: 图标大小
  iconSize: 30,
  
  // tooltip: 长按提示
  tooltip: 'Add to favorites',
  
  // splashColor: 点击波纹颜色
  splashColor: Colors.red.withOpacity(0.3),
  
  // padding: 内边距
  padding: EdgeInsets.all(8),
)

// 带背景的图标按钮
IconButton(
  onPressed: () {},
  icon: Icon(Icons.delete),
  style: IconButton.styleFrom(
    backgroundColor: Colors.red,     // 背景色
    foregroundColor: Colors.white,   // 图标颜色
  ),
)

// ========== FilledButton - 填充按钮（Flutter 3.7+） ==========
FilledButton(
  onPressed: () {},
  child: Text('Filled Button'),
  // 类似 ElevatedButton，但更符合 Material Design 3
)

// ========== FloatingActionButton - 悬浮操作按钮 ==========
FloatingActionButton(
  onPressed: () {},
  child: Icon(Icons.add),
  
  // backgroundColor: 背景色
  backgroundColor: Colors.blue,
  
  // foregroundColor: 图标颜色
  foregroundColor: Colors.white,
  
  // elevation: 阴影高度
  elevation: 6,
  
  // shape: 形状
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(16),
  ),
  
  // tooltip: 提示文字
  tooltip: 'Add item',
)

// 扩展的 FAB（带文字）
FloatingActionButton.extended(
  onPressed: () {},
  icon: Icon(Icons.add),
  label: Text('Create'),
)

// ========== PopupMenuButton - 弹出菜单按钮 ==========
PopupMenuButton<String>(
  // itemBuilder: 构建菜单项
  itemBuilder: (BuildContext context) => [
    PopupMenuItem(
      value: 'edit',
      child: Row(
        children: [
          Icon(Icons.edit),
          SizedBox(width: 8),
          Text('Edit'),
        ],
      ),
    ),
    PopupMenuItem(
      value: 'delete',
      child: Row(
        children: [
          Icon(Icons.delete),
          SizedBox(width: 8),
          Text('Delete'),
        ],
      ),
    ),
  ],
  
  // onSelected: 选中回调
  onSelected: (String value) {
    print('Selected: $value');
  },
  
  // icon: 自定义图标
  icon: Icon(Icons.more_vert),
)

// ========== DropdownButton - 下拉按钮 ==========
class DropdownExample extends StatefulWidget {
  @override
  State<DropdownExample> createState() => _DropdownExampleState();
}

class _DropdownExampleState extends State<DropdownExample> {
  String _selectedValue = 'Option 1';
  
  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      // value: 当前选中的值
      value: _selectedValue,
      
      // items: 下拉选项列表
      items: ['Option 1', 'Option 2', 'Option 3']
          .map((String value) => DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              ))
          .toList(),
      
      // onChanged: 选择改变回调
      onChanged: (String? newValue) {
        setState(() {
          _selectedValue = newValue!;
        });
      },
      
      // hint: 提示文字（value 为 null 时显示）
      hint: Text('Please select'),
      
      // isExpanded: 是否占满宽度
      isExpanded: true,
    );
  }
}
```

**按钮相关知识扩展**：

1. **按钮选择指南**：
   - **ElevatedButton**：主要操作（如提交表单）
   - **TextButton**：次要操作（如取消、跳过）
   - **OutlinedButton**：中等重要的操作
   - **IconButton**：工具栏、应用栏中的操作
   - **FloatingActionButton**：页面的主要操作

2. **全局按钮主题配置**：
```dart
MaterialApp(
  theme: ThemeData(
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        minimumSize: Size(88, 48),
      ),
    ),
  ),
)
```

3. **自定义按钮**：
```dart
// 使用 InkWell 创建自定义按钮
InkWell(
  onTap: () {},
  child: Container(
    padding: EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Colors.blue,
      borderRadius: BorderRadius.circular(8),
    ),
    child: Text('Custom Button'),
  ),
)
```

### 3. 输入组件

```dart
// ========== TextField - 基础文本输入框 ==========
class TextFieldExample extends StatefulWidget {
  @override
  State<TextFieldExample> createState() => _TextFieldExampleState();
}

class _TextFieldExampleState extends State<TextFieldExample> {
  // TextEditingController: 控制器，用于：
  // 1. 获取输入内容
  // 2. 设置初始值
  // 3. 监听文本变化
  // 4. 清空输入
  final TextEditingController _controller = TextEditingController();
  
  @override
  void initState() {
    super.initState();
    
    // 设置初始值
    _controller.text = 'Initial value';
    
    // 监听文本变化
    _controller.addListener(() {
      print('Text changed: ${_controller.text}');
    });
  }
  
  @override
  void dispose() {
    // ⚠️ 重要：必须释放控制器，防止内存泄漏
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return TextField(
      // controller: 控制器
      controller: _controller,
      
      // decoration: 装饰（边框、图标、提示等）
      decoration: InputDecoration(
        // labelText: 标签（浮动提示）
        labelText: 'Username',
        
        // hintText: 占位符提示
        hintText: 'Enter your username',
        
        // helperText: 辅助文本（输入框下方）
        helperText: 'Must be 3-20 characters',
        
        // prefixIcon: 前缀图标
        prefixIcon: Icon(Icons.person),
        
        // suffixIcon: 后缀图标（常用于清空、密码可见性切换）
        suffixIcon: IconButton(
          icon: Icon(Icons.clear),
          onPressed: () {
            _controller.clear();  // 清空输入
          },
        ),
        
        // prefix/suffix: 前缀/后缀文本
        prefix: Text('@'),
        
        // border: 边框样式
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        
        // 聚焦时的边框
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.blue, width: 2),
        ),
        
        // 错误时的边框
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.red, width: 2),
        ),
        
        // 填充
        filled: true,
        fillColor: Colors.grey[100],
        
        // contentPadding: 内边距
        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
      
      // keyboardType: 键盘类型
      keyboardType: TextInputType.text,  // text, number, email, phone, url 等
      
      // textInputAction: 键盘动作按钮
      textInputAction: TextInputAction.next,  // next, done, search, send 等
      
      // onChanged: 文本改变回调
      onChanged: (String value) {
        print('Input: $value');
      },
      
      // onSubmitted: 提交回调（按下键盘的"完成"按钮）
      onSubmitted: (String value) {
        print('Submitted: $value');
      },
      
      // maxLines: 最大行数
      maxLines: 1,  // null 表示不限制
      
      // maxLength: 最大字符数
      maxLength: 20,
      
      // obscureText: 是否隐藏文本（用于密码输入）
      obscureText: false,
      
      // enabled: 是否启用
      enabled: true,
      
      // autofocus: 是否自动聚焦
      autofocus: false,
      
      // style: 文本样式
      style: TextStyle(fontSize: 16),
    );
  }
}

// ========== 常见输入框样式 ==========

// 1. 密码输入框
class PasswordField extends StatefulWidget {
  @override
  State<PasswordField> createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  bool _obscureText = true;  // 控制密码可见性
  
  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: _obscureText,
      decoration: InputDecoration(
        labelText: 'Password',
        prefixIcon: Icon(Icons.lock),
        suffixIcon: IconButton(
          icon: Icon(
            _obscureText ? Icons.visibility : Icons.visibility_off,
          ),
          onPressed: () {
            setState(() {
              _obscureText = !_obscureText;  // 切换可见性
            });
          },
        ),
        border: OutlineInputBorder(),
      ),
    );
  }
}

// 2. 搜索框
TextField(
  decoration: InputDecoration(
    hintText: 'Search...',
    prefixIcon: Icon(Icons.search),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(24),
    ),
    filled: true,
    contentPadding: EdgeInsets.zero,
  ),
)

// 3. 多行输入框
TextField(
  maxLines: 5,
  minLines: 3,
  decoration: InputDecoration(
    labelText: 'Description',
    alignedLabelStyle: false,
    border: OutlineInputBorder(),
  ),
)

// 4. 数字输入框
TextField(
  keyboardType: TextInputType.number,
  decoration: InputDecoration(
    labelText: 'Age',
    prefixIcon: Icon(Icons.cake),
  ),
)

// ========== TextFormField - 带表单验证的输入框 ==========
class FormExample extends StatefulWidget {
  @override
  State<FormExample> createState() => _FormExampleState();
}

class _FormExampleState extends State<FormExample> {
  // GlobalKey: 用于访问 Form 的状态
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  
  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(
              labelText: 'Email',
              prefixIcon: Icon(Icons.email),
              border: OutlineInputBorder(),
            ),
            
            // validator: 验证函数
            // 返回 null 表示验证通过
            // 返回字符串表示错误信息
            validator: (String? value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your email';
              }
              
              // 正则表达式验证邮箱格式
              final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
              if (!emailRegex.hasMatch(value)) {
                return 'Please enter a valid email';
              }
              
              return null;  // 验证通过
            },
            
            // autovalidateMode: 自动验证模式
            // - disabled: 不自动验证
            // - always: 始终验证
            // - onUserInteraction: 用户交互后验证
            autovalidateMode: AutovalidateMode.onUserInteraction,
          ),
          
          SizedBox(height: 16),
          
          ElevatedButton(
            onPressed: () {
              // 触发表单验证
              if (_formKey.currentState!.validate()) {
                // 所有字段验证通过
                print('Form is valid');
                print('Email: ${_emailController.text}');
              }
            },
            child: Text('Submit'),
          ),
        ],
      ),
    );
  }
}
```

**输入组件知识扩展**：

1. **键盘类型（keyboardType）**：
   - `TextInputType.text`：普通文本
   - `TextInputType.number`：数字
   - `TextInputType.phone`：电话号码
   - `TextInputType.emailAddress`：邮箱
   - `TextInputType.url`：URL
   - `TextInputType.multiline`：多行文本

2. **文本输入动作（textInputAction）**：
   - `TextInputAction.next`：下一个（跳转到下个输入框）
   - `TextInputAction.done`：完成
   - `TextInputAction.search`：搜索
   - `TextInputAction.send`：发送
   - `TextInputAction.go`：前往

3. **输入格式化**：
```dart
import 'package:flutter/services.dart';

TextField(
  inputFormatters: [
    // 只允许数字
    FilteringTextInputFormatter.digitsOnly,
    
    // 限制长度
    LengthLimitingTextInputFormatter(10),
    
    // 自定义格式化（如电话号码）
    TextInputFormatter.withFunction((oldValue, newValue) {
      // 自定义逻辑
      return newValue;
    }),
  ],
)
```

4. **焦点管理**：
```dart
class FocusExample extends StatefulWidget {
  @override
  State<FocusExample> createState() => _FocusExampleState();
}

class _FocusExampleState extends State<FocusExample> {
  final FocusNode _focusNode1 = FocusNode();
  final FocusNode _focusNode2 = FocusNode();
  
  @override
  void dispose() {
    _focusNode1.dispose();
    _focusNode2.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          focusNode: _focusNode1,
          decoration: InputDecoration(labelText: 'Field 1'),
          textInputAction: TextInputAction.next,
          onSubmitted: (_) {
            // 按下"下一个"时，聚焦到下个输入框
            FocusScope.of(context).requestFocus(_focusNode2);
          },
        ),
        TextField(
          focusNode: _focusNode2,
          decoration: InputDecoration(labelText: 'Field 2'),
        ),
        ElevatedButton(
          onPressed: () {
            // 手动控制焦点
            _focusNode1.requestFocus();
          },
          child: Text('Focus Field 1'),
        ),
      ],
    );
  }
}
```

### 4. 图片组件
```dart
// 网络图片
Image.network('https://example.com/image.png')

// 本地资源图片
Image.asset('assets/images/logo.png')

// 带加载和错误处理
Image.network(
  'https://example.com/image.png',
  loadingBuilder: (context, child, loadingProgress) {
    if (loadingProgress == null) return child;
    return CircularProgressIndicator();
  },
  errorBuilder: (context, error, stackTrace) {
    return Icon(Icons.error);
  },
)
```

### 5. 图标组件
```dart
Icon(Icons.home, size: 30, color: Colors.blue)
```

### 6. 开关和选择组件
```dart
// Switch - 开关
Switch(
  value: _isSwitched,
  onChanged: (value) {
    setState(() {
      _isSwitched = value;
    });
  },
)

// Checkbox - 复选框
Checkbox(
  value: _isChecked,
  onChanged: (value) {
    setState(() {
      _isChecked = value!;
    });
  },
)

// Radio - 单选框
Radio<String>(
  value: 'option1',
  groupValue: _selectedOption,
  onChanged: (value) {
    setState(() {
      _selectedOption = value!;
    });
  },
)
```

---

## 异步编程

### Future 基础
```dart
// 创建 Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data loaded';
}

// 使用 Future
void loadData() async {
  try {
    String data = await fetchData();
    print(data);
  } catch (e) {
    print('Error: $e');
  }
}

// FutureBuilder - 在 Widget 中使用，Flutter 提供的 Widget，用于在界面中处理 Future 的状态变化
FutureBuilder<String>(
  future: fetchData(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return CircularProgressIndicator();
    }
    if (snapshot.hasError) {
      return Text('Error: ${snapshot.error}');
    }
    return Text('Data: ${snapshot.data}');
  },
)
```

### Stream 基础
yield 是 Dart 中用于生成器函数的关键字，让我详细解释它的作用：用于在生成器函数中逐个产生值，而不是一次性返回所有值
```dart
// 创建 Stream
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// StreamBuilder - 在 Widget 中使用
StreamBuilder<int>(
  stream: countStream(),
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text('Count: ${snapshot.data}');
    }
    return CircularProgressIndicator();
  },
)
```

### async/await 最佳实践
```dart
// ✅ 正确：并行执行
Future<void> loadMultipleData() async {
  final results = await Future.wait([
    fetchData1(),
    fetchData2(),
    fetchData3(),
  ]);
}

// ❌ 错误：串行执行（慢）
Future<void> loadMultipleDataWrong() async {
  final data1 = await fetchData1(); // 等待
  final data2 = await fetchData2(); // 再等待
  final data3 = await fetchData3(); // 又等待
}
```

---

## 网络请求

### 标准方案：Dio

**为什么选择 Dio？**
- ✅ 功能强大：拦截器、全局配置、文件上传下载
- ✅ 错误处理完善
- ✅ 社区成熟：GitHub 12k+ Star
- ✅ 企业级标准

```yaml
dependencies:
  dio: ^5.4.0
```

---

### 企业级网络请求架构

#### 1. 基础配置类

```dart
import 'package:dio/dio.dart';

// ========== HTTP 配置类 ==========
class HttpConfig {
  // API 基础地址
  static const String baseUrl = 'https://api.example.com';
  
  // 超时时间（毫秒）
  static const int connectTimeout = 30000;  // 30秒
  static const int receiveTimeout = 30000;  // 30秒
  static const int sendTimeout = 30000;     // 30秒
  
  // 请求头
  static Map<String, dynamic> get headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

// ========== Dio 单例封装 ==========
class DioClient {
  // 单例模式
  static final DioClient _instance = DioClient._internal();
  factory DioClient() => _instance;
  
  late final Dio dio;
  
  DioClient._internal() {
    // 创建 Dio 实例
    dio = Dio(
      BaseOptions(
        baseUrl: HttpConfig.baseUrl,
        connectTimeout: Duration(milliseconds: HttpConfig.connectTimeout),
        receiveTimeout: Duration(milliseconds: HttpConfig.receiveTimeout),
        sendTimeout: Duration(milliseconds: HttpConfig.sendTimeout),
        headers: HttpConfig.headers,
        
        // 响应类型：json, stream, plain, bytes
        responseType: ResponseType.json,
        
        // 内容类型
        contentType: Headers.jsonContentType,
      ),
    );
    
    // 添加拦截器
    _setupInterceptors();
  }
  
  // ========== 配置拦截器 ==========
  void _setupInterceptors() {
    dio.interceptors.add(
      InterceptorsWrapper(
        // 请求拦截器
        onRequest: (options, handler) {
          print('┌────── Request ──────');
          print('│ ${options.method} ${options.path}');
          print('│ Headers: ${options.headers}');
          print('│ Data: ${options.data}');
          print('└─────────────────────');
          
          // 添加 Token（如果有）
          // final token = StorageUtil.getToken();
          // if (token != null) {
          //   options.headers['Authorization'] = 'Bearer $token';
          // }
          
          // 继续请求
          handler.next(options);
        },
        
        // 响应拦截器
        onResponse: (response, handler) {
          print('┌────── Response ──────');
          print('│ ${response.statusCode} ${response.requestOptions.path}');
          print('│ Data: ${response.data}');
          print('└──────────────────────');
          
          // 继续响应
          handler.next(response);
        },
        
        // 错误拦截器
        onError: (error, handler) {
          print('┌────── Error ──────');
          print('│ ${error.type}');
          print('│ ${error.message}');
          print('│ ${error.response?.statusCode}');
          print('└───────────────────');
          
          // 统一错误处理
          _handleError(error);
          
          // 继续错误
          handler.next(error);
        },
      ),
    );
  }
  
  // ========== 统一错误处理 ==========
  void _handleError(DioException error) {
    String errorMessage;
    
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
        errorMessage = '连接超时';
        break;
      case DioExceptionType.sendTimeout:
        errorMessage = '请求超时';
        break;
      case DioExceptionType.receiveTimeout:
        errorMessage = '响应超时';
        break;
      case DioExceptionType.badResponse:
        // 根据状态码处理
        final statusCode = error.response?.statusCode;
        switch (statusCode) {
          case 400:
            errorMessage = '请求参数错误';
            break;
          case 401:
            errorMessage = '未授权，请重新登录';
            // 可以在这里跳转到登录页
            // Get.offAllNamed('/login');
            break;
          case 403:
            errorMessage = '拒绝访问';
            break;
          case 404:
            errorMessage = '请求资源不存在';
            break;
          case 500:
            errorMessage = '服务器内部错误';
            break;
          case 502:
            errorMessage = '网关错误';
            break;
          case 503:
            errorMessage = '服务不可用';
            break;
          default:
            errorMessage = '请求失败：$statusCode';
        }
        break;
      case DioExceptionType.cancel:
        errorMessage = '请求已取消';
        break;
      case DioExceptionType.unknown:
        if (error.message?.contains('SocketException') ?? false) {
          errorMessage = '网络连接失败';
        } else {
          errorMessage = '未知错误';
        }
        break;
      default:
        errorMessage = '网络请求出错';
    }
    
    // 显示错误提示（使用你的提示组件）
    print('Error: $errorMessage');
    // 或者使用 GetX
    // Get.snackbar('错误', errorMessage);
  }
}
```

---

#### 2. API 服务封装

```dart
// ========== API 响应统一格式 ==========
class ApiResponse<T> {
  final int code;
  final String message;
  final T? data;
  
  ApiResponse({
    required this.code,
    required this.message,
    this.data,
  });
  
  // 判断是否成功
  bool get isSuccess => code == 200;
  
  // 从 JSON 创建
  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic)? fromJsonT,
  ) {
    return ApiResponse<T>(
      code: json['code'] ?? 0,
      message: json['message'] ?? '',
      data: fromJsonT != null && json['data'] != null
          ? fromJsonT(json['data'])
          : json['data'],
    );
  }
}

// ========== API 服务基类 ==========
class ApiService {
  final DioClient _dioClient = DioClient();
  
  // GET 请求
  Future<ApiResponse<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dioClient.dio.get(
        path,
        queryParameters: queryParameters,
        options: options,
      );
      
      return ApiResponse.fromJson(response.data, fromJson);
    } on DioException catch (e) {
      throw _handleException(e);
    }
  }
  
  // POST 请求
  Future<ApiResponse<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dioClient.dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      
      return ApiResponse.fromJson(response.data, fromJson);
    } on DioException catch (e) {
      throw _handleException(e);
    }
  }
  
  // PUT 请求
  Future<ApiResponse<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dioClient.dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      
      return ApiResponse.fromJson(response.data, fromJson);
    } on DioException catch (e) {
      throw _handleException(e);
    }
  }
  
  // DELETE 请求
  Future<ApiResponse<T>> delete<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final response = await _dioClient.dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      
      return ApiResponse.fromJson(response.data, fromJson);
    } on DioException catch (e) {
      throw _handleException(e);
    }
  }
  
  // 文件上传
  Future<ApiResponse<T>> upload<T>(
    String path,
    String filePath, {
    String? fileName,
    Map<String, dynamic>? data,
    ProgressCallback? onSendProgress,
    T Function(dynamic)? fromJson,
  }) async {
    try {
      final formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          filePath,
          filename: fileName,
        ),
        ...?data,
      });
      
      final response = await _dioClient.dio.post(
        path,
        data: formData,
        onSendProgress: onSendProgress,
      );
      
      return ApiResponse.fromJson(response.data, fromJson);
    } on DioException catch (e) {
      throw _handleException(e);
    }
  }
  
  // 文件下载
  Future<void> download(
    String urlPath,
    String savePath, {
    ProgressCallback? onReceiveProgress,
    CancelToken? cancelToken,
  }) async {
    try {
      await _dioClient.dio.download(
        urlPath,
        savePath,
        onReceiveProgress: onReceiveProgress,
        cancelToken: cancelToken,
      );
    } on DioException catch (e) {
      throw _handleException(e);
    }
  }
  
  // 异常处理
  Exception _handleException(DioException error) {
    return Exception(error.message);
  }
}
```

---

#### 3. 具体业务 API

```dart
// ========== 用户相关 API ==========
class UserApi {
  final ApiService _apiService = ApiService();
  
  // 登录
  Future<User?> login(String username, String password) async {
    final response = await _apiService.post<User>(
      '/auth/login',
      data: {
        'username': username,
        'password': password,
      },
      fromJson: (json) => User.fromJson(json),
    );
    
    if (response.isSuccess) {
      return response.data;
    }
    throw Exception(response.message);
  }
  
  // 获取用户信息
  Future<User?> getUserInfo(int userId) async {
    final response = await _apiService.get<User>(
      '/users/$userId',
      fromJson: (json) => User.fromJson(json),
    );
    
    if (response.isSuccess) {
      return response.data;
    }
    throw Exception(response.message);
  }
  
  // 更新用户信息
  Future<bool> updateUser(int userId, Map<String, dynamic> data) async {
    final response = await _apiService.put(
      '/users/$userId',
      data: data,
    );
    
    return response.isSuccess;
  }
  
  // 上传头像
  Future<String?> uploadAvatar(String filePath) async {
    final response = await _apiService.upload<Map<String, dynamic>>(
      '/users/avatar',
      filePath,
      onSendProgress: (sent, total) {
        print('上传进度: ${(sent / total * 100).toStringAsFixed(0)}%');
      },
    );
    
    if (response.isSuccess) {
      return response.data?['url'];
    }
    return null;
  }
}

// ========== 数据模型示例 ==========
class User {
  final int id;
  final String username;
  final String email;
  final String? avatar;
  
  User({
    required this.id,
    required this.username,
    required this.email,
    this.avatar,
  });
  
  // 从 JSON 创建
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      avatar: json['avatar'],
    );
  }
  
  // 转换为 JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'email': email,
      'avatar': avatar,
    };
  }
}
```

---

#### 4. 在页面中使用

```dart
class LoginPage extends StatefulWidget {
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final UserApi _userApi = UserApi();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  
  // 登录方法
  Future<void> _login() async {
    if (_usernameController.text.isEmpty ||
        _passwordController.text.isEmpty) {
      // 显示提示
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('请输入用户名和密码')),
      );
      return;
    }
    
    setState(() => _isLoading = true);
    
    try {
      // 调用登录 API
      final user = await _userApi.login(
        _usernameController.text,
        _passwordController.text,
      );
      
      if (user != null) {
        // 登录成功
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('登录成功')),
        );
        
        // 跳转到主页
        Navigator.pushReplacementNamed(context, '/home');
      }
    } catch (e) {
      // 登录失败
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('登录失败: $e')),
      );
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('登录')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(labelText: '用户名'),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: '密码'),
              obscureText: true,
            ),
            SizedBox(height: 24),
            _isLoading
                ? CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _login,
                    child: Text('登录'),
                  ),
          ],
        ),
      ),
    );
  }
  
  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
```

---

### 高级功能

#### 1. 请求取消

```dart
class ProductApi {
  final ApiService _apiService = ApiService();
  CancelToken? _cancelToken;
  
  // 搜索商品（可取消）
  Future<List<Product>> searchProducts(String keyword) async {
    // 取消之前的请求
    _cancelToken?.cancel('新的搜索请求');
    _cancelToken = CancelToken();
    
    final response = await _apiService.get<List<Product>>(
      '/products/search',
      queryParameters: {'keyword': keyword},
      options: Options(cancelToken: _cancelToken),
      fromJson: (json) => (json as List)
          .map((item) => Product.fromJson(item))
          .toList(),
    );
    
    return response.data ?? [];
  }
}
```

#### 2. 并发请求

```dart
// 同时请求多个接口
Future<void> loadAllData() async {
  try {
    final results = await Future.wait([
      _userApi.getUserInfo(userId),
      _productApi.getProducts(),
      _orderApi.getOrders(),
    ]);
    
    final user = results[0] as User?;
    final products = results[1] as List<Product>;
    final orders = results[2] as List<Order>;
    
    // 处理数据
  } catch (e) {
    print('加载数据失败: $e');
  }
}
```

#### 3. 重试机制

```dart
// 添加重试拦截器
dio.interceptors.add(
  RetryInterceptor(
    dio: dio,
    logPrint: print,
    retries: 3,  // 重试次数
    retryDelays: [
      Duration(seconds: 1),
      Duration(seconds: 2),
      Duration(seconds: 3),
    ],
  ),
);
```

---

### 完整项目结构

```
lib/
├── services/
│   ├── http/
│   │   ├── dio_client.dart      # Dio 封装
│   │   ├── http_config.dart     # 配置
│   │   └── api_service.dart     # API 基类
│   │
│   └── api/
│       ├── user_api.dart        # 用户相关 API
│       ├── product_api.dart     # 商品相关 API
│       └── order_api.dart       # 订单相关 API
│
├── models/
│   ├── user.dart                # 用户模型
│   ├── product.dart             # 商品模型
│   └── order.dart               # 订单模型
│
└── pages/
    ├── login_page.dart          # 登录页
    └── home_page.dart           # 主页
```

---

### 最佳实践总结

1. **使用 Dio**：功能强大，是企业级标准
2. **统一封装**：拦截器 + 错误处理
3. **类型安全**：使用泛型和模型类
4. **单例模式**：全局唯一的 Dio 实例
5. **拦截器**：统一添加 Token、日志、错误处理
6. **异常处理**：统一的错误提示
7. **请求取消**：避免不必要的网络请求
8. **加载状态**：显示 loading，提升用户体验

---

### 对比 http 包

**如果你只需要简单请求**，可以用 http 包：

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

// 简单的 GET 请求
Future<Map<String, dynamic>> fetchUser(int id) async {
  final response = await http.get(
    Uri.parse('https://api.example.com/users/$id'),
  );
  
  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load user');
  }
}
```

**但企业项目强烈推荐 Dio！**

---

## 路由导航

### 基础导航
```dart
// 跳转到新页面
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondPage()),
);

// 返回上一页
Navigator.pop(context);

// 返回并传递数据
Navigator.pop(context, 'result data');

// 跳转并接收返回数据
final result = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondPage()),
);
print('Result: $result');
```

### 命名路由
```dart
// 在 MaterialApp 中定义路由
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => HomePage(),
    '/details': (context) => DetailsPage(),
    '/settings': (context) => SettingsPage(),
  },
)

// 使用命名路由跳转
Navigator.pushNamed(context, '/details');

// 传递参数
Navigator.pushNamed(
  context,
  '/details',
  arguments: {'id': 123, 'name': 'John'},
);

// 接收参数
class DetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map;
    return Text('ID: ${args['id']}');
  }
}
```

### 替换路由
```dart
// 替换当前路由（不能返回）
Navigator.pushReplacement(
  context,
  MaterialPageRoute(builder: (context) => NewPage()),
);

// 清空路由栈并跳转
Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(builder: (context) => HomePage()),
  (route) => false, // 移除所有路由
);
```

---

## 状态管理基础

### 1. setState（内部状态）
```dart
class CounterPage extends StatefulWidget {
  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _counter = 0;
  
  void _increment() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Text('$_counter');
  }
}
```

### 2. InheritedWidget（跨组件状态）
```dart
class CounterProvider extends InheritedWidget {
  final int counter;
  final Function() increment;
  
  const CounterProvider({
    required this.counter,
    required this.increment,
    required super.child,
  });
  
  static CounterProvider? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CounterProvider>();
  }
  
  @override
  bool updateShouldNotify(CounterProvider oldWidget) {
    return counter != oldWidget.counter;
  }
}

// 使用
final provider = CounterProvider.of(context);
Text('${provider?.counter}');
```

### 3. Provider 包（推荐新手）
```dart
// pubspec.yaml
// dependencies:
//   provider: ^6.0.0

import 'package:provider/provider.dart';

// 1. 创建数据模型
class Counter with ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners(); // 通知监听者
  }
}

// 2. 在根组件提供数据
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

// 3. 在子组件中使用
class CounterDisplay extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 监听变化
    final counter = context.watch<Counter>();
    return Text('${counter.count}');
  }
}

class IncrementButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 不监听，只调用方法
    final counter = context.read<Counter>();
    return ElevatedButton(
      onPressed: counter.increment,
      child: Text('Increment'),
    );
  }
}
```

---

## 表单处理

### Form + TextFormField
```dart
class MyForm extends StatefulWidget {
  @override
  State<MyForm> createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  
  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }
  
  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // 表单验证通过
      print('Name: ${_nameController.text}');
      print('Email: ${_emailController.text}');
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Form submitted!')),
      );
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: InputDecoration(labelText: 'Name'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your name';
              }
              return null;
            },
          ),
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(labelText: 'Email'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your email';
              }
              if (!value.contains('@')) {
                return 'Please enter a valid email';
              }
              return null;
            },
          ),
          ElevatedButton(
            onPressed: _submitForm,
            child: Text('Submit'),
          ),
        ],
      ),
    );
  }
}
```

---

## 调试方法

### 1. print vs debugPrint
```dart
// print - 普通输出（可能被截断）
print('Hello Flutter');

// debugPrint - 调试输出（不会被截断，推荐）
debugPrint('Debug message: $variable');
```

### 2. log - 结构化日志
```dart
import 'dart:developer' as developer;

developer.log(
  'User logged in',
  name: 'AuthService',
  error: errorObject,
  stackTrace: stackTrace,
);
```

### 3. Flutter DevTools
```dart
// 检查 Widget 树
// 点击 IDE 中的 "Flutter Inspector" 按钮

// 查看性能
// 点击 "Performance" 标签

// 网络请求监控
// 点击 "Network" 标签
```

### 4. 断点调试
```dart
void myFunction() {
  int x = 10;
  // 在这里设置断点（点击行号）
  int y = x * 2;
  print(y);
}
```

### 5. assert - 断言
```dart
void setAge(int age) {
  assert(age >= 0, 'Age must be positive'); // 只在 debug 模式生效
  this.age = age;
}
```

---


## 常用第三方包

### 必备包
```yaml
dependencies:
  # 网络请求
  dio: ^5.0.0
  
  # 状态管理
  provider: ^6.0.0
  # 或者
  riverpod: ^2.0.0
  
  # 本地存储
  shared_preferences: ^2.0.0
  
  # 路由管理
  go_router: ^13.0.0
  
  # JSON 序列化
  json_annotation: ^4.8.0
  
dev_dependencies:
  # JSON 代码生成
  json_serializable: ^6.6.0
  build_runner: ^2.4.0
```

### 常用工具包
```yaml
dependencies:
  # 图片缓存
  cached_network_image: ^3.3.0
  
  # 权限管理
  permission_handler: ^11.0.0
  
  # 日期时间
  intl: ^0.18.0
  
  # 路径操作
  path_provider: ^2.1.0
  
  # 设备信息
  device_info_plus: ^9.1.0
  
  # 图片选择
  image_picker: ^1.0.0
```

---


# Flutter UI 组件库生态 

## Flutter 自带组件概览

Flutter 提供了两套完整的 UI 组件库：

### 1. Material Design 组件（Android 风格）
- **数量**：100+ 个组件
- **设计规范**：Google Material Design 3.0
- **适用**：Android、Web、桌面应用
- **导入**：`import 'package:flutter/material.dart';`

**常用组件**：
- 布局：Scaffold, AppBar, Drawer, BottomNavigationBar
- 按钮：ElevatedButton, TextButton, IconButton, FloatingActionButton
- 输入：TextField, Checkbox, Radio, Switch, Slider
- 显示：Card, Chip, DataTable, Divider, AlertDialog
- 导航：TabBar, NavigationRail, BottomSheet

### 2. Cupertino 组件（iOS 风格）
- **数量**：50+ 个组件
- **设计规范**：Apple Human Interface Guidelines
- **适用**：iOS 应用
- **导入**：`import 'package:flutter/cupertino.dart';`

**常用组件**：
- CupertinoNavigationBar（iOS 导航栏）
- CupertinoTabScaffold（iOS 标签页）
- CupertinoButton（iOS 按钮）
- CupertinoSwitch（iOS 开关）
- CupertinoAlertDialog（iOS 弹窗）

## 常用第三方 UI 组件库

### 1. ⭐ **flutter_screenutil** - 屏幕适配（必备）
```yaml
dependencies:
  flutter_screenutil: ^5.9.0
```

**作用**：解决不同屏幕尺寸适配问题

```dart
import 'package:flutter_screenutil/flutter_screenutil.dart';

// 初始化（在 MaterialApp 前）
ScreenUtil.init(context, designSize: Size(375, 812));

// 使用
Container(
  width: 100.w,      // 相对宽度
  height: 100.h,     // 相对高度
  padding: EdgeInsets.all(10.w),
  child: Text(
    'Hello',
    style: TextStyle(fontSize: 16.sp),  // 相对字体大小
  ),
)
```

### 2. ⭐ **GetX** - 状态管理 + 路由 + 依赖注入（推荐）
```yaml
dependencies:
  get: ^4.6.6
```

**作用**：全能框架，简化开发

```dart
import 'package:get/get.dart';

// 1. 状态管理
class Controller extends GetxController {
  var count = 0.obs;  // 响应式变量
  void increment() => count++;
}

// 使用
Obx(() => Text('Count: ${controller.count}'));

// 2. 路由导航（无需 context）
Get.to(NextPage());
Get.back();

// 3. 弹窗（无需 context）
Get.snackbar('Title', 'Message');
Get.dialog(AlertDialog(...));
```

### 3. ⭐ **flutter_easyloading** - 加载提示（常用）
```yaml
dependencies:
  flutter_easyloading: ^3.0.5
```

**作用**：优雅的加载、成功、错误提示

```dart
// 显示加载
EasyLoading.show(status: 'loading...');

// 显示成功
EasyLoading.showSuccess('Great Success!');

// 显示错误
EasyLoading.showError('Failed with Error');

// 隐藏
EasyLoading.dismiss();
```

### 4. ⭐ **cached_network_image** - 图片缓存（必备）
```yaml
dependencies:
  cached_network_image: ^3.3.0
```

**作用**：网络图片缓存，提升性能

```dart
CachedNetworkImage(
  imageUrl: 'https://example.com/image.png',
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
  fadeInDuration: Duration(milliseconds: 500),
)
```

### 5. **flutter_swiper** - 轮播图
```yaml
dependencies:
  card_swiper: ^3.0.1
```

```dart
Swiper(
  itemBuilder: (context, index) {
    return Image.network(images[index]);
  },
  itemCount: images.length,
  pagination: SwiperPagination(),  // 分页器
  control: SwiperControl(),        // 左右箭头
  autoplay: true,
)
```

### 6. **pull_to_refresh** - 下拉刷新
```yaml
dependencies:
  pull_to_refresh: ^2.0.0
```

```dart
SmartRefresher(
  controller: _refreshController,
  enablePullDown: true,
  enablePullUp: true,
  onRefresh: _onRefresh,
  onLoading: _onLoading,
  child: ListView(...),
)
```

### 7. **fl_chart** - 图表组件
```yaml
dependencies:
  fl_chart: ^0.65.0
```

**作用**：折线图、柱状图、饼图等

```dart
LineChart(
  LineChartData(
    lineBarsData: [
      LineChartBarData(
        spots: [
          FlSpot(0, 1),
          FlSpot(1, 3),
          FlSpot(2, 2),
        ],
      ),
    ],
  ),
)
```

### 8. **flutter_slidable** - 侧滑操作
```yaml
dependencies:
  flutter_slidable: ^3.0.0
```

**作用**：列表项侧滑显示操作按钮（类似微信）

```dart
Slidable(
  startActionPane: ActionPane(
    motion: ScrollMotion(),
    children: [
      SlidableAction(
        onPressed: (context) {},
        backgroundColor: Colors.blue,
        icon: Icons.share,
        label: 'Share',
      ),
    ],
  ),
  endActionPane: ActionPane(
    motion: ScrollMotion(),
    children: [
      SlidableAction(
        onPressed: (context) {},
        backgroundColor: Colors.red,
        icon: Icons.delete,
        label: 'Delete',
      ),
    ],
  ),
  child: ListTile(title: Text('Slide me')),
)
```

### 9. **flutter_staggered_grid_view** - 瀑布流
```yaml
dependencies:
  flutter_staggered_grid_view: ^0.7.0
```

```dart
MasonryGridView.count(
  crossAxisCount: 2,
  itemCount: items.length,
  itemBuilder: (context, index) {
    return Card(
      child: Image.network(items[index]),
    );
  },
)
```

### 10. **flutter_picker** - 选择器
```yaml
dependencies:
  flutter_picker: ^2.1.0
```

**作用**：iOS 风格的滚动选择器

```dart
Picker(
  adapter: PickerDataAdapter<String>(
    pickerData: ['Option 1', 'Option 2', 'Option 3'],
  ),
  onConfirm: (picker, value) {
    print(picker.getSelectedValues());
  },
).showDialog(context);
```

### 11. **photo_view** - 图片查看器
```yaml
dependencies:
  photo_view: ^0.14.0
```

**作用**：支持缩放、平移的图片查看器

```dart
PhotoView(
  imageProvider: NetworkImage('https://example.com/image.png'),
  minScale: PhotoViewComputedScale.contained,
  maxScale: PhotoViewComputedScale.covered * 2,
)
```

### 12. **flutter_svg** - SVG 支持
```yaml
dependencies:
  flutter_svg: ^2.0.9
```

```dart
SvgPicture.asset(
  'assets/images/icon.svg',
  width: 100,
  height: 100,
  color: Colors.blue,
)
```

---



## 推荐

第 1 周：只用 Material 组件
         ↓
第 2-3 周：+ flutter_screenutil（屏幕适配）
         ↓
第 4 周：+ cached_network_image（图片优化）
         ↓
第 5 周：+ flutter_easyloading（交互优化）


# record
- Transform.scale 只是视觉变换，不参与布局计算，布局引擎仍认为海报占用 750px 宽度（远超手机屏幕的 ~375px），导致被压缩；而 FittedBox 参与布局过程，它告诉布局引擎"我只占用父容器分配的空间（比如 343px）"，然后智能地将 750x1334 的海报缩放到这个空间内显示，布局和视觉完全匹配，所以正常了