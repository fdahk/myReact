import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 面试讲解点：
 * 1. 幂等控制的核心不是“挡住重复”，而是让重复执行结果仍安全
 * 2. 这个简化版只演示基于请求键和 TTL 的本地防重思路
 * 3. 追问点：分布式场景如何做、结果缓存、失败状态、并发争抢
 */
final class IdempotencyGuard {
    private final Map<String, Long> processedRequests = new ConcurrentHashMap<>();

    boolean tryEnter(String requestKey, Duration ttl) {
        long now = System.currentTimeMillis();
        long expireAt = now + ttl.toMillis();

        Long existing = processedRequests.putIfAbsent(requestKey, expireAt);
        if (existing == null) {
            return true;
        }

        if (existing < now) {
            processedRequests.replace(requestKey, existing, expireAt);
            return true;
        }

        return false;
    }

    void cleanupExpiredKeys() {
        long now = System.currentTimeMillis();
        processedRequests.entrySet().removeIf(entry -> entry.getValue() < now);
    }
}
