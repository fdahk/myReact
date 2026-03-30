/*
实现目标：
- 手写一个最小版 Babel 插件，在函数体开头自动插入埋点调用。
-
核心思路：
- Babel 插件本质上是访问 AST 节点并进行转换。
- 当前示例匹配函数声明，在函数体顶部插入 `track('functionName')`。
- 这是面试里最常见的“最小 Babel plugin”思路题。
-
复杂度 / 运行特征：
- 遍历成本与 AST 节点数相关，通常可近似看作 O(n)。
-
易错点：
- 要区分“插件做 AST 转换”和“运行时执行逻辑”。
- 若函数没有名字，要先确认用匿名标识还是跳过处理。
*/

module.exports = function autoTrackPlugin({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const functionName = path.node.id ? path.node.id.name : 'anonymous';
        path.node.body.body.unshift(
          t.expressionStatement(
            t.callExpression(t.identifier('track'), [t.stringLiteral(functionName)])
          )
        );
      },
    },
  };
};
