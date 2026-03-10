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
