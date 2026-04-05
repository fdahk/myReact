import java.util.ArrayDeque;
import java.util.Deque;

/**
 * 面试讲解点：
 * 1. 滑动窗口比固定窗口更平滑，能减少临界点突刺
 * 2. 核心是记录窗口内请求时间点，并持续淘汰过期请求
 * 3. 追问点：高并发优化、分桶聚合、分布式限流、时间精度
 */
final class SlidingWindowRateLimiter {
    private final int maxRequests;
    private final long windowMillis;
    private final Deque<Long> timestamps = new ArrayDeque<>();

    SlidingWindowRateLimiter(int maxRequests, long windowMillis) {
        if (maxRequests <= 0 || windowMillis <= 0) {
            throw new IllegalArgumentException("maxRequests and windowMillis must be positive");
        }
        this.maxRequests = maxRequests;
        this.windowMillis = windowMillis;
    }

    synchronized boolean allowRequest() {
        long now = System.currentTimeMillis();
        evictExpired(now);
        if (timestamps.size() >= maxRequests) {
            return false;
        }
        timestamps.addLast(now);
        return true;
    }

    synchronized int currentWindowSize() {
        evictExpired(System.currentTimeMillis());
        return timestamps.size();
    }

    private void evictExpired(long now) {
        long expireBefore = now - windowMillis;
        while (!timestamps.isEmpty() && timestamps.peekFirst() <= expireBefore) {
            timestamps.removeFirst();
        }
    }
}
