8.20：
    1.闭包的核心条件
        函数嵌套：一个函数内部定义了另一个函数。
        引用外部变量：内部函数引用了外部函数的变量。
        只要满足这两个条件，无论内部函数是否有参数，都会形成闭包
            var cancellable = function(fn, args, t) {
            const timer = setInterval(() => {
                fn(...args);
            }, t);

            return () => clearInterval(timer); // 无参数
            };
            返回的函数 () => clearInterval(timer) 引用了外部变量 timer ，因此是闭包。
            特点：通过闭包直接访问 timer ，调用时无需参数

            var cancellable = function(fn, args, t) {
            const timer = setInterval(() => {
                fn(...args);
            }, t);

            return (timerParam) => clearInterval(timerParam); // 有参数
            };
            返回的函数没有引用外部变量 timer ，因此 不是闭包。
            它只是接收一个参数 timerParam ，与外部变量 timer 无关。

    2.逗号操作符：JavaScript中一个容易被忽视但很有用的操作符
        核心特性
            1. 从左到右执行所有表达式
            2. 返回最后一个表达式的值
    
8.22：
    1.for...in 和 for...of 是两个完全不同的循环语句
    for (let key in obj)
        遍历属性名：返回对象的键名（属性名）
        适用于对象：主要用于遍历对象（或数组）的属性
        包含继承属性：会遍历原型链上的可枚举属性
    2.for (let value of iterable)
        遍历值：返回值本身
        适用于可迭代对象：数组、字符串、Set、Map、NodeList等
        不能直接遍历普通对象：普通对象不是可迭代的
    
    3.数组会产生稀疏数组（sparse array）
        当我们跳过某个索引时，这个索引根本不会被处理： [0, , 2]
            let temp = [];
            // 直接设置不连续的索引
            temp[0] = 1;    // temp = [1]
            // 跳过索引1，不做任何操作
            temp[2] = 2;    // temp = [1, empty, 2]
            console.log(temp);           // [1, , 2]
            console.log(temp.length);    // 3
            console.log(temp[1]);        // undefined
            console.log(1 in temp);      // false - 索引1不存在
            console.log(temp.hasOwnProperty(1)); // false

        // 移除空值：如果索引不存在（空槽），直接跳过，不处理
        filter(i => i) 能够移除空槽和假值
    
    4.x滚动条出现的原因：
        虽然设置了 box-sizing: border-box，但：
        100vw 包含了垂直滚动条的宽度（通常15-17px）
        垂直滚动条占用了可用宽度，但 100vw 仍然是完整视口宽度
        导致内容区域 = 100vw，但可用空间 = 100vw - 滚动条宽度
        解决： width: 100%; /* 相对于父容器的可用空间 */

    5.Array.from() 是ES6引入的一个静态方法，用于从类数组对象或可迭代对象创建新的数组
        Array.from(arrayLike, mapFn, thisArg)
        arrayLike：类数组对象或可迭代对象
            类数组对象： 
            {
                length: 5
                // 注意：没有索引属性 0, 1, 2, 3, 4
            };

            // 数组在内部实际上类似于这样的对象：
            {
                0: 'a',
                1: 'b', 
                2: 'c',
                length: 3,
                // 还有各种数组方法：push, pop, map, forEach 等
                __proto__: Array.prototype
            }
        thisArg（可选）：执行映射函数时的 this 值
    
    6.浏览器事件有哪些：
        ### 1. 鼠标事件 (Mouse Events)
        - click - 单击
        - dblclick - 双击  
        - mousedown - 鼠标按下
        - mouseup - 鼠标松开
        - mouseover - 鼠标移入
        - mouseout - 鼠标移出
        - mouseenter - 鼠标进入（不冒泡）
        - mouseleave - 鼠标离开（不冒泡）
        - mousemove - 鼠标移动
        - contextmenu - 右键菜单
        
        ### 2. 键盘事件 (Keyboard Events)
        - keydown - 键盘按下
        - keyup - 键盘松开
        - keypress - 键盘按键（已废弃，用keydown替代）
        
        ### 3. 表单事件 (Form Events)
        - submit - 表单提交
        - reset - 表单重置
        - change - 值改变
        - input - 输入内容
        - focus - 获得焦点
        - blur - 失去焦点
        - focusin - 获得焦点（冒泡版本）
        - focusout - 失去焦点（冒泡版本）
        - select - 文本选择
        
        ### 4. 窗口事件 (Window Events)
        - load - 页面加载完成
        - unload - 页面卸载
        - beforeunload - 页面卸载前
        - resize - 窗口大小改变
        - scroll - 滚动
        - hashchange - URL hash 改变
        - popstate - 浏览器历史改变
        
        ### 5. 触摸事件 (Touch Events)
        - touchstart - 触摸开始
        - touchmove - 触摸移动
        - touchend - 触摸结束
        - touchcancel - 触摸取消
        
        ### 6. 拖拽事件 (Drag Events)
        - dragstart - 开始拖拽
        - drag - 拖拽中
        - dragend - 拖拽结束
        - dragenter - 拖入目标
        - dragover - 在目标上方
        - dragleave - 离开目标
        - drop - 放置
        
        ### 7. 媒体事件 (Media Events)
        - play - 开始播放
        - pause - 暂停
        - ended - 播放结束
        - loadstart - 开始加载
        - loadeddata - 数据加载完成
        - canplay - 可以播放
        - canplaythrough - 可以流畅播放
        
        ### 8. 网络事件 (Network Events)
        - online - 网络连接
        - offline - 网络断开
        - error - 加载错误
        
        ### 9. 动画事件 (Animation Events)
        - animationstart - 动画开始
        - animationend - 动画结束
        - animationiteration - 动画重复
        
        ### 10. 过渡事件 (Transition Events)
        - transitionstart - 过渡开始
        - transitionend - 过渡结束
        - transitionrun - 过渡运行
        - transitioncancel - 过渡取消
        
        ### 事件处理常用模式
        ```javascript
        // 事件监听器
        element.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认行为
            event.stopPropagation(); // 阻止事件冒泡
        });
        
        // 事件委托
        document.addEventListener('click', function(event) {
            if (event.target.matches('.button')) {
                // 处理按钮点击
            }
        });
        
        // 移除事件监听器
        element.removeEventListener('click', handler);
        ```  

        ### 事件对象常用属性
        - event.type - 事件类型
        - event.target - 事件目标元素
        - event.currentTarget - 当前处理事件的元素
        - event.clientX/clientY - 鼠标相对于视口的坐标
        - event.pageX/pageY - 鼠标相对于页面的坐标
        - event.key - 按键值
        - event.code - 按键代码
    
8.23：
    1.JS中的类
        属性定义：
            listener = {}; // 直接在类中定义
            static listener = {}; // 所有实例共享同一个对象
            const listener = {}; // ❌ 语法错误！类中不能直接用const

8.24
    1.为什么返回 this 就能实现链式调用
        const result = calc.add(5).multiply(2).subtract(3).getResult()
    
8.26：
    1.for...in 循环中的索引确实总是字符串类型
        数组本质上是对象，对象的属性名总是字符串类型
        推荐遍历方法：
            // 遍历数组值
            for (const item of array) { }

            // 需要索引时
            for (const [index, item] of array.entries()) { }

            // 函数式编程
            array.forEach((item, index) => { });

            // 传统循环
            for (let i = 0; i < array.length; i++) { }


​    2.点击元素没有触发事件？
        可能元素有重叠，实际点击元素被覆盖
        需要的效果在父级，但是事件冒泡被拦截了，没有被父级获取

​	 3.大小继承 

    4.inline-block 和 white-space: nowrap 的组合在微信小程序中会强制撑开父容器


    5. 子元素设置 opacity: 1 只是相对于父元素的透明度
        最终效果 = 父透明度 × 子透明度 = 0.6 × 1 = 0.6

    6. gap坑
        间隔计算不对，看看是不是哪里有gap

    7. :status="'进行中'" 在vue中这样写才正确，单个引号包裹的是变量

8.27：
    1.Array.prototype.entries() 是数组的一个内置方法，它返回一个新的数组迭代器对象，该对象包含数组中每个索引的键值对
        迭代器是一次性的，遍历完后需要重新调用 entries() 获取新的迭代器
    
    2.迭代器（Iterator）是一种设计模式，它提供了一种统一的方式来遍历不同类型的数据结构。在 JS 中，迭代器是一个对象，它实现了迭代器协议。
        迭代器协议
        迭代器必须实现 next() 方法，该方法返回一个对象，包含两个属性：
        value：当前迭代的值
        done：布尔值，表示迭代是否完成

        一次性使用：迭代器遍历完后就不能再使用了
        状态保持：迭代器会保持当前的遍历状态
        性能考虑：对于大量数据，迭代器比数组更节省内存
    
    3.可迭代对象（Iterable）
        可迭代对象是实现了 Symbol.iterator 方法的对象。这个方法返回一个迭代器。

    4.对内置可迭代对象
        const arr = [1, 2, 3];
        const iterator = arr[Symbol.iterator]();

        Symbol.iterator 是什么？
            Symbol.iterator 是一个内置的 Symbol，用来定义对象默认迭代器的特殊属性键
            Symbol 是 ES6 引入的一种新的原始数据类型，用于创建唯一的标识符

    5.生成器函数（Generator）
        生成器函数是创建迭代器的更简便方式
        function* numberGenerator() {
            yield 1;
            yield 2;
            yield 3;
        }
        
        yield 关键字用于暂停函数执行并返回一个值
            每次调用 next() 方法时，函数会从上次 yield 的位置继续执行
            yield 后面的表达式就是返回给调用者的值
        实际应用场景
            无限序列生成：
            异步操作控制：
            状态机实现
        优势
        内存效率：按需生成值，不需要一次性创建所有数据
        惰性求值：只在需要时才计算下一个值
        状态保持：自动保存函数执行状态
        简洁语法：比手动实现迭代器更简单

8.27：
    1.instance of 
        返回值：布尔值（true/false）
        工作原理：
            instanceof 检查构造函数的 prototype 属性是否出现在对象的原型链中
            所以其只支持对象使用
        注意：
            const str1 = 'hello';              // 基本类型
            const str2 = new String('hello');  // 包装对象
            console.log(str1 instanceof String); // false
            console.log(str2 instanceof String); // true

        最佳实践
        数组检测：优先使用 Array.isArray()
        跨框架场景：使用 Object.prototype.toString.call()
        错误处理：instanceof 是好选择
        DOM元素：instanceof 很适用
        自定义类：instanceof 是标准做法
    
    2.类型的通用检测方法：
        通用检测（使用 Object.prototype.toString）
  
    3. null - 虽然 typeof 显示 "object"，但它不是对象
        历史遗留问题，被称为"JavaScript 最著名的 bug"
        正确的检测方式：使用严格相等 (===) 或 Object.prototype.toString.call()
        现代解决方案：使用空值合并 (??) 和可选链 (?.) 操作符
 
    2.JS的对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性

    3.person.constructor === Person
        // 传统构造函数
        function Person(name) {
            this.name = name;
        }
        const person = new Person('John');

        // 当你定义一个函数时，JavaScript 自动做了这些事：
        function Person(name) {
            this.name = name;
        }
        // JavaScript 自动执行（概念上）：
        // Person.prototype.constructor = Person;

        // ES6 类语法： 类实际上就是构造函数的语法糖
        class Animal {
            constructor(name) {
                this.name = name;
            }
        }
        
        person.constructor === Person 的原因：
        constructor 属性存储在 Person.prototype 上
        JavaScript 自动设置 Person.prototype.constructor = Person
        实例通过原型链访问到这个属性
        类就是构造函数：
        ES6 的 class 本质上是构造函数的语法糖
        typeof MyClass === 'function'
        类和构造函数在功能上完全等价
        // ❌ 传统构造函数写法
        function Person(name, age) {
            this.name = name;
        }

        Person.prototype.sayHello = function() {
            return `Hello, I'm ${this.name}`;
        };

        // ✅ ES6 Class 写法（更简洁！）
        class Person {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
            
            sayHello() {
                return `Hello, I'm ${this.name}`;
            }
        }

    4.__proto__ 
        绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，
        实际上，它来自 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)

    5.JS 采用的是词法（静态）作用域，函数的作用域在函数定义的时候就决定了。
        与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的

    6.JS引擎并非一行一行地分析和执行程序，而是一段一段的。当执行一段代码的时候，会进行一个"准备工作"
        可执行代码(executable code)的类型有哪些：
            三种，全局代码、函数代码、eval代码。
            举例，当执行到一个函数的时，就会进行准备工作，这里的"准备工作"，让我们用更专业点的说法，就叫做"执行上下文(execution context)
        
        什么是执行上下文（Execution Context）？
            执行上下文是代码执行时的环境，包含了代码执行所需的所有信息
            每个执行上下文都包含三个重要组成部分：
                1. 变量对象（Variable Object，VO）：存储变量、函数声明、参数等
                2. 作用域链（Scope Chain）：用于变量查找的链式结构
                3. this指向：确定this的值
        
        如何管理创建的执行上下文呢？
            JS引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文
        
        什么是执行上下文栈？
            执行上下文栈是一个LIFO（后进先出）的栈结构，用来管理执行上下文的创建和销毁
            
            执行流程：
            1. JavaScript开始执行时，首先创建全局执行上下文，压入栈底
            2. 每当调用一个函数时，创建该函数的执行上下文，压入栈顶
            3. 函数执行完毕后，其执行上下文从栈顶弹出
            4. 程序结束时，全局执行上下文最后弹出
  
        
        执行上下文的创建过程：
            分为两个阶段：
            1. 创建阶段（Creation Phase）：
                - 创建变量对象（VO）
                - 建立作用域链
                - 确定this指向
                - 进行变量提升和函数提升
            2. 执行阶段（Execution Phase）：
                - 变量赋值
                - 函数引用
                - 执行代码
        
        7.变量对象（Variable Object）详解：
            在函数执行上下文中，变量对象也称为活动对象（Activation Object，AO）
            
            创建过程：
            1. 函数的所有形参（如果是函数上下文）
                - 由名称和对应值组成一个变量对象的属性被创建
                - 没有实参，属性值设为undefined
            
            2. 函数声明
                - 由名称和对应值（函数对象）组成一个变量对象的属性被创建
                - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
            
            3. 变量声明
                - 由名称和对应值（undefined）组成一个变量对象的属性被创建
                - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性
        
        8.作用域链（Scope Chain）详解：
            作用域链是一个对象列表，用于变量查找
            查找过程：
            1. 在当前执行上下文的变量对象中查找
            2. 如果没找到，就在父级执行上下文的变量对象中查找
            3. 一直找到全局执行上下文的变量对象
            4. 如果还没找到，就报ReferenceError
            
        9. this指向的确定：
            this的值在执行上下文创建阶段就确定了，不是在执行阶段
            确定规则：
            1. 全局执行上下文中，this指向全局对象（浏览器中是window）
            2. 函数执行上下文中：
                - 如果函数被一个引用对象调用，this指向那个对象
                - 否则，this指向全局对象或undefined（严格模式）
                - 箭头函数的this继承自外层执行上下文

