/**
 * 题目目标：计算腐烂橘子把所有新鲜橘子感染所需的最少分钟数；若无法全部感染则返回 -1。
 * 核心思路：多源 BFS。先把所有初始腐烂橘子同时入队，作为第 0 分钟的起点，
 * 之后按层向四个方向扩散，每处理完一层就代表过去了 1 分钟。
 * 时间复杂度：O(m * n)，每个格子最多入队一次。
 * 空间复杂度：O(m * n)，队列最坏可能存放整个网格。
 * 易错点 / 面试表达点：
 * 1. 这是标准“多源最短扩散”模型，和单源 BFS 的区别是初始队列里有多个起点。
 * 2. 分钟数应该按层累计，而不是每感染一个橘子就加一。
 * 3. 结束后要检查是否还有新鲜橘子残留，这是返回 -1 的关键。
 */
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

    // 一层代表一分钟，这一轮只处理当前已经腐烂的橘子。
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
        // 感染后立刻改状态并入队，避免同一轮被重复加入。
        grid[nextRow][nextCol] = 2;
        fresh -= 1;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]));
