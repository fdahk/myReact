/*
实现目标：
- 手写一个最小版 source map 数据结构生成器，理解“编译后代码如何映射回源码位置”的核心思路。
-
核心思路：
- 为生成代码中的片段记录其来源文件、原始行列与生成后行列。
- 这里不实现 VLQ 编码，只保留最小映射表，突出“映射关系”本质。
- 面试里如果继续追问，可以再展开浏览器如何消费 source map。
-
复杂度 / 运行特征：
- 单次添加映射记录为 O(1)。
-
易错点：
- 真正 source map 格式比这个复杂得多，包括 names、sourcesContent、mappings 压缩串等。
- 这道题重点在原理，不在完整标准实现。
-
适用场景 / 面试表达点：
- 适合回答打包器调试、Babel/webpack 编译后如何定位源码。
*/

class SimpleSourceMap {
  constructor(file) {
    this.version = 3;
    this.file = file;
    this.sources = [];
    this.mappings = [];
  }

  addMapping({ source, originalLine, originalColumn, generatedLine, generatedColumn, name }) {
    if (!this.sources.includes(source)) {
      this.sources.push(source);
    }

    this.mappings.push({
      source,
      originalLine,
      originalColumn,
      generatedLine,
      generatedColumn,
      name: name || null,
    });
  }

  toJSON() {
    return {
      version: this.version,
      file: this.file,
      sources: this.sources,
      mappings: this.mappings,
    };
  }
}

const map = new SimpleSourceMap('bundle.js');
map.addMapping({
  source: 'src/index.js',
  originalLine: 1,
  originalColumn: 0,
  generatedLine: 1,
  generatedColumn: 0,
});
console.log(map.toJSON());

export { SimpleSourceMap };
