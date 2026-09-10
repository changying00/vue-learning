<template>
    <div class="index-page">
       <!-- 引入导航组件 -->
        <Navigator />

        <!-- <h1>我是系统首页</h1> -->
        <!--
            如果将item (父组件)数据 传递给Card

            父 向 子 传递数据

            在使用 子组件的时候、给组件 绑定 属性、传递 给父组件

            父组件 怎么 接收 子组件 传递到 指定频道的数据
                在监听 子组件 对应频道 的时候 可以 通过 $event 获取 子组件传递的数据
        
        在 组件上 使用v-model 指令
            当 父组件 向子组件 传递一个 数据、而 子组件又 将 这个数据传回来、这个操作、可以在父组件中 直接使用 v-model
                代替 v-bing 和 v-on 指令
        -->
        <!-- <div class="search-wrapper">
            <Search v-bind:search-text="searchText" 
            @update:search ="searchText = $event" 
            placeholder="请输入您要搜索的的人员名称"/>
        </div> -->
        <!-- 
             v-model 指令 默认 绑定的属性 叫 modelValue ，绑定的事件式 update:model-values
        
            如果 希望更改属性名、 显示指定即可、
                例如 v-model:searchText , 那么 就将 属性绑定为 searchText, 事件叫 update:search-text   
        
        -->
       
        <Search placeholder="请输入您要搜索的人员名称" v-model:searchText="searchText"></Search>

        <!-- 五星好评组件 -->
        <div class="reviews-wrapper">
            <p>当前评分：{{ star }}星</p>
            <Reviews v-model:star="star" />
        </div>

        <div class="card-container">
            <Card v-for="item in searchList" v-bind="item"></Card>
        </div>
    <!--相当于下面的-->
    <!-- <Card v-for="item in cardList" v-bind="name=item.name"  v-bind="age=item.age"  v-bind="job=item.job"></Card> -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Card from '@/components/Card.vue'
import Search from '@/components/Search.vue'
import Navigator from '@/components/Navigator.vue'
import Reviews from '@/components/Reviews.vue'

// 搜索内容
const searchText = ref('')

// 星星评分
const star = ref(1)

// 卡片列表
const cardList = ref([
    {name:"董旋",age:20,'job':"项目经理",'tel':"13303701853"},
    {name:"李四",age:22,'job':"普通员工",'tel':"13303701851"},
    {name:"王五",age:23,'job':"人力资源",'tel':"13303701852"},
    {name:"赵六",age:24,'job':"总经理",'tel':"13303701853"},
    {name:"韩七",age:25,'job':"董事长",'tel':"13303701853"},
])

// 搜索过滤
const searchList = computed(() => {
    if (searchText.value === '') {
        return cardList.value
    }
    return cardList.value.filter(u => u.name === searchText.value)
})
</script>

<style scoped>
.index-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #87CEEB 0%, #F4A460 30%, #D2691E 60%, #8B4513 100%);
    background-attachment: fixed;
    position: relative;
}

.index-page::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(ellipse at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(210, 105, 30, 0.2) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}

/* 五星好评区域 */
.reviews-wrapper {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
    position: relative;
    z-index: 1;
}

.reviews-wrapper p {
    color: #FFD700;
    font-size: 18px;
    font-family: 'Georgia', serif;
    margin-bottom: 10px;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
    padding: 30px 20px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.card-container > * {
    flex: 0 0 calc(25% - 16px);
    max-width: calc(25% - 16px);
}
</style>

