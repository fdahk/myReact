/*
实现目标：
- 手写一个 `myInstanceof`，模拟 `instance instanceof Constructor` 的核心判断过程。
-
核心思路：
- `instanceof` 并不是比较构造函数名，而是沿着左侧对象的原型链一直向上查找。
- 只要链路中某一层严格等于右侧构造函数的 `prototype`，结果就是 `true`。
- 如果最终走到 `null` 还没匹配到，说明这条原型链上不存在目标原型，返回 `false`。
-
复杂度 / 运行特征：
- 时间复杂度与原型链长度有关，可记为 O(h)。
- 这个实现重点展示“原型链遍历”本质，非常适合用于解释 `instanceof` 的底层判断逻辑。
-
易错点：
- 基本类型通常没有可供向上追溯的对象原型链，因此结果应为 `false`。
- 很多人会误以为 `constructor` 相等就等于 `instanceof` 成立，但两者不是一回事。
- 当前实现没有额外校验右值是否可作为合法构造函数，这是简化版手写题里常见取舍。
-
适用场景 / 面试表达点：
- 常用于考察原型链、构造函数、继承关系的基础理解。
- 面试时可以顺带补充一句：`instanceof` 关注的是“原型链关系”，不是“对象由谁创建”这一句表面描述。
*/

function myInstanceof(instance, Constructor) {
  if (instance == null || (typeof instance !== 'object' && typeof instance !== 'function')) {
    return false;
  }

  let proto = Object.getPrototypeOf(instance);
  while (proto) {
    // 只要原型链上命中构造函数原型，就说明满足 instanceof 关系。
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

console.log(myInstanceof([], Array));
console.log(myInstanceof({}, Array));
