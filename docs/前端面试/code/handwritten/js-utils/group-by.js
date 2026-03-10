/*
面试讲解点：groupBy 分组
- 题目本质：本质是单次遍历，把元素按某个 key 聚合到不同桶里。
- 复杂度：时间复杂度 O(n)，空间复杂度 O(n)。
- 易错点：key 不存在、函数 key 和字段 key 两种写法、空数组边界。
- 追问方向：可以追问 reduce 版本和 Map 版本的差异。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function groupBy(list, getKey) {
  return list.reduce((acc, item) => {
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
