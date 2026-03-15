/**
 * 题目：最小栈（Min Stack）
 * 目标：设计一个栈，支持在 O(1) 时间内获取当前最小值。
 * 核心思路：
 * 1. 主栈 stack 正常保存所有元素。
 * 2. 辅助栈 minStack 的每个位置都保存“截至当前主栈位置的最小值”。
 * 3. 入栈和出栈时两个栈同步操作，这样 getMin 直接读取辅助栈栈顶即可。
 * 时间复杂度：push/pop/top/getMin 均为 O(1)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. minStack 不是只在遇到更小值时才 push，而是每次都 push 当前阶段最小值。
 * 2. 这样做的好处是 pop 时无需额外判断，两个栈同步弹出即可。
 * 3. 面试中可强调：这是“用空间换时间”的经典设计题。
 */
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(value) {
    this.stack.push(value);
    const min = this.minStack.length === 0 ? value : Math.min(value, this.getMin());
    this.minStack.push(min);
  }

  pop() {
    this.minStack.pop();
    return this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
