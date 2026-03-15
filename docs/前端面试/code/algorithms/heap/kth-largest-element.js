/**
 * 题目目标：在数组中找到第 k 大元素。
 * 核心思路：维护一个大小不超过 k 的最小堆。
 * 遍历数组时先把元素放入堆中；若堆大小超过 k，就弹出堆顶最小值。
 * 这样遍历结束后，堆里保留的正好是当前最大的 k 个元素，堆顶即第 k 大。
 * 时间复杂度：O(n log k)，每个元素最多触发一次入堆和一次出堆。
 * 空间复杂度：O(k)，堆中最多保留 k 个元素。
 * 易错点 / 面试表达点：
 * 1. 找第 k 大要用“最小堆保留前 k 大”，不要误用最大堆。
 * 2. 手写堆时要熟悉上浮 / 下沉逻辑以及父子下标关系。
 * 3. 若继续追问，还可以提快速选择做法，平均时间复杂度可到 O(n)。
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    // 新元素先放末尾，再不断上浮到正确位置。
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      // 用最后一个元素补到堆顶后，需要向下调整恢复堆序。
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
      // 堆大小超过 k 时，移除最小值，保证只保留最大的 k 个数。
      heap.pop();
    }
  }
  return heap.peek();
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
