/*
实现目标：
- 手写一个最小版优先级调度器，理解 React Scheduler 为什么会让高优任务先执行。
-
核心思路：
- 用优先级数字表示任务重要程度。
- 每次从队列里取优先级最高的任务执行。
- 这能模拟“用户输入比低优先级渲染更新更先处理”的调度思想。
-
复杂度 / 运行特征：
- 当前实现每次入队后排序，单次插入复杂度约为 O(n log n)。
- 如果面试官继续追问，可升级成小顶堆 / 优先队列。
-
易错点：
- React Scheduler 不只是排序，还会结合时间切片、让出控制权和优先级过期。
- 这里是最小理解版，不是完整调度器。
-
适用场景 / 面试表达点：
- 适合和 Fiber / 时间切片一起讲，说明为什么 React 需要调度器。
*/

class PriorityScheduler {
  constructor() {
    this.queue = [];
  }

  schedule(task, priority) {
    this.queue.push({ task, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  flush() {
    while (this.queue.length > 0) {
      const current = this.queue.shift();
      current.task();
    }
  }
}

const scheduler = new PriorityScheduler();
scheduler.schedule(() => console.log('low priority render'), 5);
scheduler.schedule(() => console.log('high priority input'), 1);
scheduler.flush();

export { PriorityScheduler };
