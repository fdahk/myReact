/*
面试讲解点：基础节流
- 题目本质：本质是限制函数在固定时间窗口内最多执行一次，适合滚动、拖拽。
- 复杂度：每次调用核心操作 O(1)。
- 易错点：首触发是否执行、末尾是否补执行、定时器和时间戳方案差异。
- 追问方向：可以追问 leading/trailing、和防抖的业务边界。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function throttle(fn, wait = 300) {
  let lastTime = 0;

  return function throttled(...args) {
    const now = Date.now();
    if (now - lastTime < wait) {
      return;
    }

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
