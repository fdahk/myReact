/*
面试讲解点：首尾控制节流
- 题目本质：本质是把节流行为做成可配置，控制开头和结尾是否触发。
- 复杂度：每次调用核心操作 O(1)。
- 易错点：定时器状态、最后一次参数保留、边界时间点处理。
- 追问方向：可以延伸 Lodash 节流实现思路。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function throttleLeadingTrailing(fn, wait = 300, options = { leading: true, trailing: true }) {
  let lastTime = 0;
  let timer = null;
  let lastArgs = null;
  let lastContext = null;

  const invoke = () => {
    lastTime = Date.now();
    timer = null;
    fn.apply(lastContext, lastArgs);
    lastArgs = null;
    lastContext = null;
  };

  return function throttled(...args) {
    const now = Date.now();
    if (!lastTime && options.leading === false) {
      lastTime = now;
    }

    const remaining = wait - (now - lastTime);
    lastArgs = args;
    lastContext = this;

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke();
      return;
    }

    if (!timer && options.trailing !== false) {
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
