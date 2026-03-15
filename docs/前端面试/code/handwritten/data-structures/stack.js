/*
实现目标：
- 提供一个最小可用的栈结构，支持 `push`、`pop`、`peek` 这三个最常见操作。
-
核心思路：
- 栈的语义是 LIFO（后进先出），这里直接复用数组尾部作为栈顶。
- 这样入栈和出栈都只作用在数组末尾，代码简洁，也便于面试时先写出正确版本。
-
复杂度 / 运行特征：
- `push`、`pop`、`peek` 在平均意义下都可以视为 O(1)。
- 当前实现依赖原生数组，不额外维护指针，适合教学和手写题演示。
-
易错点：
- 空栈 `pop` / `peek` 时会得到 `undefined`，这是当前实现的自然边界行为。
- 如果面试官追问“是否需要抛错”，要先确认题目约定，不要擅自改变返回语义。
-
适用场景 / 面试表达点：
- 典型场景有括号匹配、撤销回退、浏览器前进后退、递归改迭代等。
- 面试表达时可以先讲“为什么用数组尾部而不是头部”，再补充复杂度和边界行为。
*/

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    // 数组尾部作为栈顶，天然符合后进先出的访问顺序。
    this.items.push(value);
  }

  pop() {
    // 从尾部弹出最近入栈的元素。
    return this.items.pop();
  }

  peek() {
    // 只读取栈顶，不移除元素；空栈时这里会返回 undefined。
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop(), stack.peek());
