/**
 * 题目：编辑距离（Edit Distance）
 * 目标：求把 word1 转换成 word2 所需的最少操作数，操作包括插入、删除、替换。
 * 核心思路：
 * 1. 设 dp[i][j] 表示 word1 前 i 个字符变成 word2 前 j 个字符的最小代价。
 * 2. 若末尾字符相同，则不需要新增操作，直接继承 dp[i - 1][j - 1]。
 * 3. 若不同，则在“删除、插入、替换”三种操作中取最小值再加 1。
 * 时间复杂度：O(mn)。
 * 空间复杂度：O(mn)。
 * 易错点 / 面试表达：
 * 1. dp 下标和字符串下标错一位，比较字符时要用 i - 1 和 j - 1。
 * 2. 初始化第一行、第一列表示空串到目标串的编辑代价。
 * 3. 面试时建议把三种转移和各自语义分别讲清楚。
 */
function minDistance(word1, word2) {
  const rows = word1.length + 1;
  const cols = word2.length + 1;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  // 空串和非空串之间只能靠纯插入或纯删除完成转换。
  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 分别对应删除、插入、替换三种操作。
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[word1.length][word2.length];
}

console.log(minDistance('horse', 'ros'));
