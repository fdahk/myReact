# OpenClaw 项目调研记录

## 一、先给结论

`OpenClaw` 和我们计划中的 `Agent Workspace` **有明显相似性，但不是同一个产品定位**。

更准确地说：

- `OpenClaw` 更像一个 **personal AI assistant + local-first gateway + multi-channel runtime**
- 我们计划的项目更像一个 **Agent build / run / debug / eval workspace**

所以它们：

- **底层能力层面很像**
- **产品目标层面不完全一样**

如果一句话概括两者关系，可以这么理解：

**OpenClaw 更偏“把一个 AI 助手真正运行起来”，我们的项目更偏“把 AI Agent 的构建、执行、调试、评测过程做成一个工作台”。**

---

## 二、OpenClaw 是什么

从公开仓库和文档看，`OpenClaw` 不是一个简单聊天应用，也不是单纯的 Web UI。

它本质上是一个：

**长期运行的本地 AI Gateway / Agent Runtime 控制平面**

它的核心特点包括：

- 本地优先 `local-first`
- 单进程常驻运行
- 单端口同时承载 `HTTP + WebSocket`
- 多渠道接入
- 多设备节点接入
- 支持工具、技能、会话、路由、重试、热更新
- 带有控制台、WebChat、Canvas 等前端界面

官方文档里反复强调一个概念：

`Gateway is the control plane`

也就是说，`Gateway` 是控制中枢，而真正的产品能力分布在：

- assistant runtime
- channels
- tools
- canvas
- skills
- apps
- nodes

---

## 三、OpenClaw 的核心架构

## 1. 核心后端技术栈

根据公开仓库信息，后端主体主要是：

- `Node.js >= 22`
- `TypeScript`
- `Express`
- `ws`
- `Zod`
- `AJV`
- `chokidar`
- `sqlite-vec`

从这个组合可以判断出它是一个典型的：

**高 IO、强协议、强事件驱动、强扩展性的平台型 TypeScript 工程**

## 2. 架构中心是 `Gateway`

`Gateway` 是整套系统的中枢，负责：

- 提供 `HTTP API`
- 提供 `WebSocket RPC`
- 托管 `Control UI`
- 托管 `WebChat`
- 接收 webhook
- 管理 channels
- 管理 tool invocation
- 管理 sessions
- 管理 config reload
- 管理 sidecars

它不是普通 API server，而更像：

- control plane
- runtime host
- event hub
- local daemon

## 3. 单端口多协议

公开资料提到它使用 Node 原生 `upgrade` 事件，把：

- 普通 `HTTP` 请求
- `WebSocket` 升级请求

统一跑在同一个端口上。

这背后的意义是：

- 架构更集中
- 连接管理更统一
- 控制面和 UI 更容易合并
- 不需要额外再拆很多小服务

## 4. 多渠道和多节点

`OpenClaw` 支持很多输入输出面：

- WhatsApp
- Telegram
- Slack
- Discord
- Google Chat
- Signal
- iMessage
- WebChat
- macOS / iOS / Android nodes

这说明它不是围绕一个网页对话框设计的，而是围绕：

**“一个始终在线的个人 AI 助手如何在多个入口统一工作”**

来设计的。

## 5. 插件、技能、工具、sidecars

它不是一个封闭系统，而是非常强调扩展能力：

- plugin SDK
- skills
- tools
- browser control
- canvas
- cron
- webhooks
- device capabilities

这说明它的工程重点不是“单次问答”，而是“系统集成与能力编排”。

---

## 四、OpenClaw 的核心价值

如果只看表面，很多人会以为它是：

“一个能在很多聊天平台上说话的 AI 助手。”

但更深一层看，它的真正价值是：

### 1. 把 AI 助手做成长期存在的系统

不是一次请求一次响应，而是：

- 有常驻运行状态
- 有会话和记忆
- 有渠道路由
- 有后台控制面
- 有重试、热更新、运维命令

### 2. 把不同入口统一成一个控制平面

无论消息来自：

- 手机
- 桌面
- Web
- 第三方聊天平台

它们都被统一接入到同一个 `Gateway` 中。

### 3. 把 AI 外围系统做重

它真正强调的不是“模型多强”，而是：

- routing
- sessions
- tools
- skills
- channels
- observability
- failover
- operations

这点对我们很有启发。

---

## 五、它和我们计划的项目像不像

## 先说结论

**像，但不是同一个方向。**

更准确地说，二者在“系统层能力”上非常像，在“最终产品目标”上不完全一样。

## 1. 相似点

### 相似点一：都不是纯聊天页

