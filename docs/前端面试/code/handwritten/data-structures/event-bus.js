/*
实现目标：
- 实现一个最小版事件总线，支持 `on`、`off`、`emit`、`once` 四个常见能力。
-
核心思路：
- 用 `Map` 维护 `eventName -> listeners[]` 的映射。
- 订阅时把回调放入对应事件列表；发布时依次执行列表中的回调；取消订阅时过滤掉目标回调。
- `once` 的常见写法是包一层代理函数，在首次执行后主动注销自己。
-
复杂度 / 运行特征：
- `on` 的追加注册通常可视为 O(1)。
- `emit` 和 `off` 都与当前事件监听函数数量相关，通常是 O(n)。
- 当前实现不做异常隔离，也不做重复订阅去重，保持最小行为便于讲解。
-
易错点：
- `off` 必须移除的是“同一个函数引用”，否则无法精准取消。
- `once` 不是直接存原函数，而是存包装函数；取消时也必须取消这个包装函数。
- 如果回调内部抛错，当前实现会中断后续监听执行；这通常是面试时可以顺带说明的取舍点。
-
适用场景 / 面试表达点：
- 常见于组件通信、轻量消息中心、解耦模块间协作。
- 面试表达时可以主动补充“复杂版本还会考虑命名空间、异常隔离、最大监听数和内存释放”。
*/

class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    // 每个事件名对应一个监听数组；没有则先创建再追加。
    const listeners = this.events.get(eventName) ?? [];
    listeners.push(listener);
    this.events.set(eventName, listeners);
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName) ?? [];
    // 只有函数引用完全相等时才会被移除。
    this.events.set(eventName, listeners.filter((item) => item !== listener));
  }

  emit(eventName, payload) {
    const listeners = this.events.get(eventName) ?? [];
    // 按注册顺序触发当前事件下的所有监听函数。
    listeners.forEach((listener) => listener(payload));
  }

  once(eventName, listener) {
    const wrapper = (payload) => {
      listener(payload);
      // 首次执行后立即注销，避免后续重复响应。
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

const bus = new EventBus();
bus.once('ready', (payload) => console.log('ready:', payload));
bus.emit('ready', 1);
bus.emit('ready', 2);
