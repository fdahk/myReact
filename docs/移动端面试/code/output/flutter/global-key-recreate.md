## 14. `GlobalKey` 重建状态丢失题

### 题目

```dart
class DemoPage extends StatelessWidget {
  const DemoPage({super.key});

  @override
  Widget build(BuildContext context) {
    final formKey = GlobalKey<FormState>();

    return Form(
      key: formKey,
      child: const Text('demo'),
    );
  }
}
```

### 面试里真正要答什么

这道题不是考你会不会写 `GlobalKey`，而是考你知不知道：

1. `GlobalKey` 不应该在每次 build 时重新创建。
2. Flutter 官方文档明确说明，反复创建新的 `GlobalKey` 会让旧 subtree 的 state 被丢掉，并新建一棵 fresh subtree。
3. 这不仅影响性能，也会造成意料外的状态丢失和手势中断。

### 高分回答

更稳妥的说法是：

- `GlobalKey` 应该是长生命周期对象，通常由 `State` 持有，而不是写在 build 局部变量里。
- 如果其实只需要普通身份识别，不一定要上 `GlobalKey`，普通 `Key` 往往更合适。

### 真实业务映射

这类题对应的真实问题通常是：

1. 表单状态莫名其妙重置。
2. 某些手势或输入中途失效。
3. 组件状态在 rebuild 后消失，开发者误以为是框架 bug。
