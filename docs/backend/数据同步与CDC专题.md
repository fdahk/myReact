# 数据同步与 CDC 专题

## 使用方式

这篇补的是很多后端系统都会碰到、而且非常容易做出脏数据的一类问题：

- MySQL、Redis、Elasticsearch、对象存储、报表库之间怎么同步
- 为什么双写很危险
- `CDC`、`Binlog`、Outbox、本地消息表分别解决什么问题

如果你要讲搜索同步、缓存一致性、报表链路、推荐特征回流、异步索引构建，这篇都非常关键。

---

## 一、为什么数据同步是高频后端能力

1. 为什么很多系统都会有数据同步问题？
答：因为真实系统很少只依赖一个存储。主业务数据可能在 `MySQL`，缓存状态在 `Redis`，检索索引在 `Elasticsearch`，分析报表在数仓，文件元数据和对象存储也要协同。只要存在多个副本或多个异构存储，就一定会有同步问题。

2. 为什么面试官很爱追问同步链路？
答：因为它非常能体现工程成熟度。很多人会说“数据写库后同步到 ES”，但一旦追问“同步失败怎么办、顺序乱了怎么办、重复消费怎么办、延迟多久能接受”，就会立刻暴露深度。

---

## 二、双写为什么危险

3. 什么叫双写？
答：最典型的是业务代码里同时写两个地方，例如先写数据库再写缓存、先写数据库再写 ES、先写主表再发消息。它看起来直接，但一旦中间任一步失败，就会留下不一致。

4. 为什么双写是高频反模式？
答：因为网络、依赖服务、线程池、消息队列都可能失败，而双写往往没有天然事务边界。你今天写库成功、写 ES 失败，明天搜索结果就不一致；写库成功、删缓存失败，读流量就会看到旧数据。

5. 双写是不是完全不能用？
答：不是。关键在于业务能接受多大一致性代价、同步失败是否有补偿、是否能幂等重试、是否有观测和回查能力。面试里成熟回答不是“一刀切否定”，而是知道它为什么危险、在哪些低风险场景还能接受。

---

## 三、CDC、Binlog、Outbox 分别是什么

6. `CDC` 本质上是什么？
答：`CDC` 是变更数据捕获，本质是从数据源变更日志里提取“发生了什么变化”，再把这些变化同步到其他系统。相比业务代码里手工双写，它更像是从底层变更事实出发。

7. 为什么 `Binlog` 同步很常见？
答：因为 `MySQL Binlog` 天然记录了数据变更事件，适合驱动搜索索引同步、缓存失效、报表同步和数据分发。它的优势是尽量不侵入主业务代码，缺点是事件语义可能偏底层，业务补充信息不一定完整。

8. Outbox 或本地消息表解决什么问题？
答：它解决的是“业务写库成功后，如何更可靠地把一条业务事件发出去”。常见做法是在同一事务里写业务数据和 outbox 事件，再由异步 relay 稳定投递消息，这比在事务外直接发 MQ 更可控。

9. `Binlog` 和 Outbox 该怎么选？
答：如果你更需要底层变更同步、尽量少侵入业务代码，`Binlog/CDC` 更常见；如果你更需要清晰的业务事件语义、可控的事件结构和可靠投递，Outbox 更适合。很多成熟系统两者会并存，而不是只选一种。

---

## 四、同步链路最核心的 6 个问题

10. 第一个问题是什么？
答：事件顺序。尤其是同一业务对象被多次连续修改时，事件乱序会直接造成目标侧状态回退。后端要考虑按主键分区、版本号比较、幂等覆盖和乱序保护。

11. 第二个问题是什么？
答：重复消费。消息重试、消费超时、任务重放、relay 重启都可能带来重复同步，所以目标侧一定要能幂等处理，而不是默认“一条事件只会来一次”。

12. 第三个问题是什么？
答：延迟。同步不是非黑即白，很多业务能接受秒级最终一致，但不能接受分钟级甚至小时级延迟。所以你必须能回答：业务允许多大同步延迟、延迟超阈值后怎么告警。

13. 第四个问题是什么？
答：补偿。同步链路一定会出问题，关键是失败后怎么回放、怎么重扫、怎么按时间段或主键范围补数据、怎么避免补偿再次放大故障。

14. 第五个问题是什么？
答：观测。至少要看到同步成功率、积压量、延迟、失败原因、重试次数、目标端写入错误、版本冲突和补偿任务结果。没有这些指标，同步问题基本只能靠猜。

