/*
实现目标：
- 手写一个 `promiseAllSettled`，无论每个任务成功还是失败，都等待全部落定后统一返回结果。
-
核心思路：
- 遍历所有输入项，并用 `Promise.resolve` 统一包装。
- 每一项成功时记录 `{ status: 'fulfilled', value }`，失败时记录 `{ status: 'rejected', reason }`。
- 无论成功失败，都会在 `finally` 中把完成计数加一；当所有任务都落定后，再整体 `resolve` 结果数组。
-
复杂度 / 运行特征：
- 注册过程是 O(n)，总完成时间由最慢任务决定。
- 结果数组长度与输入一致，顺序也必须与输入顺序一致。
- 与 `Promise.all` 不同，这里不会因为单个失败而提前中断整体流程。
-
易错点：
- 返回结构必须显式区分 `fulfilled` 和 `rejected`，字段名也要对应 `value` / `reason`。
- 很多人会不小心在某项失败时直接 `reject` 外层 Promise，这就变成了 `Promise.all` 语义。
- 空数组同样是特殊边界，应直接返回空结果。
-
适用场景 / 面试表达点：
- 常见于“批量任务都要看结果汇总”的场景，例如批量上报、批量渲染资源预加载。
- 面试时可以重点对比：`all` 关注全成功，`allSettled` 关注全收集。
*/

function promiseAllSettled(tasks) {
  return new Promise((resolve) => {
    if (!Array.isArray(tasks) || tasks.length === 0) {
      resolve([]);
      return;
    }

    const result = [];
    let finished = 0;

    tasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((value) => {
          // 成功态要记录 status 和 value。
          result[index] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
          // 失败态要记录 status 和 reason，而不是让整体提前失败。
          result[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          finished += 1;
          if (finished === tasks.length) {
            resolve(result);
          }
        });
    });
  });
}

promiseAllSettled([Promise.resolve('ok'), Promise.reject(new Error('fail'))]).then(console.log);
