import 'package:flutter/services.dart';

class NativeAbilityService {
  static const MethodChannel _channel = MethodChannel('app/native');

  Future<String> getDeviceId() async {
    final result = await _channel.invokeMethod<String>('getDeviceId');
    if (result == null || result.isEmpty) {
      throw PlatformException(
        code: 'EMPTY_RESULT',
        message: 'Device id is empty',
      );
    }
    return result;
  }
}

/*
面试讲解点：
1. 这题本质是在手写最小 Platform Channel 封装。
2. 页面不应该到处直接写 invokeMethod，更不应该到处手搓错误处理。
3. 真项目里要继续补能力检测、参数对象、错误码映射、超时、日志和版本兼容。
*/
