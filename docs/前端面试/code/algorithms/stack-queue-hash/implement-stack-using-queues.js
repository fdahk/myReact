/**
 * 题目：用队列实现栈（Implement Stack Using Queues）
 * 目标：仅使用队列操作模拟栈的后进先出行为。
 * 核心思路：
 * 1. 只维护一个队列，每次 push 新元素后，把前面的旧元素依次旋转到队尾。
 * 2. 这样新元素就会被转到队头，后续 pop 时直接 shift 即可模拟栈顶弹出。
 * 3. 本质上是把“栈顶元素始终保持在队头”。
 * 时间复杂度：push 为 O(n)，pop/top/empty 为 O(1)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. 旋转次数是 queue.length - 1，表示只搬运旧元素，不动刚入队的新元素。
 * 2. 这题常见两种写法：单队列旋转，或双队列倒腾；本实现是单队列版本。
 * 3. 面试里可解释：为了优化 pop/top，把成本前置到了 push。
 */
class MyStack {
  constructor() {
    this.queue = [];
  }

  push(x) {
    this.queue.push(x);
    // 把旧元素轮转到队尾，让新元素移动到队头。
    for (let i = 0; i < this.queue.length - 1; i += 1) {
      this.queue.push(this.queue.shift());
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return this.queue.length === 0;
  }
}

const stack = new MyStack();
stack.push(1);
stack.push(2);
console.log(stack.top(), stack.pop(), stack.empty());
