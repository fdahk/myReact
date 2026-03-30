/*
实现目标：
- 手写一个并行任务执行器，同时执行多项异步任务，并按输入顺序收集结果。
-
核心思路：
- 接收一组返回 Promise 的任务函数。
- 启动时全部执行，再用 `Promise.all` 收集结果。
- 结果顺序由任务数组位置决定，而不是由完成先后决定。
-
复杂度 / 运行特征：
- 注册阶段 O(n)，总耗时由最慢任务决定。
- 这道题常和“串行任务执行器”“并发限制器”组合考察。
-
易错点：
- 如果传入的是 Promise 而不是函数，可能在进入执行器前就已经开始跑了。
- 并行不等于无限并发可控，如果继续追问就要升级成并发池。
-
适用场景 / 面试表达点：
- 适合讲全并行、保序聚合和与串行执行的区别。
*/

function runParallel(tasks) {
  return Promise.all(tasks.map((task) => Promise.resolve().then(task)));
}

const sleep = (time, value) => new Promise((resolve) => setTimeout(() => resolve(value), time));

runParallel([() => sleep(100, 'A'), () => sleep(50, 'B'), () => sleep(20, 'C')]).then(
  console.log
);
