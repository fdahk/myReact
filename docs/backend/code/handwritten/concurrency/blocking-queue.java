import java.util.ArrayDeque;
import java.util.Deque;

/**
 * 面试讲解点：
 * 1. 这是生产者消费者和线程池任务队列的微缩模型
 * 2. 核心是容量控制 + await/signal 协作
 * 3. 追问点：公平性、超时等待、关闭语义、中断处理
 */
final class BlockingQueue<T> {
    private final int capacity;
    private final Deque<T> queue = new ArrayDeque<>();

    BlockingQueue(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("capacity must be positive");
        }
        this.capacity = capacity;
    }

    synchronized void put(T item) throws InterruptedException {
        while (queue.size() >= capacity) {
            wait();
        }
        queue.addLast(item);
        notifyAll();
    }

    synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        T item = queue.removeFirst();
        notifyAll();
        return item;
    }

    synchronized int size() {
        return queue.size();
    }
}
