/**
 * 题目：每日温度（Daily Temperatures）
 * 目标：对每一天，返回距离下一次更高温度还需要等待多少天。
 * 核心思路：
 * 1. 使用单调递减栈，栈中保存还没找到更高温的下标。
 * 2. 当今天温度高于栈顶那天温度时，说明栈顶那天的答案已经找到。
 * 3. 持续弹栈并结算等待天数，直到恢复单调递减。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. 栈中存的是下标，这样才能计算距离天数 i - index。
 * 2. 结果数组默认填 0，天然表示“后面没有更高温度”。
 * 3. 面试里可类比“下一个更大元素”，这是单调栈的标准题型。
 */
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i += 1) {
    // 当前温度更高时，可以为之前等待中的位置结算答案。
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = i - index;
    }
    stack.push(i);
  }

  return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
