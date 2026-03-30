/*
实现目标：
- 手写一个最小版 chunk graph，理解打包器如何把模块分配到 chunk 中。
-
核心思路：
- 每个 chunk 维护自己的模块集合。
- 支持把模块加入某个 chunk，以及查看 chunk 间的包含关系。
- 这常是依赖图之后继续往下追的工程化题。
-
复杂度 / 运行特征：
- 添加模块近似 O(1)。
-
易错点：
- 真实 chunk graph 还会继续处理动态导入、共享依赖抽离、运行时 chunk。
- 这里重点在“模块分组到 chunk”的基本概念。
*/

class ChunkGraph {
  constructor() {
    this.chunks = new Map();
  }

  createChunk(name) {
    if (!this.chunks.has(name)) {
      this.chunks.set(name, new Set());
    }
  }

  addModuleToChunk(chunkName, moduleId) {
    this.createChunk(chunkName);
    this.chunks.get(chunkName).add(moduleId);
  }

  getChunkModules(chunkName) {
    return [...(this.chunks.get(chunkName) || [])];
  }
}

const graph = new ChunkGraph();
graph.addModuleToChunk('main', 'src/index.js');
graph.addModuleToChunk('vendor', 'react');
console.log(graph.getChunkModules('main'));

export { ChunkGraph };
