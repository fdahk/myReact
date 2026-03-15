/*
实现目标：
- 基于二叉堆实现一个优先队列，使得每次 `pop` 都能在对数时间内取出“当前最优先”的元素。
-
算法原理：
- 优先队列的核心不是“先进先出”，而是“谁的优先级更高，谁先出队”。
- 为了兼顾插入效率和取出堆顶效率，常见最优实现是二叉堆。
- 二叉堆本质上是一棵“完全二叉树”：
- 所有层从上到下依次填满，最后一层从左到右连续排列。
- 由于结构非常规整，可以直接用数组存，而不需要真的创建树节点。
-
- 数组下标与父子节点的映射关系：
- 父节点下标：`Math.floor((index - 1) / 2)`
- 左孩子下标：`index * 2 + 1`
- 右孩子下标：`index * 2 + 2`
-
- 本示例默认是“小顶堆”：
- 比较器 `compare(a, b)` 返回 `true`，表示 `a` 应该排在 `b` 前面。
- 默认比较规则是 `a.priority < b.priority`，也就是 `priority` 越小，优先级越高。
-
- 两个关键调整过程：
- `push`：先把新元素放到数组末尾，再不断和父节点比较，如果当前元素更优，就向上交换，这叫“上浮”。
- `pop`：先取走堆顶，再把最后一个元素补到根节点，然后不断与更优的子节点交换，直到恢复堆序，这叫“下沉”。
-
复杂度 / 运行特征：
- `push`：O(log n)，最坏沿树高一路上浮。
- `pop`：O(log n)，最坏沿树高一路下沉。
- `peek`：O(1)，直接查看堆顶。
- 空间复杂度：O(n)。
-
易错点：
- 比较器语义必须全程一致，否则上浮和下沉会出现方向错乱。
- `pop` 时要先缓存堆顶，再处理尾元素补位；特别是堆里只剩一个元素时，边界最容易写错。
- 下沉时不能只看左孩子，要在左右孩子中选出“更该上来”的那个。
- 若想实现大顶堆，只需要替换比较器，不需要重写整体框架。
-
适用场景 / 面试表达点：
- 常见于 Top K、定时任务调度、合并有序链表、最短路径、A*、流式中位数等问题。
- 面试里先讲“为什么堆适合优先队列”，再讲“数组如何映射完全二叉树”，通常会比直接写代码更有说服力。
*/

class PriorityQueue {
  constructor(compare = (a, b) => a.priority < b.priority) {
    this.heap = [];
    this.compare = compare;
  }

  peek() {
    return this.heap[0];
  }

  push(value) {
    this.heap.push(value);
    // 新元素先挂到完全二叉树的最后一个位置，然后执行上浮恢复堆序。
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) {
      return undefined;
    }

    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      // 完全二叉树删除堆顶后，先用最后一个节点补到根，再执行下沉。
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      // 如果当前节点已经不比父节点更优，说明堆序已经恢复。
      if (!this.compare(this.heap[index], this.heap[parent])) {
        break;
      }
      // 当前节点更优，就和父节点交换，持续向堆顶靠近。
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      // best 表示“当前这三个位置里，最应该放在上面”的那个下标。
      let best = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      // 先看左孩子是否应该替代当前节点。
      if (left < length && this.compare(this.heap[left], this.heap[best])) {
        best = left;
      }

      // 再看右孩子是否比“当前最优候选”更适合上来。
      if (right < length && this.compare(this.heap[right], this.heap[best])) {
        best = right;
      }

      // 如果最优位置还是当前节点，说明下沉完成。
      if (best === index) {
        break;
      }

      // 让更优的孩子上移，当前节点继续向下寻找合适位置。
      [this.heap[index], this.heap[best]] = [this.heap[best], this.heap[index]];
      index = best;
    }
  }
}

const queue = new PriorityQueue();
queue.push({ value: 'low', priority: 3 });
queue.push({ value: 'high', priority: 1 });
console.log(queue.pop());
