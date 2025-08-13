import {  useState } from "react";
import style from "./son.module.scss"
// 表单步骤
interface FormSteps {
    id : string;
    title : string;
    fields : {
        id : string;
        type : string;
        label : string;
        required ?: boolean;
        validation? : RegExp;
    }[]
}

function Son({ formSteps } : { formSteps : FormSteps[] }) {
    // 当前步骤
    const [currentStep, setCurrentStep] = useState(0);
    // <>指定返回值的类型，进而指定state的类型
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    // 点击下一步
    const handleNext = () => {
        //检查必填项
        // 错误写法：forEach 总是返回 undefined，即使在回调里 return true
        // 原因：forEach 的作用是遍历数组的每一项，执行回调函数，应该用 some 或 find看某项是否符合
        // const hasEmpty =  formSteps[currentStep].fields.forEach(item => {
        //     if(item?.required && !formData[item.id]){
        //         console.log("存在未填的必填项")
        //         return true
        //     }
        // })
        const hasEmpty = formSteps[currentStep].fields.some(item => {
            return item?.required && !formData[item.id];
        });

        const hasInvalid =  formSteps[currentStep].fields.some(item => {
            // 必填项未填
            if (item.required && !formData[item.id]) {
                alert(`请填写：${item.label}`);
                return true;
            }
            // 有正则校验
            if (item.validation && formData[item.id]) {
                if (!item.validation.test(formData[item.id])) {
                    alert(`"${item.label}" 格式不正确`);
                    return true;
                }
            }
            return false
        })   

        //提示
        if(hasEmpty){
            alert("未填")
            return
        }
        if(hasInvalid){
            return
        }
        setCurrentStep( Math.min(currentStep + 1, formSteps.length-1));
    }
    const handlePrev = () => {
        setCurrentStep(Math.max(currentStep - 1,0));
    }
    // 处理提交
    const handleSubmit = () => {
        //调用接口
    }
    console.log(currentStep)
    return (
        <form action="submit" onSubmit={handleSubmit} className={style.form_container}>
            {/* 标题 */}
            <div className={style.form_title}> {formSteps[currentStep].title} </div>
            {/* 输入 */}
            <div className={style.form_body}>
                {
                    formSteps[currentStep].fields.map((item) => (
                        (
                        <div className={style.item_box} key={item.id}>
                        {item.type === "checkbox" 
                            ? (
                                <>
                                <input type={item.type} required={item.required} name={item.id} //key
                                checked={formData[item.id] || false}
                                onChange={e => setFormData(
                                    {
                                        ...formData,
                                        [item.id]: e.target.checked //key
                                    }
                                )}/>
                                <label htmlFor=""> {item.label} </label>
                                </>
                            )
                            : (
                                <>
                                <label htmlFor=""> {item.label} </label>
                                <input type={item.type} required={item.required} name={item.id} 
                                value={formData[item.id] || ''}
                                onChange={e => setFormData(
                                    {
                                        ...formData,
                                        [item.id]: e.target.value
                                    }
                                )}/>
                                </>
                            )
                        }
                        </div>
                        )
                    ))
                }
            </div>
            {/* 底部按钮 */}
            <div className={style.form_button}>
                <button type="button"  onClick={handlePrev}>上一步</button>
                {
                    currentStep === formSteps.length-1
                    ? <button type='submit' >提交</button>
                    : <button type='button' onClick={handleNext}>下一步</button>
                }
                
            </div>
        </form>
    )
}

export default Son;