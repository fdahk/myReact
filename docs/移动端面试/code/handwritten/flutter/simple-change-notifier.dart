import 'package:flutter/foundation.dart';

class CounterModel extends ChangeNotifier {
  // `_count` 用下划线开头，表示这个字段只在当前库内可见。
  // 这样外部不能直接改内部状态，只能通过我们暴露的方法操作。
  int _count = 0;

  // getter 简写。
  // 外部访问 `model.count` 时，底层其实会走这个 getter。
  // 这样做的目的是只暴露“读能力”，不暴露“随便写能力”。
  int get count => _count;

  void increment() {
    // 修改内部状态。
    _count += 1;

    // 通知所有监听者：状态已经变化。
    // Flutter 里很多基于 ChangeNotifier 的方案，底层关键动作就是这一步。
    notifyListeners();
  }

  void reset() {
    // 把状态重置到初始值。
    _count = 0;
    notifyListeners();
  }
}

/*
面试讲解点：
1. 这题本质是在手写最小版可观察状态模型。
2. ChangeNotifier 的核心价值是把“状态变化”和“界面重建触发”解耦。
3. 官方文档强调 addListener 是 O(1)，removeListener 和 notifyListeners 是 O(N)。
4. 真项目里要继续讲 dispose、局部 rebuild、状态粒度控制和监听器过多时的成本。

怎么使用：
1. 创建一个 `CounterModel()`。
2. 通过 `model.increment()` 或 `model.reset()` 修改状态。
3. 通过 `addListener()` 订阅变化，或者交给 `InheritedNotifier` / `Provider` / `ListenableBuilder` 使用。

为什么这样设计：
1. 这是最适合入门理解 Flutter 可观察状态模型的例子。
2. 它没有引入 BuildContext、Widget 树、Provider 等额外概念，能先把“状态变化 -> 通知监听者”这个核心链路看清楚。
3. 后面你再看 Provider、Riverpod、Cubit、Bloc 时，就更容易分清它们到底是“在 ChangeNotifier 这层之上多封了什么”，还是“换了一条完全不同的状态管理思路”。
*/
