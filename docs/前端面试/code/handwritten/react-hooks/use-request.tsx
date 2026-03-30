/*
 * 实现目标：
 * - 手写一个最小版 `useRequest`，管理异步请求的 loading、data、error 状态。
 *
 * 核心思路：
 * - 用 `useState` 保存请求状态。
 * - 暴露一个 `run` 方法触发异步任务。
 * - 触发时先置为 loading，再在成功或失败分支写回结果。
 *
 * 复杂度 / 运行特征：
 * - 单次请求的状态切换逻辑为 O(1)。
 * - 这是最小实现，不包含竞态取消、缓存、轮询、重试、依赖自动执行等高级能力。
 *
 * 易错点：
 * - 如果多次并发 run，旧请求晚返回时可能覆盖新请求结果。
 * - 实战里常会继续补 requestId、AbortController、缓存和错误重试。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 Hook 封装、异步状态管理和请求生命周期。
 */

import { useCallback, useState } from 'react';

type RequestState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

export function useRequest<T>(service: () => Promise<T>) {
  const [state, setState] = useState<RequestState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const run = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await service();
      setState({ loading: false, data, error: null });
      return data;
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error('Unknown error');
      setState({ loading: false, data: null, error: normalizedError });
      throw normalizedError;
    }
  }, [service]);

  return {
    ...state,
    run,
  };
}
