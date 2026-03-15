/*
 * 实现目标：
 * - 提供一个极简计数 Hook，通过定时递增展示“状态 + 副作用”的基本组合方式。
 * - 该示例不是通用计数器 API，而是一个最小可讲解的自动增长计数模型。
 *
 * 核心思路：
 * - 用 `useState` 保存当前计数值。
 * - 在 effect 中按给定 `interval` 创建定时器，周期性把计数加一。
 * - 在清理函数中销毁定时器，避免组件卸载后仍继续更新。
 *
 * 复杂度 / 运行特征：
 * - 单次递增是 O(1)。
 * - 当 `interval` 变化时，effect 会清理旧定时器并重新建立新定时器。
 *
 * 易错点：
 * - 计数递增应使用函数式更新，避免闭包取到旧值。
 * - 若忘记清理定时器，组件卸载后会留下悬挂副作用。
 * - 真实业务里的“计数 Hook”通常还会暴露 increment、decrement、reset 等更完整接口。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲 Hook 中副作用管理、定时器清理、函数式状态更新。
 * - 面试里可以扩展为倒计时、可暂停计时器，或改写为 `useReducer` 版本。
 */

import { useEffect, useState } from 'react';

export function useCounter(interval = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      // 函数式更新可以保证每次都基于最新状态递增。
      setCount((prev) => prev + 1);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval]);

  return count;
}
