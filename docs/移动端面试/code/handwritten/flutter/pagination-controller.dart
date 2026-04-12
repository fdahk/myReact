class PaginationController<T> {
  PaginationController({
    required this.loader,
  });

  final Future<List<T>> Function(int page) loader;

  final List<T> items = [];
  int _page = 1;
  bool isLoading = false;
  bool hasMore = true;

  Future<void> loadMore() async {
    if (isLoading || !hasMore) {
      return;
    }

    isLoading = true;
    final data = await loader(_page);
    items.addAll(data);
    _page += 1;
    hasMore = data.isNotEmpty;
    isLoading = false;
  }

  void reset() {
    items.clear();
    _page = 1;
    hasMore = true;
    isLoading = false;
  }
}

/*
面试讲解点：
1. 这题本质是在写最小分页控制器。
2. 核心状态是当前页、items、isLoading、hasMore。
3. 真项目里要继续补错误处理、请求取消、并发防抖、刷新与翻页合并、游标分页等能力。
*/
