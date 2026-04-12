## 2. 请求竞态与旧结果覆盖输出题

### 题目

```js
let currentTab = 'A';

function mockRequest(tab, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tab), delay);
  });
}

mockRequest('A', 100).then((result) => {
  if (currentTab === result) {
    console.log('render', result);
  } else {
    console.log('ignore', result);
  }
});

currentTab = 'B';

mockRequest('B', 10).then((result) => {
  if (currentTab === result) {
    console.log('render', result);
  } else {
    console.log('ignore', result);
  }
});
```

### 输出顺序

```js
render B
ignore A
```

### 分析

- 第一个请求先发出，但返回更慢。
- `currentTab` 已经在中途切到了 `B`。
- 第二个请求更快返回，所以先输出 `render B`。
- 第一个请求结果回来时，已经不是当前 tab，所以应忽略。

### 移动端场景映射

这类题对应的真实问题通常是：

1. 用户快速切换会话、商品或路由时，旧请求结果污染了新页面。
2. 只做“发新请求”，不做“校验结果归属”是不够的。
3. 真正稳妥的方案通常是“取消旧请求 + 结果校验”双保险。
