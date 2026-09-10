<!--
组件：可复用
-->

<template>
    <div>组件是可复用的</div>

    <button @click="count++">{{ count }}</button>
</template>

<script setup>
import {ref} from "vue";
//定义响应式 数据
const count = ref(0)
</script>