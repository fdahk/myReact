/*
 * 这份文件不是“为了把代码写短”，而是故意写成一篇适合初学者阅读的学习文档。
 *
 * 你可以把 Redux 先理解成一句话：
 * “它是一个专门管理共享状态的容器，并且规定状态必须通过固定流程去修改。”
 *
 * 这个固定流程是：
 *
 * 1. 业务代码发出一个 action
 * 2. store 收到 action，调用 reducer
 * 3. reducer 根据旧 state 和 action 算出新 state
 * 4. store 保存新 state
 * 5. store 通知所有订阅者：“状态更新了，你们可以重新读取了”
 *
 * 所以 `createStore` 这道题，本质上不是考你会不会背 API，
 * 而是在考你是否真的理解下面 4 个问题：
 *
 * 1. 状态放在哪里？
 * 2. 状态怎么改？
 * 3. 外界怎么知道状态变了？
 * 4. 为什么 Redux 要把“改状态”这件事约束得这么严格？
 *
 * 这一版实现刻意保留了 Redux 最核心的四个能力：
 *
 * - `getState`：读取当前状态
 * - `dispatch`：派发 action，触发状态更新
 * - `subscribe`：订阅状态变化
 * - `replaceReducer`：替换 reducer
 *
 * 你读完整个文件后，应该能回答：
 *
 * - store 到底是什么
 * - reducer 为什么必须是函数
 * - action 为什么通常要求是普通对象
 * - subscribe 为什么要返回取消订阅函数
 * - 为什么初始化时要主动 dispatch 一次
 * - 为什么 reducer 里不能再次 dispatch
 */

