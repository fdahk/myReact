/*
实现目标：
- 手写 `Array.prototype.reduce` 的核心逻辑。
-
核心思路：
- 若传入初始值，则从第 0 项开始累积。
- 若未传入初始值，则从第一个有效元素开始，并把它作为初始累积器。
- 遍历过程中不断用回调返回的新值更新累积器。
-
复杂度 / 运行特征：
- 时间复杂度 O(n)，空间复杂度 O(1)。
-
易错点：
- 空数组且未传初始值时必须抛错。
- 稀疏数组空洞应跳过。
*/

function arrayReduce(array, callback, initialValue) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must be an array');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  const hasInitialValue = arguments.length >= 3;
  let accumulator = initialValue;
  let startIndex = 0;

  if (!hasInitialValue) {
    while (startIndex < array.length && !(startIndex in array)) {
      startIndex += 1;
    }

    if (startIndex >= array.length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = array[startIndex];
    startIndex += 1;
  }

  for (let index = startIndex; index < array.length; index += 1) {
    if (!(index in array)) {
      continue;
    }

    accumulator = callback(accumulator, array[index], index, array);
  }

  return accumulator;
}

console.log(arrayReduce([1, 2, 3, 4], (sum, item) => sum + item, 0));
