/*
实现目标：
- 手写 `Array.prototype.map` 的核心逻辑。
-
核心思路：
- 遍历原数组，对每个有效索引执行回调。
- 把回调返回值按原索引写入新数组。
- 支持 `thisArg`，并跳过稀疏数组中的空洞。
-
复杂度 / 运行特征：
- 时间复杂度 O(n)，空间复杂度 O(n)。
-
易错点：
- `map` 返回的是新数组，不修改原数组。
- 稀疏数组的空洞不会触发回调。
*/

function arrayMap(array, callback, thisArg) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must be an array');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  const result = new Array(array.length);

  for (let index = 0; index < array.length; index += 1) {
    if (!(index in array)) {
      continue;
    }

    result[index] = callback.call(thisArg, array[index], index, array);
  }

  return result;
}

console.log(arrayMap([1, 2, 3], (item) => item * 2));
