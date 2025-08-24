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