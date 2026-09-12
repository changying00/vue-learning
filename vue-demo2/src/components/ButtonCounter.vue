<template>
    <button @click="count++">点击我{{count }}增加</button>
</template>


<script setup>
import {ref} from 'vue'
const count = ref(0)
</script>