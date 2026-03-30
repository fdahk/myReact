/*
实现目标：
- 手写一个最小版 Vue3 `ref`，理解“把基本类型包成响应式容器”的思路。
-
核心思路：
- 用对象暴露统一的 `.value` 读写入口。
- `get` 时收集依赖，`set` 时触发更新。
- 这就是为什么 Vue3 里基本类型常需要 `ref` 包装。
-
复杂度 / 运行特征：
- 单次读取和写入近似 O(1)，真实成本与依赖数量有关。
-
易错点：
- `ref` 和 `reactive` 的适用场景不同：一个更适合单值容器，一个更适合对象代理。
*/

let activeEffect = null;

function ref(initialValue) {
  const deps = new Set();
  let value = initialValue;

  return {
    get value() {
      if (activeEffect) {
        deps.add(activeEffect);
      }
      return value;
    },
    set value(nextValue) {
      value = nextValue;
      deps.forEach((effect) => effect());
    },
  };
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const count = ref(0);
effect(() => {
  console.log('ref count:', count.value);
});
count.value += 1;

export { ref, effect };
