/**
 * 面试讲解点：
 * 1. 令牌桶核心是按速率补 token，按容量截断
 * 2. 适合允许短时间突发流量，但总体速率要受控的场景
 * 3. 追问点：并发安全、时钟精度、分布式实现、预热策略
 */
final class TokenBucketRateLimiter {
    private final long capacity;
    private final long refillPerSecond;
    private double tokens;
    private long lastRefillTimeNanos;

    TokenBucketRateLimiter(long capacity, long refillPerSecond) {
        if (capacity <= 0 || refillPerSecond <= 0) {
            throw new IllegalArgumentException("invalid limiter config");
        }
        this.capacity = capacity;
        this.refillPerSecond = refillPerSecond;
        this.tokens = capacity;
        this.lastRefillTimeNanos = System.nanoTime();
    }

    synchronized boolean tryAcquire() {
        refill();
        if (tokens < 1) {
            return false;
        }
        tokens -= 1;
        return true;
    }

    private void refill() {
        long now = System.nanoTime();
        double elapsedSeconds = (now - lastRefillTimeNanos) / 1_000_000_000.0;
        if (elapsedSeconds <= 0) {
            return;
        }
        tokens = Math.min(capacity, tokens + elapsedSeconds * refillPerSecond);
        lastRefillTimeNanos = now;
    }
}