两者都不是：

- 单个输入框
- 单次模型调用
- 返回一段文本

而是都在处理 AI 系统外围更复杂的问题。

### 相似点二：都需要 Agent Runtime 思维

两者都涉及：

- model routing
- tool calling
- session state
- streaming
- retries
- logging
- config

### 相似点三：都强调控制面

我们的项目要做：

- build
- run
- debug
- eval
- replay

`OpenClaw` 做的是：

- gateway
- sessions
- control UI
- skills
- channels
- runtime ops

本质上，两者都不是“前台对话产品”，而是“系统控制与运行工作台”。

### 相似点四：都很重视工具和扩展能力

这也是二者很接近的一点：

- 工具不是附属品
- 技能不是附属品
- 渠道/能力接入不是附属品

真正有价值的是：

**把语言模型连接到外部动作和外部系统。**

### 相似点五：都不是把 AI 当黑盒接口

无论是 `OpenClaw`，还是我们要做的 `Agent Workspace`，核心都不是“调一下模型接口”，而是把：

- 输入
- 上下文
- 工具
- 执行过程
- 结果
- 回退
- 评测

组织成一套系统。

## 2. 不同点

### 不同点一：OpenClaw 更偏“运行中的助手”

`OpenClaw` 的重点是：

- assistant 常驻运行
- 多渠道收发消息
- 本地设备能力
- long-running gateway

也就是说，它更像“一个真的在生活里工作的 AI 助手”。

### 不同点二：我们的项目更偏“工作台”

我们项目的重点是：

- 可视化构建
- 执行过程展示
- 调试
- 回放
- 评测
- 工作流配置

也就是说，我们更像：

**给开发者、产品经理或 AI builder 使用的 Studio / Workspace。**

### 不同点三：OpenClaw 更偏 runtime product

`OpenClaw` 偏：

- runtime
- channel integration
- device integration
- assistant operations

我们的项目偏：

- authoring
- orchestration
- observability
- evaluation
- experiment workflow

### 不同点四：OpenClaw 更强调“多入口统一助手”

而我们的项目更强调：

**“把一个 Agent 系统的构建、执行、调试和评测做成白盒工作台。”**

---

## 六、我们最值得学习的地方

这里是最有价值的部分。

## 1. 学它的“系统观”，不要只学表面功能

`OpenClaw` 最值得学的不是它支持多少渠道，而是它的思路：

**AI 产品真正难的不是接模型，而是把模型放进一个长期可运行、可扩展、可治理的系统里。**

这是我们项目必须继承的核心认知。

## 2. 学它把 `Gateway` 当控制平面

这个思路很重要。

我们虽然不一定要完全做成 `OpenClaw` 那种本地常驻 gateway，但应该借鉴：

- 运行态和配置态分离
- 控制面和执行面分离
- 统一事件入口
- 统一工具接入层
- 统一状态记录

对于我们的项目来说，这可以变成：

- `Run Engine`
- `Tool Registry`
- `Model Adapter`
- `Execution Trace`
- `Eval Store`

## 3. 学它重视运行时而不是只重视 Prompt

`OpenClaw` 给人的一个很强信号是：

它没有把系统核心押在 prompt engineering 上，而是押在：

- sessions
- channels
- retries
- routing
- hot reload
- tool runtime

这非常对。

我们项目里也应该坚持：

**Prompt 重要，但 runtime、observability、workflow、eval 更重要。**

## 4. 学它的协议化和扩展化设计

从插件、技能、工具、渠道可以看出，它不是硬编码式堆功能，而是尽量把能力做成：

- schema
- contracts
- registries
- adapters

这对我们的项目非常关键。

我们后面设计时最好也把这些东西抽象清楚：

- model adapter interface
- tool schema
- workflow node schema
- run event schema
- eval schema
- replay snapshot schema

## 5. 学它对“多入口”的统一抽象

虽然我们的项目不一定做那么多聊天渠道，但它的思想值得学：

**外部来源不同，内部统一成标准事件模型。**

对应到我们项目里，可以变成：

- 手动输入任务
- API 提交任务
- 预设 benchmark case
- 回放历史任务

这些入口虽然不同，但都应该统一成标准 `task run request`。

## 6. 学它对运维能力的重视

`OpenClaw` 有：

- status
- logs
- restart
- doctor
- hot reload
- health probe

这说明它不是只关注功能，而是把“系统如何长期稳定运行”当成产品的一部分。

我们项目虽然不用做到那么全，但至少应该借鉴：

- run status
- health state
- error boundary
- version snapshot
- replay
- retry history