8.28：
    1.ECMAScript 的类型分为语言类型和规范类型
        规范类型相当于 meta-values，用来用算法描述 ECMAScript 语言结构和语言类型的。规范类型包括：
        Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record

    2. 作用域 vs this 指向
        作用域（Scope）：决定变量的访问范围
        this 指向：决定函数执行时 this 的值
        它们是完全独立的机制！
        this 的指向只看调用方式，不看变量所在作用域

    3.bind/call/apply 改变 this 指向
        bind/call/apply 三个方法的区别。
            一句话总结，都用来改变相关函数 this 指向，但 call/apply 是直接进行相关函数调用；bind 不会执行相关函数，而是返回一个新的函数，新的函数已经自动绑定了新的 this 指向，开发者手动调用即可。再具体的 call/apply 之间的区别主要体现在参数设定上
        call、apply、bind、new 对 this 绑定的情况称为显式绑定；根据调用关系确定的 this 指向称为隐式绑定
    
    4.new 操作符调用构造函数，具体做了什么？
        ● 创建一个新的对象；
        ● 将构造函数的 this 指向这个新对象；
        ● 为这个对象添加属性、方法等；
        ● 最终返回新对象
        相当于：
        var obj = {}                    // 1. 创建空对象
        obj.__proto__ = Foo.prototype   // 2. 设置原型链
        Foo.call(obj)                   // 3. 执行构造函数
    
    5.如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例

    6.变量提升和函数提升会提升到哪

    7.箭头函数没有自己的 this，它会继承外层作用域的 this
        fn: function() {           // ← 这是箭头函数的外层函数（定义位置）
            setTimeout(() => {     // ← 箭头函数定义在 fn 函数内部
                console.log(this)  // ← 继承定义时外层的 this
            })                     // ← setTimeout 只是调用者，不是定义者
        
    8.new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高

    9.箭头函数的绑定无法被修改

    10.const 声明的变量不会挂载到 window 全局对象当中。因此 this 指向 window 时，找不到 var a 变量

    11.理论上： 闭包 = 函数 + 函数能够访问的自由变量
        所以，从技术的角度讲，所有的JavaScript函数都是闭包

    12.从实践角度：以下函数才算是闭包：
        a. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
        b. 在代码中引用了自由变量
        例如：fContext = {
            AO:{}
            Scope: [AO, checkscopeContext.AO, globalContext.VO],
        }
        函数的执行上下文会维护一个作用域链，这就是闭包，其在其父函数的执行阶段确认了作用域链

    13.什么是执行上下文：
        globalContext = {
            VO: {
                scope: "global scope",
                checkscope: function checkscope(){...},
                foo: undefined
            },
            Scope: [globalContext.VO],
            this: window/global
        }

        执行上下文创建阶段 =》 执行阶段 =》 执行完毕，执行上下文从栈中弹出

    13.代码运行的第一个阶段：程序解析阶段（Parse Time）
        // JavaScript引擎解析全局代码时：
        // - 发现 checkscope 函数声明
        // - 创建 checkscope 函数对象
        // - checkscope.[[Scope]] = [GO] （全局对象）

        // 当解析到 checkscope 函数体时：
        // - 发现内部函数 f 的声明
        // - 但此时还不会创建 f 的函数对象
        // - 只是记录 f 的存在

    14.赋值和函数的参数传递是对象时，是拷贝了一份引用副本

    15.对于undefined和null， isNull()的返回值都是true

9.1：
    1.Arguments 对象只定义在函数体中，包括了函数的参数和其他属性
        传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
        除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的

    2.Arguments 对象的 callee 属性，通过它可以调用函数自身。
        闭包经问题就可以使用 callee 解决
        var data = [];
        for (var i = 0; i < 3; i++) {
            (data[i] = function () {
            console.log(arguments.callee.i) 
            }).i = i;
        }
        data[0]();  0
        data[1]();  1
        data[2]();  2

    3.// 使用 apply 将 foo 的arguments参数传递给 bar
        function foo() {
            bar.apply(this, arguments);
        }
        ES6能直接用展开运算符

    4.深入理解：原型链的建立时机
        // new 操作符的执行过程：
        // 1. 创建新对象
        // 2. 设置原型链：obj.__proto__ = Constructor.prototype
        // 3. 执行构造函数：Constructor.call(obj, ...args)

        // 所以构造函数内部修改 prototype 不会影响已经创建的对象

    5.寄生-构造函数-模式，寄生在构造函数的一种方法。
        场景：创建一个具有额外方法的特殊数组，但是又不想直接修改Array构造函数

9.2
    1.Boolean({})  的结果是true， JS共六种数据类型，只有对象空值时不为false
        对于包装对象也是这样，举个例子：
        console.log(Boolean(new Boolean(false))) // true

    2.Number 函数不传参数，返回 +0，如果有参数，调用 ToNumber(value)。
        注意这个 ToNumber 表示的是一个底层规范实现上的方法，并没有直接暴露出来。
        而 ToNumber 对应的结果表。表如下：
        参数类型	结果
        Undefined	NaN
        Null        +0
        Boolean 	如果参数是 true，返回 1。参数为 false，返回 +0
        Number	    返回与之相等的值
        String	    这段比较复杂，看例子

    3.对象转字符串 和 对象转数字 主要区别， toString(obj)
        先尝试调用 .toString() 失败 在尝试 .valueOf()  还是 相反的 尝试顺序

    4.注意 ToString \ ToNumber \ ToPrimitive 都是底层规范实现的方法，并没有直接暴露出来
        和上面说的方法不一样

    5.Number()  的返回值
        [] 和 [0] 都返回了 0，而 [1, 2, 3] 却返回了一个 NaN。我们分析一下原因：
        当我们 Number([]) 的时候，先调用 [] 的 valueOf 方法，此时返回 []，因为返回了一个对象而不是原始值，所以又调用了 toString 方法，此时返回一个空字符串，接下来调用 ToNumber 这个规范上的方法，参照对应表，转换为 0, 所以最后的结果为 0。
        而当我们 Number([1, 2, 3]) 的时候，先调用 [1, 2, 3] 的 valueOf 方法，此时返回 [1, 2, 3]，再调用 toString 方法，此时返回 1,2,3，接下来调用 ToNumber，参照对应表，因为无法转换为数字，所以最后的结果为 NaN。

    6.JSON.stringify  的使用
        处理基本类型时，与使用toString基本相同，结果都是字符串，除了 undefined
        console.log(JSON.stringify(null)) // null
        console.log(JSON.stringify(undefined)) // undefined，注意这个undefined不是字符串的undefined
        注：console.log(String(undefined));  // "undefined" (字符串)
        console.log(String(undefined));  // "undefined" (字符串)

        console.log(JSON.stringify(true)) // true
        console.log(JSON.stringify(42)) // 42
        console.log(JSON.stringify("42")) // "42"

    7.Object.prototype.toString 方法：
        根据对象的[[class]]内部属性，返回由 "[object " 和 class 和 "]" 三个部分组成的字符串
        例如：Object.prototype.toString.call([1,2,3]) → "[object Array]"

    8.console.log('1' == 1);
        4.x是数字，y是字符串，判断x == ToNumber(y)
        5.x是字符串，y是数字，判断ToNumber(x) == y
        6.x是布尔值，判断ToNumber(x) == y
        7.y是布尔值，判断x ==ToNumber(y)
        结果很明显，都是转换成数字后再进行比较

    对象与非对象时：console.log( 42 == ['42'])
        1. x不是字符串或者数字，y是对象，判断x == ToPrimitive(y)
        2. x是对象，y不是字符串或者数字，判断ToPrimitive(x) == y
        以这个例子为例，会使用 ToPrimitive 处理 ['42']，调用valueOf，返回对象本身，再调用 toString，返回 '42'，所以
        42 == ['42'] 相当于 42 == '42' 相当于42 == 42，结果为 true。
        到此为止，我们已经看完了第2、3、4、5、6、7、8、9步，其他的一概返回 false。

    9.隐式转换 规则总结
        1. 简单判断方法：
           有对象 → ToPrimitive
           要数字 → valueOf 优先
           要字符串 → toString 优先
           无对象 → 直接 ToNumber/ToString
        
        2. 具体判断步骤：
           看操作数是否包含对象
           看操作类型（算术/比较 vs 字符串）
           确定 PreferredType
           按顺序调用方法
        
        3. 常见场景总结：
           场景 → 转换方法 → 说明
           算术运算 → ToNumber → 减法、乘法、除法等
           比较运算 → ToNumber → 大于、小于、等于等
           字符串连接 → ToString → + 操作符 + 字符串
           模板字符串 → ToString → `${}` 插值
           对象运算 → ToPrimitive → 根据操作类型决定优先级

# 9.4 
    1.typeof 可是一个正宗的运算符，就跟加减乘除一样
        所以 可以这样使用 console.log(typeof 'yayu') // string

    2.Object 下还有很多细分的类型，如 Array、Function、Date、RegExp、Error 等
        使用 Object.prototype.toString 方法识别出更多类型
        原理： 会返回一个由 "[object " 和 class 和 "]" 组成的字符串
        用该方法能将 typeof 判断6种类型的能力 扩展到 识别至少 14 种类型，当然也可以算出来，[[class]] 属性至少有 12 个

    3.Window 对象作为客户端的全局对象，有一个 window 属性指向自身。可以利用这个特性判断是否是 Window 对象

    4.JS中处理异步操作的四个方案：
        回调方案（定时器回调
        Promise 方案
        generator 方案
        async/await 方案

    5.Pointfree 的本质就是使用一些通用的函数，组合出各种复杂运算。上层运算不要直接操作数据，而是通过底层函数去处理。即不使用所要处理的值，只合成运算过程

    6.函数组合（compose） 

    7.在JS中使用递归，会不停的创建执行上下文、压入执行上下文栈，内存消耗很大，如何优化
        尾调用: 指函数内部的最后一个动作是函数调用。该调用的返回值，直接返回给函数
        
        函数调用自身，称为递归。如果尾调用自身，就称为尾递归：
            二者区别在于，上下文栈的行为

    8.惰性函数：
    原理：闭包 + 重写函数， 注意，返回值永远一样
        var foo = function() {
            var t = new Date();
            foo = function() {
                return t;
            };
            return foo();
        };
    背景：每次调用都需要条件判断，但其实只需判断一次，接下来使用都不会发生改变，考虑使用惰性函数
                
9.6：
    1.获取除第一个参数(fn)外的所有参数
        var args = [].slice.call(arguments, 1);
        // arguments 是类数组对象，不是真正的数组
        // 使用 slice.call 将其转换为真正的数组，并从索引1开始截取

    2.数组合并
        var newArgs = args.concat([].slice.call(arguments));
        concat返回新数组，不修改原数组

    3.大多数语言提供自动内存管理，减轻程序员的负担，这被称为"垃圾回收机制"

    4.作用域块 和 执行上下文栈 区别

## 以下是TS内容

9.6： 
    1.默认情况下null和undefined是所有类型的子类型， 就是说你可以把 null和 undefined赋值给 number类型的变量

    2.给接口添加字符串索引签名   [propName: string]: any 
        允许接口接受任意的字符串属性名，并且这些属性的值可以是任意类型。
    
    3.函数重载
        重载签名（Overload Signatures）
            function add (arg1: string, arg2: string): string    // 重载签名1
            function add (arg1: number, arg2: number): number    // 重载签名2
        实现签名（Implementation Signature）
            function add (arg1: string | number, arg2: string | number) {
                // 具体的实现逻辑
            }
        工作原理
        当调用函数时，TypeScript 会：
        按顺序检查重载签名
        找到第一个匹配的签名
        使用该签名的返回类型
    
    4.类型继承
        type Params = string number
        class Stack<Textends Params>
    
    5.索引类型、约束类型
        索引类型允许我们动态地访问和操作对象的属性类型。
        1. 索引类型查询操作符 keyof
        keyof 操作符可以获取一个类型的所有键名组成的联合类型
    
    6.映射类型
        type Readonly<T> = {
            readonly [P in keyof T]: T[P];
        };
        等价于 ==》
        interface Obj {
            a: string
            b: string
        }

    7.条件类型
        T extends U ? X : Y
    extends 表示类型兼容性或子类型关系
    // 基本理解：T extends U 意思是 "T 是否可以赋值给 U"
    例如 "aa" extends String === true

    8.@expression  装饰器的形式其实是Object.defineProperty的语法糖


9.7：
    1.align-items: flex-start 关键设置：交叉轴（垂直）上顶部对齐
        如果不设置这个，默认是 stretch，会拉伸所有子元素到相同高度
        设置为 flex-start 后，当文本换行撑高时，标签和内容都从顶部开始对齐

9.8：
    1.装饰器：装饰器（Decorator）是一种设计模式和语法特性，它允许我们在不修改原有代码的情况下，给类、方法、属性或参数添加额外的功能。
        本质上是一个函数，它接收被装饰的目标作为参数，并可以返回一个新的目标或修改原目标
    
    2.命名空间本质上是一个对象，作用是将一系列相关的全局变量组织到一个对象的属性

9.26
    1.const decoder = new TextDecoder('utf-8'); // textDecoder 是 JavaScript 内置的类，用于将字节数据转换为字符串

    2.// 获取字符的 ASCII 码
        'A'.charCodeAt(0)
    // 将 ASCII 码转为字符
        String.fromCharCode(65)  // 'A'

    // 转为大写
    "hello".toUpperCase()     // "HELLO"

    // 转为小写  
    "HELLO".toLowerCase()     // "hello"

    3.map:

## JavaScript 原生对象和方法

### 1. 全局对象 (Global Objects)

#### 全局函数

**1. `parseInt(string, radix)` - 解析字符串并返回整数**
```javascript
// 基本用法
console.log(parseInt("123"));      // 123
console.log(parseInt("123.45"));   // 123 - 只取整数部分
console.log(parseInt("123abc"));   // 123 - 遇到非数字字符停止解析

// 指定进制（radix）
console.log(parseInt("10", 10));   // 10 - 十进制
console.log(parseInt("10", 2));    // 2 - 二进制：10(二进制) = 2(十进制)
console.log(parseInt("FF", 16));   // 255 - 十六进制：FF(十六进制) = 255(十进制)
console.log(parseInt("77", 8));    // 63 - 八进制：77(八进制) = 63(十进制)

// 注意事项
console.log(parseInt("   42"));    // 42 - 会忽略前导空格
console.log(parseInt(""));         // NaN - 空字符串返回 NaN
console.log(parseInt("abc"));      // NaN - 非数字开头返回 NaN

// 概念：
// - radix（基数/进制）：2-36之间的整数，表示数字系统的基数
// - 二进制（binary）：只用0和1，基数为2
// - 八进制（octal）：用0-7，基数为8
// - 十六进制（hexadecimal）：用0-9和A-F，基数为16
```

**2. `parseFloat(string)` - 解析字符串并返回浮点数**
```javascript
// 基本用法
console.log(parseFloat("123.45"));    // 123.45
console.log(parseFloat("123.45abc")); // 123.45 - 遇到非数字字符停止
console.log(parseFloat("123"));       // 123 - 整数也返回数字类型

// 科学计数法
console.log(parseFloat("1.23e2"));    // 123 - 1.23 × 10²
console.log(parseFloat("1.23e-2"));   // 0.0123 - 1.23 × 10⁻²

// 特殊情况
console.log(parseFloat("   3.14"));   // 3.14 - 忽略前导空格
console.log(parseFloat(""));          // NaN - 空字符串
console.log(parseFloat("abc"));       // NaN - 非数字开头

// 概念：
// - 浮点数（floating-point）：带小数点的数字
// - 科学计数法（scientific notation）：用e表示10的幂次，如1e3 = 1000
// - parseFloat 只能解析十进制，不支持其他进制
```

**3. `isNaN(value)` - 检查值是否为 NaN**
```javascript
// 基本用法
console.log(isNaN(123));        // false - 123是数字
console.log(isNaN("123"));      // false - 字符串"123"可以转为数字
console.log(isNaN("abc"));      // true - "abc"无法转为数字
console.log(isNaN(NaN));        // true - NaN就是NaN

// 隐式转换问题
console.log(isNaN(""));         // false - 空字符串转为0
console.log(isNaN(" "));        // false - 空格转为0
console.log(isNaN(true));       // false - true转为1
console.log(isNaN(false));      // false - false转为0

// 更可靠的检测方法
console.log(Number.isNaN(123));     // false
console.log(Number.isNaN("abc"));   // false - 不进行类型转换
console.log(Number.isNaN(NaN));     // true

// 概念：
// - NaN（Not a Number）：表示"不是一个数字"的特殊值
// - isNaN() 会先尝试将参数转换为数字，然后判断
// - Number.isNaN() 不进行类型转换，更严格
```

**4. `isFinite(value)` - 检查值是否为有限数字**
```javascript
// 基本用法
console.log(isFinite(123));        // true - 普通数字
console.log(isFinite(123.45));     // true - 小数
console.log(isFinite(-123));       // true - 负数

// 无限值
console.log(isFinite(Infinity));   // false - 正无穷
console.log(isFinite(-Infinity));  // false - 负无穷
console.log(isFinite(NaN));        // false - NaN不是有限数

// 类型转换
console.log(isFinite("123"));      // true - 字符串"123"转为数字123
console.log(isFinite("abc"));      // false - "abc"转为NaN
console.log(isFinite(""));         // true - 空字符串转为0

// 更严格的检测
console.log(Number.isFinite(123));    // true
console.log(Number.isFinite("123"));  // false - 不进行类型转换

// 概念：
// - 有限数（finite number）：不是无穷大、负无穷大或NaN的数字
// - Infinity：表示正无穷大，通常由除零或超出数字范围产生
// - isFinite() 会先转换类型，Number.isFinite() 不会
```
- `encodeURI(uri)` - 编码 URI：将特殊字符转为 %xx 格式，但保留 URI 结构字符（如 : / ? # 等）
- `decodeURI(encodedURI)` - 解码 URI：将 %xx 格式还原为原始字符
- `encodeURIComponent(str)` - 编码 URI 组件：将所有特殊字符（包括 URI 结构字符）都转为 %xx 格式
- `decodeURIComponent(encodedURIComponent)` - 解码 URI 组件：将 %xx 格式还原为原始字符

**编码解码示例：**
```javascript
// encodeURI - 保留 URI 结构
const url = "https://example.com/search?q=你好 世界&type=文章";
console.log(encodeURI(url));
// "https://example.com/search?q=%E4%BD%A0%E5%A5%BD%20%E4%B8%96%E7%95%8C&type=%E6%96%87%E7%AB%A0"

// encodeURIComponent - 编码所有特殊字符
const query = "你好 世界&type=文章";
console.log(encodeURIComponent(query));
// "%E4%BD%A0%E5%A5%BD%20%E4%B8%96%E7%95%8C%26type%3D%E6%96%87%E7%AB%A0"

// 解码示例
const encoded = "%E4%BD%A0%E5%A5%BD";
console.log(decodeURI(encoded));           // "你好"
console.log(decodeURIComponent(encoded));  // "你好"

// 区别对比
const text = "hello world?name=张三";
console.log(encodeURI(text));          // "hello%20world?name=%E5%BC%A0%E4%B8%89"
console.log(encodeURIComponent(text)); // "hello%20world%3Fname%3D%E5%BC%A0%E4%B8%89"
```

**URI 和 URI 组件的概念：**

**URI（统一资源标识符）** 是完整的地址，包含多个组件：
```
https://user:pass@example.com:8080/path/to/page?name=张三&age=25#section1
```

**URI 的各个组件：**
- `scheme` (协议): `https`
- `userinfo` (用户信息): `user:pass`
- `host` (主机): `example.com`
- `port` (端口): `8080`
- `path` (路径): `/path/to/page`
- `query` (查询参数): `name=张三&age=25`
- `fragment` (片段): `section1`

**URI 组件** 是指 URI 中的各个独立部分，特别是：
- 查询参数的值（如 `张三`、`25`）
- 路径片段（如 `to`、`page`）
- 用户输入的数据部分

**使用场景对比：**
```javascript
// 场景1：编码完整 URI - 使用 encodeURI()
const fullUrl = "https://example.com/search?q=你好 世界";
const encodedUrl = encodeURI(fullUrl);
// 结果：保留 URI 结构字符，只编码中文和空格

// 场景2：编码 URI 组件 - 使用 encodeURIComponent()
const searchQuery = "你好&世界"; // 用户输入的搜索词
const safeQuery = encodeURIComponent(searchQuery);
const finalUrl = `https://example.com/search?q=${safeQuery}`;
// 结果：连 & 符号也被编码，避免破坏 URL 结构
```

**为什么需要区分：**
- `encodeURI()` - 编码整个 URL，保持 URL 结构完整
- `encodeURIComponent()` - 编码单个组件，防止组件内容破坏 URL 结构


**eval() 详解：**
**eval 全称：evaluate（评估/求值）**
- `eval(string)` - 执行 JavaScript 代码字符串
`eval()` 函数会将传入的字符串当作 JavaScript 代码来执行。

**基本语法：**
```javascript
eval(string)
```

**使用示例：**
```javascript
// 1. 执行简单表达式
console.log(eval('Math.PI * 2')); // 6.283185307179586

// 2. 执行变量声明和赋值
eval('var x = 10');
console.log(x); // 10

// 3. 执行函数调用
eval('console.log("Hello from eval!")'); // Hello from eval!

// 4. 执行复杂代码块
eval(`
    function greet(name) {
        return 'Hello, ' + name;
    }
    var message = greet('World');
    console.log(message);
`); // Hello, World

// 5. 动态创建对象
const objCode = '({name: "张三", age: 25})';
const obj = eval(objCode);
console.log(obj); // {name: "张三", age: 25}

// 6. 执行条件语句
eval('if (true) { console.log("条件为真"); }'); // 条件为真
```

**作用域特性：**
```javascript
// eval 在当前作用域中执行
function testScope() {
    var localVar = 'local';
    eval('console.log(localVar)'); // 'local' - 可以访问局部变量
    eval('var newVar = "created by eval"');
    console.log(newVar); // 'created by eval' - 在当前作用域创建变量
}
testScope();
```

**⚠️ 安全风险和问题：**

1. **代码注入攻击：**
```javascript
// 危险示例 - 用户输入可能包含恶意代码
const userInput = 'alert("XSS攻击!"); document.cookie'; // 恶意输入
eval(userInput); // 执行了恶意代码！
```

2. **性能问题：**
```javascript
// eval 会阻止 JavaScript 引擎的优化
// 每次调用都需要重新解析和编译代码
for (let i = 0; i < 1000; i++) {
    eval('var temp = i * 2'); // 非常低效
}
```

3. **调试困难：**
```javascript
// 通过 eval 执行的代码难以调试
eval('console.log("这行代码在调试器中很难追踪")');
```

**更安全的替代方案：**

1. **使用 Function 构造器：**
```javascript
// 相对安全一些，在全局作用域执行
const fn = new Function('a', 'b', 'return a + b');
console.log(fn(2, 3)); // 5
```

2. **使用 JSON.parse() 解析数据：**
```javascript
// 解析 JSON 数据时，用 JSON.parse 而不是 eval
const jsonString = '{"name": "张三", "age": 25}';
// 错误方式：eval('(' + jsonString + ')')
// 正确方式：
const data = JSON.parse(jsonString);
```

3. **使用模板字符串：**
```javascript
// 动态创建字符串
const name = '张三';
const greeting = `Hello, ${name}!`; // 而不是 eval
```

4. **使用对象属性访问：**
```javascript
// 动态访问对象属性
const obj = {name: '张三', age: 25};
const prop = 'name';
// 错误方式：eval('obj.' + prop)
// 正确方式：
console.log(obj[prop]); // '张三'
```

**合法使用场景：**

虽然 eval 有很多问题，但在某些特定场景下仍有用途：

1. **配置文件解析：**
```javascript
// 解析简单的配置表达式（需要严格验证输入）
const configExpr = '60 * 60 * 24'; // 一天的秒数
const seconds = eval(configExpr); // 86400
```

2. **数学表达式计算器：**
```javascript
// 在受控环境中计算数学表达式
function calculate(expression) {
    // 先验证表达式只包含数字和运算符
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error('Invalid expression');
    }
    return eval(expression);
}
console.log(calculate('2 + 3 * 4')); // 14
```


#### 全局属性
- `Infinity` - 正无穷大
- `NaN` - 非数字值
- `undefined` - 未定义值
- `globalThis` - 全局对象引用

### 2. 基础数据类型包装对象

#### String 对象
**创建方式：**
```javascript
const str1 = "hello";           // 字面量
const str2 = new String("hello"); // 构造函数
```
**常用方法：**
**详细方法解释：**

**1. `charAt(index)` - 返回指定位置的字符**
```javascript
const str = "Hello";
console.log(str.charAt(0));  // "H" - 第一个字符
console.log(str.charAt(1));  // "e" - 第二个字符
console.log(str.charAt(10)); // "" - 超出范围返回空字符串

// 与直接索引访问的区别
console.log(str[0]);   // "H" - 直接访问
console.log(str[10]);  // undefined - 超出范围返回undefined

// 概念：
// - index（索引）：从0开始的位置编号
// - charAt() 更安全，超出范围返回空字符串而不是undefined
```

**2. `charCodeAt(index)` - 返回指定位置字符的 Unicode 编码**
```javascript
const str = "Hello世界";
console.log(str.charCodeAt(0)); // 72 - 'H' 的 Unicode 编码
console.log(str.charCodeAt(1)); // 101 - 'e' 的 Unicode 编码
console.log(str.charCodeAt(5)); // 19990 - '世' 的 Unicode 编码

// 实际应用：字符比较、编码转换
console.log("A".charCodeAt(0)); // 65
console.log("a".charCodeAt(0)); // 97 - 小写字母编码更大
console.log("0".charCodeAt(0)); // 48 - 数字字符'0'的编码

// 配合 String.fromCharCode() 使用
const code = "A".charCodeAt(0);
console.log(String.fromCharCode(code)); // "A" - 编码转回字符

// 概念：
// - Unicode：国际标准字符编码，每个字符都有唯一数字
// - ASCII：Unicode的子集，包含基本英文字符（0-127）
// - 中文字符的Unicode编码通常很大（几万）
```

**3. `concat(...strings)` - 连接字符串**
```javascript
const str1 = "Hello";
const str2 = " ";
const str3 = "World";

console.log(str1.concat(str2, str3)); // "Hello World"
console.log(str1.concat(" ", "JavaScript")); // "Hello JavaScript"

// 可以连接多个字符串
console.log("a".concat("b", "c", "d")); // "abcd"

// 现代推荐方式：
console.log(str1 + str2 + str3);      // "Hello World" - 更简洁
console.log(`${str1}${str2}${str3}`); // "Hello World" - 模板字符串

// 概念：
// - concat 不修改原字符串，返回新字符串（字符串是不可变的）
// - 性能：+ 操作符通常比concat()更快
// - 模板字符串（template literal）：用反引号``包围，支持${变量}插值
```

**4. `indexOf(searchValue, fromIndex)` - 查找子字符串首次出现位置**
```javascript
const str = "Hello World Hello";

console.log(str.indexOf("l"));      // 2 - 第一个 'l' 的位置
console.log(str.indexOf("World"));  // 6 - "World" 开始位置
console.log(str.indexOf("l", 3));   // 3 - 从位置3开始查找
console.log(str.indexOf("xyz"));    // -1 - 未找到返回 -1

// 区分大小写
console.log(str.indexOf("hello"));  // -1 - 大小写敏感
console.log(str.toLowerCase().indexOf("hello")); // 0 - 转小写后查找

// 实际应用：检查字符串是否包含某内容
if (str.indexOf("World") !== -1) {
    console.log("包含 World");
}

// 现代替代方法
console.log(str.includes("World")); // true - 更直观的包含检查

// 概念：
// - 返回索引位置（从0开始），未找到返回-1
// - fromIndex：可选参数，指定开始搜索的位置
// - 大小写敏感：区分大小写字母
```

**5. `lastIndexOf(searchValue, fromIndex)` - 查找子字符串最后出现位置**
```javascript
const str = "Hello World Hello";

console.log(str.lastIndexOf("l"));     // 15 - 最后一个 'l' 的位置
console.log(str.lastIndexOf("Hello")); // 12 - 最后一个 "Hello" 位置
console.log(str.lastIndexOf("l", 10)); // 9 - 从位置10向前查找

// 对比：indexOf 从前往后，lastIndexOf 从后往前
console.log(str.indexOf("Hello"));     // 0 - 第一个出现位置
console.log(str.lastIndexOf("Hello")); // 12 - 最后出现位置

// 实际应用：查找文件扩展名
const filename = "document.backup.pdf";
const lastDot = filename.lastIndexOf(".");
console.log(filename.substring(lastDot)); // ".pdf" - 扩展名

// 概念：
// - 反向查找，但返回的仍是正向索引位置
// - fromIndex：从指定位置向前（左）搜索
// - 常用于查找最后一个分隔符、扩展名等
```

**6. `slice(start, end)` - 提取字符串片段**
```javascript
const str = "Hello World";

console.log(str.slice(0, 5));   // "Hello" - 从0到5（不含5）
console.log(str.slice(6));      // "World" - 从6到末尾
console.log(str.slice(-5));     // "World" - 负数从末尾算起
console.log(str.slice(-5, -1)); // "Worl" - 倒数第5到倒数第1

