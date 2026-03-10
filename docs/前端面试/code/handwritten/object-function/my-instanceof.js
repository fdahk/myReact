/*
面试讲解点：手写 instanceof
- 题目本质：本质是沿左值对象的原型链向上找，看能不能遇到右值的 prototype。
- 复杂度：时间复杂度 O(h)，h 为原型链高度。
- 易错点：基本类型直接 false、右值不是函数的异常、原型链终点 null。
- 追问方向：可以追问 constructor 和 instanceof 的区别。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function myInstanceof(instance, Constructor) {
  if (instance == null || (typeof instance !== 'object' && typeof instance !== 'function')) {
    return false;
  }

  let proto = Object.getPrototypeOf(instance);
  while (proto) {
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

console.log(myInstanceof([], Array));
console.log(myInstanceof({}, Array));
