/*
实现目标：
- 手写一个最小版 `toRefs`，把响应式对象的每个字段转成 ref 风格访问器。
-
核心思路：
- 遍历对象键。
- 每个键返回一个带 `value` 的代理对象，内部映射到原对象对应字段。
- 这样解构后也能保持对原对象字段的联动。
-
复杂度 / 运行特征：
- 创建阶段成本与对象键数量 n 成正比。
-
易错点：
- `toRefs` 不是复制值，而是创建一层到原对象字段的代理。
- 面试里可顺带解释为什么直接解构 reactive 对象会丢响应式连接。
*/

function toRef(target, key) {
  return {
    get value() {
      return target[key];
    },
    set value(nextValue) {
      target[key] = nextValue;
    },
  };
}

function toRefs(target) {
  const result = {};
  Object.keys(target).forEach((key) => {
    result[key] = toRef(target, key);
  });
  return result;
}

const state = { name: 'vue', count: 1 };
const refs = toRefs(state);
refs.count.value += 1;
console.log(state.count);

export { toRef, toRefs };
