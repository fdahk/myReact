/*
实现目标：
- 手写一个最基础的 Proxy 使用示例，展示 `get` / `set` 拦截。

核心思路：
- 代理对象属性读取和写入。
- 在拦截器里打印访问日志，再回落到真实对象。
*/

const target = { count: 0 };

const proxy = new Proxy(target, {
  get(obj, key) {
    console.log('get:', key);
    return obj[key];
  },
  set(obj, key, value) {
    console.log('set:', key, value);
    obj[key] = value;
    return true;
  },
});

proxy.count += 1;
console.log(proxy.count);
