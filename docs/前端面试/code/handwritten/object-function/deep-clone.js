/*
实现目标：
- 实现一个基础版深拷贝函数，能够递归复制常见引用类型，并处理循环引用。
-
核心思路：
- 深拷贝的关键不是“复制最外层对象”，而是把整棵引用结构都重新构造一遍。
- 对于基本类型直接返回；对于对象和数组则递归复制其内部成员。
- 为了避免循环引用导致无限递归，用 `WeakMap` 记录“源对象 -> 克隆结果”的映射。
- 另外对 `Date`、`RegExp` 这类内建对象做最常见的专项分支处理。
-
复杂度 / 运行特征：
- 若把可遍历成员总数记为 n，则时间复杂度通常为 O(n)，空间复杂度也约为 O(n)。
- 当前实现覆盖了对象、数组、`Date`、`RegExp` 和循环引用，是一个面试中足够清晰的版本。
- 但它没有完整保留原型链、属性描述符、`Map` / `Set` / 函数等复杂类型的语义。
-
易错点：
- 只做浅拷贝会共享内部引用，修改副本时会污染原对象。
- 不做缓存会在循环引用场景下栈溢出。
- 拷贝对象键时若只用 `Object.keys`，会漏掉 `Symbol` 键；这里用 `Reflect.ownKeys` 覆盖更全面。
-
适用场景 / 面试表达点：
- 常见于配置对象复制、状态快照、隔离副作用等场景。
- 面试时最好主动说明“这是基础版，真实工程里更推荐 `structuredClone` 或按类型定制处理策略”。
*/

// 使用weakMap而不是用Map是因为weakMap的key是弱引用，不会导致内存泄漏
function deepClone(value, cache = new WeakMap()) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (cache.has(value)) {
    // 命中缓存说明出现了循环引用或重复引用，直接复用已创建副本。
    return cache.get(value);
  }

  if (value instanceof Date) {
    return new Date(value);
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  if (Array.isArray(value)) {
    const result = [];
    cache.set(value, result);
    for (const item of value) {
      // 数组中的每一项仍然可能是嵌套对象，需要继续递归克隆。
      result.push(deepClone(item, cache));
    }
    return result;
  }

  const result = {};
  cache.set(value, result);
  for (const key of Reflect.ownKeys(value)) {
    // 使用 Reflect.ownKeys 保留字符串键和 Symbol 键。
    result[key] = deepClone(value[key], cache);
  }
  return result;
}

const source = { name: 'pzg', meta: { level: 1 }, tags: ['js', 'ts'] };
source.self = source;

const copied = deepClone(source);
console.log(copied.meta.level, copied.self === copied);
