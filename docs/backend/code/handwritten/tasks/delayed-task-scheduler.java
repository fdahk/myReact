import java.util.PriorityQueue;

/**
 * 面试讲解点：
 * 1. 延迟任务的核心是按触发时间排序 + 工作线程等待最近到期任务
 * 2. 这个模型可以映射到订单超时取消、补偿回查、延迟重试
 * 3. 追问点：多 worker、取消任务、持久化、时间轮、重启恢复
 */
final class DelayedTaskScheduler {
    private final PriorityQueue<ScheduledTask> queue = new PriorityQueue<>();
    private boolean shutdown;

    synchronized void schedule(Runnable task, long delayMillis) {
        if (task == null) {
            throw new IllegalArgumentException("task must not be null");
        }
        if (delayMillis < 0) {
            throw new IllegalArgumentException("delayMillis must not be negative");
        }
        queue.offer(new ScheduledTask(System.currentTimeMillis() + delayMillis, task));
        notifyAll();
    }

    synchronized void shutdown() {
        shutdown = true;
        notifyAll();
    }

    void runLoop() throws InterruptedException {
        while (true) {
            ScheduledTask taskToRun;
            synchronized (this) {
                while (queue.isEmpty() && !shutdown) {
                    wait();
                }
                if (queue.isEmpty() && shutdown) {
                    return;
                }

                long now = System.currentTimeMillis();
                ScheduledTask first = queue.peek();
                long waitMillis = first.triggerAtMillis - now;
                if (waitMillis > 0) {
                    wait(waitMillis);
                    continue;
                }
                taskToRun = queue.poll();
            }

            try {
                taskToRun.task.run();
            } catch (RuntimeException ignored) {
                // 简化版：生产版要加重试、日志和失败补偿。
            }
        }
    }

    private static final class ScheduledTask implements Comparable<ScheduledTask> {
        private final long triggerAtMillis;
        private final Runnable task;

        private ScheduledTask(long triggerAtMillis, Runnable task) {
            this.triggerAtMillis = triggerAtMillis;
            this.task = task;
        }

        @Override
        public int compareTo(ScheduledTask other) {
            return Long.compare(this.triggerAtMillis, other.triggerAtMillis);
        }
    }
}
