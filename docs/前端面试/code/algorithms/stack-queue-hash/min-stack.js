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
