/*
实现目标：
- 手写一个 Vue3 风格的最小响应式系统，演示 `Proxy + track + trigger + effect` 的核心机制。
-
核心思路：
- 用 `Proxy` 拦截属性读取和写入。
- 读取时根据 `target -> key -> effects` 建立依赖映射。
- 写入时找到对应依赖集合并重新执行副作用函数。
-
复杂度 / 运行特征：
- 依赖收集和触发查找平均可近似看作 O(1)，但真实更新成本取决于依赖数量。
- 与 Vue2 相比，这种方式天然支持动态属性读取，不需要预先递归劫持所有键。
-
易错点：
- 若没有“当前活跃 effect”这个全局上下文，就无法把读取行为和订阅者关联起来。
- 触发更新时要复制一份 effects 再执行，避免边遍历边修改集合造成问题。
- 这是最小原理版，没有覆盖 scheduler、computed、cleanup、嵌套 effect 等高级能力。
-
适用场景 / 面试表达点：
- 适合讲 Vue3 响应式为何基于 Proxy。
- 面试里可以进一步对比 Vue2 初始化劫持成本和新增属性支持差异。
*/

const bucket = new WeakMap();
let activeEffect = null;

function effect(fn) {
  const wrappedEffect = () => {
    activeEffect = wrappedEffect;
    fn();
    activeEffect = null;
  };

  wrappedEffect();
  return wrappedEffect;
}

function track(target, key) {
  if (!activeEffect) {
    return;
  }

  let depsMap = bucket.get(target);
  if (!depsMap) {
    depsMap = new Map();
    bucket.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  deps.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }

  const effects = depsMap.get(key);
  if (!effects) {
    return;
  }

  [...effects].forEach((effectFn) => effectFn());
}

function reactive(target) {
  return new Proxy(target, {
    get(source, key, receiver) {
      track(source, key);
      return Reflect.get(source, key, receiver);
    },
    set(source, key, value, receiver) {
      const oldValue = source[key];
      const changed = !Object.is(oldValue, value);
      const result = Reflect.set(source, key, value, receiver);

      if (changed) {
        trigger(source, key);
      }

      return result;
    },
  });
}

const state = reactive({
  count: 0,
  label: 'ready',
});

effect(() => {
  console.log('vue3 effect:', state.count, state.label);
});

state.count += 1;
state.label = 'updated';
