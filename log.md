## 2026-04-09

- **docs/面试/其他.md**、**docs/面试/字节剪映二面.md**：按“提高信息密度”的要求继续清理文档结构，批量删除反复出现的 `**参考回答：**` 等低信息量结构标记，压缩由此产生的多余空行，让文档更接近“题目 + 直接可背答案”的高密度复习稿形式。

- **docs/面试/其他.md**：根据本轮提供的多张面试题截图，新建“其他公司面试题整理”文档，按 `字节豆包`、`生活服务`、`美团`、`小米`、`PDD`、`海康`、`百度 App`、`腾讯微信小程序团队`、`Dy 直播` 等公司/方向对可明确识别题目做结构化归类，并统一补充参考回答，覆盖 `keep-alive`、`fetch`、`polling`、`Promise.all`、浏览器渲染、缓存、`HTTP/2/3`、`webpack loader`、`JWT`、`Web Worker`、`Tailwind CSS`、`eventBus`、`Promise queue`、埋点、NAT、树转列表、最长回文子串等高频题。

- **docs/面试/字节剪映二面.md**：对文档后半段新增的零散补充题进行第一次系统整理，在不删除原始记录的前提下插入 **「八、补充题整理版」**，把 `token` 被窃取、`IntersectionObserver` 无限滚动与虚拟列表、`HTTP/2`、`Koa/Express`、`this`、闭包、发布订阅、`WebSocket`、`JWT`、`vue-router`、`nextTick`、`CommonJS/ESM`、`pnpm`、`rebase`、跨域、`display:none` 与 `visibility:hidden`、手写 `once/compose/merge/throttle`、代码输出题与算法题等内容补成去重后的参考答案，同时保留原始补充笔记供后续继续扩展。

- **docs/面试/字节剪映二面.md**：按一面同样的深挖标准继续补强二面文档中原本略偏概念化的部分，重点新增 `Memory` 的具体存储/检索/治理方案、`RAG` 召回优化每一步的真实落地方式、评测集构建与离线/线上指标区分、为何选择标题做向量化的更底层解释，以及 `LoRA/QLoRA` 的工程定位与评估口径，整体把二面回答进一步提升到“能讲方案、能讲实现、能讲权衡”的层次。

- **docs/面试/剪映一面.md**：继续把 `RAG` 与布隆过滤器相关内容从“概念说明”补到“实现机制”层面，新增自然语言 query 如何通过规则、`NER`、意图识别拆成结构化过滤条件、`rerank model` 作为精排模型的输入输出与为何不能直接全库精排，以及 `Bloom Filter` 中“某一位为 `0` 则一定不存在、全为 `1` 只能说明可能存在”的具体哈希位判断过程和假阳性成因。

- **docs/面试/剪映一面.md**：在 `RAG` 向量检索部分继续补充 `embedding model` 的准确定位，明确它不是“专门把文本转成 token 的模型”，而是把 token 序列编码成语义向量的模型；同时补充 `tokenizer`、`embedding model`、`LLM` 三者在输入处理、语义表示、生成任务上的职责差异，并澄清“长文本进入模型前通常都要先切 token，但并不是所有业务处理文本链路都必须经过 embedding model”。 

- **docs/面试/剪映一面.md**：继续补强超卖章节中“悲观锁”部分，新增对数据库锁本质、`select ... for update` 为什么能锁住行、这是否属于数据库原生事务/锁机制、为什么它能避免多个事务基于同一份旧库存并发扣减等底层解释，把“会背名词”进一步提升到“能说明数据库并发控制原理”。

- **docs/面试/剪映一面.md**：继续按逐点追问方式深挖补强一面文档中原本偏概念化的答案，系统补充 `MCP` 与 `Tool Calling` 的准确关系、`Memory` 的具体存储/管理/检索方案、`revalidate` / `CDN` / 接口缓存的分层机制、`TLS 1.2/1.3` 握手与 HTTPS 防中间人攻击的底层流程、超卖方案的实现与原子性原理、向量检索/条件过滤/`rerank` 的具体实现链路、位图与布隆过滤器的优化原理、参数化查询为何能防 `SQL` 注入、浏览器强缓存/协商缓存的自动运行机制、正则中的贪心/惰性/分组/捕获/前瞻、`queueMicrotask` 与 `MutationObserver`、`React 17/18/19` 的具体差异与使用价值、Agent 计划结构化校验实现，以及 `SSR` / `SSG` 的底层运行时差异，整体把答案从“能背概念”提升到“能经得住技术追问”。

- **docs/面试/剪映一面.md**、**docs/面试/字节剪映二面.md**：继续按字节前端面试深挖风格补充第二轮高压追问，新增多 Agent 是否真优于单 Agent、完成率如何定义与测量、主 Agent 拆错如何兜底、`Memory` 误召回和过时经验如何治理、为何先做架构优化而非直接微调、`RAG` 中 `topK` 与 `rerank` 的取舍、只给一周应优先做哪些优化，以及 `Scheduler` 手写题在失败场景下如何避免卡死等高频追问与高分回答，进一步强化“真实性、指标意识、架构取舍、工程兜底”这几个字节常问点。

- **docs/面试/剪映一面.md**、**docs/面试/字节剪映二面.md**：将原本只有题目清单的两份字节剪映前端面试文档系统补全为可直接口述的参考答案，围绕 `AI Agent` 项目、多 Agent 架构、`MCP` 与 `Tool Calling`、`Memory` 复用、`Next.js` 电商、`SSR/CSR/SSG`、`HTTPS/TLS`、超卖、`RAG` 导购、召回优化、微调认知、`AI Native` 前端岗位理解等高频面试点补充成“问题 -> 思路 -> 方案 -> 结果”的表达模板，并在二面文档中补充可直接手写的并发限制 `Scheduler` 实现，方便按题逐项复习和临场回答。

