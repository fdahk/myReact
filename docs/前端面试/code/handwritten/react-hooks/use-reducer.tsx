/*
 * 实现目标：
 * - 手写一个最小版 `useReducer`，理解 reducer 驱动状态更新的 Hook 形态。
 *
 * 核心思路：
 * - 用 `useState` 保存当前 state。
 * - `dispatch` 接收 action 后调用 reducer 计算下一个 state。
 * - 这种模式把“状态如何变化”集中到 reducer 中统一描述。
 *
 * 复杂度 / 运行特征：
 * - 单次 dispatch 的额外成本取决于 reducer 本身，Hook 包装层可视为 O(1)。
 *
 * 易错点：
 * - reducer 必须是纯函数，不能在里面做副作用。
 * - `dispatch` 只是提交 action，不直接修改 state。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲复杂局部状态、状态转移收敛、和 Redux 思想的相通之处。
 */

import { useCallback, useState } from 'react';

export function useReducer<State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State
) {
  const [state, setState] = useState(initialState);

  const dispatch = useCallback(
    (action: Action) => {
      setState((prevState) => reducer(prevState, action));
    },
    [reducer]
  );

  return [state, dispatch] as const;
}
