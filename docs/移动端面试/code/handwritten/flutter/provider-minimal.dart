import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';

class CounterNotifier extends ChangeNotifier {
  // `_count` 前面的下划线表示“库私有”。
  // 在 Dart 里，下划线不是类私有，而是当前文件/库作用域私有。
  int _count = 0;

  // `get count => _count;` 是 getter 的简写写法。
  // 外部可以像访问属性一样访问 count，但实际上底层会走这个 getter。
  // 这样做的好处是：外部只能读，不能随意改 `_count`。
  int get count => _count;

  void increment() {
    // 这里直接修改内部状态。
    _count += 1;

    // `notifyListeners()` 是 ChangeNotifier 最核心的方法。
    // 含义是：告诉所有注册到这个 notifier 上的监听者，“状态变了，可以重新评估 UI 了”。
    notifyListeners();
  }
}

class CounterProvider extends InheritedNotifier<CounterNotifier> {
  // `InheritedNotifier<T>` 可以看成 “InheritedWidget + Listenable” 的组合版。
  // 它比裸 InheritedWidget 更适合配合 ChangeNotifier 一起使用，
  // 因为当 notifier 自己发通知时，依赖它的后代也能自动感知。
  const CounterProvider({
    super.key,
    required CounterNotifier notifier,
    required super.child,
  }) : super(notifier: notifier);

  static CounterNotifier watch(BuildContext context) {
    // `watch` 的语义是“读取并建立依赖”。
    // 这里调用 dependOnInheritedWidgetOfExactType 后，
    // 当前 context 对应的 widget 就和 CounterProvider 建立了依赖关系。
    // 后续 notifier 有变化时，这个 widget 会进入更新流程。
    final provider =
        context.dependOnInheritedWidgetOfExactType<CounterProvider>();
    assert(provider != null, 'No CounterProvider found in context');
    return provider!.notifier!;
  }

  static CounterNotifier read(BuildContext context) {
    // `read` 的语义是“只读，不建立依赖”。
    // 这里故意不用 dependOnInheritedWidgetOfExactType，而是通过 element 直接拿 widget，
    // 这样当前调用方不会因为 provider 更新而自动 rebuild。
    //
    // 这个区分非常接近真实 Provider 的设计思路：
    // - read：拿值，但不订阅变化
    // - watch：拿值，并订阅变化
    final element =
        context.getElementForInheritedWidgetOfExactType<CounterProvider>();
    final provider = element?.widget as CounterProvider?;
    assert(provider != null, 'No CounterProvider found in context');
    return provider!.notifier!;
  }
}

/*
面试讲解点：
1. 这题本质是在手写最小 Provider 思路：状态模型 + InheritedWidget/InheritedNotifier 注入 + 读取方式。
2. Provider 的价值不只是“少传参数”，而是让依赖关系进入 Widget 树，并能驱动后代按需重建。
3. 这里的 watch 通过 dependOnInheritedWidgetOfExactType 建立依赖，read 则只拿值不建立依赖。
4. 真项目里还会继续补 create/dispose、MultiProvider、Selector、错误提示和类型安全等能力。

怎么使用：
1. 先创建一个 `CounterNotifier()` 实例。
2. 在页面上层包一层：
   `CounterProvider(notifier: counterNotifier, child: MyPage())`
3. 在需要响应变化的子组件里用 `CounterProvider.watch(context)` 拿到 notifier。
4. 在只需要触发动作、不希望当前 widget 跟着 rebuild 的地方，用 `CounterProvider.read(context)`。

为什么这样设计：
1. ChangeNotifier 负责“状态变化通知”。
2. InheritedNotifier 负责“把状态挂到 Widget 树上并让后代可读”。
3. 这两个东西拼起来，就是最小 Provider 思路。
*/
