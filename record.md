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

7.22 
    1.函数式更新： 为什么用函数式更新（setState(prev => newState)）能保证拿到的是最新的 state？原理是什么？
        React 的 state 更新是“异步批量的”：
            在 React 中，setState（或 setXxx）不会立刻更新 state，而是把更新请求放到一个“队列”里，等到本轮事件循环结束后统一处理。
            这叫做批量更新（Batching），可以提升性能，但也带来一个问题：多次 setState 时，外部的 state 变量可能不是最新的
        例：//两次 setCount 拿到的都是“旧的 count”，都等于 0，最后只加了一次。
            // 假设 count 初始为 0
            setCount(count + 1);
            setCount(count + 1);
        函数式更新原理：
            //传入的是一个函数，React 会在真正更新 state 时，依次执行这些函数，每次都把“最新的 state”作为参数传进去
            //React 在处理 setState 队列时，会把所有函数式 setState 的回调按顺序依次执行，每次都用上一次的最新结果作为参数。
            //这样就能保证每次计算都是基于最新的 state，不会丢失任何一次更新。
            setCount(prev => prev + 1);
            setCount(prev => prev + 1);
    2.受控组件和非受控组件的选择：
        表单建议用受控组件（value/checked 受 state 控制），便于做校验、联动、回显。
        但对于大表单、性能敏感场景，可以用 ref 做非受控组件，减少渲染次数。
            用 ref 获取 DOM 节点，只有需要时（如提交表单）才读取值。
            优点：输入时不会触发 React 渲染，性能更高。
            缺点：不便于做实时校验、联动，数据和视图解耦

    3. 条件渲染时避免组件卸载重建： 用三元表达式或 &&，而不是直接 return null，可以减少组件的卸载/重建，保留内部状态
    4.懒加载和代码分割： 用 React.lazy 和 Suspense 实现组件懒加载，提升首屏性能。
    5. useLayoutEffect 与 useEffect 区别：useLayoutEffect 会在 DOM 更新后同步执行，适合需要测量 DOM 的场景；大多数场景用 useEffect 即可。
    6. React.memo 优化纯函数组件： 用 React.memo 包裹纯函数组件，避免 props 不变时的重复渲染。
        React.memo 和 useMemo 都是 React 的性能优化工具：
            React.memo：用于纯函数组件，props 不变时渲染结果也不变，让函数组件在 props 没有变化时跳过重新渲染，直接复用上一次的渲染结果。
            useMemo:用于组件内部的值缓存。缓存一个“计算结果”，只有依赖项变化时才重新计算，不是缓存组件本身的渲染。
    7.避免在 render/useEffect 里直接写 async 函数： useEffect 里不要直接传 async 函数，可以在内部定义 async 函数再调用，避免返回 Promise。
    8.如何创建工程环境？
        npx create-react-app XXX  (npx: 如果没有包，会临时拉取) 
        npx create-react-app XXX --tamplate typescript 
    9.eject的作用： pnpm run eject 
        实现工程级的自定义配置：打包、builder、loader等 
    10.类组件创建方式：由render函数返回组件，类（对对象形式配置方法
    11.常见hook有哪些
        useEffect： 模拟生命周期、处理副作用、请求接口 
            useEffect 里的代码会在组件渲染到页面后（即 DOM 已经挂载后）执行。这时组件已经准备好，可以安全地发起请求、操作 DOM、订阅事件等。
            其依赖项不同，其作用相当于不同的生命周期，
            依赖空数组时相当于组件销毁时 
            依赖props时相当于数据更新时 


        usestate: 更新UI、返回值时状态数据和修改数据的方法 
        useLayoutEffect： 比副作用函数时机稍微提前 
        useMemo: 返回可缓存的值、一般用于性能优化 
        useCallBack: 返回可缓存函数 
        useRef: 在组件生命周期中保持全局不变、一般用定位具体元素 
        useReducer: 
            在使用redux时，如果用状态数据（useState)的修改方法去修改数据时，可能产生不可预料的问题 
            useReducer让状态变化更可控，reducer明确具体的action，来规范状态修改 
        useContext： 构建全局上下文，一种生产消费的模式，许多第三方库都依赖其开发
        useImperativeHandle: 一般和forwardRef使用，将组件内的方法转发给父组件使用
        非官方Hook：ahooks、reacte-use 
        第三方库内的hook：React-router-dom: useLocation、useNavigate 
    12.hooks使用的注意事项： 
        只能最外层使用（react函数组件、usePAPI或自定义hook）不能写在循环、条件、其他函数中： 
            每个hook的useAPI在fiber中使用链表串联起来，如果时复杂的书写方式，链表的构建会被打断 
        只能在react函数中调用：不能在普通的JS函数中使用hook，只能在组件或自定义hook中调用 
            普通函数（非use开头），用use命名后就可以在函数内部使用hook了
    13.为什么会有hooks
        组件之间复用状态逻辑困难，用hooks可以提取状态
        用类组件时，有很多复杂的生命周期，复杂组件会变的很复杂 
        class难以理解，复杂的this 
    14.redux的更新是异步的，用redux的数据进行操作时要注意

