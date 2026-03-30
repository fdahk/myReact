/*
实现目标：
- 手写一个最小版 `AsyncParallelHook`，理解异步并行钩子如何等待所有插件执行完成。
-
核心思路：
- `tapPromise` 注册返回 Promise 的异步任务。
- `promise` 方法统一触发所有任务，并通过 `Promise.all` 等待全部完成。
- 这通常是 `SyncHook` 之后的进一步追问。
-
复杂度 / 运行特征：
- 注册 O(1)，触发时总体成本与插件数量 n 成正比。
-
易错点：
- 并行并不代表结果顺序不稳定，`Promise.all` 仍按注册顺序收集结果。
- 若要串行钩子，执行模型会不同。
-
适用场景 / 面试表达点：
- 适合继续解释 tapable 体系里的同步 / 异步差异。
*/

class AsyncParallelHook {
  constructor() {
    this.tasks = [];
  }

  tapPromise(name, task) {
    this.tasks.push({ name, task });
  }

  promise(...args) {
    return Promise.all(this.tasks.map(({ task }) => Promise.resolve(task(...args))));
  }
}

const hook = new AsyncParallelHook();
hook.tapPromise('plugin-a', async (value) => `a:${value}`);
hook.tapPromise('plugin-b', async (value) => `b:${value}`);
hook.promise('build').then(console.log);
