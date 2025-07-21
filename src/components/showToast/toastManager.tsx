import { useCallback, useRef, useState } from "react";
import {type ToastItem } from "./toast";

const MAX_TOAST = 5 //常量命名法
let toastId = 0
let globalAddToast: (toast: Omit<ToastItem, "id">) => void;

// 消息管理器Hook
export const useToastManager = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]) //消息数组 
    // 消息队列，超过渲染数后缓存，不会引起组件刷新，只做数据缓存。
    // Omit<ToastItem, "id"> :此时并没有真的渲染，即没有分配Id
    // useRef：用来在组件多次渲染之间“持久保存”一个可变的值，但不会引起组件的重新渲染。
    // 如果用 useState，每次队列变化都会导致组件刷新
    const queue =useRef<Omit<ToastItem, "id">[]>([]); 

    // useCallback(fn, deps) 会返回一个记忆化的函数，只有当依赖项 deps 变化时，才会生成新的函数引用。
    // 避免每次组件渲染时都创建新的函数实例导致函数变化，触发依赖该函数的组件重新渲染
    const removeToast = useCallback((id: number) => {
        // 函数式更新 setState(prev => newState)： 让setState接收一个函数，参数 prev 是要设置的最新 state 值，返回新的 state
        // 为什么用这个： 
        // 1.保证拿到的 state 一定是最新的
        // React 的 state 更新是异步的，多次 setState 可能会“合并批量执行”。
        // 2.多次更新时不会丢失数据
        // 如果你直接用 setToasts(newToasts)，有可能用到的 state 不是最新的，导致数据丢失或覆盖
        // setToasts，只有函数式更新能保证每次用到的都是最新的 state。这样可以安全地进行基于上一次 state 的计算
        // 3. 适合依赖“上一次 state”做逻辑的场景
        setToasts((pre) => {
            // const toast = pre.find(item => item.id === id) 
            // 找到了就调用该消息的onClose
            // if(toast) toast.onClose()
            // 从消息数组中过滤掉删除的消息
            const next = pre.filter(item => item.id !== id) 
            // 补充消息
            if(queue.current.length > 0 && next.length < MAX_TOAST){
                // 移除并返回数组的第一个元素, 断言不为空
                const nextToast = queue.current.shift()!
                next.push({...nextToast, id: ++toastId})
            }
            // 返回要set的新值
            return next
        })
    }, []) //记忆函数的空依赖

    // 添加消息 
    const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
        setToasts((pre) => {
            if(pre.length >= MAX_TOAST) {
                queue.current.push(toast)
                return pre 
            }
            return [...pre, {...toast, id: ++toastId}]
        })
    }, [])

    // 提升添加函数的作用域 
    globalAddToast = addToast
    
    return {toasts, removeToast}
}

// 应用级添加消息的API 
export const showToast = (
    content: string,
    type: ToastItem["type"], //索引类型：type这个属性的类型，等同于 ToastItem 里 type 属性的类型
    // 可选参数
    options?: {
        duration?: number,
        // onClose?:() => void
    }
) => {
    // 如果 options 是 undefined，展开时会被当作“什么都不加”，不会报错。
    // 如果内部属性是unfinished： 
    globalAddToast({...options, type, content})
}
