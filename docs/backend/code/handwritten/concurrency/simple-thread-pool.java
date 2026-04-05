import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * 面试讲解点：
 * 1. 线程池核心是任务队列 + 工作线程复用 + 关闭语义
 * 2. 简化版先不做拒绝策略扩展、超时获取和动态伸缩
 * 3. 追问点：有界队列、拒绝策略、中断处理、优雅关闭
 */
final class SimpleThreadPool {
    private final Deque<Runnable> queue = new ArrayDeque<>();
    private final List<Worker> workers = new ArrayList<>();
    private final int queueCapacity;
    private boolean shutdown;

    SimpleThreadPool(int workerCount, int queueCapacity) {
        if (workerCount <= 0 || queueCapacity <= 0) {
            throw new IllegalArgumentException("workerCount and queueCapacity must be positive");
        }
        this.queueCapacity = queueCapacity;
        for (int i = 0; i < workerCount; i++) {
            Worker worker = new Worker("simple-pool-worker-" + i);
            workers.add(worker);
            worker.start();
        }
    }

    void execute(Runnable task) throws InterruptedException {
        if (task == null) {
            throw new IllegalArgumentException("task must not be null");
        }
        synchronized (queue) {
            while (!shutdown && queue.size() >= queueCapacity) {
                queue.wait();
            }
            if (shutdown) {
                throw new IllegalStateException("thread pool already shutdown");
            }
            queue.addLast(task);
            queue.notifyAll();
        }
    }

    void shutdown() {
        synchronized (queue) {
            shutdown = true;
            queue.notifyAll();
        }
    }

    void awaitTermination() throws InterruptedException {
        for (Worker worker : workers) {
            worker.join();
        }
    }

    private final class Worker extends Thread {
        private Worker(String name) {
            super(name);
        }

        @Override
        public void run() {
            while (true) {
                Runnable task;
                synchronized (queue) {
                    while (queue.isEmpty() && !shutdown) {
                        try {
                            queue.wait();
                        } catch (InterruptedException e) {
                            interrupt();
                            return;
                        }
                    }
                    if (queue.isEmpty() && shutdown) {
                        return;
                    }
                    task = queue.removeFirst();
                    queue.notifyAll();
                }

                try {
                    task.run();
                } catch (RuntimeException ignored) {
                    // 简化版：生产版要做日志、隔离和失败统计。
                }
            }
        }
    }
}
