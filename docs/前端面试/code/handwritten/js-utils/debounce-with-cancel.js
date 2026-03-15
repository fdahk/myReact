/*
 * 实现目标：
 * - 在基础防抖函数之上补充 `cancel` 能力，让调用方可以主动撤销尚未执行的延迟任务。
 * - 这是很多真实业务里更接近可用形态的防抖工具，例如离开页面时取消自动保存。
 *
 * 核心思路：
 * - 通过闭包保存当前定时器句柄。
 * - 每次触发时先清掉旧定时器，再创建新的延迟执行任务，确保只保留最后一次调用。
 * - 额外挂载 `cancel` 方法，允许外部手动清理当前待执行任务。
 *
 * 复杂度 / 运行特征：
 * - 单次调用和取消操作都是 O(1)。
 * - 该实现保留了调用时的 `this` 和参数，适合直接包裹对象方法或事件回调。
 *
 * 易错点：
 * - 取消后最好把 `timer` 置空，便于后续重新进入干净状态。
 * - 若需要“立即拿到结果”，还可以继续扩展 `flush` 或 Promise 版实现。
 * - 在 React 组件中使用时，卸载阶段通常应调用 `cancel` 避免异步副作用滞后执行。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲防抖的闭包实现、增强 API 设计、自动保存等真实场景。
 * - 面试里可以顺带说明 `cancel`、`flush`、立即执行版之间的差异。
 */

function debounceWithCancel(fn, wait = 300) {
  let timer = null;

  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // 延迟结束后再按原始调用上下文执行函数。
      fn.apply(this, args);
    }, wait);
  }

  debounced.cancel = function cancel() {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}

const saveDraft = debounceWithCancel((value) => {
  console.log('save:', value);
}, 300);

saveDraft('draft-1');
saveDraft.cancel();
