/*
面试讲解点：函数柯里化
- 题目本质：本质是把多参数函数拆成多个单参数或分批传参函数。
- 复杂度：收集参数过程通常与参数数量线性相关。
- 易错点：参数个数收集、this 透传、可变参数边界。
- 追问方向：可以延伸到偏函数、配置复用、函数式编程。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  }

  return (...restArgs) => curry(fn, ...args, ...restArgs);
}

function sum(a, b, c) {
  return a + b + c;
}

console.log(curry(sum)(1)(2)(3));
