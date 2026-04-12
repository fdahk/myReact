## 15. `AutomaticKeepAliveClientMixin` 使用陷阱题

### 题目

```dart
class ItemPageState extends State<ItemPage>
    with AutomaticKeepAliveClientMixin<ItemPage> {
  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    return const Text('keep me alive');
  }
}
```

### 面试里真正要答什么

这道题的关键不是“有没有 mixin”，而是两个很容易漏掉的点：

1. Flutter 官方文档明确说明，`build()` 里必须调用 `super.build(context)`，虽然返回值可以忽略。
2. 当 `wantKeepAlive` 的值发生变化时，要调用 `updateKeepAlive()`。

### 高分回答

更完整的回答应该是：

- 这个 mixin 适合懒构建列表里的状态保活。
- 但它不是“混进去就完事”，还要满足官方文档要求，否则保活行为可能不符合预期。

### 真实业务映射

这类题对应的真实问题通常是：

1. Tab 切换后输入状态丢失。
2. 列表滑出屏幕后状态被销毁，但开发者以为已经 keep alive。
3. 保活逻辑写了 mixin，却没有真正生效。
