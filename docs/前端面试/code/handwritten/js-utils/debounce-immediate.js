/*
面试讲解点：立即执行防抖
- 题目本质：本质是第一次立刻执行，之后在冷却时间内忽略重复触发。
- 复杂度：每次调用核心操作 O(1)。
- 易错点：首次触发判断、冷却结束恢复、this 和参数透传。
- 追问方向：可以追问 leading / trailing 同时支持时怎么设计。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function debounceImmediate(fn, wait = 300) {
  let timer = null;

  return function debounced(...args) {
    const callNow = timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, wait);

    if (callNow) {
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
