import Son from './son.tsx';
// 表单步骤
const formSteps = [
{
    id: 'step1',
    title: '个人信息',
    fields: [
    { id: 'name', type: 'text', label: '姓名', required: true },
    { id: 'email', type: 'email', label: '电子邮箱', required: true, validation: /^\S+@\S+\.\S+$/ },
    ]
},
{
    id: 'step2',
    title: '工作信息',
    fields: [
    { id: 'company', type: 'text', label: '公司名称' },
    { id: 'position', type: 'text', label: '职位' },
    ]
},
{
    id: 'step3',
    title: '确认信息',
    fields: [
    { id: 'terms', type: 'checkbox', label: '我同意条款和条件', required: true },
    ]
}
];

function UserInfoForm() {

    return (
        <Son formSteps={formSteps}/>
    )
}


export default UserInfoForm;