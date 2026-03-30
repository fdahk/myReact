/*
实现目标：
- 手写 `Promise.reject` 的最小语义版本。
-
核心思路：
- 返回一个立即 rejected 的 Promise。
- 与 `Promise.resolve` 相反，它不会尝试展开成功值，而是直接把原因作为拒绝结果。
-
复杂度 / 运行特征：
- 包装成本 O(1)。
-
易错点：
- `Promise.reject(Promise.resolve(1))` 也不会等待内部 Promise，而是直接把它作为拒绝原因。
*/

function promiseReject(reason) {
  return new Promise((_, reject) => {
    reject(reason);
  });
}

promiseReject(new Error('manual reject')).catch((error) => console.log(error.message));
