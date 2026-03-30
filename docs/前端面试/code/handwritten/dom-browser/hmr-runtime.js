/*
实现目标：
- 手写一个最小版 HMR 运行时，理解模块热替换的核心交互。
-
核心思路：
- 维护模块缓存与 `accept` 回调。
- 当某个模块热更新时，替换缓存并执行对应的 accept handler。
- 这道题强调的是“运行时更新机制”，不是完整的 dev server。
-
复杂度 / 运行特征：
- 单次热更新处理可近似看作 O(1)。
-
易错点：
- HMR 并不是整页刷新，而是局部模块替换。
- 真正生产级 HMR 还要处理依赖传播、边界判断和状态保留。
-
适用场景 / 面试表达点：
- 适合回答 Vite / Webpack HMR 的运行时核心思路。
*/

class HmrRuntime {
  constructor() {
    this.modules = new Map();
    this.acceptHandlers = new Map();
  }

  register(id, exports) {
    this.modules.set(id, exports);
  }

  accept(id, handler) {
    this.acceptHandlers.set(id, handler);
  }

  hotUpdate(id, nextExports) {
    this.modules.set(id, nextExports);
    const handler = this.acceptHandlers.get(id);
    if (handler) {
      handler(nextExports);
    }
  }
}

const runtime = new HmrRuntime();
runtime.register('counter', { count: 1 });
runtime.accept('counter', (module) => console.log('hmr update:', module));
runtime.hotUpdate('counter', { count: 2 });

export { HmrRuntime };
