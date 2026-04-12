## 10. `Isolate` 与 UI 卡顿理解题

### 题目

```dart
void main() {
  print('start');

  Future(() {
    var sum = 0;
    for (var i = 0; i < 100000000; i++) {
      sum += i;
    }
    print(sum);
  });

  print('end');
}
```

### 面试里怎么回答

这道题的关键不是输出顺序本身，而是理解：

1. `Future` 不等于自动开新线程。
2. 如果这段大计算仍然跑在当前 isolate，它依然会占用当前执行上下文。
3. 真正适合搬到后台计算的是 isolate，例如 `Isolate.spawn()` 或 Flutter 常见的 `compute()`。

### 推荐表达

高分回答通常会补：

- Dart 的 isolate 是隔离内存、通过消息通信的执行上下文。
- 重计算问题的关键不是“我用了 `Future`”，而是“我有没有真的把工作移出当前 isolate”。

### 移动端场景映射

这类题对应的真实问题通常是：

1. 大 JSON 解析、图片处理、加解密、文件哈希如果还放在当前 isolate，就会拖慢页面响应。
2. Flutter 面试很喜欢用这类题区分“会 async 语法”和“真的理解并发模型”的人。
