/*
实现目标：
- 手写一个 Vue2 风格的最小响应式系统，演示 `defineProperty + Dep + Watcher` 的核心链路。
-
核心思路：
- 用 `Object.defineProperty` 劫持对象属性的 `get` / `set`。
- 读取属性时收集当前活跃副作用，写入属性时通知订阅者重新执行。
- 递归 `observe` 子对象，让嵌套对象也具备响应式能力。
-
复杂度 / 运行特征：
- 单次依赖收集和通知本身通常可近似看作 O(1)，但一次更新实际成本与订阅者数量有关。
- 该方案需要在初始化阶段递归劫持已有属性，新增属性默认不会自动响应。
-
易错点：
- Vue2 方案对新增 / 删除属性和数组索引更新支持较弱，这正是后续 Proxy 方案要解决的问题。
- 如果不做“读取时收集依赖，写入时通知更新”，就只是在改值，不算真正的响应式系统。
- 面试里要说明这里是“最小原理版”，并不包含调度、去重、异步批处理。
-
适用场景 / 面试表达点：
- 适合解释 Vue2 响应式核心结构。
- 面试里可以顺势对比 Vue3 为什么转向 Proxy。
*/

let activeWatcher = null;

class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeWatcher) {
      this.subscribers.add(activeWatcher);
    }
  }

  notify() {
    this.subscribers.forEach((watcher) => watcher());
  }
}

function defineReactive(target, key, value) {
  const dep = new Dep();
  observe(value);

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      if (Object.is(value, newValue)) {
        return;
      }

      observe(newValue);
      value = newValue;
      dep.notify();
    },
  });
}

function observe(target) {
  if (target === null || typeof target !== 'object') {
    return target;
  }

  Object.keys(target).forEach((key) => {
    defineReactive(target, key, target[key]);
  });

  return target;
}

function watchEffect(effect) {
  activeWatcher = effect;
  effect();
  activeWatcher = null;
}

const state = observe({
  count: 0,
  user: {
    name: 'alpha',
  },
});

watchEffect(() => {
  console.log('vue2 effect:', state.count, state.user.name);
});

state.count += 1;
state.user.name = 'beta';
