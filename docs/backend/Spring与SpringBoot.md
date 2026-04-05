# Spring 与 Spring Boot

## 使用方式

这一篇的目标不是教你会写注解，而是让你形成 `Java` 后端最核心的工程心智。你要学会回答：

- `Spring` 到底解决了什么问题。
- 为什么大厂后端几乎绕不开它。
- 控制层、服务层、数据访问层应该如何协作。
- 面试官问 `IOC`、`AOP`、事务、自动装配时，怎样回答才像工程师而不是背词条。

---

## 一、为什么 Spring 是 Java 后端主线

1. 为什么 Java 后端几乎都绕不开 Spring？
答：因为它不是单一框架，而是一套工程基础设施。它帮你把对象管理、依赖注入、配置装配、Web、事务、数据访问、扩展机制等大量通用问题统一起来。大厂并不是因为“注解方便”才用它，而是因为复杂项目需要统一的工程骨架。

2. `Spring` 和 `Spring Boot` 的关系是什么？
答：`Spring` 更像底层基础设施和编程模型，`Spring Boot` 则是在其上提供约定优于配置、自动装配和快速启动能力。前者更偏“能力本体”，后者更偏“让这些能力在业务项目里高效落地”。面试时如果把两者混成一件事，会显得理解不够清晰。

3. 为什么你从 Node 转 Java，必须重点补 Spring？
答：因为你的 `Node.js` 经验更多是“知道接口怎么写”，而 `Spring` 代表的是 Java 后端在工程组织、依赖管理、模块边界、事务处理和框架协作上的主流方式。掌握它，才算真正进入 Java 后端生态。

---

## 二、IOC 与依赖注入

4. 什么是 IOC？
答：IOC，控制反转，核心不是一句抽象口号，而是“对象的创建与依赖关系不再由业务代码手动控制，而交给容器统一管理”。在复杂后端系统里，这让对象生命周期、配置管理、依赖替换和测试注入都更可控。

5. 什么是依赖注入？
答：依赖注入是 IOC 的常见实现方式。对象不自己去 `new` 依赖，而是由容器把需要的依赖注入进来。它的价值在于降低耦合，提高可测试性和可替换性。比如一个服务依赖缓存组件、DAO、消息发送器时，都可以通过依赖注入获得。

6. 为什么依赖注入比手动 new 更适合大项目？
答：因为手动 new 会把对象创建逻辑、依赖关系和业务代码绑死，后续测试、扩展、替换实现和环境切换都很痛苦。依赖注入让业务代码只依赖抽象能力，不关心对象如何创建和装配，这对多人协作的大型后端尤其重要。

7. 构造器注入、字段注入、Setter 注入更推荐哪种？
答：通常优先构造器注入。因为依赖更明确、对象更容易保持不可变、测试更方便，也更能暴露循环依赖问题。字段注入虽然写起来省事，但从工程清晰度和可测试性上不如构造器注入。

---

## 三、Bean 生命周期与容器

8. 什么是 Bean？
答：被 Spring 容器管理的对象就是 Bean。关键不在“它只是个对象”，而在于它拥有统一的创建、依赖注入、初始化、销毁和作用域管理过程。Bean 概念是理解 Spring 全部能力的入口。

9. Bean 生命周期大致是什么？
答：实例化、属性填充、Aware 回调、初始化前处理、初始化、初始化后处理、使用、销毁。你不用背每个扩展点，但至少要知道：Spring 管理的不只是创建，还有一整套围绕对象生命周期的拦截和增强机制。

10. 单例 Bean 为什么是默认？
答：因为绝大多数服务对象本身不需要保存用户级状态，单例更节省资源、也更符合服务端“无状态服务”的主流实践。但也因此要避免在单例 Bean 里保存请求级可变状态，否则很容易出现线程安全问题。

11. 常见 Bean 作用域有哪些？
答：单例、原型、请求、会话等。实际后端开发最常见的还是单例。理解作用域的重点不是死记名字，而是知道什么对象应该是无状态共享的，什么对象应该和请求上下文绑定。

---

## 四、AOP

12. AOP 解决什么问题？
答：AOP 解决的是横切关注点统一治理问题。日志、权限、事务、审计、监控、幂等校验等逻辑，如果散落在每个业务方法里，会造成大量重复和污染。AOP 让你在不改动核心业务代码的前提下，把这些公共逻辑统一织入。

13. 为什么说 AOP 不是为了“炫技”？
答：因为它的核心价值在工程治理，不在于写花哨拦截器。大厂后端代码量大、模块多，如果日志、埋点、事务、鉴权都靠手写复制，长期一定失控。AOP 是为了解决规模化治理问题。

14. AOP 最常见的业务场景有哪些？
答：统一日志、接口耗时统计、权限校验、事务边界、参数校验补充、幂等防重、审计追踪。你要学会把 AOP 放在这些真实场景下理解，而不是只会说“切面就是 before/after”。

15. Spring AOP 和完整字节码织入有什么差异？
答：Spring AOP 主要基于代理，更偏方法级拦截，能力范围相对有限；更完整的织入方案可以覆盖更多场景。面试里如果岗位更偏业务开发，知道 Spring AOP 基于代理思想通常就够了。

