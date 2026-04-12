## 11. `ValueListenableBuilder` 重建理解题

### 题目

```dart
import 'package:flutter/foundation.dart';

void main() {
  final counter = ValueNotifier<int>(0);

  counter.addListener(() {
    print('listener: ${counter.value}');
  });

  counter.value = 1;
  counter.value = 2;
}
```

### 输出

```dart
listener: 1
listener: 2
```

### 分析

- `ValueNotifier` 适合包装单个值。
- 每次给 `value` 赋新值时，底层都会触发通知。
- Flutter 官方 `ValueListenableBuilder` 文档强调，它会监听 `ValueListenable` 的变化并重建对应 builder。

### 面试高分回答

高分回答不只是说“它会更新 UI”，还要补：

1. `ValueListenableBuilder` 很适合单值状态。
2. 如果有一部分子树与这个值无关，可以通过 `child` 参数预构建，减少重复 rebuild。
3. 这也是 Flutter 面试里常见的“轻量状态管理”思路。
