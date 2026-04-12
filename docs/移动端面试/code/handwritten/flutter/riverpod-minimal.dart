typedef Dispose = void Function();
  // 先说这个类最核心的职责：
  // `ProviderBase<T>` 不是拿来真正保存状态实例的，
  // 它更像“所有 provider 定义对象的共同抽象父类”。
  //
  // 你可以把它理解成一份协议：
  // 1. 任何 provider 子类，都应该能“创建出一个值”
  // 2. 这个值的类型由泛型 `T` 决定
  // 3. 真正的创建过程，需要能够访问 `ProviderContainer`
  //
  // 所以它的职责不是：
  // - 保存 state
  // - 管理缓存
  // - 负责通知 UI
  //
  // 它真正负责的是：
  // - 统一 provider 的抽象形状
  // - 约束子类必须实现 `create(container)`
  // - 让 `ProviderContainer` 可以用统一方式对待不同 provider
abstract class ProviderBase<T> {
  // 这一行不是普通方法，而是构造函数声明：
  //   const ProviderBase();
  // 在 Dart 里：
  // - 写在前面的 `const` / `factory` 是“构造函数修饰符”，不是类型
  //
  // 所以这里的 `const`：
  // - 不是“方法类型”
  // - 不是“返回值类型”
  // - 而是在说“这是一个 const 构造函数”
  const ProviderBase();

  // 这一行是一个“抽象方法声明”：
  //   T create(ProviderContainer container);
  //
  // 从语法设计角度拆开看：
  // 1. `T`
  //    这里的 T 写在方法名前面。
  //    在 Dart 的“方法声明语法”里，方法名前面的类型，具体语义就是“返回值类型”。
  //
  //    这和变量声明要区分开：
  //    - `int count = 1;`
  //      这里 `int` 是变量类型，因为它写在变量名前。
  //
  //    - `int add() => 1;`
  //      这里 `int` 是返回值类型，因为它写在方法名前。
  //
  // 从编译器/解析器视角，你可以这样理解：
  // - 解析器先看到这是类体内部的一条成员声明
  // - 看到 `T create(` 这种结构时，会把它解析成“方法签名”
  // - 因为有类型 + 标识符 + 参数列表，并且后面没有方法体、只有分号
  // - 所以它被识别为“抽象方法声明”
  //
  // 为什么它不会被理解成变量声明？
  // 因为变量声明一般长这样：
  //   T value;或T value = ...;

  T create(ProviderContainer container);
}

// provider会创建出一个provider容器，这个容器会持有provider的实例
class Provider<T> extends ProviderBase<T> {
  // 这里很容易产生一个疑问：
  // “这个 Provider<T> 在当前示例里是不是根本没被用到？”
  //
  // 如果只看下面这行示例：
  //   final counterProvider = StateProvider<int>((_) => 0);
  // 那答案是：
  // - 对，这个最小示例最终真正实例化出来的是 `StateProvider<int>`
  // - 没有直接 new 一个普通 `Provider<T>`
  //
  // 但这不代表 `Provider<T>` 没意义。
  // 它在这份手写题里承担的是“基准层 / 普通 provider 形态”的角色。
  //
  // 你可以把它理解成：
  // 1. `Provider<T>` 表示最普通的依赖定义：
  //    “给我一个创建规则，我最终产出一个普通的 T”
  // 2. `StateProvider<T>` 则是在它的思路上继续往前走一步：
  //    “我不只产出一个普通值，我要产出一个可变状态容器 `StateController<T>`”
  //
  // 所以写 `Provider<T>` 的意义主要有三个：
  //
  // 第一，帮助你看懂 Riverpod 抽象层次
  // - 普通 provider：产出一个普通依赖
  // - state provider：产出一个可变状态容器
  // 这样你就不会把所有 provider 都理解成“状态管理工具”，
  // 因为很多 provider 其实只是依赖定义。
  //
  // 第二，帮助你理解继承关系
  // - `ProviderBase<T>` 是抽象协议
  // - `Provider<T>` 是最基础的具体实现
  // - `StateProvider<T>` 是更偏状态场景的特殊实现
  //
  // 第三，方便和前端状态管理类比
  // - `Provider<T>` 更像“普通依赖 / 普通 store 定义”
  // - `StateProvider<T>` 更像“专门为可变 state 准备的简化封装”
  
  // 这里是 Dart 的“构造函数参数直接赋值给字段”的简写：
  //   const Provider(this._create);
  // 等价于：
  // const Provider(T Function(ProviderContainer container) createFn)
  //     : _create = createFn;
  // 为什么要这样设计：
  // - Provider 本身不直接写死“怎么创建值” 而是把“创建规则”保存下来
  // - 这非常符合 Riverpod 的思想：provider 更像定义，而不是直接持有状态实例
  const Provider(this._create);

  // `final` 表示这个字段一旦在构造时确定，就不再换成别的函数。
  final T Function(ProviderContainer container) _create;

