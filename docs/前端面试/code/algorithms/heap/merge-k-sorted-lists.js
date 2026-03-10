function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
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
      if (this.heap[parent].val <= this.heap[index].val) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      if (left < length && this.heap[left].val < this.heap[smallest].val) smallest = left;
      if (right < length && this.heap[right].val < this.heap[smallest].val) smallest = right;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

function mergeKLists(lists) {
  const heap = new MinHeap();
  lists.forEach((node) => node && heap.push(node));

  const dummy = new ListNode(0);
  let current = dummy;

  while (heap.heap.length > 0) {
    const node = heap.pop();
    current.next = node;
    current = current.next;
    if (node.next) {
      heap.push(node.next);
    }
  }

  return dummy.next;
}
