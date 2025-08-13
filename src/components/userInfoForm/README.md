
注意：
1.（） 和 {}

2.button 的 取值有 reset、button、submit
在表单里默认是 type="submit"，点击会提交表单并刷新页面

3.map循环渲染出的组件必须注明 key={item.id}

4.表单组件实现方案：
受控组件方案：
    定义：受控组件是指表单元素的值完全由 React 的 state 控制
        非受控组件是指表单元素的值由 DOM 自己管理，React 不直接控制，而是通过 ref 获取或操作 DOM
    作用：useState 保存每个字段的值，操作时校验 state 里的值。适合做复杂校验和联动
    注：1.受控组件不存在表单内部项重新渲染导致该项数据丢失的问题
        2.如果 <input value={X} /> X一开始是 undefined（如果input 的 value 设为 null，React 会把它当成空字符串 "" 处理。）
            ，input 就变成了“非受控”，后面你 setX 有了值，input 又变成了“受控”，就会报这个错
            A component is changing an uncontrolled input to be controlled.
            This is likely caused by the value changing from undefined to a defined value,
            which should not happen. Decide between using a controlled or uncontrolled input 
            element for the lifetime of the component

5.label 的 htmlFor 属性建议加上 id
    这样点击 label 可以聚焦到对应 input，提升可用性

6.checkbox 用 checked，不是 value 作为值，注意是checkbox，不是checkBox

7.给 input 设置 id和设置name有什么区别？
    id 的作用：
    唯一标识：id 是页面上唯一的标识符，整个 HTML 文档中不能有两个元素的 id 一样。
    配合 label 的 htmlFor：如果你有 <label htmlFor="myInput">，点击 label 会聚焦到 id="myInput" 的 input 上，提升可用性和无障碍体验。
    JS/DOM 操作：可以用 document.getElementById('myInput') 快速获取该元素。
    2. name 的作用
    表单数据提交：name 是表单提交时的“字段名”，只有加了 name，表单提交（如 <form> 的 submit 或 FormData）时才会有对应的键值对。
    同名分组：对于 radio/checkbox 组，name 相同可以让它们表现为一组（如单选框互斥）。
    不要求唯一：同一个表单里可以有多个 input 的 name 相同（比如一组单选框）。