  // `@override` 表示：
  // 这里不是在定义一个全新的独立方法，
  // 而是在“重写父类里已经声明过的方法”。
  // `@override` 的价值：
  // 1. 对人：一眼能看出这是在实现父类协议。
  // 2. 对分析器：如果父类方法签名改了，这里更容易及时报错。
  // 3. 对面试：你也能更清楚地讲“抽象层定义协议，具体子类实现协议”。
  @override
  // - 当前 Provider 的 create 方法不自己展开复杂逻辑
  // - 而是把创建工作委托给前面保存下来的 `_create` 函数
  T create(ProviderContainer container) => _create(container);
}

// `StateController<T>` 是一个很小的“状态盒子”。
// 为什么要额外包一层，而不是直接返回 T？
// 因为这能体现一种很常见的设计思想：
// - “定义 provider” 和 “持有可变状态” 分层
// - 外部拿到的不是裸值，而是一个可以继续修改 `state` 的对象
class StateController<T> {
  StateController(this.state);

  // 这里没有用 final，因为这个 state 就是要允许后续被更新的。
  T state;
}

// stateprovider创建一个受statecontroller管理的state的provider，这个controller会持有state的实例
// `StateProvider<T>` 是在最基础 Provider 之上的一层包装。
// 它和 `Provider<T>` 的主要区别是：
// - Provider<T> 直接产出一个 T
// - StateProvider<T> 产出一个 StateController<T>
// 这样外部就能拿到一个“可变状态容器”。
class StateProvider<T> extends ProviderBase<StateController<T>> {
  const StateProvider(this._create);

  // “`_create` 这个字段里，保存的是一个接收 ProviderContainer、返回 T 的函数。”
  final T Function(ProviderContainer container) _create;

  @override
  StateController<T> create(ProviderContainer container) {
    // 先通过 `_create(container)` 算出初始值 T
    // 再把这个值包装进 StateController<T>
    return StateController<T>(_create(container));
  }
}

// `ProviderContainer` 是这个最小 Riverpod 思路里最关键的对象。
// 它的职责可以概括成一句话：“真正持有 provider 对应实例，并做缓存管理。”
//
// 这也是 Riverpod 和 Provider 很核心的一个差异：
// - Provider 更常把依赖挂在 Widget 树和 BuildContext 上
// - Riverpod 风格更倾向于让容器独立持有依赖
class ProviderContainer {
  // 这里的缓存 Map：
  // - key：provider 定义对象
  // - value：这个 provider 实际创建出来的实例
  //
  // 为什么 key / value 都写得比较宽泛？
  // 因为不同 provider 会产出不同类型，
  // 底层容器必须先用一个统一结构把它们都装起来。
  final Map<ProviderBase<Object?>, Object?> _cache = {};

    // 这不是字段声明，而是“方法声明/方法实现”。
    // 也就是说，这里 `read` 本身就是类的一个方法成员，
    // 所以它直接走“方法声明语法”，不会再写成函数类型。
  T read<T>(ProviderBase<T> provider) {
    // 如果缓存里已经有这个 provider 对应的实例，就直接返回。
    // 这体现了 provider 的一个重要特点：
    // 同一个 provider 在同一个 container 中通常应对应同一份实例，而不是每次都新建。
    if (_cache.containsKey(provider)) {
      return _cache[provider] as T;
    }

    // 如果是第一次读取值，此时调用 provider.create(this) 创建受状态sotre管理的值
    final value = provider.create(this);

    // 创建后缓存起来，后续再次读取直接复用。
    _cache[provider as ProviderBase<Object?>] = value;
    return value;
  }

  void dispose() {
    // 这个最小实现里，dispose 只是简单清空缓存。
    //
    // 真正完整的 Riverpod 还会继续处理：
    // - provider 生命周期
    // - listener 清理
    // - autoDispose
    // - override
    // - family
    // - 依赖失效与重建
    _cache.clear();
  }
}

// 怎么使用：
// 1. 先创建一个 `ProviderContainer()`。
// 2. 调用 `container.read(counterProvider)`。
// 3. 拿到的是 `StateController<int>`，而不是裸的 int。
// 4. 通过 `controller.state` 读取或修改当前状态。

// “定义一个整型状态 provider，初始值是 0”
final counterProvider = StateProvider<int>((_) => 0);

