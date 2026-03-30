/*
实现目标：
- 手写一个最小版 loader runner，理解多个 loader 如何串联处理源码。
-
核心思路：
- loader 链通常按从右到左的顺序执行。
- 每个 loader 接收上一个 loader 的输出，并返回新的字符串结果。
- 这是很多 bundler / webpack 面试里 loader 题的下一层追问。
-
复杂度 / 运行特征：
- 总体成本与 loader 数量和每次转换的源码长度相关。
-
易错点：
- loader 链执行顺序很容易写反。
- 真正的 webpack loader 还支持 pitch、async、source map、context。
-
适用场景 / 面试表达点：
- 适合讲 loader 链路，而不是只停留在“loader 是函数”这一层。
*/

function runLoaders(loaders, source) {
  return loaders.reduceRight((code, loader) => {
    return loader(code);
  }, source);
}

const result = runLoaders(
  [
    (code) => `${code}\n/* loader-a */`,
    (code) => `${code}\n/* loader-b */`,
  ],
  'const value = 1;'
);

console.log(result);

export { runLoaders };
