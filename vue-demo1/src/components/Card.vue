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


<style scoped>
.card {
    background: linear-gradient(135deg, #F5DEB3 0%, #DEB887 30%, #D2B48C 60%, #C4A882 100%);
    border-radius: 10px;
    padding: 25px;
    width: 220px;
    min-height: 160px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 3px solid #8B7355;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

/* 星星装饰 */
.card::before {
    content: '⭐';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    opacity: 0.6;
    transition: all 0.3s ease;
}

.card:hover::before {
    opacity: 1;
    transform: rotate(360deg) scale(1.2);
}

/* 底部装饰线 */
.card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, #8B4513, #D2691E, #FFD700);
    transition: width 0.4s ease;
    border-radius: 2px;
}

.card:hover::after {
    width: 90%;
}

/* 悬浮效果 */
.card:hover {
    transform: translateY(-10px) rotate(-1deg);
    box-shadow:
        0 15px 40px rgba(139, 69, 19, 0.4),
        0 0 20px rgba(210, 105, 30, 0.2);
    border-color: #D2691E;
}

/* 文字样式 */
.card p {
    margin: 10px 0;
    color: #3E2723;
    font-size: 14px;
    line-height: 1.6;
    position: relative;
    z-index: 1;
    padding-left: 15px;
    font-family: 'Georgia', serif;
    transition: all 0.3s ease;
}

.card:hover p {
    color: #1a0f00;
}

/* 姓名特殊样式 */
.card p:first-child {
    color: #8B0000;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 1px 1px 2px rgba(139, 0, 0, 0.3);
    margin-bottom: 15px;
    padding-bottom: 12px;
    border-bottom: 2px solid #8B7355;
    padding-left: 0;
    text-align: center;
    background: linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.1), transparent);
    padding-top: 8px;
}

/* 年龄样式 */
.card p:nth-child(2) {
    color: #B8860B;
    font-weight: bold;
}

/* 职务样式 */
.card p:nth-child(3) {
    color: #654321;
    font-style: italic;
}
</style>