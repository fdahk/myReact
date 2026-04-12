/*
实现目标：
- 手写一个最小版方法装饰器，给原方法增加日志能力。

核心思路：
- 拿到原始 `descriptor.value`。
- 用新函数包一层，再把调用转发给原函数。
*/

function log(target, key, descriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args) {
    console.log('call:', key, args);
    return original.apply(this, args);
  };

  return descriptor;
}

class ExampleService {
  say(name) {
    return `hello ${name}`;
  }
}

const descriptor = Object.getOwnPropertyDescriptor(ExampleService.prototype, 'say');
const nextDescriptor = log(ExampleService.prototype, 'say', descriptor);
Object.defineProperty(ExampleService.prototype, 'say', nextDescriptor);

const service = new ExampleService();
console.log(service.say('Alice'));
