/*
实现目标：
- 手写一个最小版 Vite 风格 plugin container，理解插件如何围绕 `resolveId / load / transform` 串起来。
-
核心思路：
- 按顺序执行插件的生命周期钩子。
- `resolveId` 找模块路径，`load` 读模块源码，`transform` 逐个变换源码。
- 这比单独说 loader / plugin 更接近现代构建工具的插件模型。
-
复杂度 / 运行特征：
- 每个生命周期的成本与插件数量和源码长度相关。
-
易错点：
- Vite 插件和 Webpack loader / plugin 在组织方式上有明显差异。
- 这里是最小容器模型，不涉及 dev server 和模块图缓存。
*/

class PluginContainer {
  constructor(plugins = []) {
    this.plugins = plugins;
  }

  async resolveId(id) {
    for (const plugin of this.plugins) {
      if (plugin.resolveId) {
        const result = await plugin.resolveId(id);
        if (result) {
          return result;
        }
      }
    }
    return id;
  }

  async load(id) {
    for (const plugin of this.plugins) {
      if (plugin.load) {
        const result = await plugin.load(id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  async transform(code, id) {
    let transformed = code;

    for (const plugin of this.plugins) {
      if (plugin.transform) {
        transformed = (await plugin.transform(transformed, id)) || transformed;
      }
    }

    return transformed;
  }
}

export { PluginContainer };
