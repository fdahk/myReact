import 'dart:async';

import 'package:flutter/services.dart';

class NativeEventService {
  static const EventChannel _channel = EventChannel('app/native_events');

  StreamSubscription<dynamic>? _subscription;

  void listen(void Function(dynamic event) onEvent) {
    _subscription = _channel.receiveBroadcastStream().listen(onEvent);
  }

  Future<void> dispose() async {
    await _subscription?.cancel();
    _subscription = null;
  }
}

/*
面试讲解点：
1. 这题本质是在手写最小 EventChannel 事件订阅层。
2. 它和 MethodChannel 的差别不只是 API，不同点在于它更适合持续事件流而不是单次调用。
3. 真项目里要继续补错误流、订阅时机、页面销毁释放和宿主版本兼容。
*/