// 实际应用
const filename = "document.pdf";
const name = filename.slice(0, -4);     // "document" - 去掉扩展名
const ext = filename.slice(-4);         // ".pdf" - 获取扩展名

// 概念：
// - start: 开始位置（包含）
// - end: 结束位置（不包含），省略则到末尾
// - 负数: 从字符串末尾倒数，-1表示最后一个字符
// - 不修改原字符串，返回新的子字符串
```

**7. `substring(start, end)` - 提取字符串片段**
```javascript
const str = "Hello World";

console.log(str.substring(0, 5));  // "Hello" - 正常使用
console.log(str.substring(6));     // "World" - 从6到末尾
console.log(str.substring(-5));    // "Hello World" - 负数当作0
console.log(str.substring(5, 0));  // "Hello" - 自动交换参数

// 与 slice 的关键区别：
// 1. 不支持负数索引（负数会被当作0）
// 2. 会自动交换较小值作为起始位置

// 概念：
// - 较老的方法，功能受限
// - 建议优先使用 slice()，功能更强大
// - 自动参数交换：如果start > end，会自动交换两个参数
```

**slice() 与 substring() 的区别：**
| 特性 | slice() | substring() |
|------|---------|-------------|
| 负数索引 | ✅ 支持，从末尾计算 | ❌ 不支持，负数当作 0 |
| 参数交换 | ❌ 不交换，start > end 返回空字符串 | ✅ 自动交换较小值作为起始位置 |
| 性能 | 稍快       | 稍慢 |
- ✅ **优先使用 `slice()`** - 功能更强大，支持负数索引
- ✅ 处理字符串末尾时，`slice()` 更简洁
- ⚠️ 只有在需要自动交换参数时才考虑 `substring()`

**8. `substr(start, length)` - 提取指定长度的字符串**
```javascript
const str = "Hello World";

console.log(str.substr(0, 5));   // "Hello" - 从位置0开始，取5个字符
console.log(str.substr(6, 5));   // "World" - 从位置6开始，取5个字符
console.log(str.substr(-5, 3));  // "Wor" - 从倒数第5个开始，取3个字符

// 与 slice 的区别
console.log(str.slice(0, 5));    // "Hello" - 第二个参数是结束位置
console.log(str.substr(0, 5));   // "Hello" - 第二个参数是长度

// 注意：substr() 已被废弃，建议使用 slice() 或 substring()
// 概念：
// - length：要提取的字符数量
// - 已废弃（deprecated）：不推荐使用，未来可能被移除
```

**9. `toLowerCase()` - 转为小写**
```javascript
const str = "Hello WORLD";
console.log(str.toLowerCase()); // "hello world"

// 实际应用：不区分大小写的比较
const input = "HELLO";
if (input.toLowerCase() === "hello") {
    console.log("匹配成功");
}

// 处理中文和特殊字符
console.log("你好WORLD".toLowerCase()); // "你好world"

// 概念：
// - 不修改原字符串，返回新字符串
// - 只影响字母字符，数字和符号不变
```

**10. `toUpperCase()` - 转为大写**
```javascript
const str = "Hello world";
console.log(str.toUpperCase()); // "HELLO WORLD"

// 实际应用：生成常量名
const variableName = "user name";
const constantName = variableName.replace(" ", "_").toUpperCase();
console.log(constantName); // "USER_NAME"

// 概念：
// - 与 toLowerCase() 相对
// - 常用于常量命名、大写显示等场景
```

**11. `trim()` - 去除首尾空白**
```javascript
const str = "  Hello World  ";
console.log(str.trim()); // "Hello World"

// 处理各种空白字符
const str2 = "\t\n  Hello  \r\n\t";
console.log(str2.trim()); // "Hello"

// 实际应用：处理用户输入
const userInput = "  张三  ";
const cleanInput = userInput.trim();
console.log(`用户名：'${cleanInput}'`); // 用户名：'张三'

// 概念：
// - 空白字符：空格、制表符(\t)、换行符(\n)、回车符(\r)等
// - 只去除首尾空白，中间的空白保留
```

**12. `trimStart()` / `trimLeft()` - 去除开头空白**
```javascript
const str = "  Hello World  ";
console.log(str.trimStart()); // "Hello World  "
console.log(str.trimLeft());  // "Hello World  " - 别名，功能相同

// 实际应用：处理代码缩进
const code = "    function test() {";
console.log(code.trimStart()); // "function test() {"

// 概念：
// - trimLeft() 是 trimStart() 的别名
// - 只去除左侧（开头）的空白字符
```

**13. `trimEnd()` / `trimRight()` - 去除结尾空白**
```javascript
const str = "  Hello World  ";
console.log(str.trimEnd());   // "  Hello World"
console.log(str.trimRight()); // "  Hello World" - 别名，功能相同

// 实际应用：清理行尾空格
const lines = ["line1  ", "line2\t", "line3   "];
const cleaned = lines.map(line => line.trimEnd());
console.log(cleaned); // ["line1", "line2", "line3"]

// 概念：
// - trimRight() 是 trimEnd() 的别名
// - 只去除右侧（结尾）的空白字符
```

**14. `split(separator, limit)` - 分割字符串为数组**
```javascript
const str = "apple,banana,orange";

console.log(str.split(","));      // ["apple", "banana", "orange"]
console.log(str.split(",", 2));   // ["apple", "banana"] - 限制返回2个元素
console.log(str.split(""));       // ["a", "p", "p", "l", "e", ...] - 分割成字符

// 实际应用：处理CSV数据
const csvLine = "张三,25,工程师";
const [name, age, job] = csvLine.split(",");
console.log({name, age, job}); // {name: "张三", age: "25", job: "工程师"}

// 处理路径
const path = "/home/user/documents/file.txt";
const parts = path.split("/");
console.log(parts); // ["", "home", "user", "documents", "file.txt"]

// 概念：
// - separator：分隔符，可以是字符串或正则表达式
// - limit：可选，限制返回数组的长度
// - 返回数组，即使只有一个元素
```

**15. `replace(searchValue, replaceValue)` - 替换字符串**
```javascript
const str = "Hello World Hello";

console.log(str.replace("Hello", "Hi")); // "Hi World Hello" - 只替换第一个
console.log(str.replace(/Hello/g, "Hi")); // "Hi World Hi" - 全局替换

// 使用函数作为替换值
const result = str.replace(/Hello/g, (match, offset) => {
    return `[${match}@${offset}]`;
});
console.log(result); // "[Hello@0] World [Hello@12]"

// 实际应用：模板替换
const template = "Hello {{name}}, you are {{age}} years old";
const filled = template
    .replace("{{name}}", "张三")
    .replace("{{age}}", "25");
console.log(filled); // "Hello 张三, you are 25 years old"

// 概念：
// - 只替换第一个匹配项（除非使用全局正则）
// - replaceValue 可以是字符串或函数
// - 不修改原字符串，返回新字符串
```

**16. `replaceAll(searchValue, replaceValue)` - 替换所有匹配项**
```javascript
const str = "Hello World Hello";

console.log(str.replaceAll("Hello", "Hi")); // "Hi World Hi"
console.log(str.replaceAll("l", "L"));      // "HeLLo WorLd HeLLo"

// 与 replace + 全局正则的区别
console.log(str.replace(/Hello/g, "Hi"));   // "Hi World Hi" - 正则方式
console.log(str.replaceAll("Hello", "Hi")); // "Hi World Hi" - 更直观

// 概念：
// - ES2021新增方法
// - 替换所有匹配项，不需要正则表达式
// - 比 replace + 全局正则更直观
```

**17. `match(regexp)` - 匹配正则表达式**
```javascript
const str = "Hello World 123";

console.log(str.match(/\d+/));    // ["123"] - 匹配数字
console.log(str.match(/\d+/g));   // ["123"] - 全局匹配
console.log(str.match(/[A-Z]/g)); // ["H", "W"] - 匹配大写字母

// 捕获组
const email = "user@example.com";
const match = email.match(/(\w+)@(\w+\.\w+)/);
console.log(match); // ["user@example.com", "user", "example.com"]

// 概念：
// - 返回匹配结果数组，未匹配返回null
// - 全局匹配返回所有匹配项
// - 非全局匹配返回详细信息（包括捕获组）
```

**18. `search(regexp)` - 搜索正则表达式**
```javascript
const str = "Hello World 123";

console.log(str.search(/\d/));     // 12 - 第一个数字的位置
console.log(str.search(/world/i)); // 6 - 不区分大小写搜索
console.log(str.search(/xyz/));    // -1 - 未找到

// 与 indexOf 的区别
console.log(str.indexOf("123"));   // 12 - 字符串搜索
console.log(str.search(/\d+/));    // 12 - 正则搜索

// 概念：
// - 返回第一个匹配项的索引位置
// - 只能使用正则表达式，不能用字符串
// - 类似 indexOf，但支持正则模式
```

**19. `includes(searchString, position)` - 检查是否包含子字符串**
```javascript
const str = "Hello World";

console.log(str.includes("World"));    // true
console.log(str.includes("world"));    // false - 区分大小写
console.log(str.includes("lo", 5));    // false - 从位置5开始查找

// 实际应用：过滤数组
const words = ["apple", "banana", "grape", "orange"];
const filtered = words.filter(word => word.includes("a"));
console.log(filtered); // ["apple", "banana", "grape", "orange"]

// 概念：
// - ES6新增方法
// - 返回布尔值，比 indexOf !== -1 更直观
// - position：可选，指定开始搜索的位置
```

**20. `startsWith(searchString, position)` - 检查是否以指定字符串开头**
```javascript
const str = "Hello World";

console.log(str.startsWith("Hello"));    // true
console.log(str.startsWith("World"));    // false
console.log(str.startsWith("World", 6)); // true - 从位置6开始检查

// 实际应用：URL检查
const url = "https://example.com";
if (url.startsWith("https://")) {
    console.log("安全连接");
}

// 文件类型检查
const filename = "document.pdf";
if (filename.startsWith("doc")) {
    console.log("可能是文档文件");
}

// 概念：
// - ES6新增方法
// - 区分大小写
// - position：从指定位置开始检查
```

**21. `endsWith(searchString, length)` - 检查是否以指定字符串结尾**
```javascript
const str = "Hello World";

console.log(str.endsWith("World"));     // true
console.log(str.endsWith("Hello"));     // false
console.log(str.endsWith("Hello", 5));  // true - 只考虑前5个字符

// 实际应用：文件扩展名检查
const filename = "document.pdf";
if (filename.endsWith(".pdf")) {
    console.log("这是PDF文件");
}

// 批量检查
const files = ["doc.txt", "image.jpg", "video.mp4"];
const textFiles = files.filter(file => file.endsWith(".txt"));
console.log(textFiles); // ["doc.txt"]

// 概念：
// - ES6新增方法
// - length：可选，指定字符串的有效长度
// - 常用于文件类型判断
```

**22. `repeat(count)` - 重复字符串**
```javascript
console.log("*".repeat(5));        // "*****"
console.log("Hello ".repeat(3));   // "Hello Hello Hello "
console.log("abc".repeat(0));      // "" - 重复0次返回空字符串

// 实际应用：生成分隔线
const separator = "-".repeat(50);
console.log(separator); // "--------------------------------------------------"

// 创建缩进
function indent(level) {
    return "  ".repeat(level);
}
console.log(indent(3) + "代码"); // "      代码"

// 概念：
// - ES6新增方法
// - count：重复次数，必须是非负整数
// - count为0时返回空字符串
```

**23. `padStart(targetLength, padString)` - 从开头填充字符串**
```javascript
const str = "123";

console.log(str.padStart(5, "0"));    // "00123" - 用0填充到5位
console.log(str.padStart(6, "ab"));   // "aba123" - 用"ab"循环填充
console.log(str.padStart(2, "0"));    // "123" - 目标长度小于原长度，不填充

// 实际应用：格式化数字
const num = 5;
console.log(num.toString().padStart(3, "0")); // "005"

// 对齐显示
const items = ["A", "BB", "CCC"];
items.forEach(item => {
    console.log(item.padStart(5, " ") + "|");
});
// "    A|"
// "   BB|"
// "  CCC|"

// 概念：
// - ES8新增方法
// - 如果原字符串长度 >= targetLength，返回原字符串
// - padString默认为空格
```

**24. `padEnd(targetLength, padString)` - 从结尾填充字符串**
```javascript
const str = "123";

console.log(str.padEnd(5, "0"));      // "12300" - 用0填充到5位
console.log(str.padEnd(6, "ab"));     // "123aba" - 用"ab"循环填充

// 实际应用：表格对齐
const names = ["张三", "李四", "王五"];
names.forEach(name => {
    console.log("|" + name.padEnd(6, " ") + "|");
});
// "|张三    |"
// "|李四    |"
// "|王五    |"

// 概念：
// - ES8新增方法
// - 与 padStart 相对，从末尾填充
// - 常用于文本对齐、表格显示
```

**静态方法：**

**1. `String.fromCharCode(...codes)` - 从 Unicode 编码创建字符串**
```javascript
console.log(String.fromCharCode(72, 101, 108, 108, 111)); // "Hello"
console.log(String.fromCharCode(65, 66, 67));             // "ABC"
console.log(String.fromCharCode(19990, 30028));           // "世界"

// 实际应用：生成字母序列
const alphabet = [];
for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
}
console.log(alphabet); // ["A", "B", "C", ..., "Z"]

// 与 charCodeAt 配合使用
const char = "A";
const code = char.charCodeAt(0);
const restored = String.fromCharCode(code);
console.log(restored); // "A"

// 概念：
// - 静态方法：直接在 String 类上调用，不需要实例
// - 可以接受多个编码值
// - 与 charCodeAt() 互为逆操作
```

**2. `String.fromCodePoint(...codePoints)` - 从 Unicode 码点创建字符串**
```javascript
console.log(String.fromCodePoint(72, 101, 108, 108, 111)); // "Hello"
console.log(String.fromCodePoint(0x1F600));                // "😀" - emoji
console.log(String.fromCodePoint(0x1F44D));                // "👍" - emoji

// 处理超出 BMP 的字符
console.log(String.fromCodePoint(0x20BB7));   // "𠮷" - 古汉字
console.log(String.fromCharCode(0x20BB7));    // 无法正确处理

// 实际应用：生成特殊字符
const emojis = [0x1F600, 0x1F601, 0x1F602];
const emojiString = String.fromCodePoint(...emojis);
console.log(emojiString); // "😀😁😂"

// 概念：
// - ES6新增方法
// - 支持完整的 Unicode 码点（包括超过 0xFFFF 的字符）
// - BMP（Basic Multilingual Plane）：基本多文种平面，Unicode的一部分
// - 比 fromCharCode 更强大，推荐使用
```

#### Number 对象
**创建方式：**
```javascript
const num1 = 42;              // 字面量
const num2 = new Number(42);  // 构造函数
```

**实例方法：**

**1. `toFixed(digits)` - 格式化为定点表示法**
```javascript
const num = 123.456789;

console.log(num.toFixed());    // "123" - 默认0位小数
console.log(num.toFixed(2));   // "123.46" - 2位小数，四舍五入
console.log(num.toFixed(6));   // "123.456789" - 6位小数
console.log(num.toFixed(8));   // "123.45678900" - 不足位数用0填充

// 处理整数
const int = 123;
console.log(int.toFixed(2));   // "123.00"

// 实际应用：货币格式化
const price = 99.9;
console.log(`¥${price.toFixed(2)}`); // "¥99.90"

// 注意：返回字符串类型
const result = num.toFixed(2);
console.log(typeof result);    // "string"

// 概念：
// - 定点表示法：固定小数位数的表示方法
// - digits：小数位数，范围 0-100
// - 会进行四舍五入
// - 返回字符串，不是数字
```

**2. `toExponential(fractionDigits)` - 格式化为指数表示法**
```javascript
const num = 123456.789;

console.log(num.toExponential());    // "1.23456789e+5"
console.log(num.toExponential(2));   // "1.23e+5" - 2位小数
console.log(num.toExponential(6));   // "1.234568e+5" - 6位小数

// 小数
const small = 0.000123;
console.log(small.toExponential());  // "1.23e-4"
console.log(small.toExponential(2)); // "1.23e-4"

// 实际应用：科学计算显示
const bigNumber = 299792458; // 光速
console.log(`光速：${bigNumber.toExponential(2)} m/s`); // "光速：2.99e+8 m/s"

// 概念：
// - 指数表示法（科学计数法）：用 e 表示 10 的幂次
// - fractionDigits：小数部分位数，范围 0-100
// - 适用于非常大或非常小的数字
```

**3. `toPrecision(precision)` - 格式化为指定精度**
```javascript
const num = 123.456;

console.log(num.toPrecision());    // "123.456" - 默认不限制
console.log(num.toPrecision(3));   // "123" - 3位有效数字
console.log(num.toPrecision(5));   // "123.46" - 5位有效数字
console.log(num.toPrecision(10));  // "123.4560000" - 10位有效数字

// 大数字自动使用指数表示法
const big = 123456;
console.log(big.toPrecision(3));   // "1.23e+5"
console.log(big.toPrecision(6));   // "123456"

// 小数字
const small = 0.00123;
console.log(small.toPrecision(2)); // "0.0012"
console.log(small.toPrecision(1)); // "0.001"

// 概念：
// - 精度（precision）：有效数字的总位数
// - 包括小数点前后的所有数字
// - 根据数字大小自动选择定点或指数表示法
```

**4. `toString(radix)` - 转为字符串**
```javascript
const num = 255;

console.log(num.toString());     // "255" - 默认十进制
console.log(num.toString(10));   // "255" - 十进制
console.log(num.toString(2));    // "11111111" - 二进制
console.log(num.toString(8));    // "377" - 八进制
console.log(num.toString(16));   // "ff" - 十六进制

// 小数
const decimal = 15.5;
console.log(decimal.toString(2)); // "1111.1" - 二进制小数

// 实际应用：颜色值转换
const red = 255;
const green = 128;
const blue = 0;
const hex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
console.log(hex); // "#ff8000"

// 概念：
// - radix（基数）：进制，范围 2-36
// - 36进制使用 0-9 和 a-z 表示
// - 常用进制：2（二进制）、8（八进制）、10（十进制）、16（十六进制）
```

**5. `valueOf()` - 返回原始数值**
```javascript
const numObj = new Number(42);
const primitive = 42;

console.log(numObj.valueOf());   // 42 - 返回原始数值
console.log(primitive.valueOf()); // 42

// 类型检查
console.log(typeof numObj);         // "object"
console.log(typeof numObj.valueOf()); // "number"
console.log(typeof primitive);      // "number"

// 实际应用：对象比较
const num1 = new Number(42);
const num2 = new Number(42);
console.log(num1 === num2);           // false - 不同对象
console.log(num1.valueOf() === num2.valueOf()); // true - 相同值

// 概念：
// - 返回包装对象的原始数值
// - 通常在类型转换时自动调用
// - 区分包装对象和原始值
```

**静态属性：**

**1. `Number.MAX_VALUE` - 最大数值**
```javascript
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308

// 超出最大值会变成无穷大
console.log(Number.MAX_VALUE * 2); // Infinity

// 实际应用：检查数值范围
function isValidNumber(num) {
    return num <= Number.MAX_VALUE && num >= -Number.MAX_VALUE;
}

// 概念：
// - JavaScript 能表示的最大有限数值
// - 基于 IEEE 754 双精度浮点数标准
// - 超出此值会变成 Infinity
```

**2. `Number.MIN_VALUE` - 最小正数值**
```javascript
console.log(Number.MIN_VALUE); // 5e-324

// 最接近0的正数
console.log(Number.MIN_VALUE > 0); // true
console.log(Number.MIN_VALUE / 2); // 0 - 小于最小值变成0

// 注意：不是最小负数
console.log(-Number.MAX_VALUE); // 最小（最负）的数

// 概念：
// - 最接近 0 的正数值
// - 不是负数，而是最小的正数
// - 小于此值的正数会变成 0
```

**3. `Number.MAX_SAFE_INTEGER` - 最大安全整数**
```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// 安全整数范围内运算精确
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 - 精度丢失！

// 实际应用：检查整数安全性
function isSafeInteger(num) {
    return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
}

console.log(isSafeInteger(9007199254740991)); // true
console.log(isSafeInteger(9007199254740992)); // false

// 概念：
// - 能精确表示的最大整数
// - 超出范围的整数运算可能不精确
// - 基于 IEEE 754 双精度浮点数的限制
```

**4. `Number.MIN_SAFE_INTEGER` - 最小安全整数**
```javascript
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// 与 MAX_SAFE_INTEGER 对称
console.log(Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER); // true

// 超出安全范围的运算
console.log(Number.MIN_SAFE_INTEGER - 1); // -9007199254740992
console.log(Number.MIN_SAFE_INTEGER - 2); // -9007199254740992 - 精度丢失！

// 概念：
// - 能精确表示的最小（最负）整数
// - 与 MAX_SAFE_INTEGER 绝对值相等
```

**5. `Number.POSITIVE_INFINITY` - 正无穷大**
```javascript
console.log(Number.POSITIVE_INFINITY); // Infinity

// 等同于全局 Infinity
console.log(Number.POSITIVE_INFINITY === Infinity); // true

// 产生正无穷的情况
console.log(1 / 0); // Infinity
console.log(Number.MAX_VALUE * 2); // Infinity

// 无穷大的运算
console.log(Infinity + 1); // Infinity
console.log(Infinity * 2); // Infinity
console.log(Infinity / Infinity); // NaN

// 概念：
// - 表示正无穷大
// - 任何超出 MAX_VALUE 的正数都会变成这个值
```

**6. `Number.NEGATIVE_INFINITY` - 负无穷大**
```javascript
console.log(Number.NEGATIVE_INFINITY); // -Infinity

// 等同于负的全局 Infinity
console.log(Number.NEGATIVE_INFINITY === -Infinity); // true

// 产生负无穷的情况
console.log(-1 / 0); // -Infinity
console.log(-Number.MAX_VALUE * 2); // -Infinity

