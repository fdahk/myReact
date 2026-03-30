/*
实现目标：
- 手写一个最小版依赖图，理解 bundler 如何管理模块依赖关系。
-
核心思路：
- 使用邻接表存储 `module -> dependencies`。
- 支持添加模块和依赖关系，并可基于 DFS 收集可达模块。
- 这是 loader / plugin / bundler 之后常见的继续追问。
-
复杂度 / 运行特征：
- 添加依赖近似 O(1)，遍历图通常是 O(V + E)。
-
易错点：
- 真正 bundler 还会继续处理动态导入、循环依赖、chunk 划分。
- 这里重点是“依赖图”本体，而不是完整编译过程。
*/

class DependencyGraph {
  constructor() {
    this.graph = new Map();
  }

  addModule(id) {
    if (!this.graph.has(id)) {
      this.graph.set(id, new Set());
    }
  }

  addDependency(from, to) {
    this.addModule(from);
    this.addModule(to);
    this.graph.get(from).add(to);
  }

  collectReachable(entry) {
    const visited = new Set();

    const dfs = (moduleId) => {
      if (visited.has(moduleId)) {
        return;
      }

      visited.add(moduleId);
      const dependencies = this.graph.get(moduleId) || new Set();
      dependencies.forEach(dfs);
    };

    dfs(entry);
    return [...visited];
  }
}

const depGraph = new DependencyGraph();
depGraph.addDependency('index.js', 'app.js');
depGraph.addDependency('app.js', 'utils.js');
console.log(depGraph.collectReachable('index.js'));

export { DependencyGraph };
