/*
实现目标：
- 手写一个最小版自定义指令系统，理解 Vue 指令如何把 DOM 操作逻辑按生命周期挂载出去。
-
核心思路：
- 用对象保存指令定义。
- 挂载时根据指令名找到对应实现，并执行 `mounted` / `updated` 钩子。
- 这能表达 `v-focus`、`v-permission` 等指令的最小运行模型。
-
复杂度 / 运行特征：
- 单次指令查找和执行近似 O(1)。
-
易错点：
- 指令更偏 DOM 级复用，不适合承载业务状态管理。
- 真正 Vue 指令会带 binding、arg、modifiers 等更完整信息。
*/

class DirectiveRegistry {
  constructor() {
    this.directives = new Map();
  }

  register(name, definition) {
    this.directives.set(name, definition);
  }

  mount(name, element, binding) {
    const directive = this.directives.get(name);
    directive?.mounted?.(element, binding);
  }

  update(name, element, binding) {
    const directive = this.directives.get(name);
    directive?.updated?.(element, binding);
  }
}

const registry = new DirectiveRegistry();
registry.register('focus', {
  mounted(element) {
    element.focus?.();
  },
});

export { DirectiveRegistry };
