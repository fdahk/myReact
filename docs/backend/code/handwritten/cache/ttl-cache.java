import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 面试讲解点：
 * 1. 基础版 TTL 缓存通常先做懒删除
 * 2. 真实生产版还会补定时清理、容量限制、统计指标
 * 3. 追问点：并发安全、过期精度、热点 key、本地缓存一致性
 */
final class TtlCache<K, V> {
    private final Map<K, ExpiringValue<V>> storage = new ConcurrentHashMap<>();

    void put(K key, V value, long ttlMillis) {
        long expireAt = System.currentTimeMillis() + ttlMillis;
        storage.put(key, new ExpiringValue<>(value, expireAt));
    }

    V get(K key) {
        ExpiringValue<V> value = storage.get(key);
        if (value == null) {
            return null;
        }
        if (value.expireAt < System.currentTimeMillis()) {
            storage.remove(key);
            return null;
        }
        return value.value;
    }

    void remove(K key) {
        storage.remove(key);
    }

    private static final class ExpiringValue<V> {
        private final V value;
        private final long expireAt;

        private ExpiringValue(V value, long expireAt) {
            this.value = value;
            this.expireAt = expireAt;
        }
    }
}
