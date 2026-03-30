/*
实现目标：
- 手写一个最小版 Vue Router 风格的路由管理器。
-
核心思路：
- 内部维护当前路径和路由表。
- 提供 `push` 方法切换路径，并通过订阅机制通知视图层更新。
- 这里用最小的订阅模型表达“路由变化驱动视图更新”的思想。
-
复杂度 / 运行特征：
- 路由切换本身近似 O(1)，通知成本与订阅者数量相关。
-
易错点：
- 真正 Vue Router 还会继续支持嵌套路由、动态参数、导航守卫、懒加载。
- 这个实现强调原理，不等同于完整框架能力。
-
适用场景 / 面试表达点：
- 适合讲 SPA 路由最小实现，以及 Router 如何成为状态驱动的一部分。
*/

class VueRouterCore {
  constructor(routes = {}) {
    this.routes = routes;
    this.current = '/';
    this.listeners = new Set();
  }

  getMatchedComponent() {
    return this.routes[this.current] || null;
  }

  push(path) {
    this.current = path;
    this.listeners.forEach((listener) => listener(path));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

const router = new VueRouterCore({
  '/': 'HomeView',
  '/about': 'AboutView',
});

router.subscribe((path) => {
  console.log('route changed:', path, router.getMatchedComponent());
});

router.push('/about');
