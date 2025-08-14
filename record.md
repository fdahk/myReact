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
    3.什么是HOC(高阶组件)，常用方式有哪些
        用于复用组件逻辑的技术，本质上是一个函数，接收一个组件作为参数，返回一个新的组件
        属性代理：二次加工组件，添加属性
            示例：第一层：withCard(color)，接收一个颜色参数，返回一个函数。
                第二层：(Component)，接收一个组件参数，返回一个新的函数组件。
                第三层：(props) => { ... }，这个函数组件接收 props，返回 JSX。
            const withCard = (color) => (Component) => {
                return (props) => {
                    const hocStyle = {
                    margin: "8px",
                    padding: "8px",
                    border: '1ps solid #ccc', // 这里应该是 '1px solid #ccc'
                    borderRadius: "4px",
                    background: color
                    }

                    return (
                    <div style={hocStyle}>
                        <Component {...props} color={color} />
                    </div>
                    )
                }
            }
        反向代理：
    4.如何实现一个withRouter：考察Hoc 和 context 
        ....
    5.react-router-dom v6 提供了哪些新的api
        没有以前的component了，均使用element 
        有哪些API：
            useNavagate :编程式导航（跳转路由）,按钮跳转、表单提交后跳转
            useLocation :获取当前路由信息	读取路径、参数、状态等
            useParams :获取路由动态参数	详情页、参数化路由
            useRoute :声明式配置和渲染路由	嵌套路由、模块化路由
    6.useRoute 是如何使用的？ 如何使用其进行动态路由加载
        对标VUE的router
    动态路由加载示例：
        const DynamicList = React.lazy(()=> import('./List'));
        { path:'/list', element: <Suspense fallback={ <div>loading...</div> }> <DynamicList /> </Suspense> }
    DynamicList 是一个“懒加载组件”，只有用到时才会去请求 ./List 这个模块
        React.lazy(() => import('./List')) 这是 React 官方提供的组件懒加载方案。只有组件真正需要渲染时，才会去加载对应的模块，减少首屏包体积，提高性能
    Suspense 是 React 用于包裹懒加载组件的“占位符”组件
    fallback 属性指定“加载过程中显示的内容”，比如 loading 动画、提示等
    7.redux 的中间件是怎么实现的
        redux将副作用给 中间件进行处理
        执行流程：将输入按编排过的函数顺序依次处理
            fnl, fn2, fn3
            compose([fn1,fn2,fn3])(args);
            fn1(fn2(fn3(args)))
    8.为什么之前react 组件要写import React from 'react'， 现在不用
        对于react，解析jsx语法需要Babel，编译成react.createElement（）等语法
        bebal之前时classic模式，现在时automatic模式，会实现自动引入
    9.react是一个运行时框架，需要编译
    10.stack reconciler 和 fiber reconciler， 为什么后者能解决递归爆栈问题
        前者：递归处理DOM树
        后者：每个节点都维护了child、return、sibling状态，优化遍历方式（将树变成了链表
    11.react中有哪几种数据结构，是干嘛的
        四种：
            v-dom(或者叫element)：通常是函数组件的返回值或render函数的返回值，本质是一个对象
            current fiber： 当前react内存中，表示当前数据状态的核心数据结构
            workInprogress fiber： 状态更新时生成，在react 完成调和、commitWork 更新后，转变成current fiber，两者配合实现双缓存
            真实DOM
            react 调和的过程：就是 currentfiber和v-dom 对比，生成子组件的 workInProgress Fiber 的过程
    12.react 的更新流程：
        beginWork：
            使用 v-dom 和 current fiber 去生成子节点的 workInProgress Fiber期间会执行函数组件、类组件，diff子节点
            给我需要变更的节点，打上 effectTag
            -增placement 20010
            删deletion 8100
            改 update4 0100
            增和改 placmentAndUpdate0110
        completeWork：
            向上走
            把我所有有effectTag 的元素，串联成一个effectList构建真实的DOM，但是不挂载在界面上
        commitWork：
            commitBeforeMutationEffect
            commitMutationEffects
            处理 effectList
            更新界面
            workInProgress Fiber 会切换成current fiber
            commitLayoutEffects
            -执行 useLayoutEffect,cdm,cdu
    13.闭包陷阱：
        什么是闭包：一个函数返回一个数据，外部可以访问这个数据，此时形成闭包
        常见useState 和 useEffect的闭包：通常发生于回调函数中调用值（直接使用变量无法获取最新值）一般采用函数式更新或ref解决闭包陷阱
        产生的原因：react中hook 是以链表的形式存在，执行逻辑依赖于deps，导致无法获取最新值
    14.在react中如何实现渲染的控制：
        情景：父组件的交互触发子组件的渲染，但实际上并没有执行子组件的任何代码：
            解法：增加一个中间函数处理
