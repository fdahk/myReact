/*
 * 实现目标：
 * - 提供一个基于 `IntersectionObserver` 的图片懒加载示例，只在图片进入视口时再加载真实资源。
 * - 通过最小实现说明现代浏览器里懒加载的推荐思路，而不是手写滚动监听和位置计算。
 *
 * 核心思路：
 * - 先选中带有 `data-src` 的图片节点，把真实地址暂存在自定义属性中。
 * - 为这些节点统一注册观察器，当图片进入可视区域时再把 `data-src` 赋给 `src`。
 * - 图片加载任务下发后立刻取消观察，避免重复处理。
 *
 * 复杂度 / 运行特征：
 * - 初始化注册观察目标是 O(n)。
 * - 可见性判断由浏览器底层调度，相比手动监听滚动更省事件处理和布局计算成本。
 *
 * 易错点：
 * - 如果没有占位尺寸，图片真正加载时可能造成页面布局抖动。
 * - 需要注意同一图片不要被重复赋值和重复观察。
 * - 部分旧环境不支持 `IntersectionObserver`，真实项目可能需要降级方案。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲首屏优化、资源延迟加载、浏览器观察器 API 的使用方式。
 * - 面试里可以继续扩展到预加载阈值、占位图、骨架屏以及原生 `loading="lazy"` 的取舍。
 */

function observeImages(selector = 'img[data-src]') {
  const images = document.querySelectorAll(selector);

  // entries表示所有被观察的元素，每个元素都有一个isIntersecting属性，表示是否进入可视区
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const image = entry.target;
      // 命中可视区后再把真实地址写回 src，触发实际资源请求。
      image.src = image.dataset.src;
      observer.unobserve(image);
    });
  });

  // 为每个图片注册观察器
  images.forEach((image) => observer.observe(image));
}

// 示例：页面初始化后执行 observeImages();
