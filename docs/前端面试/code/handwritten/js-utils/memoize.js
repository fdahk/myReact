/*
实现目标：
- 手写一个 `memoize`，缓存相同输入下的计算结果。
-
核心思路：
- 用 `Map` 记录“参数签名 -> 结果”映射。
- 再次收到相同参数时，直接返回缓存值而不是重新计算。
- 默认使用 `JSON.stringify(args)` 作为 key，强调的是面试思路而非完整生产方案。
-
复杂度 / 运行特征：
- 命中缓存时可近似看作 O(1)。
- 是否值得使用，取决于“计算成本”是否明显高于“生成 key + 存取缓存”的成本。
-
易错点：
- `JSON.stringify` 方案不适合函数参数、循环引用对象和键顺序敏感场景。
- 如果缓存无限增长，真实项目要继续补容量或淘汰策略。
-
适用场景 / 面试表达点：
- 常见于重复计算优化、配置解析、选择器缓存。
*/

function memoize(fn, resolver = (...args) => JSON.stringify(args)) {
  const cache = new Map();

  return function memoized(...args) {
    const key = resolver(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const add = memoize((a, b) => {
  console.log('compute');
  return a + b;
});

console.log(add(1, 2));
console.log(add(1, 2));
