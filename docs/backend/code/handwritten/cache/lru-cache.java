import java.util.HashMap;
import java.util.Map;

/**
 * 面试讲解点：
 * 1. 核心结构是 HashMap + 双向链表，保证 get/put 都是 O(1)
 * 2. 命中后要移动到头部，容量满时淘汰尾部
 * 3. 升级追问常见点：线程安全、TTL、批量淘汰、统计命中率
 */
final class LruCache<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> cache = new HashMap<>();
    private final Node<K, V> head = new Node<>(null, null);
    private final Node<K, V> tail = new Node<>(null, null);

    LruCache(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("capacity must be positive");
        }
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    V get(K key) {
        Node<K, V> node = cache.get(key);
        if (node == null) {
            return null;
        }
        moveToHead(node);
        return node.value;
    }

    void put(K key, V value) {
        Node<K, V> existing = cache.get(key);
        if (existing != null) {
            existing.value = value;
            moveToHead(existing);
            return;
        }

        Node<K, V> node = new Node<>(key, value);
        cache.put(key, node);
        addToHead(node);

        if (cache.size() > capacity) {
            Node<K, V> removed = removeTail();
            cache.remove(removed.key);
        }
    }

    int size() {
        return cache.size();
    }

    private void moveToHead(Node<K, V> node) {
        removeNode(node);
        addToHead(node);
    }

    private void addToHead(Node<K, V> node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private Node<K, V> removeTail() {
        Node<K, V> node = tail.prev;
        removeNode(node);
        return node;
    }

    private static final class Node<K, V> {
        private final K key;
        private V value;
        private Node<K, V> prev;
        private Node<K, V> next;

        private Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }
}
