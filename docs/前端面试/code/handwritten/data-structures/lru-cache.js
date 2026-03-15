/*
实现目标：
- 实现一个简化版 LRU（Least Recently Used）缓存，支持按容量淘汰“最近最少使用”的键值对。
-
核心思路：
- 标准高性能写法通常是“哈希表 + 双向链表”，可以把 `get` / `put` 都做到严格 O(1)。
- 当前示例为了突出 LRU 的访问顺序语义，直接复用 `Map` 的插入有序特性：
- 访问或更新某个 key 时，先删除再重新插入，让它移动到“最新使用”的位置。
- 容量超限时，淘汰 `Map` 中最早插入、也就是最久未使用的那个 key。
-
复杂度 / 运行特征：
- 从语义上看，这个实现完整表达了 LRU 行为。
- 在现代 JavaScript 引擎中，`Map` 的 `get` / `set` / `delete` 通常可近似看作 O(1)。
- 相比链表版本，这个实现更短、更适合面试第一版答案，但不强调底层结构控制。
-
易错点：
- `get` 不能只返回值，必须顺带刷新该 key 的“最近使用”顺序。
- `put` 更新已有 key 时也要先删除再插入，否则顺序不会变化。
- 容量满时淘汰的是最旧 key，而不是随机 key，也不是最近访问的 key。
-
适用场景 / 面试表达点：
- 常见于页面缓存、接口结果缓存、数据库热点数据缓存。
- 面试时可以先给出 `Map` 版快速说明思路，再补一句“若题目强调严格结构设计，可升级成哈希表 + 双向链表”。
*/

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }

    const value = this.map.get(key);
    // 删除后重新插入，借助 Map 的顺序语义把该键刷新为最近使用。
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      // 已存在时先删除，避免旧顺序残留。
      this.map.delete(key);
    }

    this.map.set(key, value);

    if (this.map.size > this.capacity) {
      // Map 的第一个键就是当前“最久未使用”的键。
      // 调用迭代器的 next() 方法，会返回一个包含 value 和 done 的对象：
      // value：当前迭代位置的键（第一次调用 next() 就是第一个插入的键）；
      // done：布尔值，表示迭代是否结束（第一次调用为 false）。
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}

const cache = new LRUCache(2);
cache.put('a', 1);
cache.put('b', 2);
cache.get('a');
cache.put('c', 3);
console.log(cache.get('b'));
