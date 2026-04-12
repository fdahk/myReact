## 1. 事件循环与页面生命周期输出题

### 题目

```js
console.log('page enter');

setTimeout(() => {
  console.log('timer 1');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('microtask 1');
    setTimeout(() => {
      console.log('timer 2');
    }, 0);
  })
  .then(() => {
    console.log('microtask 2');
  });

console.log('render ready');
```

### 输出顺序

```js
page enter
render ready
microtask 1
microtask 2
timer 1
timer 2
```

### 分析

- 同步代码先执行，所以先输出 `page enter`、`render ready`。
- `Promise.then` 属于微任务，会在当前同步代码结束后、宏任务之前执行。
- 第一个 `then` 里注册了 `timer 2`，但它仍然要排到后续宏任务阶段。
- `timer 1` 比 `timer 2` 更早进入宏任务队列，所以它先执行。

### 移动端场景映射

这类题对应的真实问题通常是：

1. 页面初始化时你以为某个定时回调会先跑，实际上微任务里的状态更新已经先改掉了页面状态。
2. 页面销毁前后，如果没有明确处理异步回调顺序，就容易出现“页面已经离开，但旧回调还在改状态”的问题。