## 7. 学它的本地优先思维

`OpenClaw` 很强调本地优先，这会让产品有更强的：

- 持续在线感
- 数据掌控感
- 响应感
- 工具整合能力

对我们来说，不一定非要完全 local-first，但可以借鉴：

- 开发环境尽量本地可跑通
- demo 尽量自包含
- 不要过度依赖太多云上外部设施

这会让项目更容易做成真实可演示系统。

---

## 七、我们不应该直接照抄的地方

学习不等于复制。

## 1. 不要把范围做得像它一样大

`OpenClaw` 的覆盖范围非常广：

- 多渠道
- 多终端
- 语音
- Canvas
- browser control
- mobile nodes
- skills
- plugins

如果我们直接模仿这个范围，项目会失控。

我们的主项目应该收敛在：

- build
- run
- debug
- eval
- replay

## 2. 不要把重心放在“接很多平台”

`OpenClaw` 的价值之一是多渠道接入。

但对我们的项目来说，最值钱的不是“接了多少渠道”，而是：

- 执行过程可视化
- 工具调用可追踪
- 调试和回放可用
- 评测闭环清晰

## 3. 不要把项目做成“个人助手”

`OpenClaw` 的产品主线是 personal assistant。

而我们更适合做成：

**Agent Workspace / Workflow Studio / Eval Workspace**

这样才更适合证明：

- 前端系统设计能力
- AI 工具工作台能力
- 平台化产品思维

## 4. 不要把本地 daemon 当唯一主角

`OpenClaw` 的 gateway daemon 很强，但我们的面试价值主要不在“常驻守护进程”，而在：

- 前端工作台
- 运行链路白盒化
- 可观测性
- 实验和评测能力

所以我们可以借鉴 runtime 思路，但不要让系统重点偏到运维型基础设施上。

---

## 八、如果用一句话比较两个项目

可以这样说：

**OpenClaw 更像“真正运行中的 AI 助手操作系统”，我们的项目更像“用于构建、执行、调试和评测 AI Agent 的工作台”。**

再通俗一点：

- `OpenClaw` 更偏产品 runtime
- 我们更偏 builder workspace

---

## 九、对我们的直接启发

如果把 `OpenClaw` 的启发翻译成我们后续的实际设计，最重要的是下面这些：

### 1. 我们的系统也应该有统一运行时抽象

建议后面明确设计：

- `Run`
- `Step`
- `ToolCall`
- `ModelInvocation`
- `TraceEvent`
- `EvalResult`

### 2. 我们应该把“执行过程”做成一等公民

而不是只展示最终答案。

至少要展示：

- 当前步骤
- 用了哪个模型
- 调了哪个工具
- 输入输出是什么
- 耗时多少
- 是否重试
- 最终为何失败或成功

### 3. 我们应该做适度的扩展接口

至少要预留：

- model adapters
- tool adapters
- eval adapters
- workflow nodes

这样项目的系统感会强很多。

### 4. 我们应该重视“失败链路”

`OpenClaw` 很重视：

- retry
- failover
- health
- troubleshooting

我们项目里也应该补：

- error trace
- retry record
- fallback reason
- replay

### 5. 我们应该用工作台方式把白盒能力做出来

这也是我们和 `OpenClaw` 最大的差异化机会：

`OpenClaw` 很强，但它的重点不是“给 builder 一个特别强的可视化调试与评测工作台”。

而这恰好可以成为我们项目的主线价值。

---

## 十、最终判断

### 它是不是和我们计划的项目非常像

**中层架构很像，最终产品不完全一样。**

像在这些层面：

- agent runtime 思维
- tool / skill / channel / config 的抽象
- control plane 思路
- 可扩展平台思维
- 不把 AI 简化成单次模型调用

不像在这些层面：

- 它偏 personal assistant runtime
- 我们偏 agent builder workspace
- 它偏多渠道和设备连接
- 我们偏 build / run / debug / eval / replay

### 它值不值得研究

**非常值得。**

因为它能帮助我们快速建立一个正确认知：

**真正有价值的 AI 项目，不是一个“会说话的页面”，而是一套能让 AI 持续运行、接入外部能力、暴露执行过程、可扩展、可治理的系统。**

---

## 十一、后续建议

如果继续沿这个方向推进，我们后面可以基于 `OpenClaw` 的启发，把自己的项目再收敛成这几份具体文档：

1. `Agent Workspace` 系统架构图
2. 运行时数据结构设计
3. 可观测性与回放设计
4. 模型适配层设计
5. 工具注册与调用链路设计
6. MVP 页面和模块拆分
