# 手写题专题

## 使用方式

手写题的目标不是“背过实现”，而是做到下面四件事都过关：

- 能独立写出可运行版本
- 能解释时间复杂度和空间复杂度
- 能主动补边界条件和常见 bug
- 能一边写一边讲思路，而不是闷头敲代码

建议你练每道题时固定按这个顺序：

1. 先确认需求边界
2. 再说题目本质
3. 再讲核心数据结构或关键 API
4. 先写最小可用版本
5. 最后补复杂度、边界和扩展能力

很多候选人手写题卡住，不是因为不会写，而是因为一开始没有先把题目范围问清楚，导致越写越偏。

## 代码目录说明

手写题正文只保留题目、题型方法、边界与追问，代码实现统一拆到 `./code` 目录。

- 总入口：[`code/README.md`](./code/README.md)
- JavaScript 工具函数：[`code/handwritten/js-utils`](./code/handwritten/js-utils)
- 对象与函数机制：[`code/handwritten/object-function`](./code/handwritten/object-function)
- Promise 与异步控制：[`code/handwritten/promise-async`](./code/handwritten/promise-async)
- 数据结构：[`code/handwritten/data-structures`](./code/handwritten/data-structures)
- DOM 与浏览器：[`code/handwritten/dom-browser`](./code/handwritten/dom-browser)
- React Hooks：[`code/handwritten/react-hooks`](./code/handwritten/react-hooks)

### 已拆分的高频题

