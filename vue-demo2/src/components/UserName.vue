<template>
    <span>姓:</span>
    <input type="text" v-model = "firstName"/>
    <span>名字:</span>
    <input type="text" v-model = "lastName"/>
</template>

<script setup>
const firstName = defineModel("firstName")
const lastName = defineModel("lastName")
</script>