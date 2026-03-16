## 2026-03-15

- 补充 `docs/JS.md`：新增“为什么 `for`、`for...of + entries()`、`slice().forEach()` 的性能会不一样”专题说明。
- 说明内容覆盖：传统 `for`、迭代器协议、`entries()`、解构赋值、`slice()` 浅拷贝、`forEach()` 回调成本、JIT、GC、常数项、在线评测波动原因。
- 修正文档中对“迭代器更省内存”的表述，补充“更省整体内存不等于一定更快”的限制条件，避免误解。
- 补充 `docs/前端面试/code/handwritten/object/object-topic.js` 注释：细化说明组合继承、原型链查找、`instanceof` / `isPrototypeOf`、`this` 绑定、枚举规则、浅拷贝以及 `preventExtensions` / `seal` / `freeze` 的行为差异。
