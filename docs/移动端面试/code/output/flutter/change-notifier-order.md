## 8. `ChangeNotifier` 与 `notifyListeners` 理解题

### 题目

```dart
import 'package:flutter/foundation.dart';

void main() {
  final notifier = ValueNotifier<int>(0);

  notifier.addListener(() {
    print('listener A: ${notifier.value}');
  });

  notifier.addListener(() {
    print('listener B: ${notifier.value}');
  });

  notifier.value = 1;
  print('done');
}
```

### 输出顺序

```dart
listener A: 1
listener B: 1
done
```

### 分析

- `ValueNotifier` 是 `ChangeNotifier` 的子类。
- 给 `value` 赋新值时，会立即触发 `notifyListeners()`。
- 官方文档明确说明：`ChangeNotifier` 添加监听是 `O(1)`，删除监听和派发通知是 `O(N)`。
- 所以这里两个 listener 会同步收到通知，然后才继续往下执行 `print('done')`。

### 移动端场景映射

这类题对应的真实问题通常是：

1. 你以为状态通知是异步的，实际它可能就在当前调用栈里同步派发。
2. 监听器很多时，`notifyListeners()` 本身也会形成成本，不应该无脑高频触发。
