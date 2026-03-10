/*
面试讲解点：对象路径访问
- 题目本质：本质是把字符串路径解析成路径数组，再逐层安全访问。
- 复杂度：时间复杂度 O(k)，k 为路径层级。
- 易错点：路径不存在、数组下标、默认值返回。
- 追问方向：可以追问 lodash.get 和可选链的关系。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

function get(object, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.split('.');
  let current = object;

  for (const key of keys) {
    if (current == null) {
      return defaultValue;
    }
    current = current[key];
  }

  return current === undefined ? defaultValue : current;
}

const user = { profile: { name: 'Alice', city: 'Hangzhou' } };
console.log(get(user, 'profile.name'));
console.log(get(user, 'profile.age', 18));
