## 5. Bridge 回调与页面销毁输出题

### 题目

```js
let destroyed = false;

function callNative() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('success'), 100);
  });
}

callNative().then((result) => {
  if (destroyed) {
    console.log('ignore callback');
    return;
  }
  console.log(result);
});

destroyed = true;
```

### 输出

```js
ignore callback
```

### 分析

- 原生回调是异步返回的。
- 页面已经销毁或离开时，前端不应该再把结果落到当前页面状态。
- 这里通过 `destroyed` 做了一层最小保护，所以最终忽略回调。

### 移动端场景映射

这类题对应的真实问题通常是：

1. H5 页面已经关闭，但宿主回调还回来，导致报错或脏状态。
2. 统一桥接层除了负责调用，还要负责生命周期保护和结果归属校验。