---

## 五、Spring MVC 与 Web 开发

16. Spring MVC 的核心职责是什么？
答：把 HTTP 请求映射到控制器方法，并在请求参数绑定、校验、响应序列化、异常处理等方面提供统一 Web 编程模型。它不是“写接口方便”的工具而已，而是把 Web 层的一整套共性问题收敛掉。

17. 控制层在后端里的职责边界是什么？
答：控制层负责接收请求、做基础参数校验、调用服务层、返回标准响应，不应该承载过多业务编排。很多转后端的人容易把复杂逻辑直接写在 Controller，这会让系统后续很难扩展和测试。

18. 服务层应该做什么？
答：服务层负责业务编排、规则组合、事务边界控制和跨组件协作。它是“业务为什么这样执行”的核心位置，而不是简单的“转调 DAO”。

19. 数据访问层应该做什么？
答：负责和数据库、缓存、外部存储做交互，把持久化细节与业务逻辑隔离。高质量项目里，服务层不会直接写 SQL，控制层更不会直接依赖数据访问实现。

20. 统一异常处理为什么重要？
答：因为后端系统不能让每个接口都自己决定异常怎么返回。统一异常处理可以让错误码、日志、用户提示和监控告警都具备一致性。大厂系统很看重这一点，因为它直接影响排障效率和接口契约稳定性。

---

## 六、Spring Boot 自动装配

21. 自动装配解决什么问题？
答：它解决的是“框架能力很多，但业务项目不应该每次都手工完成所有装配”的问题。通过条件化配置和约定，Spring Boot 能根据环境、依赖和配置自动注册 Bean，让你更快启动项目。

22. 为什么自动装配不是“魔法”？
答：因为它本质上仍然是规则驱动的条件装配：当 classpath 中有某个依赖、配置里有某个开关、容器里缺某个 Bean 时，就按条件注册对应实现。你要把它理解成“框架级工程模板”，而不是不可解释的黑盒。

23. 为什么大厂后端既喜欢自动装配，又要求你理解它？
答：因为自动装配大幅提高开发效率，但一旦 Bean 冲突、配置失效、环境不一致，你必须知道框架在做什么，才能定位问题。如果只会用、不理解，项目一复杂就容易失控。

---

## 七、事务

24. 为什么事务是后端高频重点？
答：因为真实业务不是“写一张表就结束”，而是经常涉及多次数据库操作、状态变更和一致性要求。没有事务意识，很容易出现部分成功、部分失败，最终数据错乱。

25. Spring 事务的核心价值是什么？
答：在业务层声明式管理事务边界，减少样板代码，并让业务逻辑更专注于规则本身。它的价值不只是少写 `commit/rollback`，而是把事务管理统一纳入工程体系。

26. 声明式事务为什么这么常用？
答：因为它让事务逻辑和业务代码解耦，维护成本更低，也更符合 AOP 的横切治理思想。你不需要在每个方法里显式处理连接和提交回滚，而是通过注解和框架统一完成。

27. 事务并不是什么都能兜底，为什么？
答：因为事务主要解决同一事务资源范围内的一致性问题。跨服务、跨数据库、跨消息系统时，问题会升级为分布式一致性，不能简单靠一个 `@Transactional` 解决。这个认知非常重要，能直接拉开和“只会写业务”的差距。

---

## 八、数据访问与 MyBatis 基本定位

28. 为什么 Java 后端常见 `MyBatis`？
答：因为它在 SQL 可控性和框架便利性之间取得了平衡。大厂业务很多时候需要对 SQL、索引、执行计划保持较强控制，而不是完全交给 ORM 自动生成。`MyBatis` 在这方面很适合国内复杂业务系统。

29. 为什么不能只会写 Mapper 就自认为会数据访问层？
答：因为真正重要的是你是否理解数据模型、查询模式、事务边界、索引设计和批量操作影响。写 Mapper 只是表层能力，后端岗位更看重你是否知道数据层为什么这么设计。

---

## 九、配置、环境与工程治理

30. 为什么配置管理对后端很重要？
答：因为服务会运行在开发、测试、预发、生产多个环境，数据库、缓存、消息队列、第三方服务地址都可能不同。高质量项目要求配置外置、环境隔离、敏感信息可控，而不是把一切写死在代码里。

31. 为什么不能把 Spring 学成“注解大全”？
答：因为那样你只能写业务，无法真正掌控项目。你需要知道每一层能力是在解决什么工程问题：IOC 解决对象管理，AOP 解决横切治理，MVC 解决 Web 编程模型，事务解决一致性边界，自动装配解决工程启动效率。

---

## 十、你现阶段要掌握到什么程度

对你当前的目标，这篇至少要达到下面标准：

1. 能讲清 `Spring` 解决了哪些工程问题。
2. 能说清控制层、服务层、数据访问层的职责边界。
3. 能解释 `IOC`、依赖注入、AOP、事务、自动装配的核心价值。
4. 能把这些知识映射到你后续的 Java 主项目设计里。

