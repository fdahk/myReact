/*
实现目标：
- 手写一个最小版 `defineAsyncComponent`，理解 Vue 异步组件的加载包装思路。
-
核心思路：
- 传入一个加载器函数，首次渲染时启动异步加载。
- 加载成功后缓存组件结果，后续直接复用。
- 若加载失败则进入错误态，调用方可据此展示错误 UI。
-
复杂度 / 运行特征：
- 首次加载成本取决于异步模块请求，命中缓存后近似 O(1)。
-
易错点：
- 异步组件的核心不是 Promise 本身，而是“状态机：loading / resolved / error”。
- 真正 Vue 还会继续支持 timeout、errorComponent、loadingComponent、retry。
*/

function defineAsyncComponent(loader) {
  let component = null;
  let loading = false;
  let error = null;

  return {
    async load() {
      if (component || loading) {
        return component;
      }

      loading = true;

      try {
        component = await loader();
        return component;
      } catch (err) {
        error = err;
        throw err;
      } finally {
        loading = false;
      }
    },
    get status() {
      if (component) {
        return 'resolved';
      }
      if (loading) {
        return 'loading';
      }
      if (error) {
        return 'error';
      }
      return 'idle';
    },
  };
}

const AsyncComp = defineAsyncComponent(async () => ({ name: 'AsyncView' }));
AsyncComp.load().then(console.log);

export { defineAsyncComponent };
