/*
实现目标：
- 手写一个最小版 Vue `watch`，在值变化时执行副作用回调。
-
核心思路：
- 记录旧值。
- 每次触发检查时重新获取新值，若发生变化则执行回调并更新旧值。
- 这是“监听变化后做副作用”的最小模型。
-
复杂度 / 运行特征：
- 单次检查的成本取决于 getter 本身，包装层可视为 O(1)。
-
易错点：
- `watch` 关注的是副作用，不像 `computed` 那样返回缓存值。
- 深度监听、立即执行、清理副作用都是常见升级追问。
-
适用场景 / 面试表达点：
- 适合讲 Vue `watch` 的职责、和 `computed` 的区别。
*/

function watch(getter, callback) {
  let oldValue = getter();

  return function trigger() {
    const newValue = getter();

    if (!Object.is(newValue, oldValue)) {
      callback(newValue, oldValue);
      oldValue = newValue;
    }
  };
}

const state = { count: 1 };
const trigger = watch(
  () => state.count,
  (newValue, oldValue) => {
    console.log('watch:', oldValue, '->', newValue);
  }
);

state.count = 2;
trigger();
