import 'package:flutter/foundation.dart';

Future<List<int>> parseIdsInBackground(List<String> rawIds) {
  return compute(_parseIds, rawIds);
}

List<int> _parseIds(List<String> rawIds) {
  return rawIds.map(int.parse).toList();
}

/*
面试讲解点：
1. 这题本质是在封装最小 compute() 用法。
2. Flutter 官方文档说明 compute 会把较长时间的任务放到后台执行；在原生平台上会跑到独立 isolate，在 web 上则仍跑在当前 event loop。
3. 很适合拿来解释“为什么不是所有 Future 都能避免卡顿”“什么情况下应该上 isolate”。
*/
