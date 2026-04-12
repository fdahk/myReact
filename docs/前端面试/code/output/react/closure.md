# 1. React 点击一次后的输出顺序

```jsx
function App() {
  const [count, setCount] = useState(0);
  console.log(count);

  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
          setTimeout(() => {
            console.log(count);
          }, 1000);
        }}
      >
        +1
      </button>
    </div>
  );
}
```

初次渲染输出：

```js
0
```

点击一次按钮后，输出顺序是：

```js
1
0
```

### 分析

- 初次渲染时，组件函数执行一次，所以顶部的 `console.log(count)` 先输出 `0`。
- 点击按钮后执行 `setCount(count + 1)`，React 会安排一次新的渲染。
- 在下一次渲染中，新的 `count` 变成 `1`，所以组件顶部的 `console.log(count)` 先输出 `1`。
- `setTimeout` 回调拿到的不是“最新 state 对象”，而是当前这次点击处理函数闭包里保存的旧值 `count`。
- 这次点击发生时，闭包中的 `count` 仍然是 `0`，因此 1 秒后输出 `0`。

### 底层理解

- React 函数组件每次渲染都会重新执行，并生成一套新的局部变量。
- 当前渲染中的 `count` 本质上是这次 render 对应的 state 快照。
- `setCount` 不会原地改写当前闭包里的 `count`，它只是通知 React 生成下一次渲染。
- 所以要区分：
- 当前闭包里的旧值
- 下一次渲染中的新值

### 易错点

- 不要把函数组件里的 `count` 理解成“随时可变的响应式引用”。
- 在 React 里，异步回调经常拿到的是旧 render 的快照值。
- 如果一定要在异步里拿最新值，常见做法是用 `useRef` 保存最新状态，或者把相关逻辑放到依赖正确的 `useEffect` 中。

### 这道题体现了 React 和 Vue 的设计差异吗

是的，这道题在一定程度上能体现两者的设计差异，但要注意：

- 它体现的不是“React 会旧、Vue 不会旧”这么简单。
- 更本质的区别是：**React 函数组件里常见的是“每次渲染生成一次新的值快照”，Vue 里常见的是“闭包拿到同一个响应式容器，再在执行时读取容器里的当前值”。**

可以粗略理解成：

- React 更偏 `render snapshot` 模型，也就是这次渲染有这次渲染自己的局部变量。
- Vue 更偏 `reactive container` 模型，也就是很多时候你拿到的是 `ref` 或 `reactive` 这种可持续读当前值的响应式对象。

所以这道题之所以在 React 里会出现 `1`、`0`，并不是因为 React 的异步“特殊”，而是因为：

- `count` 在当前函数体里只是这一次渲染的普通值。
- 点击事件里的定时器闭包，捕获的是这次渲染时的 `count = 0`。
- 后面即使 React 重新渲染出了 `count = 1`，也不会回头改写之前那个闭包里已经绑定好的旧值。

### 如果换成 Vue，是不是永远拿到最新值

不是，Vue 也不是“永远拿到最新值”，只是**更常见场景下更容易拿到最新值**。

#### 场景一：拿到的是响应式容器，通常能读到最新值

```js
const count = ref(0);

setTimeout(() => {
  console.log(count.value);
}, 1000);

count.value++;
```

这里 1 秒后通常会输出 `1`，原因是：

- 闭包捕获的不是某个时刻的数字 `0`，而是 `count` 这个 `ref` 对象。
- 真正读取发生在定时器执行时。
- 到执行时，`count.value` 已经被改成了 `1`。

`reactive` 也是类似思路，本质上都是“闭包抓住容器，执行时再读容器里的当前值”。

#### 场景二：如果先拆成普通值，Vue 一样会拿到旧值

```js
const count = ref(0);
const current = count.value;

setTimeout(() => {
  console.log(current);
}, 1000);

count.value++;
```

所以更准确的结论应该是：

- React 中，函数组件里的 state 在当前 render 里通常表现为值快照。
- Vue 中，很多时候我们直接操作的是响应式容器，所以异步回调执行时更容易读到当前最新值。
- 但只要 Vue 里你先把值拆出来变成普通变量，它同样会出现“闭包拿旧值”的现象。

### 更底层一点：为什么源码实现会导致这种差异

下面这部分更接近源码层面的运行机制。

#### React 的底层思路：暴露给组件的是“本次 render 的 state 快照”

React 函数组件并不是拿着一个可变对象一直在原地改，而是每次更新都会重新执行组件函数。

源码层可以粗略理解成这样：