// 概念：
// - 表示负无穷大
// - 与 POSITIVE_INFINITY 相对
```

**7. `Number.NaN` - 非数字值**
```javascript
console.log(Number.NaN); // NaN

// 等同于全局 NaN
console.log(Number.NaN === NaN); // false - NaN 不等于任何值，包括自己
console.log(Number.isNaN(Number.NaN)); // true

// 产生 NaN 的情况
console.log(0 / 0); // NaN
console.log(Math.sqrt(-1)); // NaN
console.log(parseInt("abc")); // NaN

// 概念：
// - 表示"不是数字"的特殊数值
// - NaN 不等于任何值，包括它自己
// - 用 Number.isNaN() 检测
```

**8. `Number.EPSILON` - 最小精度值**
```javascript
console.log(Number.EPSILON); // 2.220446049250313e-16

// 浮点数精度问题
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// 使用 EPSILON 进行精确比较
function equal(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}

console.log(equal(0.1 + 0.2, 0.3)); // true

// 实际应用：浮点数比较
function isEqual(x, y) {
    return Math.abs(x - y) < Number.EPSILON;
}

// 概念：
// - 1 与大于 1 的最小浮点数之间的差值
// - 用于解决浮点数精度问题
// - 浮点数比较的容差值
```

**静态方法：**

**1. `Number.isNaN(value)` - 检查是否为 NaN**
```javascript
console.log(Number.isNaN(NaN));     // true
console.log(Number.isNaN(123));     // false
console.log(Number.isNaN("abc"));   // false - 不进行类型转换
console.log(Number.isNaN("123"));   // false

// 与全局 isNaN 的区别
console.log(isNaN("abc"));          // true - 先转换再判断
console.log(Number.isNaN("abc"));   // false - 不转换，"abc"不是NaN

// 实际应用：严格的 NaN 检测
function safeCalculate(a, b) {
    const result = a / b;
    if (Number.isNaN(result)) {
        return "计算结果无效";
    }
    return result;
}

console.log(safeCalculate(0, 0)); // "计算结果无效"

// 概念：
// - ES6新增，更严格的 NaN 检测
// - 不进行类型转换，只有真正的 NaN 才返回 true
// - 推荐使用，比全局 isNaN 更可靠
```

**2. `Number.isFinite(value)` - 检查是否为有限数字**
```javascript
console.log(Number.isFinite(123));       // true
console.log(Number.isFinite(123.45));    // true
console.log(Number.isFinite(Infinity));  // false
console.log(Number.isFinite(-Infinity)); // false
console.log(Number.isFinite(NaN));       // false
console.log(Number.isFinite("123"));     // false - 不进行类型转换

// 与全局 isFinite 的区别
console.log(isFinite("123"));        // true - 先转换为数字
console.log(Number.isFinite("123")); // false - 不转换

// 实际应用：数值验证
function validateNumber(input) {
    if (typeof input === 'number' && Number.isFinite(input)) {
        return true;
    }
    return false;
}

console.log(validateNumber(42));      // true
console.log(validateNumber("42"));    // false
console.log(validateNumber(Infinity)); // false

// 概念：
// - ES6新增，更严格的有限数检测
// - 只有数字类型且为有限值才返回 true
// - 不会进行类型转换
```

**3. `Number.isInteger(value)` - 检查是否为整数**
```javascript
console.log(Number.isInteger(123));     // true
console.log(Number.isInteger(123.0));   // true - 123.0 是整数
console.log(Number.isInteger(123.45));  // false
console.log(Number.isInteger("123"));   // false - 不是数字类型
console.log(Number.isInteger(NaN));     // false
console.log(Number.isInteger(Infinity)); // false

// 浮点数表示的整数
console.log(Number.isInteger(3.0));     // true
console.log(Number.isInteger(3.000001)); // false

// 实际应用：数组索引验证
function getArrayItem(arr, index) {
    if (Number.isInteger(index) && index >= 0 && index < arr.length) {
        return arr[index];
    }
    return undefined;
}

const array = [1, 2, 3];
console.log(getArrayItem(array, 1));     // 2
console.log(getArrayItem(array, 1.5));   // undefined
console.log(getArrayItem(array, "1"));   // undefined

// 概念：
// - ES6新增方法
// - 检查是否为整数（包括用浮点数表示的整数如3.0）
// - 不进行类型转换，只检查数字类型
```

**4. `Number.isSafeInteger(value)` - 检查是否为安全整数**
```javascript
console.log(Number.isSafeInteger(123));                    // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
console.log(Number.isSafeInteger(123.45));                 // false - 不是整数
console.log(Number.isSafeInteger("123"));                  // false - 不是数字

// 大数运算安全检查
function safeAdd(a, b) {
    if (Number.isSafeInteger(a) && Number.isSafeInteger(b)) {
        const result = a + b;
        if (Number.isSafeInteger(result)) {
            return result;
        } else {
            return "结果超出安全范围，建议使用 BigInt";
        }
    }
    return "参数必须是安全整数";
}

console.log(safeAdd(100, 200)); // 300
console.log(safeAdd(Number.MAX_SAFE_INTEGER, 1)); // "结果超出安全范围，建议使用 BigInt"

// 概念：
// - ES6新增方法
// - 检查是否为安全整数（在安全整数范围内的整数）
// - 安全整数：能精确表示和运算的整数
// - 超出安全范围的整数运算可能不精确
```

**5. `Number.parseInt(string, radix)` - 解析整数**
```javascript
console.log(Number.parseInt("123"));      // 123
console.log(Number.parseInt("123.45"));   // 123
console.log(Number.parseInt("123abc"));   // 123
console.log(Number.parseInt("abc123"));   // NaN

// 指定进制
console.log(Number.parseInt("1111", 2));  // 15 - 二进制
console.log(Number.parseInt("FF", 16));   // 255 - 十六进制

// 与全局 parseInt 完全相同
console.log(Number.parseInt === parseInt); // true

// 实际应用：处理用户输入
function parseUserInput(input) {
    const parsed = Number.parseInt(input, 10);
    if (Number.isNaN(parsed)) {
        return "无效输入";
    }
    return parsed;
}

console.log(parseUserInput("123"));    // 123
console.log(parseUserInput("123.45")); // 123
console.log(parseUserInput("abc"));    // "无效输入"

// 概念：
// - ES6新增，与全局 parseInt 相同
// - 提供了命名空间，避免全局污染
// - 推荐使用 Number.parseInt 而不是全局 parseInt
```

**6. `Number.parseFloat(string)` - 解析浮点数**
```javascript
console.log(Number.parseFloat("123.45"));    // 123.45
console.log(Number.parseFloat("123.45abc")); // 123.45
console.log(Number.parseFloat("123"));       // 123
console.log(Number.parseFloat("abc"));       // NaN

// 科学计数法
console.log(Number.parseFloat("1.23e2"));    // 123

// 与全局 parseFloat 完全相同
console.log(Number.parseFloat === parseFloat); // true

// 实际应用：价格解析
function parsePrice(priceString) {
    const price = Number.parseFloat(priceString);
    if (Number.isNaN(price)) {
        return null;
    }
    return Math.round(price * 100) / 100; // 保留两位小数
}

console.log(parsePrice("19.99"));     // 19.99
console.log(parsePrice("19.999"));    // 20
console.log(parsePrice("invalid"));   // null

// 概念：
// - ES6新增，与全局 parseFloat 相同
// - 提供了命名空间，更好的代码组织
// - 只能解析十进制，不支持其他进制
```

#### Boolean 对象
**创建方式：**
```javascript
const bool1 = true;              // 字面量（推荐）
const bool2 = new Boolean(true); // 构造函数（不推荐）
```

**实例方法：**

**1. `toString()` - 转为字符串**
```javascript
const bool1 = true;
const bool2 = false;
const boolObj = new Boolean(true);

console.log(bool1.toString());  // "true"
console.log(bool2.toString());  // "false"
console.log(boolObj.toString()); // "true"

// 实际应用：条件显示
function displayStatus(isActive) {
    return `状态: ${isActive.toString()}`;
}
console.log(displayStatus(true)); // "状态: true"

// 概念：
// - 返回字符串 "true" 或 "false"
// - 原始布尔值和 Boolean 对象都有此方法
```

**2. `valueOf()` - 返回原始布尔值**
```javascript
const boolObj = new Boolean(false);
const primitive = true;

console.log(boolObj.valueOf());  // false - 返回原始布尔值
console.log(primitive.valueOf()); // true

// 类型检查
console.log(typeof boolObj);           // "object"
console.log(typeof boolObj.valueOf()); // "boolean"
console.log(typeof primitive);         // "boolean"

// 重要陷阱：Boolean 对象在条件判断中总是 true
const falseObj = new Boolean(false);
if (falseObj) {
    console.log("这会执行！"); // 因为对象总是 truthy
}
if (falseObj.valueOf()) {
    console.log("这不会执行"); // 因为原始值是 false
}

// 概念：
// - 返回包装对象的原始布尔值
// - 避免使用 Boolean 构造函数，容易产生混淆
// - 任何对象（包括 new Boolean(false)）在条件判断中都是 true
```

#### Symbol 对象 (ES6)
**创建方式：**
```javascript
const sym1 = Symbol();           // 无描述
const sym2 = Symbol('description'); // 带描述
```

**特性：**
```javascript
// 每个 Symbol 都是唯一的
const sym1 = Symbol('test');
const sym2 = Symbol('test');
console.log(sym1 === sym2); // false - 即使描述相同也不相等

// Symbol 作为对象属性
const obj = {};
const key = Symbol('myKey');
obj[key] = 'value';
console.log(obj[key]); // "value"

// Symbol 属性不会被常规枚举
console.log(Object.keys(obj)); // [] - 不包含 Symbol 属性
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(myKey)]

// 概念：
// - Symbol 是原始数据类型，表示唯一标识符
// - 主要用作对象属性键，避免属性名冲突
// - 不能被 for...in、Object.keys() 等常规方法枚举
```

**静态方法：**

**1. `Symbol.for(key)` - 获取全局 Symbol**
```javascript
// 全局 Symbol 注册表
const sym1 = Symbol.for('global-key');
const sym2 = Symbol.for('global-key');
console.log(sym1 === sym2); // true - 相同 key 返回相同 Symbol

// 与普通 Symbol 的区别
const local1 = Symbol('local');
const local2 = Symbol('local');
console.log(local1 === local2); // false - 普通 Symbol 总是唯一

// 实际应用：库之间共享 Symbol
const SHARED_KEY = Symbol.for('my-library-key');
// 其他代码也可以通过相同 key 获取相同 Symbol
const sameKey = Symbol.for('my-library-key');
console.log(SHARED_KEY === sameKey); // true

// 概念：
// - 维护全局 Symbol 注册表
// - 相同 key 返回相同 Symbol
// - 用于跨模块/库共享 Symbol
```

**2. `Symbol.keyFor(symbol)` - 获取全局 Symbol 的键**
```javascript
const globalSym = Symbol.for('global-key');
const localSym = Symbol('local-key');

console.log(Symbol.keyFor(globalSym)); // "global-key"
console.log(Symbol.keyFor(localSym));  // undefined - 本地 Symbol 没有 key

// 实际应用：调试和日志
function logSymbolInfo(sym) {
    const key = Symbol.keyFor(sym);
    if (key) {
        console.log(`全局 Symbol，key: ${key}`);
    } else {
        console.log(`本地 Symbol，描述: ${sym.description}`);
    }
}

// 概念：
// - 只能获取全局 Symbol 的 key
// - 本地 Symbol 返回 undefined
// - 用于调试和 Symbol 管理
```

**内置 Symbol（Well-known Symbols）：**

**1. `Symbol.iterator` - 迭代器符号**
```javascript
// 自定义可迭代对象
const myIterable = {
    data: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        const data = this.data;
        return {
            next() {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                }
                return { done: true };
            }
        };
    }
};

// 可以使用 for...of 遍历
for (const item of myIterable) {
    console.log(item); // 1, 2, 3
}

// 概念：
// - 定义对象的默认迭代器
// - 使对象可以被 for...of、扩展运算符等使用
```

**2. `Symbol.toStringTag` - toString 标签符号**
```javascript
class MyClass {
    [Symbol.toStringTag] = 'MyCustomClass';
}

const obj = new MyClass();
console.log(Object.prototype.toString.call(obj)); // "[object MyCustomClass]"

// 修改内置对象的标签
const arr = [];
arr[Symbol.toStringTag] = 'MyArray';
console.log(Object.prototype.toString.call(arr)); // "[object MyArray]"

// 概念：
// - 自定义 Object.prototype.toString() 的返回值
// - 用于调试和类型识别
```

**3. `Symbol.hasInstance` - instanceof 符号**
```javascript
class MyClass {
    static [Symbol.hasInstance](instance) {
        // 自定义 instanceof 行为
        return instance.constructor === MyClass || instance.isMyClass === true;
    }
}

const obj = { isMyClass: true };
console.log(obj instanceof MyClass); // true - 自定义逻辑

// 概念：
// - 自定义 instanceof 操作符的行为
// - 可以实现特殊的类型检查逻辑
```

**4. `Symbol.species` - 构造器符号**
```javascript
class MyArray extends Array {
    static get [Symbol.species]() {
        return Array; // 返回普通 Array 而不是 MyArray
    }
}

const myArr = new MyArray(1, 2, 3);
const mapped = myArr.map(x => x * 2); // 使用 map 方法

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array);   // true

// 概念：
// - 控制派生对象创建新实例时使用的构造函数
// - 影响 map、filter 等方法返回的对象类型
```

**5. `Symbol.asyncIterator` - 异步迭代器符号**
```javascript
const asyncIterable = {
    data: [1, 2, 3],
    [Symbol.asyncIterator]() {
        let index = 0;
        const data = this.data;
        return {
            async next() {
                if (index < data.length) {
                    // 模拟异步操作
                    await new Promise(resolve => setTimeout(resolve, 100));
                    return { value: data[index++], done: false };
                }
                return { done: true };
            }
        };
    }
};

// 使用 for await...of 遍历
async function iterate() {
    for await (const item of asyncIterable) {
        console.log(item); // 1, 2, 3 (每个间隔100ms)
    }
}

// 概念：
// - 定义对象的异步迭代器
// - 使对象可以被 for await...of 使用
```

#### BigInt 对象 (ES2020)
**创建方式：**
```javascript
const big1 = 123n;              // 字面量（推荐）
const big2 = BigInt(123);       // 构造函数
const big3 = BigInt("123");     // 从字符串创建
```

**特性和用法：**
```javascript
// 处理超出安全整数范围的数字
const bigNumber = 9007199254740991n + 1n; // 超出 MAX_SAFE_INTEGER
console.log(bigNumber); // 9007199254740992n

// 与普通数字的区别
console.log(typeof 123);   // "number"
console.log(typeof 123n);  // "bigint"

// BigInt 和 Number 不能混合运算
// console.log(123n + 123); // TypeError!
console.log(123n + BigInt(123)); // 246n - 正确方式

// 比较操作
console.log(123n === 123);  // false - 不同类型
console.log(123n == 123);   // true - 类型转换后相等
console.log(123n > 122);    // true - 比较时会转换

// 实际应用：处理大整数
const timestamp = BigInt(Date.now()) * 1000000n; // 微秒时间戳
const largeId = 123456789012345678901234567890n; // 超长ID

// 概念：
// - 用于表示任意精度的整数
// - 解决 Number 类型的整数精度限制
// - 不能与 Number 直接运算，需要显式转换
```

**静态方法：**

**1. `BigInt.asIntN(width, bigint)` - 转为有符号整数**
```javascript
// 将 BigInt 限制在指定位数的有符号整数范围内
console.log(BigInt.asIntN(8, 255n));  // -1n (8位有符号: -128 到 127)
console.log(BigInt.asIntN(8, 127n));  // 127n
console.log(BigInt.asIntN(8, 128n));  // -128n (溢出)

// 32位有符号整数
console.log(BigInt.asIntN(32, 2147483647n));  // 2147483647n
console.log(BigInt.asIntN(32, 2147483648n));  // -2147483648n (溢出)

// 实际应用：模拟固定位数的整数运算
function add32BitInts(a, b) {
    const result = BigInt(a) + BigInt(b);
    return BigInt.asIntN(32, result);
}

console.log(add32BitInts(2147483647, 1)); // -2147483648n (32位溢出)

// 概念：
// - width: 位数（1-53）
// - 模拟固定位数的有符号整数
// - 超出范围会发生溢出（wrap around）
```

**2. `BigInt.asUintN(width, bigint)` - 转为无符号整数**
```javascript
// 将 BigInt 限制在指定位数的无符号整数范围内
console.log(BigInt.asUintN(8, 255n));  // 255n (8位无符号: 0 到 255)
console.log(BigInt.asUintN(8, 256n));  // 0n (溢出)
console.log(BigInt.asUintN(8, -1n));   // 255n (负数转换)

// 32位无符号整数
console.log(BigInt.asUintN(32, 4294967295n)); // 4294967295n
console.log(BigInt.asUintN(32, 4294967296n)); // 0n (溢出)

// 实际应用：处理二进制数据
function createMask(bits) {
    return BigInt.asUintN(bits, (1n << BigInt(bits)) - 1n);
}

console.log(createMask(8).toString(2));  // "11111111" (8位掩码)
console.log(createMask(16).toString(2)); // "1111111111111111" (16位掩码)

// 概念：
// - width: 位数（1-53）
// - 模拟固定位数的无符号整数
// - 只有正数，范围是 0 到 2^width - 1
```

**实际应用场景：**
```javascript
// 1. 处理大整数计算
function factorial(n) {
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}
console.log(factorial(100n)); // 非常大的数，Number 无法精确表示

// 2. 加密和哈希计算
function simpleHash(str) {
    let hash = 0n;
    for (let i = 0; i < str.length; i++) {
        hash = hash * 31n + BigInt(str.charCodeAt(i));
    }
    return hash;
}
console.log(simpleHash("hello world")); // 大整数哈希值

// 3. 时间戳的纳秒精度
const nanoTimestamp = BigInt(Date.now()) * 1000000n; // 纳秒时间戳
console.log(nanoTimestamp);

// 4. 处理大数字ID
const userId = 123456789012345678901234567890n;
const sessionId = userId + 1n;

// 转换方法
console.log(Number(123n));        // 123 - 转为 Number（可能丢失精度）
console.log(String(123n));       // "123" - 转为字符串
console.log(123n.toString());    // "123" - 转为字符串
console.log(123n.toString(16));  // "7b" - 十六进制字符串
```

### 3. 集合对象

#### Array 对象
**创建方式：**
```javascript
const arr1 = [];                    // 字面量
const arr2 = new Array();          // 构造函数
const arr3 = Array.of(1, 2, 3);    // 静态方法
const arr4 = Array.from(iterable); // 静态方法
```

**变异方法（修改原数组）：**

**1. `push(...elements)` - 末尾添加元素**
```javascript
const arr = [1, 2, 3];
const newLength = arr.push(4, 5);
console.log(arr);       // [1, 2, 3, 4, 5]
console.log(newLength); // 5 - 返回新长度

// 实际应用：构建数组
const numbers = [];
for (let i = 1; i <= 3; i++) {
    numbers.push(i * 2);
}
console.log(numbers); // [2, 4, 6]

// 概念：
// - 在数组末尾添加一个或多个元素
// - 返回数组的新长度
// - 修改原数组
```

**2. `pop()` - 删除末尾元素**
```javascript
const arr = [1, 2, 3];
const removed = arr.pop();
console.log(arr);     // [1, 2]
console.log(removed); // 3 - 返回被删除的元素

// 空数组的情况
const empty = [];
console.log(empty.pop()); // undefined

// 实际应用：栈操作
const stack = [];
stack.push('a', 'b', 'c');
while (stack.length > 0) {
    console.log(stack.pop()); // c, b, a
}

// 概念：
// - 删除数组最后一个元素
// - 返回被删除的元素，空数组返回 undefined
// - 配合 push 实现栈（LIFO）操作
```

**3. `unshift(...elements)` - 开头添加元素**
```javascript
const arr = [3, 4, 5];
const newLength = arr.unshift(1, 2);
console.log(arr);       // [1, 2, 3, 4, 5]
console.log(newLength); // 5 - 返回新长度

// 实际应用：优先队列
const tasks = ['task3'];
tasks.unshift('urgent-task'); // 添加紧急任务到开头
console.log(tasks); // ['urgent-task', 'task3']

// 概念：
// - 在数组开头添加一个或多个元素
// - 返回数组的新长度
// - 所有现有元素的索引都会增加
```

**4. `shift()` - 删除开头元素**
```javascript
const arr = [1, 2, 3];
const removed = arr.shift();
console.log(arr);     // [2, 3]
console.log(removed); // 1 - 返回被删除的元素

// 实际应用：队列操作
const queue = ['first', 'second', 'third'];
while (queue.length > 0) {
    const current = queue.shift();
    console.log(`处理: ${current}`);
}
// 处理: first
// 处理: second  
// 处理: third

// 概念：
// - 删除数组第一个元素
// - 返回被删除的元素
// - 配合 push 实现队列（FIFO）操作
// - 所有剩余元素的索引都会减少
```

**5. `splice(start, deleteCount, ...items)` - 删除/插入元素**
```javascript
const arr = [1, 2, 3, 4, 5];

// 删除元素
const deleted = arr.splice(1, 2); // 从索引1开始删除2个元素
console.log(arr);     // [1, 4, 5]
console.log(deleted); // [2, 3] - 返回被删除的元素

// 插入元素
arr.splice(1, 0, 'a', 'b'); // 在索引1插入元素，不删除
console.log(arr); // [1, 'a', 'b', 4, 5]

// 替换元素
arr.splice(1, 2, 'x', 'y', 'z'); // 删除2个元素，插入3个
console.log(arr); // [1, 'x', 'y', 'z', 4, 5]

// 实际应用：数组编辑
function removeItem(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
        return array.splice(index, 1)[0];
    }
}

const items = ['apple', 'banana', 'orange'];
const removed = removeItem(items, 'banana');
console.log(items);   // ['apple', 'orange']
console.log(removed); // 'banana'

