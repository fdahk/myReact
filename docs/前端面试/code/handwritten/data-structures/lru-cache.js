/*
面试讲解点：LRU 缓存
- 题目本质：本质是同时满足 O(1) 查询和 O(1) 更新，所以通常用哈希表加双向链表。
- 复杂度：get 和 put 的核心操作通常都是 O(1)，额外空间 O(capacity)。
- 易错点：只用数组会退化到 O(n)；更新已存在 key 时要先移动到头部；容量满时要淘汰尾节点。
- 追问方向：可以继续延伸为什么不用 FIFO、如果要实现 LFU 应该怎么改。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
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
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }

    this.map.set(key, value);

    if (this.map.size > this.capacity) {
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
