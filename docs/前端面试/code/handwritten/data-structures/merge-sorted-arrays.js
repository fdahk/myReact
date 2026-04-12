/*
实现目标：
- 合并两个有序数组，返回新的有序数组。

核心思路：
- 双指针同步遍历两个数组。
- 每次取更小的那个推进。
*/

function mergeSorted(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    result.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }

  return result.concat(a.slice(i), b.slice(j));
}

console.log(mergeSorted([1, 3, 5], [2, 4, 6]));
