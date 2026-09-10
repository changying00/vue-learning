<template>
    <h1>我是系统首页</h1>
    <!-- 
        如果将item (父组件)数据 传递给Card

        父 向 子 传递数据

        在使用 子组件的时候、给组件 绑定 属性、传递 给父组件
    -->
    <Search v-bind:search-text="searchText" placeholder="请输入您要搜索的的人员名称"/>

    <Card v-for="item in cardList" v-bind="item"></Card>
    <!--相当于下面的-->
    <!-- <Card v-for="item in cardList" v-bind="name=item.name"  v-bind="age=item.age"  v-bind="job=item.job"></Card> -->
</template>

<script>
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';
export default{

    data(){
        return{
            searchText:"李四",//定要搜素的内容

            cardList:[
                {name:"张三",age:20,'job':"项目经理",'tel':"13303701853"},
                {name:"李四",age:22,'job':"普通员工",'tel':"13303701851"},
                {name:"王五",age:23,'job':"人力资源",'tel':"13303701852"},
                {name:"赵六",age:24,'job':"总经理",'tel':"13303701853"},
                {name:"韩七",age:25,'job':"董事长",'tel':"13303701853"},
            ]
        }
    },
    components:{
        // Card:Card,
        // Search:Search
        Card,
        Search,
    }
}

</script>