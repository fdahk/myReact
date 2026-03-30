/*
实现目标：
- 手写一个最小版 `Webpack plugin`，理解 plugin 如何挂到构建生命周期。
-
核心思路：
- Plugin 本质上是一个带 `apply` 方法的对象或类。
- 在 `apply` 里拿到 `compiler`，再订阅某个生命周期钩子。
- 当前示例在 `emit` 阶段打印日志，强调的是“接入方式”而不是复杂业务。
-
复杂度 / 运行特征：
- Plugin 自身没有固定复杂度，核心在于你挂载的钩子做了什么工作。
- 与 loader 相比，plugin 更偏“扩展构建流程能力”，而不是转换单个文件内容。
-
易错点：
- loader 是函数，plugin 通常是类 / 对象并实现 `apply`。
- 面试里容易被追问 compiler、compilation、tapable 钩子机制的区别。
-
适用场景 / 面试表达点：
- 适合回答“plugin 最小怎么写、和 loader 有什么区别”。
*/

class LogBuildPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('LogBuildPlugin', (compilation) => {
      console.log('emit assets count:', Object.keys(compilation.assets).length);
    });
  }
}

module.exports = LogBuildPlugin;