/*
 * ------------------------------------------------------------------
 * action、dispatch、reducer 到底是什么？
 * ------------------------------------------------------------------
 *
 * 很多初学者第一次接触 Redux 时，最容易卡住的不是代码，
 * 而是这三个词总感觉都在“更新状态”，但又不知道它们分别负责什么。
 *
 * 你可以先把它们理解成一次“点外卖”的流程：
 *
 * - action：你下的订单，描述“发生了什么”
 * - dispatch：把订单交给店家的动作
 * - reducer：店家根据订单内容实际做菜的规则
 *
 * 最后做出来的菜，就好比新的 state。
 *
 * 1. action 是什么？
 *
 * action 本质上是一个普通对象，
 * 它的作用不是“自己去修改状态”，
 * 而是“描述这次发生了什么事情”。
 *
 * 比如：
 *
 * - `{ type: 'increment' }`
 * - `{ type: 'todo/add', payload: 'learn redux' }`
 *
 * 你会发现，action 更像一张“说明单”或“命令描述”。
 * 它告诉系统：
 * “有人点击了加一”
 * “有人要新增一条 todo”
 *
 * 但 action 自己不会执行任何修改逻辑。
 *
 * 2. dispatch 是什么？
 *
 * dispatch 是 store 暴露出来的一个方法，
 * 它的作用是：
 * “把 action 正式送进 Redux 的更新流程。”
 *
 * 你可以把它理解成“提交 action”。
 *
 * 如果只有 action，但你不 dispatch，
 * 那这个 action 就只是一个普通对象，什么也不会发生。
 *
 * 只有执行了：
 *
 * `store.dispatch({ type: 'increment' })`
 *
 * Redux 才会真的开始更新状态。
 *
 * 所以：
 *
 * - action 是“更新说明”
 * - dispatch 是“提交这个说明的动作”
 *
 * 3. reducer 是什么？
 *
 * reducer 是一个函数，
 * 它的作用是：
 * “根据旧状态和 action，计算出新状态。”
 *
 * 你可以把它理解成 Redux 里真正负责“算状态”的地方。
 *
 * 它的固定形式通常是：
 *
 * `(prevState, action) => nextState`
 *
 * 注意 reducer 的重点是“计算”。
 * 它不应该做请求，不应该弹窗，不应该改 DOM，
 * 而应该老老实实根据输入返回输出。
 *
 * 也正因为它只是纯计算，
 * Redux 的状态变化才会比较容易预测和调试。
 *
 * 4. 它们三者之间到底是什么关系？
 *
 * 最核心的一句话是：
 *
 * `dispatch(action)` 会触发 store 调用 reducer(oldState, action)，
 * 然后 reducer 返回 newState，最后 store 保存 newState。
 *
 * 也就是：
 *
 * 1. 你先准备一个 action
 * 2. 你调用 dispatch 把 action 送进 store
 * 3. store 拿着当前 state 和这个 action 去调用 reducer
 * 4. reducer 返回新的 state
 * 5. store 保存这个新 state
 * 6. store 通知订阅者“状态变了”
 *
 * 5. 为什么 Redux 要拆成这三层，而不是直接改状态？
 *
 * 因为 Redux 强调的是“可预测”。
 *
 * 如果任何组件、任何函数都能随手改全局状态：
 * - 你很难知道状态是谁改的
 * - 你很难追踪某次 bug 是从哪里来的
 * - 中间件、日志、时间旅行调试都很难实现
 *
 * 但拆成 action / dispatch / reducer 之后：
 *
 * - action 负责描述发生了什么
 * - dispatch 负责统一进入更新流程
 * - reducer 负责统一计算新状态
 *
 * 这样“状态为什么变化”就会变得非常清楚。
 *

/**
 * `createStore` 的职责只有一件事：
 * 根据 reducer 和初始状态，创建一个“可以管理状态的 store 对象”。
 *
 * 这里的 store 不是数据库，不是浏览器缓存，
 * 它只是一个存在于内存中的 JavaScript 对象，
 * 专门负责：
 *
 * - 保存 state
 * - 调用 reducer 更新 state
 * - 通知订阅者 state 变了
 *
 * @param {Function} reducer
 * `reducer` 是 Redux 的核心。
 * 它必须是函数，因为 store 不知道“状态应该怎么改”，
 * store 只负责把“旧状态 + action”交给 reducer，
 * 然后拿回“新状态”。
 *
 * reducer 的签名可以理解成：
 * `(prevState, action) => nextState`
 *
 * @param {Object} preloadedState
 * 预加载状态。真实项目里常用于：
 * - 服务端渲染注水
 * - 本地缓存恢复
 * - 调试或测试时给定初始值
 *
 * @returns {Object}
 * 返回 store 对象，里面包含最核心的 4 个方法：
 * - `getState`
 * - `dispatch`
 * - `subscribe`
 * - `replaceReducer`
 */
