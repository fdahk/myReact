import java.util.Map;
import java.util.Set;

/**
 * 面试讲解点：
 * 1. 特性开关的核心是命中规则 + 默认兜底，而不是简单布尔变量
 * 2. 简化版只演示租户白名单和百分比分桶
 * 3. 追问点：多条件优先级、版本管理、灰度回滚、命中日志
 */
final class FeatureFlagEvaluator {
    private final String flagKey;
    private final boolean defaultEnabled;
    private final Set<String> tenantWhitelist;
    private final int rolloutPercentage;

    FeatureFlagEvaluator(
            String flagKey,
            boolean defaultEnabled,
            Set<String> tenantWhitelist,
            int rolloutPercentage) {
        if (flagKey == null || flagKey.isBlank()) {
            throw new IllegalArgumentException("flagKey must not be blank");
        }
        if (rolloutPercentage < 0 || rolloutPercentage > 100) {
            throw new IllegalArgumentException("rolloutPercentage must be between 0 and 100");
        }
        this.flagKey = flagKey;
        this.defaultEnabled = defaultEnabled;
        this.tenantWhitelist = tenantWhitelist;
        this.rolloutPercentage = rolloutPercentage;
    }

    boolean isEnabled(String userId, Map<String, String> context) {
        if (userId == null || userId.isBlank()) {
            return defaultEnabled;
        }

        String tenantId = context == null ? null : context.get("tenantId");
        if (tenantId != null && tenantWhitelist != null && tenantWhitelist.contains(tenantId)) {
            return true;
        }

        int bucket = Math.floorMod((flagKey + ":" + userId).hashCode(), 100);
        return bucket < rolloutPercentage ? true : defaultEnabled;
    }
}
