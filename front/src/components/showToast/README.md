设计记录： 
    1.Context 解决“跨层级传递数据”的问题。Vue 组件实例之间可以直接通过 provide/inject、全局属性、事件总线等方式通信，不需要像 React 那样专门用 Context。
    2.React.FC（或 React.FunctionComponent）是 React 官方提供的一个类型，用于标记“函数式组件”。它会自动帮你加上 children 属性的类型（但你也可以自定义）
    3.函数式组件的声明方法：
        1.箭头函数 + React.FC  const ToastList: React.FC<ToastListProps> = (props) => { 。。。}
        2.function ToastList(props: ToastListProps) {...} 
        区别：
            类型推断和 children，FC自动包含 children 属性
            function 声明更传统，支持函数提升（hoisting）ps: JS在执行代码前，会先扫描一遍，把所有的函数声明和变量声明“提升”到作用域顶部
            FC 支持泛型参数，适合有复杂 props 类型的场景。function 也支持泛型，但写法略有不同。
            用 function 声明时，可以直接给组件加静态属性（如 defaultProps、displayName）。箭头函数写法加静态属性时，需要单独赋值
            推荐 function 声明，本质没区别
    3.React.ReactNode react节点类型 
    4.export default Toast; 或 export { Toast }; export Toast 是错的
    5.toast组件是以toast数组渲染的，当新 toast 加入时，组件会“重新渲染整个数组”，那之前的 toast 会不会被“重新渲染”？
        当 toasts 数组发生变化（比如新加一条），React 会重新执行 ToastList 组件的 render，也就是重新跑一遍 toasts.map(...)。
        但React 并不是把所有 DOM 都销毁重建，而是通过“虚拟 DOM diff 算法”来高效更新。
        关键：key 属性：在 toasts.map(...) 里重新渲染时，React 会用 key 来判断哪些元素是“同一个”，哪些是“新加的”或“被移除的”。
            只要 key 没变，React 会复用原来的 DOM 节点和组件实例，不会
        Vue中同样如此 
    6.align-items 和 align-selfs
    7.这个组件实现全局可用是通过全局函数操作实现的
