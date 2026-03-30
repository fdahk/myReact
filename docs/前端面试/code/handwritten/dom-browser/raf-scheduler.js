/*
实现目标：
- 手写一个基于 `requestAnimationFrame` 的调度器，把高频任务合并到下一帧执行。
-
核心思路：
- 多次 `schedule` 调用时先把任务暂存在队列里。
- 若当前帧已经预约过，不再重复预约新的 `requestAnimationFrame`。
- 到下一帧统一执行队列中的任务。
-
复杂度 / 运行特征：
- 单次入队 O(1)，单帧 flush 成本与任务数 n 成正比。
-
易错点：
- `rAF` 更适合和渲染节奏同步的任务，不适合替代所有异步调度。
- 要区分“同一帧合并”与“延迟到空闲时间执行”。
-
适用场景 / 面试表达点：
- 常用于滚动同步、拖拽、动画、流式文本批量更新。
*/

class RafScheduler {
  constructor() {
    this.queue = [];
    this.scheduled = false;
  }

  schedule(task) {
    this.queue.push(task);

    if (this.scheduled) {
      return;
    }

    this.scheduled = true;
    requestAnimationFrame(() => {
      const tasks = this.queue.slice();
      this.queue.length = 0;
      this.scheduled = false;
      tasks.forEach((currentTask) => currentTask());
    });
  }
}

export { RafScheduler };
