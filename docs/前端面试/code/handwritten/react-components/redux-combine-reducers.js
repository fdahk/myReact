/*
实现目标：
- 手写一个最小版 `combineReducers`，把多个 reducer 合并成一个根 reducer。
-
核心思路：
- 接收一个 reducer 映射对象。
- 返回一个新的组合 reducer，每次 dispatch 时依次调用每个子 reducer。
- 如果任一子 state 发生变化，就返回新的根 state；否则复用旧 state。
-
复杂度 / 运行特征：
- 单次组合 reducer 执行成本与 reducer 数量 n 成正比。
- Redux 判断 state 是否更新依赖引用变化，所以子 reducer 需要返回新对象而不是原地改值。
-
易错点：
- 要跳过非函数项，或在实现里直接校验。
- 面试里最好主动说明：`combineReducers` 只负责“横向拆分状态”，不负责异步和副作用。
-
适用场景 / 面试表达点：
- 常用于解释大型应用如何把一个大 reducer 拆成多个领域 reducer。
*/

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers).filter((key) => typeof reducers[key] === 'function');

  return function combination(state = {}, action) {
    let hasChanged = false;
    const nextState = {};

    reducerKeys.forEach((key) => {
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;

      if (!Object.is(nextStateForKey, previousStateForKey)) {
        hasChanged = true;
      }
    });

    return hasChanged ? nextState : state;
  };
}

const rootReducer = combineReducers({
  counter(state = 0, action) {
    return action.type === 'increment' ? state + 1 : state;
  },
  user(state = { name: 'guest' }, action) {
    return action.type === 'rename' ? { ...state, name: action.payload } : state;
  },
});

console.log(rootReducer(undefined, { type: '@@redux/INIT' }));
console.log(rootReducer({ counter: 0, user: { name: 'guest' } }, { type: 'increment' }));