- JavaScript 工具函数：`debounce-basic.js`、`debounce-immediate.js`、`debounce-with-cancel.js`、`throttle-basic.js`、`throttle-leading-trailing.js`、`array-flatten.js`、`array-unique.js`、`array-map.js`、`array-filter.js`、`array-reduce.js`、`compose.js`、`curry.js`、`group-by.js`、`publish-subscribe.js`、`set-interval-with-timeout.js`、`once.js`、`memoize.js`、`template-render.js`、`query-parse-stringify.js`、`version-compare.js`、`big-number-add.js`、`thousand-separator.js`、`red-packet.js`
- 对象与函数机制：`my-call.js`、`my-apply.js`、`my-bind.js`、`my-new.js`、`my-instanceof.js`、`deep-clone.js`、`object-flatten.js`、`object-get.js`、`object-create.js`、`object-assign.js`、`json-stringify.js`、`basic-proxy.js`、`object-diff.js`、`decorator-basic.js`、`ts-pick.ts`、`ts-extendable.ts`、`vue2-define-reactive.js`、`vue3-reactive-effect.js`、`vue-ref.js`、`vue-to-refs.js`、`vue-custom-ref.js`、`vue-next-tick.js`、`vue-v-model.js`、`vue-computed.js`、`vue-watch.js`、`vue-watch-effect.js`、`vue-effect-scope.js`、`vue-set-delete.js`、`vue-patch.js`、`vuex-create-store.js`、`vue-router-core.js`、`vue-keep-alive.js`、`vue-provide-inject.js`、`vue-define-async-component.js`、`vue-directive-core.js`、`pinia-like-store.js`
- Promise 与异步控制：`simple-promise.js`、`promise-resolve.js`、`promise-reject.js`、`promise-catch.js`、`promise-all.js`、`promise-all-settled.js`、`promise-race.js`、`concurrency-limiter.js`、`concurrency-retry-limiter.js`、`request-pool.js`、`retry-request.js`、`cancellable-request.js`、`promise-finally.js`、`promise-any.js`、`promise-queue.js`、`with-timeout.js`、`exponential-backoff-retry.js`、`serial-task-runner.js`、`parallel-task-runner.js`、`priority-scheduler.js`、`scheduler-limit.js`、`polling.js`、`promisify.js`、`pausable-task-queue.js`、`batch-report-queue.js`、`lazy-man.js`
- 数据结构：`lru-cache.js`、`event-bus.js`、`queue.js`、`stack.js`、`priority-queue.js`、`tree-dfs.js`、`tree-bfs.js`、`array-to-tree.js`、`tree-to-flat-list.js`、`max-subarray.js`、`merge-sorted-arrays.js`、`min-cost-tickets.js`、`common-elements-from-streams.js`
- DOM 与浏览器：`get-elements-by-class-name.js`、`event-delegation.js`、`image-lazy-load.js`、`css-triangle.css`、`drag-sort-minimal.js`、`large-file-upload-core.js`、`vnode-to-dom.js`、`virtual-dom-diff.js`、`dom-patch.js`、`xhr-core.js`、`fetch-request.ts`、`jsonp.js`、`hash-router-core.js`、`history-router-core.js`、`infinite-scroll.js`、`intersection-observer-core.js`、`mutation-observer-core.js`、`resize-observer-core.js`、`raf-scheduler.js`、`time-slicing-render.js`、`performance-metrics-reporter.js`、`babel-plugin-auto-track.js`、`mini-webpack-bundler.js`、`tapable-sync-hook.js`、`tapable-async-parallel-hook.js`、`tapable-async-series-hook.js`、`loader-runner.js`、`plugin-runner.js`、`vite-plugin-container.js`、`dependency-graph.js`、`chunk-graph.js`、`hmr-runtime.js`、`source-map-core.js`、`local-storage-ttl.js`、`webpack-loader-core.js`、`webpack-plugin-core.js`、`compose-middleware.js`、`reconnectable-websocket.js`
- React Hooks / 组件：`use-debounce.tsx`、`use-throttle.tsx`、`use-counter.tsx`、`use-previous.tsx`、`use-latest.tsx`、`use-interval.tsx`、`use-effect.tsx`、`use-layout-effect.tsx`、`use-memo.tsx`、`use-callback.tsx`、`use-ref.tsx`、`use-context.tsx`、`use-event.tsx`、`use-request.tsx`、`use-reducer.tsx`、`use-imperative-handle.tsx`、`use-state.tsx`、`use-sync-external-store.tsx`、`simple-global-store.tsx`、`redux-create-store.js`、`redux-combine-reducers.js`、`redux-apply-middleware.js`、`redux-thunk.js`、`redux-bind-action-creators.js`、`react-redux-hooks.tsx`、`zustand-create-store.tsx`、`react-forward-ref.tsx`、`react-memo.tsx`、`react-fiber-work-loop.js`、`react-hooks-linked-list.js`、`react-scheduler-priority.js`、`react-batched-updates.js`、`react-render-commit.js`、`react-class-set-state.js`、`react-suspense-resource.js`、`react-error-boundary.js`、`react-portal.js`、`controlled-input.tsx`、`select-controlled-uncontrolled.tsx`、`condition-tree-render.tsx`、`simple-virtual-list.tsx`、`dynamic-virtual-list.tsx`

---

## 一、面试官到底在看什么

手写题表面上是考代码，实际上同时在看：

- 你能不能把题目抽象成熟悉的模型
- 你是否知道先写最小版本，再补扩展
- 你会不会主动讲复杂度和边界
- 你写完后有没有自测意识
- 你在被追问时能不能继续升级实现

所以高分答案通常不是“最炫的代码”，而是“结构稳定、表达完整、扩展自然”的代码。

## 二、统一讲题模板

任何一道手写题，我都建议按下面 6 句模板展开：

1. 这题本质上是在考什么
2. 我先确认一下要支持哪些能力
3. 最小实现我会选什么数据结构 / API
4. 先写基础版本，保证主流程可跑
5. 复杂度是怎样的，瓶颈在哪里
6. 如果继续追问，我会补哪些边界或增强能力

例如面试官让你写防抖，别直接开写，应该先问：

- 是否要支持立即执行
- 是否要支持 `cancel` / `flush`
- 是否要保留 `this` 和参数
- 返回值有没有要求

这一步本身就能拉开差距。

## 三、最高频手写题

这几类题是前端面试里最值得优先练熟的：

