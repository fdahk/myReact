/*
面试讲解点：手写 Promise.all
- 题目本质：本质是并发执行多个任务，全部成功才 resolve，只要有一个失败就 reject。
- 复杂度：整体时间取决于最慢任务，遍历开销 O(n)。
- 易错点：普通值也要用 Promise.resolve 包装，结果顺序必须稳定。
- 追问方向：这是 Promise 高频题，最好主动讲失败短路。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
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
          result[index] = value;
          finished += 1;
          if (finished === tasks.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
}

promiseAll([Promise.resolve(1), 2, Promise.resolve(3)]).then(console.log);
