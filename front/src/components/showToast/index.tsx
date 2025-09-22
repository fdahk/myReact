import style from './index.module.scss'
import ToastProvider from './toastProvider'
import { showToast } from './toastManager'
import { type ToastItem } from './toast'
function Index() {
    const btnList = [
        {
            type: "success",
            content: "成功",
            style: {
                backgroundColor: "green",
                color: "black"
            },
            click: {content: "成功", type: "success"}
        },
        {
            type: "error",
            content: "失败",
            style: {
                backgroundColor: "red",
                color: "black"
            },
            click: {content: "失败", type: "error"}
        },
        {
            type: "warning",
            content: "警告",
            style: {
                backgroundColor: "yellow",
                color: "black"
            },
            click: {content: "警告", type: "warning"}
        },
        {
            type: "info",
            content: "信息",
            style: {
                backgroundColor: "blue",
                color: "black"
            },
            click: {content: "信息", type: "info"}
        }
    ]
    
    const handleClick = ({content, type}: {content: string, type: string}) => {
        showToast(content, type as ToastItem["type"])
    }
    return (
        <ToastProvider>
        <div className={style.container}>
            <div className={style.box}>
                {
                    btnList.map(item => {
                        return (
                            <button key={item.type} className={style.btn} style={item.style} onClick={() => handleClick(item.click)}> 
                                {item.content}
                            </button>
                        )
                    })
                }
            </div>
        </div>
        </ToastProvider>
    )
}

export default Index;