1. 防抖
2. 节流
3. `Promise.all`
4. `Promise.allSettled`
5. 深拷贝
6. 数组扁平化
7. `call`、`apply`、`bind`
8. `new`
9. LRU 缓存
10. 自定义 Hook

对这 10 类题，要求不是“看过”，而是：

- 10 到 15 分钟内能独立写出基础版
- 能主动说出复杂度
- 能主动补至少 3 个边界点
- 能回答一个升级追问

---

## 四、JavaScript 工具函数手写

1. 手写基础版防抖
2. 手写支持立即执行的防抖
3. 手写支持 `cancel` 的防抖
4. 手写基础版节流
5. 手写带首尾触发控制的节流
6. 防抖和节流在实现上最核心的区别是什么？
7. 手写数组扁平化
8. 手写数组去重
9. 手写 `compose`
10. 手写 `curry`
11. 手写 `groupBy`
12. 手写发布订阅

### 这一类题的题目本质

- 防抖 / 节流：本质是时间控制和调用时机控制
- 扁平化 / 去重：本质是遍历策略和数据去重策略
- `compose` / `curry`：本质是函数组合和参数累积
- 发布订阅：本质是事件管理和回调列表维护

### 复杂度要怎么讲

- 防抖 / 节流：单次调用通常是 `O(1)`，重点不是复杂度，而是时序正确性
- 数组扁平化：通常是 `O(n)`，`n` 是所有元素总数
- 去重：如果用 `Set`，通常是 `O(n)`；如果排序后去重，则要说明排序成本
- 发布订阅：发布一次的复杂度通常和当前订阅者数量相关

### 这一类题的常见易错点

- 忘了保留 `this` 和参数
- 忘了清定时器
- 立即执行和尾触发逻辑混乱
- `compose` 执行顺序写反
- `curry` 没处理参数凑齐条件
- 发布订阅取消订阅时没处理引用一致性

### 推荐讲解顺序

1. 先问清能力范围
2. 再说核心状态需要存什么
3. 写基础流程
4. 补 `cancel`、`flush`、立即执行等增强能力
5. 最后补复杂度和测试用例

---

## 五、对象与函数机制手写

13. 手写 `call`
14. 手写 `apply`
15. 手写 `bind`
16. 手写 `new`
17. 手写 `instanceof`
18. 手写深拷贝
19. 深拷贝要处理哪些边界情况？
20. 如何手写一个支持循环引用的深拷贝？
21. 手写对象扁平化
22. 手写对象路径访问函数，例如 `get(obj, 'a.b.c')`

### 这一类题的题目本质

- `call` / `apply` / `bind`：本质是函数调用时 `this` 绑定和参数传递
- `new`：本质是对象创建、原型连接和构造函数返回值规则
- `instanceof`：本质是沿原型链查找
- 深拷贝：本质是递归遍历、类型分发和引用关系处理
- 路径访问 / 对象扁平化：本质是对象遍历和路径编码

### 复杂度要怎么讲

- `call` / `apply` / `bind` / `new` / `instanceof`：复杂度通常不是重点，重点是语义模拟是否正确
- 深拷贝：通常是 `O(n)`，`n` 是对象图里被遍历的节点数；空间复杂度也常是 `O(n)`
- 对象扁平化 / 路径访问：一般和遍历节点数量或路径长度相关

### 这一类题的常见易错点

- `call` / `apply` 忘了处理原始值 `this`
- `bind` 忘了处理构造调用场景
- `new` 忘了处理构造函数显式返回对象
- `instanceof` 忘了判空或非对象情况
- 深拷贝没处理循环引用、`Date`、`RegExp`、`Map`、`Set`
- 深拷贝把函数和原型链处理讲错

### 推荐讲解顺序

1. 先把原生行为规则说清楚
2. 明确最小要支持哪些类型
3. 先写基础版
4. 再补边界类型和高级行为
5. 最后讲哪些能力是刻意没有支持的

---

## 六、Promise 与异步控制手写

