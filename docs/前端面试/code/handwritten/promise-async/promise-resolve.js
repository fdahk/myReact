/*
实现目标：
- 手写一个基础版 `promiseResolve`，把任意值转换为 Promise。
-
核心思路：
- 如果传入值本身已经是 Promise，就直接返回它，避免多包一层。
- 否则创建一个新的 Promise，并立刻以该值完成。
- 这体现了 `Promise.resolve` 最核心的包装语义。
-
复杂度 / 运行特征：
- 对普通值的处理基本是 O(1)。
- 当前实现只对“已经是原生 Promise”做了直返优化，保持示例简洁。
- 完整规范还需要处理 thenable 吸收流程，这里没有展开实现。
-
易错点：
- 很多人会误以为 `Promise.resolve` 只是简单包值，但规范里真正难的是 thenable 解析。
- 如果题目明确要求“完全模拟原生行为”，需要额外处理带 `then` 方法的对象或函数。
- 面试时应主动说明当前版本是教学版，而不是完整 Promise Resolution Procedure。
-
适用场景 / 面试表达点：
- 可用于统一同步值和异步值的返回接口，是 Promise 组合工具的基础能力。
- 面试表达时可以先讲简化版逻辑，再补一句“完整版的难点在 thenable 吸收”。
*/

function promiseResolve(value) {
  if (value instanceof Promise) {
    // 已经是 Promise 时直接返回，避免重复包装。
    return value;
  }

  return new Promise((resolve) => resolve(value));
}

promiseResolve(123).then(console.log);
promiseResolve(Promise.resolve('ok')).then(console.log);
