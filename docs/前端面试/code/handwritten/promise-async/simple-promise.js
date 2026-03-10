/*
面试讲解点：简化版 Promise
- 题目本质：本质是实现状态机、回调队列和 then 链式调用。
- 复杂度：每次回调分发通常 O(n)，n 为对应状态回调数量。
- 易错点：状态不可逆、异步回调队列、错误捕获和 then 返回值处理。
- 追问方向：这是最能拉开基础差距的手写题之一。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
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
      this.state = 'fulfilled';
      this.value = value;
      queueMicrotask(() => {
        this.onFulfilledQueue.forEach((callback) => callback(value));
      });
    };

    const reject = (reason) => {
      if (this.state !== 'pending') {
        return;
      }
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
