## 17. `RepaintBoundary` 理解题

### 题目

```dart
RepaintBoundary(
  child: AnimatedBuilder(
    animation: controller,
    builder: (context, child) {
      return Transform.rotate(
        angle: controller.value,
        child: child,
      );
    },
    child: const HeavyWidget(),
  ),
)
```

### 面试里真正要答什么

这道题不是考你“会不会包一层 `RepaintBoundary`”，而是考你知不知道它到底在优化什么。

Flutter 官方文档说明：

- `RepaintBoundary` 会为子树创建独立显示列表边界。
- 它适合子树和周围区域的重绘频率不同的场景。
- 在某些复杂但静态的子树上，它还可能帮助引擎做栅格缓存。

### 高分回答

更强的回答应该是：

- 它的价值是隔离重绘边界，不是万能性能开关。
- 如果变化区域和静态重区域能被有效切开，它通常更有价值。
- 如果乱包、包太碎，未必真的更快。

### 真实业务映射

这类题对应的真实问题通常是：

1. 动画区域带着整块复杂子树一起重绘。
2. 长列表 item 中局部频繁变化，但整项都被拖着 repaint。
3. 团队只会背“加 `RepaintBoundary`”，却讲不清适用边界。
