/**
 * 题目目标：返回 n 皇后问题的所有合法棋盘摆法。
 * 核心思路：按行回溯放置皇后。
 * 每一行只尝试放一个皇后，并用三个集合分别记录已被占用的列、主对角线、副对角线；
 * 只有当前位置不与已有皇后冲突时才继续递归到下一行，回溯时再撤销占用状态。
 * 时间复杂度：整体为指数级，常见上界可描述为 O(n!)，具体取决于剪枝效果。
 * 空间复杂度：O(n^2)，棋盘本身占 O(n^2)，递归栈和集合占 O(n)。
 * 易错点 / 面试表达点：
 * 1. 主对角线可用 `row - col` 标识，副对角线可用 `row + col` 标识。
 * 2. “按行放置”能天然保证每行只有一个皇后，减少状态维度。
 * 3. 回溯题核心一定要讲清楚状态、选择、约束和撤销操作。
 */
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
      // 回溯时恢复棋盘和占用状态，继续尝试本行其他列。
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
