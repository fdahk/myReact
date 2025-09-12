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

9.9