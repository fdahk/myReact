import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Supplier;

/**
 * 面试讲解点：
 * 1. BFF 聚合的核心是收敛多下游结果，而不是复制业务逻辑
 * 2. 简化版顺序执行多个数据源，生产版通常要并发化、超时和降级
 * 3. 追问点：部分失败、降级默认值、边缘缓存、trace 透传
 */
final class RequestAggregator {
    private final Map<String, Supplier<Object>> suppliers = new LinkedHashMap<>();

    void register(String section, Supplier<Object> supplier) {
        if (section == null || section.isBlank() || supplier == null) {
            throw new IllegalArgumentException("section and supplier must be valid");
        }
        suppliers.put(section, supplier);
    }

    Map<String, Object> aggregate() {
        Map<String, Object> result = new LinkedHashMap<>();
        for (Map.Entry<String, Supplier<Object>> entry : suppliers.entrySet()) {
            try {
                result.put(entry.getKey(), entry.getValue().get());
            } catch (RuntimeException ex) {
                result.put(entry.getKey(), null);
            }
        }
        return result;
    }
}
