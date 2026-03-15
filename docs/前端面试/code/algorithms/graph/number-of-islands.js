/**
 * 题目目标：统计二维网格中由字符 `'1'` 组成的岛屿数量。
 * 核心思路：遍历整个网格，遇到一个尚未访问的陆地就计数加一，
 * 然后用 DFS 把与它连通的上下左右陆地全部“淹没”为 `'0'`，避免重复计数。
 * 时间复杂度：O(m * n)，每个格子最多访问一次。
 * 空间复杂度：O(m * n)，最坏情况下递归栈会达到整个网格大小。
 * 易错点 / 面试表达点：
 * 1. 访问过的陆地必须及时标记，否则会重复搜索同一块岛屿。
 * 2. 本题默认是上下左右四联通，不包含对角线。
 * 3. 除 DFS 外，也可以用 BFS 或并查集实现，面试里可顺带扩展。
 */
function numIslands(grid) {
  if (!grid.length) {
    return 0;
  }

  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] !== '1') {
      return;
    }

    // 原地改写为水域，兼作 visited 标记。
    grid[row][col] = '0';
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (grid[row][col] === '1') {
        count += 1;
        // 每次从一块新陆地出发，完整清掉整座岛屿。
        dfs(row, col);
      }
    }
  }

  return count;
}

console.log(numIslands([
  ['1', '1', '0', '0'],
  ['1', '0', '0', '1'],
  ['0', '0', '1', '1'],
]));
