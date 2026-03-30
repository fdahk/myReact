/*
实现目标：
- 手写一个批量上报埋点队列，把零散事件按批次合并发送。
-
核心思路：
- 用数组缓存事件。
- 达到批量阈值时立即发送；否则开启一个延迟定时器，等到窗口结束后一起发送。
- 发送完成后清空当前批次，并重置定时器状态。
-
复杂度 / 运行特征：
- 单次入队近似 O(1)。
- 这种模式的价值在于“减少请求次数”，而不是优化单次事件处理复杂度。
-
易错点：
- 发送前要复制一份当前批次，避免异步发送期间被后续事件污染。
- 失败时是丢弃、重试还是回滚回队列，要根据业务要求决定；这里示例走回滚。
-
适用场景 / 面试表达点：
- 常见于埋点上报、日志聚合、批量同步。
*/

class BatchReportQueue {
  constructor(send, options = {}) {
    this.send = send;
    this.maxSize = options.maxSize || 5;
    this.delay = options.delay || 1000;
    this.queue = [];
    this.timer = null;
  }

  push(event) {
    this.queue.push(event);

    if (this.queue.length >= this.maxSize) {
      this.flush();
      return;
    }

    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.flush();
      }, this.delay);
    }
  }

  async flush() {
    if (this.queue.length === 0) {
      return;
    }

    const batch = this.queue.slice();
    this.queue = [];
    clearTimeout(this.timer);
    this.timer = null;

    try {
      await this.send(batch);
    } catch (error) {
      this.queue.unshift(...batch);
      throw error;
    }
  }
}

const reporter = new BatchReportQueue(async (batch) => {
  console.log('report batch:', batch);
});

reporter.push({ type: 'click', target: 'button-a' });
reporter.push({ type: 'view', target: 'page-home' });