- **docs/flutter.md**：新增 **「Flutter 工程如何和 iOS / Android 原生代码协同」** 专题，系统补充 `Flutter Engine`、原生宿主、`Platform Channel`、`PlatformView`、`FFI` 等协同机制，详细说明什么场景下可以只用插件、什么场景下必须补 `Swift` / `Kotlin` 等原生文件，并分别用 iOS `Live Activities / Dynamic Island` 与 Android 桌面 `App Widget` 两个真实业务需求串讲从 Flutter 发起、原生承接、系统托管展示到底层运行过程的完整链路。

## 2026-03-30

- **docs/前端面试/灰度发布与回滚.md**：继续在选型分析章节中新增“为什么 `Flutter` 和 `Web` 的发版机制差异，会直接影响工具选择”，系统补充 Web 发版快 / 回滚快 / 试错成本低为何会放大实验平台价值，移动端提审慢 / 用户更新慢 / 多版本长期共存 / 止血难为何会让灰度发布与远程开关优先级更高，并进一步澄清“`Flutter` 不是一般不做 `AB` 测试，而是更常见顺序是先把灰度和开关做稳，再把实验做深”的工程原因。

- **docs/前端面试/灰度发布与回滚.md**：在第三方工具章节下新增 **「7.2.3 真正做决策时，应该怎么选」**，不再停留在工具罗列，而是改为决策导向分析：系统补充 `LaunchDarkly`、`Flagsmith`、`GrowthBook`、`Statsig`、`ConfigCat` 的定位差异、横向对比维度、`React Web` 与 `Flutter` 的不同选型重心，以及按“发布控制优先 / 实验能力优先 / 平台自控优先”给出的推荐结论，帮助从“知道有哪些方案”升级为“知道该怎么选方案”。

- **docs/前端面试/灰度发布与回滚.md**：补充 `Statsig` 方案说明，在偏实验平台的第三方工具列表中新增对 `Statsig` 的定位解释，说明其更偏“实验平台 + Feature Flag + 数据分析联动”；同时在 `Flutter` 非 Firebase 方案小节中补充 `Statsig` 的适用场景，并将“偏实验体系、分组稳定性、方案对比”的推荐从仅 `GrowthBook` 扩展为 `GrowthBook`、`Statsig` 两条主流路线。

- **docs/前端面试/灰度发布与回滚.md**：继续补充 `Flutter` 选型说明，在 `Firebase Remote Config + Firebase A/B Testing` 段落后新增“如果 `Flutter` 项目不在 Firebase 体系里，主流方案有哪些”，系统补充 `LaunchDarkly`、`Flagsmith`、`GrowthBook`、`ConfigCat` 与自建最小可用方案的适用场景，并按“偏灰度发布 / 偏实验体系 / 偏平台自控”给出更贴近实际项目决策的选择建议。

- **docs/前端面试/灰度发布与回滚.md**：修正文档中“默认优先选择可同时覆盖 `React` 与 `Flutter` 的同一套平台”这一口径，明确 `React Web` 与 `Flutter` 通常是两个独立项目，不需要为了统一而强行共用一套工具；并将第三方工具选型改写为“按各自领域常用方案选择”，分别强调 Web 侧更常见的 `LaunchDarkly` / `Flagsmith` / `ConfigCat` / `GrowthBook`，以及 Flutter 侧更常见的 `LaunchDarkly` / `Flagsmith` / `Firebase Remote Config + Firebase A/B Testing` / `GrowthBook` 评估路径。

- **docs/前端面试/灰度发布与回滚.md**：继续补充 **「7.2.1 什么叫分桶」** 与 **「7.2.2 有没有第三方工具可以直接用」**，系统解释分桶的本质、为什么灰度发布和 `AB` 测试都依赖稳定分桶、分桶与随机的区别、常见踩坑，并补充 `React Web` 与 `Flutter` 可直接接入的第三方工具思路，区分偏灰度发布的 `LaunchDarkly`、`Flagsmith`、`ConfigCat` 与偏实验体系的 `GrowthBook`、`Firebase Remote Config + Firebase A/B Testing`，同时强调第三方 SDK 能解决的能力边界与仍需团队自己建设的工程部分。

- **docs/前端面试/灰度发布与回滚.md**：修正“灰度发布与 `AB` 测试实施方案没有明确拆开”的问题，在实施章节开头新增“二者不是同一个业务需求，只是共享底层基础设施”的说明，并继续补充 **「7.3.1 灰度发布的独立实施方案」** 与 **「7.3.2 `AB` 测试的独立实施方案」**，分别按目标、关注点和执行步骤拆清“安全上线流程”和“效果验证流程”，避免把灰度放量与实验设计混成一个动作。

- **docs/前端面试/灰度发布与回滚.md**：继续新增 **「七、真正实施方案：现在就在项目里引入灰度发布和 `AB` 测试」**，把文档从“原理解释”进一步扩展为“可执行实施手册”，系统补充三种常见选型、8 个前置决策、10 步通用落地流程，以及分别面向 `React Web` 与 `Flutter 3 + Riverpod + go_router + Dio` 的接入步骤，覆盖 `bootstrap` 配置、统一分流协议、稳定身份、Hook / Provider 封装、路由守卫、曝光埋点、`Dio` 请求头透传、放量顺序、回滚止血与最小可用版本 checklist。

