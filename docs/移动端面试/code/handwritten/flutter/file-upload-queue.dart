class UploadQueue {
  UploadQueue({
    required this.concurrency,
  });

  final int concurrency;
  int _running = 0;
  final List<Future<void> Function()> _tasks = [];

  void add(Future<void> Function() task) {
    _tasks.add(task);
    _tryRun();
  }

  void _tryRun() {
    while (_running < concurrency && _tasks.isNotEmpty) {
      final task = _tasks.removeAt(0);
      _running += 1;

      task().whenComplete(() {
        _running -= 1;
        _tryRun();
      });
    }
  }
}

/*
面试讲解点：
1. 这题本质是在 Flutter 端写最小并发上传队列。
2. 核心状态是 running 数量和待执行 tasks 队列。
3. 适合拿来解释分片上传、图片批量上传和后台补传调度。
4. 真项目里要继续讲失败重试、取消、进度汇总和断点续传。
*/
