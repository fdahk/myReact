/*
实现目标：
- 手写一个可启动、可停止的 polling 轮询器。

核心思路：
- 用递归 `setTimeout` 代替 `setInterval`。
- 上一次请求结束后再安排下一次，避免重叠请求。

适用场景：
- 状态轮询
- 任务进度查询
- 弱实时数据刷新
*/

function createPolling(task, interval = 3000) {
  let timer = null;
  let stopped = true;

  const run = async () => {
    if (stopped) return;

    try {
      await task();
    } finally {
      if (!stopped) {
        timer = setTimeout(run, interval);
      }
    }
  };

  return {
    start() {
      if (!stopped) return;
      stopped = false;
      run();
    },
    stop() {
      stopped = true;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    },
  };
}

const polling = createPolling(async () => {
  console.log('polling...');
}, 1000);

polling.start();
setTimeout(() => polling.stop(), 3500);
