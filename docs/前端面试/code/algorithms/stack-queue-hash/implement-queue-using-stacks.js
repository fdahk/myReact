class MyQueue {
  constructor() {
    this.input = [];
    this.output = [];
  }

  push(x) {
    this.input.push(x);
  }

  move() {
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
