# 后端面试代码目录

这个目录用于存放从 `docs/backend` 文档中拆分出来的后端手写题、工程小题和高频实现样例。

目标不是把代码堆满，而是让每个文件都能成为一个可独立训练、可独立讲解的后端题目样本。

## 基本原则

- 一题一个文件
- 文件名统一使用小写 `kebab-case`
- 文档正文保留思路、边界、复杂度、trade-off 和追问点，不再塞太多大段代码
- 代码尽量写成可运行风格，并保留最小演示或关键注释
- 每个手写题文件都要能支撑这 4 件事：
  - 题目本质是什么
  - 核心数据结构或并发模型是什么
  - 关键边界和易错点是什么
  - 面试里应该按什么顺序讲

## 目录结构

- `handwritten/cache`: 缓存、淘汰策略、本地缓存
- `handwritten/concurrency`: 阻塞队列、生产者消费者、线程协作
- `handwritten/traffic`: 限流、漏桶、令牌桶
- `handwritten/tasks`: 重试器、延迟任务、调度器
- `handwritten/idempotency`: 幂等、防重、去重
- `handwritten/security`: 签名校验、回调安全、基础安全工具
- `handwritten/strategy`: 规则命中、开关、策略评估
- `handwritten/workflow`: 状态机、审批流、节点推进
- `handwritten/edge`: 聚合、边缘层拼装、BFF 简化能力
- `handwritten/identity`: 发号器、趋势递增 ID、业务标识生成

## 当前第一批覆盖

- `handwritten/cache/lru-cache.java`
- `handwritten/cache/ttl-cache.java`
- `handwritten/concurrency/blocking-queue.java`
- `handwritten/traffic/token-bucket-rate-limiter.java`
- `handwritten/tasks/retryer.java`
- `handwritten/idempotency/idempotency-guard.java`

## 当前第二批覆盖

- `handwritten/concurrency/simple-thread-pool.java`
- `handwritten/tasks/delayed-task-scheduler.java`

## 当前第三批覆盖

- `handwritten/traffic/sliding-window-rate-limiter.java`
- `handwritten/concurrency/simple-event-bus.java`

## 当前第四批覆盖

- `handwritten/idempotency/quota-guard.java`

## 当前第五批覆盖

- `handwritten/security/webhook-signature-verifier.java`

## 当前第六批覆盖

- `handwritten/tasks/outbox-relay.java`

## 当前第七批覆盖

- `handwritten/idempotency/payment-callback-guard.java`

## 当前第八批覆盖

- `handwritten/strategy/feature-flag-evaluator.java`
- `handwritten/workflow/approval-state-machine.java`
- `handwritten/edge/request-aggregator.java`

## 当前第九批覆盖

- `handwritten/identity/snowflake-id-generator.java`

## 建议训练方式

1. 先看 `docs/backend/后端手写题专题.md`，明确这道题为什么值得练。
2. 再手写一遍这里的代码，不看答案自己写。
3. 最后对照这个目录复盘：
   - 核心结构有没有写对
   - 并发边界有没有遗漏
   - 是否能讲清复杂度和工程 trade-off

## 后续补充原则

- 优先补和主项目、系统设计、场景题能互相映射的代码题
- 优先补后端高频手写题，不急着做“大全”
- 如果同一道题存在基础版和升级版，优先拆成独立文件
