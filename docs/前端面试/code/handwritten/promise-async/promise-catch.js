/*
实现目标：
- 手写 `Promise.prototype.catch` 的最小语义版本。
-
核心思路：
- `catch` 本质上只是 `then(undefined, onRejected)` 的语法糖。
- 它只关心拒绝分支，成功值直接透传。
-
复杂度 / 运行特征：
- 包装成本 O(1)。
-
易错点：
- `catch` 处理完错误后，如果返回普通值，链会恢复成 fulfilled。
- 若 `catch` 里再次抛错，链会继续 rejected。
*/

function promiseCatch(promise, onRejected) {
  return Promise.resolve(promise).then(undefined, onRejected);
}

promiseCatch(Promise.reject(new Error('boom')), (error) => {
  console.log(error.message);
  return 'recovered';
}).then(console.log);
