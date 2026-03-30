/*
实现目标：
- 手写一个简化版 `Object.create`，根据指定原型创建新对象，并可选挂载属性描述符。
-
核心思路：
- 先校验 `prototype` 类型，只允许对象、函数或 `null`。
- 通过 `Object.setPrototypeOf` 把新对象的隐式原型指向目标原型。
- 如果传入第二个参数，再用 `Object.defineProperties` 一次性补属性描述符。
-
复杂度 / 运行特征：
- 创建对象与设置原型本身可视为 O(1)。
- 若附带属性描述符，额外成本与属性数量 n 成正比。
-
易错点：
- `prototype` 不是对象 / 函数 / `null` 时应抛出 `TypeError`。
- `Object.create(null)` 创建的是“无原型对象”，没有 `toString` 等继承方法。
- 面试时要说明这里是“语义模拟”，并不是 JS 引擎底层真正的对象分配过程。
-
适用场景 / 面试表达点：
- 常用于解释原型链、对象继承、实例原型来源。
- 面试里可以顺势对比 `new`、显式原型继承和寄生组合继承。
*/

function objectCreate(prototype, propertiesObject) {
  const validPrototype =
    prototype === null || typeof prototype === 'object' || typeof prototype === 'function';

  if (!validPrototype) {
    throw new TypeError('Object prototype may only be an Object, Function, or null');
  }

  const result = {};
  Object.setPrototypeOf(result, prototype);

  if (propertiesObject !== undefined) {
    Object.defineProperties(result, propertiesObject);
  }

  return result;
}

const animal = {
  speak() {
    return 'hello';
  },
};

const dog = objectCreate(animal, {
  name: {
    value: 'buddy',
    enumerable: true,
  },
});

console.log(dog.name, dog.speak());
