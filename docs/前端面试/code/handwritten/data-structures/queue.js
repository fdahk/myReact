/*
面试讲解点：队列
- 题目本质：本质是先进先出，适合层序遍历、任务排队、消息缓冲。
- 复杂度：入队出队理想复杂度都是 O(1)。
- 易错点：头尾指针移动、空队列判断、避免用 shift 导致退化。
- 追问方向：可以追问数组实现和链表实现的区别。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    return this.items[0];
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue(), queue.peek());
