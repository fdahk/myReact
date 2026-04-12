import 'dart:async';

class EventBus<T> {
  final StreamController<T> _controller = StreamController<T>.broadcast();

  Stream<T> get stream => _controller.stream;

  void emit(T event) {
    _controller.add(event);
  }

  Future<void> dispose() {
    return _controller.close();
  }
}

/*
面试讲解点：
1. 这题本质是在手写最小 broadcast 事件总线。
2. 官方文档强调 broadcast stream 支持多监听者，但没有监听者时不会缓存事件。
3. 真项目里要继续补事件类型划分、错误流、订阅释放和历史事件缓存策略。
*/