7.23 ：
    1.持久化配置后可以自动恢复数据的原理是什么？如果不需要在根redux合并store，是不是就可以不用导出了？
        原理主要依赖于 redux-persist 库：
            redux-persist 允许您将 Redux store 的状态存储在浏览器的存储中（如 localStorage 或 sessionStorage）
            persistReducer(persistConfig, userSlice.reducer)：
                使用 persistReducer 函数将普通 reducer 包装，生成一个新的 reducer。这个新的 reducer 会在每次状态更新时自动将状态保存到持久化存储中。
    2.createSlice 创建的 slice 会自动生成与 reducer 对应的 action creators
        slice.actions 可获取所有action creator，当然也可以手写action creator函数：
            resetStore = () => ({type: RESET_STORE }) 返回一个action对象，action 对象 是 Redux 状态管理的“指令”，它告诉 reducer：“我要做什么操作”
            可以加 payload 字段，传递更多数据，比如 { type: 'XXX', payload: { text: 'xxx' } }
            使用派发（dispatch）使用 action时，reducer 就会收到 { type: 'XXX', payload:{XXX} }。
            action 对象是 Redux 状态变更的唯一“信号”，所有状态变更都要靠它来驱动
    3.reducer详解：
        Reducer 在 Redux 中的作用：
            reducer 是一个纯函数，它接收当前的状态和一个 action，并返回新的状态。它负责根据 action 的类型和内容来更新 Redux store 中的状态
            reducer 必须保持不可变性，即不能直接修改传入的状态，而是返回一个新的状态对象。这种做法有助于跟踪状态变化，便于调试和维护
            Redux 使用 reducer 来集中管理状态，使得状态的变化可预测且易于调试。所有的状态更新都通过 action 触发，确保了状态变化的透明性
            由于 reducer 是纯函数，给定相同的输入（当前状态和 action），它总是返回相同的输出。这种可预测性使得调试和测试变得更加简单
        reducer 在其他地方的运用：注二者并不是同一个东西，只是设计思想一样
            在函数式编程中，reducer 的概念被广泛应用于处理集合（如数组）的变换，如JS的数组reduce
        Redux 的 reducer 设计要求，当传入的状态为 undefined 时，reducer 应该返回其初始状态。这是 Redux 的一个约定
        注意：在 Redux Toolkit（immer）下，直接赋值 state = ... 并不能改变 Redux store 里的 state
            这样写只是改变了 reducer 函数内部的 state 局部变量的指向，并没有影响到 Redux store 的实际 state
            当state需要整个替换时（通常因为数据是简单类型），应当return action.payload;
    4.在redux中，使用高阶函数 
        什么是高阶函数？
            高阶函数的特点是可以根据输入的参数（type）来决定如何处理状态
        reducer的合并方法：
            combineReducers() //可传入一个reducer对象，自动合并所有reducer
            1.const rootReducer = { user: UserReducer, chat: chatReducer}; ---> newReducer = combineReducers(rootReducer) 
            2.高阶函数对方法1进一步升级：
    5.根store管理状态，获取状态从根store获取，执行action依然各自单独导入 
        子store只负责定义业务逻辑（创建slice、action），状态管理由根store负责
            所以： 子级不应该处理持久化配置等于数据有关的逻辑 
        export type RootState = ReturnType<typeof rootStore.getState>; // 这样可以方便地自动导出所有状态的类型
            getState 是 Redux 的一个方法，返回当前完整的全局 state 对象---- {user：..., friend: ...}    
            在组件中使用: useSelector((state: RootState) => state.chat.globalFriendInfoList) 

    5.报错： 类型XXX没有调用签名  ---> 说明该表达式不是可调用对象、不是合法参数
    6.数据类型 和 拼写问题简直是天坑啊 
    7.子组件定义了style类型，组件引用时不能写其他style，想支持所有属性---》不写类型 或者 类型写 React.CSSProperties
    8.注意应当避免使用，margin 和 width 100%，二者对元素大小的计算会样式异常，应当用父级的padding替代元素的margin
    9.父子组件的函数传递实际上传的是引用： 
        例如： <Child onChange={handlechange}/>  子组件触发onChange实际上就是触发handle Change
            为什么要用花括号包裹handleChange函数：因为这是一个JS表达式
    10.什么是fiber？---> 
        fiber是react 17 引入的一个数据结构，为了使stack reconciler 变成 fiber reconciler 
            其本质是数据结构（一个对象） 
            const FiberNode = {
                tag, //标记我是什么类型的fiber？（根节点、函数组件。。。）
                key, 
                type, // dom元素的节点 
                
                负责构建复杂链表的节点
                return， //指向父节点
                child, //指向第一个子节点
                sibling, //兄弟节点 
                pendingProps， //判断是否要更新一些节点 
                .
                .
                .
                effectTag, //effect副作用链
                alternate // 双缓冲节点 
                stateNode, //储存的dom节点 
            }
    11.react版本区别
        16.8前： stack reconciler 没有fiber 没有 fiber reconciler 基本都是class组件写法
        17.0： 有fiber reconciler 解决了递归搜索爆栈问题 
            17.0.2 : leagcy 模式 create-react-app 创建项目的默认模式 不支持支持高优先级打断低优先级 
        18： 支持支持高优先级打断低优先级  增加usetransition 
    12.setState是同步还是异步---> 18版本： 异步  17:异步，但是由于（batUpdate 批量更新机制）如setTimeout中17是同步的,18依然异步
    13.如何在react实现vue中的expose功能，实现父级可以控制子级的属性或方法或DOM
        ref绑定转发： ref绑定dom，使用useImperativeHandle转发
    14.useEffect 与 useLayouEffect 的区别：
        useEffect： 异步调用，等主线程任务完成。DOM更新、JS完成、视图绘制完成，再执行
        useLayOutEffect： 同步执行，Dom更新后，视图绘制完成前，这个时机可以更方便、搞笑的修改dom，避免重绘、回流
        总结：改dom用后者，其他都用前者 
    15.useInsertionEffect： 
        比useLayoutEffect更早，执行时，Dom还没更新，用于解决css-in-js，渲染注入样式的性能问题 
            因为有些动态标签生产行为在那两个effect的时机执行会影响布局
    16.上面三者，useLayoutEffect 和 componentDidMount、 componentDidUpdate更相似，都是同步执行 

