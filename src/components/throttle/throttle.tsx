import style from './index.module.scss'
import { useState, useRef } from 'react';
function Throttle() {
    const [count, setCount] = useState(0);
    const isBaned = useRef(false);
    const timer = useRef<number | null>(null);
    const throttle = (fn: () => void) => {
        if(isBaned.current) {
            console.log('节流中');
            return;
        }
        isBaned.current = true;
        timer.current = setTimeout(() => {
            isBaned.current = false;
            clearTimeout(timer.current as number); //取消定时器的执行，但 timer.current 仍然保存着定时器ID
            timer.current = null; // 清除定时器引用
        }, 1000);
        fn();
    }
    
    const handleClick = () => {
        // setCount(count + 1);
        setCount(pre => pre + 1); // 还可以用函数式更新，更安全
        console.log('count增加', count);
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <button onClick={() => throttle(handleClick)}>点击</button>
            </div>
        </div>
    )
}

export default Throttle;