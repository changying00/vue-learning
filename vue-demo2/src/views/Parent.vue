<template>

    <Child v-model ="countModel"/>
    <h1>{{ countModel }}</h1>

    <!-- //第一种对应的原始写法 对应的父组件
    <Child 
        :model-value = 'foo'
        @update:model-value="$event =>(foo = $event)"
    /> -->
</template>


<script setup>
import Child from '@/components/Child.vue';
import {ref} from 'vue'

const countModel = ref()
</script>


 