<template>
    <ButtonCounter/>
    <ButtonCounter/>
    <!-- 单个传title -->
    <BlogPost title="My journey with Vue"/>
   
    <div :style="{ fontSize: postFontSize + 'em'}">
        <BlogPost 
        @enlarge-text="postFontSize += 0.1"
        v-for = 'item in posts'
        :key= 'item.id'
        :title = 'item.title'/>
    </div>
</template>


<script setup>
//组合式导入组件 不需要再声明组件，直接导入使用即可
import ButtonCounter from '@/components/ButtonCounter.vue';
import BlogPost from '@/components/BlogPost.vue';
//ref 定义响应式数据
import  {ref}  from 'vue'

const posts = ref([
    { id:1,title:"在学习props"},
    { id:2,title:"关于父组件向子组件传值"},
    { id:3,title:"感觉还有点迷糊"}
])

const postFontSize = ref(1)
</script>