// 概念：
// - 最强大的数组修改方法
// - start: 开始位置（负数从末尾算）
// - deleteCount: 删除的元素个数
// - items: 要插入的新元素
// - 返回被删除元素组成的数组
```

**6. `reverse()` - 反转数组**
```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// 字符串反转（通过数组）
function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log(reverseString('hello')); // 'olleh'

// 概念：
// - 就地反转数组元素的顺序
// - 修改原数组并返回它
// - 第一个元素变成最后一个，最后一个变成第一个
```

**7. `sort(compareFn)` - 排序数组**
```javascript
// 默认排序（字符串排序）
const arr1 = [3, 1, 4, 1, 5];
arr1.sort();
console.log(arr1); // [1, 1, 3, 4, 5] - 数字恰好正确

const arr2 = [10, 2, 1, 20];
arr2.sort();
console.log(arr2); // [1, 10, 2, 20] - 按字符串排序！

// 数字排序
const numbers = [10, 2, 1, 20];
numbers.sort((a, b) => a - b); // 升序
console.log(numbers); // [1, 2, 10, 20]

numbers.sort((a, b) => b - a); // 降序
console.log(numbers); // [20, 10, 2, 1]

// 对象排序
const people = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 },
    { name: '王五', age: 20 }
];

// 按年龄排序
people.sort((a, b) => a.age - b.age);
console.log(people); // 按年龄升序

// 按姓名排序
people.sort((a, b) => a.name.localeCompare(b.name));
console.log(people); // 按姓名排序

// 概念：
// - 就地排序数组元素
// - 默认按字符串排序
// - compareFn(a, b): 返回负数(a<b)、0(a=b)、正数(a>b)
// - 修改原数组并返回它
```

**8. `fill(value, start, end)` - 填充数组**
```javascript
const arr = [1, 2, 3, 4, 5];
arr.fill(0);
console.log(arr); // [0, 0, 0, 0, 0]

// 部分填充
const arr2 = [1, 2, 3, 4, 5];
arr2.fill('x', 1, 4); // 从索引1到4（不包含4）
console.log(arr2); // [1, 'x', 'x', 'x', 5]

// 创建初始化数组
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]

// 实际应用：重置状态
const gameBoard = new Array(9).fill(null); // 井字游戏棋盘
console.log(gameBoard); // [null, null, null, null, null, null, null, null, null]

// 注意：填充对象时的陷阱
const arr3 = new Array(3).fill({});
arr3[0].name = 'test';
console.log(arr3); // [{ name: 'test' }, { name: 'test' }, { name: 'test' }]
// 所有元素都指向同一个对象！

// 正确方式：
const arr4 = Array.from({ length: 3 }, () => ({}));
arr4[0].name = 'test';
console.log(arr4); // [{ name: 'test' }, {}, {}]

// 概念：
// - 用静态值填充数组的一部分或全部
// - start: 开始索引（默认0）
// - end: 结束索引（默认length）
// - 修改原数组并返回它
```

**9. `copyWithin(target, start, end)` - 复制数组片段**
```javascript
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // 将索引3开始的元素复制到索引0
console.log(arr); // [4, 5, 3, 4, 5]

// 指定复制范围
const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(1, 3, 4); // 复制索引3到4（不含4）到索引1
console.log(arr2); // [1, 4, 3, 4, 5]

// 负数索引
const arr3 = [1, 2, 3, 4, 5];
arr3.copyWithin(-2, -4, -1); // 从倒数第4到倒数第1，复制到倒数第2
console.log(arr3); // [1, 2, 2, 3, 4]

// 概念：
// - 在同一数组内复制元素到另一位置
// - target: 复制到的目标索引
// - start: 复制源的开始索引
// - end: 复制源的结束索引（不包含）
// - 修改原数组并返回它
// - 浅复制，不改变数组长度
```

**非变异方法（返回新数组）：**

**1. `concat(...arrays)` - 连接数组**
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const result = arr1.concat(arr2, arr3);
console.log(result); // [1, 2, 3, 4, 5, 6]
console.log(arr1);   // [1, 2] - 原数组不变

// 连接单个元素
const result2 = arr1.concat(7, 8);
console.log(result2); // [1, 2, 7, 8]

// 现代替代方法：扩展运算符
const result3 = [...arr1, ...arr2, ...arr3];
console.log(result3); // [1, 2, 3, 4, 5, 6]

// 概念：
// - 创建新数组，不修改原数组
// - 可以连接多个数组和单个元素
// - 浅拷贝，嵌套对象仍是引用
```

**2. `slice(start, end)` - 提取数组片段**
```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.slice(1, 4));   // [2, 3, 4] - 从索引1到4（不含4）
console.log(arr.slice(2));      // [3, 4, 5] - 从索引2到末尾
console.log(arr.slice(-3));     // [3, 4, 5] - 最后3个元素
console.log(arr.slice(-3, -1)); // [3, 4] - 倒数第3到倒数第1

// 复制数组
const copy = arr.slice();
console.log(copy); // [1, 2, 3, 4, 5]

// 实际应用：分页
function paginate(array, page, size) {
    const start = (page - 1) * size;
    const end = start + size;
    return array.slice(start, end);
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(paginate(data, 2, 3)); // [4, 5, 6] - 第2页，每页3个

// 概念：
// - 提取数组的一部分，返回新数组
// - 支持负数索引
// - 不修改原数组
```

**3. `map(callback, thisArg)` - 映射数组**
```javascript
const numbers = [1, 2, 3, 4, 5];

// 基本用法
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 带索引的映射
const withIndex = numbers.map((value, index) => `${index}: ${value}`);
console.log(withIndex); // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]

// 对象数组映射
const people = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 }
];
const names = people.map(person => person.name);
console.log(names); // ['张三', '李四']

// 复杂映射
const products = [
    { name: 'iPhone', price: 999 },
    { name: 'iPad', price: 599 }
];
const formatted = products.map(product => ({
    ...product,
    formattedPrice: `$${product.price}`,
    category: 'Electronics'
}));

// 概念：
// - 对每个元素执行回调函数，返回新数组
// - 新数组长度与原数组相同
// - 不修改原数组
// - callback(element, index, array)
```

**4. `filter(callback, thisArg)` - 过滤数组**
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 基本过滤
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// 复杂条件
const people = [
    { name: '张三', age: 25, active: true },
    { name: '李四', age: 17, active: false },
    { name: '王五', age: 30, active: true }
];

const adults = people.filter(person => person.age >= 18);
const activeAdults = people.filter(person => person.age >= 18 && person.active);

// 去除假值
const mixed = [0, 1, false, 2, '', 3, null, 4, undefined, 5];
const truthy = mixed.filter(Boolean);
console.log(truthy); // [1, 2, 3, 4, 5]

// 去重（配合indexOf）
const duplicates = [1, 2, 2, 3, 3, 3, 4];
const unique = duplicates.filter((item, index) => duplicates.indexOf(item) === index);
console.log(unique); // [1, 2, 3, 4]

// 概念：
// - 返回满足条件的元素组成的新数组
// - 新数组长度可能小于原数组
// - 不修改原数组
```

**5. `reduce(callback, initialValue)` - 累计处理**
```javascript
const numbers = [1, 2, 3, 4, 5];

// 求和
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// 求最大值
const max = numbers.reduce((acc, curr) => Math.max(acc, curr));
console.log(max); // 5

// 计数
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// 分组
const people = [
    { name: '张三', department: 'IT' },
    { name: '李四', department: 'HR' },
    { name: '王五', department: 'IT' }
];
const grouped = people.reduce((acc, person) => {
    const dept = person.department;
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(person);
    return acc;
}, {});

// 扁平化数组
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// 概念：
// - 将数组元素累计处理成单一值
// - callback(accumulator, currentValue, index, array)
// - accumulator: 累计值，currentValue: 当前元素
// - 没有初始值时，第一个元素作为初始累计值
```

**6. `reduceRight(callback, initialValue)` - 从右累计处理**
```javascript
const numbers = [1, 2, 3, 4, 5];

// 从右到左累计
const result = numbers.reduceRight((acc, curr) => {
    console.log(`acc: ${acc}, curr: ${curr}`);
    return acc + curr;
}, 0);
// 输出：acc: 0, curr: 5
//       acc: 5, curr: 4
//       acc: 9, curr: 3
//       acc: 12, curr: 2
//       acc: 14, curr: 1

// 实际应用：构建嵌套结构
const operations = ['add', 'multiply', 'subtract'];
const result2 = operations.reduceRight((acc, op) => {
    return { operation: op, next: acc };
}, null);
// 结果：{ operation: 'add', next: { operation: 'multiply', next: { operation: 'subtract', next: null } } }

// 概念：
// - 与 reduce 类似，但从右到左处理
// - 适用于需要从后往前累计的场景
```

**7. `flat(depth)` - 扁平化数组**
```javascript
const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]] - 默认深度1
console.log(nested.flat(1));   // [1, 2, 3, 4, [5, 6]] - 深度1
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6] - 深度2

// 完全扁平化
const deepNested = [1, [2, [3, [4, [5]]]]];
console.log(deepNested.flat(Infinity)); // [1, 2, 3, 4, 5]

// 移除空槽
const sparse = [1, , 3, [4, , 6]];
console.log(sparse.flat()); // [1, 3, 4, 6] - 移除了空槽

// 实际应用：处理分类数据
const categories = [
    { items: ['apple', 'banana'] },
    { items: ['car', 'bike'] },
    { items: ['book', 'pen'] }
];
const allItems = categories.map(cat => cat.items).flat();
console.log(allItems); // ['apple', 'banana', 'car', 'bike', 'book', 'pen']

// 概念：
// - 将嵌套数组扁平化到指定深度
// - depth: 扁平化深度，默认1
// - 移除数组中的空槽
```

**8. `flatMap(callback, thisArg)` - 映射后扁平化**
```javascript
const sentences = ['Hello world', 'How are you'];

// 分割成单词
const words = sentences.flatMap(sentence => sentence.split(' '));
console.log(words); // ['Hello', 'world', 'How', 'are', 'you']

// 等价于 map + flat
const words2 = sentences.map(sentence => sentence.split(' ')).flat();

// 过滤并映射
const numbers = [1, 2, 3, 4];
const result = numbers.flatMap(x => x % 2 === 0 ? [x * 2] : []);
console.log(result); // [4, 8] - 偶数翻倍

// 实际应用：处理嵌套数据
const users = [
    { name: '张三', hobbies: ['reading', 'gaming'] },
    { name: '李四', hobbies: ['cooking', 'traveling'] }
];
const allHobbies = users.flatMap(user => user.hobbies);
console.log(allHobbies); // ['reading', 'gaming', 'cooking', 'traveling']

// 概念：
// - 相当于 map().flat(1)
// - 映射每个元素并将结果扁平化一层
// - 比分别调用 map 和 flat 更高效
```

**查找和检测方法：**

**1. `indexOf(searchElement, fromIndex)` - 查找元素索引**
```javascript
const arr = [1, 2, 3, 2, 4];

console.log(arr.indexOf(2));      // 1 - 第一个匹配的索引
console.log(arr.indexOf(2, 2));   // 3 - 从索引2开始查找
console.log(arr.indexOf(5));      // -1 - 未找到
console.log(arr.indexOf(2, -2));  // 3 - 负数从末尾计算

// 实际应用：检查元素是否存在
function hasElement(array, element) {
    return array.indexOf(element) !== -1;
}

// 查找所有匹配的索引
function findAllIndexes(array, element) {
    const indexes = [];
    let index = array.indexOf(element);
    while (index !== -1) {
        indexes.push(index);
        index = array.indexOf(element, index + 1);
    }
    return indexes;
}

console.log(findAllIndexes([1, 2, 3, 2, 4, 2], 2)); // [1, 3, 5]

// 概念：
// - 使用严格相等（===）比较
// - 返回第一个匹配元素的索引
// - 未找到返回 -1
// - fromIndex: 开始搜索的位置
```

**2. `lastIndexOf(searchElement, fromIndex)` - 从后查找索引**
```javascript
const arr = [1, 2, 3, 2, 4];

console.log(arr.lastIndexOf(2));     // 3 - 最后一个匹配的索引
console.log(arr.lastIndexOf(2, 2));  // 1 - 从索引2向前查找
console.log(arr.lastIndexOf(5));     // -1 - 未找到

// 实际应用：查找文件扩展名
function getFileExtension(filename) {
    const lastDot = filename.lastIndexOf('.');
    return lastDot === -1 ? '' : filename.slice(lastDot + 1);
}

console.log(getFileExtension('document.backup.pdf')); // 'pdf'

// 概念：
// - 从数组末尾向前搜索
// - 返回最后一个匹配元素的索引
// - fromIndex: 从指定位置向前搜索
```

**3. `includes(searchElement, fromIndex)` - 检查是否包含元素**
```javascript
const arr = [1, 2, 3, NaN, 'hello'];

console.log(arr.includes(2));        // true
console.log(arr.includes(5));        // false
console.log(arr.includes(2, 2));     // false - 从索引2开始查找
console.log(arr.includes(NaN));      // true - 可以正确检测NaN

// 与 indexOf 的区别
console.log(arr.indexOf(NaN));       // -1 - indexOf无法找到NaN
console.log(arr.includes(NaN));      // true - includes可以找到NaN

// 实际应用：权限检查
const userRoles = ['user', 'editor', 'admin'];
function hasPermission(role) {
    return userRoles.includes(role);
}

console.log(hasPermission('admin')); // true
console.log(hasPermission('guest')); // false

// 概念：
// - ES2016新增方法
// - 返回布尔值，比 indexOf !== -1 更直观
// - 可以正确检测 NaN
// - 使用 SameValueZero 比较算法
```

**4. `find(callback, thisArg)` - 查找元素**
```javascript
const people = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 },
    { name: '王五', age: 20 }
];

// 查找第一个成年人
const adult = people.find(person => person.age >= 18);
console.log(adult); // { name: '张三', age: 25 }

// 查找特定名字
const zhangsan = people.find(person => person.name === '张三');

// 未找到返回 undefined
const senior = people.find(person => person.age >= 60);
console.log(senior); // undefined

// 复杂查找条件
const products = [
    { id: 1, name: 'iPhone', price: 999, inStock: true },
    { id: 2, name: 'iPad', price: 599, inStock: false },
    { id: 3, name: 'MacBook', price: 1299, inStock: true }
];

const availableExpensive = products.find(product => 
    product.inStock && product.price > 1000
);

// 概念：
// - 返回第一个满足条件的元素
// - 未找到返回 undefined
// - callback(element, index, array)
// - 一旦找到就停止搜索
```

**5. `findIndex(callback, thisArg)` - 查找元素索引**
```javascript
const numbers = [1, 2, 3, 4, 5];

// 查找第一个偶数的索引
const evenIndex = numbers.findIndex(x => x % 2 === 0);
console.log(evenIndex); // 1

// 查找对象数组中的索引
const people = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 }
];

const index = people.findIndex(person => person.name === '李四');
console.log(index); // 1

// 实际应用：更新数组中的对象
function updatePerson(people, name, newAge) {
    const index = people.findIndex(person => person.name === name);
    if (index !== -1) {
        people[index].age = newAge;
        return true;
    }
    return false;
}

// 概念：
// - 返回第一个满足条件的元素索引
// - 未找到返回 -1
// - 与 find 对应，返回索引而不是元素
```

**6. `findLast(callback, thisArg)` - 从后查找元素**
```javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// 从后往前查找第一个偶数
const lastEven = numbers.findLast(x => x % 2 === 0);
console.log(lastEven); // 2 (倒数第二个元素)

// 查找最后一个满足条件的对象
const logs = [
    { level: 'info', message: 'App started' },
    { level: 'error', message: 'Database error' },
    { level: 'info', message: 'User logged in' },
    { level: 'error', message: 'API error' }
];

const lastError = logs.findLast(log => log.level === 'error');
console.log(lastError); // { level: 'error', message: 'API error' }

// 概念：
// - ES2023新增方法
// - 从数组末尾向前查找
// - 返回最后一个满足条件的元素
// - 未找到返回 undefined
```

**7. `findLastIndex(callback, thisArg)` - 从后查找索引**
```javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// 从后往前查找第一个偶数的索引
const lastEvenIndex = numbers.findLastIndex(x => x % 2 === 0);
console.log(lastEvenIndex); // 7

// 实际应用：查找最后一次出现的位置
const activities = [
    { type: 'login', time: '09:00' },
    { type: 'purchase', time: '10:30' },
    { type: 'login', time: '14:00' },
    { type: 'logout', time: '18:00' }
];

const lastLoginIndex = activities.findLastIndex(activity => activity.type === 'login');
console.log(lastLoginIndex); // 2

// 概念：
// - ES2023新增方法
// - 从数组末尾向前查找
// - 返回最后一个满足条件的元素索引
// - 未找到返回 -1
```

**遍历方法：**

**1. `forEach(callback, thisArg)` - 遍历数组**
```javascript
const numbers = [1, 2, 3, 4, 5];

// 基本遍历
numbers.forEach(num => console.log(num)); // 1, 2, 3, 4, 5

// 带索引的遍历
numbers.forEach((num, index) => {
    console.log(`${index}: ${num}`);
});

// 修改原数组（注意：不能改变数组长度）
const arr = [1, 2, 3];
arr.forEach((item, index, array) => {
    array[index] = item * 2;
});
console.log(arr); // [2, 4, 6]

// 实际应用：DOM操作
const buttons = ['Save', 'Cancel', 'Delete'];
buttons.forEach(text => {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
});

// 概念：
// - 对每个元素执行回调函数
// - 无返回值（返回undefined）
// - 不能使用break或continue
// - 无法提前终止循环
```

**2. `every(callback, thisArg)` - 检查所有元素**
```javascript
const numbers = [2, 4, 6, 8, 10];

// 检查是否所有数字都是偶数
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true

// 检查对象数组
const people = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 },
    { name: '王五', age: 20 }
];

const allAdults = people.every(person => person.age >= 18);
console.log(allAdults); // true

// 空数组总是返回true
console.log([].every(x => x > 100)); // true

// 实际应用：表单验证
const formFields = [
    { value: 'John', required: true },
    { value: 'john@email.com', required: true },
    { value: '', required: false }
];

const isFormValid = formFields.every(field => 
    !field.required || field.value.trim() !== ''
);

// 概念：
// - 所有元素都满足条件才返回true
// - 一旦遇到不满足的元素就返回false
// - 短路求值：不会检查剩余元素
// - 空数组返回true（空真值）
```

**3. `some(callback, thisArg)` - 检查部分元素**
```javascript
const numbers = [1, 3, 5, 8, 9];

// 检查是否有偶数
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// 检查对象数组
const products = [
    { name: 'iPhone', price: 999 },
    { name: 'iPad', price: 599 },
    { name: 'AirPods', price: 199 }
];

const hasExpensive = products.some(product => product.price > 800);
console.log(hasExpensive); // true

// 空数组总是返回false
console.log([].some(x => x > 0)); // false

// 实际应用：权限检查
const userPermissions = ['read', 'write'];
const requiredPermissions = ['admin', 'write', 'delete'];

const hasAnyPermission = requiredPermissions.some(permission => 
    userPermissions.includes(permission)
);

// 概念：
// - 只要有一个元素满足条件就返回true
// - 一旦找到满足条件的元素就返回true
// - 短路求值：不会检查剩余元素
// - 空数组返回false（空假值）
```

**4. `entries()` - 返回键值对迭代器**
```javascript
const fruits = ['apple', 'banana', 'orange'];

// 获取迭代器
const iterator = fruits.entries();

// 手动迭代
console.log(iterator.next()); // { value: [0, 'apple'], done: false }
console.log(iterator.next()); // { value: [1, 'banana'], done: false }

// 使用for...of遍历
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}
// 0: apple
// 1: banana  
// 2: orange

// 转为数组
const entriesArray = Array.from(fruits.entries());
console.log(entriesArray); // [[0, 'apple'], [1, 'banana'], [2, 'orange']]

// 实际应用：带索引的处理
const items = ['first', 'second', 'third'];
const numbered = Array.from(items.entries()).map(([index, item]) => 
    `${index + 1}. ${item}`
);
console.log(numbered); // ['1. first', '2. second', '3. third']

// 概念：
// - 返回包含[index, value]对的迭代器
// - 每次迭代返回[索引, 值]数组
// - 可用于for...of循环
// - 迭代器是一次性的
```

**5. `keys()` - 返回键迭代器**
```javascript
const fruits = ['apple', 'banana', 'orange'];

// 获取所有索引
const keys = Array.from(fruits.keys());
console.log(keys); // [0, 1, 2]

// 使用for...of遍历索引
for (const index of fruits.keys()) {
    console.log(`Index: ${index}, Value: ${fruits[index]}`);
}

// 处理稀疏数组
const sparse = ['a', , 'c', , 'e'];
console.log(Array.from(sparse.keys())); // [0, 1, 2, 3, 4]
console.log(sparse.length); // 5

// 实际应用：生成索引数组
function createIndexArray(length) {
    return Array.from({ length }, (_, index) => index);
    // 或者
    // return Array.from(Array(length).keys());
}

console.log(createIndexArray(5)); // [0, 1, 2, 3, 4]

// 概念：
// - 返回数组索引的迭代器
// - 包括稀疏数组的空槽索引
// - 常用于需要索引的场景
```

**6. `values()` - 返回值迭代器**
```javascript
const fruits = ['apple', 'banana', 'orange'];

// 获取所有值
const values = Array.from(fruits.values());
console.log(values); // ['apple', 'banana', 'orange']

// 使用for...of遍历（等价于直接遍历数组）
for (const fruit of fruits.values()) {
    console.log(fruit);
}

// 等价于
for (const fruit of fruits) {
    console.log(fruit);
}

// 处理稀疏数组
const sparse = ['a', , 'c'];
console.log(Array.from(sparse.values())); // ['a', undefined, 'c']

// 概念：
// - 返回数组值的迭代器
// - 与直接遍历数组效果相同
// - 稀疏数组的空槽返回undefined
// - 主要用于统一的迭代器接口
```

**静态方法：**

**1. `Array.isArray(value)` - 检查是否为数组**
```javascript
// 基本用法
console.log(Array.isArray([]));           // true
console.log(Array.isArray([1, 2, 3]));    // true
console.log(Array.isArray('array'));      // false
console.log(Array.isArray({ 0: 'a', length: 1 })); // false - 类数组对象

