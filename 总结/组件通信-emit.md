# Vue 组件通信 - Emit 事件传递

## 子组件向父组件传递数据（Emit）

### 1. 声明事件（必须）

```vue
<script setup>
// 声明组件可以发送哪些事件
const emit = defineEmits(["enlarge-text", "update:star"])
</script>
```

### 2. 两种触发事件的方式

#### 写法一：模板中直接 $emit

```vue
<template>
    <button @click="$emit('enlarge-text')">放大文字</button>
</template>

<script setup>
// 声明事件（必须保留）
const emit = defineEmits(["enlarge-text"])
// 模板中直接用 $emit，script 中不需要调用 emit()
</script>
```

#### 写法二：在 script 中定义方法

```vue
<script setup>
const emit = defineEmits(["enlarge-text"])

// 定义方法
const handleClick = () => {
    emit("enlarge-text")
}
</script>

<template>
    <button @click="handleClick">放大文字</button>
</template>
```

### 3. 两种写法对比

| | 写法一：$emit | 写法二：定义方法 |
|--|---------------|------------------|
| 代码位置 | 模板 template 中 | script 中 |
| 简洁程度 | 一行搞定 | 需要定义方法 |
| 适用场景 | 只需要触发事件 | 触发前要做其他逻辑 |

### 4. 写法二的优势

当触发事件前需要**做其他事情**时更方便：

```javascript
const handleClick = () => {
    // 先做其他逻辑
    console.log('点击了按钮')

    // 可以传参数
    emit("enlarge-text", 2)

    // 还可以做更多操作
    alert('已发送事件')
}
```

### 5. 传递参数

```javascript
// 子组件
const handleClick = () => {
    emit("enlarge-text", 2)  // 传递数字2
}
```

```vue
<!-- 父组件接收 -->
<BlogPost @enlarge-text="handleEnlarge" />

<script setup>
const handleEnlarge = (value) => {
    console.log(value)  // 2
}
</script>
```

### 6. 完整示例

#### 子组件 BlogPost.vue

```vue
<template>
    <div>
        <h2>{{ title }}</h2>
        <!-- 写法一：直接 $emit -->
        <button @click="$emit('enlarge-text')">放大（写法一）</button>

        <!-- 写法二：调用方法 -->
        <button @click="handleClick">放大（写法二）</button>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String
})

// 声明事件（必须）
const emit = defineEmits(["enlarge-text"])

// 写法二：定义方法
const handleClick = () => {
    emit("enlarge-text")
}
</script>
```

#### 父组件使用

```vue
<script setup>
import { ref } from 'vue'
import BlogPost from '@/components/BlogPost.vue'

const postFontSize = ref(1)

const handleEnlarge = () => {
    postFontSize.value += 0.5
}
</script>

<template>
    <BlogPost
        title="我的文章"
        :style="{ fontSize: postFontSize + 'em' }"
        @enlarge-text="handleEnlarge"
    />
</template>
```

---

## 总结

| 要点 | 说明 |
|------|------|
| `defineEmits()` | 声明组件能发哪些事件，**必须写** |
| `$emit('事件名')` | 模板中直接触发，简单场景用 |
| `emit('事件名')` | script 中触发，需要额外逻辑时用 |
| 两种写法 | 二选一，都是正确的 |

---

## 重要：$emit 和 defineEmits 的关系

### 模板中的 $emit 不需要 defineEmits

```vue
<template>
    <!-- ✅ $emit 是 Vue 模板内置的，不需要 defineEmits 也能用 -->
    <button @click="$emit('enlarge-text')">放大文字</button>
</template>

<script setup>
// 注释掉也能工作！因为模板里用的是 $emit，不是 emit
// const emit = defineEmits(["enlarge-text"])
</script>
```

### 为什么注释掉 defineEmits 还能传？

| 用法 | 是否需要 defineEmits | 说明 |
|------|---------------------|------|
| 模板中 `$emit('事件名')` | ❌ 不需要 | Vue 自动注入，直接用 |
| script 中 `emit('事件名')` | ✅ 需要 | 必须先 defineEmits 声明 |

### defineEmits 的作用

```vue
<script setup>
// 作用1：声明事件，让 script 中能用 emit()
const emit = defineEmits(["enlarge-text"])

// 作用2：事件名校验（开发时检查事件名是否合法）
// 作用3：代码提示，方便开发
</script>
```

### 总结

- `$emit` → 模板内置，**不需要** defineEmits，注释掉也能用
- `emit()` → script中用，**必须先** defineEmits 声明
- `defineEmits` 除了声明，还能让 Vue 做**事件名校验**