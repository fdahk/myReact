/*
面试讲解点：手写 apply
- 题目本质：本质是显式指定 this，并把参数数组展开后执行目标函数。
- 复杂度：核心操作通常 O(n)，n 为参数数量。
- 易错点：context 为 null/undefined 的兜底、Symbol 避免属性冲突、返回值透传。
- 追问方向：可以追问和 call、bind 的差异。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

Function.prototype.myApply = function myApply(context, args = []) {
  const target = context ?? globalThis;
  const key = Symbol('fn');
  target[key] = this;
  const result = target[key](...args);
  delete target[key];
  return result;
};

function intro(city, role) {
  return `${this.name} from ${city}, ${role}`;
}

console.log(intro.myApply({ name: 'Bob' }, ['Shanghai', 'engineer']));
