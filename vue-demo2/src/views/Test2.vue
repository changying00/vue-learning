<template>
  <!-- 第一个实例：接收 count-num 事件（每次+1） -->
  <MyCompoment :num="3" @count-num="(n) => countNum = n" />
  <h1>{{ countNum }}</h1>

  <!-- 第二个实例：接收 second-num 事件（每次+2） -->
  <MyCompoment :num="3" @second-num="(n) => countNum1 = n" />
  <h1>{{ countNum1 }}</h1>
</template>

<script setup>
import { ref } from "vue"
import MyCompoment from '@/components/MyCompoment.vue'

const countNum = ref(0)
const countNum1 = ref(0)
</script>