7.24： 
    1.forwardRef 是 React 提供的一个高阶组件（HOC），用于让父组件可以拿到子组件内部某个 DOM 元素或组件实例的 ref。
        通常用于函数组件，因为函数组件本身没有实例，不能直接用 ref
        在 React 中，ref 通常只能直接绑定到原生 DOM 元素或 class 组件。
            如果你有一个自定义的函数组件，父组件想直接操作它内部的某个 DOM 元素（比如聚焦 input、滚动 div），就需要用 forwardRef
            const MyInput = forwardRef((props, ref) => (
            <input ref={ref} {...props} />
            ));

            // 这样父组件就可以用 ref 拿到 input 元素
            const inputRef = useRef();
            <MyInput ref={inputRef} />
    2.react动画： （react-transition-group 或 framer-motion）
    3.拖拽排序（react-beautiful-dnd）
    4.代码分割与懒加载（React.lazy、Suspense）
    5.单元测试（Jest + React Testing Library，选做）
    6.localStorage、sessionStorage 二者的区别
    7.项目亮点有哪些：
        国际化与多语言支持，集成 i18n，实现多语言切换
        权限与安全：路由权限控制、接口权限校验、XSS/CSRF 防护等
        DevOps 与自动化部署 集成 CI/CD 流程，自动化测试、构建、部署
        高性能优化：虚拟列表、懒加载、图片压缩、代码分包（Code Splitting）、SSR（服务端渲染）、静态资源缓存等
    8.Array.from({length: 1000}, (_, index) => index)
        Array.from 是 JavaScript 的一个静态方法，可以用来从类数组对象或可迭代对象创建一个新的数组
        常见用法有两个参数：
            第一个参数：要转换的对象（可以是有 length 属性的对象）
                当 Array.from 的第一个参数是一个类数组对象（即有 length 属性的对象），它会读取这个 length 属性的值，决定要生成多长的数组
                示例：Array.from({ 0: 'a', 2: 'b', length: 3 }) // ['a', undefined, 'b']
            第二个参数（可选）：map 函数，对每个元素进行处理
    9.类型定义时data: [] 和 data: Array的区别：
        data: [] --- 这是一个长度恒为 0 的元组类型，也就是只能是空数组。你只能赋值 []，不能有任何元素
            元组是一种可以限定“元素个数和每个元素类型”的数组： let tuple: [number, string] = [1, 'a'];
        标准写法：data: any[] 或 data: Array<any> 或 data: unknown[] 或 T[]; //注：写any不推荐，代码规范会警告
    10.尖括号是什么：尖括号 < > 主要用于泛型（Generic）的语法，泛型就是类型的参数化，让你的代码可以适配多种类型，而不是写死某一种类型
    11.className='my-class' 用于给元素添加 CSS 类名
    12.style={{height:100}} 默认单位是什么，为什么要两个花括号
        写的是数字默认单位是 px，用其他单位（比如百分比、em、rem），需要写成字符串）style={{height: '50%'}}
        两层花括号是因为 JSX 里要传 JS 对象，style的参数必须是对象
        HTML元素可以写字符串：<div style="color: red; font-size: 20px;"></div>
    13.ReactDOM 和 ReactNode ：
        ReactDOM 是一个库（对象）不是类型。负责把 React 组件渲染到真实的 DOM 上。
            常用方法：ReactDOM.render()（React 18 之前），ReactDOM.createRoot()（React 18 及以后）
            root = ReactDOM.createRoot(document.getElementById('root'));   root.render(<App />)
        ReactNode 是一个类型（TypeScript 类型），不是库。
            用于描述“可以被 React 渲染的内容”。包含：JSX 元素、字符串、数字、数组、null、undefined、boolean 等
             children: ReactNode;
    14.泛型T: 
        使用组件时显式指定：<VirtualList<User> ... /> 指定后 T 就是你指定的类型，不能变
        类型推断：<VirtualList data={userList}/>
        指定多个泛型： interface Props<T, U> { data: T[]; extra: U; } //注：如果类型不一样，不能都用T字母
    15. 滚动事件 onScroll 应绑定在设置了 overflow: auto 或 overflow: scroll 的可滚动容器元素上
    16.react通过简单的 props 和 children 即可实现vue中的默认插槽、具名插槽
        作用域插槽：父组件不仅能传内容，还能“接收”子组件传出来的数据，然后用这些数据自定义渲染内容
            //VUE写法
            <slot :item="item"></slot> // 子组件
            <MyComponent v-slot="{ item }"> //父接收值
                <div>{{ item.name }}</div>
            </MyComponent>
            //React写法
            function MyComponent({ render }) { //子
                const item = { name: '张三' };
                return <div>{render(item)}</div>;
            }
            <MyComponent render={item => <div>{item.name}</div>} /> //父 
    17. 事件的类型： 
        所有 React 事件的基础类型： (event: React.SyntheticEvent) => void 
        点击事件	React.MouseEvent<HTMLDivElement>	div、button 等
        输入事件	React.ChangeEvent<HTMLInputElement>	input、textarea
        表单提交事件	React.FormEvent<HTMLFormElement>	form
        滚动事件	React.UIEvent<HTMLDivElement>	div、window
        键盘事件	React.KeyboardEvent<HTMLInputElement>	input、textarea
        焦点事件	React.FocusEvent<HTMLInputElement>	input、textarea        
