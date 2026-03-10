/*
面试讲解点：受控输入组件
- 题目本质：本质是输入值由 React state 驱动，UI 和数据源保持单向数据流。
- 复杂度：单次输入更新通常 O(1)，整体性能取决于组件树。
- 易错点：value 和 onChange 必须成对出现、性能抖动、格式化输入边界。
- 追问方向：可以追问非受控组件、表单库设计。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

import { useState } from 'react';

export function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <div>
      <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="请输入内容" />
      <p>当前输入：{value}</p>
    </div>
  );
}
