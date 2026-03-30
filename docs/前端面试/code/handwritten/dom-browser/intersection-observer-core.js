/*
实现目标：
- 手写一个最小版 `IntersectionObserver` 使用封装，理解视口相交检测的核心用法。
-
核心思路：
- 创建原生 `IntersectionObserver` 实例。
- 目标元素进入可视区时执行回调，并可按需停止观察。
- 这种方式比手写滚动监听更适合懒加载和曝光上报。
-
复杂度 / 运行特征：
- 单次观察注册近似 O(1)，真实检测由浏览器内部优化处理。
-
易错点：
- 这道题重点通常不是“自己实现浏览器底层观察器”，而是“如何封装和正确使用”。
- 如果面试官追问底层原理，再展开到浏览器布局计算与阈值判断。
-
适用场景 / 面试表达点：
- 常见于图片懒加载、元素曝光埋点、无限滚动哨兵节点。
*/

function observeVisibility(element, onVisible, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onVisible(entry);

        if (options.once) {
          observer.unobserve(element);
        }
      }
    });
  }, options);

  observer.observe(element);

  return () => observer.disconnect();
}

export { observeVisibility };