1. 组件第一次渲染时，React 会为当前函数组件对应的 `Fiber` 创建 Hook 链表。
2. `useState(0)` 会在这个 Hook 节点里记录当前状态，比如 `memoizedState = 0`。
3. 同时返回两个东西：
   - 当前这次 render 的 state 值，也就是 `count`
   - 一个稳定的派发函数，也就是 `setCount`
4. 当你调用 `setCount(count + 1)` 时，React 并不会去改当前闭包里的 `count` 变量。
5. 它真正做的是：
   - 创建一个 update 对象
   - 把 update 放进这个 Hook 的更新队列
   - 调用调度流程，比如 `scheduleUpdateOnFiber`
6. React 随后发起下一次 render，在新的 render 里重新读取 Hook 链表和更新队列，计算出新的 state，比如 `1`。
7. 然后把这个新的 state 值再交给“下一次组件函数调用”。

所以 React 更像：

```txt
旧 render 的局部变量 count = 0
调用 setCount -> 把更新放入队列
下一次 render 重新执行组件 -> 得到新的 count = 1
```

关键点在于：

- 旧闭包里的 `count` 只是一次普通函数调用中的局部变量。
- React 不会反向去修改已经生成完的旧闭包。
- 新值只会出现在“下一次 render 新生成的那套局部变量”里。

这就是为什么定时器里读到的还是旧值。

#### React 源码里最关键的几个角色

可以记这几个核心概念：

- `Fiber`：组件对应的运行时节点，保存组件更新所需的各种信息。
- `memoizedState`：当前 Hook 链表保存状态的地方。
- `update queue`：`setState` 后挂进去的更新队列。
- `scheduleUpdateOnFiber`：收到更新后，安排组件重新 render。
- `render phase`：重新执行组件函数，计算新的 UI 和新的 state 快照。
- `commit phase`：把计算好的结果真正提交到 DOM。

也就是说，React 的 state 真正“活着”的地方在 Fiber/Hook 结构里，不在你函数体里的 `count` 变量上。

函数体里的 `count` 只是 React 在本次 render 时“拷贝给你看的结果”。

#### Vue 的底层思路：暴露给你的是“响应式容器”或“代理对象”

Vue 3 的响应式核心主要在 `@vue/reactivity` 这一层，最关键的是两类实现：

- `ref`
- `reactive`

它们本质上都不是“单纯把一个值返回给你”，而是返回一个可以继续追踪读写的响应式对象。

#### `ref` 的源码思路

`ref(0)` 可以粗略理解成返回这样一个对象：

```js
const count = {
  _value: 0,
  get value() {
    track();
    return this._value;
  },
  set value(newValue) {
    this._value = newValue;
    trigger();
  },
};
```

真实源码里当然更复杂，会有 `RefImpl`、依赖集合 `dep`、是否需要深层转响应式等逻辑，但核心思想就是：

- 读 `count.value` 时做依赖收集
- 写 `count.value = 1` 时触发依赖更新

所以如果定时器闭包拿到的是 `count` 这个对象本身，那么 1 秒后执行：

```js
console.log(count.value);
```

它是在“执行那一刻”重新走 getter 取值，因此读到的是当前最新的 `_value`。

#### `reactive` 的源码思路

`reactive(obj)` 则更像返回一个 `Proxy`：

```js
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return result;
  },
});
```

也就是说：

- 你闭包里拿到的是同一个代理对象 `proxy`
- 以后访问 `proxy.count` 时，还是会再次进入 `get`
- 读取的是对象当前时刻的属性值

所以 Vue 更容易表现出“异步回调读到最新值”的现象。

#### Vue 组件更新时，底层发生了什么

Vue 组件首次渲染时，会创建一个渲染副作用，也就是组件对应的 `effect`。

粗略过程可以理解成：

1. 执行组件渲染函数或模板编译后的 render 函数。
2. 渲染过程中读取了哪些响应式数据，就通过 `track` 收集依赖。
3. 当 `ref.value` 或 `reactive` 属性发生变化时，通过 `trigger` 找到相关副作用。
4. Vue 把这些副作用放进调度队列。
5. 下一轮统一刷新组件，重新执行 render，更新 DOM。

注意这里有一个很关键的区别：

- Vue 组件也会重新 render
- 但很多业务代码手里拿着的仍然是同一个 `ref` 或同一个 `Proxy`

所以从业务开发者视角看，异步回调里更像是在“晚一点再读同一个容器的当前值”。

### Vue 和 React 都有 `render`，但它们的 `render` 到底是什么

这是一个特别容易“看起来一样，实际上不完全一样”的点。

两边都叫 `render`，但它们共同点只是：

- 都要重新计算“现在界面应该长什么样”
- 都不会把“render”简单等价成“立刻改真实 DOM”

真正不同的是：