23. 手写简化版 Promise
24. Promise A+ 里最关键的行为约束有哪些？
25. 手写 `Promise.resolve`
26. 手写 `Promise.all`
27. 手写 `Promise.allSettled`
28. 手写 `Promise.race`
29. 手写并发控制器
30. 手写带最大并发数限制的请求池
31. 手写支持重试的异步请求函数
32. 手写可取消请求的控制逻辑

### 这一类题的题目本质

- Promise 基础实现：本质是状态机和回调调度
- `Promise.all` / `allSettled` / `race`：本质是多个异步任务的结果聚合规则
- 并发控制器 / 请求池：本质是任务调度和队列管理
- 重试 / 取消：本质是失败策略和控制流管理

### 复杂度要怎么讲

- `Promise.all` / `allSettled`：时间复杂度通常和任务数 `n` 相关，额外空间也和结果数组大小相关
- 并发控制器：调度逻辑通常是 `O(n)`，面试重点在正确控制并发上限
- 重试：要讲最坏情况下会多出多少次请求成本

### 这一类题的常见易错点

- 忘了 Promise 入参里可能有普通值
- `Promise.all` 结果顺序保留错误
- `allSettled` 和 `all` 的失败语义混淆
- 并发池没在任务完成后正确补位
- 重试没有停止条件
- 取消逻辑只改 UI 状态，没有真正中断请求链路

### 推荐讲解顺序

1. 先讲这道题的完成条件
2. 再定义要维护的状态
3. 写主流程
4. 补错误分支和边界
5. 最后讲顺序、复杂度和扩展能力

---

## 七、数据结构类手写

33. 手写 LRU 缓存
34. 为什么 LRU 通常用哈希表 + 双向链表实现？
35. 手写简单事件总线
36. 手写队列
37. 手写栈
38. 手写优先队列的最小思路是什么？
39. 手写树结构的深度优先遍历
40. 手写树结构的广度优先遍历

### 这一类题的题目本质

- LRU：本质是“最近访问”顺序维护 + `O(1)` 查询更新
- 事件总线：本质是事件名到回调集合的映射
- 栈 / 队列：本质是访问顺序约束
- 优先队列：本质是按优先级取元素，常见追问是堆
- 树遍历：本质是 DFS / BFS 两种搜索顺序

### 复杂度要怎么讲

- LRU：目标是 `get` / `put` 都做到 `O(1)`
- 事件总线：发布复杂度和订阅函数数量有关
- 栈 / 队列：入队出队通常追求 `O(1)`
- BFS / DFS：时间复杂度通常是 `O(n)`，空间复杂度取决于递归栈或队列宽度

### 这一类题的常见易错点

- LRU 只会用数组，导致复杂度退化
- 删除头尾节点时没处理空链表和单节点情况
- 事件总线取消订阅时没有精准删除
- BFS 忘了初始化队列
- DFS 递归出口不清楚

### 推荐讲解顺序

1. 先明确目标复杂度
2. 再选数据结构
3. 写最小操作接口
4. 补边界节点处理
5. 最后说明为什么这个结构优于朴素写法

---

## 八、DOM 与浏览器类手写

41. 手写 `getElementsByClassName`
42. 手写事件委托
43. 手写图片懒加载的核心逻辑
44. 手写简单虚拟列表
45. 手写拖拽排序的最小实现思路
46. 如何手写一个大文件切片上传的前端核心流程？

### 这一类题的题目本质

- DOM 查找：本质是树遍历和条件匹配
- 事件委托：本质是事件冒泡和统一监听
- 懒加载：本质是可视区域判断和延迟加载
- 虚拟列表：本质是只渲染可视区附近的数据
- 拖拽排序：本质是位置信息计算和数据重排
- 大文件上传：本质是任务拆分、并发控制和断点续传

### 复杂度要怎么讲

- DOM 遍历通常是 `O(n)`
- 虚拟列表重点不是单次复杂度，而是把 DOM 数量控制在稳定范围
- 大文件上传要说明计算哈希、分片调度、失败重试的额外成本

### 这一类题的常见易错点

