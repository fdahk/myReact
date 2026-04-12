## 12. `StreamController.broadcast` 行为题

### 题目

```dart
import 'dart:async';

void main() {
  final controller = StreamController<int>.broadcast();

  controller.add(1);

  controller.stream.listen((value) {
    print('A: $value');
  });

  controller.add(2);

  controller.stream.listen((value) {
    print('B: $value');
  });

  controller.add(3);
}
```

### 面试里应该怎么回答

这道题的重点不是硬背某个固定打印顺序，而是理解官方文档强调的两个行为：

1. broadcast stream 可以被多个监听者订阅。
2. 当没有监听者时，它不会缓存事件。

### 关键结论

- 第一次 `controller.add(1)` 发生时还没有监听者，所以这个事件会直接丢失。
- 后续哪个监听者能收到哪些事件，取决于它订阅时机和事件分发时机。

### 移动端场景映射

这类题对应的真实问题通常是：

1. 你把全局消息总线写成 broadcast stream，却误以为晚来的页面也能拿到历史事件。
2. 下载进度、推送消息、应用内事件广播如果没有把“是否需要缓存历史事件”想清楚，就会出现页面错过关键更新的问题。