/*
1. 手写Riverpod 思路：Provider 只描述创建规则，真正的实例由 ProviderContainer 持有。
2. 和 Provider 最大的差异之一：状态不直接挂在 BuildContext 上，而是通过独立容器管理依赖和缓存。
3. `Provider<T>` 适合表达“给我一个依赖定义，我能创建出一个 T”；
`StateProvider<T>` 则在这个基础上再套一层 StateController，用来表达“这是可变状态”。
4. 真项目里还会继续补依赖追踪、监听、override、family、autoDispose、异步 provider、错误处理等能力。

这 5 个核心角色怎么相互作用：
1. `ProviderBase<T>` 是抽象基类，作用是统一协议。规定：所有 provider 子类都必须实现 `create(container)`。
2. `Provider<T>` 最基础的 provider 定义对象。自己不保存真正的状态实例，只保存“怎么创建这个值”的规则，也就是 `_create` 函数。
3. `StateController<T>` 状态盒子。负责真正持有可变的 `state`，让外部拿到的不是一个裸值，而是一个可以继续修改的状态容器。
4. `StateProvider<T>` 是基于 `Provider<T>` 的扩展。普通 `Provider<T>` 直接创建一个 `T`；
`StateProvider<T>` 则把这个 `T` 包装进 `StateController<T>`，用来表达“这是一个可变状态来源”。
5. `ProviderContainer` 是运行时容器。前面几个类都更偏“定义规则”，
真正的实例创建、缓存、复用，都发生在 `ProviderContainer` 里。
整个调用链路串起来看：
1. 先定义 provider：
   `final counterProvider = StateProvider<int>((_) => 0);`
   这一步只是定义规则，还没有真正创建状态实例。
2. 再创建容器：
   `final container = ProviderContainer();`
   这一步只是准备好缓存区 `_cache`，也还没有创建实例。
3. 第一次读取：
   `container.read(counterProvider)`
   会进入 `ProviderContainer.read()`。
4. `read()` 先检查缓存：
   如果 `_cache` 里没有这个 provider，就说明这是第一次读。
5. 于是容器调用：
   `provider.create(this)`
   这里传进去的 `this`，就是当前容器自己。
6. 因为 `counterProvider` 的类型是 `StateProvider<int>`，
   所以实际执行的是 `StateProvider<int>.create(container)`。
7. `StateProvider.create()` 内部先执行：
   `_create(container)`
   拿到初始值 `0`。
8. 然后再把这个 `0` 包装成：
   `StateController<int>(0)`
9. 容器拿到这个 `StateController<int>` 后，
   会把它缓存进 `_cache`，形成：
   `counterProvider -> StateController<int>(0)`
10. 下一次再 `read(counterProvider)`，
    容器会先命中缓存，直接返回同一个 `StateController<int>`，
    而不会重新创建一个新的实例。

一句话理解整条关系：
`ProviderBase` 统一协议，`Provider` / `StateProvider` 负责描述怎么创建值
，`StateController` 负责持有可变状态，`ProviderContainer` 负责真正创建、缓存和复用这些实例。


为什么这样设计：
1. Provider 负责“描述”，Container 负责“持有实例”，这是 Riverpod 风格非常核心的设计。
2. 它让依赖管理不再强耦合在 Widget 树上，更利于测试、组合和 override。
3. 这份代码故意只保留最小骨架，目的是帮助你看清 Riverpod 的核心抽象，而不是复刻完整库实现。

1. 它最不像经典 `redux` / `vuex`，因为这里没有单一 root store、没有 reducer、
没有 mutation，也没有固定的 dispatch -> reducer 这条状态流。
2. 它更接近 `zustand` / `pinia` 这类“按 store / provider 定义状态，
再由独立容器或独立实例持有”的思路。
3. 和 `zustand` 相似的地方在于：状态不强依赖组件树上下文，读取入口更像“从外部容器/仓库拿状态”。
4. 和 `pinia` 相似的地方在于：更偏多个独立状态定义组合，而不是一个巨大单仓。
5. 但它又不等于 `zustand` / `pinia`，因为 Riverpod 的核心抽象是 provider 定义
 + container 持有 + 依赖组合，这比普通 store 对象更强调“依赖声明”。
总结：
如果只看这份最小实现，它最像 `zustand + pinia` 这一类“状态定义和状态容器分离”的思路， 
而明显不像 `redux / vuex` 这种强调统一 store 和 action/mutation 流程的方案。


概念辨析：
1. Flutter 原生并没有一个官方叫做“provider”的完整状态管理方案。
2. Flutter 原生有 `InheritedWidget`、`InheritedNotifier`、`ChangeNotifier`、`ValueNotifier` 这些能力。
很多人有时会把这种“祖先向后代提供依赖”的思路口头上叫成 provider，但严格说它们只是框架提供的底层机制
3. 第三方 `provider` 状态管理工具，通常特指 pub 生态里的 `provider` 包。
它本质上是基于 `InheritedWidget` / `InheritedNotifier` / `ChangeNotifier` 
等 Flutter 原生机制做的一层更好用的封装，提供了 `read`、`watch`、`Consumer`、`MultiProvider` 等更顺手的 API。
4. Riverpod 里面的 `provider` 又是另一个概念。
这里的 `provider` 更像“依赖定义对象”或“状态描述对象”，它和第三方 `provider` 包不是同一个东西。Riverpod 的核心思路是：
provider 只负责描述怎么创建依赖，真正的实例由 `ProviderContainer` 或 Flutter 侧的容器体系持有和管理。
5. 所以这三者确实不是一个概念：
   - Flutter 原生：底层依赖传播与通知机制
   - 第三方 `provider` 包：基于 Flutter 原生机制的状态管理工具
   - Riverpod 里的 `provider`：Riverpod 体系里的依赖定义抽象
6. 如果一定要用一句话记：
   - Flutter 原生提供“积木”
   - `provider` 包是“用这些积木搭好的一个常见工具”
   - Riverpod 里的 `provider` 是“另一套工具体系里的核心抽象名词”
*/
