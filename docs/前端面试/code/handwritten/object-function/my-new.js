/*
实现目标：
- 手写一个 `myNew`，模拟 `new Constructor(...args)` 的核心执行流程。
-
核心思路：
- `new` 做的事情可以拆成四步：
- 1. 创建一个全新的空对象；
- 2. 把新对象的原型链连接到构造函数的 `prototype`；
- 3. 以这个新对象作为 `this` 执行构造函数；
- 4. 如果构造函数显式返回对象 / 函数，则采用该返回值，否则返回新对象本身。
-
复杂度 / 运行特征：
- 这里的对象创建、原型挂接和函数调用都属于常数级操作，整体可视为 O(1)。
- 实现简短，但已经覆盖了 `new` 最容易被问到的核心语义。
-
易错点：
- 最大坑点是“构造函数返回对象”和“返回基本类型”的差异，不能一律返回 `instance`。
- 如果直接写成普通函数调用而没有指定 `this`，实例属性就不会落到新对象上。
- 面试时还常被追问 `class` 是否也适用同样的原理，可以说明底层机制相近，但 `class` 不能直接 `apply` 调用。
-
适用场景 / 面试表达点：
- 常用于考察原型链、构造函数和 `this` 绑定的基础理解。
- 面试回答时建议把四步流程按顺序背熟，再写实现会很稳。
*/

function myNew(Constructor, ...args) {
  // 先创建一个对象，并把它的原型指向构造函数原型。
  const instance = Object.create(Constructor.prototype);
  // 用新对象承接构造函数内部通过 this 挂载的属性。
  const result = Constructor.apply(instance, args);

  // 如果构造函数显式返回引用类型，则它会覆盖默认返回的实例对象。
  return result !== null && (typeof result === 'object' || typeof result === 'function')
    ? result
    : instance;
}

function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function sayHi() {
  return `Hi, ${this.name}`;
};

const person = myNew(Person, 'Tom');
console.log(person.sayHi());
