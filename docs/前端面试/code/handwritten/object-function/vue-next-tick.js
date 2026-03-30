/*
实现目标：
- 手写一个最小版 `nextTick`，模拟“把回调放到本轮同步任务结束后、DOM 更新后再执行”的核心思路。
-
核心思路：
- 维护一个回调队列。
- 同一轮只安排一次微任务刷新，把队列中的回调批量执行。
- 优先使用 `Promise.resolve().then(...)` 作为微任务调度器。
-
复杂度 / 运行特征：
- 单次入队为 O(1)，一次 flush 总体为 O(n)。
- 重点在“批量合并 + 微任务调度”，而不是复杂算法。
-
易错点：
- 多次 `nextTick` 调用不应重复安排多个 flush。
- 面试里要说明这只是“调度最小版”，真实 Vue 还会配合更新队列与 watcher 去重。
-
适用场景 / 面试表达点：
- 适合讲 Vue DOM 异步更新、微任务队列、批处理思想。
*/

const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const queue = callbacks.slice();
  callbacks.length = 0;
  queue.forEach((callback) => callback());
}

function nextTick(callback) {
  callbacks.push(callback);

  if (!pending) {
    pending = true;
    Promise.resolve().then(flushCallbacks);
  }
}

console.log('sync start');
nextTick(() => console.log('nextTick callback 1'));
nextTick(() => console.log('nextTick callback 2'));
console.log('sync end');
