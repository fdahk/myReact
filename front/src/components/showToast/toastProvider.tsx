import { useToastManager } from "./toastManager";
import Toast from "./toast";
function ToastProvider({children}: {children: React.ReactNode} )  {
    const { toasts, removeToast} = useToastManager() //返回当前所有要显示的 toast（toasts）和移除 toast 的方法（removeToast）

    return(
        <> 
            {children} 
            <Toast toasts={toasts} onRemove={removeToast}></Toast>
        </>
    )

}

export default ToastProvider