// 与其他检测方法的区别
const arr = [1, 2, 3];
console.log(Array.isArray(arr));          // true - 推荐
console.log(arr instanceof Array);        // true - 但跨iframe可能失效
console.log(Object.prototype.toString.call(arr)); // "[object Array]"

// 实际应用：参数处理
function processItems(items) {
    if (!Array.isArray(items)) {
        items = [items]; // 转为数组
    }
    return items.map(item => item.toString());
}

console.log(processItems('single'));    // ['single']
console.log(processItems(['a', 'b']));  // ['a', 'b']

// 概念：
// - 最可靠的数组检测方法
// - 跨iframe和跨窗口都有效
// - 不受原型链影响
// - ES5新增方法
```

**2. `Array.from(arrayLike, mapFn, thisArg)` - 从类数组创建数组**
```javascript
// 从类数组对象创建
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const arr1 = Array.from(arrayLike);
console.log(arr1); // ['a', 'b', 'c']

// 从字符串创建
const arr2 = Array.from('hello');
console.log(arr2); // ['h', 'e', 'l', 'l', 'o']

// 从Set创建
const set = new Set([1, 2, 3, 2, 1]);
const arr3 = Array.from(set);
console.log(arr3); // [1, 2, 3] - 自动去重

// 带映射函数
const arr4 = Array.from('12345', x => parseInt(x));
console.log(arr4); // [1, 2, 3, 4, 5]

// 等价于
const arr5 = Array.from('12345').map(x => parseInt(x));

// 生成数字序列
const range = Array.from({ length: 5 }, (_, i) => i);
console.log(range); // [0, 1, 2, 3, 4]

const range2 = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range2); // [1, 2, 3, 4, 5]

// 实际应用：DOM节点列表转数组
const nodeList = document.querySelectorAll('div');
const divArray = Array.from(nodeList);
divArray.forEach(div => console.log(div.textContent));

// 复制数组（浅拷贝）
const original = [1, 2, 3];
const copy = Array.from(original);

// 概念：
// - 从可迭代对象或类数组对象创建新数组
// - mapFn: 可选的映射函数
// - thisArg: 映射函数的this值
// - 比扩展运算符更强大，支持类数组对象
```

**3. `Array.of(...elements)` - 创建数组**
```javascript
// 基本用法
console.log(Array.of(1, 2, 3));      // [1, 2, 3]
console.log(Array.of(7));            // [7]
console.log(Array.of(1, 'a', true)); // [1, 'a', true]

// 与Array构造函数的区别
console.log(new Array(7));    // [empty × 7] - 创建长度为7的空数组
console.log(Array.of(7));     // [7] - 创建包含7的数组

console.log(new Array(1, 2, 3)); // [1, 2, 3] - 多个参数时行为相同
console.log(Array.of(1, 2, 3));  // [1, 2, 3]

// 实际应用：统一的数组创建方式
function createArray(...args) {
    return Array.of(...args); // 总是创建包含参数的数组
}

console.log(createArray(5));        // [5] 而不是长度为5的空数组
console.log(createArray(1, 2, 3));  // [1, 2, 3]

// 概念：
// - ES6新增方法
// - 解决Array构造函数的歧义问题
// - 总是创建包含参数值的数组
// - 参数数量不影响行为
```

#### Set 对象 (ES6)
**创建方式：**
```javascript
const set1 = new Set();                    // 空集合
const set2 = new Set([1, 2, 3, 2, 1]);    // 自动去重：{1, 2, 3}
const set3 = new Set('hello');            // {'h', 'e', 'l', 'o'} - 字符去重
```

**特性：**
```javascript
// 自动去重
const numbers = [1, 2, 2, 3, 3, 3, 4];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4]

// 值的唯一性（使用SameValueZero算法）
const set = new Set();
set.add(1);
set.add('1');
set.add(NaN);
set.add(NaN); // 重复的NaN不会被添加
console.log(set); // Set(3) {1, '1', NaN}

// 对象引用比较
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const objSet = new Set([obj1, obj2, obj1]);
console.log(objSet.size); // 2 - obj1和obj2是不同的对象
```

**实例方法：**

**1. `add(value)` - 添加值**
```javascript
const set = new Set();

set.add(1);
set.add(2);
set.add(2); // 重复值不会被添加
console.log(set); // Set(2) {1, 2}

// 链式调用
set.add(3).add(4).add(5);
console.log(set); // Set(5) {1, 2, 3, 4, 5}

// 添加不同类型的值
set.add('string').add(true).add(null).add(undefined);

// 概念：
// - 返回Set对象本身，支持链式调用
// - 重复值会被忽略
// - 可以添加任何类型的值
```

**2. `delete(value)` - 删除值**
```javascript
const set = new Set([1, 2, 3, 4, 5]);

console.log(set.delete(3)); // true - 删除成功
console.log(set.delete(6)); // false - 值不存在
console.log(set); // Set(4) {1, 2, 4, 5}

// 实际应用：从数组中删除特定值
function removeFromArray(array, value) {
    const set = new Set(array);
    set.delete(value);
    return [...set];
}

const arr = [1, 2, 3, 2, 4, 3];
const result = removeFromArray(arr, 2);
console.log(result); // [1, 3, 4] - 删除所有的2

// 概念：
// - 返回布尔值表示是否删除成功
// - 删除不存在的值返回false
```

**3. `has(value)` - 检查是否存在值**
```javascript
const set = new Set([1, 2, 3, 'hello', true]);

console.log(set.has(2));      // true
console.log(set.has('hello')); // true
console.log(set.has(4));      // false

// 实际应用：权限检查
const userPermissions = new Set(['read', 'write', 'delete']);

function hasPermission(permission) {
    return userPermissions.has(permission);
}

console.log(hasPermission('read'));   // true
console.log(hasPermission('admin'));  // false

// 概念：
// - 返回布尔值
// - 比数组的includes方法更快（O(1) vs O(n)）
// - 使用SameValueZero比较算法
```

**4. `clear()` - 清空集合**
```javascript
const set = new Set([1, 2, 3, 4, 5]);
console.log(set.size); // 5

set.clear();
console.log(set.size); // 0
console.log(set);      // Set(0) {}

// 实际应用：重置状态
const activeUsers = new Set();
// ... 添加用户
// 需要重置时
activeUsers.clear();

// 概念：
// - 删除所有元素
// - 无返回值
// - size变为0
```

**5. `forEach(callback, thisArg)` - 遍历集合**
```javascript
const set = new Set(['a', 'b', 'c']);

// 基本遍历
set.forEach(value => console.log(value));
// a, b, c

// 带索引的遍历（注意：Set中value和key相同）
set.forEach((value, key, set) => {
    console.log(`${key} => ${value}`); // a => a, b => b, c => c
});

// 实际应用：批量操作
const urls = new Set([
    'https://api1.com',
    'https://api2.com',
    'https://api3.com'
]);

urls.forEach(async (url) => {
    try {
        const response = await fetch(url);
        console.log(`${url}: ${response.status}`);
    } catch (error) {
        console.error(`${url}: Error`);
    }
});

// 概念：
// - callback(value, key, set)
// - 在Set中，value和key是相同的
// - 与数组的forEach类似
```

**6. `entries()` - 返回 [value, value] 迭代器**
```javascript
const set = new Set(['a', 'b', 'c']);

// 获取迭代器
for (const [key, value] of set.entries()) {
    console.log(`${key} => ${value}`);
}
// a => a, b => b, c => c

// 转为数组
const entries = Array.from(set.entries());
console.log(entries); // [['a', 'a'], ['b', 'b'], ['c', 'c']]

// 概念：
// - 返回[value, value]格式的迭代器
// - 为了与Map保持接口一致
// - 在Set中key和value相同
```

**7. `keys()` 和 `values()` - 返回值迭代器**
```javascript
const set = new Set(['a', 'b', 'c']);

// keys()和values()返回相同的迭代器
console.log(set.keys() === set.values()); // false - 不同的迭代器对象
console.log([...set.keys()]);   // ['a', 'b', 'c']
console.log([...set.values()]); // ['a', 'b', 'c']

// 使用for...of遍历
for (const value of set.values()) {
    console.log(value); // a, b, c
}

// 等价于直接遍历Set
for (const value of set) {
    console.log(value); // a, b, c
}

// 概念：
// - keys()和values()返回相同内容的迭代器
// - 为了与Map保持接口一致
```

**属性：**

**`size` - 集合大小**
```javascript
const set = new Set();
console.log(set.size); // 0

set.add(1).add(2).add(3);
console.log(set.size); // 3

set.add(2); // 重复值
console.log(set.size); // 3 - 大小不变

set.delete(1);
console.log(set.size); // 2

// 实际应用：统计唯一值数量
function countUniqueValues(array) {
    return new Set(array).size;
}

console.log(countUniqueValues([1, 2, 2, 3, 3, 3])); // 3
```

**实际应用场景：**
```javascript
// 1. 数组去重
const numbers = [1, 2, 2, 3, 3, 4, 5, 5];
const unique = [...new Set(numbers)];

// 2. 字符串去重
const str = 'hello world';
const uniqueChars = [...new Set(str)].join('');

// 3. 交集、并集、差集
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// 并集
const union = new Set([...setA, ...setB]);

// 交集
const intersection = new Set([...setA].filter(x => setB.has(x)));

// 差集
const difference = new Set([...setA].filter(x => !setB.has(x)));

// 4. 快速查找
const allowedOrigins = new Set([
    'https://example.com',
    'https://app.example.com',
    'https://admin.example.com'
]);

function isAllowedOrigin(origin) {
    return allowedOrigins.has(origin); // O(1)时间复杂度
}
```

#### Map 对象 (ES6)
**创建方式：**
```javascript
const map1 = new Map();                                    // 空映射
const map2 = new Map([['key1', 'value1'], ['key2', 'value2']]); // 从数组创建
const map3 = new Map(Object.entries({ a: 1, b: 2 }));     // 从对象创建
```

**特性：**
```javascript
// 任何类型都可以作为键
const map = new Map();
map.set('string', 'value1');
map.set(42, 'value2');
map.set(true, 'value3');
map.set({}, 'value4');
map.set([], 'value5');

// 键的比较使用SameValueZero算法
map.set(NaN, 'NaN value');
console.log(map.get(NaN)); // 'NaN value'

// 与普通对象的区别
const obj = {};
const map = new Map();

// 对象的键只能是字符串或Symbol
obj[1] = 'number key';        // 1被转换为'1'
console.log(obj['1']);        // 'number key'

// Map的键可以是任何类型
map.set(1, 'number key');
map.set('1', 'string key');
console.log(map.get(1));      // 'number key'
console.log(map.get('1'));    // 'string key'
```

**实例方法：**

**1. `set(key, value)` - 设置键值对**
```javascript
const map = new Map();

map.set('name', '张三');
map.set('age', 25);
map.set('city', '北京');

// 链式调用
map.set('country', '中国').set('job', '工程师');

// 使用对象作为键
const userObj = { id: 1 };
const configObj = { theme: 'dark' };
map.set(userObj, configObj);

console.log(map.get(userObj)); // { theme: 'dark' }

// 概念：
// - 返回Map对象本身，支持链式调用
// - 相同键会覆盖之前的值
// - 键可以是任何类型
```

**2. `get(key)` - 获取值**
```javascript
const map = new Map([
    ['name', '张三'],
    ['age', 25],
    [42, 'number key'],
    [true, 'boolean key']
]);

console.log(map.get('name')); // '张三'
console.log(map.get('age'));  // 25
console.log(map.get(42));     // 'number key'
console.log(map.get('42'));   // undefined - 不同的键

// 不存在的键返回undefined
console.log(map.get('city')); // undefined

// 实际应用：缓存
const cache = new Map();

function expensiveOperation(input) {
    if (cache.has(input)) {
        return cache.get(input);
    }
    
    const result = input * input; // 模拟昂贵操作
    cache.set(input, result);
    return result;
}

// 概念：
// - 返回对应键的值
// - 键不存在返回undefined
// - 严格比较键的相等性
```

**3. `delete(key)` - 删除键值对**
```javascript
const map = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

console.log(map.delete('b')); // true - 删除成功
console.log(map.delete('d')); // false - 键不存在
console.log(map);             // Map(2) {'a' => 1, 'c' => 3}

// 删除对象键
const objKey = { id: 1 };
map.set(objKey, 'object value');
console.log(map.delete(objKey)); // true

// 概念：
// - 返回布尔值表示是否删除成功
// - 删除不存在的键返回false
```

**4. `has(key)` - 检查是否存在键**
```javascript
const map = new Map([
    ['name', '张三'],
    ['age', 25],
    [null, 'null key'],
    [undefined, 'undefined key']
]);

console.log(map.has('name'));     // true
console.log(map.has('city'));     // false
console.log(map.has(null));       // true
console.log(map.has(undefined));  // true

// 实际应用：配置管理
const config = new Map([
    ['apiUrl', 'https://api.example.com'],
    ['timeout', 5000],
    ['retries', 3]
]);

function getConfig(key, defaultValue) {
    return config.has(key) ? config.get(key) : defaultValue;
}

console.log(getConfig('timeout', 3000)); // 5000
console.log(getConfig('debug', false));  // false

// 概念：
// - 返回布尔值
// - 检查键是否存在，不是值
// - 比对象的hasOwnProperty更直观
```

**5. `clear()` - 清空映射**
```javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log(map.size); // 3

map.clear();
console.log(map.size); // 0
console.log(map);      // Map(0) {}

// 概念：
// - 删除所有键值对
// - 无返回值
// - size变为0
```

**6. `forEach(callback, thisArg)` - 遍历映射**
```javascript
const map = new Map([
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
]);

// 基本遍历
map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});
// name: 张三
// age: 25
// city: 北京

// 完整参数
map.forEach((value, key, map) => {
    console.log(`Map中${key}的值是${value}`);
});

// 概念：
// - callback(value, key, map)
// - 注意参数顺序：value在前，key在后
// - 与Set的forEach类似
```

**7. 迭代器方法**
```javascript
const map = new Map([
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
]);

// entries() - 返回[key, value]迭代器
for (const [key, value] of map.entries()) {
    console.log(`${key}: ${value}`);
}

// keys() - 返回键迭代器
for (const key of map.keys()) {
    console.log(`Key: ${key}`);
}

// values() - 返回值迭代器
for (const value of map.values()) {
    console.log(`Value: ${value}`);
}

// 默认迭代器是entries()
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}

// 转为数组
const keysArray = [...map.keys()];     // ['name', 'age', 'city']
const valuesArray = [...map.values()]; // ['张三', 25, '北京']
const entriesArray = [...map.entries()]; // [['name', '张三'], ['age', 25], ['city', '北京']]
```

**属性：**

**`size` - 映射大小**
```javascript
const map = new Map();
console.log(map.size); // 0

map.set('a', 1).set('b', 2);
console.log(map.size); // 2

map.delete('a');
console.log(map.size); // 1

// 与对象的区别
const obj = { a: 1, b: 2 };
console.log(Object.keys(obj).length); // 2 - 需要计算
console.log(map.size);                 // 直接属性
```

**实际应用场景：**
```javascript
// 1. 对象映射
const userRoles = new Map([
    ['user1', 'admin'],
    ['user2', 'editor'],
    ['user3', 'viewer']
]);

// 2. 缓存系统
const cache = new Map();
function memoize(fn) {
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// 3. 计数器
const counter = new Map();
function count(item) {
    const current = counter.get(item) || 0;
    counter.set(item, current + 1);
}

// 4. 与对象的性能对比
// Map: 频繁增删操作性能更好
// Object: 记录类型，属性固定时更好
```

#### WeakSet 对象 (ES6)
**创建方式：**
```javascript
const weakSet = new WeakSet();
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const weakSet2 = new WeakSet([obj1, obj2]); // 只能存储对象
```

**特性：**
```javascript
// 只能存储对象引用
const weakSet = new WeakSet();
const obj = { name: 'test' };

weakSet.add(obj);        // ✅ 正确
// weakSet.add(1);       // ❌ TypeError: 只能添加对象
// weakSet.add('string'); // ❌ TypeError: 只能添加对象

// 弱引用特性
let obj1 = { data: 'important' };
weakSet.add(obj1);

obj1 = null; // 对象可以被垃圾回收，即使在WeakSet中

// 不可枚举
console.log(weakSet.size); // undefined - 没有size属性
// for (const item of weakSet) {} // ❌ TypeError: 不可迭代
```

**实例方法：**

**1. `add(value)` - 添加对象**
```javascript
const weakSet = new WeakSet();
const obj1 = { id: 1 };
const obj2 = { id: 2 };

weakSet.add(obj1);
weakSet.add(obj2);
weakSet.add(obj1); // 重复添加会被忽略

// 链式调用
const obj3 = { id: 3 };
weakSet.add(obj1).add(obj3);

// 实际应用：标记DOM元素
const processedElements = new WeakSet();

function processElement(element) {
    if (processedElements.has(element)) {
        return; // 已处理过
    }
    
    // 处理元素
    element.classList.add('processed');
    processedElements.add(element);
}

// 概念：
// - 只能添加对象
// - 返回WeakSet对象本身
// - 支持链式调用
```

**2. `delete(value)` - 删除对象**
```javascript
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const weakSet = new WeakSet([obj1, obj2]);

console.log(weakSet.delete(obj1)); // true
console.log(weakSet.delete(obj1)); // false - 已经删除
console.log(weakSet.has(obj1));    // false

// 概念：
// - 返回布尔值表示是否删除成功
// - 删除不存在的对象返回false
```

**3. `has(value)` - 检查是否存在对象**
```javascript
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const weakSet = new WeakSet([obj1]);

console.log(weakSet.has(obj1)); // true
console.log(weakSet.has(obj2)); // false

// 实际应用：防止重复处理
const visitedNodes = new WeakSet();

function traverseDOM(node) {
    if (visitedNodes.has(node)) {
        return; // 避免循环引用
    }
    
    visitedNodes.add(node);
    // 处理节点
    for (const child of node.children) {
        traverseDOM(child);
    }
}

// 概念：
// - 返回布尔值
// - 检查对象是否在集合中
```

**使用场景：**
```javascript
// 1. 标记对象状态（不影响垃圾回收）
const privateData = new WeakSet();

class MyClass {
    constructor() {
        privateData.add(this); // 标记为私有
    }
    
    isPrivate() {
        return privateData.has(this);
    }
}

// 2. DOM元素标记
const highlightedElements = new WeakSet();

function highlight(element) {
    element.style.backgroundColor = 'yellow';
    highlightedElements.add(element);
}

function isHighlighted(element) {
    return highlightedElements.has(element);
}
```

#### WeakMap 对象 (ES6)
**创建方式：**
```javascript
const weakMap = new WeakMap();
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const weakMap2 = new WeakMap([[obj1, 'value1'], [obj2, 'value2']]);
```

**特性：**
```javascript
// 只能使用对象作为键
const weakMap = new WeakMap();
const obj = { name: 'test' };

weakMap.set(obj, 'some data');   // ✅ 正确
// weakMap.set('string', 'data'); // ❌ TypeError: 键必须是对象

// 弱引用特性
let key = { id: 1 };
weakMap.set(key, 'important data');

key = null; // 对象可以被垃圾回收，WeakMap中的条目也会被清理

// 不可枚举
console.log(weakMap.size); // undefined - 没有size属性
// for (const [key, value] of weakMap) {} // ❌ TypeError: 不可迭代
```

**实例方法：**

**1. `set(key, value)` - 设置键值对**
```javascript
const weakMap = new WeakMap();
const obj1 = { id: 1 };
const obj2 = { id: 2 };

weakMap.set(obj1, { name: '张三', role: 'admin' });
weakMap.set(obj2, { name: '李四', role: 'user' });

// 链式调用
const obj3 = { id: 3 };
weakMap.set(obj1, 'data1').set(obj3, 'data3');

// 概念：
// - 键必须是对象
// - 返回WeakMap对象本身
// - 支持链式调用
```

**2. `get(key)` - 获取值**
```javascript
const obj = { id: 1 };
const weakMap = new WeakMap();
weakMap.set(obj, { name: '张三', age: 25 });

console.log(weakMap.get(obj)); // { name: '张三', age: 25 }

const obj2 = { id: 1 }; // 不同的对象，即使内容相同
console.log(weakMap.get(obj2)); // undefined

// 概念：
// - 返回对应键的值
// - 键不存在返回undefined
// - 使用对象引用比较，不是内容比较
```

**3. `delete(key)` - 删除键值对**
```javascript
const obj = { id: 1 };
const weakMap = new WeakMap();
weakMap.set(obj, 'some data');

console.log(weakMap.delete(obj)); // true
console.log(weakMap.delete(obj)); // false - 已删除
console.log(weakMap.has(obj));    // false

// 概念：
// - 返回布尔值表示是否删除成功
// - 删除不存在的键返回false
```

**4. `has(key)` - 检查是否存在键**
```javascript
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const weakMap = new WeakMap();
weakMap.set(obj1, 'data');

console.log(weakMap.has(obj1)); // true
console.log(weakMap.has(obj2)); // false

// 概念：
// - 返回布尔值
// - 检查对象键是否存在
```

**实际应用场景：**
```javascript
// 1. 私有数据存储
const privateData = new WeakMap();

class User {
    constructor(name) {
        this.name = name;
        privateData.set(this, { password: 'secret123' });
    }
    
    getPassword() {
        return privateData.get(this).password;
    }
    
    setPassword(newPassword) {
        privateData.get(this).password = newPassword;
    }
}

// 2. DOM元素数据关联
const elementData = new WeakMap();

function attachData(element, data) {
    elementData.set(element, data);
}

function getData(element) {
    return elementData.get(element);
}

// 当DOM元素被删除时，关联数据也会被自动清理

// 3. 对象元数据
const metadata = new WeakMap();

function addMetadata(obj, meta) {
    metadata.set(obj, meta);
}

// 对象被垃圾回收时，元数据也会被清理

// 4. 缓存（自动清理）
const cache = new WeakMap();

function getCachedResult(obj) {
    if (cache.has(obj)) {
        return cache.get(obj);
    }
    
    const result = expensiveComputation(obj);
    cache.set(obj, result);
    return result;
}

// 概念：
// - WeakSet/WeakMap 主要用于：
//   1. 避免内存泄漏
//   2. 私有数据存储
//   3. 对象标记和元数据
//   4. 自动清理的缓存
```

### 4. 函数对象

#### Function 对象
**创建方式：**
```javascript
function func1() {}                    // 函数声明
const func2 = function() {};          // 函数表达式
const func3 = () => {};               // 箭头函数
const func4 = new Function('a', 'b', 'return a + b'); // 构造函数
```

**实例方法：**

**1. `call(thisArg, ...args)` - 调用函数并指定 this**
```javascript
function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: '张三' };

