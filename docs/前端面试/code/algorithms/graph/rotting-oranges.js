function orangesRotting(grid) {
  const queue = [];
  let fresh = 0;
  let minutes = 0;

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      if (grid[row][col] === 2) {
        queue.push([row, col]);
      } else if (grid[row][col] === 1) {
        fresh += 1;
      }
    }
  }

  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length && fresh > 0) {
    const size = queue.length;
    minutes += 1;

    for (let i = 0; i < size; i += 1) {
      const [row, col] = queue.shift();
      for (const [dr, dc] of directions) {
        const nextRow = row + dr;
        const nextCol = col + dc;
        if (
          nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length || grid[nextRow][nextCol] !== 1
        ) {
          continue;
        }
        grid[nextRow][nextCol] = 2;
        fresh -= 1;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]));
