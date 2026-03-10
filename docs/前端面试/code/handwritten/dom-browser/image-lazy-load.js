/*
面试讲解点：图片懒加载
- 题目本质：本质是只在图片进入可视区前后再真正加载资源，减少首屏压力。
- 复杂度：遍历检查通常 O(n)，结合观察器可降低频繁计算成本。
- 易错点：可视区判断、重复加载、滚动节流、占位图。
- 追问方向：可以延伸到 IntersectionObserver 和首屏优化。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function observeImages(selector = 'img[data-src]') {
  const images = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const image = entry.target;
      image.src = image.dataset.src;
      observer.unobserve(image);
    });
  });

  images.forEach((image) => observer.observe(image));
}

// 示例：页面初始化后执行 observeImages();
