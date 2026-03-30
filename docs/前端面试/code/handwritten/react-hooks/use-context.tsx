/*
 * 这份文件会把 `Context`、`Provider`、`useContext` 这三个概念拆开讲清楚，
 * 并且重点解释一个初学者最容易困惑的问题：
 *
 * “为什么 Provider 一定要包在子组件外层，子组件才能访问到它？”
 *
 * 如果只记结论，很容易变成死记硬背：
 * - “Provider 要包住 children”
 * - “useContext 会拿最近的 Provider”
 *
 * 但如果不理解底层过程，就会继续困惑：
 * - 为什么不是全局都能拿到？
 * - 为什么最近的 Provider 生效？
 * - 为什么同一个 Context 在不同区域可以有不同值？
 *
 * 所以这份文件会从 4 层来解释：
 *
 * 1. Context 是什么？
 * 2. Provider 是什么？
 * 3. useContext 是什么？
 * 4. React 渲染时，Provider 的值为什么只对“被它包住的那棵子树”生效？
 */

/*
 * ------------------------------------------------------------------
 * 一、Context、Provider、useContext 分别是什么？
 * ------------------------------------------------------------------
 *
 * 1. Context 是什么？
 *
 * Context 可以先理解成一个“共享通道描述对象”。
 * 它的作用不是直接保存整个应用的所有状态，
 * 而是描述：
 *
 * - 这是一种可以跨层传递的数据
 * - 它有默认值
 * - 它可以在某棵子树上被 Provider 临时覆盖
 *
 * 常见场景有：
 * - theme（主题）
 * - locale（语言）
 * - auth（登录态 / 用户信息）
 * - form 上下文
 * - store 注入
 *
 * 2. Provider 是什么？
 *
 * Provider 可以理解成：
 * “给某棵子树提供一份 Context 值的边界节点。”
 *
 * 它做的事情不是“全局注册一个值”，
 * 而是：
 * “从这里开始往下，这棵子树里的后代组件在读取这个 Context 时，优先看到我提供的值。”
 *
 * 所以 Provider 的本质不是普通组件包装壳，
 * 而是一个“上下文作用域边界”。
 *
 * 3. useContext 是什么？
 *
 * `useContext(ContextObject)` 的作用不是自己去主动订阅全世界的某个值，
 * 而是：
 * “在当前正在渲染的这个组件位置上，读取当前最近的那个 Provider 提供的值。”
 *
 * 重点是“当前组件位置”和“最近的 Provider”。
 *
 * 所以你可以先记一句最核心的话：
 *
 * - Context：描述一种可跨层共享的数据通道
 * - Provider：给某棵子树提供这条通道当前的值
 * - useContext：在当前组件位置读取这条通道的当前值
 */

/*
 * ------------------------------------------------------------------
 * 二、为什么 Provider 必须包在子组件外层？
 * ------------------------------------------------------------------
 *
 * 因为 Context 的值不是“靠名字全局查表”拿到的，
 * 而是 React 在“渲染当前组件所在这条树路径”时，
 * 根据路径上遇到的 Provider 一层层推导出来的。
 *
 * 这句话非常重要。
 *
 * 也就是说，React 不是简单地说：
 * “ThemeContext 现在全局值是 dark”
 *
 * 而更像是在说：
 * “当前我正渲染到某个组件，它的祖先路径上最近的 ThemeContext.Provider 提供了什么值？”
 *
 * 所以 Provider 为什么要包住子组件？
 *
 * 因为只有当子组件在这棵 Provider 所覆盖的子树里被渲染时，
 * React 才能在渲染路径上先遇到这个 Provider，
 * 然后把它的 value 压入当前的上下文环境，
 * 接着子组件调用 `useContext` 时，才能读到这份值。
 *
 * 如果某个组件根本不在这个 Provider 的子树下面，
 * 那 React 渲染它时就不会经过这个 Provider，
 * 自然也不可能读到这个 Provider 提供的值。
 *
 * 所以不是“Provider 必须包裹子组件”这条规则本身神秘，
 * 而是因为 Context 的读取本来就是“基于组件树位置”的。
 *
 * 换句话说：
 *
 * - 不是谁 import 了 Context，谁就能拿到最近 Provider
 * - 而是谁在这棵 Provider 的后代子树里渲染，谁才能读到它
 */

/*
 * ------------------------------------------------------------------
 * 三、底层运行过程到底是什么？
 * ------------------------------------------------------------------
 *
 * React 在渲染组件树时，会维护一份“当前上下文环境”。
 *
 * 每当渲染到一个 Provider，例如：
 *
 * <ThemeContext.Provider value="dark">
 *   <Page />
 * </ThemeContext.Provider>
 *
 * React 会做一个很像“入栈 / 出栈”的过程：
 *
 * 1. 先记住进入这个 Provider 之前的旧值
 * 2. 把当前 Context 的值临时切到 `"dark"`
 * 3. 开始渲染它的 children，也就是 `<Page />` 这棵子树
 * 4. 在这棵子树里，谁调用 `useContext(ThemeContext)`，读到的就是 `"dark"`
 * 5. 当这棵子树渲染结束后，再把旧值恢复回去
 *
 * 所以底层更像：
 *
 * - 进入 Provider：push 当前值
 * - 渲染子树：后代读取这个值
 * - 离开 Provider：pop 恢复旧值
 *
 * 这就是为什么：
 *
 * 1. Provider 只能影响自己的后代子树
 * 2. 同一个 Context 可以在不同区域提供不同值
 * 3. 最近的 Provider 会覆盖更外层的 Provider
 *
 * 因为“最近的 Provider”本质上就是：
 * 在当前这条渲染路径上，最后一次被 push 进去、还没有 pop 掉的那份值。
 */

