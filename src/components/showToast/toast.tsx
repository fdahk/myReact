import { useEffect } from "react"
import ReactDOM from "react-dom" //操作DOM元素
import style from './toast.module.scss'
// 一个toast所需的参数
export interface ToastItem {
    id: number
    type: "info" | "success" | "error" | "warning" //默认：
    content: string 
    duration?: number 
    // onClose?: () => void // 关闭时的回调：可以扩展
}

// 组件参数 
interface ToastProps {
    toasts: ToastItem[]
    onRemove: (id: number) => void //撤销函数
}

// 有参数没传就是undefined
function Toast( {toasts, onRemove} : ToastProps) {

    // 副作用函数：为每条 toast 设置自动关闭的定时器，并在依赖变化或组件卸载时清理定时器
    useEffect(() => {
        // Node.js 环境下，setTimeout 返回的是一个 Timeout 对象
        // 在浏览器环境下，setTimeout 返回的是一个数字（number），这个数字就是定时器的 ID
        const timers: number[] = [] 
        // 消息数组的更新会导致旧消息重新计时
        toasts.forEach((toast: ToastItem) => {
            if(toast.duration !== 0){
                const timer = setTimeout(() => onRemove(toast.id), toast?.duration || 2000)
                // return () => clearTimeout(timer) //在这里return是错的，useEffext清理函数只能有一个
                timers.push(timer)
            }
        })

        return () => {
            timers.forEach((timer) => {
                clearTimeout(timer)
            })
            // 也可以省略括号和花括号简写
            // timers.forEach(timer => clearTimeout(timer));
        }
    },[toasts, onRemove]) //官方建议：所有用到的变量和函数，都应该出现在依赖数组里

    // ReactDOM.createPortal(JSX， DOM节点) 是 React 提供的一个 API，用于将 React 元素渲染到当前组件树之外的 DOM 节点
    return ReactDOM.createPortal(
        <div className={style.container}>
            {
                //注： 声明item变量时要加括号，不能省略
                toasts.map( (item: ToastItem) => {
                    return (
                        <div className={style.box} key={item.id}>
                            <div className={item.type}> {item.content} </div>
                        </div>
                    )
                })
            }
        </div>, document.body) // 将Toast渲染到body下
}

export default Toast