- 事件委托没判断目标节点是否合法
- 懒加载忘了取消观察或解绑监听
- 虚拟列表只会讲“少渲染”，讲不清定位和占位思路
- 拖拽排序只改 DOM，不改数据源
- 大文件上传只会切片，不会讲并发、续传、合并确认

### 推荐讲解顺序

1. 先讲浏览器原理支撑点
2. 再讲最小实现路径
3. 明确需要维护哪些状态
4. 补资源释放和异常情况
5. 最后讲工程化增强点

---

## 九、React 类手写

47. 手写一个 `useDebounce` Hook
48. 手写一个 `useThrottle` Hook
49. 手写一个每秒 `count + 1` 的 Hook
50. 手写 `usePrevious`
51. 手写 `useLatest`
52. 手写 `useInterval`
53. 手写一个简化版全局状态管理
54. 手写一个受控输入组件的双向绑定逻辑
55. 手写动态高度虚拟列表的核心思路

### 这一类题的题目本质

- Hook 题：本质是闭包、依赖、引用稳定性和副作用清理
- 简化全局状态：本质是订阅机制和状态广播
- 受控组件：本质是数据单向流动和事件回写
- 动态高度虚拟列表：本质是测量、缓存和滚动定位

### 复杂度要怎么讲

- Hook 题复杂度通常不是重点，重点是生命周期和闭包正确性
- 全局状态管理要讲订阅通知成本
- 动态高度虚拟列表要讲测量成本和定位成本

### 这一类题的常见易错点

- Hook 依赖项写错导致闭包拿旧值
- 忘了清理定时器、监听器、订阅
- `usePrevious` 误以为同步更新即可
- 简化全局状态没有处理重复订阅和卸载清理
- 动态高度虚拟列表只会讲静态高度版思路

### 推荐讲解顺序

1. 先讲 Hook 想解决什么问题
2. 再说明为什么要用 `ref` / `effect` / 状态
3. 写基础逻辑
4. 补清理和依赖处理
5. 最后讲真实项目里会怎么继续增强

---

## 十、算法类手写

56. 手写爬楼梯
57. 手写最长无重复子串
58. 手写树的最大深度
59. 手写二叉树层序遍历
60. 手写两数之和
61. 手写反转链表
62. 手写合并两个有序数组或链表

### 这一类题的题目本质

- 爬楼梯：动态规划入门
- 最长无重复子串：滑动窗口入门
- 树最大深度 / 层序遍历：递归与 BFS 入门
- 两数之和：哈希表换时间入门
- 反转链表 / 合并有序链表：链表指针操作入门

### 复杂度要怎么讲

- 这类题几乎都要第一时间给出时间复杂度和空间复杂度
- 如果你有朴素解和优化解，要主动说明为什么要优化
- 如果是递归写法，要把递归栈空间也说出来

### 这一类题的常见易错点

- 只记住模板，不知道为什么能这样写
- 指针题没有先画图
- 滑动窗口只会扩，不会缩
- BFS 没说清为什么用队列
- DP 只会背方程，不会解释状态定义

### 推荐讲解顺序

1. 先判题型
2. 再给核心思路
3. 写代码时同步口述关键变量含义
4. 写完马上说复杂度
5. 最后补边界和替代写法

---

## 十一、每类题的必讲边界

### 防抖 / 节流

你必须能主动讲：

- `this` 和参数透传
- 定时器清理
- 首次触发与末次触发
- `cancel` / `flush`
- 组件卸载时的清理

### Promise 类

你必须能主动讲：

- 入参是否可能包含普通值
- 错误处理怎么做
- 结果顺序是否保留
- 全部完成和提前失败的差异
- 并发池是否支持动态补位

### 深拷贝类

你必须能主动讲：

- 循环引用
- `Date`
- `RegExp`
- `Map`
- `Set`
- 函数和原型链怎么处理

### LRU 类

你必须能主动讲：

- 为什么不能只用数组
- 为什么要求 `O(1)` 查询和更新
- 淘汰策略怎么实现
- 头尾节点边界怎么处理

### Hook 类

你必须能主动讲：

