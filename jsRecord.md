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

            ```