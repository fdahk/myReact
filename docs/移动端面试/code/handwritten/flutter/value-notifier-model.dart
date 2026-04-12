import 'package:flutter/foundation.dart';

class SearchKeywordModel {
  // `final` 表示这个字段只能被赋值一次。
  // 这里不是说 value 永远不能变，而是说 `keyword` 这个 ValueNotifier 实例本身不换对象。
  // 这样做的好处是：
  // 1. 外部谁在监听这个 notifier，都不会因为实例被替换而丢失订阅。
  // 2. 这个模型的职责很清晰：只管理一个字符串状态。
  final ValueNotifier<String> keyword = ValueNotifier<String>('');

  void updateKeyword(String next) {
    // 这里先做一次短路判断。
    // 含义是：如果新值和旧值一样，就没必要继续赋值和通知监听者。
    //
    // 为什么这样设计：
    // 1. 避免无意义通知，减少 rebuild。
    // 2. 在搜索框、筛选条件这类高频输入场景里，这种“去重”很常见。
    if (keyword.value == next) {
      return;
    }

    // `keyword.value` 是 ValueNotifier 持有的真实值。
    // 给它重新赋值后，ValueNotifier 会在内部触发通知，让依赖它的 UI 更新。
    //
    // 这里之所以不用自己手动写 notify，是因为 ValueNotifier 已经帮你封好了
    // “单值状态 + 赋值通知” 这件事。
    keyword.value = next;
  }

  void dispose() {
    // `dispose()` 是 Flutter 很重要的资源释放入口。
    // ValueNotifier 内部也维护监听列表，所以当这个模型生命周期结束时，
    // 需要手动释放，避免监听残留。
    keyword.dispose();
  }
}

/*
面试讲解点：
1. 这题本质是在实现“单值状态”的最小方案。
2. 如果状态只围绕一个值变化，ValueNotifier 往往比自定义大状态模型更轻。
3. 真项目里要补关键词防抖、页面销毁、订阅释放，以及为什么单值适合 ValueNotifier、多字段复杂状态更适合别的模型。

怎么使用：
1. 在页面里持有一个 SearchKeywordModel 实例。
2. 通过 model.updateKeyword('flutter') 修改状态。
3. 用 `ValueListenableBuilder<String>` 监听 `model.keyword`，自动响应 UI 更新。

为什么这样设计：
1. 这道题故意不引入 BuildContext、Provider、Riverpod，只保留“单值状态”最核心的骨架。
2. 这样在面试里更容易讲清楚：ValueNotifier 适合什么场景，不适合什么场景。
3. 当你以后切到 Provider / Riverpod / Bloc 时，也能看清这些方案底层到底额外帮你做了什么。
*/
