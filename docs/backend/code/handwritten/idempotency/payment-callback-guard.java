import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 面试讲解点：
 * 1. 支付回调核心不是“收到就处理”，而是先做幂等和状态校验
 * 2. 简化版用内存保存已处理回调，生产版通常要结合支付单状态机和数据库唯一约束
 * 3. 追问点：回调乱序、重复成功、状态回退、主动查询补偿
 */
final class PaymentCallbackGuard {
    private final Map<String, String> processedCallbacks = new ConcurrentHashMap<>();

    synchronized boolean tryProcess(String paymentId, String callbackStatus) {
        if (paymentId == null || paymentId.isBlank()) {
            throw new IllegalArgumentException("paymentId must not be blank");
        }
        if (callbackStatus == null || callbackStatus.isBlank()) {
            throw new IllegalArgumentException("callbackStatus must not be blank");
        }

        String currentStatus = processedCallbacks.get(paymentId);
        if (currentStatus == null) {
            processedCallbacks.put(paymentId, callbackStatus);
            return true;
        }
        if (isTerminal(currentStatus)) {
            return false;
        }
        processedCallbacks.put(paymentId, callbackStatus);
        return true;
    }

    String getCurrentStatus(String paymentId) {
        return processedCallbacks.get(paymentId);
    }

    private boolean isTerminal(String status) {
        return "SUCCESS".equals(status) || "REFUNDED".equals(status) || "CLOSED".equals(status);
    }
}
