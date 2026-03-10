/*
面试讲解点：手写 Promise.resolve
- 题目本质：本质是把任意值包装成已完成 Promise，并吸收 thenable。
- 复杂度：核心逻辑通常 O(1)，thenable 吸收视链路而定。
- 易错点：thenable 处理是关键，不能只做简单包装。
- 追问方向：可以追问 Promise 规范里的 Promise Resolution Procedure。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function promiseResolve(value) {
  if (value instanceof Promise) {
    return value;
  }

  return new Promise((resolve) => resolve(value));
}

promiseResolve(123).then(console.log);
promiseResolve(Promise.resolve('ok')).then(console.log);
