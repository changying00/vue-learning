<template>
    <div>Parent bound v-model is:{{ model }}</div>
    <button @click="update">Increment</button>
</template>

<script setup>
// const model = defineModel()
const model = defineModel({default:1})

function update(){
    model.value++
}
</script>

<!-- //1.第一种写法
<script setup>
const model  = defineModel()

</script>

<template>
    <input v-model= "model"/>
</template> -->

<!-- //第一种对应的原始写法
<script setup>
const = props = defineProps(['modelValue'])
const = emit  = defineEmits(['update:modelValue'])
</script>
<template>
    <input 
        :value = "props.modelValue"
        @input = "emit('update:modelValue',$event.target.value)"
    />
</template> -->

<!-- //如果为 defineModel prop 设置了一个 default 值且父组件没有为该 prop 提供任何值，
// 会导致父组件与子组件之间不同步。在下面的示例中，父组件的 myRef 是 undefined，
// 而子组件的 model 是 1：
//const model = defineModel({default:1})

<script setup>
const myRef = ref()
</script>

<template>
  <Child v-model="myRef"></Child>
</template>

-->

