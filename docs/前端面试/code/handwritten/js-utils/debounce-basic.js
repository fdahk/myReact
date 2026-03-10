/*
面试讲解点：基础防抖
- 题目本质：本质是只在最后一次触发后一段时间再执行，适合搜索框、resize。
- 复杂度：每次调用核心操作 O(1)，额外空间 O(1)。
- 易错点：this 和参数透传、重复触发时清理旧定时器、组件卸载清理。
- 追问方向：可以追问立即执行版、cancel/flush、和节流的区别。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function debounce(fn, wait = 300) {
  let timer = null;

  return function debounced(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

const logInput = debounce((value) => {
  console.log('debounced value:', value);
}, 200);

logInput('a');
logInput('ab');
logInput('abc');
