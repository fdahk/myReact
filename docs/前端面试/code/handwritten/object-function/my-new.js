/*
面试讲解点：手写 new
- 题目本质：本质是创建新对象、连接原型、执行构造函数、处理返回值。
- 复杂度：核心操作通常 O(1)。
- 易错点：返回对象与返回基本类型的差异、prototype 为空的边界。
- 追问方向：可以追问 class、构造函数和 this 绑定。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function myNew(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype);
  const result = Constructor.apply(instance, args);

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
