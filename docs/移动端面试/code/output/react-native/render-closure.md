## 3. `React Native` 闭包与旧状态输出题

### 题目

```tsx
function Screen() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setTimeout(() => {
      console.log(count);
    }, 100);
  };

  return (
    <>
      <Button
        title="inc"
        onPress={() => {
          setCount((v) => v + 1);
          handlePress();
        }}
      />
    </>
  );
}
```

### 常见误判

很多人会以为点击后输出 `1`，因为状态已经加一了。

### 实际现象

第一次点击通常输出：

```tsx
0
```

### 分析

- `handlePress` 闭包捕获的是当前 render 时的 `count`。
- `setCount` 触发的是下一次更新，不会把当前闭包里的 `count` 直接改掉。
- 所以定时器回调读到的仍然是这次 render 中的旧值。

### 移动端场景映射

这类题在 `React Native` 里很常见，因为：

1. 手势回调、定时器、动画回调和订阅回调都容易踩闭包旧值问题。
2. 如果不理解 render 闭包和引用稳定性，就会出现“页面状态明明更新了，异步回调里还是旧值”的 bug。
