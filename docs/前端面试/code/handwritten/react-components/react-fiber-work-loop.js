/*
实现目标：
- 手写一个极简版 Fiber 工作循环，理解 React 为什么能把渲染拆成可中断的小任务。
-
核心思路：
- 每个 fiber 节点保存 `child / sibling / return` 指针，形成链表化树结构。
- work loop 每次只处理一个工作单元，处理完后返回下一个 fiber。
- 若时间片耗尽，就暂停，等待下一轮继续，从而避免长时间阻塞主线程。
-
复杂度 / 运行特征：
- 总体仍是 O(n)，但优势在于“可中断”和“可恢复”。
- 这是教学级最小模型，不包含优先级、lane、effect list、commit 阶段等真实细节。
-
易错点：
- Fiber 不是为了减少总工作量，而是为了把工作拆散。
- render 阶段可中断，commit 阶段通常不可中断，这一点面试里最好说出来。
-
适用场景 / 面试表达点：
- 适合回答 React Fiber / Scheduler / 时间切片的最小实现思路。
*/

let nextUnitOfWork = null;

function performUnitOfWork(fiber) {
  console.log('process fiber:', fiber.type);

  if (fiber.child) {
    return fiber.child;
  }

  let current = fiber;
  while (current) {
    if (current.sibling) {
      return current.sibling;
    }
    current = current.return;
  }

  return null;
}

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
}

const fiberTree = {
  type: 'App',
  return: null,
  sibling: null,
  child: {
    type: 'Header',
    return: null,
    sibling: {
      type: 'Main',
      return: null,
      sibling: null,
      child: null,
    },
    child: null,
  },
};

fiberTree.child.return = fiberTree;
fiberTree.child.sibling.return = fiberTree;

nextUnitOfWork = fiberTree;

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(workLoop);
}
