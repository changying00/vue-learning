# Vue ref 易错点总结

## 一、模板中 ref 自动解包

### ✅ 正确写法

```vue
<template>
  <!-- 模板中自动解包，不需要 .value -->
  <h1>{{ countNum }}</h1>
  <button @click="countNum = n">赋值</button>
</template>

<script setup>
import { ref } from 'vue'
const countNum = ref(0)
</script>
```

### ❌ 错误写法

```vue
<template>
  <!-- 模板中不需要 .value -->
  <h1>{{ countNum.value }}</h1>  <!-- ❌ 多余 -->
  <button @click="countNum.value = n">赋值</button>  <!-- ❌ 多余 -->
</template>
```

---

## 二、script setup 中必须用 .value

### ✅ 正确写法

```vue
<script setup>
import { ref } from 'vue'
const countNum = ref(0)

// 在 script setup 中必须用 .value
const updateNum = () => {
  countNum.value = 10  // ✅ 正确
  console.log(countNum.value)  // ✅ 正确
}
</script>
```

### ❌ 错误写法

```vue
<script setup>
import { ref } from 'vue'
const countNum = ref(0)

const updateNum = () => {
  countNum = 10  // ❌ 错误，丢失了 ref 引用
  console.log(countNum)  // ❌ 打印的是 ref 对象，不是值
}
</script>
```

---

## 三、模板 vs script setup 对比

| 场景 | 模板 | script setup |
|------|------|--------------|
| 读取 | `{{ countNum }}` | `countNum.value` |
| 赋值 | `countNum = n` | `countNum.value = n` |
| 计算 | `{{ countNum + 1 }}` | `countNum.value + 1` |
| 事件 | `@click="countNum = n"` | `emit('event', countNum.value)` |

---

## 四、事件处理器中的 ref

### ✅ 模板中的事件处理器

```vue
<template>
  <!-- 直接赋值，自动解包 -->
  <button @click="countNum = 10">赋值</button>

  <!-- 调用函数 -->
  <button @click="updateNum">赋值</button>
</template>

<script setup>
import { ref } from 'vue'
const countNum = ref(0)

const updateNum = () => {
  countNum.value = 10  // script 中需要 .value
}
</script>
```

### ❌ 常见错误

```vue
<template>
  <!-- 错误：模板中不需要 .value -->
  <button @click="countNum.value = 10">赋值</button>  <!-- ❌ -->
</template>
```

---

## 五、emit 事件中的 ref

### 子组件

```vue
<template>
  <button @click="$emit('update', countNum)">发送</button>
</template>

<script setup>
import { ref } from 'vue'
const countNum = ref(10)

// 也可以这样写
const sendNum = () => {
  emit('update', countNum.value)  // script 中需要 .value
}
</script>
```

### 父组件

```vue
<template>
  <!-- 模板中自动解包 -->
  <Child @update="(n) => countNum = n" />
  <h1>{{ countNum }}</h1>
</template>

<script setup>
import { ref } from 'vue'
const countNum = ref(0)
</script>
```

---

## 六、总结

| 位置 | 读取 | 赋值 | 原因 |
|------|------|------|------|
| 模板 | `{{ ref }}` | `ref = value` | Vue 自动解包 |
| script setup | `ref.value` | `ref.value = value` | JavaScript 语法 |

### 记忆口诀

```
模板中，直接用
script里，点value
```

---

## 七、完整示例

```vue
<template>
  <div>
    <!-- ✅ 模板中直接使用，不需要 .value -->
    <h1>{{ countNum }}</h1>
    <p>{{ countNum + 1 }}</p>

    <!-- ✅ 模板中赋值，不需要 .value -->
    <button @click="countNum = countNum + 1">+1</button>
    <button @click="countNum = 0">重置</button>

    <!-- ✅ 调用 script 中的函数 -->
    <button @click="increment">+1（函数）</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const countNum = ref(0)

// ✅ script setup 中必须用 .value
const increment = () => {
  countNum.value++
  console.log('当前值：', countNum.value)
}
</script>
```

---

## 八、常见面试题

### Q：模板中为什么不需要 .value？

**A**：Vue 3 在模板编译时会自动检测 ref 并解包，这是为了简化模板代码，提高可读性。

### Q：script setup 中为什么必须用 .value？

**A**：因为 ref 是一个对象 `{ value: ... }`，在 JavaScript 中必须通过 `.value` 访问内部值。

### Q：模板中写 .value 会报错吗？

**A**：不会报错，但这是多余的，Vue 会忽略多余的 `.value`，直接使用 ref 对象。