- **docs/前端面试/灰度发布与回滚.md**：在原有面试问答基础上新增 **「六、灰度发布与 `AB` 测试怎么真正落地做」**，系统补充前端灰度发布的工程化落地思路，包括版本灰度 / 功能灰度 / 配置灰度分层、稳定分桶策略、前后端与 BFF / 配置中心协同、分批放量节奏、监控守护指标、特性开关配合、`AB` 实验设计、分流单位选择、实验污染与统计误判避坑，以及“先灰度验证稳定性、再做实验验证收益”的真实项目协同路径。

- **docs/css.md**：补充 `属性选择器详细语法`、`组合选择器`、`结构伪类` 三个小节的教学型内容，新增可直接理解命中结果的 HTML/CSS 示例，并补充各类选择器的典型匹配场景、命中范围和易混淆点，帮助从“语法速查”升级为“结合示例理解实际选择过程”。
- **docs/前端面试/小米二面.md**：在“React 这套组件重执行 + diff + 调度”对应段落下补充“状态变了组件为什么会重新执行”的底层机制说明，串起 `setState / props / context` 触发更新、Fiber 更新队列、优先级调度、render 阶段重新执行组件、reconciliation 比较新旧树以及 commit 阶段提交 DOM 变更的完整链路，并强调“组件重新执行”不等于“真实 DOM 全量重建”。
- **docs/前端面试/小米二面.md**：继续补充 `Fiber 树` 与 React 中几类“树”的关系，系统区分 `React Element / JSX 树`、`Fiber 树`、`current tree`、`workInProgress tree`、真实 DOM / 宿主树各自的职责，并解释一次更新时这些树如何从“产出 UI 描述 -> 构建工作树 -> commit 到宿主环境 -> 新旧 Fiber 树切换”串成完整流程。
- **docs/前端面试/小米二面.md**：补充 `Vue 和 React 是否都有虚拟 DOM 树` 的对照解释，区分 Vue 中的 `VNode` 树、React 中可近似理解为虚拟 DOM 的 `React Element` 树，以及 React 更底层的 `Fiber` 运行时工作树；同时新增 `patch` 概念说明，解释它是把比较后的差异真正同步到真实 DOM 的过程，并澄清它与 `diff`、React `commit` 的对应关系。
- **docs/前端面试/小米二面.md**：继续扩充浏览器与 AI 两处面试点说明：在 DevTools 章节下详细补充 `Lighthouse` 的定位、常见审计维度、使用方式、关键指标和与 `Performance` 面板的配合关系；在大模型 `token` 章节下补充“文本切 token 属于 tokenizer / 模型服务层职责”的工程边界，明确普通前端调用第三方 AI 时通常不需要手动分词，但仍需理解 token 对上下文窗口、成本、截断和延迟的影响。

## 2026-03-27

- **docs/前端面试/code/handwritten/react-components/zustand-create-store.tsx**：继续补强 `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` 段落的学习型注释，专门解释“为什么源码里看不到手动调用 `() => selector(getState())`，但 React 会在 render 阶段读取快照、在外部 store 更新后再次执行 `getSnapshot`，并根据新旧快照决定是否推进组件更新”的底层运行链路，帮助从 `selector 被包装` 进一步理解到 `useSyncExternalStore` 的内部调度职责。

- **docs/前端面试/React.md**：在状态管理相关部分新增 **「状态管理补充：为什么 Redux 常配合 Provider，而 Zustand 通常不需要？」**，系统解释 Redux 核心 store 本身并不依赖 Provider、`react-redux` 为什么要借助 Context / Provider 把 store 分发到组件树，以及 Zustand 为什么常以模块级外部 store + 直接订阅的方式工作，因此默认主路径下通常不需要再额外注入 Provider。

- **docs/前端面试/React.md**：继续修正 Hooks 章节中对“Hook 本质”的表述，新增对“Hook 作为 React 概念的总定义”“React 内置 Hook 的运行时本质”和“自定义 Hook 的封装本质”三层含义的区分，明确自定义 Hook 本质上是一个遵守 Hook 规则、组合已有 Hook 逻辑的普通函数封装，而“按顺序访问 Fiber 上的状态节点”更准确描述的是内置 Hook 的底层机制。

- **docs/前端面试/React.md**：在 Hooks 章节下新增 **「Hooks 深入补充」** 小节，系统补充 Hook 的定义与本质、什么叫“按顺序访问内部状态槽位”、槽位是怎么产生的、为什么 Hook 会和 Fiber 绑定，以及“数组理解”和“链表理解”各自适合解释什么问题，帮助把 Hook 从 API 记忆提升到运行时机制理解层面。

- **docs/前端面试/code/handwritten/react-components/zustand-create-store.tsx**：继续把 Zustand 最小手写实现改写成更适合初学者阅读的“学习文档版”，系统补充 Zustand 解决的问题、`state / listeners / getState / setState / subscribe / useStore(selector)` 各自的职责说明，并在关键位置显式强调它与 Redux 在 `action/reducer` 流程、`setState` 直接更新、是否需要 `Provider`、是否内置 selector 读取模式等方面的差异，方便把该文件直接作为“Zustand 与 Redux 对比入门材料”来阅读。

- **docs/前端面试/code/handwritten/react-components/redux-create-store.js**：继续补强 `replaceReducer` 段落的学习型注释，新增对 `dispatch({ type: '@@redux/REPLACE' })` 的详细解释，说明 `@@redux/...` 属于 Redux 内部常见的 action type 命名风格、`@@` 只是为了让内部 action 与业务 action 更明显地区分开、`REPLACE` 表示“替换 reducer 后立刻触发新 reducer 重新计算 state 结构”，帮助初学者理解“这不是特殊语法，而是 Redux 内部保留命名约定”。

