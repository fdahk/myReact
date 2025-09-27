Flutter 的样式系统特点：

1. **一体化**：不需要分离的 HTML/CSS，所有样式都在 Dart 代码中
2. **类型安全**：编译时检查，减少样式错误
3. **组件化**：每个 Widget 都包含结构和样式
4. **响应式**：内置响应式设计支持
5. **主题化**：统一的主题管理系统
6. **性能优化**：编译时优化，运行时高效

这种方式让前端开发更加统一和高效，不需要在多种语言和文件之间切换！

大厂常用的系统变化导致重建的性能优化技术：
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

  3.