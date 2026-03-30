/*
实现目标：
- 手写一个最小版 Hooks 链表模型，理解 React 为什么能按顺序取到每个 Hook 的状态。
-
核心思路：
- 每个 Hook 节点保存自己的状态和 `next` 指针。
- 渲染时按调用顺序依次消费链表节点，不够时就新建节点。
- 这就是“Hook 不能写在条件分支里”的底层原因之一：顺序一变，节点就会错位。
-
复杂度 / 运行特征：
- 单次 Hook 读取 / 写入可近似看作 O(1)。
-
易错点：
- 真实 React 里 Hook 节点挂在 Fiber 上，并且还有 update queue，这里只是最小示意。
- 面试里要把“数组模型”和“链表模型”区分开，后者更接近真实实现。
-
适用场景 / 面试表达点：
- 适合回答 Hooks 底层、执行顺序、为什么不能条件调用。
*/

let currentHook = null;
let workInProgressHook = null;

function createHookNode(initialState) {
  return {
    memoizedState: initialState,
    next: null,
  };
}

function prepareToRender() {
  workInProgressHook = currentHook;
}

function useState(initialState) {
  let hook;

  if (!workInProgressHook) {
    hook = createHookNode(initialState);

    if (!currentHook) {
      currentHook = hook;
    } else {
      let tail = currentHook;
      while (tail.next) {
        tail = tail.next;
      }
      tail.next = hook;
    }

    workInProgressHook = hook.next;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  const setState = (nextState) => {
    hook.memoizedState =
      typeof nextState === 'function' ? nextState(hook.memoizedState) : nextState;
  };

  return [hook.memoizedState, setState];
}

function render(component) {
  prepareToRender();
  component();
}

render(() => {
  const [count, setCount] = useState(0);
  console.log('hook count:', count);
  setCount(1);
});

export { render, useState };
