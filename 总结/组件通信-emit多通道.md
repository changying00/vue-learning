# Vue 组件通信 - emit 多通道传递

## 一、概述

一个子组件可以同时向父组件发送多个事件（多个通道），父组件分别监听处理。

---

## 二、示例1：两个按钮分别触发不同通道

### 子组件 MyCompoment.vue

```vue
<template>
  <h1>{{ num }}</h1>
  <button @click="countnum">加1</button>
  <button @click="countnum2">加2</button>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  num: {
    type: Number,
    required: true
  }
})

// 声明两个通道
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
```

### 父组件 Test2.vue

```vue
<template>
  <!-- 第一个实例：监听 count-num -->
  <MyCompoment :num="3" @count-num="(n) => countNum.value = n" />
  <h1>{{ countNum }}</h1>

  <!-- 第二个实例：监听 second-num -->
  <MyCompoment :num="3" @second-num="(n) => countNum1.value = n" />
  <h1>{{ countNum1 }}</h1>
</template>

<script setup>
import { ref } from "vue"
import MyCompoment from '@/components/MyCompoment.vue'

const countNum = ref(0)
const countNum1 = ref(0)
</script>
```

### 效果
- 第一个实例：点击"加1"按钮，每次 +1（3→4→5→6...）
- 第二个实例：点击"加2"按钮，每次 +2（3→5→7→9...）
- 两个实例独立运行，互不影响

---

## 三、示例2：一个按钮同时触发多个通道

### 子组件 MyCompoment.vue

```vue
<template>
  <h1>{{ num }}</h1>
  <button @click="countAll">+1和+2</button>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  num: {
    type: Number,
    required: true
  }
})

// 声明两个通道
const emit = defineEmits(["count-num", "second-num"])

// 两个独立的计数器
const currentNum = ref(props.num)
const scondcount = ref(props.num)

// 一个函数同时向两个通道传值
const countAll = () => {
  // 更新两个计数器
  currentNum.value++
  scondcount.value += 2

  // 同时发射两个事件
  emit("count-num", currentNum.value)
  emit("second-num", scondcount.value)
}
</script>
```

### 父组件 Test2.vue

```vue
<template>
  <MyCompoment
    :num="3"
    @count-num="(n) => countNum.value = n"
    @second-num="(n) => countNum1.value = n"
  />
  <h1>第一个通道（+1）：{{ countNum }}</h1>
  <h1>第二个通道（+2）：{{ countNum1 }}</h1>
</template>

<script setup>
import { ref } from "vue"
import MyCompoment from '@/components/MyCompoment.vue'

const countNum = ref(0)
const countNum1 = ref(0)
</script>
```

### 效果
- 点击一个按钮，同时更新两个值
- 第一个值每次 +1（3→4→5→6...）
- 第二个值每次 +2（3→5→7→9...）

---

## 四、核心知识点

### 1. 声明多个通道

```javascript
// 数组形式
const emit = defineEmits(["count-num", "second-num"])

// 对象形式（带校验）
const emit = defineEmits({
  'count-num': (value) => typeof value === 'number',
  'second-num': (value) => typeof value === 'number'
})
```

### 2. 发射多个事件

```javascript
const countAll = () => {
  // 1. 更新数据
  currentNum.value++
  scondcount.value += 2

  // 2. 分别发射
  emit("count-num", currentNum.value)
  emit("second-num", scondcount.value)
}
```

### 3. 父组件监听多个事件

```vue
<MyCompoment
  :num="3"
  @count-num="handleCountNum"
  @second-num="handleSecondNum"
/>
```

---

## 五、对比总结

| 方式 | 按钮数量 | 适用场景 |
|------|----------|----------|
| 两个按钮分别触发 | 2个 | 不同操作，独立触发 |
| 一个按钮触发多个 | 1个 | 同一操作，同步更新多个值 |

---

## 六、注意事项

1. **拼写一致**：父组件监听事件名必须和子组件 `emit` 名称完全一致
2. **箭头函数语法**：
   ```javascript
   // ❌ 错误
   (n) => countNum += n

   // ✅ 正确
   (n) => { countNum.value = n }
   ```
3. **通道数量**：一个 `defineEmits` 可以声明多个通道
4. **数据独立**：每个通道可以传递不同的数据
