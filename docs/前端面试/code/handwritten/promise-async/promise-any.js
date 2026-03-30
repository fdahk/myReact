/*
实现目标：
- 手写一个 `promiseAny`，模拟 `Promise.any` 的核心行为：只要有一个成功就立即成功，全部失败才失败。
-
核心思路：
- 遍历所有任务，并统一用 `Promise.resolve` 包装，兼容普通值。
- 任意一个任务成功时立即 `resolve`。
- 失败时把错误按原索引收集；只有当全部任务都失败后，才统一抛出 `AggregateError`。
-
复杂度 / 运行特征：
- 注册阶段为 O(n)，额外空间也约为 O(n)。
- 与 `Promise.all` 相反，`any` 的成功是“短路成功”，失败是“全部失败”。
-
易错点：
- 空数组是特殊边界，应该直接 rejected。
- 不能只记录最后一个错误，要保留全部失败原因。
- 成功短路后，其他任务即使继续完成也不会再改变整体结果。
-
适用场景 / 面试表达点：
- 适合讲多源兜底、接口容灾、镜像节点抢最快成功。
- 面试里可以顺带对比 `all`、`race`、`any`、`allSettled` 的四种聚合语义。
*/

function promiseAny(tasks) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(tasks)) {
      reject(new TypeError('tasks must be an array'));
      return;
    }

    if (tasks.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    const errors = [];
    let rejectedCount = 0;

    tasks.forEach((task, index) => {
      Promise.resolve(task).then(resolve).catch((error) => {
        errors[index] = error;
        rejectedCount += 1;

        if (rejectedCount === tasks.length) {
          reject(new AggregateError(errors, 'All promises were rejected'));
        }
      });
    });
  });
}

promiseAny([
  Promise.reject(new Error('first')),
  new Promise((resolve) => setTimeout(() => resolve('winner'), 100)),
  Promise.reject(new Error('second')),
]).then(console.log);
