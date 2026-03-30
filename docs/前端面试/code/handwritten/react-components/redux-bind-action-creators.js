/*
实现目标：
- 手写一个最小版 `bindActionCreators`，让 action creator 调用后自动 dispatch。
-
核心思路：
- 接收一个函数或函数对象，以及 dispatch。
- 返回同结构的新函数集合，内部自动把 action creator 的返回值交给 dispatch。
- 这样业务侧就不需要每次都手动 `dispatch(actionCreator(...args))`。
-
复杂度 / 运行特征：
- 绑定阶段成本与 action creator 数量 n 成正比。
- 调用阶段每次为 O(1)。
-
易错点：
- 既要支持单个函数，也要支持对象形式。
- action creator 本身不执行状态修改，它只是返回 action。
-
适用场景 / 面试表达点：
- 虽然不如 `createStore` / `applyMiddleware` 高频，但常作为 Redux API 补充追问。
*/

function bindActionCreator(actionCreator, dispatch) {
  return function boundActionCreator(...args) {
    return dispatch(actionCreator(...args));
  };
}

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  const boundActionCreators = {};

  Object.keys(actionCreators).forEach((key) => {
    if (typeof actionCreators[key] === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
    }
  });

  return boundActionCreators;
}

const dispatch = (action) => {
  console.log('dispatch:', action);
  return action;
};

const actions = bindActionCreators(
  {
    increment: (step) => ({ type: 'increment', payload: step }),
  },
  dispatch
);

actions.increment(2);