如果你现在只会“`@RestController`、`@Service`、`@Autowired` 怎么写”，那还只是入门，离顶级后端岗位需要的工程认知还差很远。

---

## 十一、事务失效为什么是高频深挖题

32. 为什么 `@Transactional` 明明写了，有时候却不生效？
答：因为 Spring 声明式事务通常依赖代理生效，而不是方法上有注解就一定生效。常见失效场景包括：同类内部自调用绕过代理、方法不是 `public`、异常被吞掉、事务方法在对象创建早期被调用、配置的事务管理器不对等。这个题之所以高频，就是因为它很能区分“会用注解”和“理解框架机制”。

33. 为什么同类内部自调用会让事务失效？
答：因为 Spring 很多事务能力是通过代理对象织入的。如果一个类内部 `this.someTransactionalMethod()`，调用没有经过代理，而是直接落到原对象方法上，事务切面就进不来。这也是为什么很多框架题会追问“代理到底解决什么问题”。

34. 为什么异常处理方式会影响事务回滚？
答：因为事务框架通常根据异常传播情况决定是否回滚。如果你把异常直接 catch 住又不再抛出，框架层可能会误以为业务正常完成。成熟回答应该体现：事务不只是数据库操作集合，还和异常语义、边界和传播方式绑定在一起。

35. 为什么事务边界通常更适合放在服务层？
答：因为服务层最接近业务编排和一致性边界。控制层太靠外，容易把请求校验、远程调用甚至展示层逻辑卷进事务；DAO 层又太细，无法覆盖完整业务动作。把事务放在服务层，最容易做到“边界清楚、范围可控、语义稳定”。

---

## 十二、循环依赖、代理与容器理解

36. 为什么循环依赖在面试里常被问？
答：因为它能直接暴露你是否理解容器如何创建对象、注入依赖和暴露早期引用。它不是单纯“代码写得不好”的题，而是 Spring 容器机制题。

37. 为什么构造器注入更容易暴露循环依赖？
答：因为构造器注入要求对象在创建时就拿到完整依赖，如果 A 依赖 B、B 又依赖 A，容器在实例化阶段就会卡住。字段注入或 Setter 注入有时还能通过更晚的填充阶段绕过一部分问题，但这不代表循环依赖是好事。成熟项目通常更希望尽早发现并消掉这种设计问题。

38. 为什么代理机制会贯穿 `Spring` 很多能力？
答：因为事务、AOP、统一拦截、部分安全和监控增强都依赖代理在业务方法外面包一层行为。你如果理解了“Spring 不只是管理对象，还会在对象外织入统一能力”，很多事务失效、AOP、生效顺序、Bean 冲突问题就更容易理解。

39. 为什么代理也会带来排障复杂度？
答：因为你看到的方法调用链不一定就是最终真实执行链。代理对象、增强逻辑、切面顺序、事务边界、异常传播都可能改变最终行为。所以成熟后端不仅要会享受框架便利，还要知道框架在什么时候可能让行为变得不直观。

---

## 十三、Spring Boot 线上问题怎么讲

40. 自动装配冲突时，一般从哪里查？
答：先看类路径里到底引入了哪些依赖，再看配置条件是否满足，再看容器里是否已经存在同类型 Bean，最后再看是不是多个自动配置类都试图装配同一能力。自动装配问题的核心不是“魔法失效了”，而是条件和优先级没被理解清楚。

41. 为什么配置和环境一复杂，Spring Boot 问题就会明显增多？
答：因为它大量能力都建立在条件化配置和环境装配之上。开发、测试、预发、生产环境只要某个配置差一点，Bean 装配、数据源、缓存、消息、事务管理器就可能表现不同。所以 Spring Boot 题真正高阶的地方，是环境和工程治理，而不只是注解。

42. 为什么 `Spring` 题最后会落到工程能力？
答：因为 `Spring` 本质上是工程基础设施，而不是单纯语言语法糖。你越往后学，越会发现它真正解决的是对象管理、配置治理、Web 模型、事务边界、模块协作和统一扩展这些工程问题。面试官要看的也正是这一层。

---

## 十四、最值得练熟的 10 个追问

1. 为什么 `@Transactional` 明明写了也可能失效？
2. 同类内部自调用为什么绕过事务代理？
3. 为什么异常吞掉后事务可能不回滚？
4. 事务边界为什么通常放在服务层最合适？
5. 为什么构造器注入更容易暴露循环依赖？
6. 代理机制为什么会贯穿 `Spring` 很多能力？
7. 自动装配冲突一般该从哪些层排查？
8. 为什么 Spring Boot 的问题经常和环境配置强相关？
9. 为什么说 Spring 真正解决的是工程问题而不是注解书写问题？
10. 如果让你把这些能力映射到主项目里，你会优先落哪几层？

---

## 十五、IoC 容器实现原理

