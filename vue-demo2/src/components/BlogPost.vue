<template>
    <div class="blog-post">
        <h4>{{ title }}</h4>
        <!-- 第一种 模板中直接用 $emit 触发，完全没问题 -->
        <button @click="$emit('enlarge-text')">Enlarge text</button>
        <!--第二中,再script 中-->
        <!-- <button @click="handleClick">Enlarge text</button> -->
    </div>

</template>
<script setup>
//通过defineProps
    // defineProps(["title"])

    //通过difineProps收到父组件、传入的title
    const props = defineProps(['title'])

    // const emit = defineEmits(["enlarge-text"])
    console.log(props.title)
    
    // const handleClick = () =>{
    //     emit("enlarge-text")
    // }
   


</script>