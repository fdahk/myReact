import 'package:flutter/widgets.dart';

class CounterScope extends InheritedWidget {
  // `const` 构造函数表示：如果入参都是编译期常量，这个对象本身也可以成为常量对象。
  // InheritedWidget 常作为“配置型节点”存在，支持 const 一般是好事，
  // 因为它更符合 Flutter “Widget 是轻量不可变配置”的设计思想。
  const CounterScope({
    super.key,
    // `required` 表示调用构造函数时必须显式传这个参数。
    // 这里要求外部把当前 count 传进来，说明这个 InheritedWidget 本身不负责“修改状态”，
    // 它只负责“向后代暴露状态”。
    required this.count,
    required super.child,
  });

  // 这里保存的是要共享给后代树的最小状态。
  // 为什么用 `final`：
  // 因为 Widget 本身应该是不可变配置，变化时应创建新 Widget，而不是直接修改旧 Widget 字段。
  final int count;

  static CounterScope of(BuildContext context) {
    // `dependOnInheritedWidgetOfExactType<T>()` 有两个重要语义：
    // 1. 读取最近的 `CounterScope`
    // 2. 建立“依赖关系”
    //
    // 一旦建立依赖，后续如果这个 InheritedWidget 判断“值得通知”，
    // 当前 context 对应的后代就会触发 rebuild。
    final result =
        context.dependOnInheritedWidgetOfExactType<CounterScope>();

    // `assert` 只在 debug 模式下生效。
    // 这里的作用是：如果开发者忘了在祖先树里提供 CounterScope，
    // 就在开发阶段立刻报出更友好的错误，而不是后面空指针。
    assert(result != null, 'No CounterScope found in context');
    return result!;
  }

  @override
  bool updateShouldNotify(covariant CounterScope oldWidget) {
    // `covariant` 的意思可以简单理解成：
    // 这里我明确告诉 Dart，传进来的 oldWidget 应该按 CounterScope 这个更具体的类型来用。
    //
    // `updateShouldNotify` 是 InheritedWidget 最关键的方法：
    // 它决定“依赖这个 InheritedWidget 的后代，要不要因为这次新旧 Widget 变化而收到更新信号”。
    //
    // 这里比较 oldWidget.count 和当前 count：
    // - 如果值没变，返回 false，后代没必要因为这个共享状态 rebuild。
    // - 如果值变了，返回 true，依赖它的后代就应该感知这次变化。
    return oldWidget.count != count;
  }
}

/*
面试讲解点：
1. 这题本质是在手写最小 InheritedWidget 共享依赖。
2. 核心不只是 of()，而是 updateShouldNotify 决定哪些依赖它的后代需要感知变化。
3. 很适合拿来讲为什么很多状态管理方案底层都离不开类似依赖传播机制。

怎么使用：
1. 在更高层包一层 `CounterScope(count: 1, child: MyPage())`。
2. 在后代页面里通过 `CounterScope.of(context).count` 读取共享值。
3. 当上层重新创建了一个新的 CounterScope 且 count 发生变化时，依赖它的后代会触发更新。

为什么这样设计：
1. InheritedWidget 解决的不是“状态存储”，而是“状态向后代传播”。
2. 它非常适合做共享依赖注入，例如主题、配置、路由信息、状态容器入口。
3. Provider 这类方案之所以常见，本质上就是在 InheritedWidget 基础上补了更好用的 API 和生命周期管理。
*/