43. BeanFactory 和 ApplicationContext 有什么区别？
答：`BeanFactory` 是 Spring 最底层的容器接口，定义了 `getBean()`、`containsBean()` 等基础能力，采用**懒加载**策略——只有在第一次 `getBean()` 时才实例化对应 Bean。`ApplicationContext` 继承自 `BeanFactory`（通过 `ListableBeanFactory`、`HierarchicalBeanFactory` 等中间接口），在其基础上扩展了：国际化（`MessageSource`）、事件发布（`ApplicationEventPublisher`）、资源加载（`ResourcePatternResolver`）、AOP 自动代理、环境抽象（`Environment`）等能力。最关键的行为差异是：`ApplicationContext` 在**启动时就预实例化所有单例 Bean**（`refresh()` → `finishBeanFactoryInitialization()` → `preInstantiateSingletons()`），而不是等到首次使用。所以生产环境绝大多数时候用的都是 `ApplicationContext`（如 `AnnotationConfigApplicationContext`、`ClassPathXmlApplicationContext`、`SpringApplication` 内部创建的 `GenericApplicationContext`），`BeanFactory` 更多是容器内部的底层抽象。

44. Bean 的完整生命周期流程是什么？请列出每一步涉及的具体接口。
答：完整流程如下——

1. **BeanDefinition 解析**：Spring 把 XML 配置（`XmlBeanDefinitionReader`）、注解扫描（`ClassPathBeanDefinitionScanner` + `@Component`/`@Service` 等）、Java Config（`@Configuration` + `@Bean`）全部解析为 `BeanDefinition` 对象，注册到 `BeanDefinitionRegistry`（通常就是 `DefaultListableBeanFactory`）。`BeanDefinition` 记录了类名、作用域、构造参数、属性值、初始化/销毁方法等元信息。
2. **实例化**：容器通过反射调用构造器创建 Bean 实例（`AbstractAutowireCapableBeanFactory.createBeanInstance()`）。如果有 `InstantiationAwareBeanPostProcessor.postProcessBeforeInstantiation()` 返回非 null，则直接短路返回代理对象。
3. **属性填充（依赖注入）**：`AbstractAutowireCapableBeanFactory.populateBean()` 阶段，容器根据 `BeanDefinition` 中记录的依赖关系，通过 `@Autowired`（`AutowiredAnnotationBeanPostProcessor`）、`@Resource`（`CommonAnnotationBeanPostProcessor`）或 XML 配置完成属性注入。
4. **Aware 回调**：按固定顺序回调 Aware 接口——`BeanNameAware.setBeanName()` → `BeanClassLoaderAware.setBeanClassLoader()` → `BeanFactoryAware.setBeanFactory()`。如果是 `ApplicationContext` 环境，还会通过 `ApplicationContextAwareProcessor`（一个 `BeanPostProcessor`）回调 `EnvironmentAware` → `EmbeddedValueResolverAware` → `ResourceLoaderAware` → `ApplicationEventPublisherAware` → `MessageSourceAware` → `ApplicationContextAware`。
5. **BeanPostProcessor.postProcessBeforeInitialization()**：所有注册的 `BeanPostProcessor` 依次执行前置处理。`@PostConstruct` 就是在这一步被 `CommonAnnotationBeanPostProcessor`（它实现了 `BeanPostProcessor`）识别并调用的。
6. **初始化**：依次执行——`InitializingBean.afterPropertiesSet()`（接口回调）→ 自定义 `init-method`（XML 中 `init-method` 属性或 `@Bean(initMethod="xxx")`）。注意 `@PostConstruct` 虽然语义是初始化，但它在上一步就已经执行了，优先级高于 `afterPropertiesSet()`。
7. **BeanPostProcessor.postProcessAfterInitialization()**：所有 `BeanPostProcessor` 依次执行后置处理。**AOP 代理就是在这一步生成的**——`AbstractAutoProxyCreator`（如 `AnnotationAwareAspectJAutoProxyCreator`）在这个回调里判断 Bean 是否需要增强，如果需要就用 JDK 动态代理或 CGLIB 创建代理对象并返回代理替代原始 Bean。
8. **使用**：Bean 被应用程序正常使用。
9. **销毁**：容器关闭时依次执行——`@PreDestroy`（由 `CommonAnnotationBeanPostProcessor` 处理）→ `DisposableBean.destroy()` → 自定义 `destroy-method`。

45. Spring 如何用三级缓存解决循环依赖？
答：三级缓存定义在 `DefaultSingletonBeanRegistry` 中：

- **singletonObjects（一级缓存）**：`Map<String, Object>`，存放**完全初始化好的单例 Bean**，是最终可用的缓存。
- **earlySingletonObjects（二级缓存）**：`Map<String, Object>`，存放**早期暴露的 Bean 引用**（可能已经被 AOP 代理包装过）。
- **singletonFactories（三级缓存）**：`Map<String, ObjectFactory<?>>`，存放**能够生成早期 Bean 引用的 ObjectFactory**（lambda/匿名类），需要时调用 `getObject()` 创建早期引用。

