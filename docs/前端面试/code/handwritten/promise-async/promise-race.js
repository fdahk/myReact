/*
面试讲解点：手写 Promise.race
- 题目本质：本质是谁先 settle 就采用谁的结果，不等待其他任务。
- 复杂度：遍历注册阶段 O(n)，完成时间由最先 settle 的任务决定。
- 易错点：普通值包装、最先 reject 也要立刻结束。
- 追问方向：可以追问超时控制、请求竞速。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function promiseRace(tasks) {
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      Promise.resolve(task).then(resolve, reject);
    });
  });
}

promiseRace([
  new Promise((resolve) => setTimeout(() => resolve('slow'), 300)),
  Promise.resolve('fast'),
]).then(console.log);
