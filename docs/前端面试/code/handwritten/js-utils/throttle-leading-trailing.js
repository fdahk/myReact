/*
 * 实现目标：
 * - 实现一个同时支持 `leading` 和 `trailing` 配置的节流函数，贴近实际工具库的可配置能力。
 * - 让调用方能够明确控制“窗口开始是否执行”和“窗口结束是否补最后一次执行”。
 *
 * 核心思路：
 * - 通过 `lastTime` 记录上次执行时刻，通过 `timer` 管理尾部补偿任务。
 * - 每次调用先计算距离下次允许执行还剩多少时间，并缓存最后一次调用的参数和上下文。
 * - 若已跨过窗口则立即执行；否则在需要 trailing 的情况下补一个延迟执行任务。
 *
 * 复杂度 / 运行特征：
 * - 单次判断与调度都是 O(1)。
 * - 该实现兼具时间戳与定时器思路，能覆盖首触发和尾触发两类常见语义。
 *
 * 易错点：
 * - `leading: false` 时要特殊处理首次调用，否则会比预期多执行一次。
 * - 尾触发需要缓存最后一次参数，否则窗口结束时拿不到最新调用信息。
 * - 计时边界、系统时间变化、连续调用期间的旧定时器清理都容易写错。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲节流的完整配置能力、Lodash 风格实现思路、时间戳与定时器混合方案。
 * - 面试里可以继续补充 `cancel`、`flush`、返回值缓存以及与 requestAnimationFrame 节流的对比。
 */

function throttleLeadingTrailing(fn, wait = 300, options = { leading: true, trailing: true }) {
  // 这些变量都定义在工厂函数 `throttleLeadingTrailing` 的作用域里。
  // 当下面返回的 `throttled` 被拿到外部反复调用时，它依然能访问并修改这些变量。
  // 这就是闭包的典型应用：内部函数持续引用外层词法环境中的变量绑定。
  let lastTime = 0;
  let timer = null;
  let lastArgs = null;
  let lastContext = null;

  const invoke = () => {
    lastTime = Date.now();
    timer = null;
    // 尾触发时也要复用最后一次调用保存下来的上下文和参数。
    fn.apply(lastContext, lastArgs);
    lastArgs = null;
    lastContext = null;
  };

  return function throttled(...args) {
    // 每次调用 `throttled`，都会产生一次新的“当前执行上下文”。
    // 但它访问到的 `lastTime`、`timer`、`lastArgs`、`lastContext`，
    // 不是这次调用临时新建的一份，而是外层工厂函数中那同一份共享状态。
    //
    // 所以更准确地说，这里利用的是“闭包保存外层变量”，
    // 而不是只说“利用执行上下文”。执行上下文解释的是“这次调用正在运行”，
    // 闭包解释的是“为什么函数调用结束后，那些外层变量还没有消失，并且能被后续调用继续复用”。
    const now = Date.now();
    if (!lastTime && options.leading === false) {
      // 禁用 leading 时，把首次触发视为窗口起点，但先不执行。
      lastTime = now;
    }

    const remaining = wait - (now - lastTime);
    // 每次触发都把“最近一次调用”的参数和 this 记下来。
    // 这样如果当前不能立刻执行，而是要等 trailing 阶段再补执行，
    // `invoke()` 仍然能拿到窗口内最后一次调用的最新信息。
    lastArgs = args;
    lastContext = this;

    if (remaining <= 0 || remaining > wait) {
      // 进入这里表示：
      // 1. 当前已经超过节流窗口，可以立即执行；
      // 2. 或者出现了边界情况（如系统时间调整），此时也直接执行更安全。
      //
      // 如果之前已经挂了一个 trailing 定时器，这里要先清掉，
      // 否则会出现“本次已经立即执行了，稍后定时器又补执行一次”的重复触发。
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke();
      return;
    }

    if (!timer && options.trailing !== false) {
      // 只保留一个尾部定时器，窗口结束后补执行最后一次调用。
      timer = setTimeout(invoke, remaining);
    }
  };
}

const handler = throttleLeadingTrailing((value) => console.log('throttle:', value), 200, {
  leading: true,
  trailing: true,
});

handler(1);
handler(2);
setTimeout(() => handler(3), 100);
setTimeout(() => handler(4), 250);
