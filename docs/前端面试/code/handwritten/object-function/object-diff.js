/*
实现目标：
- 比较两个对象的一层差异，返回新旧值变化。

核心思路：
- 用 `Set` 合并两个对象的全部键。
- 遍历每个键，比较新旧值。
- 不相等时记录 `oldValue` / `newValue`。

复杂度：
- 时间复杂度 O(n)，n 为两个对象总键数。
*/

function diffObject(oldObj, newObj) {
  const result = {};
  const keys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of keys) {
    const oldValue = oldObj[key];
    const newValue = newObj[key];

    if (!Object.is(oldValue, newValue)) {
      result[key] = {};

      if (key in oldObj) {
        result[key].oldValue = oldValue;
      }

      if (key in newObj) {
        result[key].newValue = newValue;
      }
    }
  }

  return result;
}

console.log(diffObject({ a: 1, b: 2 }, { a: 1, b: 3, c: 2 }));
