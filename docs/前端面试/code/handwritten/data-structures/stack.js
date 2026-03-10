/*
面试讲解点：栈
- 题目本质：本质是后进先出，适合括号匹配、撤销回退、递归模拟。
- 复杂度：入栈出栈通常都是 O(1)。
- 易错点：空栈弹出、栈顶访问和边界判断。
- 追问方向：可以延伸到单调栈、浏览器前进后退等场景。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop(), stack.peek());
