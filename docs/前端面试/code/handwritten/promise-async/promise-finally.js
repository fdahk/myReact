/*
实现目标：
- 手写一个 `promiseFinally`，模拟 `Promise.prototype.finally` 的核心语义。
-
核心思路：
- 无论原 Promise 成功还是失败，都先执行 `onFinally`。
- `finally` 不接收上游值，它更像一个“收尾钩子”。
- 收尾完成后，要把原来的成功值继续往下传，或者把原来的失败原因继续抛出。
-
复杂度 / 运行特征：
- 主要是一次链式包装，额外调度成本可视为 O(1)。
- 若 `onFinally` 返回 Promise，外层链会等待它完成后再继续。
-
易错点：
- `finally` 通常不会改变链上的值；只有它自己抛错或返回 rejected Promise 才会中断原链。
- `onFinally` 不是函数时，应按透传处理，而不是直接报错。
- 题目如果要求“挂到原型上”，要再额外处理 `this` 绑定。
-
适用场景 / 面试表达点：
- 常用于 loading 收尾、资源释放、埋点上报。
- 面试里可以强调“值透传，错误透传，只有异常才改链路”。
*/

function promiseFinally(promise, onFinally) {
  const callback = typeof onFinally === 'function' ? onFinally : () => onFinally;

  return Promise.resolve(promise).then(
    (value) =>
      Promise.resolve(callback()).then(() => {
        return value;
      }),
    (reason) =>
      Promise.resolve(callback()).then(() => {
        throw reason;
      })
  );
}

promiseFinally(Promise.resolve('done'), () => {
  console.log('cleanup success');
}).then(console.log);

promiseFinally(Promise.reject(new Error('failed')), () => {
  console.log('cleanup error');
}).catch((error) => console.log(error.message));
