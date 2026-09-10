
<!-- 
 
组件 :  a) 可复用  b) 数据独立

-->

<template>
    <div>我是一个可复用的组件</div>

    <button @click="count++">{{ count }}</button>
</template>


<script setup>

import {ref} from 'vue' ;

// 定义 响应式数据 
const count = ref(0) ;


</script>