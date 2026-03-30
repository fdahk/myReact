/*
实现目标：
- 手写一个最小版类组件 `setState` 更新队列，理解旧版 React 类组件是如何合并状态的。
-
核心思路：
- 多次 `setState` 不立即改 state，而是先把更新放进队列。
- flush 时按顺序计算新 state，并把对象更新合并到前一个 state 上。
- 这和函数组件的 Hook 队列思路在本质上是相通的。
 *
 * 复杂度 / 运行特征：
 * - 单次入队 O(1)，一次 flush 的成本与更新数 n 成正比。
 *
 * 易错点：
 * - `setState` 可能接收对象，也可能接收函数。
 * - 面试里最好主动区分类组件更新队列和函数组件 Hook queue。
 */

class ClassComponentStateQueue {
  constructor(initialState = {}) {
    this.state = initialState;
    this.queue = [];
  }

  setState(partialState) {
    this.queue.push(partialState);
  }

  flush() {
    let nextState = { ...this.state };

    this.queue.forEach((update) => {
      const partial =
        typeof update === 'function' ? update(nextState) : update;
      nextState = { ...nextState, ...partial };
    });

    this.state = nextState;
    this.queue = [];
    return this.state;
  }
}

const instance = new ClassComponentStateQueue({ count: 0, name: 'react' });
instance.setState({ count: 1 });
instance.setState((prev) => ({ count: prev.count + 1 }));
console.log(instance.flush());

export { ClassComponentStateQueue };
