/*
实现目标：
- 手写一个 `compose(middleware)`，模拟 Koa 风格中间件调度。
-
核心思路：
- 每个中间件接收 `(context, next)`。
- `compose` 返回一个执行器，从第 0 个中间件开始递归 dispatch。
- 当前中间件调用 `await next()` 后，控制权才会交给下一个中间件。
-
复杂度 / 运行特征：
- 中间件数量为 n 时，主流程调度复杂度约为 O(n)。
- 这个题重点不在算法，而在“洋葱模型”和 Promise 链式串联。
-
易错点：
- `next()` 不能被重复调用，否则执行链会乱掉。
- 如果中间件不返回 Promise，也要用 `Promise.resolve` 包装保证链路统一。
-
适用场景 / 面试表达点：
- 常见于 Koa、Redux 中间件、请求拦截器设计。
*/

function compose(middleware) {
  return function run(context) {
    let index = -1;

    function dispatch(currentIndex) {
      if (currentIndex <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = currentIndex;
      const fn = middleware[currentIndex];

      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(fn(context, () => dispatch(currentIndex + 1)));
    }

    return dispatch(0);
  };
}

const fn = compose([
  async (ctx, next) => {
    ctx.stack.push(1);
    await next();
    ctx.stack.push(4);
  },
  async (ctx, next) => {
    ctx.stack.push(2);
    await next();
    ctx.stack.push(3);
  },
]);

const context = { stack: [] };
fn(context).then(() => console.log(context.stack));
