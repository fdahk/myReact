/**
 * 题目：无重复字符的最长子串（Longest Substring Without Repeating Characters）
 * 目标：求字符串中不含重复字符的最长连续子串长度。
 * 核心思路：
 * 1. 使用滑动窗口维护一个始终“无重复”的区间 [left, right]。
 * 2. 哈希表记录每个字符最近一次出现的位置。
 * 3. 当右指针遇到重复字符时，把左边界跳到该字符上一次出现位置的后一位。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(|字符集|)。
 * 易错点 / 面试表达：
 * 1. left 只能向右移动，不能回退，所以要判断重复位置是否仍在当前窗口内。
 * 2. 哈希表里存“最近位置”比存频次更适合这个题的跳跃式收缩。
 * 3. 面试中可以总结为“滑窗 + 最近位置表”的标准写法。
 */
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right += 1) {
    const char = s[right];

    // 只有重复字符仍在当前窗口内时，才需要更新左边界。
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }

    map.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log(lengthOfLongestSubstring('abcabcbb'));
