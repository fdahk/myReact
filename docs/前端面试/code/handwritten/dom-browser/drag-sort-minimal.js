/*
面试讲解点：拖拽排序最小实现
- 题目本质：本质是用拖拽事件拿到源索引和目标索引，再更新列表顺序。
- 复杂度：核心重排通常 O(n)。
- 易错点：拖拽态同步、拖入拖出边界、重排时 key 稳定性。
- 追问方向：可以追问大列表拖拽、可访问性和性能优化。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function enableDragSort(container) {
  let dragging = null;

  container.addEventListener('dragstart', (event) => {
    dragging = event.target.closest('[draggable="true"]');
  });

  container.addEventListener('dragover', (event) => {
    event.preventDefault();
    const target = event.target.closest('[draggable="true"]');
    if (!dragging || !target || dragging === target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const shouldInsertAfter = event.clientY > rect.top + rect.height / 2;
    container.insertBefore(dragging, shouldInsertAfter ? target.nextSibling : target);
  });
}

// enableDragSort(document.querySelector('#sortable-list'));
