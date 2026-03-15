/**
 * 题目：最长公共子序列（Longest Common Subsequence）
 * 目标：求两个字符串的最长公共子序列长度。
 * 核心思路：
 * 1. 设 dp[i][j] 表示 text1 前 i 个字符与 text2 前 j 个字符的 LCS 长度。
 * 2. 若当前字符相同，则可以把这两个字符接到公共子序列后面，转移为 dp[i - 1][j - 1] + 1。
 * 3. 若不同，则只能舍弃其中一个字符，取 dp[i - 1][j] 和 dp[i][j - 1] 的较大值。
 * 时间复杂度：O(mn)。
 * 空间复杂度：O(mn)。
 * 易错点 / 面试表达：
 * 1. “子序列”不要求连续，这是和子串问题最关键的区别。
 * 2. dp 维度多开一行一列，能统一处理空串边界。
 * 3. 面试中可以强调状态定义，很多转移是否能写对取决于定义是否清晰。
 */
function longestCommonSubsequence(text1, text2) {
  const rows = text1.length + 1;
  const cols = text2.length + 1;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 当前字符不匹配时，尝试分别跳过一边的末尾字符。
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
}

console.log(longestCommonSubsequence('abcde', 'ace'));
