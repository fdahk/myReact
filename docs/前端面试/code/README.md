# 前端面试代码目录

这个目录用于存放从文档中拆分出来的代码题与手写题实现。核心原则不是“把代码堆进来”，而是让每个文件都能成为一个可独立讲解的题目样本。

## 基本原则

- 一题一个文件
- 文件名统一使用小写 `kebab-case`
- 文档正文保留思路、边界、复杂度和追问点，不再塞大段代码
- 代码尽量写成可运行风格，并附最小示例
- `handwritten` 目录下的每个文件都应补充“面试讲解点”，至少覆盖题目本质、复杂度、易错点、追问方向和讲题顺序
- 同一道题如果有基础版和升级版，优先拆成独立文件，而不是把多个版本揉在一起

## 目录结构

- `handwritten/js-utils`: 常见 JavaScript 工具函数手写
- `handwritten/object-function`: `call`、`apply`、`bind`、`new`、深拷贝、对象访问等
- `handwritten/promise-async`: Promise、调度器、请求池、取消控制
- `handwritten/data-structures`: LRU、事件总线、树遍历、队列、栈、优先队列
- `handwritten/dom-browser`: DOM、事件、懒加载、上传、拖拽
- `handwritten/react-hooks`: 常见 Hook 手写
- `handwritten/react-components`: 全局状态、受控组件、虚拟列表组件
- `algorithms/array-string`: 数组、字符串、滑动窗口、双指针
- `algorithms/linked-list`: 链表题
- `algorithms/tree`: 树题
- `algorithms/stack-queue-hash`: 栈、队列、哈希表基础题
- `algorithms/backtracking`: 回溯题
- `algorithms/graph`: 图搜索与拓扑排序
- `algorithms/dp`: 动态规划题
- `algorithms/search`: 二分与搜索题
- `algorithms/greedy`: 贪心题
- `algorithms/heap`: 堆与 Top K 题

## 当前覆盖说明

这轮补到了两篇文档里大多数“明显应单独写代码”的题：

- 手写题：防抖各版本、节流各版本、发布订阅、`Promise` 基础实现、请求池、取消请求、树 DFS/BFS、`getElementsByClassName`、虚拟列表、拖拽排序、大文件切片上传、常见 Hook、简化全局状态与受控组件
- 算法题：接雨水、最小覆盖子串、最长回文子串、环入口、删除倒数第 `N` 个节点、滑动窗口最大值、最长连续序列、最近公共祖先、查找区间、组合总和、课程表、打家劫舍、LIS、跳跃游戏、堆与 Top K 等

最近又继续补了一批更接近大厂真实手写面试的题目，包括：

- 对象机制与响应式：`Object.create`、`Object.assign`、简化版 `JSON.stringify`、Vue2 `defineProperty` 响应式、Vue3 `reactive/effect`
- Promise 与调度：`Promise.finally`、`Promise.any`、超时包装器、指数退避重试、串行任务执行器、优先级调度器、`LazyMan`
- 数据处理与浏览器工程化：数组转树、树转扁平数组、版本号比较、大数相加、虚拟 DOM 转真实 DOM、最小版 `Webpack loader`、带重连的 `WebSocket` 封装
- React Hook：`useMemo`、`useCallback`

这次又继续把明显缺失但在大厂面经中非常高频的题补了进来，包括：

- 工具函数增强：`setInterval` 基于 `setTimeout` 实现、`once`、`memoize`、模板字符串渲染、query 解析与序列化、千分位格式化
- Promise / 调度场景：并行任务执行器、支持暂停 / 恢复的任务队列、批量上报埋点队列
- 浏览器与工程化：带过期时间的本地缓存、最小版 `Webpack plugin`、`compose(middleware)` 中间件调度
- React / Vue 原理：`useRef`、`useEvent`、`useRequest`、极简版 `useState` 运行模型、Vue `nextTick`、Vue `v-model`

重新审查后又发现 Redux 系列也是高频缺口，这次继续补上：

- Redux 核心：`redux-create-store.js`、`redux-combine-reducers.js`、`redux-apply-middleware.js`
- Redux 常见追问：`redux-thunk.js`、`redux-bind-action-creators.js`
- React 接入层：`react-redux-hooks.tsx`

