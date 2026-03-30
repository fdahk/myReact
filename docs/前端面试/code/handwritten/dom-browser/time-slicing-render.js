/*
实现目标：
- 手写一个最小版时间分片渲染器，把大量任务拆成多批执行，避免长任务阻塞主线程。
-
核心思路：
- 用队列保存待处理任务。
- 每一帧或每个空闲片段里只执行一小批，直到时间片快耗尽就让出线程。
- 借助 `requestIdleCallback` 或 `setTimeout` 继续调度下一轮。
-
复杂度 / 运行特征：
- 总体仍是 O(n)，但优势在于把单个长任务拆散，提升页面可响应性。
-
易错点：
- 时间分片不会减少总工作量，只是把工作分散执行。
- 真实项目还要考虑任务优先级、中断恢复、错误隔离。
*/

function scheduleChunk(tasks, handler, chunkBudget = 8) {
  const queue = tasks.slice();

  function runChunk(deadline) {
    const start = performance.now();

    while (queue.length > 0) {
      const shouldYieldByIdle = deadline && typeof deadline.timeRemaining === 'function'
        ? deadline.timeRemaining() <= 0
        : false;
      const shouldYieldByTime = performance.now() - start >= chunkBudget;

      if (shouldYieldByIdle || shouldYieldByTime) {
        break;
      }

      handler(queue.shift());
    }

    if (queue.length > 0) {
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(runChunk);
      } else {
        setTimeout(() => runChunk(), 0);
      }
    }
  }

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(runChunk);
  } else {
    setTimeout(() => runChunk(), 0);
  }
}

scheduleChunk([1, 2, 3, 4, 5], (item) => {
  console.log('render item:', item);
});
