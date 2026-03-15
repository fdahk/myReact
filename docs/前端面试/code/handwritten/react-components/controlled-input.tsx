/*
 * 实现目标：
 * - 给出一个最小可运行的受控输入组件示例，展示输入框的值完全由 React state 驱动。
 * - 让输入框与展示文案始终读取同一份状态，体现单向数据流和“状态即唯一数据源”。
 *
 * 核心思路：
 * - 用 `useState` 保存当前输入值。
 * - `input` 的 `value` 绑定到状态，`onChange` 中把用户输入重新写回状态，形成标准受控组件闭环。
 *
 * 复杂度 / 运行特征：
 * - 单次输入事件处理本身是 O(1)，但会触发当前组件重新渲染。
 * - 实际性能主要取决于输入联动的组件树规模，以及是否在输入时做了昂贵计算。
 *
 * 易错点：
 * - 只写 `value` 不写 `onChange` 会让输入框变成只读。
 * - 在 `onChange` 里做同步重计算，容易造成输入卡顿。
 * - 做格式化输入时要注意光标位置和组合输入法边界。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲表单受控、数据同步、校验联动、输入状态统一管理。
 * - 面试里可以顺带对比非受控组件，以及说明表单库为什么通常建立在受控模型之上。
 */

import { useState } from 'react';

export function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        value={value}
        // 每次输入都把最新值回写到 state，保持视图与数据源一致。
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type something"
      />
      <p>Current value: {value}</p>
    </div>
  );
}
