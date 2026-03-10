/*
面试讲解点：发布订阅
- 题目本质：本质是解耦发布者和订阅者，让它们通过事件中心通信。
- 复杂度：注册 O(1)，发布 O(n)。
- 易错点：重复订阅、取消订阅、事件参数透传、异常监听隔离。
- 追问方向：可以延伸到事件总线、观察者模式区别。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

class PubSub {
  constructor() {
    this.events = new Map();
  }

  subscribe(eventName, listener) {
    const listeners = this.events.get(eventName) ?? new Set();
    listeners.add(listener);
    this.events.set(eventName, listeners);
    return () => this.unsubscribe(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    const listeners = this.events.get(eventName);
    if (!listeners) {
      return;
    }
    listeners.delete(listener);
    if (listeners.size === 0) {
      this.events.delete(eventName);
    }
  }

  publish(eventName, payload) {
    const listeners = this.events.get(eventName);
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) => listener(payload));
  }
}

const pubsub = new PubSub();
const off = pubsub.subscribe('message', (payload) => console.log(payload));
pubsub.publish('message', { text: 'hello' });
off();
