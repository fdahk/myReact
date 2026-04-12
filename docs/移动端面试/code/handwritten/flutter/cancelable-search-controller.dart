import 'dart:async';

class CancelableSearchController {
  int _requestId = 0;

  Future<String?> search(Future<String> Function() task) async {
    _requestId += 1;
    final currentId = _requestId;

    final result = await task();
    if (currentId != _requestId) {
      return null;
    }

    return result;
  }

  void cancel() {
    _requestId += 1;
  }
}

/*
面试讲解点：
1. 这题本质是在 Flutter 搜索页或会话切换里做“旧结果失效”控制。
2. 核心状态不是 Future 本身，而是 requestId。
3. 这不一定能真正中断底层网络请求，但足够避免旧结果污染 UI。
4. 真项目里要继续讲 Dio cancel token、页面 dispose 和错误处理。
*/
