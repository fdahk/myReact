/*
面试讲解点：数组扁平化
- 题目本质：本质是把嵌套结构拍平成线性结构，常见做法是递归或显式栈。
- 复杂度：时间复杂度通常 O(n)，空间复杂度与输出规模相关。
- 易错点：深层嵌套、是否限定层数、空数组和非数组元素处理。
- 追问方向：可以延伸到 flat 的手写和迭代版实现。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function flattenArray(input) {
  const result = [];

  function dfs(list) {
    for (const item of list) {
      if (Array.isArray(item)) {
        dfs(item);
      } else {
        result.push(item);
      }
    }
  }

  dfs(input);
  return result;
}

console.log(flattenArray([1, [2, [3, 4]], 5]));
