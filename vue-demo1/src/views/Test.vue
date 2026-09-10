<template>
    
</template>

<script setup>
/**
 * 1.组合式 中 怎么定义 响应式数据
 *  
 *      ref、 reactive
 *      import {ref reactive} from "vue"
 * 2. 组合式中 怎么定义  事件对应的方法
 * 
 *      a）使用 function 定义一个 普通函数
 *      b) 使用 箭头函数 并赋值给 一个常量(推荐写法)
 * 3.组合式 中 怎么定义 计算属性
 * 
 *      使用 computed 函数
 * 
 *      import {computed} from "vue"
 * 4.组合式 中 怎么使用 watch
 *      使用 computed 函数
 *      import {watch} from "vue"
 * 
 */
import {ref,reactive} from 'vue';

//定义一个响应式数据
const count = ref(0)

//定义一个响应式数据
//reactive 主要处理 数组 和对象、其他类型 需要用ref
//reactive 定义的响应式 数据 不需要 通过.value  获取数据

const users = reactive([]);



</script>