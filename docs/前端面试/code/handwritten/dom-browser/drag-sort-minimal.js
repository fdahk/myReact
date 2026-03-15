/*
 * 实现目标：
 * - 提供一个最小版拖拽排序示例，通过 HTML5 Drag and Drop API 在容器内重排节点顺序。
 * - 重点展示“识别被拖元素 + 命中目标元素 + 根据鼠标位置决定插入前后”的核心流程。
 *
 * 核心思路：
 * - 在 `dragstart` 时记录当前真正被拖拽的元素。
 * - 在 `dragover` 中阻止默认行为，允许放置，并持续计算鼠标在目标元素中的相对位置。
 * - 根据鼠标位于目标上半区还是下半区，决定把拖拽元素插到目标前面还是后面。
 *
 * 复杂度 / 运行特征：
 * - 单次 DOM 重排操作本身可视为 O(1)，但列表整体重绘成本取决于浏览器布局与节点数量。
 * - 该实现直接操作真实 DOM，适合讲原理，不涉及状态同步和持久化排序结果。
 *
 * 易错点：
 * - `dragover` 不调用 `preventDefault` 时，很多元素默认不能放置。
 * - 目标命中要排除自己，否则会出现无意义的自插入。
 * - 在 React 等框架中，真实 DOM 排序与状态数组排序必须保持一致，否则下一次渲染会回弹。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲原生拖拽 API、列表重排思路、拖拽排序的最小实现。
 * - 面试里可以补充可访问性、拖拽占位样式、大列表性能优化与跨容器拖拽。
 */

function enableDragSort(container) {
  let dragging = null;

  container.addEventListener('dragstart', (event) => {
    // 记录真正被拖拽的可拖元素，而不是内部的子节点。
    dragging = event.target.closest('[draggable="true"]');
  });

  container.addEventListener('dragover', (event) => {
    event.preventDefault();
    const target = event.target.closest('[draggable="true"]');
    if (!dragging || !target || dragging === target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    // 鼠标落在目标元素下半区时，把拖拽项插到目标后面。
    const shouldInsertAfter = event.clientY > rect.top + rect.height / 2;
    container.insertBefore(dragging, shouldInsertAfter ? target.nextSibling : target);
  });
}

// enableDragSort(document.querySelector('#sortable-list'));
