/*
实现目标：
- 实现一个教学版 `SimplePromise`，覆盖 Promise 最核心的状态流转、回调暂存和链式 `then`。
-
核心思路：
- Promise 的本质可以理解为一个“只能从 pending 变成 fulfilled 或 rejected，且状态不可逆”的状态机。
- 当 Promise 仍处于 pending 时，后续注册的成功/失败回调先进入队列暂存。
- 一旦状态落定，就通过微任务异步触发对应回调，并支持 `then` 返回一个新的 Promise 形成链式调用。
-
复杂度 / 运行特征：
- 单次状态落定后，会顺序执行对应队列中的所有回调，分发成本与回调数量相关。
- 这里用 `queueMicrotask` 模拟原生 Promise 的异步回调时机，避免同步触发造成行为差异。
- 这是一个简化版实现，没有完整覆盖 Promise/A+ 对 thenable 解析、循环引用检测等全部细节。
-
易错点：
- Promise 状态一旦从 pending 变成 fulfilled/rejected，就不能再改变。
- `then` 的回调即使在已完成 Promise 上注册，也应异步执行，而不是同步立即执行。
- 回调内部抛错要能正确传递给返回的新 Promise，这也是链式调用能工作的关键。
-
适用场景 / 面试表达点：
- 这是考察异步模型理解深度的经典题，能明显区分“会用 Promise”和“理解 Promise 原理”。
- 面试时建议围绕“状态机、回调队列、微任务、链式返回”四个关键词组织表达。
*/

class SimplePromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledQueue = [];
    this.onRejectedQueue = [];

    const resolve = (value) => {
      if (this.state !== 'pending') {
        return;
      }
      // Promise 只能从 pending 单向流转到 fulfilled。
      this.state = 'fulfilled';
      this.value = value;
      queueMicrotask(() => {
        // 即使同步 resolve，也要异步触发已收集的成功回调。
        this.onFulfilledQueue.forEach((callback) => callback(value));
      });
    };

    const reject = (reason) => {
      if (this.state !== 'pending') {
        return;
      }
      // rejected 与 fulfilled 一样，状态一旦落定就不可逆。
      this.state = 'rejected';
      this.reason = reason;
      queueMicrotask(() => {
        this.onRejectedQueue.forEach((callback) => callback(reason));
      });
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new SimplePromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          // then 的返回值会成为下一个 Promise 的 resolve 值。
          resolve(onFulfilled ? onFulfilled(value) : value);
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (!onRejected) {
            reject(reason);
            return;
          }
          resolve(onRejected(reason));
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        queueMicrotask(() => handleFulfilled(this.value));
      } else if (this.state === 'rejected') {
        queueMicrotask(() => handleRejected(this.reason));
      } else {
        // pending 时先把回调缓存起来，等状态落定后统一派发。
        this.onFulfilledQueue.push(handleFulfilled);
        this.onRejectedQueue.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}

new SimplePromise((resolve) => {
  setTimeout(() => resolve('done'), 100);
}).then(console.log);
