/**
 * 题目：有效的括号（Valid Parentheses）
 * 目标：判断括号字符串是否满足正确的配对和嵌套关系。
 * 核心思路：
 * 1. 用栈保存尚未匹配的左括号。
 * 2. 遇到右括号时，弹出栈顶并检查是否与之匹配。
 * 3. 最终只有所有括号都成功匹配且栈为空时，字符串才合法。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. 栈为空时遇到右括号会直接失败，这个逻辑由 stack.pop() !== pairs[char] 隐式覆盖。
 * 2. 用映射表存“右括号 -> 左括号”能让匹配判断更直接。
 * 3. 面试中可总结：这类“最近未匹配项”问题常用栈处理。
 */
function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const char of s) {
    if (!pairs[char]) {
      stack.push(char);
      continue;
    }

    // 当前右括号必须和最近的未匹配左括号配对。
    if (stack.pop() !== pairs[char]) {
      return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid('()[]{}'));
console.log(isValid('(]'));