完整流程（以 A 依赖 B、B 依赖 A 为例）：
1. 容器开始创建 A → 调用构造器实例化 A（此时 A 是半成品，属性还没填充）。
2. A 实例化后，容器将一个 `ObjectFactory`（`() -> getEarlyBeanReference(beanName, mbd, bean)`）放入**三级缓存** `singletonFactories`。
3. A 进入属性填充阶段，发现需要注入 B → 触发 B 的创建。
4. 容器开始创建 B → 实例化 B → B 放入三级缓存 → B 进入属性填充，发现需要 A。
5. 去缓存中找 A：一级缓存没有 → 二级缓存没有 → **三级缓存找到 A 的 ObjectFactory** → 调用 `getObject()`，如果 A 需要 AOP 代理则此时创建代理对象，否则返回原始 A 引用。
6. 将得到的 A 早期引用放入**二级缓存** `earlySingletonObjects`，同时从三级缓存移除。
7. B 拿到 A 的早期引用 → B 完成属性填充 → B 完成初始化 → B 从二级/三级缓存移入**一级缓存** `singletonObjects`。
8. 回到 A → A 拿到 B 的完整实例 → A 完成属性填充 → A 完成初始化 → A 移入一级缓存。

46. 为什么需要三级缓存而不是两级就够了？
答：两级缓存（一级存完成品、二级存半成品）看似能解决循环依赖，但无法处理 AOP 代理的问题。Spring 的设计原则是：**AOP 代理应该在 `BeanPostProcessor.postProcessAfterInitialization()` 阶段才创建**，即尽量延迟代理创建时机。如果只用两级缓存，就必须在 Bean 实例化后立刻判断是否需要代理并提前创建，这会打破 `BeanPostProcessor` 的标准生命周期流程。三级缓存通过 `ObjectFactory` 实现了**延迟决策**：只有当其他 Bean 真正需要引用这个早期 Bean 时，才通过 `ObjectFactory.getObject()` 去判断是否需要提前创建代理。如果没有循环依赖，`ObjectFactory` 永远不会被调用，AOP 代理仍然在正常的 `postProcessAfterInitialization()` 阶段创建。

47. 为什么构造器注入无法解决循环依赖？
答：因为构造器注入要求在**实例化阶段**（调用构造器时）就提供所有依赖对象。此时 Bean 还没有被创建出来，也就无法放入任何缓存（三级缓存的前提是对象已经实例化但还未填充属性）。A 的构造器需要 B → B 还没创建 → 去创建 B → B 的构造器需要 A → A 还没创建完毕也不在缓存中 → 死锁。Spring 会直接抛出 `BeanCurrentlyInCreationException`。解决方式：用 `@Lazy` 注解让其中一个依赖变成懒加载代理，或者重构设计消除循环。

---

## 十六、AOP 实现原理

48. JDK 动态代理的原理是什么？
答：JDK 动态代理基于**接口**。运行时通过 `java.lang.reflect.Proxy.newProxyInstance(ClassLoader, Class<?>[] interfaces, InvocationHandler)` 生成一个实现了目标所有接口的代理类（`$Proxy0`、`$Proxy1` 等）。当调用代理对象的任何接口方法时，都会被转发到 `InvocationHandler.invoke(Object proxy, Method method, Object[] args)` 方法中。在 Spring 里，这个 `InvocationHandler` 就是 `JdkDynamicAopProxy`（它实现了 `InvocationHandler`），内部持有 `AdvisedSupport`，会遍历所有匹配的增强器（`Advisor`）组成拦截器链（`MethodInterceptor` chain），按顺序执行增强逻辑。限制：**目标类必须实现接口**，代理类只能拦截接口中定义的方法。

49. CGLIB 代理的原理是什么？
答：CGLIB 基于**继承**。通过 `net.sf.cglib.proxy.Enhancer` 在运行时动态生成目标类的**子类**，重写父类的非 `final` 方法。当调用代理对象的方法时，会被 `MethodInterceptor.intercept(Object obj, Method method, Object[] args, MethodProxy methodProxy)` 拦截。在 Spring 里对应的实现是 `CglibAopProxy` 内部的 `DynamicAdvisedInterceptor`。CGLIB 使用 ASM 字节码框架直接生成 `.class` 字节码，不需要目标类实现接口。`MethodProxy` 提供了 `invokeSuper()` 方法用于调用原始目标方法，性能优于反射调用。

50. Spring 选择 JDK 代理还是 CGLIB 代理的策略是什么？
答：
- 如果目标类**实现了至少一个接口** → 默认使用 JDK 动态代理。
- 如果目标类**没有实现任何接口** → 只能使用 CGLIB。
- **Spring Boot 2.x 开始**，默认设置 `spring.aop.proxy-target-class=true`，即**强制使用 CGLIB 代理**，即使目标类实现了接口也用 CGLIB。这样做的原因是避免注入时因为类型不匹配导致 `BeanNotOfRequiredTypeException`（JDK 代理生成的是接口类型，不能直接按实现类类型注入）。
- 可以通过 `@EnableAspectJAutoProxy(proxyTargetClass = false)` 或配置 `spring.aop.proxy-target-class=false` 切回 JDK 代理。