- React 的 `render` 更强调“重新执行组件函数，生成新的 UI 描述，并在 Fiber 体系里完成一次新的计算过程”
- Vue 的 `render` 更强调“让组件渲染副作用重新运行，在运行过程中重新读取响应式依赖，再生成新的 vnode 树”

也就是说，两边虽然都在做“重新算 UI”，但触发方式、依赖记录方式、运行时结构都不一样。

#### 先看 React：`render` 更像“重新执行组件，拿到新快照”

在 React 里，函数组件本身就是 UI 计算函数。

所以 React 的 render 阶段做的核心事情是：

1. 从当前 `Fiber` 节点开始处理更新。
2. 读取 Hook 链表和 update queue，算出最新 state。
3. 重新执行函数组件。
4. 得到新的 React Element 树。
5. 基于 `reconciliation` 和旧树比较，生成需要提交的变更。

所以 React 里说“组件 render 了”，很多时候可以近似理解为：

> 这个组件函数又被执行了一次。

例如：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

点击后发生的核心过程是：

- `setCount` 创建 update
- React 调度这次更新
- `Counter` 再执行一次
- 新的这次执行里，`count` 变成 `1`
- 产出新的 UI 描述
- 后面再进入 commit 把差异真正落到 DOM

所以 React 的 `render` 和“这次函数执行里的局部变量”是强绑定的。

这也是为什么 React 里常说：

- 每次 render 都会生成新的闭包
- 每次 render 都有自己那一份 state 快照

#### 再看 Vue：`render` 更像“渲染副作用重新运行”

Vue 组件最终也会有一个 render 函数。

来源一般有两种：

- 手写 `render()`
- 模板先编译，再变成 render 函数

例如模板：

```vue
<template>
  <div>{{ count }}</div>
</template>
```

编译后本质上会变成一段 render 逻辑，运行时执行这段逻辑来生成 vnode。

但 Vue 和 React 很不一样的一点是：

- Vue 不只是“组件函数重新执行”
- 它更像“组件对应的渲染 effect 重新执行”

也就是说，Vue 的 render 是被一个响应式副作用包起来的。

粗略过程是：

1. 组件初次挂载时，创建组件实例。
2. 为组件创建一个渲染副作用 `effect`。
3. `effect` 执行时运行组件 render 函数，生成 vnode 树。
4. render 过程中读到的 `ref/reactive` 数据会被 `track` 记录依赖。
5. 后面依赖变化时，`trigger` 找到这个组件的渲染 effect。
6. 调度器把它放进更新队列。
7. effect 再次运行，重新执行 render，生成新的 vnode。
8. 再通过 patch 把差异应用到真实 DOM。

所以 Vue 里说“组件 render 了”，更准确地说是：

> 这个组件对应的渲染副作用又执行了一次。

#### 两边都不是“render = 立刻改 DOM”

这是非常关键的共同点。

React：

- `render phase` 负责计算
- `commit phase` 才真正提交 DOM 变更

Vue：

- render 负责生成新的 vnode
- `patch` 阶段才真正把差异同步到真实 DOM

所以无论 React 还是 Vue，`render` 都更接近“算结果”，而不是“直接改页面”。

#### 再进一步：React 和 Vue 的 render 依赖收集方式也不同

React：

- 默认不是“读哪个字段就只订阅哪个字段”
- 它通常是状态变了 -> 组件重新执行 -> 再在新旧树之间比较
- 所以粒度更偏“组件级重新计算”

Vue：

- render 过程中会自动收集依赖
- 哪个响应式字段被读取了，依赖关系就建立到哪里
- 后续字段变化时，会更自然地定向触发相关副作用

所以可以很粗地概括为：

- React 更偏“先重新算组件，再 diff”
- Vue 更偏“先追踪依赖，再按依赖触发 render”

### Vue 的 render 是怎么产生的？为什么编译会产出一个 render

这个问题要分成两层看：

1. `render` 在 Vue 里到底是什么
2. 为什么模板不能直接运行，而要先编译成 `render`

#### 先说结论：Vue 运行时真正执行的不是模板字符串，而是 render 函数

我们平时写的是：

```vue
<template>
  <div class="box">{{ count }}</div>
</template>
```

但浏览器和运行时并不认识“Vue 模板语法”本身。

例如下面这些东西：

- `{{ count }}`
- `v-if`
- `v-for`
- `:class`
- `@click`

都不是浏览器原生语法。

所以 Vue 必须先把模板翻译成运行时能执行的 JavaScript 代码，而这个翻译后的结果，核心就是 `render` 函数。

也就是说：

```txt
template -> compile -> render function -> 执行 render -> 生成 vnode
```

#### render 本质上是什么

Vue 的 `render` 本质上是一个函数。

