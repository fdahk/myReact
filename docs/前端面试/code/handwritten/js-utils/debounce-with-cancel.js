/*
面试讲解点：支持 cancel 的防抖
- 题目本质：本质是在防抖基础上暴露控制能力，让外部可以主动取消未执行任务。
- 复杂度：每次调用和取消操作通常 O(1)。
- 易错点：cancel 后状态重置、后续再次调用是否正常、timer 泄漏。
- 追问方向：可以继续延伸 flush、立即执行和 React 场景。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function debounceWithCancel(fn, wait = 300) {
  let timer = null;

  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
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