15. 第六个问题是什么？
答：数据对账。同步链路不是“写过去了就算完”，还要知道源和目标到底有没有偏差。成熟系统通常要有抽样对账、全量校验、版本对比或定期重建能力。

---

## 五、几个最常见的同步场景怎么讲

16. 数据库到缓存最典型的同步问题是什么？
答：写库后缓存失效、延迟双删、热点 key 重建、缓存回填竞争。它看似简单，其实本质也是数据同步问题，只不过目标侧是缓存而不是搜索索引。

17. 数据库到 `Elasticsearch` 最典型的问题是什么？
答：索引更新延迟、字段映射不一致、删除事件丢失、顺序错乱、全量重建和增量同步如何配合。很多搜索系统线上问题都不是 ES 本身，而是同步链路不稳定。

18. 数据库到报表/数仓最典型的问题是什么？
答：统计口径、延迟、补数、重复汇总和历史修正。报表问题经常不是 SQL 不会写，而是上游同步语义不清、回灌不规范。

---

## 六、和主项目怎么绑定

19. `agent-server-java` 在这个主题上最自然的切入点是什么？
答：任务状态同步到缓存、结果产物同步到检索索引、知识素材同步到向量库、审计事件同步到分析链路、导出结果同步到对象存储元数据。这些都天然涉及异构同步和最终一致性。

20. 这个主题在项目里最值得强调哪些点？
答：我会优先强调：任务事件表、Outbox 事件、异步 relay、索引同步延迟监控、失败补偿任务和对账能力。这样项目会更像真实平台后端，而不是只会“保存数据库记录”。

---

## 七、最值得练熟的 10 个追问

1. 为什么双写是高频反模式？
2. `CDC`、`Binlog`、Outbox 分别适合什么场景？
3. 为什么同步链路一定要考虑重复消费和乱序？
4. 如何定义同步延迟是否可接受？
5. 为什么异构同步一定要有补偿和回放能力？
6. 数据库到缓存、到 ES、到报表这三类同步问题有什么不同？
7. `Binlog` 驱动同步和业务事件驱动同步最大的差别是什么？
8. 同步链路最关键的观测指标有哪些？
9. `agent-server-java` 哪些能力最适合引入 Outbox 或 CDC？
10. 面试里怎样把同步链路讲得更像真实做过？

---

## 八、这一篇学到位的标准

学完这篇，你至少要做到下面三件事：

1. 能把数据同步讲成顺序、幂等、延迟、补偿、对账的一整套问题。
2. 能区分双写、`Binlog/CDC`、Outbox 这几类方案的适用边界。
3. 能把搜索、缓存、报表、向量库等异构同步自然映射回自己的项目。

---

## 九、Canal 与 Debezium 架构详解

1. Canal（阿里开源）在 MySQL 场景下是怎样工作的？核心组件如何分工？
答：Canal 在协议层**伪装成 MySQL Slave**，向主库注册复制关系，按复制协议拉取并解析 **Binlog 事件流**，把行级变更解析成结构化事件供下游消费。典型链路是：**Canal Server** 负责连接主库、拉取 Binlog、解析事件（含表名、主键、变更类型、列前后镜像等）；**Canal Client**（Java/Go 等 SDK 或适配器）订阅 Server 推送的变更并执行业务逻辑。为减轻 Client 压力、便于水平扩展，Canal 常通过 **Adapter** 或内置能力把变更**输出到 MQ**（如 **Kafka、RocketMQ、RabbitMQ**），下游只消费 MQ 即可。

2. Canal 常见的两种部署形态是什么？生产更偏向哪一种？
答：常见为 **Server-Client 直连模式**与 **Server-MQ 解耦模式**。  
- **Server-Client**：Client 直接连 Server 拉取/订阅事件，链路短、实现简单，但 Client 与 Server 耦合强，消费端扩容、故障隔离不如 MQ 清晰。  
- **Server-MQ**：Server（或 canal-adapter）把解析后的事件写入消息队列，任意数量的消费者从 MQ 消费，**更适合生产**：解耦、削峰、重试与多订阅方更自然。  
生产上若有多团队/多系统订阅同一变更流，**优先 Server-MQ**；若只有单应用、低 QPS 且能接受与 Server 同生命周期，可用 Server-Client。

