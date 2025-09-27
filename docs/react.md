9.24:
    1.// React 对象：包含创建组件所需的核心方法
        // JSX 转换：JSX 语法需要 React 对象支持
        // 组件基类：提供组件生命周期等功能
        18以后自动引入

    2.在标签内使用react的事件监听和使用JS原生的事件监听有什么区别
        1. 事件对象类型
            React事件: 使用SyntheticEvent(合成事件)对象
                e.nativeEvent; // 访问原生事件对象
                e; // SyntheticEvent对象
            原生事件: 使用浏览器原生的Event对象
        2. 事件委托机制
            React事件: 使用事件委托，所有事件都绑定在根容器上(React 17之前是document，React 17+是根容器)
            原生事件: 直接绑定在目标元素上
        3. 跨浏览器兼容性
            React事件: 自动处理浏览器兼容性问题，提供统一的API
            原生事件: 需要手动处理不同浏览器的差异
        4. 事件执行顺序
            React事件: 在事件冒泡阶段执行
            原生事件: 可以选择在捕获或冒泡阶段执行
        5. 阻止默认行为和事件传播
            React事件: 使用e.preventDefault()和e.stopPropagation()
            原生事件: 同样使用这些方法，但作用范围不同
        6. 性能差异
            React事件: 事件委托减少了事件监听器数量，但增加了事件分发的开销
            原生事件: 直接绑定，响应更快，但大量元素时内存占用较高
        7. 生命周期管理
            React事件: 组件卸载时自动清理
            原生事件: 需要手动清理，否则可能导致内存泄漏
        8. 事件名称
            React事件: 使用驼峰命名(onClick, onMouseOver)
            原生事件: 使用小写(click, mouseover)
    
    3.根据事件或条件触发特定样式有几种方法
        条件className：
              className={`
                    base-container 
                    ${isSelected ? 'selected' : 'unselected'} 
                    ${theme === 'dark' ? 'dark-theme' : 'light-theme'}
                `}
        CSS变量 + 动态值

9.25：
    1.React应用中的环境变量必须以 REACT_APP_ 开头才能在前端使用