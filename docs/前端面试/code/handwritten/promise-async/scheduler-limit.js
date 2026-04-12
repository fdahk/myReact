/*
实现目标：
- 手写一个带并发限制的异步调度器 Scheduler。

核心思路：
- 维护 `running` 和 `queue` 两个状态。
- 新任务进来时，能执行就立刻执行，否则先入队。
- 某个任务结束后，再从队列里补位执行下一个。
*/

class Scheduler {
  constructor(limit = 2) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      const runner = () => {
        this.running += 1;

        Promise.resolve()
          .then(task)
          .then(resolve, reject)
          .finally(() => {
            this.running -= 1;
            this.runNext();
          });
      };

      if (this.running < this.limit) {
        runner();
      } else {
        this.queue.push(runner);
      }
    });
  }

  runNext() {
    if (this.running >= this.limit) return;
    if (this.queue.length === 0) return;

    const nextTask = this.queue.shift();
    nextTask();
  }
}

const scheduler = new Scheduler(2);
const timeoutTask = (time, label) => () =>
  new Promise((resolve) => setTimeout(() => resolve(label), time));

scheduler.add(timeoutTask(1000, '1')).then(console.log);
scheduler.add(timeoutTask(500, '2')).then(console.log);
scheduler.add(timeoutTask(600, '3')).then(console.log);
scheduler.add(timeoutTask(400, '4')).then(console.log);
