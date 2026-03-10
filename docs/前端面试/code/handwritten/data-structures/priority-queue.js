/*
面试讲解点：优先队列
- 题目本质：本质是让每次取出的都是当前优先级最高或最低的元素，常见实现是堆。
- 复杂度：插入和弹出通常是 O(log n)，取堆顶 O(1)。
- 易错点：比较器设计、插入后上浮、删除堆顶后下沉、空队列边界。
- 追问方向：可以延伸到 Top K、定时任务调度、Dijkstra 等场景。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

class PriorityQueue {
  constructor(compare = (a, b) => a.priority < b.priority) {
    this.heap = [];
    this.compare = compare;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) {
      return undefined;
    }

    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (!this.compare(this.heap[index], this.heap[parent])) {
        break;
      }
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < length && this.compare(this.heap[left], this.heap[smallest])) smallest = left;
      if (right < length && this.compare(this.heap[right], this.heap[smallest])) smallest = right;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

const queue = new PriorityQueue();
queue.push({ value: 'low', priority: 3 });
queue.push({ value: 'high', priority: 1 });
console.log(queue.pop());
