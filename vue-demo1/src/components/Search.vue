<!--搜索框组件-->
<template>
    <div class = 'search'>
        <input type='text' :placeholder="props.placeholder" v-model="search">
        <button>{{ btnText}}</button>
    </div>
</template>

<!-- 子组件要求 使用者(父组件)必须传入 一个属性 叫searchText 代表要搜素的内容-->

<script setup>
import {ref} from 'vue'
//使用 defineProps 函数来接收 父组件传递的数据
//const = props = defineProps(["searchText",'placeholder',' btnText'])
const props = defineProps({
    searchText:{
        type:String,
        required: true,
    },
    placeholder:{
        type: String,
        required:false,
        default:"请输入您要搜素的内容"
    },
    btnText:{
        type:String,
        required:false,
        default:"搜素"
    }
})
//定义一个响应式数据（search 是可读可写的）
const search = ref(props.searchText);

//上面 等价下面这样写
// export default{
//     props:["searchText"],
//     data(){
//         return{
//             search:this.searchText
//         }
//     }
// }
</script>