/*
实现目标：
- 手写一个最小版 `v-model` 双向绑定示例。
-
核心思路：
- 输入框的 value 由状态对象驱动。
- 用户输入时监听 `input` 事件，把最新值回写到状态中。
- 状态变化后再次同步回输入框，形成“数据驱动视图 + 事件回写数据”的闭环。
-
复杂度 / 运行特征：
- 单次同步和回写都可近似看作 O(1)。
- 这道题重点不是算法，而是解释双向绑定本质上仍然是“单向数据流 + 事件回写”。
-
易错点：
- 很多人会把 `v-model` 理解成 DOM 和数据彼此魔法同步，实际上仍需要事件监听和状态更新。
- 真正框架里还会再细分不同表单控件的 prop / event 映射规则。
-
适用场景 / 面试表达点：
- 适合回答 Vue 表单双向绑定原理。
*/

function createVModel(input, state, key) {
  function render() {
    input.value = state[key] ?? '';
  }

  input.addEventListener('input', (event) => {
    state[key] = event.target.value;
    render();
  });

  render();

  return {
    set(value) {
      state[key] = value;
      render();
    },
  };
}

// 示例：
// const state = { message: 'hello' };
// const binding = createVModel(document.querySelector('input'), state, 'message');
// binding.set('updated');
