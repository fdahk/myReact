/*
实现目标：
- 手写一个串行任务执行器，让一组异步任务严格按顺序依次执行。
-
核心思路：
- 维护一个结果数组。
- 使用 `for...of` 配合 `await`，确保前一个任务完成后才会进入下一个任务。
- 每个任务都设计成返回 Promise 的函数，避免在注册阶段就提前执行。
-
复杂度 / 运行特征：
- 总时间约等于所有任务耗时之和，时间复杂度可视作 O(n)。
- 结果数组占用 O(n) 额外空间。
-
易错点：
- 如果写成 `tasks.map(async ...)` 再 `await`，很容易误变成并行。
- 任务必须是函数数组，而不是已经开始执行的 Promise 数组。
- 面试时要说清“串行”的本质是严格的前后依赖，不是限制并发数为 1 的另一个说法而已。
-
适用场景 / 面试表达点：
- 常见于队列消费、步骤流转、需要前一步结果驱动后一步的场景。
- 面试里可以顺势对比并发池、批量并行、瀑布流任务调度。
*/

async function runSerial(tasks) {
  const results = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }

  return results;
}

const sleep = (time, value) => new Promise((resolve) => setTimeout(() => resolve(value), time));

runSerial([
  () => sleep(100, 'A'),
  () => sleep(50, 'B'),
  () => sleep(10, 'C'),
]).then(console.log);
