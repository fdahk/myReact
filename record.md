7.20:
    1.JSX是什么，和JS的区别？-- jsx是react的语法糖，实现在html中写js，通过babel webpack编译成js。
                               jsx是react.createElement的语法糖，这也是为什么在JSX组件顶部需要 import React，即使没有使用 
                               注意：jsx 在React 17RC版本后：funtction App(){ return <h1>hello,encode</h1> }
                                                        //不再需要React 编译后 =>
                                                        import {jsx as _jsx} from'react/jsx-runtime';
                                                        function App()return jsx('h1',{children:"hello,encode"});
                                                        而如果用了Hooks，仍然需要React

    2. 为什么react 自定义组件要首字母大写？ 
        React.createElementtype 的函数参数：元素类型（标签名）type 元素属性 props 子元素children
        JsX => vdom ->dom , 如果不大写，在编译时会作为字符串传递，在创建Vdom时识别为Html标签<app> 而非 自变量组件 <App>

    3.React组件为什么只有一个根元素？
        书写的组件会被编译成Render函数，函数的返回值只能有一个 
        因为Vdom是树状结构，根节点只能一个，如果有多个根节点，则无法比对到底在哪课树进行更新

    4.该怎么实现返回多个组件呢？ 
        方法一：使用HOC高阶函数 
        方法二：React.fragment(类似于vue 的 template) 或使用<> </> 
    
    5.元素和组件的区别？ 
        React组件有 函数组件 和 类组件
        react元素由jsx创建 且 组件是由若干元素构成的
        React 元素是描述 UI 的普通对象，不是真实的 DOM 元素。它描述了你想在屏幕上看到什么
        组件是可复用的 UI 片段，可以接受 props 并返回 React 元素。组件本质上是一个函数，接收 props，返回 JSX

    6.简述React的生命周期：
        react函数组件没有生命周期，类组件才有
        这个问题等于 => class组件创建一个组件实例 到 销毁的流程 
            生命周期的一个基本流程： 
                挂载：constructor初始化 => static（如getDerivedStateFromProps) 静态方法 => render方法 创建Vdom 
                    => componentDidMount(第一次渲染后的调用，挂载到页面中生成真实dom，即可以访问的dom都在该阶段完成，如异步请求、消息订阅、定时器函数)
                更新：state props 状态变化触发： static getDerivedStateFromProps => shouldComponentUpdate(返回一个boolean，默认T,用于性能优化）
                    在确认组件不需要更新时调用 =>  render 更新vdom => getSnapshotBeforeUpdate 获取更新前状态 => componentDidUpdate 组件完成更新后调用
                卸载 ：componentWillUnmount 组件被移除

7.21 
    1.provider ：
        Provider 组件的本质作用是包裹你的应用，为所有子组件提供某种“全局能力”或“全局状态：
            为什么用 Provider 包裹就能实现全局可用？包裹后返回的新 JSX 和直接在原处写不是一样的 JSX 吗？
                将操作或函数或context写在Provider中，这个作用域在Provider，用provider作为根节点包裹应用，实现全局可用状态 
        为什么要返回 {children}？
            返回实际渲染 Toast 消息的地方。只有把 ToastList 渲染到页面上，用户才能看到弹出的消息
