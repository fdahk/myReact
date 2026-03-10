class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
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

  peek() {
    return this.heap[0];
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
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
      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.heap.length > k) {
      heap.pop();
    }
  }
  return heap.peek();
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