7.26：
    1.为什么点击事件的函数一定要写箭头函数，不能直接调用：onClick={() => handleClickHeaderIcon(item.method)}
        直接写：函数会在组件渲染时立即执行，而不是点击时执行，每次渲染都会执行一次，点击时不会执行任何操作
        箭头函数写法：每次渲染都会创建一个新的函数，这里也可以用useCallback、useMemo等进行性能优化
        原理：
            JS的两种调用方式：
            // 1. 函数引用（传递函数本身）
            const func = () => console.log("Hello");
            const reference = func; // 传递函数引用
            // 2. 函数调用（立即执行函数）
            const result = func(); // 立即执行，返回 undefined
            // React 期望接收一个函数引用
            <button onClick={functionReference}></button>
            // React 内部处理
            button.addEventListener('click', functionReference);
    2.函数组件的声明方式： 
        箭头函数写法：
            const FileUploader: React.FC<FileUploaderProps> = ({ ... }) => {}
            React.FC = React Function Component（React函数组件类型）
        函数声明写法：
            function ChatView() { return <div>Hello World</div>; }
        比较：
            作用域提升(Hoisting)    会被提升到作用域顶部	     不会被提升
            this绑定	            有独立的this上下文	        继承外部this
            调试友好	            函数名在调用栈中清晰显示     可能显示为匿名函数
        选择：
            声明式：组件是页面级组件，需要良好的调试体验，遵循Next.js等框架的官方建议
            箭头函数： 组件是子组件或工具组件，需要保持this上下文
    3.JS原生http请求API: fetch : 标准使用
         const response = await fetch(`http://127.0.0.1:3007/api${url}`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
               'Accept': 'application/json'
             },
             body: JSON.stringify(data) 
        });
    4.实现redux ：
        核心：实现发布订阅
    5.useroute 的原理：
        核心：将组件间的嵌套 转换成对象的形式，将对象以树的形式储存，根据URL匹配渲染对应的组件
    6.React.children.forEach(children,(node))
          React 提供的遍历子元素的工具方法,遍历 React 组件的 children 属性，对每个子元素执行回调函数
    7.为什么选择messageChannel 让出执行权
        浏览器：一般浏览器的帧率是60(16.666 ms 一帧)
        在一帧中浏览器做了什么：
            1.宏任务 | 微任务 | requestAnimationFramework | layout(绘制) | requestIdelCallback
        如何处理某一帧执行时间过长导致的卡顿（绘制阶段过晚执行）？
            对一个宏任务进行切片：
                有哪些切片的方法：
                    1.promise 执行？ 不行，异步执行仍然需要按顺序执行
                    2.setTimeout： 不行，递归循环环境下会有4ms的延迟
                    3.requestIdelCallback：不行，兼容性问题，50ms渲染问题
                    4.messageChannel：可以，
    8.RN 和 react 在跨端架构上有什么区别：
        webview： 嵌入式浏览器，相当于在APP中嵌入一个微型浏览器
        JSBridge: 
        react最终会编译成div标签
        RN： 编译成类似div，调用api

7.27：
    1.get请求的特点：
        没有请求体：GET 请求不允许有请求体
        只有查询参数：通过 URL 后面的 ? 传递参数 和 请求头：认证信息、内容类型等
    2.Lodash 是一个JavaScript 实用工具库，提供了大量常用的函数来简化 JavaScript 编程： 数组操作、对象操作、防抖、节流等函数均有封装
    3.CSS Modules 的作用机制
        使用.module.scss，这意味着启用了 CSS Modules。CSS Modules 会把你的类名（如 .video-controls）编译成一个独一无二的名字
        必须通过 import styles from './control.module.scss' 这种方式引入，并用 className={styles['video-controls']} 这种写法来使用样式
            或点语法使用，
        推荐使用方括号语法的原因：
            更直观：类名和 SCSS 文件中的完全一致
            无需转换规则：连字符 → 驼峰命名
            支持特殊字符：可以包含连字符、可以数字开头等
            IDE 支持更好：自动补全和跳转更准确
    4.hook设计模式：状态管理hook、 副作用hook、 业务逻辑hook
    


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

