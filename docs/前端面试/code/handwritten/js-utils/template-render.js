/*
实现目标：
- 手写一个最小版模板渲染函数，把 `{{name}}` 这类占位符替换成数据值。
-
核心思路：
- 用正则匹配模板中的双大括号表达式。
- 取出字段路径后，从数据对象中逐层读取对应值。
- 找不到值时返回空字符串，保证模板结果可用。
-
复杂度 / 运行特征：
- 时间复杂度与模板长度和占位符数量相关，整体可近似看作 O(n)。
- 这是字符串模板替换，不是完整模板编译器。
-
易错点：
- 需要支持嵌套路径，如 `user.profile.name`。
- 找不到路径时是返回空字符串还是保留原文，要先和面试官确认。
-
适用场景 / 面试表达点：
- 适合讲正则替换、路径访问、模板引擎最小原理。
*/

function getValueByPath(data, path) {
  return path.split('.').reduce((current, key) => {
    if (current == null) {
      return undefined;
    }
    return current[key];
  }, data);
}

function renderTemplate(template, data) {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, rawPath) => {
    const value = getValueByPath(data, rawPath.trim());
    return value == null ? '' : String(value);
  });
}

const template = 'Hello {{ user.name }}, age is {{user.age}}';
console.log(renderTemplate(template, { user: { name: 'Tom', age: 18 } }));
