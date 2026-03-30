/*
实现目标：
- 手写合并区间，把重叠区间合并成最少区间集合。
-
核心思路：
- 先按区间起点排序。
- 遍历排序后的区间，和结果数组最后一个区间比较是否重叠。
- 重叠就扩展右边界，不重叠就新开一个区间。
-
复杂度 / 运行特征：
- 排序成本 O(n log n)，遍历合并 O(n)。
-
易错点：
- 排序是关键前提。
- 题目若要求原地修改，需要和当前返回新数组的写法区分开。
*/

function mergeIntervals(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }

  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
  const result = [sorted[0].slice()];

  for (let index = 1; index < sorted.length; index += 1) {
    const current = sorted[index];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current.slice());
    }
  }

  return result;
}

console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]));
