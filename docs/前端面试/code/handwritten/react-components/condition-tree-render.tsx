/*
实现目标：
- 用条件树描述复杂布尔表达式，再根据求值结果决定是否渲染 children。

核心思路：
- `leaf` 表示基础布尔条件。
- `and / or / not` 负责组合条件。
- 递归求值后返回是否渲染。

适用场景：
- 权限渲染
- 运营位配置渲染
- AB 实验条件渲染
*/

import type { ReactNode } from 'react';

type ConditionNode =
  | { type: 'leaf'; value: boolean }
  | { type: 'and'; children: ConditionNode[] }
  | { type: 'or'; children: ConditionNode[] }
  | { type: 'not'; child: ConditionNode };

function evaluate(node: ConditionNode): boolean {
  switch (node.type) {
    case 'leaf':
      return node.value;
    case 'and':
      return node.children.every(evaluate);
    case 'or':
      return node.children.some(evaluate);
    case 'not':
      return !evaluate(node.child);
  }
}

export function ConditionTreeRender({
  expression,
  children,
}: {
  expression: ConditionNode;
  children: ReactNode;
}) {
  return evaluate(expression) ? <>{children}</> : null;
}

const exampleExpression: ConditionNode = {
  type: 'and',
  children: [
    { type: 'leaf', value: true },
    {
      type: 'or',
      children: [
        { type: 'leaf', value: false },
        { type: 'leaf', value: true },
      ],
    },
  ],
};

export function Demo() {
  return (
    <ConditionTreeRender expression={exampleExpression}>
      <div>Render success</div>
    </ConditionTreeRender>
  );
}
