## 13. `FutureBuilder` 重复请求题

### 题目

```dart
class DemoPage extends StatelessWidget {
  const DemoPage({super.key});

  Future<String> fetchData() async {
    print('request');
    return 'ok';
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: fetchData(),
      builder: (context, snapshot) {
        return Text(snapshot.data ?? 'loading');
      },
    );
  }
}
```

### 面试里真正要答什么

这道题的重点不是输出某个固定次数，而是理解：

1. `build()` 可能被调用很多次。
2. 如果把 `future: fetchData()` 直接写在 build 里，每次 rebuild 都可能重新创建一个新的 `Future`。
3. Flutter 官方 `FutureBuilder` 文档明确说明：future 应该更早拿到，例如在 `initState`、`didUpdateWidget` 或 `didChangeDependencies`，而不是在 build 中临时创建。

### 高分回答

更成熟的回答是：

- 这段代码的风险不是“FutureBuilder 不好用”，而是异步数据源生命周期放错了。
- 正确思路通常是把 future 缓存到 State 里，避免每次父组件 rebuild 就重启一次请求。

### 真实业务映射

这类题对应的真实问题通常是：

1. 页面偶发重复请求。
2. 下拉刷新、主题切换、祖先组件状态变化时，接口被莫名其妙多打几次。
3. 开发者以为是网络层问题，实际是 Future 创建时机不对。