51. 为什么 final 方法不能被 AOP 增强？
答：因为 CGLIB 是通过**生成目标类的子类并重写方法**来实现代理的。Java 语言规范中 `final` 方法不能被子类重写，所以 CGLIB 无法对 `final` 方法生成代理逻辑，调用 `final` 方法时会直接执行原始方法而绕过所有切面。同理，`final` 类不能被继承，CGLIB 无法为其创建代理，Spring 会抛异常或回退。JDK 动态代理不受 `final` 影响（因为它基于接口生成新类而非继承目标类），但接口中的方法本身不可能是 `final` 的。`static` 方法和 `private` 方法同样无法被 AOP 增强，原因类似。

52. Spring AOP 中切面通知的执行顺序是什么？
答：对于单个切面内的通知，执行顺序如下（以正常执行为例）：

```
@Around 前半部分（proceed() 之前的代码）
  → @Before
    → 目标方法执行
  → @AfterReturning（正常返回时执行；如果抛异常则执行 @AfterThrowing）
  → @After（无论正常还是异常都执行，类似 finally）
→ @Around 后半部分（proceed() 之后的代码）
```

异常场景：目标方法抛异常 → `@AfterThrowing` 替代 `@AfterReturning` → `@After` 仍然执行 → 异常传播到 `@Around` 的 `proceed()` 调用处。注意在 Spring 5.2.7+ 中，`@After` 的执行时机调整为在 `@AfterReturning`/`@AfterThrowing` **之后**（之前版本中 `@After` 可能在 `@AfterReturning` 之前执行）。

53. 多个切面之间的执行顺序是怎样的？
答：多个切面遵循**洋葱模型**（先进后出）。通过 `@Order(value)` 注解或实现 `Ordered` 接口指定优先级，**值越小优先级越高**。假设有两个切面 A（`@Order(1)`）和 B（`@Order(2)`）：

```
A @Around 前半 → A @Before
  → B @Around 前半 → B @Before
    → 目标方法
  → B @AfterReturning → B @After → B @Around 后半
→ A @AfterReturning → A @After → A @Around 后半
```

优先级高的切面在外层，先执行前置逻辑、后执行后置逻辑；优先级低的切面在内层，后执行前置逻辑、先执行后置逻辑。跟 Koa 中间件的洋葱模型是同一个思路。

---

## 十七、@Transactional 完整机制

54. Spring 事务的 7 种传播行为分别是什么？
答：传播行为定义在 `org.springframework.transaction.annotation.Propagation` 枚举中：

| 传播行为 | 含义 | 典型场景 |
|---------|------|---------|
| **REQUIRED**（默认） | 当前有事务就加入，没有就新建 | 绝大多数业务方法 |
| **REQUIRES_NEW** | 无论当前是否有事务，都新建一个独立事务，**挂起**外层事务 | 审计日志、操作记录（即使外层回滚，日志也要保存） |
| **NESTED** | 在当前事务内创建一个**嵌套事务**（基于 JDBC `Savepoint`）。外层回滚则嵌套也回滚；嵌套回滚不影响外层（外层可以 catch 嵌套的异常继续执行） | 批量操作中单条失败不影响整体 |
| **SUPPORTS** | 有事务就加入，没有就以非事务方式执行 | 只读查询（有事务就保证一致性读，没有也无所谓） |
| **NOT_SUPPORTED** | 挂起当前事务，以非事务方式执行 | 某些不需要事务保护且耗时较长的操作 |
| **MANDATORY** | 必须在已有事务中执行，否则抛 `IllegalTransactionStateException` | 强制要求调用方已开启事务 |
| **NEVER** | 必须在非事务环境执行，如果当前有事务就抛 `IllegalTransactionStateException` | 明确不允许在事务中调用的方法 |

重点区分 `REQUIRES_NEW` 和 `NESTED`：`REQUIRES_NEW` 是两个**完全独立的事务**，外层挂起，内层有自己的 `Connection`；`NESTED` 共用同一个事务和 `Connection`，只是通过 `Savepoint` 实现部分回滚。

55. Spring 事务的隔离级别有哪些？
答：定义在 `org.springframework.transaction.annotation.Isolation` 枚举中：

- **DEFAULT**：使用底层数据库的默认隔离级别（MySQL InnoDB 默认是 `REPEATABLE_READ`，PostgreSQL 默认是 `READ_COMMITTED`）。
- **READ_UNCOMMITTED**：允许读未提交数据（脏读），几乎不会在生产使用。
- **READ_COMMITTED**：只能读已提交数据，避免脏读，但可能出现不可重复读。
- **REPEATABLE_READ**：同一事务内多次读取同一数据结果一致，避免不可重复读，但可能出现幻读（MySQL InnoDB 通过 MVCC + Next-Key Lock 在此级别也基本避免了幻读）。
- **SERIALIZABLE**：最高隔离级别，事务串行执行，避免所有并发问题，但性能最差。

实际使用时通过 `@Transactional(isolation = Isolation.READ_COMMITTED)` 指定。Spring 最终会调用 `Connection.setTransactionIsolation(int level)` 设置到 JDBC 连接上。

