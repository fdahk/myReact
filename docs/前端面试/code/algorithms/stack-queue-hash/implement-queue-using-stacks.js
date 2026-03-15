/**
 * 题目：用栈实现队列（Implement Queue Using Stacks）
 * 目标：仅使用栈操作模拟队列的先进先出行为。
 * 核心思路：
 * 1. 用 input 栈负责接收新元素，用 output 栈负责出队和查看队头。
 * 2. 当 output 为空时，把 input 中所有元素倒入 output，顺序就会反转成队列顺序。
 * 3. 每个元素最多只会被搬运一次，因此摊还时间复杂度仍然优秀。
 * 时间复杂度：push 为 O(1)，pop/peek 摊还 O(1)。
 * 空间复杂度：O(n)。
 * 易错点 / 面试表达：
 * 1. 不是每次 pop/peek 都倒数据，只有 output 为空时才搬运。
 * 2. 这种写法体现的是“懒搬运”思想，能降低重复转移开销。
 * 3. 面试时可补一句：两个栈反转两次，恰好得到 FIFO 顺序。
 */
class MyQueue {
  constructor() {
    this.input = [];
    this.output = [];
  }

  push(x) {
    this.input.push(x);
  }

  move() {
    // 只有在 output 用完时才整体搬运，保证摊还 O(1)。
    if (this.output.length === 0) {
      while (this.input.length > 0) {
        this.output.push(this.input.pop());
      }
    }
  }

  pop() {
    this.move();
    return this.output.pop();
  }

  peek() {
    this.move();
    return this.output[this.output.length - 1];
  }

  empty() {
    return this.input.length === 0 && this.output.length === 0;
  }
}

const queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek(), queue.pop(), queue.empty());
