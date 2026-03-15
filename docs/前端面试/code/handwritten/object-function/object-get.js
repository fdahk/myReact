/*
实现目标：
- 实现一个简化版对象路径访问函数，支持通过字符串路径或数组路径安全读取深层属性。
-
核心思路：
- 先把路径统一成数组形式，例如 `'profile.name'` 转成 `['profile', 'name']`。
- 然后从根对象开始逐层向下读取；一旦中间某层为 `null` / `undefined`，就直接返回默认值。
- 这本质上是在模拟一个可配置版本的安全链式访问。
-
复杂度 / 运行特征：
- 假设路径长度为 k，则读取过程时间复杂度为 O(k)。
- 实现非常轻量，适合面试场景说明“路径解析 + 安全访问”的组合思路。
- 当前版本不处理带方括号的复杂路径表达式，只覆盖最常见的点分路径。
-
易错点：
- 如果中间层为空但继续访问，会触发运行时错误，所以要先做空值判断。
- 返回默认值的判断通常放在最终结果为 `undefined` 时，而不是所有 falsy 值都回退。
- 实际业务中常被追问数组索引、转义点号、路径缓存优化等扩展问题。
-
适用场景 / 面试表达点：
- 常见于配置读取、表单字段访问、通用工具库封装。
- 面试时可以顺带比较它与可选链 `?.` 的区别：一个是动态路径，一个是静态代码访问。
*/

function get(object, path, defaultValue) {
  // 统一路径格式，方便后续按层遍历。
  const keys = Array.isArray(path) ? path : path.split('.');
  let current = object;

  for (const key of keys) {
    if (current == null) {
      // 只要中间层已经断开，就提前返回默认值。
      return defaultValue;
    }
    current = current[key];
  }

  // 仅当结果真正为 undefined 时才使用默认值，避免误伤 0 / false / ''。
  return current === undefined ? defaultValue : current;
}

const user = { profile: { name: 'Alice', city: 'Hangzhou' } };
console.log(get(user, 'profile.name'));
console.log(get(user, 'profile.age', 18));