56. rollbackFor 的默认行为是什么？这里有什么常见坑？
答：**默认情况下，`@Transactional` 只在抛出 `RuntimeException`（即 unchecked exception）和 `Error` 时才回滚，抛出 checked Exception（如 `IOException`、`SQLException`、自定义业务异常继承 `Exception`）时不回滚！** 这是 Spring 事务最常见的坑之一。很多人写了 `@Transactional` 以为万事大吉，结果业务方法抛了一个 checked exception，事务正常提交，数据不一致。解决方式：显式指定 `@Transactional(rollbackFor = Exception.class)` 覆盖所有异常类型。阿里巴巴 Java 开发手册也强制要求这么写。底层原理：`RuleBasedTransactionAttribute.rollbackOn(Throwable ex)` 默认实现是 `(ex instanceof RuntimeException || ex instanceof Error)`。

57. @Transactional 底层是怎么实现的？
答：完整链路如下：

1. **AOP 切面**：`@Transactional` 注解被 `TransactionInterceptor`（实现了 `MethodInterceptor`）拦截。`TransactionInterceptor` 是一个 AOP 增强器，由 `ProxyTransactionManagementConfiguration` 或 `<tx:annotation-driven/>` 注册。
2. **解析事务属性**：`TransactionInterceptor.invoke()` → `TransactionAspectSupport.invokeWithinTransaction()` → 通过 `TransactionAttributeSource`（默认 `AnnotationTransactionAttributeSource`）解析方法上的 `@Transactional` 注解，得到传播行为、隔离级别、超时时间、rollbackFor 等属性。
3. **获取事务管理器**：根据 `@Transactional(transactionManager="xxx")` 或默认的 `PlatformTransactionManager` Bean。对于 JDBC 场景就是 `DataSourceTransactionManager`。
4. **开启事务**：`PlatformTransactionManager.getTransaction(TransactionDefinition)` → `DataSourceTransactionManager.doBegin()` → 从 `DataSource` 获取 `Connection` → `Connection.setAutoCommit(false)` → 将 `Connection` 绑定到 `TransactionSynchronizationManager`（基于 `ThreadLocal`）。
5. **执行业务方法**：调用目标方法。
6. **提交或回滚**：方法正常返回 → `PlatformTransactionManager.commit()` → `Connection.commit()`；方法抛出符合回滚规则的异常 → `PlatformTransactionManager.rollback()` → `Connection.rollback()`。
7. **清理**：释放 `Connection`、清除 `ThreadLocal` 中的事务同步资源。

58. @Transactional 失效的 8 种场景及其具体原因？
答：

1. **方法非 public**：Spring 事务默认通过 AOP 代理实现。`AbstractFallbackTransactionAttributeSource.computeTransactionAttribute()` 中明确检查 `Modifier.isPublic(method.getModifiers())`，非 public 方法直接返回 null，不创建事务。CGLIB 虽然技术上能代理 protected 方法，但 Spring 事务框架层面做了限制。
2. **同类自调用（this.method()）**：调用没有经过代理对象，而是直接在原始对象上调用。AOP 增强逻辑只存在于代理对象中，`this` 指向的是原始对象，所以事务切面不会触发。解决方式：注入自身代理（`@Lazy` + `@Autowired`）、使用 `AopContext.currentProxy()` 获取代理对象、或将方法抽到另一个 Bean。
3. **异常被 catch 吞掉**：方法内部 `try-catch` 捕获了异常但没有重新抛出。`TransactionInterceptor` 在 `invokeWithinTransaction()` 中通过 `completeTransactionAfterThrowing()` 判断是否回滚，如果没有异常传播出来，框架认为方法正常完成，执行 `commit`。
4. **rollbackFor 未覆盖 checked 异常**：方法声明抛出 checked exception（如 `throws BusinessException extends Exception`），但没有配置 `rollbackFor = Exception.class`，默认只对 `RuntimeException` 和 `Error` 回滚。
5. **数据库引擎不支持事务**：MySQL 的 MyISAM 引擎不支持事务，即使 Spring 层面开启了事务，数据库也不会有事务行为。必须使用 InnoDB 引擎。
6. **REQUIRES_NEW 传播行为下异常未正确处理**：内层方法用 `REQUIRES_NEW` 开了新事务并抛出异常，外层方法如果没有 catch 这个异常，会导致外层事务也一起回滚。如果外层 catch 了但忘记处理事务状态，也可能出现意外行为。
7. **多数据源下事务管理器配错**：项目有多个 `DataSource` 和对应的 `DataSourceTransactionManager`，`@Transactional` 默认使用 primary 事务管理器。如果方法操作的是第二个数据源但没有指定 `@Transactional(transactionManager = "secondTm")`，事务管理器管的连接和实际执行 SQL 的连接不是同一个，事务无效。
8. **Bean 未被 Spring 管理**：对象是通过 `new` 手动创建的，不是从容器获取的。没有代理包装，AOP 切面不存在，`@Transactional` 只是普通注解没有任何运行时效果。

---

## 十八、Spring Boot 自动装配原理

59. @SpringBootApplication 注解到底包含什么？
答：`@SpringBootApplication` 是一个组合注解，等价于同时标注了三个注解：

