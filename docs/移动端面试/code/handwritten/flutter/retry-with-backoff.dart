import 'dart:async';

Future<T> retryWithBackoff<T>(
  Future<T> Function() task, {
  int retries = 3,
  Duration baseDelay = const Duration(milliseconds: 300),
}) async {
  var attempt = 0;
  Object? lastError;

  while (attempt <= retries) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt == retries) {
        break;
      }

      final delay = baseDelay * (1 << attempt);
      await Future.delayed(delay);
      attempt += 1;
    }
  }

  throw lastError!;
}

/*
面试讲解点：
1. 这题本质是在 Flutter 弱网场景里写最小重试器。
2. Future.delayed 这里只是调度等待，不代表自动解决幂等问题。
3. 真项目里要继续讲抖动 jitter、可取消、不可重试请求过滤和日志上报。
*/
