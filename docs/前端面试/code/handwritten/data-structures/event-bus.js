/*
面试讲解点：事件总线 / 发布订阅
- 题目本质：本质是维护 event -> listeners 的映射，核心能力是订阅、发布、取消订阅。
- 复杂度：通常是 O(1) 注册，O(n) 发布，n 是当前事件监听函数数量。
- 易错点：注册重复回调、取消订阅是否精确、生效顺序、异常回调是否影响其他监听。
- 追问方向：如果面试官继续追问，可以补一次性订阅、命名空间、内存泄漏控制。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    const listeners = this.events.get(eventName) ?? [];
    listeners.push(listener);
    this.events.set(eventName, listeners);
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName) ?? [];
    this.events.set(eventName, listeners.filter((item) => item !== listener));
  }

  emit(eventName, payload) {
    const listeners = this.events.get(eventName) ?? [];
    listeners.forEach((listener) => listener(payload));
  }

  once(eventName, listener) {
    const wrapper = (payload) => {
      listener(payload);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

const bus = new EventBus();
bus.once('ready', (payload) => console.log('ready:', payload));
bus.emit('ready', 1);
bus.emit('ready', 2);
