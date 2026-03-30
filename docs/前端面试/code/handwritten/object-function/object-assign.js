/*
实现目标：
- 手写一个简化版 `Object.assign`，把多个源对象的可枚举自有属性复制到目标对象上。
-
核心思路：
- 先把目标值转成对象，兼容传入原始值的情况。
- 依次遍历每个 source，跳过 `null` 和 `undefined`。
- 用 `Reflect.ownKeys` 取到字符串键和 `Symbol` 键，再过滤出可枚举属性进行复制。
-
复杂度 / 运行特征：
- 总体时间复杂度约为 O(n)，n 为所有源对象可枚举自有属性总数。
- 返回值与原生 `Object.assign` 一样，都是被修改后的目标对象本身。
-
易错点：
- `null` / `undefined` 作为 source 应直接跳过，而不是报错。
- `target` 不能是 `null` / `undefined`，否则要抛 `TypeError`。
- 这是浅拷贝，嵌套对象仍然共享引用。
-
适用场景 / 面试表达点：
- 常见于配置合并、默认参数回填、对象扩展。
- 面试里要主动点出“只拷贝可枚举自有属性”和“属于浅拷贝”。
*/

function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const result = Object(target);

  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    const from = Object(source);
    for (const key of Reflect.ownKeys(from)) {
      if (Object.prototype.propertyIsEnumerable.call(from, key)) {
        result[key] = from[key];
      }
    }
  }

  return result;
}

const extra = Symbol('extra');
const merged = objectAssign({ name: 'alpha' }, { age: 18 }, { [extra]: true });
console.log(merged.name, merged.age, merged[extra]);
