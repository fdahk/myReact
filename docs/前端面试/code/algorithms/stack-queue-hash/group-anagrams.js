/**
 * 题目：字母异位词分组（Group Anagrams）
 * 目标：把互为字母异位词的字符串分到同一组。
 * 核心思路：
 * 1. 对每个单词排序后得到一个规范化 key。
 * 2. 互为异位词的单词排序后结果相同，因此会落到同一个桶里。
 * 3. 用 Map 维护 key 到字符串数组的映射，最后返回所有分组结果。
 * 时间复杂度：O(n * k log k)，其中 k 是单词平均长度。
 * 空间复杂度：O(nk)。
 * 易错点 / 面试表达：
 * 1. 排序 key 写法简单直观，若字符集固定，也可以用计数 key 优化。
 * 2. Map 里第一次遇到某个 key 时要先初始化空数组。
 * 3. 面试中可以主动补充两种 key 设计方案，体现思考深度。
 */
function groupAnagrams(words) {
  const map = new Map();

  for (const word of words) {
    const key = [...word].sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(word);
  }

  return [...map.values()];
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
