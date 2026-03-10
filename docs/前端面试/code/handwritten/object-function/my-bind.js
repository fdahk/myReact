/*
面试讲解点：手写 bind
- 题目本质：本质是返回一个永久绑定 this 和部分参数的新函数。
- 复杂度：绑定生成 O(1)，执行时与参数数量相关。
- 易错点：预置参数、后续参数拼接、作为构造函数 new 调用时的兼容。
- 追问方向：这是高频追问题，最好能主动讲 new 优先级。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

Function.prototype.myBind = function myBind(context, ...presetArgs) {
  const targetFn = this;

  return function boundFunction(...laterArgs) {
    const finalContext = this instanceof boundFunction ? this : context;
    return targetFn.apply(finalContext, [...presetArgs, ...laterArgs]);
  };
};

function greet(greeting, name) {
  return `${greeting}, ${name}! 我是 ${this.role}`;
}

const bound = greet.myBind({ role: 'interviewer' }, '你好');
console.log(bound('候选人'));
