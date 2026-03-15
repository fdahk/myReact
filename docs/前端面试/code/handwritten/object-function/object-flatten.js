/*
实现目标：
- 把嵌套对象拍平成“路径 -> 值”的普通对象，例如把 `{ a: { b: 1 } }` 转成 `{ 'a.b': 1 }`。
-
核心思路：
- 这是一个典型的 DFS 递归题：遍历当前层每个键值对，持续向下收集路径。
- 如果当前值仍然是普通对象，就继续递归并拼接路径。
- 如果当前值已经是叶子节点，就把完整路径写入结果对象。
-
复杂度 / 运行特征：
- 每个可遍历字段只处理一次，时间复杂度通常为 O(n)。
- 结果对象会额外占用与输出规模相关的空间。
- 当前实现把数组当作叶子值直接保留，不继续展开，便于保持示例简洁。
-
易错点：
- `null` 的类型也是 `object`，如果不额外判空会误递归。
- 路径拼接时要处理根层和非根层，避免出现多余的前导点。
- 实际业务里常会被追问数组下标路径、空对象是否保留、分隔符是否可配置等问题。
-
适用场景 / 面试表达点：
- 常见于配置平台、表单字段映射、差异比较和日志上报。
- 面试时可以直接讲“这是路径累积型 DFS”，通常能让思路显得很清晰。
*/

function flattenObject(object, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(object)) {
    // 根层直接用 key，深层则继续拼接成 a.b.c 这种路径。
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, nextKey, result);
    } else {
      // 到达叶子节点后，把完整路径作为结果键。
      result[nextKey] = value;
    }
  }

  return result;
}

console.log(flattenObject({ a: { b: { c: 1 } }, d: 2 }));
