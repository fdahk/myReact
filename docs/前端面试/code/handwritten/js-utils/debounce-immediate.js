/*
 * 实现目标：
 * - 实现一个立即执行版防抖函数，使第一次触发立即生效，随后在冷却期内忽略重复调用。
 * - 它适合首击需要即时反馈、但又不希望短时间内连续执行多次的场景。
 *
 * 核心思路：
 * - 仍然通过闭包保存定时器。
 * - 只有在当前没有活动定时器时，才允许本次调用立即执行原函数。
 * - 每次触发都会刷新冷却定时器，等冷却期结束后把 `timer` 置空，允许下一轮立即执行。
 *
 * 复杂度 / 运行特征：
 * - 单次调用是 O(1)。
 * - 该实现属于 `leading: true, trailing: false` 风格的最简版本。
 *
 * 易错点：
 * - “立即执行防抖”在概念上很容易与节流混淆，关键区别在于它仍然依赖安静期重置。
 * - 若需要兼顾尾部执行，通常要再增加 `trailing` 配置和最后一次参数缓存。
 * - 包装函数若不透传 `this` / 参数，会影响原函数行为。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 leading / trailing 语义、防抖变体设计与交互反馈优化。
 * - 面试里可以继续扩展为同时支持取消、尾触发、返回值缓存的完整版本。
 */

function debounceImmediate(fn, wait = 300) {
  let timer = null;

  return function debounced(...args) {
    // 这里返回普通函数而不是箭头函数，是为了保留“调用时 this”。
    // 如果外部通过 `obj.method()` 调用它，这里的 `this` 就是 `obj`；
    // 如果是独立调用，在严格模式下这里通常才会是 `undefined`。
    // 只有当前不在冷却期内，才允许这次触发立即执行。
    const callNow = timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, wait);

    if (callNow) {
      // 不能直接写 `fn(args)`，那样会把整个 args 数组当成一个参数传进去。
      // 即使写成 `fn(...args)`，参数虽然对了，但原函数里的 `this` 仍然可能丢失。
      // `fn.apply(this, args)` 的作用就是同时保留 this 和参数，让包装前后的调用语义尽量一致。
      // 所以这里的 `this` 不一定总有值，但保留它依然有意义。
      // apply 是因为参数已经是数组形式 args；如果写成 fn.call(this, ...args) 也可以，效果接近。
      return fn.apply(this, args);
    }
  };
}

const handler = debounceImmediate((value) => {
  console.log('immediate:', value);
}, 200);

handler('first');
handler('second');
setTimeout(() => handler('third'), 250);
