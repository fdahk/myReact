/*
实现目标：
- 为函数对象补一个简化版 `myBind`，返回一个预绑定 `this` 和部分参数的新函数。
-
核心思路：
- `bind` 不会立即执行原函数，而是先返回一个包装函数。
- 这个包装函数在真正调用时，会把“预置参数”和“调用时参数”拼接起来，再用目标 `this` 执行原函数。
- 更重要的一点是：如果绑定后的函数被 `new` 调用，`this` 应该优先指向新实例，而不是原先绑定的对象。
-
复杂度 / 运行特征：
- 绑定阶段本身是 O(1)，真正执行时的主要开销来自参数拼接和函数调用。
- 当前实现已经覆盖 `bind` 手写题最常见的考点：参数柯里化和 `new` 优先级。
- 它没有进一步处理原生 `bind` 的 `prototype` 继承细节，保持示例聚焦。
-
易错点：
- 很多人只会写“固定 this”，却漏掉了预置参数与后续参数的合并。
- 更常见的陷阱是忽略 `new` 调用场景，导致构造行为不正确。
- 绑定后的函数是否保留原函数原型链关系，是进阶追问点，需要视题目要求决定实现深度。
-
适用场景 / 面试表达点：
- 用于考察 `this`、偏函数、构造调用优先级等知识点。
- 面试时可以明确说一句：`bind` 的难点不在“绑定 this”，而在“new 调用时 this 不能被硬绑死”。
*/

Function.prototype.myBind = function myBind(context, ...presetArgs) {
  const targetFn = this;

  return function boundFunction(...laterArgs) {
    // 若通过 new 调用，this 指向新实例，优先级高于显式绑定的 context。
    const finalContext = this instanceof boundFunction ? this : context;
    // bind 的参数来自两部分：绑定时预置的参数 + 调用时追加的参数。
    return targetFn.apply(finalContext, [...presetArgs, ...laterArgs]);
  };
};

function greet(greeting, name) {
  return `${greeting}, ${name}! 我是 ${this.role}`;
}

const bound = greet.myBind({ role: 'interviewer' }, '你好');
console.log(bound('候选人'));