3. Debezium（Red Hat）是怎样捕获数据库变更的？和 Canal 的“拉 Binlog”有何框架级差异？
答：Debezium 构建在 **Kafka Connect** 之上，以 **Source Connector** 形式运行：Connector 读取数据库的**变更日志**（MySQL Binlog、PostgreSQL 逻辑解码、MongoDB Oplog 等），将每条变更序列化为标准消息写入 **Kafka Topic**，下游再由 **Sink Connector** 或普通 **Consumer** 处理。相对 Canal“独立 Server + 自管协议”，Debezium **强依赖 Kafka 生态**，但因此获得 Connect 的 REST 管理、分布式 Worker、offset 存储（Kafka 内部 topic）等能力。

4. Debezium 端到端架构一般怎么画？Topic 与表如何对应？
答：典型路径：**Source Connector → Kafka Topic → Sink Connector / 自建 Consumer**。  
MySQL 等关系库场景下，默认 Topic 命名常体现库表语义（例如带 `database.server.name` / `topic.prefix` 与库名、表名的组合，具体由**主题路由策略**决定）。**每张业务表对应一个或多个 Topic 是可配置的**：可通过 `table.include.list` / `table.exclude.list` 控制捕获范围，配合 **RegexRouter SMT**、`topic.prefix`、自定义 **Single Message Transform** 把多张表路由到同一 Topic，或拆成更细粒度。面试表述可简化为：**默认偏“按表出 Topic”，实际以配置与 SMT 为准**。

5. 选型时 Canal 与 Debezium 各适合什么团队与基础设施？
答：**Canal**：更轻量，不强制 Kafka；国内 Java 团队熟悉度高，与 RocketMQ 等栈组合常见。缺点是高可用、水平扩展、监控规范往往要**自建**（多 Server、ZooKeeper/元数据、MQ 侧重复投递策略等需自己设计）。  
**Debezium**：**多数据源**（MySQL / PostgreSQL / MongoDB / Oracle / SQL Server 等）支持成熟，社区与文档活跃，**依托 Kafka Connect** 的分布式与 offset 管理，运维模型更接近“标准数据集成平台”。  
若已有 Kafka、需要统一的多库 CDC 平台，Debezium 往往更顺；若以 MySQL 为中心、希望轻量接入国内 MQ，Canal 仍很常见。

6. Binlog 的 `ROW` / `STATEMENT` / `MIXED` 对 CDC 意味着什么？生产应怎么配？
答：  
- **ROW**：记录**行级**变更（含主键与各列前后值或变更后镜像），语义最利于 CDC，能精确知道**哪些字段、什么值**发生变化。  
- **STATEMENT**：记录**SQL 语句**，对非确定性函数、触发器、宽表更新等场景，下游**难以可靠还原每行变化**，不适合作为 CDC 主方案。  
- **MIXED**：由优化器按语句特点在 ROW 与 STATEMENT 间切换，行为不如纯 ROW 直观，排查问题成本高。  
**CDC 生产上应使用 `binlog_format = ROW`**（MySQL 8.0 默认即为 ROW）。否则解析层可能拿不到稳定列级 diff，幂等与对账都会变难。

7. Debezium 一条变更事件里通常有哪些字段？能否举例？
答：关系库捕获的典型结构包含：**`before`**（变更前行，插入时多为 null）、**`after`**（变更后行）、**`source`**（连接器名、库表、事务 id、**binlog 文件与位点** `file`+`pos` 或 `gtid`、`ts_ms` 等）、**`op`**（操作：`c` create / `u` update / `d` delete / `r` 快照读）、**`ts_ms`**（连接器处理时间戳）。下面是一条示意 JSON（字段名以实际版本与配置为准）：

```json
{
  "before": { "id": 1, "status": "NEW", "amount": 100 },
  "after": { "id": 1, "status": "PAID", "amount": 100 },
  "source": {
    "version": "2.x",
    "connector": "mysql",
    "name": "myconnector",
    "ts_ms": 1712300000123,
    "db": "shop",
    "table": "orders",
    "file": "mysql-bin.000123",
    "pos": 456789,
    "gtid": "3e11fa47-71ca-11e1-9e33-c80aa9429562:23"
  },
  "op": "u",
  "ts_ms": 1712300000456
}
```

