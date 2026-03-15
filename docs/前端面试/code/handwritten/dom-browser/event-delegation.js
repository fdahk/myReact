/*
 * 实现目标：
 * - 用一个父容器监听器接管多个待删除按钮的点击，展示事件委托的经典写法。
 * - 让动态新增的子节点也能自动复用同一套点击逻辑，而不必逐个绑定事件。
 *
 * 核心思路：
 * - 监听父容器的 `click` 事件，利用事件冒泡接收所有后代点击。
 * - 通过 `closest` 沿着事件源向上查找满足 `[data-action="remove"]` 的按钮。
 * - 找到按钮后，再继续定位当前所属的数据项并读取其 `data-id`。
 *
 * 复杂度 / 运行特征：
 * - 注册监听只需 O(1)。
 * - 单次点击处理的成本主要是若干次 DOM 向上查找，通常与节点层级有关。
 *
 * 易错点：
 * - 事件源往往是按钮内部图标或文本节点，因此不能直接假设 `event.target` 就是目标按钮。
 * - 若中途调用了 `stopPropagation`，事件可能不会冒泡到委托容器。
 * - 委托更适合冒泡型事件，像 `focus` / `blur` 这类事件需要特别处理。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲列表操作、动态节点事件管理、减少监听器数量。
 * - 面试里可以顺带比较原生事件委托与 React 合成事件分发机制的异同。
 */

function bindTodoClick(container) {
  container.addEventListener('click', (event) => {
    // 允许点击命中按钮内部任意子节点，再向上回溯到真正按钮元素。
    const button = event.target.closest('[data-action="remove"]');
    if (!button) {
      return;
    }

    // 继续向上定位承载业务数据的列表项节点。
    const item = button.closest('[data-id]');
    console.log('remove item:', item?.dataset.id);
  });
}

// 示例：
// const list = document.querySelector('#todo-list');
// bindTodoClick(list);