8.13:
    1.重排：
        定义：浏览器为计算元素的几何与位置而进行的布局计算（Reflow）。代价高于仅重新着色的重绘（Repaint）。
        常见触发：修改会影响布局的样式（width/height/margin/padding/border/position/font-size/line-height/display）；DOM 结构变化；读写强制同步布局属性
            （如 offsetWidth/Height、clientWidth/Height、scrollTop/Left、getBoundingClientRect、getComputedStyle）。
        优化：
            读写分离（先批量读，再批量写），将操作放进同一帧 requestAnimationFrame；高频事件节流/防抖；
            动画优先使用不会触发布局的属性（transform、opacity），必要时 will-change；
            降低影响范围（content-visibility: auto、contain）；虚拟列表减少真实节点数；避免表格大布局抖动。

    2.babel
        作用：把“新语法/提案（ESNext/TS/JSX）”转换为目标环境可执行的旧语法，同时按需注入运行时辅助/垫片。
        关键：Parse → AST → 插件/预设变换 → 代码 + SourceMap。
        常用：
            @babel/preset-env：结合 browserslist 仅降级必要语法；
            Polyfill 策略：
                1) core-js + useBuiltIns: usage —— 自动按需引入全局垫片（会污染全局，做应用常用）；
                2) @babel/plugin-transform-runtime + @babel/runtime —— 复用 helper，默认不注入全局 polyfill（做库更合适）。
        Vite 场景：esbuild 负责大多语法与打包，@vitejs/plugin-react 用 Babel 处理 JSX、开发时刷新；需要精细降级时再交给 Babel。

    3.跨平台：React 借助虚拟 DOM，带来了跨平台的能力，一套代码多端运行 
        更准确：跨平台来自“协调器（Reconciler）与渲染器（Renderer）解耦”。同一套组件逻辑可接不同渲染器：
            Web 用 react-dom，原生用 react-native，Canvas/WebGL 用第三方渲染器（react-three-fiber 等）。
        实践：
            逻辑与视图解耦（Hook/服务复用，UI 原语按平台适配）；
            可用 react-native-web 在 Web 复用 RN 组件，但并非零改动；
            公共代码抽到 packages/，平台层提供桥接。
    
    4.子类是没有自己的 this 对象的，它只能继承父类的 this 对象，然后对其进行加工
        而 super() 就是将父类中的 this 对象继承给子类的，没有 super() 子类就得不到 this 对象
        如果先调用 this，再初始化 super()，同样是禁止的行为
        说明：派生类的 this 创建与初始化由父类构造负责，规范要求在构造函数中必须先调用 super() 才能使用 this，否则抛 ReferenceError。
        要点：
            super(props) 之后才能访问 this.state/this.props；
            类字段与箭头函数的初始化发生在 super() 之后，箭头函数会绑定当前实例 this；
            访问父类方法可用 super.method()，注意 super 指向原型而非实例。

    5.React并不像vue2中调用Object.defineProperty数据响应式或者Vue3调用Proxy监听数据的变化
        必须通过setState方法来告知react组件state已经发生了改变
        区别：React 不追踪“读依赖”，更新依赖显式调用 setState/useState；Vue 通过响应式系统追踪依赖，直接改值即可触发更新。
        实践：
            遵守不可变数据（返回新引用），不要直接修改 state/props 内部；
            需要基于旧值计算时用函数式更新：setState(s => ...) 或 setCount(c => c + 1)；
            需要“更新完成后”的副作用，类组件用 setState 第二参回调/生命周期，函数组件用 useEffect。
    
    6.哪些有回调函数
        类组件：
            setState(updater, callback) —— callback 在变更提交到 DOM 后执行；
            forceUpdate(callback)；回调 ref：ref={node => {...}}；
            生命周期方法属于 React 在特定时机调用（如 componentDidMount/Update/Unmount）。
        函数组件/Hooks：
            useEffect/useLayoutEffect/useInsertionEffect —— 传入的 effect 是回调，返回清理回调；
            useState 无“完成回调”，但支持函数式更新；useReducer 支持懒初始化回调；
            useImperativeHandle(ref, create) 暴露实例；useMemo/useCallback 接收创建回调；
            startTransition(() => {...}) 把回调中更新标记为“过渡”。

    7.setState:
        ● 在组件生命周期或React合成事件中，setState是异步
        ● 在setTimeout或者原生dom事件中，setState是同步
    
    8.React 中 setState 的批量更新（Batching）机制
        setState 是异步的
        setState 不会立即更新 this.state
        React 会将多个 setState 调用"批量处理"，在事件处理完成后统一更新
        方案1：使用函数式 setState
        方案2：使用 setState 的回调
        方案3：现代 React (Hooks) 写法： setCount(prevCount => prevCount + 1);
        什么时候会批量更新？
            React 17 及之前
            会批量：React 事件处理函数内（onClick、onChange 等）
            不会批量：setTimeout、Promise、原生事件
            React 18+
            自动批量：所有更新都会自动批量处理（包括 setTimeout、Promise）
            可以用 flushSync 强制同步更新

    9.flushSync
        flushSync（React 18）是从 react-dom 导出的一个 API，用来“强制立即提交”包裹回调里的更新，跳过自动批处理，使得 DOM 在当前同步流程内立刻更新，下一行代码读到的就是最新的 DOM/状态
        注：不要当作“让 setState 变同步”的常规手段；多数场景用函数式更新或在 effect 中读取更合适。
    
    10.hash和history的区别
    
    11.深拷贝和浅拷贝

    12.介绍forEach和map并且说出区别

    13..介绍一下正向代理和反向代理

    14.介绍一下代理模式

    15.大模型返回的内容如果是html结构的，怎么处理

    16.性能优化问题如何定位

    17.介绍一下发布订阅模式

    18.vuex和pinia的区别

    19.tcp，udp的区别

    20.进程和线程的区别

    21.promise api

    22.webpack和vite的区别

    21.三栏布局

    22.手写new
    
    23.手写 promise

    24.echart怎么用的

    25.Electron

    26.CSS选择器

    27.react调度机制

    28.useEffect执行机制

    29.useEffect依赖性变化是怎么样的

    30.react响应式的数据流流动过程

    31.浏览器原生监控视窗的方法，三套

    32.bind,apply.call可以改变 this的指向吗(

    33.forEach.map可以用break跳出循环吗?用什么方法可以跳出?

    34..push，pop等会改变原数组吗?

    35.优化首屏加载时间的其他方案

    36.es6 的新特性

    37.讲-下differ算法

    38..SSE

    39.如何使用manus部署网站的

    40.doker

    41.函数组件相对于类组件有什么好处?

    42.canvas如何绘制到canvas

    43.实现瀑布流

    44.本地存储 页面刷新实效问题

    45.存储还有那些 sesectionstore和local的区别

    46.页面有一个接口，需要定时扫描，直到这个接口请求结束，应该怎么实现

    47.dify和LangChain有

    48.fetch底层

    49.intersectionobserver详细解释一下

    50.如何使用three.is实现一个立方体

    51.什么情况下要跨域，怎么做

    52.样式上的偏差怎么反馈给 AI

    53.proxy和defineproperty

    54.怎么拦截页面的推出

    55.TS类型操作

    56.打包部署流程
    怎么打包
    优化打包体积

    57.promise和 async awaitx别

    58.媒体查询

8.14：
    1.React基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等，在React中这套事件机制被称之为合成事件

    2.事件代理函数

    3.组件的创建主要分成了三种方式：
        ● 函数式创建
        ● 通过 React.createClass 方法创建
        ● 继承 React.Component 创建
    4.在React Hooks出来之前，函数式组件可以视为无状态组件，只负责根据传入的props来展示视图，不涉及对state状态的操作
        有状态的组件也就是组件内部存在维护的数据，在类创建的方式中通过this.state进行访问
        当调用this.setState修改组件的状态时，组件会再次会调用render()方法进行重新渲染
    5.函数式创建的组件的方式，最终会通过babel转化成React.createClass这种形式
    6.MVC模式
    7.