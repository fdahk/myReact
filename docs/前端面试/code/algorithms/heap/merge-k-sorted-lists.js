/**
 * 题目目标：合并 k 个升序链表，返回合并后的升序链表头节点。
 * 核心思路：维护一个按节点值排序的最小堆。
 * 先把每条链表的头节点入堆，每次弹出堆顶最小节点接到结果链表尾部，
 * 再把该节点的下一个节点入堆，如此循环直到堆为空。
 * 时间复杂度：O(N log k)，N 为所有链表节点总数，k 为链表个数。
 * 空间复杂度：O(k)，堆中最多同时保存 k 个候选头节点。
 * 易错点 / 面试表达点：
 * 1. 堆里放的是“当前各链表尚未处理部分的最小头节点”。
 * 2. 链表题常用 dummy 节点统一处理头节点拼接逻辑。
 * 3. 手写最小堆时，比较逻辑从数字改成 `node.val` 即可复用模板。
 */
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
  // 每条链表当前最小的候选节点先进入最小堆。
  lists.forEach((node) => node && heap.push(node));

  const dummy = new ListNode(0);
  let current = dummy;

  while (heap.heap.length > 0) {
    const node = heap.pop();
    current.next = node;
    current = current.next;
    // 弹出某个节点后，把它所在链表的下一个节点补进堆里。
    if (node.next) {
      heap.push(node.next);
    }
  }

  return dummy.next;
}
