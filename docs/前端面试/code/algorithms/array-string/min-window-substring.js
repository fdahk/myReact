/**
 * 题目：最小覆盖子串（Minimum Window Substring）
 * 目标：在字符串 s 中找到包含 t 所有字符的最短子串。
 * 核心思路：
 * 1. 用滑动窗口维护当前区间 [left, right] 内字符统计。
 * 2. need 记录目标字符频次，windowCount 记录当前窗口频次。
 * 3. 当窗口已经覆盖所有目标字符时，持续收缩左边界，直到刚好不满足覆盖条件。
 * 时间复杂度：O(|s| + |t|)，左右指针都只线性移动。
 * 空间复杂度：O(|字符集|)。
 * 易错点 / 面试表达：
 * 1. valid 统计的是“满足频次要求的字符种类数”，不是字符总数。
 * 2. 收缩窗口时要先判断当前字符是否会破坏覆盖，再减少计数。
 * 3. 面试表达可强调：这是典型“先扩张满足条件，再收缩求最优”的滑窗模板。
 */
function minWindow(s, t) {
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) ?? 0) + 1);
  }

  let left = 0;
  let valid = 0;
  let start = 0;
  let minLength = Infinity;
  const windowCount = new Map();

  for (let right = 0; right < s.length; right += 1) {
    const char = s[right];

    if (need.has(char)) {
      windowCount.set(char, (windowCount.get(char) ?? 0) + 1);
      if (windowCount.get(char) === need.get(char)) {
        valid += 1;
      }
    }

    // 当前窗口已经覆盖 t，尝试收缩出更短答案。
    while (valid === need.size) {
      if (right - left + 1 < minLength) {
        start = left;
        minLength = right - left + 1;
      }

      const leftChar = s[left];
      left += 1;

      if (need.has(leftChar)) {
        if (windowCount.get(leftChar) === need.get(leftChar)) {
          valid -= 1;
        }
        windowCount.set(leftChar, windowCount.get(leftChar) - 1);
      }
    }
  }

  return minLength === Infinity ? '' : s.slice(start, start + minLength);
}

console.log(minWindow('ADOBECODEBANC', 'ABC'));