function createStore(reducer, preloadedState) {
  // 第一步先校验 reducer。
  // 为什么要校验？
  // 因为整个 store 的更新流程都依赖 reducer 计算“下一个状态”。
  // 如果 reducer 不是函数，store 根本不知道该怎么工作。
  if (typeof reducer !== 'function') {
    throw new TypeError('reducer must be a function');
  }

  // `currentReducer`：
  // 当前正在使用的 reducer。
  // 之所以不直接用入参 `reducer`，是因为后面支持 `replaceReducer`，
  // 所以这里需要一个“可替换”的当前 reducer 引用。
  let currentReducer = reducer;

  // `currentState`：
  // 当前最新状态。它就是 store 内部真正保存 state 的地方。
  // 外界永远不应该直接改这个变量，
  // 只能通过 `dispatch -> reducer -> nextState` 这条链路更新它。
  let currentState = preloadedState;

  // 为什么这里先用“数组”而不是 `Set`？
  // 这不是因为数组在所有场景下都绝对更优，
  // 而是因为在 Redux 这道题的教学语境里，数组更容易把核心思想讲清楚。
  //
  // 用数组来表达这件事，对初学者最直观：
  // - 注册：`push`
  // - 删除：`filter`
  // - 派发通知前复制一份：`slice`
  //
  // 那 `Set` 能不能用？
  // 当然可以，而且在很多轻量状态库里，`Set` 其实很常见。
  // 因为它有两个明显优点：
  // - `add` / `delete` 语义直接
  // - 天然避免同一个 listener 被重复加入
  //
  // 但这里为什么还是先讲数组？
  // 因为数组和 `Set` 在语义上其实并不完全一样：
  //
  // 1. 数组更像“有顺序的监听器列表”
  //    你可以很自然地讲：
  //    “第一个订阅的先通知，后订阅的后通知。”
  //
  // 2. `Set` 更像“监听器集合”
  //    它天然带去重语义。
  //    如果同一个函数被重复订阅两次，`Set` 只会保留一份，
  //    但数组理论上可以保留两份。
  //
  // 3. Redux 这道题真正要讲清楚的重点，
  //    不是“用数组还是用 Set 做微优化”，
  //    而是：
  //    - store 如何保存订阅者
  //    - 状态变化后如何通知订阅者
  //    - 为什么通知前要复制一份监听器列表
  //
  // “实际源码里用什么”：
  //
  // - Redux 官方实现的核心思路更接近“数组方案”
  //   它长期使用监听器列表，并且会维护“当前监听器列表 / 下一份监听器列表”这类结构，
  //   以保证 dispatch 过程中订阅和取消订阅不会干扰当前这次遍历。
  //   也就是说，Redux 的真实实现方向和这里“用数组保存 listeners”的思路是同一路线。
  //
  //   这里你可以进一步理解成：
  //   Redux 在“通知订阅者”这件事上，更强调一次 dispatch 的边界要稳定。
  //
  //   比如本轮 dispatch 已经开始通知监听器了，
  //   这时候某个 listener 里如果又发生了：
  //   - 取消订阅别的 listener
  //   - 新增订阅新的 listener
  //
  //   Redux 希望做到的是：
  //   “这些变化不要影响当前这一轮已经开始的通知过程，
  //   而是影响下一轮 dispatch。”
  //
  //   所以更准确地说，Redux 不是在解决“多线程竞争”问题，
  //   因为 JavaScript 这里本来就是单线程；
  //   它解决的是：
  //   “同一轮遍历过程中，订阅列表边遍历边变化，导致通知语义不稳定”的问题。
  //
  //   这可以理解成 Redux 给 dispatch 提供了更强的一致性保证：
  //   当前这一轮要通知谁，尽量在开始时就确定下来。
  //
  // - Zustand 官方实现则更接近“Set 方案”
  //   它的监听器保存方式更偏订阅者集合，
  //   常见思路就是：
  //   `const listeners = new Set()`
  //   然后：
  //   `listeners.add(listener)`
  //   `listeners.delete(listener)`
  //   `listeners.forEach(listener => listener(state, prevState))`
  //
  //   那是不是就能说：
  //   “Zustand 这样写，listener 执行和删除之间就一定会有竞争问题；
  //   Redux 则完全避免了这个问题”？
  //
  //   也不能这么绝对地下结论。
  //
  //   更准确的表达应该是：
  //
  //   - Zustand 往往没有像 Redux 那样，为每一轮通知专门维护一份更强语义的监听器快照
  //   - 它更多是直接基于当前 `Set` 做广播
  //   - 所以它的实现更轻量，但“当前遍历过程中如何处理新增 / 删除监听器”这件事，
  //     更多依赖 JavaScript 运行时对 `Set.forEach` 的既有遍历语义
  //
  //   这不等于 Zustand 一定有 bug，
  //   而是代表它在这里的设计取舍和 Redux 不同：
  //
  //   - Redux：更强调“本轮 dispatch 的通知名单稳定、语义清晰、可预测”
  //   - Zustand：更强调“实现简单、成本低、对大多数实际场景足够好”
  //
  // 这也和它们的设计气质是匹配的：
  // - Redux 更强调流程、约束和可预测性
  // - Zustand 更强调轻量、直接和简单订阅
  let currentListeners = [];

  // `isDispatching`：
  // 一个保护开关，用来标记“当前是不是正在执行 reducer”。
  //
  // 为什么需要它？
  // 因为 reducer 应该是纯函数，只负责计算，不应该在内部再次触发 dispatch。
  // 如果 reducer 里又 dispatch，就会出现递归更新、流程混乱、状态不可预测的问题。
  let isDispatching = false;

  /**
   * 读取当前状态。
   *
   * 这个函数本身很简单，只是返回 `currentState`。
   * 但它背后的思想很重要：
   *
   * - store 是状态的单一来源
   * - 外界不要自己猜状态，要统一从 store 读取
   * - 这也是 Redux 所谓“单一状态树”的体现
   */
  function getState() {
    return currentState;
  }

  /**
   * 常见订阅者包括：
   * - React 视图层
   * - 调试工具
   * - 日志系统
   * - 其他需要在状态变化后做响应的逻辑
   *
   * @param {Function} listener
   * 当状态变化后要执行的回调函数。
   *
   * @returns {Function}
   * 返回取消订阅函数。
   * 这是很经典的 API 设计：
   *
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    currentListeners.push(listener);

    // `subscribed` 用来保证取消订阅函数是幂等的。
    // 也就是说，多次调用 `unsubscribe()` 不会报错，也不会重复删除。
    let subscribed = true;

    return function unsubscribe() {
      if (!subscribed) {
        return;
      }

      subscribed = false;

      // 为什么这里要重新赋值过滤后的新数组，而不是直接 splice？
      // 这里更强调“得到一个新的 listeners 列表”这个语义，
      currentListeners = currentListeners.filter((item) => item !== listener);
    };
  }

  /**
   * `dispatch` 是 Redux 的入口函数。
   *
   * 所有状态更新，理论上都应该从这里进入。
   *
   * 为什么 Redux 要强制所有更新都走 dispatch？
   * 因为这样更新路径才是统一、可预测、可追踪的。
   *
   * 如果任何地方都能随便改 state：
   * - 你很难知道状态是在哪里被改掉的
   * - 调试会非常痛苦
   * - 中间件、日志、时间旅行调试都很难实现
   *
   * @param {Object} action
   * action 是一个“描述发生了什么”的对象。
   * 注意，它不是“怎么改状态”的代码。
   *
   * 例如：
   * `{ type: 'increment' }`
   * `{ type: 'todo/add', payload: 'learn redux' }`
   *
   * Redux 里通常要求 action 至少有一个 `type` 字段，
   * 因为 reducer 要靠它判断“这次发生的到底是什么动作”。
   *
   * @returns {Object}
   * 返回原始 action。
   * 这本身不是最关键的设计，但很多中间件会依赖这个返回值链路。
   */
  function dispatch(action) {
    // 这里为什么要求 action 是普通对象？
    // 因为最基础的 Redux 只认识 plain object action。
    //
    // 如果你传函数，例如 thunk：
    // `dispatch((dispatch) => { ... })`
    // 那已经不是原生 createStore 的能力了，
    // 而是中间件（如 redux-thunk）在扩展 dispatch。
    if (typeof action !== 'object' || action === null) {
      throw new TypeError('action must be a plain object');
    }

    // 为什么要求必须有 type？
    // 因为 reducer 通常通过 action.type 做 switch / if 判断，
    // 没有 type，就无法知道这次更新到底是什么。
    if (typeof action.type === 'undefined') {
      throw new TypeError('action.type is required');
    }

    // reducer 计算状态时，不允许再次 dispatch。
    // 否则你会得到“更新过程中又发起更新”的混乱嵌套流程。
    if (isDispatching) {
      throw new Error('reducers may not dispatch actions');
    }

    try {
      isDispatching = true;

      // 这一行是整个 Redux 的核心。
      //
      // 它表达的是：
      // “把旧状态和 action 交给 reducer，让 reducer 返回新状态。”
      //
      // store 本身不懂业务，也不懂 count 为什么要加 1。
      // 真正决定状态如何变化的是 reducer。
      currentState = currentReducer(currentState, action);
    } finally {
      // 不管 reducer 成功还是抛错，最后都必须把 dispatching 状态恢复回来。
      isDispatching = false;
    }

    // 为什么这里要先 `slice()` 复制一份监听器数组？
    // 因为执行 listener 时，可能会发生新的订阅 / 取消订阅。
    // 如果你一边遍历原数组，一边改原数组，就容易出现遍历混乱。
    const listeners = currentListeners.slice();
    listeners.forEach((listener) => listener());

    // 为什么这里还要把 action 再 return 回去？
    // “状态不是已经更新完了吗？为什么不直接结束，还要返回 action？”
    //
    // 最直接的理解方式是：
    // `dispatch` 不只是“触发更新”，它也是一条函数调用链上的一个节点。
    // 既然它是函数，那么它就可以有返回值。
    //
    // 这里选择返回原始 action，主要有几个好处：
    //
    // 1. 让调用方知道这次 dispatch 处理的就是哪个 action
    //    例如：
    //    `const result = store.dispatch({ type: 'increment' })`
    //    此时 `result` 就是这次传进去的 action 本身。
    //
    // 2. 方便上层链路继续做包装
    //    很多中间件或增强器会包裹 dispatch。
    //    如果底层 dispatch 完全没有返回值，
    //    上层就不容易把“这次调用的结果”继续往外透传。
    //
    // 3. 让 API 行为更完整
    //    也就是：
    //    “你传给我什么 action，我处理完以后就把它再返回给你。”
    //    这样调用方在链式封装或调试时会更自然。
    //
    // 需要注意：
    // Redux 最核心的价值不是“dispatch 的返回值是什么”，
    // 而是“dispatch 触发了 reducer 计算并更新了 state”。
    // return action 更像是一个顺手保留的、对生态友好的设计。
    //
    // 再补一句：
    // 原生 Redux createStore 通常就是返回 action，
    // 但如果接了中间件，例如 thunk，
    // 那最终 dispatch 的返回值就可能不再是 action，
    // 而可能变成 Promise、函数执行结果等别的内容。
    //
    // 所以这里 return action，
    // 一方面是保持最基础 Redux 的语义，
    // 另一方面也给后续增强 dispatch 留出了扩展空间。
    return action;
  }

  /**
   * 替换 reducer。
   *
   * 这个能力在日常业务代码里不一定常用，
   * 但它在以下场景很重要：
   *
   * - 热更新 reducer
   * - 动态注入 reducer
   * - 大型应用按模块拆 reducer
   *
   * 替换完成后，要立刻再 dispatch 一次，
   * 让新的 reducer 根据当前结构重新计算一遍 state。
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new TypeError('nextReducer must be a function');
    }

    currentReducer = nextReducer;

    // 这里派发一个内部 action，不是为了业务，
    // 而是为了让新的 reducer 立即跑一遍，完成状态重建。
    //这种“`@@redux/...`”的写法就是 Redux 内部常见的 action type 风格。
    // 它的目的不是给业务使用，而是明确告诉你：
    // “这是 Redux 自己内部使用的 action，不是业务层自己定义的 action。”
    //
    // 可以把这个字符串拆开理解：
    //
    // 1. `redux`
    //    表示这个 action 来自 Redux 内部。
    //
    // 2. `REPLACE`
    //    表示当前这个内部 action 的用途是“替换 reducer 后重新初始化状态结构”。
    //
    // 3. 最前面的 `@@`
    //    它不是 JavaScript 语法要求，也没有什么魔法含义，
    //    更多是一种“故意写得很不像普通业务 type”的命名约定。
    // Redux 真正需要的只是：
    // “派发一个不会和业务逻辑混淆的内部 action，
    //  从而让新的 reducer 至少执行一遍。”
    //
    // 为什么 replaceReducer 之后一定要 dispatch 这个内部 action？
    // 因为 reducer 已经换了，如果不立刻跑一次，
    // store 里的 state 还是旧 reducer 计算出来的结果。
    //
    // 派发这个内部 action 后：
    // - 新 reducer 会收到当前 state
    // - 新 reducer 会根据自己的逻辑返回一个新的 state 结构
    // - store 就完成了“切换 reducer 后的状态重建”
    //
    // 所以你可以把这句代码理解成：
    // “通知新的 reducer：现在轮到你接管 state 了，请先跑一遍。”
    dispatch({ type: '@@redux/REPLACE' });
  }

  // 为什么 createStore 一创建完成，就要主动 dispatch 一次？
  //
  // 因为 reducer 往往会写默认参数：
  // `function reducer(state = initialState, action) { ... }`
  //
  // 如果不主动 dispatch，
  // 那么 currentState 可能一直是 undefined，
  // store 在一开始就拿不到真正的初始状态。
  //
  // 所以 Redux 会在内部派发一个初始化 action，
  // 逼着 reducer 至少先执行一遍，把初始 state 算出来。
  dispatch({ type: '@@redux/INIT' });

  // 最后返回 store 对象。
  // 至此，一个最小可用的 Redux store 就创建完成了。
  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer,
  };
}

/**
 * 下面给一个最简单的 reducer 示例。
 *
 * 为什么它叫 reducer？
 * 这个名字来自 reduce / 折叠的思想：
 * “把一连串 action 和旧状态，不断折叠成新的状态”。
 *
 * 注意 reducer 最重要的两个约束：
 *
 * 1. 它应该是纯函数
 * 2. 它不应该直接修改旧 state，而应该返回新对象
 *
 * 所以这里用：
 * `{ ...state, count: state.count + 1 }`
 * 而不是：
 * `state.count += 1; return state`
 *
 * 这样做的原因是：
 * - 不可变更新更容易推理
 * - 更容易做变更检测
 * - 更符合 Redux 的设计哲学
 */
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    default:
      // 如果 action 不认识，就直接返回旧状态。
      // 这也是 reducer 的标准写法。
      return state;
  }
}

