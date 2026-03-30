/*
实现目标：
- 手写一个最小版 hash 路由，实现路径匹配与页面切换回调。
-
核心思路：
- 用 `location.hash` 作为当前路由状态。
- 监听 `hashchange` 和首次加载，路由变化时找到对应处理函数执行。
- 通过 `push` 方法主动修改 hash，触发页面状态更新。
-
复杂度 / 运行特征：
- 单次命中路由查找可视为 O(1)，若扩展成动态路由匹配则会更复杂。
-
易错点：
- hash 路由不会把路径提交到服务器，因此刷新通常不需要服务端额外支持。
- 真正框架里的 router 还会继续处理嵌套路由、动态参数、守卫、懒加载。
-
适用场景 / 面试表达点：
- 很适合讲前端路由最小原理，以及 hash 与 history 路由差异。
*/

class HashRouter {
  constructor(routes = {}) {
    this.routes = routes;
    this.handleChange = this.handleChange.bind(this);
  }

  getCurrentPath() {
    return location.hash.slice(1) || '/';
  }

  handleChange() {
    const path = this.getCurrentPath();
    const routeHandler = this.routes[path];
    if (routeHandler) {
      routeHandler(path);
    }
  }

  push(path) {
    location.hash = path;
  }

  start() {
    window.addEventListener('hashchange', this.handleChange);
    window.addEventListener('load', this.handleChange);
  }

  destroy() {
    window.removeEventListener('hashchange', this.handleChange);
    window.removeEventListener('load', this.handleChange);
  }
}

export { HashRouter };
