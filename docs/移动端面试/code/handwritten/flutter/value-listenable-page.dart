import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class CounterPage extends StatelessWidget {
  CounterPage({super.key});

  final ValueNotifier<int> counter = ValueNotifier<int>(0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(
        child: ValueListenableBuilder<int>(
          valueListenable: counter,
          child: const Text('static child'),
          builder: (context, value, child) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('count: $value'),
                if (child != null) child,
              ],
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => counter.value += 1,
        child: const Icon(Icons.add),
      ),
    );
  }
}

/*
面试讲解点：
1. 这题本质是在写最小 ValueListenableBuilder 页面。
2. 官方文档强调 child 可用于承接不依赖值的子树，减少每次 value 变化时的重复重建。
3. 这题很适合讲“为什么单值状态不一定要上重型状态管理”。
*/
