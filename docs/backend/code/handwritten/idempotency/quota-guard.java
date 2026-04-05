import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 面试讲解点：
 * 1. 配额守卫的核心是额度查询、原子扣减和失败返回
 * 2. 简化版用进程内内存模拟，生产版通常要落 Redis/Lua 或数据库乐观锁
 * 3. 追问点：预扣返还、周期重置、用量流水、分布式一致性
 */
final class QuotaGuard {
    private final Map<String, Integer> remainingQuota = new ConcurrentHashMap<>();

    void setQuota(String subjectKey, int quota) {
        if (subjectKey == null || subjectKey.isBlank()) {
            throw new IllegalArgumentException("subjectKey must not be blank");
        }
        if (quota < 0) {
            throw new IllegalArgumentException("quota must not be negative");
        }
        remainingQuota.put(subjectKey, quota);
    }

    synchronized boolean tryConsume(String subjectKey, int amount) {
        if (subjectKey == null || subjectKey.isBlank()) {
            throw new IllegalArgumentException("subjectKey must not be blank");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }

        int quota = remainingQuota.getOrDefault(subjectKey, 0);
        if (quota < amount) {
            return false;
        }
        remainingQuota.put(subjectKey, quota - amount);
        return true;
    }

    int getRemainingQuota(String subjectKey) {
        return remainingQuota.getOrDefault(subjectKey, 0);
    }

    synchronized void refund(String subjectKey, int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }
        remainingQuota.merge(subjectKey, amount, Integer::sum);
    }
}
