export type StreamState =
  | 'idle'
  | 'requesting'
  | 'streaming'
  | 'completed'
  | 'failed'
  | 'cancelled';

export function createStreamStateMachine() {
  let state: StreamState = 'idle';

  function transition(nextState: StreamState) {
    const allowed: Record<StreamState, StreamState[]> = {
      idle: ['requesting'],
      requesting: ['streaming', 'failed', 'cancelled'],
      streaming: ['completed', 'failed', 'cancelled'],
      completed: ['requesting'],
      failed: ['requesting'],
      cancelled: ['requesting'],
    };

    if (!allowed[state].includes(nextState)) {
      throw new Error(`Invalid transition: ${state} -> ${nextState}`);
    }

    state = nextState;
    return state;
  }

  function getState() {
    return state;
  }

  return {
    transition,
    getState,
  };
}

/*
面试讲解点：
1. 这题本质是在 AI 流式返回、长连接输出或上传过程里维护稳定状态。
2. 状态机的价值不是形式化，而是避免页面出现“既在 loading，又显示已完成”这种混乱状态。
3. 真项目里通常会继续补首包到达、工具调用中、重试中等更细状态。
*/
