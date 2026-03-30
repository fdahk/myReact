/*
实现目标：
- 手写一个最小版 `redux-thunk` 中间件，让 `dispatch` 支持函数 action。
-
核心思路：
- 普通 Redux 只接受 plain object action。
- thunk 中间件检测到 action 是函数时，不再往下传，而是直接执行该函数。
- 执行时注入 `dispatch` 和 `getState`，让异步逻辑可以在内部继续派发普通 action。
-
复杂度 / 运行特征：
- 普通 action 只多一次类型判断，开销近似 O(1)。
- thunk 的意义不在复杂度，而在给 Redux 增加异步能力。
-
易错点：
- thunk 不是 Redux 内置异步，它本质只是中间件约定。
- 函数 action 最后通常仍要 dispatch 普通对象 action 才会真的改 state。
-
适用场景 / 面试表达点：
- 常见于接口请求、延迟 dispatch、条件 dispatch。
- 面试里可以顺带对比 saga、observable 和现代 RTK Query 的差异。
*/

const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};

module.exports = thunkMiddleware;
