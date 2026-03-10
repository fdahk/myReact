/*
面试讲解点：深拷贝
- 题目本质：本质是递归复制完整对象结构，而不是只复制一层引用。
- 复杂度：时间复杂度通常 O(n)，空间复杂度 O(n)。
- 易错点：循环引用、Date、RegExp、Map、Set、函数和原型链处理。
- 追问方向：可以追问 structuredClone 和 JSON 方案差异。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function deepClone(value, cache = new WeakMap()) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (cache.has(value)) {
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
      result.push(deepClone(item, cache));
    }
    return result;
  }

  const result = {};
  cache.set(value, result);
  for (const key of Reflect.ownKeys(value)) {
    result[key] = deepClone(value[key], cache);
  }
  return result;
}

const source = { name: 'pzg', meta: { level: 1 }, tags: ['js', 'ts'] };
source.self = source;

const copied = deepClone(source);
console.log(copied.meta.level, copied.self === copied);
