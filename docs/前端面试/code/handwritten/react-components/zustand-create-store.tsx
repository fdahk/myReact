/*
 * 如果说 Redux 的核心气质是：
 * “所有状态更新都必须走 action -> dispatch -> reducer 这条固定流程”，
 *
 * 那 Zustand 的核心气质可以概括成一句话：
 * “我就是一个可订阅的外部状态容器，你想读就读，想改就通过 set 改。”
 *
 * 所以 Zustand 和 Redux 的最大区别，不是“能不能做全局状态管理”，
 * 而是“它们要求你用什么心智模型去管理状态”。
 *
 * 你可以先这样理解：
 *
 * Redux 更像：
 * - 一个流程很严格的状态机
 * - 先发 action，再 dispatch，再 reducer 统一算新状态
 * - 更强调可预测、可追踪、可插中间件
 *
 * Zustand 更像：
 * - 一个很轻的共享 store
 * - 直接 `getState`、`setState`、`subscribe`
 * - 再额外提供一个 React Hook 帮你订阅所需切片
 *
 * 所以这道题你真正要理解的是：
 *
 * 1. Zustand 的 store 到底是什么？
 * 2. 为什么它不需要 action / reducer？
 * 3. 为什么它通常不需要 Provider？
 * 4. 为什么它能做到按 selector 订阅状态切片？
 * 5. 它和 Redux 相比到底轻在哪里？
 */

/*
 * ------------------------------------------------------------------
 * 先从最核心的问题开始：
 * Zustand 到底在解决什么问题？
 * ------------------------------------------------------------------
 *
 * React 组件自己的 `useState` 很适合管理局部状态，
 * 但如果多个组件都想共享同一份状态，就会遇到几个经典问题：
 *
 * - 状态要放在哪一层？
 * - 中间层只是“传 props”会不会很烦？
 * - 有没有办法不通过 Context Provider 也能共享？
 *
 * Zustand 的思路是：
 *
 * - 把状态放到组件树外面
 * - 做成一个独立的 store
 * - 组件只在需要时订阅 store 的某一部分
 *
 * 这和 Redux 的相同点是：
 * - 都有外部 store
 * - 都有 subscribe
 * - 都能驱动多个组件共享状态
 *
 * 但和 Redux 最大的不同是：
 *
 * Redux：
 * - 要先设计 action
 * - 再 dispatch action
 * - 再由 reducer 统一计算 nextState
 *
 * Zustand：
 * - 通常直接 `set((state) => ({ ... }))`
 * - 不强制 action
 * - 不强制 reducer
 *
 * 所以 Zustand 并不是“Redux 的另一个写法”，
 * 而是“另一套更轻的状态管理哲学”。
 */

/*
 * 2. `<>` 是什么？
 *
 * 在这份文件里，尖括号大多数时候表示“泛型”。
 *
 * 比如：
 * `createZustandStore<State>(...)`
 *
 * 你可以把泛型先理解成“类型参数”。
 * 就像函数可以接收值参数一样，
 * 泛型函数可以接收“类型参数”。
 *
 * 也就是说：
 * - 普通参数解决“值是什么”
 * - 泛型参数解决“类型是什么”
 *
 * 3. `State extends Record<string, unknown>` 是什么意思？
 *
 * 它的意思不是“继承类”，
 * 而是“给泛型加约束”。
 *
 * 这里可以翻译成：
 * “State 必须是一个对象类型，而且 key 是字符串。”
 *
 * 为什么要加这个约束？
 * 因为 Zustand 的 store 通常就是一个对象，
 * 后面我们还要对它做对象展开、浅合并等操作。
 * 如果不限制成对象，类型就会太松，很多地方不好表达。
 *
 * 6. `Partial<State>` 是什么？
 *
 * 这是 TypeScript 内置的工具类型。
 *
 * 它的意思是：
 * “把 State 里的所有字段都变成可选。”
 *
 * 举例：
 * 如果 `State` 是：
 * `{ count: number; name: string }`
 *
 * 那 `Partial<State>` 就相当于：
 * `{ count?: number; name?: string }`
 *
 * 为什么 Zustand 会用它？
 * 因为我们经常只想改一部分字段，而不是每次都传完整对象。
 *
 * 7. `declare function ...` 是什么？
 *
 * `declare` 可以先理解成：
 * “这里只声明这个函数的类型签名，但不在这个文件里实现它。”
 *
 * 为什么这里要这么写？
 * 因为这份文件更偏学习文档，
 * 我们只想说明 `useSyncExternalStore` 的使用方式和类型形状，
 * 又不想因为当前环境的 React 类型声明缺失而报错。
 *
 * 9. `() => T` 是什么意思？
 *
 * 它表示“一个返回 T 的函数类型”。
 *
 * 例如：
 * `get: () => State`
 *
 * 就是在说：
 * `get` 是一个不接收参数、返回 State 的函数。
 *
 */