- **@SpringBootConfiguration**（本质就是 `@Configuration`）：表示当前类是一个配置类，可以定义 `@Bean` 方法。
- **@EnableAutoConfiguration**：启用自动装配机制，这是自动装配的核心入口。
- **@ComponentScan**：默认扫描当前类所在包及其子包下所有 `@Component`/`@Service`/`@Repository`/`@Controller` 等注解标注的类，注册为 Bean。

这就是为什么 Spring Boot 主启动类通常放在项目根包下——`@ComponentScan` 默认扫描范围是主类所在包及其子包。

60. @EnableAutoConfiguration 的核心机制是什么？
答：`@EnableAutoConfiguration` 上标注了 `@Import(AutoConfigurationImportSelector.class)`。`AutoConfigurationImportSelector` 实现了 `DeferredImportSelector` 接口（`ImportSelector` 的子接口，延迟到所有 `@Configuration` 类处理完之后再执行，确保用户自定义配置优先）。

核心流程：
1. `AutoConfigurationImportSelector.getAutoConfigurationEntry()` 被调用。
2. 调用 `getCandidateConfigurations()` → 通过 `ImportCandidates.load()` 读取 classpath 下所有 JAR 包中的自动配置类列表：
   - **Spring Boot 3.x**：读取 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件（每行一个全限定类名）。
   - **Spring Boot 2.x**：读取 `META-INF/spring.factories` 文件中 `org.springframework.boot.autoconfigure.EnableAutoConfiguration` 键对应的值。
3. 获取到所有候选自动配置类（通常有 **100~150 个**）。
4. **去重**：移除重复的配置类。
5. **排除**：移除 `@SpringBootApplication(exclude=...)` 或 `spring.autoconfigure.exclude` 配置指定的类。
6. **过滤**：通过 `AutoConfigurationImportFilter`（如 `OnClassCondition`）做初步过滤，classpath 中没有相关类的配置直接跳过，避免加载无用配置类。
7. 剩余的配置类进入容器，由各自的 `@Conditional` 注解做最终的条件判断。

61. @Conditional 条件装配的核心注解有哪些？怎么工作的？
答：`@Conditional` 是 Spring Framework 4.0 引入的底层注解，Spring Boot 在其上封装了大量语义化条件注解：

- **@ConditionalOnClass(DataSource.class)**：当 classpath 中存在 `DataSource` 类时，这个配置类才生效。底层通过 `OnClassCondition` 做类加载检测。
- **@ConditionalOnMissingBean(DataSource.class)**：当容器中**不存在** `DataSource` 类型的 Bean 时才注册。这是"约定优于配置"的核心——框架提供默认实现，但用户自定义的永远优先。
- **@ConditionalOnProperty(prefix = "spring.datasource", name = "url")**：当配置文件中存在 `spring.datasource.url` 属性时才生效。
- **@ConditionalOnBean**：当容器中存在某个 Bean 时才生效。
- **@ConditionalOnMissingClass**：当 classpath 中不存在某个类时才生效。
- **@ConditionalOnWebApplication / @ConditionalOnNotWebApplication**：根据是否是 Web 应用环境决定。
- **@ConditionalOnExpression**：基于 SpEL 表达式的条件判断。

举一个完整例子——`DataSourceAutoConfiguration` 的工作逻辑：
1. `@ConditionalOnClass({ DataSource.class, EmbeddedDatabaseType.class })`：classpath 中必须有 JDBC 相关类（引入了 `spring-boot-starter-jdbc` 或数据库驱动）。
2. `@ConditionalOnMissingBean(type = "io.r2dbc.spi.ConnectionFactory")`：没有使用响应式数据库连接。
3. 内部通过 `@Import` 导入 `DataSourceConfiguration`，其中又有 `@ConditionalOnClass(HikariDataSource.class)` + `@ConditionalOnMissingBean(DataSource.class)` → 如果用户没自定义 `DataSource`，且 classpath 有 HikariCP，就自动配置 Hikari 连接池。

62. 自动装配出问题时怎么排查？
答：
1. **启动时加 `--debug` 参数**：`java -jar app.jar --debug`，或在 `application.properties` 中设置 `debug=true`。Spring Boot 会打印完整的自动配置报告：
   - **Positive matches**：哪些自动配置类生效了，以及匹配了哪些条件。
   - **Negative matches**：哪些自动配置类没生效，以及哪个条件不满足。
   - **Exclusions**：被排除的自动配置类。
   - **Unconditional classes**：无条件加载的配置类。
2. **精确调试某个自动配置**：设置 `logging.level.org.springframework.boot.autoconfigure=DEBUG`。
3. **Actuator 端点**：引入 `spring-boot-starter-actuator` 后访问 `/actuator/conditions`（需要暴露该端点），可以在运行时查看所有条件评估结果。
4. **常见排查思路**：Bean 没注册 → 看 Negative matches 哪个条件不满足 → 通常是缺少依赖（`OnClassCondition` 不满足）、已有同类型 Bean（`OnMissingBeanCondition` 不满足）、或配置属性未设置（`OnPropertyCondition` 不满足）。
