<template>
    <h1>{{ first }} {{last}}</h1>
    <UserName 
        v-model:first-name="first"
        v-model:last-name="last"
    />
</template>

<script setup>
import {ref} from "vue"
import UserName from '@/components/UserName.vue';

const first = ref('董')
const last = ref('旋')
</script>