/*
实现目标：
- 手写一个最小版 Error Boundary 思路模型，理解组件树错误兜底机制。
-
核心思路：
- 用 try/catch 包裹子树渲染逻辑。
- 捕获到错误后改为渲染 fallback。
- 真实 React 只在类组件里通过生命周期实现，而这里用最小模型表达错误边界语义。
-
复杂度 / 运行特征：
- 包装层 O(1)。
-
易错点：
- Error Boundary 主要兜底渲染阶段错误，不等于全局 try/catch 万能处理。
- 事件回调和异步错误通常需要额外处理。
*/

function createErrorBoundary(renderChild, renderFallback) {
  return function render() {
    try {
      return renderChild();
    } catch (error) {
      return renderFallback(error);
    }
  };
}

const render = createErrorBoundary(
  () => {
    throw new Error('render failed');
  },
  (error) => ({ type: 'Fallback', message: error.message })
);

console.log(render());

export { createErrorBoundary };
