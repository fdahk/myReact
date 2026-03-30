/*
实现目标：
- 手写一个最小版 `applyMiddleware`，理解 Redux 中间件如何增强 `dispatch`。
-
核心思路：
- `applyMiddleware` 返回 store enhancer，本质上是“包装 createStore”。
- 中间件先接收 `middlewareAPI`，再返回包裹 `next` 的函数。
- 最终通过 `compose` 把多个中间件串起来，生成增强后的 `dispatch`。
-
复杂度 / 运行特征：
- 单次 dispatch 的额外成本与中间件数量 n 成正比。
- 中间件插在 action 发出后、reducer 执行前，是 Redux 扩展异步和日志能力的关键入口。
-
易错点：
- 初始化中间件时暴露给它们的 `dispatch` 必须是“最终增强版 dispatch”。
- `applyMiddleware` 不是修改 reducer，而是改写 action 流经 dispatch 的链路。
-
适用场景 / 面试表达点：
- 这是 Redux 面试里很高频的追问点，常和 `thunk` 一起考。
*/

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((prev, current) => (...args) => prev(current(...args)));
}

function applyMiddleware(...middlewares) {
  return function enhancer(createStore) {
    return function enhancedCreateStore(reducer, preloadedState) {
      const store = createStore(reducer, preloadedState);
      let dispatch = () => {
        throw new Error('dispatching while constructing middleware is not allowed');
      };

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };

      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
  };
}

function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let state = preloadedState;
  const listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.slice().forEach((listener) => listener());
    return action;
  }

  dispatch({ type: '@@redux/INIT' });

  return { getState, subscribe, dispatch };
}

const logger = ({ getState }) => (next) => (action) => {
  console.log('before:', getState());
  const result = next(action);
  console.log('after:', getState());
  return result;
};

const reducer = (state = { count: 0 }, action) =>
  action.type === 'increment' ? { ...state, count: state.count + 1 } : state;

const store = createStore(reducer, undefined, applyMiddleware(logger));
store.dispatch({ type: 'increment' });
