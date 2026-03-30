/*
实现目标：
- 手写一个最小版 history 路由，实现基于 `pushState` 的前端路由切换。
-
核心思路：
- 用 `history.pushState` 修改地址但不刷新页面。
- 监听 `popstate` 处理浏览器前进后退。
- 路径变化时执行注册好的路由处理函数。
-
复杂度 / 运行特征：
- 单次路径匹配可近似看作 O(1)。
- 与 hash 路由不同，history 路由刷新时通常需要服务端兜底到入口 HTML。
-
易错点：
- `pushState` 不会自动触发 `popstate`，所以主动跳转后要手动执行一次路由匹配。
- 面试里要主动提刷新 404 的服务端配置问题。
*/

class HistoryRouter {
  constructor(routes = {}) {
    this.routes = routes;
    this.handlePopState = this.handlePopState.bind(this);
  }

  getCurrentPath() {
    return location.pathname || '/';
  }

  match() {
    const path = this.getCurrentPath();
    const routeHandler = this.routes[path];
    if (routeHandler) {
      routeHandler(path);
    }
  }

  push(path) {
    history.pushState({}, '', path);
    this.match();
  }

  start() {
    window.addEventListener('popstate', this.handlePopState);
    this.match();
  }

  handlePopState() {
    this.match();
  }

  destroy() {
    window.removeEventListener('popstate', this.handlePopState);
  }
}

export { HistoryRouter };
