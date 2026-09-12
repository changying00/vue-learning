<template>
  <h1>{{ num }}</h1>
  <button @click="countnum">加1</button>
  <button @click="countnum2">加2</button>
</template>

<script setup>
import { ref } from "vue"

// 接收父组件传入的 num
const props = defineProps({
  num: {
    type: Number,
    required: true
  }
})

// 建立传送频道
const emit = defineEmits(["count-num", "second-num"])

// 两个独立的计数器
const currentNum = ref(props.num)
const scondcount = ref(props.num)

// 第一个通道：每次 +1
const countnum = () => {
  currentNum.value++
  emit("count-num", currentNum.value)
}

// 第二个通道：每次 +2
const countnum2 = () => {
  scondcount.value += 2
  emit("second-num", scondcount.value)
}
</script>