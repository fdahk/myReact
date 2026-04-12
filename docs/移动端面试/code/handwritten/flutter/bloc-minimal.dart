import 'dart:async';

abstract class Bloc<Event, State> {
  // 构造时先拿到初始状态。
  Bloc(this._state) {
    // Bloc 和 Cubit 最大的区别之一是：
    // Cubit 更像“直接发状态”，而 Bloc 更强调“先收 event，再把 event 映射成新 state”。
    //
    // 这里在构造函数里订阅 _eventController.stream，
    // 表示：只要外部 add 了 event，这个 Bloc 就会开始处理事件。
    _eventSubscription = _eventController.stream.listen((event) async {
      // mapEventToState 是这道题的关键抽象：
      // 它表示“给我一个 event 和当前 state，我来算下一个 state”。
      final nextState = await mapEventToState(event, _state);

      // 简单状态去重，避免无意义广播。
      if (nextState == _state) {
        return;
      }

      // 更新内部状态，并向状态流广播。
      _state = nextState;
      _stateController.add(_state);
    });
  }

  State _state;
  // event 流：对外接收用户意图。
  final StreamController<Event> _eventController =
      StreamController<Event>.broadcast();

  // state 流：对外广播最新状态。
  final StreamController<State> _stateController =
      StreamController<State>.broadcast();

  // 保存事件订阅，方便后续 close 时清理。
  late final StreamSubscription<Event> _eventSubscription;

  State get state => _state;
  Stream<State> get stream => _stateController.stream;

  void add(Event event) {
    // 外部不是直接 emit state，而是先 add 一个 event。
    _eventController.add(event);
  }

  // `abstract` 表示这里只定义协议，不给默认实现。
  // 让具体子类自己决定：某个 event 应该怎么变成下一个 state。
  Future<State> mapEventToState(Event event, State currentState);

  Future<void> close() async {
    // close 顺序一般是：
    // 1. 先取消订阅
    // 2. 再关闭 controller
    await _eventSubscription.cancel();
    await _eventController.close();
    await _stateController.close();
  }
}

// `sealed class` 表示这个事件基类的子类集合是可控的，
// 很适合表达“有限种用户意图”。
sealed class CounterEvent {}

class IncrementEvent extends CounterEvent {}

class DecrementEvent extends CounterEvent {}

class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0);

  @override
  Future<int> mapEventToState(CounterEvent event, int currentState) async {
    // 这里用 `is` 做运行时类型判断。
    // Dart 里 `event is IncrementEvent` 表示：如果当前对象是这个类型，就进入对应分支。
    if (event is IncrementEvent) {
      return currentState + 1;
    }

    if (event is DecrementEvent) {
      return currentState - 1;
    }

    return currentState;
  }
}

/*
面试讲解点：
1. 这题本质是在手写最小 Bloc：外部先提交 event，内部再把 event 映射成新的 state。
2. 和 Cubit 的核心差异是：Bloc 把“用户意图”和“状态变更”显式拆成两层，更适合复杂业务流。
3. 这里的最小链路是 add(event) -> mapEventToState -> emit next state。
4. 真项目里还会继续补 transformer、并发 event 处理、错误流、observer、hydration 和测试支持。

怎么使用：
1. 创建一个 `CounterBloc()`。
2. 通过 `bloc.add(IncrementEvent())` 或 `bloc.add(DecrementEvent())` 提交事件。
3. 通过 `bloc.stream.listen(...)` 监听状态流。
4. 通过 `bloc.state` 读取当前状态。

为什么这样设计：
1. Bloc 多了一层 Event，把“用户做了什么”和“状态怎么变”显式拆开。
2. 这样在复杂业务里更容易做日志、审计、并发控制、事件变换和测试。
3. 代价是样板代码会比 Cubit 多，所以它更适合复杂流，而不是所有页面都强上。
*/