declare function useSyncExternalStore<Snapshot>(
  subscribe: (listener: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot
): Snapshot;

// 上面这段 `declare function useSyncExternalStore<Snapshot>(...)`，
// 如果翻译成更白话的说明，就是：
//
// - 这里有一个叫 `useSyncExternalStore` 的函数
// - 它的返回值类型由泛型 `Snapshot` 决定
// - 你要传给它：
//   1. 一个订阅函数 subscribe
//   2. 一个读取当前快照的函数 getSnapshot
//   3. 一个可选的服务端快照函数 getServerSnapshot
//
// 这里的 `<Snapshot>` 就是在说：
// “这个 hook 最终读出来的数据类型，我现在先不写死，交给调用处决定。”

// `Listener` 表示订阅者回调。
// 当 store 状态变化后，我们会调用所有 listener，通知外界重新读取状态。
type Listener = () => void;

// `StateCreator` 可以理解成 Zustand 风格 store 的“初始化函数”。
//
// 它和 Redux 的 reducer 最大不同在这里：
//
// Redux reducer：
// `(prevState, action) => nextState`
//
// Zustand createState：
// `(set, get) => initialStateObject`
//
// 也就是说，Zustand 在创建 store 时，直接把“如何读状态、如何改状态”这两个能力
// 注入给你，让你自己定义 store 里有哪些字段、有哪些方法。
//
// 所以 Zustand 更像是在“定义一个状态容器对象”，
// 而 Redux 更像是在“定义一个状态更新规则函数”。
type StateCreator<State> = (
  set: (
    partial:
      | Partial<State>
      | ((state: State) => Partial<State> | State),
    replace?: boolean
  ) => void,
  get: () => State
) => State;

/**
 * 创建 Zustand 风格 store。
 *
 * 你可以把它理解成：
 * “给我一个初始化函数，我帮你做出一个可读、可改、可订阅、可在 React 中使用的 store。”
 *
 * 和 `createStore(reducer)` 的 Redux 风格相比，
 * 这里不是传 reducer，而是传 `createState(set, get)`。
 *
 * 这是两者最根本的差异之一：
 *
 * Redux：
 * - store 只负责保存 state
 * - 状态怎么改，交给 reducer
 *
 * Zustand：
 * - store 本身就包含状态和更新方法
 * - 你可以在 store 里直接写 `increment`、`login`、`toggleTheme`
 */
export function createZustandStore<State extends Record<string, unknown>>(
  createState: StateCreator<State>
) {
  // `state`：
  // store 当前保存的状态。
  //
  // 注意，它不只是纯数据字段，
  // 在 Zustand 里常常还会把“更新方法”一起放进 state 里。
  //
  // 例如：
  // {
  //   count: 0,
  //   increment: () => set(...)
  // }
  //
  // 这和 Redux 很不同。
  // Redux 通常不会把 “increment” 这种更新函数直接放进 state 对象里。
  let state: State;

  // 这里用 `Set` 而不是数组，主要是因为：
  // - 删除更直接
  // - 不容易重复注册同一个引用
  const listeners = new Set<Listener>();

  /**
   * 读取当前最新状态。
   *
   * 和 Redux 的 `getState` 一样，它本质上也是 O(1) 的简单读取。
   *
   * 但语义差异在于：
   * - Redux 更常把它理解成“读取状态树”
   * - Zustand 更常把它理解成“读取当前 store 对象”
   */
  const getState = () => state;

  /**
   * Zustand 里最核心的更新入口：`setState`。
   *
   * 这里和 Redux 要重点对比：
   *
   * Redux 的更新入口是：
   * - `dispatch(action)`
   * - store 再调用 reducer 算新状态
   *
   * Zustand 的更新入口是：
   * - 直接 `setState(partial)` 或 `setState((state) => partial)`
   * - 不需要 action，也不需要 reducer
   *
   * 所以 Zustand 的更新链路更短：
   *
   * `setState -> 计算 nextState -> 保存 -> 通知订阅者`
   *
   * 而 Redux 的更新链路更长：
   *
   * `dispatch -> reducer -> nextState -> 保存 -> 通知订阅者`
   */
  const setState = (
    partial: Partial<State> | ((currentState: State) => Partial<State> | State),
    replace = false
  ) => {
    // `partial` 支持两种写法：
    //
    // 1. 直接传对象
    //    setState({ count: 1 })
    //
    // 2. 传函数式更新
    //    setState((state) => ({ count: state.count + 1 }))
    //
    // 第二种写法更安全，因为它能基于最新状态计算下一个值。
    const nextState = typeof partial === 'function' ? partial(state) : partial;

    // 默认情况下，Zustand 常见语义是“浅合并”。
    //
    // 也就是说：
    // 如果你传 `{ count: 2 }`
    // 它通常不是把整个 state 替换成只剩 count，
    // 而是把 count 合并进原来的 state。
    //
    // 这和 Redux 又不一样：
    // Redux reducer 一般会显式返回完整的 nextState。
    //
    // `replace = true` 时则表示整份替换。
    const resolvedState = replace
      ? (nextState as State)
      : ({ ...state, ...nextState } as State);

    // 如果新旧引用完全一样，就没必要通知订阅者。
    //
    // 这里的判断非常简单，只是最小实现。
    // 真实项目里，是否真的“没有变化”，可能还会结合更细粒度策略。
    if (Object.is(resolvedState, state)) {
      return;
    }

    // 真正更新 store 中保存的状态。
    state = resolvedState;

    // 通知所有订阅者：“状态变了。”
    //
    // 这一步和 Redux 的订阅机制在本质上是很像的。
    // 只是 Redux 订阅者通常是“整个 store 变了”，
    // Zustand 再往上一层会通过 selector 做切片读取。
    listeners.forEach((listener) => listener());
  };

  /**
   * 订阅状态变化。
   *
   * 这部分和 Redux 很相似：
   * - 注册 listener
   * - 返回取消订阅函数
   *
   * 但 Zustand 的使用场景更广：
   * - 组件层可以用 `useStore`
   * - 非组件层也可以直接 `subscribe`
   */
  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  /**
   * 销毁 store 订阅。
   *
   * 真实 Zustand 的能力会更多，这里保留一个最小版 `destroy`，
   * 主要用于说明：
   * “这个 store 不只是能订阅，还可以清理订阅者。”
   */
  const destroy = () => {
    listeners.clear();
  };

  // 这一行非常关键。
  //
  // 它表示：
  // “现在正式执行 createState(setState, getState)，构造出初始 store 对象。”
  //
  // 这和 Redux 初始化方式很不一样：
  //
  // Redux：
  // - 先保存 reducer
  // - 再内部 dispatch 一次 `@@redux/INIT`
  // - 让 reducer 返回初始 state
  //
  // Zustand：
  // - 直接执行 createState(set, get)
  // - 返回什么，初始 state 就是什么
  //
  // 所以 Redux 是“通过 reducer 推导初始 state”，
  // Zustand 是“直接创建初始 state 对象”。
  state = createState(setState, getState);

  /**
   * `useStore` 是 Zustand 能和 React 无缝配合的关键。
   *
   * 它做的事情其实可以拆成两步：
   *
   * 1. 订阅这个外部 store
   * 2. 每次 store 更新时，重新读取 selector(state)
   *
   * 为什么这里要传 selector？
   * 因为组件通常不需要整个 store，
   * 它可能只关心：
   * - `state.count`
   * - `state.user.name`
   * - `state.theme`
   *
   * 所以 selector 的意义是“只取我关心的那一小块”。
   *
   * 这也是 Zustand 一个非常重要的使用体验优势：
   * 它天然鼓励按切片读取，而不是整棵状态树全拿。
   *
   * 和 Redux 的不同点：
   *
   * - Redux 本身不直接提供 React Hook
   * - 通常要借助 `react-redux` 的 `useSelector`
   * - Zustand 则经常直接把 hook 能力内聚到 store 里
   */
  function useStore<Selected>(
    selector: (currentState: State) => Selected = ((s: State) => s as unknown as Selected)
  ) {
    // 1. `useStore<Selected>` 里的 `<Selected>`
    //    表示“selector 选出来的结果类型”。
    //
    //    例如：
    //    `useStore((state) => state.count)`
    //    那么 Selected 通常就是 `number`
    //
    // 2. `selector: (currentState: State) => Selected`
    //    表示 selector 是一个函数：
    //    - 参数是整份 State
    //    - 返回值是你想取出的那一小块 Selected
    //
    // 3. `= ((s: State) => s as unknown as Selected)`
    //    这是默认值。
    //    它表示：
    //    “如果你没有传 selector，那默认就返回整份 state。”
    //
    //    之所以写成 `as unknown as Selected`，
    //    不是因为运行时要做两次转换，
    //    而是为了告诉 TypeScript：
    //    “这里默认把整份 state 当作 Selected 结果返回。”
    // 这里正式调用 `useSyncExternalStore`。
    // “帮 React 组件安全地订阅一个 React 组件树之外的外部 store。”
    //
    // 它这里一共传了 3 个参数：
    //
    // 1. `subscribe`
    //    作用是“注册订阅”。
    //    React 会把自己的一个监听函数传进去，
    //    当 Zustand store 变化时，`subscribe` 内部就会触发这个监听函数，
    //    从而告诉 React：
    //    “外部状态变了，你应该重新读取一次快照并决定是否重渲染。”
    //
    // 2. `() => selector(getState())`
    //    这是客户端环境下的“读取快照函数”。
    //    你可以把它理解成：
    //    “现在立刻从 store 里拿到当前最新状态，再通过 selector 取出组件真正关心的那一小块。”
    //
    //    为什么不直接写成 `getState()`？
    //    因为组件通常不需要整份 state，
    //    它可能只关心 `count`、`user.name` 或某个布尔值。
    //    所以这里必须先 `getState()`，再过一层 `selector(...)`。
    //
    // 3. `() => selector(getState())`
    //    这是服务端渲染场景下的“读取快照函数”。
    //
    //    这里先解释一下什么叫“服务端渲染场景”。
    //
    //    平时我们最熟悉的是“纯客户端渲染”：
    //    - 浏览器先拿到一份很空的 HTML
    //    - 再下载 JavaScript
    //    - JavaScript 在浏览器里运行后，React 才开始真正渲染页面
    //
    //    但服务端渲染（SSR，Server-Side Rendering）不是这样。
    //    它的流程更像是：
    //    - React 先在服务器环境里执行一遍
    //    - 服务器先产出一份“已经带内容的 HTML”
    //    - 浏览器拿到 HTML 后先直接显示
    //    - 然后前端 JavaScript 再接管页面，这一步通常叫 hydration（注水 / 激活）
    //
    //    所以“服务端渲染场景下的读取快照函数”说白了就是：
    //    “如果这段代码不是在浏览器里跑，而是在服务器上先执行，
    //    那 React 应该用什么方式先读到一份状态快照，生成首屏 HTML？”
    //
    //    为什么 `useSyncExternalStore` 要单独把这个函数拆出来？
    //    因为 React 需要区分两件事：
    //
    //    - 客户端现在如何读取外部 store 的最新值
    //    - 服务端在生成 HTML 时，又该读取哪一份值
    //
    //    如果这两边读到的值不一致，就可能出现一个经典问题：
    //    “服务器生成的 HTML 内容”和“浏览器接管时第一次渲染的内容”对不上，
    //    进而导致 hydration mismatch（注水不一致）警告。
    //
    //    举个例子：
    //    - 服务器上读到的 count 是 0，于是输出 `<span>0</span>`
    //    - 浏览器刚接管时立刻读到的 count 却是 1，于是想渲染 `<span>1</span>`
    //    - 这时 React 就会发现：服务端 HTML 和客户端第一次渲染结果不一致
    //
    //    所以第三个参数的意义就是：
    //    “请告诉 React，在服务端那一侧，应该读取哪份快照作为初始渲染依据。”
    //
    //    在我们这个最小教学版里，之所以把它写成和第二个参数一样：
    //
    //    `() => selector(getState())`
    //
    //    不是因为服务端和客户端永远没有区别，
    //    而是因为这份示例没有真的去做 SSR，也没有区分“服务端初始状态”和“客户端接管后的状态”。
    //
    //    也就是说，这里只是用同一套读取逻辑来表达参数位置和职责：
    //    - 第二个参数：客户端怎么读
    //    - 第三个参数：服务端怎么读
    //
    //    在真实 SSR 项目里，这第三个函数有时会专门返回：
    //    - 服务端预注入的初始状态
    //    - 请求级上下文里的 store 快照
    //    - 某个在服务端就已经准备好的静态结果
    //
    //    你可以先把它简单记成一句话：
    //    第三个参数是“给服务器首屏渲染阶段使用的快照读取函数”，
    //    它的主要价值是帮助 React 在 SSR + hydration 场景下保持前后状态一致。
    //
    //    对初学者来说，可以先把第二个和第三个参数都理解成：
    //    “告诉 React：如果要重新读取 Zustand 当前值，应该怎么读。”
    //
    // 这里还要再补一个最容易卡住的点：
    // 你在这几行代码里“看不到手动调用”，
    // 并不代表这两个函数不会执行，
    // 而是因为它们不是由我们当前这层业务代码直接调用，
    // 而是交给 `useSyncExternalStore`，再由 React 内部在合适的时机调用。
    //
    // 你可以把它想成：
    // 我们现在不是“立刻执行这两个函数”，
    // 而是在把两份“回调说明书”交给 React：
    //
    // - `subscribe`
    //   说明“如果以后你想监听 store 变化，应该怎么订阅”
    //
    // - `() => selector(getState())`
    //   说明“如果以后你想读取当前快照，应该怎么读”
    //
    // 真正的执行流程大致是：
    //
    // 1. 组件 render 时执行 `useSyncExternalStore(...)`
    // 2. React 内部会调用一次 `getSnapshot`
    //    也就是这里传进去的：
    //    `() => selector(getState())`
    // 3. 这次调用里会先执行 `getState()`
    // 4. 再把整份 state 传给 selector
    // 5. 得到当前组件本次 render 需要使用的切片值
    // 6. React 把这个切片值作为 `useSyncExternalStore` 的返回结果交还给组件
    //
    // 后续当组件 commit 完成后，React 还会基于 `subscribe`
    // 把自己的监听函数注册到这个外部 store 上。
    //
    // 等将来 store 更新时，流程会变成：
    //
    // 1. `setState(...)` 改写 store 内部状态
    // 2. `listeners.forEach(...)` 依次通知所有订阅者
    // 3. 其中有一个订阅者就是 React 注册进来的监听函数
    // 4. React 收到通知后，不会盲目直接重渲染
    // 5. 它会再次调用 `getSnapshot()`
    // 6. 也就是再次执行 `() => selector(getState())`
    // 7. 拿到新的切片值后，再和上一次读取结果比较
    // 8. 如果快照变了，React 才推进组件更新
    //
    // 所以你现在在源码表面只看到：
    // `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`
    //
    // 但底层真实发生的是：
    // - render 时 React 会调用 `getSnapshot`
    // - 订阅建立后 store 更新会触发 React 的 listener
    // - React 再调用 `getSnapshot`
    // - 根据新旧快照是否变化决定要不要让组件更新
    //
    // 所以这一整段代码的实际含义就是：
    // “把 subscribe 交给 React，把‘如何读取当前选中状态’也交给 React，
    // 之后 React 就能在 Zustand store 变化时，自动帮我们重新读取和更新组件。”
    return useSyncExternalStore(
      subscribe,
      () => selector(getState()),
      () => selector(getState())
    );
  }

  // 返回 Zustand 风格 store 对象。
  //
  // 你会看到它的 API 结构明显更偏“直接操作”：
  // - `getState`
  // - `setState`
  // - `subscribe`
  // - `destroy`
  // - `useStore`
  //
  // 对比 Redux 的最小 store：
  // - `getState`
  // - `dispatch`
  // - `subscribe`
  // - `replaceReducer`
  //
  // 两者最值得记住的一句话差异就是：
  //
  // Redux：通过 `dispatch(action)` 间接改状态
  // Zustand：通过 `setState(...)` 直接改状态
  return {
    getState,
    setState,
    subscribe,
    destroy,
    useStore,
  };
}

/**
 * 下面给一个最小示例。
 *
 * 在 Zustand 里，我们经常会把“状态字段”和“更新方法”直接定义在一起。
 *
 * 例如这里：
 * - `count` 是状态
 * - `increment` 是更新方法
 *
 * 这点和 Redux 很不一样：
 *
 * Redux 通常不会把 `increment` 方法直接放进 state，
 * 而是：
 * - 先写 action
 * - 再 dispatch action
 * - 再让 reducer 处理
 *
 * Zustand 则更像：
 * “我直接在 store 里定义一个方法，这个方法内部调用 set 就行。”
 */
const counterStore = createZustandStore<{ count: number; increment: () => void }>(
  // 传入一个工厂函数，这个工厂函数在store内部拿到get、set函数，并返回一个初始状态对象
  (set, get) => ({
  count: 0,
  increment: () => {
    // 这里直接调用 `set` 更新状态。
    //
    // 这就是 Zustand 最典型的风格：
    // 不 dispatch，不 reducer，直接 set。
    set((state) => ({ count: state.count + 1 }));

    // `get()` 用来读取更新后的最新状态。
    console.log('current count:', get().count);
  },
})
);

// 订阅状态变化。
// 每次 store 更新后，这个回调都会执行。
counterStore.subscribe(() => {
  console.log('zustand state changed:', counterStore.getState().count);
});

// 调用 store 中定义好的方法。
// 这也是 Zustand 很常见的使用方式：
// `store.getState().someAction()`
counterStore.getState().increment();
