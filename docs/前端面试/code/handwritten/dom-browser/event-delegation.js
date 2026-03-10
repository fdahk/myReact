/*
面试讲解点：事件委托
- 题目本质：本质是利用事件冒泡，把多个子元素事件统一挂到父元素上。
- 复杂度：注册监听 O(1)，运行时取决于匹配判断。
- 易错点：event.target 判断、动态节点是否可命中、阻止冒泡的影响。
- 追问方向：可以追问 React 合成事件、性能收益和适用边界。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function bindTodoClick(container) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="remove"]');
    if (!button) {
      return;
    }

    const item = button.closest('[data-id]');
    console.log('remove item:', item?.dataset.id);
  });
}

// 示例：
// const list = document.querySelector('#todo-list');
// bindTodoClick(list);
