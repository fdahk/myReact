/*
面试讲解点：compose 函数组合
- 题目本质：本质是把多个函数按从右到左串起来，让上一个输出成为下一个输入。
- 复杂度：组合本身生成函数 O(n)，执行时取决于函数链长度。
- 易错点：空函数数组、单函数场景、参数透传。
- 追问方向：可以追问 pipe 的区别和中间件模型。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function compose(...fns) {
  return function composed(initialValue) {
    return fns.reduceRight((value, fn) => fn(value), initialValue);
  };
}

const add1 = (x) => x + 1;
const double = (x) => x * 2;
console.log(compose(add1, double)(3));
