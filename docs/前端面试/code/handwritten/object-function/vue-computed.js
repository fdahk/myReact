/*
实现目标：
- 手写一个最小版 Vue `computed`，理解“依赖变化前缓存结果，依赖变化后再重新计算”的语义。
-
核心思路：
- 用闭包缓存上一次计算结果和脏标记 `dirty`。
- 首次访问时执行 getter 并缓存结果。
- 依赖变更时通过调度函数把 `dirty` 设回 `true`，下一次访问再重新求值。
-
复杂度 / 运行特征：
- 依赖未变化时读取近似 O(1)。
- 关键价值在“缓存计算结果”，而不是让依赖本身变快。
-
易错点：
- `computed` 适合纯计算，不适合副作用。
- 它和 `watch` 的职责不同：一个产出值，一个处理副作用。
-
适用场景 / 面试表达点：
- 适合讲 Vue `computed` vs `watch` 区别，以及为什么 computed 能缓存。
*/

function createComputed(getter) {
  let value;
  let dirty = true;

  return {
    get value() {
      if (dirty) {
        value = getter();
        dirty = false;
      }
      return value;
    },
    notify() {
      dirty = true;
    },
  };
}

let count = 1;
const doubled = createComputed(() => count * 2);

console.log(doubled.value);
console.log(doubled.value);
count = 2;
doubled.notify();
console.log(doubled.value);
