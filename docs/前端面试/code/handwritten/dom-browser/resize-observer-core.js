/*
实现目标：
- 手写一个最小版 `ResizeObserver` 使用封装，监听元素尺寸变化。
-
核心思路：
- 创建原生 `ResizeObserver` 实例。
- 目标元素尺寸变化时执行回调，并把尺寸信息传给调用方。
- 这比频繁监听 `window.resize` 更适合组件级尺寸感知。
-
复杂度 / 运行特征：
- 单次注册近似 O(1)，真实观察成本由浏览器内部处理。
-
易错点：
- `ResizeObserver` 监听的是元素尺寸，不是视口可见性。
- 面试里常和 `MutationObserver`、`IntersectionObserver` 做职责对比。
*/

function observeResize(element, onResize) {
  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      onResize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
  });

  observer.observe(element);

  return () => observer.disconnect();
}

export { observeResize };
