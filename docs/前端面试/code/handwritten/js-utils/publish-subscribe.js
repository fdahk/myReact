/*
 * 实现目标：
 * - 实现一个最小版发布订阅中心，让不同模块通过事件名进行解耦通信。
 * - 用来展示事件总线的核心结构：事件表、订阅、发布、取消订阅。
 *
 * 核心思路：
 * - 使用 `Map` 存储事件名到监听函数集合的映射。
 * - `subscribe` 负责注册监听器，并返回一个可直接调用的取消订阅函数。
 * - `publish` 遍历当前事件对应的监听器集合，把载荷逐个分发出去。
 *
 * 复杂度 / 运行特征：
 * - 订阅和取消订阅通常可视为 O(1)。
 * - 发布成本与监听器数量成正比，若某个事件下有 n 个订阅者，则发布是 O(n)。
 *
 * 易错点：
 * - 若允许重复订阅，同一个监听器可能被调用多次；这里用 `Set` 天然避免重复。
 * - 取消订阅后若集合为空，及时删除事件键能减少无效占用。
 * - 真实生产场景常还会补一次性订阅、异常隔离和异步调度等能力。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲模块解耦、事件驱动模型、发布订阅与观察者模式的差异。
 * - 面试里可以继续延伸到前端事件总线、状态流转、消息中间件思想。
 */

class PubSub {
  constructor() {
    this.events = new Map();
  }

  subscribe(eventName, listener) {
    // 使用 Set 避免同一监听器被重复注册。
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
    // 广播时把同一份 payload 分发给当前事件下的全部订阅者。
    listeners.forEach((listener) => listener(payload));
  }
}

const pubsub = new PubSub();
const off = pubsub.subscribe('message', (payload) => console.log(payload));
pubsub.publish('message', { text: 'hello' });
off();
