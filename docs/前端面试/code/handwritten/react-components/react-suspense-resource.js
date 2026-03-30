/*
实现目标：
- 手写一个最小版 Suspense resource，理解“读取数据时如果未完成就抛出 Promise”的模式。
-
核心思路：
- 资源内部维护 `pending / success / error` 三种状态。
- `read()` 时若还在 pending，就抛出 Promise；若失败则抛错误；成功才返回数据。
- 这就是 Suspense 数据读取模式的核心思想。
-
复杂度 / 运行特征：
- 包装层本身 O(1)，真实成本取决于异步请求。
-
易错点：
- 这里的“抛 Promise”是设计的一部分，不是异常写法。
- 真正 React 还要靠边界组件捕获并显示 fallback。
*/

function createResource(promise) {
  let status = 'pending';
  let result;

  const suspender = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      }

      if (status === 'error') {
        throw result;
      }

      return result;
    },
  };
}

const resource = createResource(Promise.resolve('suspense-data'));
setTimeout(() => console.log(resource.read()), 0);

export { createResource };