继续做了一轮“大而全”补充后，又新增了这些典型高频题：

- 原生数组方法：`array-map.js`、`array-filter.js`、`array-reduce.js`
- Promise 补充：`promise-reject.js`、`promise-catch.js`
- 框架 / 工程化：`virtual-dom-diff.js`、`time-slicing-render.js`、`babel-plugin-auto-track.js`
- React Hook 原理：`use-effect.tsx`、`use-sync-external-store.tsx`
- 算法补充：`binary-search.js`、`merge-intervals.js`、`quick-sort.js`

这次按“算法不再补，继续补 DOM / 工程化 / React / Vue”这个方向，又新增了：

- DOM 与浏览器：`xhr-core.js`、`jsonp.js`、`hash-router-core.js`、`history-router-core.js`
- 工程化：`mini-webpack-bundler.js`、`tapable-sync-hook.js`
- React：`use-reducer.tsx`、`react-memo.tsx`、`react-fiber-work-loop.js`
- Vue：`vue-computed.js`、`vue-watch.js`、`vuex-create-store.js`、`vue-router-core.js`

继续往下补长尾高频追问题后，又新增了：

- DOM 与浏览器：`dom-patch.js`、`infinite-scroll.js`、`raf-scheduler.js`
- 工程化：`tapable-async-parallel-hook.js`、`loader-runner.js`、`hmr-runtime.js`
- React：`use-layout-effect.tsx`、`react-batched-updates.js`、`react-render-commit.js`
- Vue：`vue-set-delete.js`、`vue-patch.js`、`pinia-like-store.js`

这次继续把源码型长尾高频题往下补后，又新增了：

- DOM 与浏览器：`intersection-observer-core.js`、`mutation-observer-core.js`
- 工程化：`tapable-async-series-hook.js`、`source-map-core.js`
- React：`react-hooks-linked-list.js`、`react-scheduler-priority.js`
- Vue：`vue-watch-effect.js`、`vue-effect-scope.js`、`vue-keep-alive.js`、`vue-provide-inject.js`

继续自动补齐后，又补了更偏框架机制和构建内部的题：

- DOM 与工程化：`resize-observer-core.js`、`plugin-runner.js`、`dependency-graph.js`、`vite-plugin-container.js`、`chunk-graph.js`
- React：`use-context.tsx`、`use-imperative-handle.tsx`、`react-forward-ref.tsx`、`react-class-set-state.js`、`react-suspense-resource.js`、`react-error-boundary.js`、`react-portal.js`
- Vue：`vue-ref.js`、`vue-to-refs.js`、`vue-custom-ref.js`、`vue-define-async-component.js`、`vue-directive-core.js`

结合本轮关于 Redux 与 Zustand 的追问，又补了：

- React 状态管理：`zustand-create-store.tsx`

## 每个代码文件建议补齐的信息

即使实现本身已经完成，也建议让每个文件至少能回答下面 4 件事：

- 这道题的本质是什么
- 时间复杂度和空间复杂度是什么
- 关键边界条件有哪些
- 面试里应该按什么顺序讲

如果不想把这些说明写进代码正文，也至少要保证文件名、注释或配套文档能把题型定位清楚。

## 建议的讲题方式

对于 `handwritten` 下的文件，推荐按这个顺序讲：

1. 先确认需求范围
2. 再说题目本质
3. 写最小可用实现
4. 补边界和扩展能力
5. 最后说复杂度

对于 `algorithms` 下的文件，推荐按这个顺序讲：

1. 先判题型
2. 再说核心思路
3. 说明为什么这个解法更优
4. 写代码
5. 最后补复杂度和边界

## 后续补充原则

- 文档里是明确题目名、且适合独立成可执行实现的题，继续按同样规则补文件
- 纯方法论、训练方式、复杂度对比、面试追问类内容，保留在文档正文中
- 如果题目天然存在基础版和增强版，优先拆分成多个文件，方便单独训练和讲解
- 代码目录的目标是“帮助面试表达”，不是重新做一本带全部解析的题库