- 闭包问题
- 定时器清理
- 依赖项设计
- 组件卸载时的处理
- 如何避免不必要重渲染

## 十二、面试时的讲题顺序

1. 先确认需求，例如是否要支持立即执行、是否要返回取消函数
2. 再说核心思路，例如“这题本质是定时器控制”或“这题本质是哈希表 + 双向链表”
3. 再说复杂度目标，例如“我希望 `get` / `put` 都是 `O(1)`”
4. 再写最小实现
5. 最后主动补边界和扩展版本

如果时间允许，写完后再自己口头跑 2 到 3 个测试样例，这是非常加分的动作。

## 十三、你最应该优先练熟的 12 题

1. 防抖
2. 节流
3. 深拷贝
4. `Promise.all`
5. `Promise.allSettled`
6. `bind`
7. `new`
8. LRU
9. 数组扁平化
10. `useDebounce` Hook
11. 最长无重复子串
12. 树的最大深度

这 12 题覆盖了前端最常见的几个手写维度：

- 定时器控制
- 函数与对象机制
- 异步控制
- 数据结构
- Hook
- 基础算法

## 十四、如何判断自己真的会了

你至少要满足：

- 不看答案能在 `10~20` 分钟内写出基础版本
- 能主动说出至少 `3` 个边界点
- 写完后能自己口头做一遍测试用例
- 面试官追问升级版时，不会完全卡住
- 能讲清“为什么这样写”，而不是只背模板

---

## 十五、根据近年大厂面经应补齐的手写方向

只练防抖、节流、`Promise.all`、深拷贝，已经不够覆盖近两年的大厂前端手写题了。

从近年公开面经来看，字节、腾讯、阿里、美团、京东、快手这类公司更常把手写题往下面 4 个方向继续追问：

1. 从“单个 API 手写”升级到“完整异步链路手写”
2. 从“工具函数”升级到“场景调度题”
3. 从“基础 JavaScript”升级到“框架原理最小实现”
4. 从“八股解释题”升级到“工程化最小可运行题”

也就是说，现在更常见的不是单独问你“会不会写防抖”，而是继续追问：

- 能不能补 `cancel`、`flush`、返回值、立即执行
- 能不能把多个异步任务做成请求池、重试器、超时控制器
- 能不能把 Hook、响应式、虚拟 DOM 讲到最小实现层
- 能不能写出一个简化版 loader / plugin / 埋点队列 / 缓存队列

如果你想把题库练到更接近大厂真实面试，下面这批题建议补齐。

## 十六、近年大厂高频补充题库

下面这些题，不一定每家公司都会问，但在公开面经里反复出现，明显属于“应该进入训练池”的题。

### 1. JavaScript 机制与工具函数增强

63. 手写 `Object.create`
64. 手写 `Object.assign`
65. 手写简化版 `JSON.stringify`
66. 手写 `setInterval`，底层只用 `setTimeout`
67. 手写 `once`
68. 手写 `memoize`
69. 手写模板字符串渲染，例如 `template('hi {{name}}')`
70. 手写 query 解析与序列化
71. 手写版本号比较
72. 手写大数相加
73. 手写千分位格式化
74. 手写数组转树
75. 手写树转扁平数组
76. 手写扁平数组转树形结构

### 2. Promise、调度与异步场景增强

77. 手写 `Promise.finally`
78. 手写 `Promise.any`
79. 手写带超时控制的异步包装器，例如 `withTimeout`
80. 手写指数退避重试
81. 手写串行任务执行器
82. 手写并行任务执行器
83. 手写 `LazyMan`
84. 手写优先级调度器
85. 手写支持暂停 / 恢复的任务队列
86. 手写带并发上限、失败重试、取消能力的请求池升级版
87. 手写带重连的 `WebSocket` 封装
88. 手写批量上报埋点队列

### 3. DOM、浏览器与工程化最小实现

