/*
实现目标：
- 手写一个 `promiseRace`，模拟 `Promise.race`“谁先落定就采用谁结果”的行为。
-
核心思路：
- 遍历所有输入项，并统一用 `Promise.resolve` 包装，兼容普通值与 Promise。
- 然后把同一个 `resolve` / `reject` 传给每个任务。
- 谁最先进入 fulfilled 或 rejected，外层 Promise 就会最先完成，其余结果自动被忽略。
-
复杂度 / 运行特征：
- 遍历注册阶段是 O(n)，但整体结束时间只取决于第一个落定的任务。
- 这是典型的“竞速”模型，不会等待其他任务完成。
- 后续较慢任务仍会继续执行，只是它们的结果不再影响最终返回值。
-
易错点：
- “先完成”包含成功和失败两种情况，最先 reject 也应立即结束整体 Promise。
- 普通值要先包装，否则无法统一接入 Promise 调度逻辑。
- 面试时常被追问超时控制，本质上就是把业务请求和一个定时 reject 的 Promise 放进 race。
-
适用场景 / 面试表达点：
- 适用于请求超时、主备接口竞速、多源结果抢占等场景。
- 可以用一句话概括：`race` 比的不是成功，而是谁先 settle。
*/

function promiseRace(tasks) {
  return new Promise((resolve, reject) => {
    tasks.forEach((task) => {
      // 任意一项最先 resolve/reject，都会抢先决定外层 Promise 的状态。
      Promise.resolve(task).then(resolve, reject);
    });
  });
}

promiseRace([
  new Promise((resolve) => setTimeout(() => resolve('slow'), 300)),
  Promise.resolve('fast'),
]).then(console.log);
