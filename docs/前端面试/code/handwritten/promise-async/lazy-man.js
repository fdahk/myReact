/*
实现目标：
- 手写经典面试题 `LazyMan`，支持同步打印、延迟执行和插队延迟。
-
核心思路：
- 维护一个任务队列，所有动作都先转成函数入队。
- 构造阶段用一个异步起点触发 `next`，确保链式调用有机会先把队列组织完整。
- 每个任务执行完成后主动调用 `next`，从而串起整条任务链。
-
复杂度 / 运行特征：
- 总体执行复杂度与任务数 n 成正比。
- 这个题的重点不在复杂度，而在“队列 + 链式调用 + 异步调度”的组合表达。
-
易错点：
- 如果在构造函数里同步执行首任务，链式调用后续任务可能还没来得及入队。
- `sleepFirst` 的本质是头插，不是普通追加。
- 面试里要说明这是“命令队列”模型，不是 Promise 链的唯一写法。
-
适用场景 / 面试表达点：
- 很适合展示你对异步任务编排、链式 API 设计和队列调度的理解。
- 这是很多公司都爱拿来区分“会写 Promise API”与“会做异步流程建模”的题。
*/

class LazyManScheduler {
  constructor(name) {
    this.tasks = [];

    this.tasks.push(() => {
      console.log(`Hi I am ${name}`);
      this.next();
    });

    Promise.resolve().then(() => this.next());
  }

  next() {
    const task = this.tasks.shift();
    if (task) {
      task();
    }
  }

  sleep(seconds) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(`Wake up after ${seconds}s`);
        this.next();
      }, seconds * 1000);
    });

    return this;
  }

  sleepFirst(seconds) {
    this.tasks.unshift(() => {
      setTimeout(() => {
        console.log(`Wake up after ${seconds}s`);
        this.next();
      }, seconds * 1000);
    });

    return this;
  }

  eat(food) {
    this.tasks.push(() => {
      console.log(`Eat ${food}`);
      this.next();
    });

    return this;
  }
}

function LazyMan(name) {
  return new LazyManScheduler(name);
}

LazyMan('Tony').sleepFirst(1).eat('lunch').sleep(1).eat('dinner');