7.25：
    1.React.Key 是 React 中用于唯一标识列表中每个元素的特殊属性。它的作用和原理如下
        React.Key 的定义： type Key = string | number;
    2.指定函数的泛型返回值： function identity<T>(arg: T): T { return arg; }


React事件系统剖析：
    React 的事件系统：合成事件（SyntheticEvent）
    React 为了兼容所有浏览器，实现了自己的事件系统，叫合成事件（SyntheticEvent）。
    合成事件对象（如 e）是事件池中的对象，事件回调执行完后会被回收和复用，以提升性能和减少内存消耗。
    2. 事件对象的生命周期
    在事件处理函数（如 onScroll={handleScroll}）执行期间，e 是有效的。
    一旦事件处理函数执行结束，React 会把 e 回收到事件池，下次事件复用。
    如果你把 e 传到异步回调（如 setTimeout、Promise、requestAnimationFrame），此时 e 可能已经被回收，属性会变成 null 或初始值。
    深入原理：
        为什么 React 要这样设计？
        事件池机制：React 复用事件对象，减少频繁创建和销毁对象带来的性能损耗。
        性能优化：在高频事件（如 scroll、mousemove）下，事件池能显著减少内存压力。
        事件对象的“持久化”
        如果你确实需要在异步回调中用事件对象，可以调用 e.persist()，让 React 不回收这个事件对象。
        但更推荐的做法是：只取出你需要的属性，传递到异步回调，这样更高效、更安全。
        6. 其他异步场景也要注意
        不只是 requestAnimationFrame，在 setTimeout、Promise.then、setInterval 等异步回调里也有同样的问题。
        只要用到事件对象，都要提前取值




