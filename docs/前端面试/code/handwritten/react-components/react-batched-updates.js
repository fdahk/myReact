/*
实现目标：
- 手写一个最小版批量更新器，理解 React 为什么会把多次 setState 合并处理。
-
核心思路：
- 在一个批次里暂存多个更新任务。
- 同一轮只安排一次微任务 flush，把队列中的任务统一执行。
- 这样可以减少重复渲染和重复计算。
-
复杂度 / 运行特征：
- 单次入队 O(1)，一次 flush 成本与更新数 n 成正比。
-
易错点：
- 批量更新不代表更新丢失，而是合并到同一轮提交。
- 真正 React 还会继续处理优先级、lane、过渡更新等细节。
-
适用场景 / 面试表达点：
- 适合解释 batched updates、事件内多次 setState 为什么不会每次都立刻提交。
*/

class BatchedUpdater {
  constructor() {
    this.queue = [];
    this.pending = false;
  }

  enqueue(update) {
    this.queue.push(update);

    if (this.pending) {
      return;
    }

    this.pending = true;
    queueMicrotask(() => {
      const tasks = this.queue.slice();
      this.queue.length = 0;
      this.pending = false;
      tasks.forEach((task) => task());
    });
  }
}

const updater = new BatchedUpdater();
updater.enqueue(() => console.log('update-1'));
updater.enqueue(() => console.log('update-2'));

export { BatchedUpdater };
