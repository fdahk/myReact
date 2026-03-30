/*
实现目标：
- 手写一个最小版插件运行器，理解多个插件如何统一接入并执行生命周期钩子。
-
核心思路：
- 维护插件数组。
- `use` 注册插件，`run` 依次执行插件的生命周期方法。
- 这比单独写某个 plugin 更贴近真实插件系统组织方式。
-
复杂度 / 运行特征：
- 注册 O(1)，执行某个生命周期的成本与插件数量 n 成正比。
-
易错点：
- 插件系统的关键不只是“能调用”，还在于生命周期设计是否稳定。
- 真实工程里常会再配合上下文对象、错误隔离和异步流程。
*/

class PluginRunner {
  constructor() {
    this.plugins = [];
  }

  use(plugin) {
    this.plugins.push(plugin);
  }

  async run(hookName, context) {
    for (const plugin of this.plugins) {
      if (typeof plugin[hookName] === 'function') {
        await plugin[hookName](context);
      }
    }
  }
}

const runner = new PluginRunner();
runner.use({
  beforeBuild(context) {
    context.logs.push('plugin-a');
  },
});
runner.use({
  beforeBuild(context) {
    context.logs.push('plugin-b');
  },
});

const context = { logs: [] };
runner.run('beforeBuild', context).then(() => console.log(context.logs));

export { PluginRunner };
