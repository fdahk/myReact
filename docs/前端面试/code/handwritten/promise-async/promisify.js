/*
实现目标：
- 把一个普通同步函数包装成 Promise 风格调用。

核心思路：
- 返回一个新函数。
- 新函数内部用 `Promise` 包住原函数执行结果。
- 捕获同步抛错并 reject。
*/

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      try {
        resolve(fn(...args));
      } catch (error) {
        reject(error);
      }
    });
}

const sum = (a, b) => a + b;
const promiseSum = promisify(sum);

promiseSum(1, 2).then(console.log);
