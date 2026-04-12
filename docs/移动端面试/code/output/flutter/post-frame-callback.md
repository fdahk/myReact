## 7. `addPostFrameCallback` 执行时机题

### 题目

```dart
import 'package:flutter/scheduler.dart';

void main() {
  print('start');

  SchedulerBinding.instance.addPostFrameCallback((_) {
    print('post frame');
  });

  Future.microtask(() {
    print('microtask');
  });

  print('end');
}
```

### 应该怎么理解

这道题不要机械地背一个固定输出，而要先理解三件事：

1. 同步代码一定先执行，所以 `start`、`end` 先出现。
2. `Future.microtask` 属于微任务，会在当前同步代码结束后尽快执行。
3. `addPostFrameCallback` 不是普通微任务，也不是普通 `Future`，它会在一帧渲染流程结束后执行，而且它本身不会主动请求新的一帧。

### 面试高分回答

更稳妥的回答方式是：

- 如果当前有帧在进行，并且还没进入 post-frame callbacks 阶段，这个回调会在当前帧结尾执行。
- 如果当前没有合适的帧，它会等到下一帧结束后再执行。
- 它适合做依赖布局完成后的逻辑，比如读取尺寸、触发首帧后动作，而不适合拿来代替普通异步任务。

### 官方依据

Flutter 官方文档明确说明：

- `addPostFrameCallback` 在一帧结束、持久化 frame callbacks 之后执行。
- 它按注册顺序执行。
- 它只执行一次，且不能取消注册。
- 它不会主动请求新的一帧。

### 移动端场景映射

这类题对应的真实问题通常是：

1. 想在页面首帧完成后读取 `BuildContext` 相关布局信息。
2. 把依赖布局完成的逻辑错误地写进同步代码或普通 `Future`，导致时机不对。
