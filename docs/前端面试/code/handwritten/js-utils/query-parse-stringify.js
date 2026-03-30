/*
实现目标：
- 手写 query 参数解析与序列化，覆盖前端面试里最常见的 URL 查询串处理题。
-
核心思路：
- `parseQuery`：去掉 `?` 后按 `&` 拆分，再按 `=` 切成键值对，最后做解码。
- `stringifyQuery`：遍历对象键值，跳过 `undefined`，并把键和值做 URL 编码后拼回字符串。
-
复杂度 / 运行特征：
- 两个函数时间复杂度都约为 O(n)，n 为参数对数量。
- 当前实现聚焦最常见的一对一键值，不额外处理重复 key 数组聚合。
-
易错点：
- 要考虑空字符串、无值参数、编码解码。
- 是否支持重复 key、数组、嵌套对象，要和面试官先确认范围。
-
适用场景 / 面试表达点：
- 常见于路由、筛选条件、页面状态回填。
*/

function parseQuery(queryString) {
  const result = {};
  const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;

  if (!cleanQuery) {
    return result;
  }

  cleanQuery.split('&').forEach((pair) => {
    if (!pair) {
      return;
    }

    const [rawKey, rawValue = ''] = pair.split('=');
    const key = decodeURIComponent(rawKey);
    const value = decodeURIComponent(rawValue);
    result[key] = value;
  });

  return result;
}

function stringifyQuery(params) {
  const pairs = [];

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value === undefined) {
      return;
    }

    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  });

  return pairs.join('&');
}

console.log(parseQuery('?name=Tom&age=18'));
console.log(stringifyQuery({ name: 'Tom', age: 18 }));
