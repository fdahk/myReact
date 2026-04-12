import 'dart:async';

class Cubit<State> {
  // 构造函数接收一个初始状态。
  // 语法 `Cubit(this._state);` 是 Dart 的简写构造函数，
  // 含义等价于：
  // Cubit(State initialState) {
  //   _state = initialState;
  // }
  Cubit(this._state);

  // 当前状态保存在私有字段里。
  State _state;

  // 这里用 broadcast stream，是为了允许多个监听者同时订阅状态变化。
  // 例如：页面 UI、日志层、调试工具都可能同时关心状态流。
  final StreamController<State> _controller =
      StreamController<State>.broadcast();

  // getter：对外暴露当前状态，但不允许外部直接改私有字段。
  State get state => _state;

  // 对外暴露状态流，供页面或其它层订阅。
  Stream<State> get stream => _controller.stream;

  void emit(State nextState) {
    // 这里做一个非常常见的状态去重。
    // 如果新旧状态相等，就没必要继续广播。
    if (_state == nextState) {
      return;
    }

    // 先更新内部状态，再把新状态发到 stream 上。
    // 这个顺序很重要：这样订阅者拿到的事件和当前 state 始终一致。
    _state = nextState;
    _controller.add(_state);
  }

  Future<void> close() async {
    // 关闭 streamController，释放资源。
    // `Future<void>` 表示这是一个异步函数，但没有返回具体值。
    await _controller.close();
  }
}

class CounterCubit extends Cubit<int> {
  // 这里把初始状态设为 0。
  CounterCubit() : super(0);

  // Cubit 的一个设计特点是：
  // 用户意图通常直接表现为方法，而不是先抽象成 event。
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}

/*
面试讲解点：
1. 这题本质是在手写最小 Cubit：内部持有当前 state，并通过 stream 对外广播状态变化。
2. Cubit 相比 Bloc 少了一层 Event -> State 的映射，更适合直接由方法表达用户意图。
3. 核心职责有 3 个：保存当前状态、派发新状态、提供订阅出口。
4. 真项目里还会继续补错误流、状态去重策略、observer、生命周期和测试支持。

怎么使用：
1. 创建一个 `CounterCubit()`。
2. 通过 `cubit.state` 读取当前值。
3. 通过 `cubit.increment()` / `cubit.decrement()` 触发状态变化。
4. 通过 `cubit.stream.listen(...)` 监听后续状态变化。

为什么这样设计：
1. Cubit 适合“动作很明确、状态流相对简单”的场景。
2. 它把“保存状态”和“广播状态”收在一个对象里，学习成本比 Bloc 低。
3. 但当业务动作很多、状态转换复杂时，往往就需要更显式的 Event 层，也就是 Bloc。
*/
