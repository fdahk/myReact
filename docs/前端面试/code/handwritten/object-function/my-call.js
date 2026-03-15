/*
实现目标：
- 为函数对象补一个简化版 `myCall`，模拟原生 `Function.prototype.call` 的核心效果。
-
核心思路：
- `call` 的关键是“立即执行函数，并显式指定执行时的 `this`”。
- 经典实现方式与手写 `apply` 一致：先把函数临时挂到目标对象上，再以对象方法形式调用。
- 区别在于参数不是数组，而是从第二个实参开始按位置逐个传入。
-
复杂度 / 运行特征：
- 核心绑定逻辑本身近似 O(1)，参数展开的处理与参数个数相关。
- 当前实现聚焦核心语义，不覆盖原生规范中对装箱对象、严格模式细节等完整行为。
-
易错点：
- `context` 为 `null` / `undefined` 时要考虑兜底目标。
- 临时挂载属性要避免命名冲突，`Symbol` 是最直接的办法。
- 很多人会遗漏“执行结束后删除临时属性”这一步，导致对象被污染。
-
适用场景 / 面试表达点：
- 常用于考察 `this`、显式绑定和 `call/apply/bind` 三者差异。
- 面试回答时可直接概括：`call` 是“指定 this + 立即执行 + 参数逐个传”。
*/

Function.prototype.myCall = function myCall(context, ...args) {
  // 未传上下文时退到全局对象，贴近常见手写题语义。
  const target = context ?? globalThis;
  const key = Symbol('fn');
  target[key] = this;
  // 作为 target 的临时方法执行，this 会绑定到 target。
  const result = target[key](...args);
  delete target[key];
  return result;
};

function intro(city) {
  return `${this.name} from ${city}`;
}

console.log(intro.myCall({ name: 'Alice' }, 'Beijing'));
