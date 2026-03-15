/**
 * 题目：最长回文子串（Longest Palindromic Substring）
 * 目标：返回字符串中最长的回文子串。
 * 核心思路：
 * 1. 回文串以某个“中心”向两侧对称扩展，因此枚举每个位置作为回文中心。
 * 2. 中心分两类：奇数长度中心 (i, i) 和偶数长度中心 (i, i + 1)。
 * 3. 每次扩展得到当前中心能覆盖的最远回文区间，再更新全局最优答案。
 * 时间复杂度：O(n^2)，每个中心最坏扩展 O(n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 既要处理奇回文，也要处理偶回文，漏掉一种就会丢答案。
 * 2. 扩展结束时 left/right 已经越过合法边界，返回时要回退一步。
 * 3. 面试中可补充：该方法实现简单，若追求更优可再提 Manacher。
 */
function longestPalindrome(s) {
  if (s.length < 2) {
    return s;
  }

  let start = 0;
  let end = 0;

  function expand(left, right) {
    // 从中心向外扩展，直到不再满足回文条件。
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left -= 1;
      right += 1;
    }
    return [left + 1, right - 1];
  }

  for (let i = 0; i < s.length; i += 1) {
    const [l1, r1] = expand(i, i);
    const [l2, r2] = expand(i, i + 1);

    if (r1 - l1 > end - start) {
      start = l1;
      end = r1;
    }
    if (r2 - l2 > end - start) {
      start = l2;
      end = r2;
    }
  }

  return s.slice(start, end + 1);
}

console.log(longestPalindrome('babad'));
