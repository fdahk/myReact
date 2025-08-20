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