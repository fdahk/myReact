/*
实现目标：
- 手写一个最小版 `MutationObserver` 使用封装，监听 DOM 结构或属性变化。
-
核心思路：
- 创建 `MutationObserver` 实例并注册回调。
- 把配置项交给 `observe`，指定监听子节点、属性或文本变化。
- 返回清理函数，便于停止观察。
-
复杂度 / 运行特征：
- 封装层近似 O(1)，真实观察成本取决于 DOM 变更频率和监听范围。
-
易错点：
- 监听范围过大容易带来额外性能开销。
- 面试里要知道它和 `ResizeObserver`、`IntersectionObserver` 的职责差异。
-
适用场景 / 面试表达点：
- 常见于第三方 DOM 注入监控、编辑器、埋点、内容同步。
*/

function watchDomMutations(target, callback, options = {}) {
  const observer = new MutationObserver((mutations) => {
    callback(mutations);
  });

  observer.observe(target, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
    ...options,
  });

  return () => observer.disconnect();
}

export { watchDomMutations };
