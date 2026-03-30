/*
实现目标：
- 手写一个最小版 `AsyncSeriesHook`，理解异步串行钩子如何按顺序等待插件执行。
-
核心思路：
- 注册一组返回 Promise 的异步任务。
- 触发时使用 `for...of + await` 串行执行，前一个完成后再执行下一个。
- 这和 `AsyncParallelHook` 的区别是“是否等待前一个任务结束再继续”。
-
复杂度 / 运行特征：
- 执行成本与任务数量 n 成正比，总耗时约为所有任务耗时之和。
-
易错点：
- 很多人会把串行钩子误写成 `Promise.all`，那就变成并行了。
- 面试里要能清楚对比 Sync / AsyncSeries / AsyncParallel 三种模型。
*/

class AsyncSeriesHook {
  constructor() {
    this.tasks = [];
  }

  tapPromise(name, task) {
    this.tasks.push({ name, task });
  }

  async promise(...args) {
    const results = [];

    for (const { task } of this.tasks) {
      results.push(await task(...args));
    }

    return results;
  }
}

const hook = new AsyncSeriesHook();
hook.tapPromise('plugin-a', async (value) => `a:${value}`);
hook.tapPromise('plugin-b', async (value) => `b:${value}`);
hook.promise('build').then(console.log);
