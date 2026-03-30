/*
实现目标：
- 手写一个带优先级和并发限制的调度器。
-
核心思路：
- 维护 `queue` 和 `activeCount` 两个状态。
- 新任务入队时记录优先级和自增序号；调度时按“优先级高优先，同优先级按入队顺序”执行。
- 任务完成后释放并发槽位，再继续拉起队列中的下一个任务。
-
复杂度 / 运行特征：
- 当前实现每次调度前会排序，单次调度复杂度约为 O(n log n)。
- 如果面试官继续追问，可以升级成堆结构，把取最高优先级任务降到 O(log n)。
-
易错点：
- 优先级调度不等于插队执行已在运行中的任务，它只能影响“等待中的任务”。
- 任务失败也要释放并发槽位，否则队列会卡死。
- 如果需要抢占式调度，那已经是更复杂的系统设计题，不属于这份最小实现。
-
适用场景 / 面试表达点：
- 常见于上传队列、消息发送、后台任务调度。
- 面试里可以先给出“排序队列版”，再补“堆优化版”的升级方向。
*/

class PriorityScheduler {
  constructor(limit = 2) {
    this.limit = limit;
    this.activeCount = 0;
    this.queue = [];
    this.sequence = 0;
  }

  enqueue(task, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        priority,
        resolve,
        reject,
        sequence: this.sequence,
      });
      this.sequence += 1;
      this.runNext();
    });
  }

  runNext() {
    if (this.activeCount >= this.limit || this.queue.length === 0) {
      return;
    }

    this.queue.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return a.sequence - b.sequence;
    });

    const currentTask = this.queue.shift();
    this.activeCount += 1;

    Promise.resolve()
      .then(() => currentTask.task())
      .then(currentTask.resolve, currentTask.reject)
      .finally(() => {
        this.activeCount -= 1;
        this.runNext();
      });
  }
}

const scheduler = new PriorityScheduler(2);
const createTask = (time, label) => () =>
  new Promise((resolve) => setTimeout(() => resolve(label), time));

scheduler.enqueue(createTask(200, 'low'), 1).then(console.log);
scheduler.enqueue(createTask(50, 'high'), 10).then(console.log);
scheduler.enqueue(createTask(100, 'medium'), 5).then(console.log);