// 创建 store。此时内部会自动 dispatch 一次 `@@redux/INIT`，
// 所以 store 一创建出来就已经有初始 state 了。
const store = createStore(counterReducer);

// 注册订阅者。
// 只要以后状态变化，这个回调就会执行一次。
store.subscribe(() => {
  console.log('state changed:', store.getState());
});

// 派发一个 action。
// store 收到它后，会调用 reducer 计算新状态，
// 然后通知刚才的订阅者。
store.dispatch({ type: 'increment' });

// 复现
function createStore(reducer, preloadedState) {
  let currentState = preloadedState;
  let currentListeners = [];
  let isDispatching = false

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    if(typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }
    currentListeners.push(listener);
    let subscribed = true
    function unsubscribe() {
      if(!subscribed) {
        return;
      }
      subscribed = false;
      currentListeners = currentListeners.filter((item) => item !== listener);
    };
    return unsubscribe;
  }

  function dispatch(action) {
    if(typeof action !== 'object' || action === null) {
      throw new TypeError('action must be a plain object');
    }

    if(typeof action.type === 'undefined') {
      throw new TypeError('action.type is required');
    }

    if(isDispatching) {
      throw new Error('reducers may not dispatch actions');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = currentListeners.slice();
    listeners.forEach((listener) => listener());
    return action;
  }

  function replaceReducer(nextReducer) {
    if(typeof nextReducer !== 'function') {
      throw new TypeError('nextReducer must be a function');
    }
    currentReducer = nextReducer;
    dispatch({ type: '@@redux/REPLACE' });
  }
  
  dispatch({ type: '@@redux/INIT' });

  return {
    getState,
    dispatch,
    subscribe,
    replaceReducer,
  };
}

function counterReducer(state, action) {
  switch(action.type) {
    case 'plus':
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}

const myStore = createStore(counterReducer);

myStore.subscribe(() => {
  console.log('state changed:', myStore.getState());
});

myStore.dispatch({ type: 'plus', payload: 1 });
myStore.dispatch({ type: 'plus', payload: 2 });
myStore.dispatch({ type: 'plus', payload: 3 });