<!-- 搜素框组件

子组件 如何 向父组件 传递数据


    a) 子组件 什么时候 向父组件 传递数据

        当触发 相关的 事件的时候
    
    b) 怎么传递参数
        1.在模板中 通过 $emit 内置函数 向 指定的 频道（自定义事件） 发送消息
        2.在 Js 组合式代码中 使用 defineEmits 构建一个emits 对象、然后再向 指定频道发送消息
            
            在选项式中 使用 this.$emit 内置函数发送消息
-->
<!--搜索框组件-->
<template>
    <div class = 'search'>
        <input type='text' :placeholder="props.placeholder" v-model.trim="search"
             @keydown.enter="$emit('update:search-text', $event.target.value)">
        <button @click ="updateSearch" >{{ props.btnText}}</button>
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

//定义一个 emits 对象 (并 管理当前组件所有自定义的频道)
const emits =defineEmits(["update:search-text"])

const updateSearch = (event)=>{
    //向指定 频道 发送消息
    //选项式：this.$emit('update:search-text',this.search);
    emits('update:search-text',search.value);
}
//上面 等价下面这样写
// export default{
//     props:["searchText"],
//     data(){
//         return{
//             search:this.searchText
//         }
//     },
//     emits:["update:search"],//定义所有自定义事件、方便开发工具在 父组件的智能提示
//     methods:{
//         updateSearch(){
//             this.$emit("update:search",this.search);
//          }
//      }
// }
</script>

<style scoped>
.search {
    display: flex;
    width: 600px;
    max-width: 90%;
    margin: 0 auto 50px;
    background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #6B3410 100%);
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1);
    border: 3px solid #654321;
    position: relative;
}

.search::before {
    content: '🔍';
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    z-index: 2;
}

.search input {
    flex: 1;
    background: linear-gradient(180deg, #DEB887 0%, #D2B48C 100%);
    border: 2px solid #8B7355;
    color: #3E2723;
    padding: 12px 20px 12px 45px;
    font-size: 15px;
    outline: none;
    border-radius: 5px;
    font-family: 'Georgia', serif;
}

.search input::placeholder {
    color: #8B7355;
    font-style: italic;
}

.search button {
    background: linear-gradient(135deg, #CD853F 0%, #D2691E 50%, #A0522D 100%);
    color: #FFD700;
    border: 2px solid #8B7355;
    padding: 12px 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Georgia', serif;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    letter-spacing: 2px;
    margin-left: 8px;
}

.search button:hover {
    background: linear-gradient(135deg, #D2691E 0%, #CD853F 50%, #8B7355 100%);
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.5);
    transform: translateY(-1px);
}
</style>