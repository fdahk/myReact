/*
实现目标：
- 手写一个 `once`，让目标函数无论被调用多少次，都只真正执行一次。
-
核心思路：
- 闭包保存“是否已执行”状态和首次执行结果。
- 第一次调用时执行原函数并缓存返回值。
- 后续调用直接返回第一次结果，不再重复执行原函数。
-
复杂度 / 运行特征：
- 单次调用复杂度为 O(1)。
- 重点不在算法，而在闭包状态管理和语义控制。
-
易错点：
- 要保留 `this` 和参数，否则包装后行为会变。
- 若原函数第一次抛错，是否算“已经执行过”要看题目定义；这里默认抛错后仍视为已执行过。
-
适用场景 / 面试表达点：
- 常见于初始化逻辑、单例注册、事件绑定保护。
*/

function once(fn) {
  let called = false;
  let result;

  return function wrapped(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

const init = once((name) => {
  console.log('init:', name);
  return { name };
});

console.log(init('first'));
console.log(init('second'));
