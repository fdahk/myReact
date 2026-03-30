/*
实现目标：
- 手写一个最小版打包器运行时，理解模块包装、缓存与 `require` 执行流程。
-
核心思路：
- 所有模块以 `id -> factory` 的形式存在一个对象里。
- `require` 首次执行模块工厂，拿到 `module.exports` 后缓存结果。
- 后续再次 `require` 同一模块时直接返回缓存，避免重复执行。
-
复杂度 / 运行特征：
- 单次模块命中缓存时接近 O(1)。
- 这是“运行时最小模型”，不是完整的依赖解析与 AST 打包器实现。
-
易错点：
- 模块缓存是 CommonJS 语义的重要部分。
- 工程化面试里要说明“打包器 = 构建时分析 + 运行时加载”，这里只覆盖运行时。
-
适用场景 / 面试表达点：
- 适合解释 Webpack / CommonJS bundle 最小执行模型。
*/

function createBundleRuntime(modules) {
  const cache = {};

  function require(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId].exports;
    }

    const module = { exports: {} };
    cache[moduleId] = module;
    modules[moduleId](module, module.exports, require);
    return module.exports;
  }

  return require;
}

const require = createBundleRuntime({
  './name.js': (module) => {
    module.exports = 'bundle-runtime';
  },
  './index.js': (module, exports, requireFn) => {
    exports.message = `hello ${requireFn('./name.js')}`;
  },
});

console.log(require('./index.js'));
