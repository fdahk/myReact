/*
实现目标：
- 手写一个支持暂停 / 恢复的任务队列。
-
核心思路：
- 用数组保存待执行任务，用布尔值表示当前是否暂停。
- 队列在非暂停且非运行状态下，按顺序逐个消费任务。
- 暂停后不再拉起下一个任务，恢复后继续从断点往后跑。
-
复杂度 / 运行特征：
- 每个任务只经历一次入队和一次出队，总体调度为 O(n)。
- 当前版本是串行执行；如果继续追问，可升级为“支持并发数 + 暂停恢复”的调度器。
-
易错点：
- 暂停通常只影响“后续任务是否继续启动”，不会强行打断已在运行中的任务。
- 要避免重复触发 run 导致多个消费循环并发跑起来。
-
适用场景 / 面试表达点：
- 常见于上传队列、后台处理队列、可暂停下载。
*/

class PausableTaskQueue {
  constructor() {
    this.queue = [];
    this.paused = false;
    this.running = false;
  }

  add(task) {
    this.queue.push(task);
    this.run();
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.run();
  }

  async run() {
    if (this.paused || this.running) {
      return;
    }

    this.running = true;

    while (!this.paused && this.queue.length > 0) {
      const task = this.queue.shift();
      await task();
    }

    this.running = false;
  }
}

const queue = new PausableTaskQueue();
queue.add(() => Promise.resolve(console.log('task-1')));
queue.add(() => Promise.resolve(console.log('task-2')));