89. 手写虚拟 DOM 转真实 DOM
90. 手写最小版 diff 思路
91. 手写简化版事件总线，支持 `on` / `off` / `emit` / `once`
92. 手写图片预加载器或资源加载器
93. 手写本地缓存封装，支持过期时间
94. 手写前端分页缓存或内存缓存策略
95. 手写大文件上传增强版，支持切片、重试、续传、并发控制
96. 手写简化版 `Webpack loader`
97. 手写简化版 `Webpack plugin`
98. 手写 `compose(middleware)` 风格中间件调度器

### 4. React / Vue / 框架原理高频手写

99. 手写 `useMemo`
100. 手写 `useCallback`
101. 手写 `useRef`
102. 手写 `useRequest`
103. 手写稳定回调 Hook，例如 `useEvent`
104. 手写简化版 `useState` / Hook 调度原理
105. 手写简化版全局状态管理，支持订阅与选择器
106. 手写 Vue2 `defineProperty` 响应式
107. 手写 Vue3 `reactive` / `effect` 最小版
108. 手写 `nextTick`
109. 手写 `v-model`
110. 手写简化版发布订阅驱动的响应式更新

### 5. 算法与业务数据处理补充

111. 手写快速排序
112. 手写二分查找
113. 手写二叉树前序 / 中序 / 后序非递归遍历
114. 手写层序遍历
115. 手写合并区间
116. 手写 Top K
117. 手写最近公共祖先
118. 手写岛屿数量或图搜索
119. 手写括号有效性判断
120. 手写滑动窗口最大值

### 这一批题为什么值得补

- 它们比“纯 API 模拟题”更接近真实业务和源码思路
- 它们更容易被面试官拿来做追问和升级
- 它们能明显区分“看过题”和“真正能写、能讲、能扩展”的候选人

## 十七、不同大厂更常偏好的手写方向

下面不是绝对规则，但从公开面经看，确实有比较明显的出题倾向：

### 字节跳动常见方向

- 并发控制、请求池、调度器、`LazyMan`
- Hook 手写、闭包与依赖问题
- 虚拟列表、海量数据渲染
- `Webpack loader` / `plugin`、中间件调度器
- Vue 响应式、虚拟 DOM、diff 最小思路

### 腾讯常见方向

- `Promise.all`、`race`、`finally`、并发池
- LRU、事件总线、树遍历、数组转树
- 深拷贝、`bind`、`new`、原型链相关实现
- 虚拟 DOM 转真实 DOM
- 大数相加、版本号比较、字符串处理

### 阿里常见方向

- `call` / `apply` / `bind` / `new` / `instanceof`
- 深拷贝及类型边界处理
- 函数组合、柯里化、模板渲染
- diff、响应式、工程化底层原理
- 缓存、性能优化、数据结构题

### 美团常见方向

- 虚拟列表、长列表性能优化
- 请求池、重试、取消、超时控制
- 大文件上传、断点续传
- 事件循环、任务调度、监控上报
- Hook 场景题和工程化实战题

### 京东、快手、小红书等常见方向

- 防抖 / 节流升级版
- `Promise` 组合题与异步顺序题
- `LazyMan`、版本比较、query 解析
- 数组转树、树转数组、扁平化
- `WebSocket` 封装、埋点队列、缓存封装

## 十八、如果要把题库补得更全面，优先补这 20 题

如果时间有限，我建议把下面 20 题作为“大厂补强清单”优先拿下：

1. `Promise.finally`
2. `Promise.any`
3. 带超时控制的异步包装器
4. 指数退避重试
5. 串行任务执行器
6. 优先级调度器
7. `LazyMan`
8. `Object.create`
9. `Object.assign`
10. 简化版 `JSON.stringify`
11. 数组转树
12. 树转扁平数组
13. 版本号比较
14. 大数相加
15. 虚拟 DOM 转真实 DOM
16. 简化版 `Webpack loader`
17. `useMemo`
18. `useCallback`
19. Vue3 `reactive` / `effect`
20. 带重连的 `WebSocket` 封装

这 20 题补进去之后，你的手写题库会从“常规前端题库”提升到“更接近近年大厂实战面试覆盖面”的水平。