// 使用call调用
const result = greet.call(person, 'Hello', '!');
console.log(result); // "Hello, 张三!"

// 借用其他对象的方法
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const array = Array.prototype.slice.call(arrayLike);
console.log(array); // ['a', 'b', 'c']

// 实际应用：类型检测
function getType(value) {
    return Object.prototype.toString.call(value);
}

console.log(getType([]));        // "[object Array]"
console.log(getType({}));        // "[object Object]"
console.log(getType(new Date())); // "[object Date]"

// 概念：
// - 立即调用函数
// - 第一个参数设置函数内部的this值
// - 后续参数作为函数参数传递
// - 参数一个一个传递
```

**2. `apply(thisArg, argsArray)` - 调用函数并指定 this（参数为数组）**
```javascript
function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: '李四' };

// 使用apply调用
const result = greet.apply(person, ['Hi', '?']);
console.log(result); // "Hi, 李四?"

// 实际应用：找数组最大值
const numbers = [1, 5, 3, 9, 2];
const max = Math.max.apply(null, numbers);
console.log(max); // 9

// 现代写法：使用扩展运算符
const max2 = Math.max(...numbers);

// 数组合并
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push.apply(arr1, arr2); // 等价于 arr1.push(...arr2)
console.log(arr1); // [1, 2, 3, 4, 5, 6]

// 概念：
// - 立即调用函数
// - 第一个参数设置this值
// - 第二个参数是数组，作为函数参数展开
// - 适用于参数数量不确定的情况
```

**3. `bind(thisArg, ...args)` - 绑定 this 并返回新函数**
```javascript
function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: '王五' };

// 绑定this
const boundGreet = greet.bind(person);
console.log(boundGreet('Hello', '!')); // "Hello, 王五!"

// 部分应用（预设参数）
const sayHello = greet.bind(person, 'Hello');
console.log(sayHello('!'));  // "Hello, 王五!"
console.log(sayHello('?'));  // "Hello, 王五?"

// 实际应用：事件处理
class Counter {
    constructor() {
        this.count = 0;
        this.element = document.createElement('button');
        this.element.textContent = 'Click me';
        
        // 绑定this，确保事件处理函数中的this指向Counter实例
        this.element.addEventListener('click', this.increment.bind(this));
    }
    
    increment() {
        this.count++;
        console.log(`Count: ${this.count}`);
    }
}

// 函数柯里化
function multiply(a, b, c) {
    return a * b * c;
}

const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(3, 4)); // 24 (2 * 3 * 4)

const multiplyByTwoAndThree = multiply.bind(null, 2, 3);
console.log(multiplyByTwoAndThree(4)); // 24 (2 * 3 * 4)

// 概念：
// - 创建新函数，不立即调用
// - 永久绑定this值和预设参数
// - 返回的新函数可以多次调用
// - 常用于事件处理和函数柯里化
```

**4. `toString()` - 返回函数源码字符串**
```javascript
function add(a, b) {
    return a + b;
}

console.log(add.toString());
// "function add(a, b) {
//     return a + b;
// }"

// 箭头函数
const multiply = (a, b) => a * b;
console.log(multiply.toString()); // "(a, b) => a * b"

// 内置函数
console.log(Math.max.toString()); // "function max() { [native code] }"

// 实际应用：函数序列化（有限场景）
function serializeFunction(fn) {
    return {
        type: 'function',
        source: fn.toString(),
        name: fn.name
    };
}

// 概念：
// - 返回函数的字符串表示
// - 包含函数的完整源代码
// - 内置函数显示"[native code]"
// - 主要用于调试和序列化
```

**属性：**

**1. `length` - 函数参数个数**
```javascript
function func1() {}
function func2(a) {}
function func3(a, b) {}
function func4(a, b, c = 10) {} // 默认参数不计入
function func5(a, b, ...rest) {} // 剩余参数不计入

console.log(func1.length); // 0
console.log(func2.length); // 1
console.log(func3.length); // 2
console.log(func4.length); // 2 - 默认参数不计入
console.log(func5.length); // 2 - 剩余参数不计入

// 实际应用：参数验证
function validateArgs(fn, args) {
    if (args.length < fn.length) {
        throw new Error(`Expected at least ${fn.length} arguments`);
    }
}

// 概念：
// - 返回函数定义时的形参个数
// - 不包括默认参数和剩余参数
// - 只计算必需参数的数量
```

**2. `name` - 函数名称**
```javascript
function namedFunction() {}
const anonymousFunction = function() {};
const namedExpression = function myFunc() {};
const arrowFunction = () => {};

console.log(namedFunction.name);     // "namedFunction"
console.log(anonymousFunction.name); // "anonymousFunction" - 变量名
console.log(namedExpression.name);   // "myFunc" - 函数表达式名
console.log(arrowFunction.name);     // "arrowFunction" - 变量名

// 对象方法
const obj = {
    method() {},
    arrow: () => {},
    anonymous: function() {}
};

console.log(obj.method.name);     // "method"
console.log(obj.arrow.name);      // "arrow"
console.log(obj.anonymous.name);  // "anonymous"

// 实际应用：调试和日志
function logFunctionCall(fn, ...args) {
    console.log(`Calling function: ${fn.name}`);
    return fn(...args);
}

// 概念：
// - 返回函数的名称
// - 匿名函数使用变量名或推断名称
// - 主要用于调试和反射
```

**3. `prototype` - 函数原型对象**
```javascript
function Person(name) {
    this.name = name;
}

// 添加原型方法
Person.prototype.sayHello = function() {
    return `Hello, I'm ${this.name}`;
};

const person = new Person('张三');
console.log(person.sayHello()); // "Hello, I'm 张三"

// 检查原型
console.log(Person.prototype.constructor === Person); // true
console.log(person.__proto__ === Person.prototype);   // true

// 箭头函数没有prototype
const arrowFunc = () => {};
console.log(arrowFunc.prototype); // undefined

// 实际应用：继承
function Student(name, grade) {
    Person.call(this, name);
    this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
    return `${this.name} is studying`;
};

// 概念：
// - 只有函数声明和函数表达式有prototype
// - 箭头函数没有prototype
// - 用于实现原型继承
// - 构造函数的实例会继承prototype上的方法
```

### 5. 错误对象

#### Error 对象
**创建方式：**
```javascript
const error1 = new Error('Something went wrong');
const error2 = Error('message');  // 可以省略new
```

**属性：**

**1. `name` - 错误名称**
```javascript
const error = new Error('测试错误');
console.log(error.name); // "Error"

// 自定义错误名称
error.name = 'CustomError';
console.log(error.name); // "CustomError"

// 不同错误类型的名称
console.log(new TypeError().name);     // "TypeError"
console.log(new ReferenceError().name); // "ReferenceError"
```

**2. `message` - 错误消息**
```javascript
const error = new Error('文件未找到');
console.log(error.message); // "文件未找到"

// 空消息
const emptyError = new Error();
console.log(emptyError.message); // ""

// 实际应用：自定义错误消息
function divide(a, b) {
    if (b === 0) {
        throw new Error(`除数不能为零：${a} / ${b}`);
    }
    return a / b;
}
```

**3. `stack` - 错误堆栈（非标准但广泛支持）**
```javascript
function level3() {
    throw new Error('深层错误');
}

function level2() {
    level3();
}

function level1() {
    level2();
}

try {
    level1();
} catch (error) {
    console.log(error.stack);
    // Error: 深层错误
    //     at level3 (...)
    //     at level2 (...)
    //     at level1 (...)
}

// 概念：
// - 显示错误发生的调用栈
// - 包含函数调用链和行号
// - 主要用于调试
```

**子类型：**

**1. `SyntaxError` - 语法错误**
```javascript
try {
    eval('function {'); // 语法错误
} catch (error) {
    console.log(error instanceof SyntaxError); // true
    console.log(error.name); // "SyntaxError"
}

// 手动抛出语法错误
function parseConfig(configString) {
    try {
        return JSON.parse(configString);
    } catch (error) {
        throw new SyntaxError(`配置格式错误: ${error.message}`);
    }
}
```

**2. `ReferenceError` - 引用错误**
```javascript
try {
    console.log(undefinedVariable); // 引用未定义的变量
} catch (error) {
    console.log(error instanceof ReferenceError); // true
}

// 手动抛出引用错误
function getValue(obj, key) {
    if (!(key in obj)) {
        throw new ReferenceError(`属性 '${key}' 不存在`);
    }
    return obj[key];
}
```

**3. `TypeError` - 类型错误**
```javascript
try {
    null.someMethod(); // 在null上调用方法
} catch (error) {
    console.log(error instanceof TypeError); // true
}

// 手动抛出类型错误
function processArray(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('参数必须是数组');
    }
    return arr.map(x => x * 2);
}
```

**4. `RangeError` - 范围错误**
```javascript
try {
    new Array(-1); // 负数长度
} catch (error) {
    console.log(error instanceof RangeError); // true
}

// 手动抛出范围错误
function setAge(age) {
    if (age < 0 || age > 150) {
        throw new RangeError('年龄必须在0-150之间');
    }
    this.age = age;
}
```

**5. `URIError` - URI 错误**
```javascript
try {
    decodeURIComponent('%'); // 无效的URI编码
} catch (error) {
    console.log(error instanceof URIError); // true
}
```

**实际应用：错误处理模式**
```javascript
// 自定义错误类
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

// 错误处理函数
function handleError(error) {
    switch (error.constructor) {
        case ValidationError:
            console.log(`验证错误 - 字段: ${error.field}, 消息: ${error.message}`);
            break;
        case NetworkError:
            console.log(`网络错误 - 状态码: ${error.statusCode}, 消息: ${error.message}`);
            break;
        default:
            console.log(`未知错误: ${error.message}`);
    }
}
```

### 6. 日期对象

#### Date 对象
**创建方式：**
```javascript
const date1 = new Date();                    // 当前时间
const date2 = new Date(2023, 11, 25);       // 年月日（月份从0开始！）
const date3 = new Date('2023-12-25');       // 字符串
const date4 = new Date(1703462400000);      // 时间戳（毫秒）
```

**重要概念：**
```javascript
// 月份从0开始！
const date = new Date(2023, 0, 1);  // 2023年1月1日
console.log(date.getMonth()); // 0 - 代表1月

// 星期从0开始（0=周日）
console.log(date.getDay()); // 0=周日, 1=周一, ..., 6=周六

// 时间戳是毫秒，不是秒
const timestamp = Date.now(); // 毫秒时间戳
const seconds = Math.floor(timestamp / 1000); // 转为秒
```

**获取方法示例：**
```javascript
const now = new Date();

console.log(`年份: ${now.getFullYear()}`);        // 2023
console.log(`月份: ${now.getMonth() + 1}`);       // 12（注意+1）
console.log(`日期: ${now.getDate()}`);            // 25
console.log(`星期: ${now.getDay()}`);             // 0-6
console.log(`小时: ${now.getHours()}`);           // 0-23
console.log(`分钟: ${now.getMinutes()}`);         // 0-59
console.log(`秒数: ${now.getSeconds()}`);         // 0-59
console.log(`毫秒: ${now.getMilliseconds()}`);    // 0-999
console.log(`时间戳: ${now.getTime()}`);          // 毫秒时间戳
console.log(`时区偏移: ${now.getTimezoneOffset()}`); // 分钟

// 实际应用：格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

console.log(formatDate(new Date())); // "2023-12-25"
```

**设置方法示例：**
```javascript
const date = new Date();

// 设置具体日期
date.setFullYear(2024);
date.setMonth(0);      // 1月（0-11）
date.setDate(15);      // 15日

// 链式设置
const specificDate = new Date();
specificDate.setFullYear(2024, 5, 20); // 2024年6月20日
specificDate.setHours(14, 30, 0, 0);   // 14:30:00.000

// 实际应用：日期计算
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const today = new Date();
const nextWeek = addDays(today, 7);
```

**转换方法示例：**
```javascript
const date = new Date(2023, 11, 25, 14, 30, 0);

console.log(date.toString());         // "Mon Dec 25 2023 14:30:00 GMT+0800"
console.log(date.toDateString());     // "Mon Dec 25 2023"
console.log(date.toTimeString());     // "14:30:00 GMT+0800"
console.log(date.toISOString());      // "2023-12-25T06:30:00.000Z"
console.log(date.toJSON());           // "2023-12-25T06:30:00.000Z"

// 本地化格式
console.log(date.toLocaleDateString()); // "2023/12/25"（根据系统设置）
console.log(date.toLocaleTimeString()); // "14:30:00"
console.log(date.toLocaleString());     // "2023/12/25 14:30:00"

// 自定义本地化
console.log(date.toLocaleDateString('zh-CN')); // "2023/12/25"
console.log(date.toLocaleDateString('en-US')); // "12/25/2023"
```

**静态方法示例：**
```javascript
// Date.now() - 获取当前时间戳
const timestamp = Date.now();
console.log(timestamp); // 1703491800000

// Date.parse() - 解析日期字符串
const parsed = Date.parse('2023-12-25T14:30:00');
console.log(parsed); // 时间戳

// Date.UTC() - 创建UTC时间
const utcDate = new Date(Date.UTC(2023, 11, 25, 14, 30, 0));
console.log(utcDate.toISOString()); // "2023-12-25T14:30:00.000Z"

// 实际应用：时间工具函数
function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    return Math.round((date2 - date1) / oneDay);
}
```

### 7. 正则表达式对象

#### RegExp 对象
**创建方式：**
```javascript
const regex1 = /pattern/flags;              // 字面量（推荐）
const regex2 = new RegExp('pattern', 'flags'); // 构造函数
const regex3 = new RegExp(/pattern/, 'flags'); // 从现有正则创建
```

**常用标志（flags）：**
```javascript
const text = "Hello World\nSecond Line";

console.log(/hello/i.test(text));     // true - i: 忽略大小写
console.log(/world/g.exec(text));     // g: 全局匹配
console.log(/^second/m.test(text));   // true - m: 多行匹配
console.log(/hello.+world/s.test(text)); // s: 点号匹配换行符
console.log(/\w+/u.test('你好'));      // u: Unicode支持
console.log(/world/y.test(text));     // y: 粘性匹配

// 组合标志
const regex = /hello/gim; // 全局、忽略大小写、多行
```

**实例方法：**

**1. `test(string)` - 测试是否匹配**
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailRegex.test('user@example.com')); // true
console.log(emailRegex.test('invalid-email'));    // false

// 全局正则的陷阱
const globalRegex = /\d+/g;
console.log(globalRegex.test('123')); // true
console.log(globalRegex.test('123')); // false - lastIndex影响

// 实际应用：表单验证
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^1[3-9]\d{9}$/; // 中国手机号
    return regex.test(phone);
}
```

**2. `exec(string)` - 执行匹配并返回结果**
```javascript
const text = "The price is $123.45 and tax is $12.34";
const priceRegex = /\$(\d+)\.(\d+)/g;

// 第一次匹配
let match = priceRegex.exec(text);
console.log(match);
// ["$123.45", "123", "45", index: 13, input: "...", groups: undefined]

// 继续匹配
match = priceRegex.exec(text);
console.log(match);
// ["$12.34", "12", "34", index: 33, input: "...", groups: undefined]

// 没有更多匹配
match = priceRegex.exec(text);
console.log(match); // null

// 实际应用：提取所有匹配
function extractPrices(text) {
    const regex = /\$(\d+)\.(\d+)/g;
    const prices = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
        prices.push({
            full: match[0],
            dollars: match[1],
            cents: match[2],
            index: match.index
        });
    }
    
    return prices;
}
```

**3. `toString()` - 转为字符串**
```javascript
const regex = /hello/gi;
console.log(regex.toString()); // "/hello/gi"

// 动态创建正则
function createRegex(pattern, flags) {
    const regex = new RegExp(pattern, flags);
    console.log(`Created: ${regex.toString()}`);
    return regex;
}
```

**属性示例：**
```javascript
const regex = /hello/gim;

console.log(regex.source);     // "hello" - 正则表达式源码
console.log(regex.flags);      // "gim" - 标志字符串
console.log(regex.global);     // true - 是否全局匹配
console.log(regex.ignoreCase); // true - 是否忽略大小写
console.log(regex.multiline);  // true - 是否多行匹配
console.log(regex.sticky);     // false - 是否粘性匹配
console.log(regex.unicode);    // false - 是否Unicode匹配
console.log(regex.lastIndex);  // 0 - 上次匹配的索引

// lastIndex在全局匹配中的作用
const globalRegex = /\d+/g;
const text = "123 456 789";

console.log(globalRegex.exec(text)); // ["123"] - lastIndex变为3
console.log(globalRegex.lastIndex);  // 3
console.log(globalRegex.exec(text)); // ["456"] - 从索引3开始
console.log(globalRegex.lastIndex);  // 7
```

### 8. 数学对象

#### Math 对象
**常量：**
```javascript
console.log(Math.PI);       // 3.141592653589793 - 圆周率
console.log(Math.E);        // 2.718281828459045 - 自然对数底数
console.log(Math.LN2);      // 0.6931471805599453 - ln(2)
console.log(Math.LN10);     // 2.302585092994046 - ln(10)
console.log(Math.LOG2E);    // 1.4426950408889634 - log₂(e)
console.log(Math.LOG10E);   // 0.4342944819032518 - log₁₀(e)
console.log(Math.SQRT1_2);  // 0.7071067811865476 - √(1/2)
console.log(Math.SQRT2);    // 1.4142135623730951 - √2

// 实际应用：几何计算
function circleArea(radius) {
    return Math.PI * radius * radius;
}

function circleCircumference(radius) {
    return 2 * Math.PI * radius;
}
```

**核心方法：**

**1. 取整方法**
```javascript
const num = 4.7;

console.log(Math.ceil(num));   // 5 - 向上取整（天花板）
console.log(Math.floor(num));  // 4 - 向下取整（地板）
console.log(Math.round(num));  // 5 - 四舍五入
console.log(Math.trunc(num));  // 4 - 截取整数部分

// 负数的情况
const neg = -4.7;
console.log(Math.ceil(neg));   // -4 - 向上（接近0）
console.log(Math.floor(neg));  // -5 - 向下（远离0）
console.log(Math.round(neg));  // -5 - 四舍五入
console.log(Math.trunc(neg));  // -4 - 截取整数

// 实际应用：分页计算
function calculatePages(totalItems, itemsPerPage) {
    return Math.ceil(totalItems / itemsPerPage);
}

console.log(calculatePages(23, 5)); // 5页
```

**2. 最值和绝对值**
```javascript
console.log(Math.abs(-5));        // 5 - 绝对值
console.log(Math.abs(5));         // 5

console.log(Math.max(1, 3, 2));   // 3 - 最大值
console.log(Math.min(1, 3, 2));   // 1 - 最小值

// 数组中的最值
const numbers = [1, 5, 3, 9, 2];
console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers)); // 1

// 实际应用：数值范围限制
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

console.log(clamp(15, 10, 20)); // 15 - 在范围内
console.log(clamp(5, 10, 20));  // 10 - 小于最小值
console.log(clamp(25, 10, 20)); // 20 - 大于最大值
```

**3. 幂运算和根运算**
```javascript
console.log(Math.pow(2, 3));    // 8 - 2的3次方
console.log(2 ** 3);            // 8 - ES2016幂运算符

console.log(Math.sqrt(16));     // 4 - 平方根
console.log(Math.cbrt(27));     // 3 - 立方根

// 实际应用：距离计算
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

console.log(distance(0, 0, 3, 4)); // 5 - 勾股定理
```

**4. 随机数生成**
```javascript
console.log(Math.random()); // 0.123456789... (0到1之间)

// 生成指定范围的随机数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 6)); // 1-6之间的随机整数（骰子）

// 随机选择数组元素
function randomChoice(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

const colors = ['red', 'green', 'blue', 'yellow'];
console.log(randomChoice(colors)); // 随机颜色

// 生成随机字符串
function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
```

**5. 三角函数**
```javascript
// 角度转弧度
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// 弧度转角度
function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

// 三角函数使用弧度
console.log(Math.sin(Math.PI / 2));  // 1 - sin(90°)
console.log(Math.cos(Math.PI));      // -1 - cos(180°)
console.log(Math.tan(Math.PI / 4));  // 1 - tan(45°)

// 反三角函数
console.log(toDegrees(Math.asin(1)));  // 90 - arcsin(1)
console.log(toDegrees(Math.acos(-1))); // 180 - arccos(-1)
console.log(toDegrees(Math.atan(1)));  // 45 - arctan(1)

// 两参数反正切（处理象限）
console.log(toDegrees(Math.atan2(1, 1)));   // 45°
console.log(toDegrees(Math.atan2(1, -1)));  // 135°
console.log(toDegrees(Math.atan2(-1, -1))); // -135°
```

**6. 对数和指数**
```javascript
console.log(Math.exp(1));     // 2.718... - e^1
console.log(Math.exp(2));     // 7.389... - e^2

console.log(Math.log(Math.E)); // 1 - ln(e)
console.log(Math.log(10));     // 2.302... - ln(10)

console.log(Math.log10(100));  // 2 - log₁₀(100)
console.log(Math.log10(1000)); // 3 - log₁₀(1000)

console.log(Math.log2(8));     // 3 - log₂(8)
console.log(Math.log2(1024));  // 10 - log₂(1024)

// 实际应用：科学计算
function compound(principal, rate, time) {
    // 复利计算：A = P * e^(rt)
    return principal * Math.exp(rate * time);
}

// 对数刻度
function logScale(value, min, max) {
    return Math.log(value / min) / Math.log(max / min);
}
```

