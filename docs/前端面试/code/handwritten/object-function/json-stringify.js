/*
实现目标：
- 手写一个简化版 `JSON.stringify`，覆盖面试里最常见的对象、数组、字符串、数字、布尔值和 `null` 场景。
-
核心思路：
- 基本类型直接转成 JSON 字面量。
- 数组逐项递归序列化，`undefined` / 函数 / `Symbol` 在数组里按 `null` 处理。
- 对象只保留可枚举自有属性；值为 `undefined` / 函数 / `Symbol` 的键直接跳过。
- 用 `WeakSet` 记录访问路径，发现循环引用时抛错，模拟原生行为。
-
复杂度 / 运行特征：
- 时间复杂度通常为 O(n)，n 为整棵对象图的可遍历节点数。
- 当前实现是“面试说明版”，没有覆盖 `replacer`、`space`、`toJSON` 等完整能力。
-
易错点：
- `NaN`、`Infinity` 和 `-Infinity` 在 JSON 里都要转成 `null`。
- 对象里的 `undefined` 会被忽略，但数组里的 `undefined` 会变成 `null`。
- 遇到循环引用时必须终止，否则会无限递归。
-
适用场景 / 面试表达点：
- 适合讲 JSON 规则、递归序列化、不同类型的丢失语义。
- 面试里可以主动说明“这是简化版，完整版要继续支持 replacer / space / toJSON”。
*/

function stringifyValue(value, cache) {
  if (value === null) {
    return 'null';
  }

  const valueType = typeof value;

  if (valueType === 'string') {
    return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }

  if (valueType === 'number') {
    return Number.isFinite(value) ? String(value) : 'null';
  }

  if (valueType === 'boolean') {
    return String(value);
  }

  if (valueType === 'undefined' || valueType === 'function' || valueType === 'symbol') {
    return undefined;
  }

  if (cache.has(value)) {
    throw new TypeError('Converting circular structure to JSON');
  }

  cache.add(value);

  if (Array.isArray(value)) {
    const items = value.map((item) => {
      const serialized = stringifyValue(item, cache);
      return serialized === undefined ? 'null' : serialized;
    });
    cache.delete(value);
    return `[${items.join(',')}]`;
  }

  const entries = [];
  for (const key of Object.keys(value)) {
    const serialized = stringifyValue(value[key], cache);
    if (serialized !== undefined) {
      entries.push(`"${key}":${serialized}`);
    }
  }

  cache.delete(value);
  return `{${entries.join(',')}}`;
}

function jsonStringify(value) {
  return stringifyValue(value, new WeakSet());
}

console.log(jsonStringify({ name: 'pzg', score: 99, list: [1, undefined, true] }));
