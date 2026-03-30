/*
实现目标：
- 手写一个最小版无限滚动监听器，到达底部附近时触发加载更多。
-
核心思路：
- 监听容器滚动事件。
- 通过 `scrollTop + clientHeight >= scrollHeight - threshold` 判断是否接近底部。
- 加一层 `loading` 锁，避免一次到底触发多次重复请求。
-
复杂度 / 运行特征：
- 单次滚动检查为 O(1)。
-
易错点：
- 不加 loading 锁很容易出现重复触发。
- 面试里可以继续追问节流、IntersectionObserver、列表回填位置保持。
-
适用场景 / 面试表达点：
- 常见于信息流、评论区、瀑布流。
*/

function createInfiniteScroll(container, loadMore, threshold = 100) {
  let loading = false;

  async function onScroll() {
    const reachedBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;

    if (!reachedBottom || loading) {
      return;
    }

    loading = true;
    try {
      await loadMore();
    } finally {
      loading = false;
    }
  }

  container.addEventListener('scroll', onScroll);

  return () => {
    container.removeEventListener('scroll', onScroll);
  };
}

export { createInfiniteScroll };
