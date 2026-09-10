<template>
    <div class="card">
        <p>姓名:{{ name }}</p>
        <p>年龄:{{ age }}</p>
        <p>职务:{{ tel }}</p>
        <p>联系方式:{{ job}}</p>
    </div>
</template>
<!--
    选项式 props 接收 父组件 向 子组件传递的数据

    props 支持的 写法有 2种、数组和对象

            props 他的值 如果是 数组、数据中的每一个 数据代表 父向子传递的数据 对应的属性名
                缺点: 不能对传入的数据进行限定

            props 他的值如果 是对象、可以 对传入的 数据进行更全面检查（推荐）
-->
<script>

export default{
    //props 中接收的数据 也是 响应式数据、且是 只读的
    // props:['name','age','tel','job'],

    props:{
        name:String, //限定传入的 数据必须是 字符串类型

        age:{
            type:Number,//限定传入的 数据必须是 数字类型
            required:true,//限定该数据 必须传入
        },
        tel:[String,Number],//限定传入的 数据 必须是 字符串 或者数字 类型

        job:{
            type:String,
            required:false,//限定数据 可传可不传、默认为false
            default:"普通员工",//当父组件没有传递该数据、设置的默认值
            validator(value){
                let job_list =["普通员工","经理","部门主管","总经理","董事长","秘书","人力资源"];
                return job_list.includes(value);
            }
        }
    }
}

</script>