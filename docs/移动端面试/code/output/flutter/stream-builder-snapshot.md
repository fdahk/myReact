## 16. `StreamBuilder` snapshot 时机题

### 题目

```dart
final controller = StreamController<int>();

StreamBuilder<int>(
  stream: controller.stream,
  builder: (context, snapshot) {
    print(snapshot.connectionState);
    print(snapshot.data);
    return const SizedBox();
  },
);
```

### 面试里真正要答什么

这道题的重点不是固定打印哪几个值，而是理解 Flutter 官方 `StreamBuilder` 文档中的两个关键点：

1. builder 拿到的是和 Flutter pipeline 节奏相关的 snapshot 子序列，不是底层 stream 事件的机械一一映射。
2. 第一个 frame 可能先拿到 `initialData` 或等待态，而不是“流一订阅就立刻有业务值”。

### 高分回答

更成熟的回答方式是：

- `StreamBuilder` 真正考的是数据源生命周期和 UI 时机，不是单纯的监听语法。
- 如果 stream 在 build 里创建，或者开发者假设每条事件都会立刻同步触发 builder，就很容易写出状态错乱代码。

### 真实业务映射

这类题对应的真实问题通常是：

1. 页面第一次展示时闪一下空态。
2. 开发者以为每次消息都同步重建，结果遇到 UI 时机错位。
3. 流式输出、下载进度、消息订阅出现“漏一帧”或“状态过渡不符合预期”的误判。
