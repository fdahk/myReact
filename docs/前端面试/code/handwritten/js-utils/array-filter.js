/*
实现目标：
- 手写 `Array.prototype.filter` 的核心逻辑。
-
核心思路：
- 遍历数组，对每个有效索引执行判断回调。
- 返回值为真时，把当前元素推入结果数组。
- 支持 `thisArg`，并跳过稀疏数组空洞。
-
复杂度 / 运行特征：
- 时间复杂度 O(n)，结果数组空间复杂度最坏 O(n)。
-
易错点：
- `filter` 返回的是新数组。
- 判断通过时应保留原元素，不是保留回调返回值。
*/

function arrayFilter(array, callback, thisArg) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must be an array');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  const result = [];

  for (let index = 0; index < array.length; index += 1) {
    if (!(index in array)) {
      continue;
    }

    if (callback.call(thisArg, array[index], index, array)) {
      result.push(array[index]);
    }
  }

  return result;
}

console.log(arrayFilter([1, 2, 3, 4], (item) => item % 2 === 0));
