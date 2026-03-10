/*
面试讲解点：手写 Promise.allSettled
- 题目本质：本质是等待所有任务都落定，不论成功还是失败都收集结果。
- 复杂度：整体时间取决于最慢任务，额外遍历 O(n)。
- 易错点：返回结构要区分 fulfilled 和 rejected，顺序要与入参一致。
- 追问方向：可以追问和 Promise.all 的区别。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
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
          result[index] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
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
