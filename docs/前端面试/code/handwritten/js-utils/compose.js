/*
 * 实现目标：
 * - 手写一个最小版 `compose`，把多个函数按从右到左的顺序组合成一个新函数。
 * - 用于说明函数式编程中“数据流经多个转换步骤”的表达方式。
 *
 * 核心思路：
 * - 返回一个新的 `composed` 函数，接收最初输入值。
 * - 使用 `reduceRight` 从右往左执行函数链，让右侧函数的输出作为左侧函数的输入。
 * - 最终得到整条函数管道的结果。
 *
 * 复杂度 / 运行特征：
 * - 组合函数本身创建成本是 O(n)，其中 n 为函数数量。
 * - 实际执行时也会线性经过整条函数链，且通常要求每个函数的返回值能与前一个函数输入兼容。
 *
 * 易错点：
 * - `compose` 和 `pipe` 的执行方向相反，面试中要说清楚。
 * - 当前实现默认每个函数都是单参数链式传递，多参数场景通常要做额外处理。
 * - 空函数数组、错误传播、中间异步函数等问题都可以继续扩展。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲函数组合、函数式思想、Redux 中间件与工具函数封装。
 * - 面试里可以进一步对比 `compose`、`pipe`、高阶函数和中间件链模型。
 */

function compose(...fns) {
  return function composed(initialValue) {
    // 从右往左执行，让右侧函数先处理最初输入。
    return fns.reduceRight((value, fn) => fn(value), initialValue);
  };
}

const add1 = (x) => x + 1;
const double = (x) => x * 2;
console.log(compose(add1, double)(3));