/*
 * ------------------------------------------------------------------
 * 四、为什么最近的 Provider 生效？
 * ------------------------------------------------------------------
 *
 * 看一个例子：
 *
 * <ThemeContext.Provider value="light">
 *   <Layout>
 *     <ThemeContext.Provider value="dark">
 *       <Button />
 *     </ThemeContext.Provider>
 *   </Layout>
 * </ThemeContext.Provider>
 *
 * 当 React 渲染到 `Button` 时，这条路径上会先遇到：
 *
 * - 外层 Provider：value = light
 * - 内层 Provider：value = dark
 *
 * 于是最终当前上下文里的 ThemeContext 值就是 `dark`。
 *
 * 所以“最近的 Provider 生效”不是因为 React 特意做了一个“最近优先搜索算法”，
 * 而是因为在当前渲染路径上，内层 Provider 会把外层值覆盖掉，
 * 而 `Button` 调用 `useContext` 时读到的就是当前这份覆盖后的值。
 */

/*
 * ------------------------------------------------------------------
 * 五、useContext 为什么自己不需要显式 subscribe？
 * ------------------------------------------------------------------
 *
 * 这是另一个常见困惑。
 *
 * 很多人看到外部 store（如 Zustand、Redux）要显式订阅，
 * 就会问：为什么 `useContext` 自己看起来只是“读一下值”，却也能跟着更新？
 *
 * 原因是：
 * Context 更新不是靠 `useContext` 自己手写订阅逻辑完成的，
 * 而是 React 在 Provider 的 value 变化时，
 * 会让相关消费组件重新参与渲染。
 *
 * 也就是说：
 *
 * - `useContext` 更像“读取当前渲染环境里的值”
 * - 真正驱动它重新读取的，是 React 的渲染更新流程
 *
 * 所以 `useContext` 和 `useSyncExternalStore` 很不一样：
 *
 * - `useSyncExternalStore`：自己桥接外部 store 订阅
 * - `useContext`：依赖 React 内部上下文传播和重新渲染机制
 */

/*
 * ------------------------------------------------------------------
 * 六、下面写一个最小教学模型
 * ------------------------------------------------------------------
 *
 * 注意：这不是 React 真正源码实现，
 * 只是为了帮助理解“Provider 为什么只能影响自己的子树”。
 *
 * 核心思路：
 * - Context 本质上是一个共享容器对象。
 * - `useContext` 只负责读取当前 context 上最新的 value。
 * - 真正让它“响应变化”的关键仍然是 Provider 更新时驱动消费组件重新渲染。
 *
 * - `createSimpleContext`：创建 Context 对象
 * - `withProvider`：模拟进入 Provider、渲染 children、退出 Provider 的过程
 * - `useContext`：读取当前 Context 的值
 *
 * 其中最关键的是 `withProvider`：
 * 它会先保存旧值，再把新值写进去，执行 children 渲染逻辑，最后恢复旧值。
 * 这正好对应了前面讲的 push / pop 过程。
 * 
 * 易错点：
 * - `useContext` 自己不做订阅逻辑，它依赖 React 渲染系统把新值传下来。
 * - Context 很适合依赖注入和中低频共享状态，但不等于高性能状态管理方案。
 */

type SimpleContext<T> = {
  _currentValue: T;
  _defaultValue: T;
};

function createSimpleContext<T>(defaultValue: T): SimpleContext<T> {
  return {
    _currentValue: defaultValue,
    _defaultValue: defaultValue,
  };
}

function withProvider<T>(context: SimpleContext<T>, value: T, renderChildren: () => void) {
  // 进入 Provider 前，先记住旧值。
  const previousValue = context._currentValue;

  // 进入 Provider，相当于把当前上下文值临时切换成 Provider 提供的 value。
  context._currentValue = value;

  try {
    // 开始渲染这棵 Provider 所包住的子树。
    renderChildren();
  } finally {
    // 子树渲染结束后，恢复进入 Provider 之前的旧值。
    // 这一步非常关键，它保证了 Provider 的影响范围只停留在自己的子树内部。
    context._currentValue = previousValue;
  }
}

function useContext<T>(context: SimpleContext<T>) {
  // 教学版里，`useContext` 就先直接读当前 Context 上的当前值。
  //
  // 真正 React 源码里当然不只是这一行，
  // 它会结合当前 Fiber、当前渲染上下文、Provider 栈等信息工作。
  //
  // 但从“为什么它会读到最近 Provider 的值”这件事上看，
  // 你可以先把它理解成：
  // “读当前这条渲染路径上这个 Context 正在生效的值。”
  return context._currentValue;
}

const ThemeContext = createSimpleContext('light');

console.log('outside provider:', useContext(ThemeContext));

withProvider(ThemeContext, 'dark', () => {
  console.log('inside provider subtree:', useContext(ThemeContext));

  withProvider(ThemeContext, 'blue', () => {
    console.log('inside nested provider subtree:', useContext(ThemeContext));
  });

  console.log('back to outer provider subtree:', useContext(ThemeContext));
});

console.log('after provider finished:', useContext(ThemeContext));

export { createSimpleContext, withProvider, useContext };
