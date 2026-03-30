/*
实现目标：
- 手写一个最小版 `keep-alive` 缓存器，理解组件实例缓存与复用的核心思路。
-
核心思路：
- 用 `Map` 以组件 key 为索引缓存实例。
- 命中缓存时直接复用，未命中时创建并加入缓存。
- 当缓存超出上限时，淘汰最旧的一项，形成最小 LRU 风格。
-
复杂度 / 运行特征：
- 命中与写入都可近似看作 O(1)。
-
易错点：
- `keep-alive` 缓存的是组件实例 / 渲染结果，不是简单缓存 props。
- 真实 Vue 还会支持 include / exclude / activated / deactivated。
-
适用场景 / 面试表达点：
- 适合解释 Vue 路由切换保活、组件缓存与失活激活机制。
*/

class KeepAliveCache {
  constructor(max = Infinity) {
    this.max = max;
    this.cache = new Map();
  }

  get(key, factory) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }

    const instance = factory();
    this.cache.set(key, instance);

    if (this.cache.size > this.max) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    return instance;
  }
}

const keepAlive = new KeepAliveCache(2);
console.log(keepAlive.get('Home', () => ({ name: 'HomeView' })));
console.log(keepAlive.get('About', () => ({ name: 'AboutView' })));

export { KeepAliveCache };
