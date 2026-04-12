## 9. `Stream` 监听与事件顺序题

### 题目

```dart
import 'dart:async';

void main() {
  final controller = StreamController<int>();

  controller.stream.listen((value) {
    print('listener: $value');
  });

  print('before add');
  controller.add(1);
  print('after add');
}
```

### 面试里怎么回答

这道题的重点不是死记某个固定输出，而是说明：

1. `StreamController` 默认是异步分发事件。
2. 所以 `add(1)` 并不代表监听器立刻同步执行。
3. 更稳妥的理解是：同步代码先继续往下走，监听回调通常会在后续异步时机收到事件。

### 推荐表达

如果面试官追问，我会直接补：

- 普通 `StreamController` 和同步 `StreamController(sync: true)` 的行为不一样。
- 如果不把这件事讲清楚，就很容易在页面初始化、表单联动、流式更新里误判执行时机。

### 移动端场景映射

这类题对应的真实问题通常是：

1. 页面以为事件已经处理完成，实际上只是把事件放进了后续调度。
2. 如果多个流和状态更新叠加，很容易出现 UI 时机判断错误。
