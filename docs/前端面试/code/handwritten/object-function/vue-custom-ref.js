/*
实现目标：
- 手写一个最小版 `customRef`，理解 Vue 如何让开发者自定义依赖追踪与触发时机。
-
核心思路：
- `customRef` 接收一个工厂函数，工厂函数内部拿到 `track` 和 `trigger`。
- 开发者可以自行决定何时收集依赖、何时触发更新。
- 这常被用于防抖输入等自定义响应式场景。
-
复杂度 / 运行特征：
- 单次 track / trigger 近似 O(1)。
-
易错点：
- 题目重点在“把依赖收集和触发时机开放给用户”。
- 真正 Vue 内部还会处理 effect 栈和更多调度细节。
*/

let activeEffect = null;

function customRef(factory) {
  const deps = new Set();

  function track() {
    if (activeEffect) {
      deps.add(activeEffect);
    }
  }

  function trigger() {
    deps.forEach((effect) => effect());
  }

  return factory(track, trigger);
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

let value = '';
const debouncedRef = customRef((track, trigger) => ({
  get value() {
    track();
    return value;
  },
  set value(nextValue) {
    value = nextValue;
    trigger();
  },
}));

effect(() => {
  console.log('customRef:', debouncedRef.value);
});
debouncedRef.value = 'updated';

export { customRef, effect };
