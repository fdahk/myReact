/*
实现目标：
- 手写一个最小版 `SyncHook`，理解 Webpack plugin 体系底层的钩子模型。
-
核心思路：
- 维护一个任务数组保存注册的插件函数。
- `tap` 负责注册回调，`call` 负责按顺序同步执行所有回调。
- 这就是很多 plugin 系统最小可用的发布订阅形态。
-
复杂度 / 运行特征：
- 注册是 O(1)，触发一次 hook 的成本与已注册回调数量 n 成正比。
-
易错点：
- `SyncHook` 是同步钩子，不处理 Promise。
- 若题目继续追问，可扩展为 AsyncSeriesHook、AsyncParallelHook。
-
适用场景 / 面试表达点：
- 适合把 loader / plugin 再往下追一层，解释 tapable 思想。
*/

class SyncHook {
  constructor() {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push({ name, task });
  }

  call(...args) {
    this.tasks.forEach(({ task }) => {
      task(...args);
    });
  }
}

const hook = new SyncHook();
hook.tap('plugin-a', (value) => console.log('plugin-a:', value));
hook.tap('plugin-b', (value) => console.log('plugin-b:', value));
hook.call('build');
