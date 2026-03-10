function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => new Array(n).fill('.'));
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function backtrack(row) {
    if (row === n) {
      result.push(board.map((line) => line.join('')));
      return;
    }

    for (let col = 0; col < n; col += 1) {
      const d1 = row - col;
      const d2 = row + col;
      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);
      board[row][col] = 'Q';
      backtrack(row + 1);
      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return result;
}

console.log(solveNQueens(4));
