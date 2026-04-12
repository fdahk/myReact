type BridgeResult<T = unknown> = {
  code: number;
  message: string;
  data?: T;
};

type NativeBridge = {
  invoke(method: string, params: Record<string, unknown>): Promise<BridgeResult>;
};

export function createBridge(bridge: NativeBridge | null) {
  async function call<T = unknown>(
    method: string,
    params: Record<string, unknown> = {},
  ) {
    if (!bridge) {
      throw new Error('Bridge is unavailable');
    }

    const result = await bridge.invoke(method, params);

    if (result.code !== 0) {
      throw new Error(result.message || 'Bridge call failed');
    }

    return result.data as T;
  }

  return {
    call,
  };
}

/*
面试讲解点：
1. 这题本质是在页面和宿主之间建立统一协议层。
2. 页面不应该直接到处拼 method 和 params，更不应该自己到处判断错误码。
3. 真项目里通常还会继续补能力检测、超时控制、版本兼容、埋点和取消语义。
*/