- **docs/前端面试/code/handwritten/react-components/redux-create-store.js**：继续面向初学者补强 Redux 原理说明，在文件开头新增一整段专门解释 `action`、`dispatch`、`reducer` 三者分别是什么、各自负责什么、三者如何串成 `dispatch(action) -> reducer(oldState, action) -> newState` 的更新链路，并用“下订单 / 提交订单 / 按订单做菜”这一类比帮助从概念层面区分“描述变化”“提交变化”“计算新状态”三种不同角色。

- **docs/前端面试/code/handwritten/react-components/zustand-create-store.tsx**：补充 Zustand 风格最小手写实现，覆盖 `getState`、`setState`、`subscribe`、`destroy` 与基于 `useSyncExternalStore` 的 `useStore(selector)`，用于和 Redux `createStore` / `react-redux` 一起对比“轻量外部 store”与“action-reducer 流程式状态管理”的差异。
- **docs/前端面试/code/handwritten/README.md**、**docs/前端面试/code/README.md**：同步把 `zustand-create-store.tsx` 加入 React Hooks / 组件分类清单和代码目录覆盖说明。
- **docs/前端面试/code/handwritten/react-hooks/use-context.tsx**：将原本极简的 `useContext` 示例扩写为“学习文档版”，系统补充 `Context` / `Provider` / `useContext` 三者的定义、Provider 为什么必须包裹子树、为什么子组件只能读取祖先路径上的最近 Provider、底层“进入 Provider 保存旧值 -> 写入新值 -> 渲染子树 -> 退出时恢复旧值”的 push / pop 运行过程，并新增 `withProvider` 教学模型来直观演示上下文作用域只在当前 Provider 子树内生效。

- **docs/前端面试/code/handwritten/react-components/redux-create-store.js**：将原本偏“面试答案版”的 `createStore` 手写实现重写为更适合初学者阅读的“学习文档版”，系统补充了 Redux 整体数据流、store / reducer / action / subscribe / dispatch / replaceReducer 各自的职责解释，并在每个关键变量与函数旁增加“为什么要这样设计、这样写在表达什么、为什么 reducer 里不能 dispatch、为什么初始化要主动派发 `@@redux/INIT`”等面向入门者的详细注释，方便把这道手写题当作 Redux 原理入门材料来阅读。

