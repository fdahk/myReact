/*
实现目标：
- 为函数对象补一个简化版 `myApply`，模拟原生 `Function.prototype.apply` 的核心行为。
-
核心思路：
- `apply` 的本质是“以指定对象作为 `this` 执行函数，并把参数数组展开传入”。
- 常见手写方式是：把当前函数临时挂到目标对象上，作为对象方法调用，从而借到隐式绑定的 `this`。
- 执行完后再删除这个临时属性，并把执行结果原样返回。
-
复杂度 / 运行特征：
- 除了参数展开带来的线性开销，核心流程基本是 O(1)。
- 这里没有完整覆盖原生规范的所有边界，但已经表达了 `this` 绑定和参数传递的关键机制。
-
易错点：
- `context` 为 `null` / `undefined` 时，非严格模式下通常会回退到全局对象，这里用 `globalThis` 兜底。
- 临时属性名如果用普通字符串，容易和原对象已有属性冲突，因此使用 `Symbol` 更安全。
- 手写时很容易忘记返回执行结果，或者忘记删除临时属性。
-
适用场景 / 面试表达点：
- 常和 `call`、`bind` 一起出现，用于考察 `this` 绑定理解是否扎实。
- 面试时可以清晰地讲出一句话：`apply` 和 `call` 的区别主要在“参数是数组展开还是逐个传入”。
*/

Function.prototype.myApply = function myApply(context, args = []) {
  // 与原生行为保持同类语义：未显式传入对象时退回全局对象。
  const target = context ?? globalThis;
  // 用唯一键挂载临时方法，避免覆盖原对象已有属性。
  const key = Symbol('fn');
  target[key] = this;
  // 以对象方法形式调用，this 会自然绑定到 target。
  const result = target[key](...args);
  delete target[key]; //delete 是专门的操作符，作用是移除对象上指定的属性（包括数组的索引属性，因为数组本质是特殊对象）
  return result;
};

function intro(city, role) {
  return `${this.name} from ${city}, ${role}`;
}

console.log(intro.myApply({ name: 'Bob' }, ['Shanghai', 'engineer']));
