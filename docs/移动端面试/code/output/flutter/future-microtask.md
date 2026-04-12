## 6. `Future` 与 `microtask` 输出题

### 题目

```dart
import 'dart:async';

void main() {
  print('start');

  scheduleMicrotask(() {
    print('microtask');
  });

  Future(() {
    print('future');
  });

  print('end');
}
```

### 输出顺序

```dart
start
end
microtask
future
```

### 分析

- 同步代码先执行，所以先输出 `start`、`end`。
- `scheduleMicrotask` 会先于普通 `Future` 执行。
- 普通 `Future` 更接近后续事件队列任务。

### 移动端场景映射

这类题对应的真实问题通常是：

1. `Flutter` 页面初始化里如果不理解任务顺序，就容易把状态更新、页面跳转和异步依赖顺序写乱。
2. 面试官用这类题，核心是看你是否理解异步调度，不是只看你会不会写 Dart 语法。
