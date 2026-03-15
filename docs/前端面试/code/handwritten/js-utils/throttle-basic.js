/*
 * 实现目标：
 * - 手写一个最基础的时间戳版节流函数，让高频触发的操作在固定时间窗口内最多执行一次。
 * - 常见于滚动、拖拽、鼠标移动等持续触发但又不需要每次都执行的场景。
 *
 * 核心思路：
 * - 用闭包保存上一次真正执行的时间戳。
 * - 每次触发时比较当前时间与上次执行时间的差值。
 * - 若还没达到等待窗口则直接忽略，否则更新执行时间并调用原函数。
 *
 * 复杂度 / 运行特征：
 * - 单次判断和调用都是 O(1)。
 * - 该实现属于典型的时间戳节流：默认首触发会立即执行，但不会自动补最后一次尾调用。
 *
 * 易错点：
 * - 节流与防抖的语义不同，节流是“按窗口限频”，不是“等最后一次”。
 * - 若业务要求尾部必须执行，就不能只用时间戳方案，通常需要加定时器补偿。
 * - 包装函数同样要注意 `this` 和参数透传。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲高频事件治理、时间戳节流原理、节流与防抖的边界。
 * - 面试里可以继续扩展定时器版、leading/trailing 配置、组合实现等话题。
 */

function throttle(fn, wait = 300) {
  let lastTime = 0;

  return function throttled(...args) {
    const now = Date.now();
    if (now - lastTime < wait) {
      return;
    }

    // 只有跨过当前节流窗口后，才真正执行这次调用。
    lastTime = now;
    fn.apply(this, args);
  };
}

const printScrollTop = throttle((top) => {
  console.log('scroll top:', top);
}, 200);

printScrollTop(10);
printScrollTop(20);
setTimeout(() => printScrollTop(30), 250);
