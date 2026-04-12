import 'package:flutter/material.dart';

class KeepAliveItem extends StatefulWidget {
  const KeepAliveItem({super.key});

  @override
  State<KeepAliveItem> createState() => _KeepAliveItemState();
}

class _KeepAliveItemState extends State<KeepAliveItem>
    with AutomaticKeepAliveClientMixin<KeepAliveItem> {
  final TextEditingController controller = TextEditingController();

  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return TextField(controller: controller);
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}

/*
面试讲解点：
1. 这题本质是在 lazy list 中保留 item 状态。
2. 官方文档要求 build 里调用 super.build(context)，并在 wantKeepAlive 变化时调用 updateKeepAlive()。
3. 很适合讲 Tab、长列表、输入框状态为什么会在滑出屏幕后丢失。
*/
