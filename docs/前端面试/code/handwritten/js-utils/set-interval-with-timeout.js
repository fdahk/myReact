/*
实现目标：
- 手写一个基于 `setTimeout` 的 `mySetInterval`，模拟 `setInterval` 的循环调度能力。
-
核心思路：
- 每次回调执行完后，再递归启动下一轮 `setTimeout`。
- 返回一个可取消句柄，用于手动停止后续调度。
- 这种写法比原生 `setInterval` 更容易做“上一轮结束后再开始下一轮”的精细控制。
-
复杂度 / 运行特征：
- 单轮调度为 O(1)。
- 相比原生 `setInterval`，它不会在任务执行过久时无脑堆积同频定时器。
-
易错点：
- 要在回调执行前先判断是否已取消，避免停止后仍继续递归。
- 真实面试里常会继续追问“如何保证回调耗时大于 delay 时不重叠”。
- 该实现不保证绝对时间精度，浏览器定时器本身就存在漂移。
-
适用场景 / 面试表达点：
- 适合讲递归调度、定时器漂移、为什么某些轮询更适合 `setTimeout`。
*/

function mySetInterval(callback, delay) {
  let timer = null;
  let cancelled = false;

  const run = () => {
    timer = setTimeout(() => {
      if (cancelled) {
        return;
      }

      callback();
      run();
    }, delay);
  };

  run();

  return {
    cancel() {
      cancelled = true;
      clearTimeout(timer);
    },
  };
}

const interval = mySetInterval(() => {
  console.log('tick');
}, 200);

setTimeout(() => {
  interval.cancel();
}, 700);