这个函数执行后不会直接生成真实 DOM，而是生成一棵 vnode 树，也就是虚拟节点树。

可以粗略理解成：

```js
function render() {
  return h("div", { class: "box" }, String(count.value));
}
```

当然真实编译结果不会这么简化，会带上很多运行时辅助函数，但核心意思就是：

- 输入：当前组件实例、当前响应式状态、当前作用域
- 输出：这次界面应该对应的 vnode 描述

所以 `render` 的职责可以概括成一句话：

> 根据当前状态，计算出这次 UI 的虚拟节点结果。

#### 为什么模板不能直接用，非得编译成 render

因为模板更适合人写，不适合运行时直接执行。

模板是一种声明式 DSL，可以理解成“面向开发者的描述语言”。它的优点是：

- 可读性强
- 写法接近 HTML
- 更适合表达视图结构

但它的问题是：

- 浏览器本身不认识 Vue 指令
- 模板里的插值、指令、事件、动态绑定都需要被翻译
- 运行时最终需要的是“可执行的计算逻辑”，而不是一段描述文本

#### Vue 编译模板时，底层大致经历了什么

Vue 的模板编译器大致会经历三个阶段：

1. `parse`
2. `transform`
3. `generate`

可以把它理解成一条编译流水线。

##### 1. parse：先把模板解析成 AST

模板：

```vue
<div class="box">{{ count }}</div>
```

首先会被解析成 AST，也就是抽象语法树。

AST 不是最终运行时代码，它更像“结构化中间表示”。

这一步做的事情是：

- 识别标签节点
- 识别属性
- 识别文本
- 识别插值表达式
- 记录它们的层级关系

解析后你可以把它粗略理解成：

```js
{
  type: "Element",
  tag: "div",
  props: [{ name: "class", value: "box" }],
  children: [
    {
      type: "Interpolation",
      content: "count"
    }
  ]
}
```

#### 2. transform：把 AST 转成更适合生成代码的形式

这一步会做很多语义层面的处理，例如：

- 把 `v-if` 转成条件分支结构
- 把 `v-for` 转成循环结构
- 把事件绑定转换成运行时调用形式
- 标记静态节点
- 标记动态节点
- 生成 patch flag 等优化信息

这一层的意义非常大，因为它不只是“改写语法”，还会顺手做优化准备。

例如：

- 哪些节点是纯静态的，可以提升
- 哪些节点是动态文本
- 哪些属性未来更新时需要重点比较

所以 Vue 编译器不只是翻译器，也是优化器。

#### 3. generate：把转换后的 AST 生成为 render 函数字符串或函数代码

到了最后一步，编译器才会真正产出 render 代码。

粗略可能变成这样：

```js
return function render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", { class: "box" }, toDisplayString(_ctx.count), 1);
}
```

这里你会看到几个典型点：

- `_ctx.count`：表示从组件上下文里取值
- `toDisplayString(...)`：把插值值转成显示文本
- `createElementBlock(...)`：创建 vnode/block
- 最后整个函数返回这次渲染结果

这就是“为什么编译最终会产出 render”。

因为运行时需要的不是模板文本，而是这样一个可执行函数。

#### 为什么 Vue 要把模板编译成 render，而不是直接编译成 DOM 操作

因为 Vue 不是“每次状态变了就直接拼 DOM 命令”，它中间还要经过 vnode 这一层抽象。

这样做有几个好处：

- 保留统一的运行时模型
- 先算出新 vnode，再和旧 vnode 比较
- 最后再 patch 到真实 DOM
- 更适合组件化、条件分支、列表更新和跨平台抽象

也就是说，Vue 编译模板的目标不是直接得到“操作 DOM 的脚本”，而是得到“生成 vnode 的 render 函数”。

这和 React 的 JSX 也有相似之处：

- React 把 JSX 编译成 `createElement` 调用
- Vue 把 template 编译成 render 函数调用运行时 helper

两边本质上都是把“声明式视图语法”翻译成“运行时可执行的 UI 描述逻辑”。

#### render 在组件整个运行过程中的位置

把整个链路串起来就是：

1. 你写 `template`
2. Vue 编译器把 `template` 编译成 `render`
3. 组件挂载时创建渲染 `effect`
4. `effect` 执行 `render`
5. `render` 生成 vnode
6. `patch` 把 vnode 变成真实 DOM
7. 以后响应式数据变化，触发 `effect` 重新执行
8. 再次执行 `render`
9. 生成新的 vnode
10. 与旧 vnode 对比后 patch 更新 DOM

所以 render 是 Vue 整个组件运行时链路里的核心中间层。

它既不是模板本身，也不是最终 DOM，而是：

> 把状态转换成 vnode 的那一层可执行逻辑。