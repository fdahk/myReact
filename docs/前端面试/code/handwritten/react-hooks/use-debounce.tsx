/*
 * 实现目标：
 * - 封装一个防抖值版 `useDebounce`，让输入值在停止变化一段时间后再真正对外生效。
 * - 典型用于搜索关键字、筛选条件、联想请求等不希望每次输入都立即触发的场景。
 *
 * 核心思路：
 * - 维护一个独立的 `debouncedValue` 作为延迟后的稳定输出。
 * - 每次 `value` 或 `delay` 变化时都重置定时器，只有在安静期结束后才提交最新值。
 * - 借助 effect 清理函数取消旧定时器，确保只保留最后一次触发。
 *
 * 复杂度 / 运行特征：
 * - 单次调度和清理都是 O(1)。
 * - 该 Hook 会有意引入时间延迟，属于“以实时性换稳定性”的典型方案。
 *
 * 易错点：
 * - 若不清理旧定时器，连续输入会导致多个过期值依次提交。
 * - `delay` 变化也应重建定时器，否则行为会与配置不一致。
 * - 防抖值版适合参与渲染与请求依赖，防抖函数版更适合包裹事件回调。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲搜索框优化、请求合并、防抖与节流的业务区别。
 * - 面试里可以继续补充立即执行、防抖取消、flush 等扩展能力。
 */

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // 只有安静期结束后，才把最后一次输入同步出去。
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// 示例：
// const debouncedKeyword = useDebounce(keyword, 300);
