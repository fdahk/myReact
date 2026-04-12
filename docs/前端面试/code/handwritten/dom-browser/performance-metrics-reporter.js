/*
实现目标：
- 统计“第一个元素渲染完成时间”和“八个元素全部渲染完成时间”。

核心思路：
- 页面开始时间取 `performance.now()`。
- 每个元素渲染完成时调用 `markRendered(index)`。
- 第一次命中记录 first paint，自增计数到 8 时记录 all paint。
*/

function createRenderMetricsReporter(total = 8) {
  const start = performance.now();
  let firstRenderedAt = null;
  let renderedCount = 0;
  const renderedSet = new Set();

  return {
    markRendered(index) {
      if (renderedSet.has(index)) return;
      renderedSet.add(index);
      renderedCount += 1;

      if (firstRenderedAt === null) {
        firstRenderedAt = performance.now() - start;
        console.log('first element rendered in:', firstRenderedAt);
      }

      if (renderedCount === total) {
        const allRenderedAt = performance.now() - start;
        console.log('all elements rendered in:', allRenderedAt);
      }
    },
  };
}

const reporter = createRenderMetricsReporter(8);
reporter.markRendered(0);
