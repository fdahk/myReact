/*
实现目标：
- 提供一个更接近工程和面试最优写法的基础队列，支持 `enqueue`、`dequeue`、`peek`。
- 保证入队和出队都为稳定的 O(1)，避免数组 `shift()` 带来的整体搬移成本。
-
核心思路：
- 队列遵循 FIFO（先进先出），最关键的是“队头消费、队尾追加”。
- 这里不用数组头删，而是使用 `head` 和 `tail` 两个指针配合对象存储元素。
- `head` 指向当前队头位置，`tail` 指向下一个可写入的位置：
- `enqueue` 时把值写到 `tail`，然后 `tail += 1`。
- `dequeue` 时读取 `head` 对应的值，删除后再让 `head += 1`。
- 整个过程中不会发生已有元素整体前移，所以出队不会退化成 O(n)。
-
复杂度 / 运行特征：
- `enqueue`：O(1)。
- `dequeue`：O(1)。
- `peek`：O(1)。
- 空间复杂度：O(n)，n 为当前队列中元素个数。
-
易错点：
- 空队列时要先判断 `head === tail`，否则会读到不存在的位置。
- 出队后最好删除旧键，避免对象里残留无效数据。
- 面试里如果说“数组也能实现队列”，要补一句：若用 `shift()`，实际出队通常不是严格 O(1)。
-
适用场景 / 面试表达点：
- 适合层序遍历、消息缓冲、任务调度、广度优先搜索等先进先出场景。
- 面试时可以强调：这是“用下标模拟链式前移”的思想，本质是在逻辑上移动队头，而不是物理搬移所有元素。
*/

class Queue {
  constructor() {
    // 用普通对象存储元素，键是递增下标，避免数组头删导致的整体移动。
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    // 新元素永远写入队尾位置，然后把队尾指针后移。
    this.items[this.tail] = value;
    this.tail += 1;
  }

  dequeue() {
    if (this.head === this.tail) {
      return undefined;
    }

    // 只移动队头指针，不搬移后面的元素，因此能保持 O(1)。
    const value = this.items[this.head];
    delete this.items[this.head];
    this.head += 1;
    return value;
  }

  peek() {
    if (this.head === this.tail) {
      return undefined;
    }
    // 只读取当前队头，不修改任何指针。
    return this.items[this.head];
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue(), queue.peek());