8. 生产实践里，全量快照与增量如何配合？位点、断点续传与 DDL 要注意什么？
答：  
- **Snapshot + 增量**：首次部署或重建消费位点时，先做一次**一致性快照**（Debezium 的 `snapshot.mode` 如 `initial`、`initial_only` 等），再无缝衔接 Binlog **增量**；Canal 侧则常配合**初始数据 dump/对账**与 Binlog 订阅起点对齐。  
- **位点与断点续传**：必须持久化 **GTID 或 file+position**（以及 Kafka Connect 的 **offset topic**），重启后从上次已提交位点续读，避免重复或漏数需下游**幂等**。  
- **DDL 影响**：表加减列、改类型会导致**下游 schema 与解析器**不兼容；需配合 **Schema Registry**、Debezium 的 schema change topic、或暂停消费并升级处理逻辑。生产上要约定：**DDL 发布流程与 CDC 升级联动**，并做好回放窗口内的兼容策略。

---

## 十、Outbox Pattern 工程实现

1. Outbox 表在工程上一般怎么设计？能否给一张可直接落地的表结构？
答：Outbox 与业务数据**同事务写入**，保证“业务状态已落库则事件至少被记录一次”。典型字段包括：自增或雪花 **id**、**aggregate_type**（如 `Order`）、**aggregate_id**（业务主键或订单号）、**event_type**（如 `OrderCreated`）、**payload**（JSON 承载事件体）、**created_at**、**published**（是否已成功投递）。示例：

```sql
CREATE TABLE outbox_events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  aggregate_type VARCHAR(255),  -- 聚合类型如 'Order'
  aggregate_id VARCHAR(255),    -- 聚合 ID 如订单号
  event_type VARCHAR(255),      -- 事件类型如 'OrderCreated'
  payload JSON,                 -- 事件内容
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published BOOLEAN DEFAULT FALSE
);
```

生产可补充：`published_at`、`retry_count`、`last_error`、**唯一键**（防重复业务事件）等；`payload` 也可用 `TEXT` + 应用层序列化。

2. 基于轮询（Polling）的 Relay 怎么实现？优缺点与典型 SQL、调度参数是什么？
答：独立进程或定时任务**周期性扫描**未发送记录，发送到 MQ 成功后更新标记。示例条件：`SELECT * FROM outbox_events WHERE published = FALSE ORDER BY id ASC LIMIT ? FOR UPDATE`（或乐观锁版本号），发送成功后 `UPDATE outbox_events SET published = TRUE WHERE id = ?`。  
**优点**：实现简单、无额外中间件、易在现有 MySQL 上落地。  
**缺点**：有**固有延迟**（取决于轮询间隔），且高频扫描会带来读压力；长事务可能让“未发布”记录堆积。  
配置项多为：**轮询间隔**（如 200ms～数秒）、**批大小**、**发送超时**、**最大重试**、**死信策略**。适合 QPS 中等、可接受秒级延迟的业务。

3. 为什么更推荐用 CDC（如 Debezium）驱动 Outbox？Outbox Event Router SMT 做什么？
答：CDC 监听 `outbox_events` 的 **INSERT**（及必要时的更新），**近实时**把新行推到 Kafka，避免轮询空转与延迟。Debezium 提供 **`io.debezium.transforms.outbox.EventRouter`**（Outbox Event Router SMT）：从 Outbox 行中读取 `aggregate_type`、`aggregate_id`、`event_type`、`payload` 等列，**重组为统一的外发消息**（可配置目标 Topic 命名、key、header、payload 格式），让下游消费者只看到“领域事件”，而不是裸表行镜像。  
Connector 侧常见相关配置思路包括：在 `transforms` 链中启用 `outbox` 路由、指定 **payload 列**、**route-by-field**（按类型路由 Topic）、是否展开 JSON payload 等（具体键名以所用 Debezium 版本文档为准）。

4. Outbox 表如何避免无限膨胀？清理时要注意什么？
答：已发布事件应**定期归档到冷存储**或**硬删除**，并可按 `created_at` 分区表、保留 N 天。清理前须确认：**下游已持久化消费位点**（Kafka consumer lag 安全）、**审计/合规**是否要求留存；删除策略建议异步批量（`DELETE ... LIMIT` 或分区交换），避免大事务锁表。可与 **CDC** 配合：Relay 标记 `published` 仅用于轮询模式时辅助排查，CDC 模式下也可用“已投递”标记 + 延迟删除，或仅依赖 Kafka 留存而缩短库内保留期。
