<template>
<!--
【VUE组件】编写一个 五星好评组件、 要求如下：
    1) 默认 1星 好评， 数据 由 父组件响应式数据 star 提供

    2) 点击 某个星星 实现染色

    3）子组件 将 用户选择 的 星星等级传递给 父组件 star

-->
<div class="reviews">
    <span v-for="item in 5" :key="item"
          :class="{ active: item <= star }"
          @click="changeReviews(item)">★</span>
</div>
</template>

<script setup>
// 1. 接收父组件传递的 star 数据
const props = defineProps({
    star: {
        type: Number,
        default: 1
    }
})

// 2. 定义事件，用于向父组件传递数据
const emits = defineEmits(["update:star"])

// 3. 点击星星时，将选择的等级传递给父组件
const changeReviews = (item) => {
    emits("update:star", item)
}
</script>

<style scoped>
.reviews span {
    font-size: 30px;
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s ease;
}

.reviews span.active {
    color: #ff6b00;
}

.reviews span:hover {
    color: #ffa500;
}
</style>
