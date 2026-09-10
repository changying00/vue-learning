<template>
    <h1>当前点击数量: {{ count }}</h1>

    <h1>当前用户数量: {{ users.length }}</h1>

    <button @click="ClickMe">点我</button>

    <p>{{ message }} 的 倒序是 {{ reverseMessage }} </p>

    <input type="text" v-model="fullName">

    <p>完整名是:{{ fullName }}、姓: {{ firstName }} 名: {{ lastName }}</p>

</template>

<script setup>

import { useRoute } from 'vue-router';

// 获取 当前 路由对象 
const route = useRoute();
// 当前路由对象 主要 包含 和 路由相关的属性 
//  route.path : 获取 当前路由地址 
//  route.fullPath : 获取 当前路由完整地址，包含 查询参数 和 锚点信息
//  route.meta : 获取 当前路由 元数据
//  route.query : 获取 当前路由的 查询参数
//  route.params :  获取 动态路由的 参数 
console.log(route)


/**
 *   1.  组合式中 怎么定义 响应式数据 
 *           
 *           ref,   reactive
 * 
 *         import {ref,  reactive} from 'vue'
 * 
 *   2.  组合式中 怎么定义 事件对应的方法 
 * 
 *          a) 使用 function 定义一个 普通函数 
 *          b) 使用 箭头函数 并赋值给 一个常量 (推荐写法)
 * 
 *   
 *    3. 组合式 中 怎么定义 计算属性 
 * 
 *         使用 computed 函数 
 * 
 *         import { computed } from 'vue'
 * 
 *    4. 组合式 中 怎么使用 watch 
 *          使用 computed 函数 
 *      
 *        import {watch} from 'vue' ;
 * 
 * 
 */


import {ref, reactive, computed, watch } from 'vue' ;

// 定义一个响应式数据 
const count = ref(0) ;

// 定义一个响应式数据 
//  reactive 主要处理 数组 和 对象 、其他类型 需要用 ref 
//  reactive 定义的响应式数据 不需要 通过 .value 获取数据 

const users = reactive([]);

// 定义一个响应式数据
const message = ref("hello") ;

const firstName = ref("张");
const lastName = ref("三丰");


//推荐的写法
const ClickMe = (event) => {
    // ref 定义的响应式数据 在 JS 中 必须 使用 .value 才能操作它的值 
    //    在 模板中 不需要 调用 .value 、模板中 会自动解包
    count.value ++ ; 
    // 向 users 中 添加一个用户 
    users.push({
        name: "张三",
        age: 20
    })
}

// 定义只读的计算属性
const reverseMessage = computed(()=> {
    return message.value.split("").reverse().join("");
});

// 定义 可读 可写的 计算属性
const fullName = computed({
    get(){
        return firstName.value + lastName.value ;
    },
    set(value) {
        firstName.value = value[0] ;
        lastName.value = value.substring(1);
    }
})

// 定义侦听器 
// watch(fullName, (newVal, oldVal)=> {
//     console.log("==========================")
// })

watch(fullName, (newVal, oldVal)=> {
    console.log("==========================")
}, {immediate: true, deep:true})


</script>