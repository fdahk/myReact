/*
 * 实现目标：
 * - 手写一个通用 `groupBy`，把数组元素按指定规则聚合到不同分组中。
 * - 支持既可以传函数提取分组键，也可以直接传字段名做简化写法。
 *
 * 核心思路：
 * - 用 `reduce` 单次遍历整个数组。
 * - 每轮先计算当前元素所属的分组 key，再把元素推入对应桶中。
 * - 若分组桶不存在则先初始化为空数组。
 *
 * 复杂度 / 运行特征：
 * - 单次遍历完成分组，时间复杂度 O(n)，空间复杂度 O(n)。
 * - 返回结果是普通对象，因此 key 最终会按对象键规则进行字符串化处理。
 *
 * 易错点：
 * - 若 key 是对象或复杂类型，普通对象并不适合作为分组容器，此时更适合用 `Map`。
 * - 字段名不存在时会聚合到 `undefined` 分组，这在面试中可以主动说明。
 * - 若输入为空数组，函数应自然返回空对象而不是报错。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲数据归类、`reduce` 的典型应用、对象分桶与 `Map` 的差异。
 * - 面试里可以继续扩展多级分组、稳定排序分组、统计聚合等变体。
 */

function groupBy(list, getKey) {
  return list.reduce((acc, item) => {
    // 同时兼容函数式取 key 与直接按字段名取 key 两种写法。
    const key = typeof getKey === 'function' ? getKey(item) : item[getKey];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

const users = [
  { name: 'A', team: 'frontend' },
  { name: 'B', team: 'backend' },
  { name: 'C', team: 'frontend' },
];

console.log(groupBy(users, 'team'));
