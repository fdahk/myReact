/*
实现目标：
- 手写一个最小版 `watchEffect`，理解 Vue 中“自动收集依赖并立即执行副作用”的机制。
-
核心思路：
- 运行副作用前把当前 effect 挂到全局活动槽位。
- 响应式 getter 读取时把当前 effect 收集进去。
- 依赖变化时重新执行 effect，从而形成自动追踪链路。
-
复杂度 / 运行特征：
- 单次依赖收集与触发近似 O(1)，真实成本与依赖数量有关。
-
易错点：
- `watchEffect` 不需要显式传 getter，它在执行过程中自动收集依赖。
- 真实 Vue 还会处理 cleanup、scheduler、嵌套 effect 等高级问题。
-
适用场景 / 面试表达点：
- 很适合和 `watch`、`computed` 放在一起对比。
*/

const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
  if (!activeEffect) {
    return;
  }

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  deps.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  const deps = depsMap?.get(key);
  deps?.forEach((effect) => effect());
}

function reactive(target) {
  return new Proxy(target, {
    get(source, key, receiver) {
      track(source, key);
      return Reflect.get(source, key, receiver);
    },
    set(source, key, value, receiver) {
      const result = Reflect.set(source, key, value, receiver);
      trigger(source, key);
      return result;
    },
  });
}

function watchEffect(effect) {
  const wrapped = () => {
    activeEffect = wrapped;
    effect();
    activeEffect = null;
  };

  wrapped();
}

const state = reactive({ count: 0 });
watchEffect(() => {
  console.log('watchEffect:', state.count);
});
state.count += 1;

export { reactive, watchEffect };
