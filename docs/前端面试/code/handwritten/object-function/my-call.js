/*
面试讲解点：手写 call
- 题目本质：本质是临时把目标函数挂到 context 上执行，再删除临时属性。
- 复杂度：核心操作通常 O(n)，n 为参数数量。
- 易错点：null/undefined 绑定、基本类型装箱、属性名冲突。
- 追问方向：可以继续追问 apply、bind、严格模式下 this。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

Function.prototype.myCall = function myCall(context, ...args) {
  const target = context ?? globalThis;
  const key = Symbol('fn');
  target[key] = this;
  const result = target[key](...args);
  delete target[key];
  return result;
};

function intro(city) {
  return `${this.name} from ${city}`;
}

console.log(intro.myCall({ name: 'Alice' }, 'Beijing'));