### 9. JSON 对象

#### JSON 对象
**静态方法：**

**1. `JSON.parse(text, reviver)` - 解析 JSON 字符串**
```javascript
// 基本用法
const jsonString = '{"name": "张三", "age": 25, "active": true}';
const obj = JSON.parse(jsonString);
console.log(obj); // { name: "张三", age: 25, active: true }

// 数组解析
const arrayJson = '[1, 2, 3, "hello", true]';
const array = JSON.parse(arrayJson);
console.log(array); // [1, 2, 3, "hello", true]

// 使用reviver函数
const dateJson = '{"created": "2023-12-25T10:30:00.000Z", "name": "test"}';
const parsed = JSON.parse(dateJson, (key, value) => {
    if (key === 'created') {
        return new Date(value); // 将日期字符串转为Date对象
    }
    return value;
});

console.log(parsed.created instanceof Date); // true

// 错误处理
try {
    JSON.parse('invalid json');
} catch (error) {
    console.log(error instanceof SyntaxError); // true
}

// 实际应用：配置文件读取
function loadConfig(configString) {
    try {
        return JSON.parse(configString);
    } catch (error) {
        throw new Error(`配置文件格式错误: ${error.message}`);
    }
}
```

**2. `JSON.stringify(value, replacer, space)` - 序列化为 JSON 字符串**
```javascript
const obj = {
    name: '张三',
    age: 25,
    hobbies: ['reading', 'coding'],
    address: {
        city: '北京',
        country: '中国'
    }
};

// 基本用法
console.log(JSON.stringify(obj));
// '{"name":"张三","age":25,"hobbies":["reading","coding"],"address":{"city":"北京","country":"中国"}}'

// 格式化输出
console.log(JSON.stringify(obj, null, 2));
// {
//   "name": "张三",
//   "age": 25,
//   "hobbies": [
//     "reading",
//     "coding"
//   ],
//   "address": {
//     "city": "北京",
//     "country": "中国"
//   }
// }

// 使用replacer过滤属性
const filtered = JSON.stringify(obj, ['name', 'age']);
console.log(filtered); // '{"name":"张三","age":25}'

// 使用replacer函数
const transformed = JSON.stringify(obj, (key, value) => {
    if (key === 'age') {
        return undefined; // 排除age属性
    }
    if (typeof value === 'string') {
        return value.toUpperCase(); // 字符串转大写
    }
    return value;
});

// 处理特殊值
const special = {
    func: function() { return 'hello'; },
    undef: undefined,
    sym: Symbol('test'),
    date: new Date()
};

console.log(JSON.stringify(special));
// '{"date":"2023-12-25T06:30:00.000Z"}' - 函数、undefined、Symbol被忽略

// 实际应用：深拷贝（简单对象）
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 注意：无法处理函数、Date、正则等复杂类型
```

### 10. Object 对象

#### Object 对象
**核心静态方法：**

**1. `Object.keys(obj)` - 获取可枚举属性名**
```javascript
const person = { name: '张三', age: 25, city: '北京' };
console.log(Object.keys(person)); // ['name', 'age', 'city']

// 数组的键是索引
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // ['0', '1', '2']

// 实际应用：对象遍历
function printObject(obj) {
    Object.keys(obj).forEach(key => {
        console.log(`${key}: ${obj[key]}`);
    });
}
```

**2. `Object.values(obj)` - 获取可枚举属性值**
```javascript
const person = { name: '张三', age: 25, city: '北京' };
console.log(Object.values(person)); // ['张三', 25, '北京']

// 实际应用：统计
const scores = { math: 95, english: 87, science: 92 };
const average = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.values(scores).length;
console.log(average); // 91.33
```

**3. `Object.entries(obj)` - 获取可枚举属性键值对**
```javascript
const person = { name: '张三', age: 25, city: '北京' };
console.log(Object.entries(person)); 
// [['name', '张三'], ['age', 25], ['city', '北京']]

// 转换为Map
const map = new Map(Object.entries(person));

// 对象转换
const doubled = Object.fromEntries(
    Object.entries({ a: 1, b: 2, c: 3 }).map(([key, value]) => [key, value * 2])
);
console.log(doubled); // { a: 2, b: 4, c: 6 }
```

**4. `Object.assign(target, ...sources)` - 复制属性**
```javascript
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

const result = Object.assign(target, source1, source2);
console.log(result); // { a: 1, b: 3, c: 5, d: 6 }
console.log(target === result); // true - 修改了target

// 浅拷贝
const original = { name: '张三', address: { city: '北京' } };
const copy = Object.assign({}, original);

copy.name = '李四';
copy.address.city = '上海';
console.log(original.address.city); // '上海' - 嵌套对象仍是引用

// 合并配置
const defaultConfig = { timeout: 5000, retries: 3 };
const userConfig = { timeout: 8000 };
const finalConfig = Object.assign({}, defaultConfig, userConfig);
```

**5. `Object.freeze(obj)` - 冻结对象**
```javascript
const obj = { name: '张三', age: 25 };
Object.freeze(obj);

// 无法修改
obj.name = '李四';     // 静默失败（严格模式下抛错）
obj.city = '北京';     // 无法添加属性
delete obj.age;       // 无法删除属性

console.log(obj); // { name: '张三', age: 25 } - 未改变

// 检查是否冻结
console.log(Object.isFrozen(obj)); // true

// 实际应用：常量对象
const API_ENDPOINTS = Object.freeze({
    USERS: '/api/users',
    PRODUCTS: '/api/products',
    ORDERS: '/api/orders'
});
```

**6. `Object.is(value1, value2)` - 严格相等比较**
```javascript
// 与 === 的区别
console.log(Object.is(NaN, NaN));       // true
console.log(NaN === NaN);               // false

console.log(Object.is(0, -0));          // false
console.log(0 === -0);                  // true

console.log(Object.is(+0, -0));         // false
console.log(+0 === -0);                 // true

// 其他情况与===相同
console.log(Object.is(1, 1));           // true
console.log(Object.is('hello', 'hello')); // true
console.log(Object.is({}, {}));         // false - 不同对象

// 实际应用：精确比较
function strictEqual(a, b) {
    return Object.is(a, b);
}
```

**其他重要方法：**
```javascript
// Object.create() - 创建对象
const proto = { greet() { return 'Hello'; } };
const obj = Object.create(proto);
console.log(obj.greet()); // 'Hello'

// Object.getPrototypeOf() - 获取原型
console.log(Object.getPrototypeOf(obj) === proto); // true

// Object.hasOwn() - 检查自有属性（ES2022）
const obj2 = { name: '张三' };
console.log(Object.hasOwn(obj2, 'name'));     // true
console.log(Object.hasOwn(obj2, 'toString')); // false - 继承属性

// 属性描述符
Object.defineProperty(obj2, 'age', {
    value: 25,
    writable: false,    // 不可写
    enumerable: true,   // 可枚举
    configurable: false // 不可配置
});

console.log(Object.getOwnPropertyDescriptor(obj2, 'age'));
// { value: 25, writable: false, enumerable: true, configurable: false }
```

### 11. Promise 对象 (ES6)

#### Promise 对象
**创建方式：**
```javascript
const promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve('操作成功');
        } else {
            reject(new Error('操作失败'));
        }
    }, 1000);
});
```

**实例方法：**

**1. `then(onFulfilled, onRejected)` - 添加成功/失败回调**
```javascript
promise
    .then(result => {
        console.log('成功:', result);
        return result.toUpperCase(); // 可以返回值给下一个then
    })
    .then(upperResult => {
        console.log('转大写:', upperResult);
    })
    .catch(error => {
        console.log('失败:', error.message);
    });

// 实际应用：API调用链
fetch('/api/user/123')
    .then(response => response.json())
    .then(user => {
        console.log('用户信息:', user);
        return fetch(`/api/posts?userId=${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
        console.log('用户文章:', posts);
    });
```

**2. `catch(onRejected)` - 添加失败回调**
```javascript
promise
    .then(result => {
        throw new Error('处理过程中出错');
    })
    .catch(error => {
        console.log('捕获错误:', error.message);
        return '默认值'; // 可以返回恢复值
    })
    .then(result => {
        console.log('最终结果:', result); // '默认值'
    });

// 错误传播
promise
    .then(result => result.toUpperCase())
    .then(result => result.split(''))
    .catch(error => {
        console.log('任何步骤的错误都会被捕获');
    });
```

**3. `finally(onFinally)` - 添加最终回调**
```javascript
promise
    .then(result => console.log('成功:', result))
    .catch(error => console.log('失败:', error))
    .finally(() => {
        console.log('无论成功失败都会执行');
        // 清理工作，关闭loading等
    });

// 实际应用：加载状态管理
function fetchData() {
    showLoading();
    
    return fetch('/api/data')
        .then(response => response.json())
        .finally(() => {
            hideLoading(); // 无论成功失败都隐藏loading
        });
}
```

**静态方法：**

**1. `Promise.resolve(value)` - 创建已解决的 Promise**
```javascript
const resolved = Promise.resolve('立即解决');
resolved.then(value => console.log(value)); // '立即解决'

// 包装非Promise值
const wrapped = Promise.resolve(42);
wrapped.then(value => console.log(value)); // 42

// 传入Promise会直接返回
const existingPromise = Promise.resolve('test');
const same = Promise.resolve(existingPromise);
console.log(same === existingPromise); // true
```

**2. `Promise.reject(reason)` - 创建已拒绝的 Promise**
```javascript
const rejected = Promise.reject(new Error('立即拒绝'));
rejected.catch(error => console.log(error.message)); // '立即拒绝'

// 实际应用：条件检查
function validateUser(user) {
    if (!user.name) {
        return Promise.reject(new Error('用户名不能为空'));
    }
    return Promise.resolve(user);
}
```

**3. `Promise.all(iterable)` - 等待所有 Promise 完成**
```javascript
const promises = [
    fetch('/api/users'),
    fetch('/api/products'),
    fetch('/api/orders')
];

Promise.all(promises)
    .then(responses => {
        console.log('所有请求完成');
        return Promise.all(responses.map(r => r.json()));
    })
    .then(data => {
        const [users, products, orders] = data;
        console.log('所有数据:', { users, products, orders });
    })
    .catch(error => {
        console.log('任一请求失败:', error);
    });

// 一个失败全部失败
Promise.all([
    Promise.resolve(1),
    Promise.reject(new Error('失败')),
    Promise.resolve(3)
]).catch(error => {
    console.log('全部失败:', error.message); // '失败'
});
```

**4. `Promise.allSettled(iterable)` - 等待所有 Promise 结束**
```javascript
const mixedPromises = [
    Promise.resolve('成功1'),
    Promise.reject(new Error('失败1')),
    Promise.resolve('成功2')
];

Promise.allSettled(mixedPromises)
    .then(results => {
        console.log(results);
        // [
        //   { status: 'fulfilled', value: '成功1' },
        //   { status: 'rejected', reason: Error('失败1') },
        //   { status: 'fulfilled', value: '成功2' }
        // ]
        
        const successful = results.filter(r => r.status === 'fulfilled');
        const failed = results.filter(r => r.status === 'rejected');
    });
```

**5. `Promise.race(iterable)` - 等待第一个完成的 Promise**
```javascript
const racePromises = [
    new Promise(resolve => setTimeout(() => resolve('慢'), 2000)),
    new Promise(resolve => setTimeout(() => resolve('快'), 1000))
];

Promise.race(racePromises)
    .then(result => {
        console.log(result); // '快' - 第一个完成的
    });

// 实际应用：超时控制
function withTimeout(promise, timeout) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('超时')), timeout);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

const slowApi = fetch('/slow-api');
withTimeout(slowApi, 5000)
    .then(response => console.log('及时响应'))
    .catch(error => console.log('超时或失败'));
```

**6. `Promise.any(iterable)` - 等待第一个成功的 Promise**
```javascript
const promises = [
    Promise.reject(new Error('失败1')),
    Promise.reject(new Error('失败2')),
    Promise.resolve('成功1'),
    Promise.resolve('成功2')
];

Promise.any(promises)
    .then(result => {
        console.log(result); // '成功1' - 第一个成功的
    })
    .catch(error => {
        console.log('全部失败:', error); // AggregateError
    });

// 实际应用：多个数据源
const dataSources = [
    fetch('/api/data/source1'),
    fetch('/api/data/source2'),
    fetch('/api/data/source3')
];

Promise.any(dataSources)
    .then(response => response.json())
    .then(data => console.log('获取到数据:', data));
```

### 12. 代理和反射对象 (ES6)

#### Proxy 对象
**创建方式：**
```javascript
const target = { name: '张三', age: 25 };
const handler = {
    get(target, property) {
        console.log(`读取属性: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`设置属性: ${property} = ${value}`);
        target[property] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);
```

**实际应用示例：**
```javascript
// 1. 属性访问日志
const user = new Proxy({}, {
    get(target, prop) {
        console.log(`访问了属性: ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        console.log(`设置属性: ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
});

// 2. 属性验证
const validatedUser = new Proxy({}, {
    set(target, prop, value) {
        if (prop === 'age' && (value < 0 || value > 150)) {
            throw new Error('年龄必须在0-150之间');
        }
        target[prop] = value;
        return true;
    }
});

// 3. 默认值处理
const withDefaults = new Proxy({}, {
    get(target, prop) {
        return prop in target ? target[prop] : '默认值';
    }
});

// 4. 数组负索引
const array = new Proxy([1, 2, 3, 4, 5], {
    get(target, prop) {
        if (typeof prop === 'string' && /^-\d+$/.test(prop)) {
            const index = target.length + parseInt(prop);
            return target[index];
        }
        return target[prop];
    }
});

console.log(array[-1]); // 5 - 最后一个元素
console.log(array[-2]); // 4 - 倒数第二个
```

#### Reflect 对象
**与 Proxy 配合使用：**
```javascript
const target = { name: '张三', age: 25 };

const proxy = new Proxy(target, {
    get(target, property, receiver) {
        console.log(`读取: ${property}`);
        return Reflect.get(target, property, receiver); // 使用Reflect执行默认行为
    },
    
    set(target, property, value, receiver) {
        console.log(`设置: ${property} = ${value}`);
        return Reflect.set(target, property, value, receiver);
    },
    
    has(target, property) {
        console.log(`检查属性: ${property}`);
        return Reflect.has(target, property);
    }
});

// 使用示例
console.log(proxy.name);     // 读取: name \n 张三
proxy.city = '北京';         // 设置: city = 北京
console.log('age' in proxy); // 检查属性: age \n true
```

### 13. 生成器和异步对象

#### Generator 对象
**创建方式和基本用法：**
```javascript
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
    return '完成';
}

const generator = numberGenerator();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: '完成', done: true }

// 实际应用：无限序列
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
```

#### AsyncFunction 对象
**创建方式和用法：**
```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('获取用户数据失败:', error);
        throw error;
    }
}

// 并行异步操作
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => fetchUserData(id));
    const users = await Promise.all(promises);
    return users;
}
```

### 14. 类型化数组对象

#### ArrayBuffer 和 TypedArray
**用于处理二进制数据：**
```javascript
// 创建16字节的缓冲区
const buffer = new ArrayBuffer(16);

// 创建不同类型的视图
const int8View = new Int8Array(buffer);     // 8位整数视图
const int16View = new Int16Array(buffer);   // 16位整数视图
const float32View = new Float32Array(buffer); // 32位浮点视图

// 写入数据
int8View[0] = 127;
int16View[1] = 1000;
float32View[2] = 3.14;

// 实际应用：图像数据处理
function processImageData(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    
    // 调整亮度
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] + 50);     // Red
        data[i + 1] = Math.min(255, data[i + 1] + 50); // Green
        data[i + 2] = Math.min(255, data[i + 2] + 50); // Blue
        // data[i + 3] 是 Alpha，不修改
    }
    
    return data;
}
```

### 15. 国际化对象

#### Intl 对象
**实际应用示例：**
```javascript
// 数字格式化
const price = 1234.56;
console.log(new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
}).format(price)); // ¥1,234.56

// 日期格式化
const date = new Date();
console.log(new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}).format(date)); // 2023年12月25日

// 相对时间
const rtf = new Intl.RelativeTimeFormat('zh-CN');
console.log(rtf.format(-1, 'day'));   // 1天前
console.log(rtf.format(2, 'hour'));   // 2小时后

// 列表格式化
const list = new Intl.ListFormat('zh-CN', { style: 'long', type: 'conjunction' });
console.log(list.format(['苹果', '香蕉', '橙子'])); // 苹果、香蕉和橙子
```

### 16. Web API 相关对象

#### 文本编解码
```javascript
// TextEncoder - 将字符串编码为字节
const encoder = new TextEncoder();
const encoded = encoder.encode('Hello 世界');
console.log(encoded); // Uint8Array [72, 101, 108, 108, 111, 32, 228, 184, 150, 231, 149, 140]

// TextDecoder - 将字节解码为字符串
const decoder = new TextDecoder('utf-8');
const decoded = decoder.decode(encoded);
console.log(decoded); // "Hello 世界"

// 实际应用：文件处理
async function readTextFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder();
    return decoder.decode(arrayBuffer);
}
```

#### URL 处理
```javascript
// URL 对象
const url = new URL('https://example.com:8080/path?name=张三&age=25#section1');

console.log(url.protocol);   // "https:"
console.log(url.hostname);   // "example.com"
console.log(url.port);       // "8080"
console.log(url.pathname);   // "/path"
console.log(url.search);     // "?name=张三&age=25"
console.log(url.hash);       // "#section1"

// URLSearchParams - 查询参数处理
const params = new URLSearchParams(url.search);
console.log(params.get('name')); // "张三"
console.log(params.get('age'));  // "25"

params.set('city', '北京');
params.delete('age');
console.log(params.toString()); // "name=张三&city=北京"

// 实际应用：URL构建
function buildApiUrl(baseUrl, endpoint, params) {
    const url = new URL(endpoint, baseUrl);
    const searchParams = new URLSearchParams(params);
    url.search = searchParams.toString();
    return url.toString();
}

const apiUrl = buildApiUrl('https://api.example.com', '/users', {
    page: 1,
    limit: 10,
    search: '张三'
});
console.log(apiUrl); // "https://api.example.com/users?page=1&limit=10&search=张三"
```

## 快速参考索引

### 🔍 **最常用方法速查**

**字符串处理：**
- `str.slice(start, end)` - 提取片段（支持负数）
- `str.includes(search)` - 检查包含
- `str.split(separator)` - 分割为数组
- `str.trim()` - 去除空白
- `str.replace(old, new)` - 替换文本

**数组操作：**
- `arr.map(fn)` - 映射转换
- `arr.filter(fn)` - 过滤元素
- `arr.reduce(fn, init)` - 累计处理
- `arr.find(fn)` - 查找元素
- `arr.includes(item)` - 检查包含

**对象操作：**
- `Object.keys(obj)` - 获取属性名
- `Object.values(obj)` - 获取属性值
- `Object.entries(obj)` - 获取键值对
- `Object.assign(target, source)` - 复制属性

**类型检查：**
- `Array.isArray(value)` - 检查数组
- `Number.isNaN(value)` - 检查NaN
- `Number.isInteger(value)` - 检查整数
- `typeof value` - 基本类型检查

**集合操作：**
- `new Set(array)` - 数组去重
- `new Map()` - 键值映射
- `set.has(value)` - 快速查找
- `map.get(key)` - 获取值

### 📚 **学习建议**

1. **基础优先**：熟练掌握 String、Array、Object 的常用方法
2. **实践导向**：通过实际项目需求学习相应方法
3. **现代特性**：重点学习 ES6+ 的新方法和对象
4. **性能意识**：了解不同方法的时间复杂度
5. **类型安全**：使用严格的类型检查方法
6. **函数式编程**：掌握 map、filter、reduce 等方法

### ⚠️ **常见陷阱**

1. **数组排序**：`sort()` 默认按字符串排序
2. **浮点精度**：使用 `Number.EPSILON` 进行比较
3. **类型转换**：`isNaN()` vs `Number.isNaN()`
4. **this绑定**：使用 `bind()` 或箭头函数
5. **对象键**：普通对象键会被转为字符串
6. **WeakMap/WeakSet**：只能存储对象，不可枚举

### 🚀 **性能优化提示**

1. **查找操作**：Set/Map 比数组更快（O(1) vs O(n)）
2. **数组去重**：`[...new Set(arr)]` 比 filter + indexOf 快
3. **字符串拼接**：模板字符串比 + 操作符更清晰
4. **类型检查**：`Array.isArray()` 比 instanceof 更可靠
5. **对象遍历**：`Object.entries()` 比 for...in 更安全

### 🎯 **实际应用模式**

**数据处理流水线：**
```javascript
const result = data
    .filter(item => item.active)           // 过滤
    .map(item => ({ ...item, processed: true })) // 转换
    .reduce((acc, item) => acc + item.value, 0);  // 聚合
```

**异步操作：**
```javascript
const promises = urls.map(url => fetch(url));
const results = await Promise.all(promises);
```

**缓存模式：**
```javascript
const cache = new Map();
function memoize(fn) {
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}
```

### 📖 **版本兼容性**

- **ES5**: 基础方法，所有浏览器支持
- **ES6 (2015)**: Set, Map, Symbol, Promise, 箭头函数
- **ES2016**: `includes()`, `**` 幂运算符
- **ES2017**: `padStart()`, `padEnd()`, async/await
- **ES2019**: `flat()`, `flatMap()`, `trimStart()`, `trimEnd()`
- **ES2020**: BigInt, `??` 空值合并
- **ES2021**: `replaceAll()`
- **ES2022**: `.at()` 方法
- **ES2023**: `findLast()`, `findLastIndex()`

---

**总计：** 
- **16个对象类别**
- **200+ 个方法和属性**
- **300+ 个代码示例**
- **100+ 个实际应用场景**

这份文档涵盖了 JavaScript 原生对象和方法的全面内容，从基础到高级，从概念到实践，是 JavaScript 开发的完整参考手册！
        

    2.this.history.length = this.cur 利用了 JS 数组的一个特性：通过直接修改 length 属性来截断数组。
        将数组的 length 属性设置为一个比当前长度小的值时，数组会自动删除超出新长度的所有元素