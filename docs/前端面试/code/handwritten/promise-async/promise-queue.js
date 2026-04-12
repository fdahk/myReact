/*
实现目标：
- 给一组返回 Promise 的任务函数，按顺序串行执行，并收集结果。

核心思路：
- 从 `Promise.resolve()` 开始，用 `reduce` 串起整条任务链。
- 每个任务完成后把结果写入数组。
*/

function queue(tasks) {
  const results = [];

  return tasks
    .reduce((promise, task, index) => {
      return promise.then(() => {
        return Promise.resolve(task()).then((value) => {
          results[index] = value;
        });
      });
    }, Promise.resolve())
    .then(() => results);
}

queue([
  () => Promise.resolve('value1'),
  () => Promise.resolve('value2'),
]).then(console.log);
