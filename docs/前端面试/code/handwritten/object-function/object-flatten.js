/*
面试讲解点：对象扁平化
- 题目本质：本质是 DFS 遍历对象结构，把嵌套路径转成扁平 key。
- 复杂度：时间复杂度 O(n)。
- 易错点：数组路径格式、空对象、null、路径拼接规则。
- 追问方向：可以追问表单回显、配置平台场景。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function flattenObject(object, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(object)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, nextKey, result);
    } else {
      result[nextKey] = value;
    }
  }

  return result;
}

console.log(flattenObject({ a: { b: { c: 1 } }, d: 2 }));