- **docs/前端面试/code/handwritten/dom-browser/**、**react-hooks/**、**react-components/**、**object-function/**：继续自动补齐 DOM / 工程化 / React / Vue 题库，新增 `resize-observer-core.js`、`plugin-runner.js`、`dependency-graph.js`、`vite-plugin-container.js`、`chunk-graph.js`、`use-context.tsx`、`use-imperative-handle.tsx`、`react-forward-ref.tsx`、`react-class-set-state.js`、`react-suspense-resource.js`、`react-error-boundary.js`、`react-portal.js`、`vue-ref.js`、`vue-to-refs.js`、`vue-custom-ref.js`、`vue-define-async-component.js`、`vue-directive-core.js`，进一步覆盖观察器 API、插件运行器、模块依赖图与 chunk 图、Vite 插件容器、React context / imperative handle / forwardRef / class setState / Suspense / ErrorBoundary / Portal，以及 Vue3 `ref` / `toRefs` / `customRef` / 异步组件 / 指令系统等高频或长尾追问题。
- **docs/前端面试/code/handwritten/README.md**、**docs/前端面试/code/README.md**：同步更新目录总览与覆盖说明，把本轮新增的 DOM / 工程化 / React / Vue 题目继续纳入入口文档。

- **docs/前端面试/code/handwritten/dom-browser/**、**react-components/**、**object-function/**：继续补齐更偏源码追问的 DOM / 工程化 / React / Vue 手写题，新增 `intersection-observer-core.js`、`mutation-observer-core.js`、`tapable-async-series-hook.js`、`source-map-core.js`、`react-hooks-linked-list.js`、`react-scheduler-priority.js`、`vue-watch-effect.js`、`vue-effect-scope.js`、`vue-keep-alive.js`、`vue-provide-inject.js`，进一步覆盖观察器 API、tapable 串行异步钩子、source map 映射思路、React Hooks 链表模型与优先级调度、Vue `watchEffect` / `effectScope` / `keep-alive` / `provide-inject` 等更偏框架底层原理的高频追问题。
- **docs/前端面试/code/handwritten/README.md**、**docs/前端面试/code/README.md**：同步更新目录总览与覆盖说明，把本轮新增的源码型长尾高频题纳入入口文档。

- **docs/前端面试/code/handwritten/dom-browser/**、**react-hooks/**、**react-components/**、**object-function/**：继续沿 `DOM / 工程化 / React / Vue` 方向补全长尾高频手写题，新增 `dom-patch.js`、`infinite-scroll.js`、`raf-scheduler.js`、`tapable-async-parallel-hook.js`、`loader-runner.js`、`hmr-runtime.js`、`use-layout-effect.tsx`、`react-batched-updates.js`、`react-render-commit.js`、`vue-set-delete.js`、`vue-patch.js`、`pinia-like-store.js`，进一步覆盖 diff 之后的 patch、无限滚动、帧调度、异步 hook、loader 链、HMR 运行时、React layout effect / batched updates / render-commit、Vue2 `set/delete`、Vue patch、Pinia 风格状态管理等常见追问题。
- **docs/前端面试/code/handwritten/README.md**、**docs/前端面试/code/README.md**：同步更新目录总览与覆盖说明，把本轮新增的 DOM / 工程化 / React / Vue 长尾高频题纳入入口文档。

- **docs/前端面试/code/handwritten/dom-browser/**、**react-hooks/**、**react-components/**、**object-function/**：按“算法不再补，继续补 DOM / 工程化 / React / Vue 高频手写题”的方向，新增 `xhr-core.js`、`jsonp.js`、`hash-router-core.js`、`history-router-core.js`、`mini-webpack-bundler.js`、`tapable-sync-hook.js`、`use-reducer.tsx`、`react-memo.tsx`、`react-fiber-work-loop.js`、`vue-computed.js`、`vue-watch.js`、`vuex-create-store.js`、`vue-router-core.js`，继续补强浏览器请求与路由、工程化运行时与钩子系统、React Hook / Fiber / memo、Vue `computed` / `watch` / `vuex` / `router` 等高频源码型手写题。
- **docs/前端面试/code/handwritten/README.md**、**docs/前端面试/code/README.md**：同步更新目录总览与覆盖说明，把本轮新增的 DOM / 工程化 / React / Vue 题目纳入入口文档。

- **docs/前端面试/code/handwritten/js-utils/**、**promise-async/**、**dom-browser/**、**react-hooks/**、**code/algorithms/**：继续以“大厂尽可能全覆盖”为目标补题，本轮新增 `array-map.js`、`array-filter.js`、`array-reduce.js`、`promise-reject.js`、`promise-catch.js`、`virtual-dom-diff.js`、`time-slicing-render.js`、`babel-plugin-auto-track.js`、`use-effect.tsx`、`use-sync-external-store.tsx`、`algorithms/search/binary-search.js`、`algorithms/array-string/merge-intervals.js`、`algorithms/array-string/quick-sort.js`，进一步覆盖原生数组方法、Promise 补充 API、最小 diff、时间分片、Babel 插件、React 外部 store 订阅，以及二分 / 合并区间 / 快排等经典算法高频题。
- **docs/前端面试/code/handwritten/README.md**、**docs/前端面试/code/README.md**、**docs/前端面试/code/algorithms/README.md**：同步更新目录总览与覆盖说明，把本轮新增手写题和算法题纳入入口文档，保证题纲与真实代码目录一致。

- **docs/前端面试/code/handwritten/react-components/**：再次检索近年大厂前端手写题面经后，补上此前遗漏的 Redux 系列高频题，新增 `redux-create-store.js`、`redux-combine-reducers.js`、`redux-apply-middleware.js`、`redux-thunk.js`、`redux-bind-action-creators.js`、`react-redux-hooks.tsx`，把 `createStore -> combineReducers -> applyMiddleware -> thunk -> bindActionCreators -> React Hooks 接入层` 这一整条 Redux 常见追问链路补齐。
- **docs/前端面试/code/handwritten/README.md**：更新 React Hooks / 组件分类清单，把 Redux 与 `react-redux` 相关新增代码题登记到总览中。
- **docs/前端面试/code/README.md**：补充当前覆盖说明，新增 Redux 核心 API、Redux 常见追问与 React 接入层的代码覆盖说明。

- **docs/前端面试/code/handwritten/**：基于再次检索近年大厂前端手写题面经，对题库缺口继续补强，新增 `set-interval-with-timeout.js`、`once.js`、`memoize.js`、`template-render.js`、`query-parse-stringify.js`、`thousand-separator.js`、`parallel-task-runner.js`、`pausable-task-queue.js`、`batch-report-queue.js`、`local-storage-ttl.js`、`webpack-plugin-core.js`、`compose-middleware.js`、`use-ref.tsx`、`use-event.tsx`、`use-request.tsx`、`use-state.tsx`、`vue-next-tick.js`、`vue-v-model.js`，进一步覆盖工具函数增强、缓存 / 队列 / 埋点等工程场景、React Hook 原理、Vue `nextTick` / `v-model` 等高频题。
- **docs/前端面试/code/handwritten/README.md**：再次扩充“已拆分的高频题”清单，把本轮新增的工具函数增强、Promise / 调度、浏览器与工程化、React / Vue 原理题一并登记。
- **docs/前端面试/code/README.md**：补充当前代码目录覆盖说明，新增本轮补充的工具函数增强题、调度队列题、缓存 / plugin / middleware 工程题，以及 React / Vue 原理题说明。

- **docs/前端面试/code/handwritten/**：按现有手写题目录结构，继续把“大厂补强清单”中的高频题真正拆成可运行代码文件，并在每个文件顶部补齐“实现目标 / 核心思路 / 复杂度 / 易错点 / 面试表达点”等讲解信息；本轮新增 `object-create.js`、`object-assign.js`、`json-stringify.js`、`vue2-define-reactive.js`、`vue3-reactive-effect.js`、`promise-finally.js`、`promise-any.js`、`with-timeout.js`、`exponential-backoff-retry.js`、`serial-task-runner.js`、`priority-scheduler.js`、`lazy-man.js`、`version-compare.js`、`big-number-add.js`、`array-to-tree.js`、`tree-to-flat-list.js`、`vnode-to-dom.js`、`webpack-loader-core.js`、`reconnectable-websocket.js`、`use-memo.tsx`、`use-callback.tsx`。
- **docs/前端面试/code/handwritten/README.md**：同步更新已拆分题目清单，把上述新增手写题按 `js-utils`、`object-function`、`promise-async`、`data-structures`、`dom-browser`、`react-hooks` 分类登记，确保专题文档与实际代码目录一致。
- **docs/前端面试/code/README.md**：补充当前覆盖说明，新增对象机制 / 响应式、Promise 调度、数据处理 / 浏览器工程化、React Hook 等新增代码题覆盖范围说明。

- **docs/前端面试/code/handwritten/README.md**：结合近年公开大厂前端面经，对“手写题专题”继续补强，新增 **「十五、根据近年大厂面经应补齐的手写方向」**、**「十六、近年大厂高频补充题库」**、**「十七、不同大厂更常偏好的手写方向」**、**「十八、如果要把题库补得更全面，优先补这 20 题」**，将题库从经典基础题扩展到异步调度、工程化最小实现、React/Vue 原理、业务场景题与数据处理题，提升对字节、腾讯、阿里、美团、京东、快手等公司常见手写题的覆盖面。

- **docs/前端面试/AI应用前端专题.md**：在文末新增 **「十一、从 LLM 原理到工程落地的完整链路」** 专题长文，系统串讲 `LLM` 的本质、`token` 与 `Transformer`、预训练/监督微调/偏好对齐、自回归推理、采样参数、`KV Cache`、幻觉成因、`Prompt`、`RAG`、`Function Calling`、`MCP`、`Agent`、模型网关，以及一次真实 AI 应用从用户输入到前端流式渲染的完整工程链路，并补充前端在 AI 产品中的职责、流式通信、Worker、多线程、评测、监控与安全治理等工程视角。
- **docs/前端面试/AI应用前端专题.md**：继续细化 `RAG` 部分，在原有“预处理 -> embedding -> 建库 -> 检索 -> rerank -> 生成”主线下，补充原始文本如何经抽取、清洗、结构化、切块、元数据挂载、embedding、向量索引构建，最终变成可高效检索知识；并补充查询阶段的 query 改写、语义召回、重排、上下文拼装，以及“向量只是检索中间表示，真正喂给 `LLM` 的仍是整理后的文本上下文”这一关键原理。
- **docs/前端面试/AI应用前端专题.md**：继续补强 `LLM` 与 `RAG` 的本质解释，新增“工程拼接文本进入 `LLM` 后并不会被当成单一变量，而是会先经 tokenizer 切成 token 序列，再映射为向量并通过多层 `Transformer` 建模上下文关系”的底层过程说明；同时补充 `embedding model` 与生成模型的区别、同一索引通常应统一 embedding 模型、换模型需重建向量索引、向量库与 `Neo4j` 图数据库在语义召回与关系推理场景下的选型差异，以及 `LlamaIndex`、`LangChain`、`LangGraph`、`Haystack`、`Dify`、`RAGFlow`、`FastGPT`、`Flowise` 等可直接二次开发的常用 `RAG` 框架/平台建议。
- **docs/前端面试/AI应用前端专题.md**：在 `token` 章节继续新增 `tokenizer` 深挖说明，明确它“不属于 `Transformer` 神经网络本体，但属于 `LLM` 体系中与训练强绑定的基础编码组件”，并补充其与词表、切分算法、特殊 token、上下文长度、推理成本和模型表现之间的关系，解释为什么 tokenizer 既是一种工程技术，又不能被视为可随意替换的外围工具。
- **docs/前端面试/AI应用前端专题.md**：在“一次推理到底发生了什么”章节下新增更细的模型前向推导链路，系统补充“原始文本 -> token id -> embedding 向量 -> 位置编码 -> 带因果遮罩的 self-attention -> 多层 `Transformer` 上下文化表示 -> 最后位置隐藏状态 -> logits -> softmax/采样 -> 下一个 token -> `KV Cache` 复用”的完整过程，帮助从真正的模型内部计算角度理解 LLM 如何逐 token 生成内容。

## 2025-03-25

- **docs/前端面试/JavaScript.md**：删除误插入在「五、异步与事件循环」开头的零散笔记；新增 **「十三、异步与 Promise 易错深挖（补充）」**，编号 126–135，收录事件循环与 Promise 的实操判断方式、`setTimeout` 语义、定时器顺序与精度、`then/catch/finally` 非函数入参行为、常见输出题与链式返回新 Promise 等面试口述要点。
- **docs/前端面试/JavaScript.md**：在「十三」末新增 **第 136 题**，说明 `Promise.resolve` 与 `new Promise` 的分工、静态工厂语义、与「先 new 再链式」的辨析，并点出中间无 `reject` 时 `catch` 不执行的链式陷阱。
- **docs/前端面试/JavaScript.md**：新增 **第 137 题**，拆解 `const promise = Promise.resolve().then(() => promise)` 的求值顺序、闭包与自引用解析，说明规范对 chaining cycle 的 `TypeError` 拒绝，并指出 `console.err` 笔误导致 `catch` 非函数、拒绝可能未被消费。
- **docs/前端面试/JavaScript.md**：新增 **第 138 题**，按 `P0 -> P1 -> P2 -> P3` 拆解 `Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log)`，重点说明“非函数参数才发生透传；最后一环传入 `console.log` 后，链会改为消费上一环值并以下一个返回值继续传播”。
- **docs/前端面试/JavaScript.md**：新增 **第 139 题**，详细解释 `then(...).finally(...)` 与 `finally(...).then(...)` 的链值传播、执行顺序，以及为什么 `finally` 的返回值通常不会改掉后续 `then` 接到的值，只有抛错或返回 rejected Promise 才会打断原链。
- **docs/前端面试/JavaScript.md**：新增 **第 140 题**，拆解 `Promise.all([runAsync(1), runAsync(2), runAsync(3)])` 的完整执行过程，覆盖 `new Promise` executor 同步执行、`setTimeout` 宏任务、`r(x, console.log(x))` 的参数求值顺序、`resolve` 只取首参以及 `Promise.all` 保序聚合的规则。
- **docs/前端面试/JavaScript.md**：新增 **第 141 题**，解释 `obj.fun()` 与 `new obj.fun()` 的 `this` 差异，重点说明 `new` 绑定优先级高于隐式绑定，以及新实例对象默认没有 `name` 属性，因此输出 `undefined`。
- **docs/前端面试/JavaScript.md**：新增 **第 142 题**，解释 `o()`、`obj.say()`、`obj.pro.getPro()` 三种调用里 `this` 的差异，核心说明“普通函数看调用点，箭头函数看定义点”，以及对象字面量里的箭头方法不会把 `this` 绑定到该对象本身。
- **docs/前端面试/JavaScript.md**：新增 **第 143 题**，解释对象字面量中的 IIFE 会在创建对象时立刻执行、IIFE 默认绑定先修改 `window.number`，以及 IIFE 返回的普通函数在 `db1()` 与 `obj.db1()` 两种调用方式下分别修改 `window.number` 与 `obj.number`。
- **docs/前端面试/JavaScript.md**：扩充 **第 143 题** 中对 `IIFE` 的定义与“为什么要用括号”的解释；新增 **第 144 题**，专门总结 IIFE 的本质、常见写法、使用场景，以及“函数声明语义切换到函数表达式语义”的原因。
- **docs/前端面试/JavaScript.md**：新增 **第 145 题**，解释为什么“最外层声明”不等于“自动挂到 `window`”，区分全局绑定与全局对象属性，并补充普通脚本与 ES Module 场景下 `var/function` 与 `let/const/class` 的差异。
- **docs/前端面试/JavaScript.md**：新增 **第 146 题**，对比解释 `function a(xx){ this.x = xx; return this }` 这题在浏览器普通脚本与 Node 模块环境中的不同结果，重点说明“直接调用的 `this` 写向全局对象”与“顶层 `var` 是否和全局对象属性共用绑定槽”是两层不同问题。
- **docs/前端面试/JavaScript.md**：新增 **第 147 题**，解释 `(function(){ var x = y = 1; })();` 中为什么 `y` 会在非严格模式下泄漏成全局，而 `x` 只是 IIFE 内部变量；并补充 `var` 只声明左侧变量、赋值表达式右结合及严格模式下会直接抛错的规则。
- **docs/前端面试/JavaScript.md**：新增 **第 148 题**，详细解释 `friendName` 题里为什么 `var` 会提升到整个 IIFE 顶部并遮蔽外层变量，同时汇总 `var/let/const/function/class` 的作用域与提升规则。
- **docs/前端面试/JavaScript.md**：新增 **第 149 题**，对比解释“在函数内部定义 `b`”与“在外部定义 `b` 再在 `a` 中调用”的差异，核心说明 JavaScript 采用词法作用域，变量查找看函数定义位置而不是调用位置。
- **docs/前端面试/JavaScript.md**：新增 **第 150 题**，系统解释 JavaScript 的创建阶段与执行阶段、`function`/`var`/`let`/`const`/`class` 的提升差异，以及同名函数声明与 `var` 声明、后续赋值混在一起时为什么结果会和直觉不一致。
- **docs/前端面试/JavaScript.md**：新增 **第 151 题**，从宿主接收源码、解析/编译、执行上下文创建、同步执行、事件循环推进等主线，分别详细解释浏览器与 Node 环境下一份 JS 文件从加载到运行的完整阶段差异。
- **docs/前端面试/JavaScript.md**：新增 **第 152 题**，详细解释 `function` 声明在普通函数体内可按函数作用域理解、为什么函数声明在创建阶段就拿到完整函数值，以及为什么块内函数声明不能简单等同于 `var`。
- **docs/前端面试/JavaScript.md**：新增 **第 153 题**，详细解释 `f/g` 这道经典输出题，重点补充非严格模式下块内函数声明的 Annex B 兼容语义、`[] == ![]` 的类型转换过程，以及为什么最终会把全局 `f` 改写成返回 `false` 的函数。
- **docs/前端面试/JavaScript.md**：扩充 **第 153 题** 中 `[] == ![]` 的解释，按运算符优先级和抽象相等比较规则拆解 `![] -> false -> 0`、`[] -> '' -> 0` 的完整转换链路。
- **docs/前端面试/JavaScript.md**：新增 **第 154 题**，以 `Person / p2 / Object / Function` 为例完整展示实例对象、构造函数、`prototype`、`__proto__` 与 `constructor` 之间的整张原型关系图，并逐条对应常见输出题的每一行结果。
- **docs/前端面试/JavaScript.md**：新增 **第 155 题**，解释 `function A(){}` 能否类比为“类”，重点区分“函数对象本身直接作为构造函数使用”与“传统 class 模板”之间的差异，并说明 `A.prototype` 在实例共享中的角色。
- **docs/前端面试/JavaScript.md**：新增 **第 156 题**，完整拆解 `Foo/getName` 经典题，结合创建阶段与执行阶段、普通调用/对象调用/构造调用、原型链查找以及 `new`/`.`/`()` 的结合顺序逐条解释每一行输出。
- **docs/前端面试/小米一面.md**：补充 React 闭包题中 `count` 的本质说明，明确它在当前 render 中只是普通值/快照，不是 React 特有可变对象；并区分“当前闭包里的旧值”与“下一次渲染里的新 state”。
- **docs/前端面试/小米一面.md**：在 React 闭包题后补充 React 与 Vue 的异步取值对比，说明 Vue 的 `ref/reactive` 更像响应式容器，因此异步回调读取容器当前值时通常能拿到最新状态，但若先解构成普通值也同样会旧。
- **docs/前端面试/React.md**：新增 **第 123 题**，详细解释函数组件重新执行为什么不等于 DOM 立刻变化，区分 render 阶段负责“重新计算 UI 描述”和 commit 阶段负责“真正提交 DOM 变更”的职责边界。
- **docs/前端面试/BFF与前端网关.md**：新增 **第 39 题**，用一段高密度总结解释 BFF 的本质，强调其核心是面向前端体验的协议适配、数据聚合与流程编排，而不是取代领域服务本身。
- **docs/前端面试/小米二面.md**：在 SSE 与 WebSocket 对比处补充“文本流”的精确定义，明确文本流不等于 JSON，JSON 只是 SSE 常见承载内容之一。
- **docs/前端面试/网络.md**：在原有分层主线后新增一整组“协议运行时与工程实践补充”，系统补齐抓包视角下的数据形态（Ethernet/ARP/IP/TCP/TLS/HTTP/WebSocket/SSE）、前端实际 API 映射、长轮询/SSE/WebSocket 的工程使用方式、请求从 `fetch` 到真实网络的作用过程，以及常见排障抓手与高分面试表达模板。
- **docs/前端面试/网络.md**：在以太网、ARP、IP、ICMP、DHCP、UDP、TCP、TLS、DNS、HTTP/2、QUIC、WebSocket、SSE 等章节首次出现处补充术语速释，增强对 `FCS`、下一跳、ARP 缓存、MTU、分片、Echo、DORA、面向报文、SYN/ACK/FIN、滑动窗口、前向安全、0-RTT、递归/迭代解析、ALPN、Connection ID、心跳、SSE 字段等名词的就地理解。
- **docs/前端面试/小米二面.md**：扩写“大模型对话中的 token 技术”部分，补充 tokenizer、上下文拼装、位置编码、KV Cache、RAG 检索链路、embedding/chunk/rerank、tool use 协作闭环、流式 chunk 传输、采样策略及一次真实对话请求的完整 token 视角链路。
- **docs/前端面试/小米二面.md**：继续补全大模型对话部分的术语解释与英文全称，新增对 `tokenizer`、`BPE`、`SentencePiece`、`RAG`、`embedding`、`chunk`、`rerank`、`schema`、`orchestrator`、`KV Cache`、`logits`、`nucleus sampling`、`top-k`、`frequency penalty`、`presence penalty` 等名词的就地说明。
- **docs/前端面试/小米二面.md**：继续补齐大模型对话部分剩余缺失术语，新增对 `few-shot`、条件分布、`query`/query 改写、混合检索、结构化输出、副作用、幻觉等概念的就地解释，增强非 AI 背景读者的可读性。

## 2026-04-11

- **docs/面试/其他.md**：按“把回复写到对应问题处”的要求，开始将原本只有题目的零散面试清单改写为可直接口述的问答稿；本轮已系统补充文档开头几组高频题，覆盖 `qiankun` / 微前端实现方案、沙箱与样式隔离、`Web Worker`、请求池与 `Promise.allSettled`、`HTTP/1.1` / `HTTP/2` / `HTTP/3` / `HTTPS`、`Astro` 岛屿架构、React Hooks / `useEffect` / Fiber、`Taro` 与 `React Native`、`Pick` / 发布订阅 / 数组扁平化、React `keep-alive`、`fetch`、`XSS` / `CSRF`、对象 `diff`、`polling`、线程与进程、垃圾回收、`webpack` 工程化、`monorepo`、`Koa`、数组转树、Vue3 `Composition API` 与响应式、事件循环、`Promise.all`、最大子数组和与工程协同等内容，并把回答整理成更适合背诵和临场展开的结构化表达。

- **docs/面试/其他.md**：继续将文档后半段剩余的裸题统一补全为“题目 + 参考回答”形式，按业务场景、Vue/React、浏览器与网络、Next.js、SSE / WebSocket、AI 工程、并发控制、事件委托、像素与布局、`Tailwind CSS`、`XHR`、`JWT`、懒加载、受控/非受控组件、`VDOM` / `Svelte`、性能分析、装饰器、`NAT`、跨域、存储、设计模式、`IntersectionObserver`、`Koa/Express`、`TS` 类型题、节流/防抖、`git rebase`、安全攻击面、`vue-router`、模块系统、缓存、`Cookie`、`Map/WeakMap/Set`、跨标签页通信、构建配置、测试、`SVG/Canvas/WebGL`、光照与渲染管线等主题进行系统归类补答，并清理到文档末尾不再残留“只有问题没有答案”的原始问句。

- **docs/面试/其他.md**：根据本轮逐点追问，对前面回答质量不足的部分继续做第二轮深挖补强，重点新增 `Shadow DOM` 的作用域模型、`Web Worker` 的创建与消息通信、`HTTP/2` 二进制分帧 / 多路复用 / `HPACK` / 流控、`HTTP/3` 中 `0-RTT` / `1-RTT` 与 TCP 级队头阻塞、`ALPN` 协商、`SYN` / `ACK` / `SYN_RCVD` 全称与握手状态机、`IndexedDB`、`CustomEvent` / `BroadcastChannel` / `storage` 事件、`Astro` 的准确定位、React Native `Bridge` / `JSI` 全链路、`Pick` / `infer` / 条件类型分发、条件树渲染代码详细注释、`XSS` / `CSP` 的原理、`webpack` 模块图与 loader / plugin 实现、`RSC` / `SSR` / hydration / 路由缓存、Next 异步组件与首页性能优化、事件委托相关 API、React `SyntheticEvent` 事件托管原理，以及 `NAT` 全流程等内容；同时把文档 `2034-2696` 区间整体改写为更重原理、机制和术语解释的高质量版本。
