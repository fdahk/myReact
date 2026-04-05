import java.time.Duration;
import java.util.concurrent.Callable;

/**
 * 面试讲解点：
 * 1. 重试器不是无限重试，必须有次数上限和退避
 * 2. 真正生产版要区分可重试异常和不可重试异常
 * 3. 追问点：幂等、熔断、超时预算、抖动 jitter
 */
final class Retryer<T> {
    private final int maxAttempts;
    private final Duration initialDelay;

    Retryer(int maxAttempts, Duration initialDelay) {
        this.maxAttempts = maxAttempts;
        this.initialDelay = initialDelay;
    }

    T execute(Callable<T> action) throws Exception {
        long delayMillis = initialDelay.toMillis();
        Exception lastException = null;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return action.call();
            } catch (Exception ex) {
                lastException = ex;
                if (attempt == maxAttempts) {
                    break;
                }
                Thread.sleep(delayMillis);
                delayMillis *= 2;
            }
        }

        throw lastException;
    }
}
