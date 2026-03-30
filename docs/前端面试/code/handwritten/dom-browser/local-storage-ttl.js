/*
实现目标：
- 手写一个带过期时间的本地缓存封装。
-
核心思路：
- 存储时把真实值和过期时间一起序列化进 `localStorage`。
- 读取时先判断是否已过期；若过期则清理并返回 `null`。
- 对调用方暴露 `set`、`get`、`remove` 三个最小方法。
-
复杂度 / 运行特征：
- 单次读写都可近似看作 O(1)。
- 真正的成本主要在序列化 / 反序列化和浏览器存储 IO。
-
易错点：
- 过期时间是读取时检查，不是浏览器自动帮你删除。
- `localStorage` 只能存字符串，需要手动 JSON 包装。
- 面试里可继续追问容量限制、降级到内存缓存、跨 tab 同步。
-
适用场景 / 面试表达点：
- 常见于接口缓存、草稿缓存、配置缓存。
*/

const storageWithTTL = {
  set(key, value, ttl) {
    const payload = {
      value,
      expireAt: ttl ? Date.now() + ttl : null,
    };

    localStorage.setItem(key, JSON.stringify(payload));
  },

  get(key) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    try {
      const payload = JSON.parse(raw);
      if (payload.expireAt && payload.expireAt <= Date.now()) {
        localStorage.removeItem(key);
        return null;
      }
      return payload.value;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

export { storageWithTTL };
