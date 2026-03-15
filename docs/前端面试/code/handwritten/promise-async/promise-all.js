/*
实现目标：
- 手写一个 `promiseAll`，模拟 `Promise.all` 的核心语义：全部成功才成功，任一失败立即失败。
-
核心思路：
- 遍历所有任务，并把每一项都用 `Promise.resolve` 包装，兼容普通值和 Promise。
- 每个任务成功后，把结果写回原始索引位置，确保最终结果数组顺序与输入顺序一致。
- 维护一个完成计数器；当全部任务都成功时再统一 `resolve`。
- 只要其中任意一项失败，就立刻 `reject` 整体 Promise。
-
复杂度 / 运行特征：
- 遍历注册阶段是 O(n)，整体结束时间由最慢的那个任务决定。
- 结果数组会额外占用 O(n) 空间。
- 该实现保留了 `Promise.all` 的关键特点：并发发起、结果顺序稳定、失败短路。
-
易错点：
- 很多人会忘记普通值也应被当作已完成 Promise 处理。
- 收集结果时必须写入原索引，否则返回顺序会被完成先后打乱。
- 空数组是特殊边界，应该直接返回 `[]`，而不是永久 pending。
-
适用场景 / 面试表达点：
- 常见于多个独立异步任务需要“全部完成后再继续”的场景。
- 面试时可以重点强调两个关键词：`顺序稳定` 和 `失败短路`。
*/

function promiseAll(tasks) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(tasks)) {
      reject(new TypeError('tasks must be an array'));
      return;
    }

    if (tasks.length === 0) {
      resolve([]);
      return;
    }

    const result = [];
    let finished = 0;

    tasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((value) => {
          // 结果必须按输入位置回填，而不是按完成先后 push。
          result[index] = value;
          finished += 1;
          if (finished === tasks.length) {
            resolve(result);
          }
        })
        // 任一任务失败就直接让整体失败，体现 all 的短路语义。
        .catch(reject);
    });
  });
}

promiseAll([Promise.resolve(1), 2, Promise.resolve(3)]).then(console.log);