React数据与视图、生命周期等 ：
    React数据驱动视图的核心原理：React采用单向数据流的数据驱动视图模式，其核心思想是：UI = f(state)，即界面是状态的函数。
        与VUE的比较： 
            数据流动方向：默认也是单向（父传子 props），但可以通过 .sync、v-model 实现“子改父”

    React代码执行流程详解 ：
        1.初始化阶段 
            // 组件挂载流程：React 类组件（Class Component）的生命周期流程
            constructor() → getDerivedStateFromProps() → render() → componentDidMount()
            函数组件的“生命周期”是通过 useEffect、useState 等 Hook 实现的：
                例如：组件挂载/更新：useEffect(() => { ... })
                    组件卸载：useEffect(() => { return () => { ... } }, [])
                    状态管理：useState
                    派生状态：自己用 useEffect 或计算属性实现
        
        2.更新阶段 
            // 状态变化触发的更新流程
            setState/props变化 → getDerivedStateFromProps() → shouldComponentUpdate() → render() → getSnapshotBeforeUpdate() → componentDidUpdate() 
    
    React Fiber架构执行原理： React使用Fiber架构来精确控制渲染过程
        // Fiber的工作循环
        function workLoop() {
        while (workInProgress && !shouldYield()) {
            workInProgress = performUnitOfWork(workInProgress);
        }
        }

        // 分为两个阶段
        // Render阶段：可中断，构建Fiber树
        // Commit阶段：不可中断，应用DOM变更 

    数据与视图的精准处理 ：
        1.状态管理层次：
            // 本地状态 - 组件内部数据
            const [count, setCount] = useState(0);

            // 提升状态 - 共享给子组件
            const [sharedData, setSharedData] = useState({});

            // 全局状态 - 使用Context或状态管理库
            const globalState = useContext(AppContext); 
        
        2.数据流向控制 ：
            // 单向数据流示例
            function Parent() {
            const [data, setData] = useState([]);
            
            // 数据向下传递
            return <Child data={data} onUpdate={setData} />;
            }

            function Child({ data, onUpdate }) {
            // 事件向上传递
            const handleClick = () => onUpdate(newData);
            return <div onClick={handleClick}>{data.map(...)}</div>;
            }
        
        3.精准的依赖追踪 
            // useEffect精准控制副作用
            useEffect(() => {
            // 只在特定依赖变化时执行
            fetchData(userId);
            }, [userId]); // 依赖数组

            // useMemo优化计算
                与VUE的比较：Vue 的 computed 是响应式系统自动追踪依赖，React 的 useMemo 需要手动指定依赖数组
            const expensiveValue = useMemo(() => {
            return heavyCalculation(data);
            }, [data]);

            // useCallback优化函数引用
            const memoizedCallback = useCallback((id) => {
            doSomething(id);
            }, [dependency]);
    
    代码执行顺序的精准控制 
        1.生命周期的执行顺序 
            class Component extends React.Component {
            constructor() {
                // 1. 最先执行，初始化state
                console.log('1. constructor');
            }
            
            static getDerivedStateFromProps() {
                // 2. 每次render前执行
                console.log('2. getDerivedStateFromProps');
            }
            
            render() {
                // 3. 返回JSX结构
                console.log('3. render');
                return <div>...</div>;
            }
            
            componentDidMount() {
                // 4. 组件挂载后执行
                console.log('4. componentDidMount');
            }
            }
        
        2.hooks执行顺序 
            function Component() {
            // Hooks必须在顶层调用，保证执行顺序一致
            
            // 1. useState按声明顺序执行
            const [count, setCount] = useState(0);
            const [name, setName] = useState('');
            
            // 2. useEffect按声明顺序执行
            useEffect(() => {
                console.log('第一个effect');
            }, []);
            
            useEffect(() => {
                console.log('第二个effect');
            }, [count]);
            
            return <div>...</div>;
            }
        
        3.异步操作的执行控制 
            function AsyncComponent() {
            const [loading, setLoading] = useState(false);
            const [data, setData] = useState(null);
            
            useEffect(() => {
                async function fetchData() {
                setLoading(true);
                try {
                    // 控制异步操作顺序
                    const result1 = await api.getData();
                    const result2 = await api.getMoreData(result1.id);
                    
                    setData(result2);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
                }
                
                fetchData();
            }, []);
            
            // 根据状态精准渲染
            if (loading) return <Loading />;
            if (!data) return <Empty />;
            return <DataDisplay data={data} />;
            } 
    
    开发推荐： 
        1.状态设计原则 ：
            // 错误：冗余状态
            const [users, setUsers] = useState([]);
            const [userCount, setUserCount] = useState(0);

            // 正确：派生状态
            const [users, setUsers] = useState([]);
            const userCount = users.length; // 派生计算 
        
        2.渲染优化策略
            // 使用React.memo防止不必要的重渲染
            const MemoizedChild = React.memo(({ data }) => {
            return <div>{data.name}</div>;
            }, (prevProps, nextProps) => {
            // 自定义比较逻辑
            return prevProps.data.id === nextProps.data.id;
            });

            // 使用key属性优化列表渲染
            function List({ items }) {
            return (
                <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
                </ul>
            );
            }
        
        3.错误处理：
            class ErrorBoundary extends React.Component {
            constructor(props) {
                super(props);
                this.state = { hasError: false };
            }
            
            static getDerivedStateFromError(error) {
                return { hasError: true };
            }
            
            componentDidCatch(error, errorInfo) {
                console.log('Error caught:', error, errorInfo);
            }
            
            render() {
                if (this.state.hasError) {
                return <h1>Something went wrong.</h1>;
                }
                return this.props.children;
            }
            }