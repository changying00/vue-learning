# Vue 3 组件 v-model 详解（新手入门版）

## 一、什么是组件 v-model？

**简单理解**：v-model 可以让父子组件之间实现**双向数据绑定**。

### 生活化比喻

想象你和朋友传递一张纸条：
- **单向传递**（:prop）：你写好纸条给他，他只能看，不能改
- **双向绑定**（v-model）：你写好纸条给他，他改了之后，你这边也会自动更新

---

## 二、Vue 3.4 新写法：defineModel()（推荐）

### 基本用法

**子组件**：
```vue
<script setup>
// 一行代码搞定双向绑定！
const model = defineModel()

function update() {
  model.value++  // 修改值，父组件自动同步
}
</script>

<template>
  <div>父组件绑定的值：{{ model }}</div>
  <button @click="update">+1</button>
</template>
```

**父组件**：
```vue
<template>
  <Child v-model="countModel" />
  <p>当前值：{{ countModel }}</p>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const countModel = ref(0)
</script>
```

### 🔍 详细解释

```javascript
const model = defineModel()
```

这行代码做了什么？
1. 创建了一个 ref 变量 `model`
2. 这个 ref 和父组件的 v-model 绑定
3. 子组件修改 `model.value`，父组件自动更新
4. 父组件修改值，子组件也自动更新

### 数据流图解

```
父组件 countModel = 0
    ↓ (v-model 绑定)
子组件 model = 0
    ↓ (点击按钮 model.value++)
子组件 model = 1
    ↓ (自动同步)
父组件 countModel = 1
```

---

## 三、3.4 之前的写法（了解即可）

### 子组件

```vue
<script setup>
// 需要手动声明 prop 和 emit
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

### 父组件

```vue
<template>
  <!-- v-model 会被编译成下面的形式 -->
  <Child
    :modelValue="foo"
    @update:modelValue="foo = $event"
  />
</template>
```

### 对比新旧写法

| 特性 | Vue 3.4+（defineModel） | 3.4之前 |
|------|------------------------|---------|
| 代码量 | 1行 | 多行 |
| 复杂度 | 简单 | 复杂 |
| 推荐度 | ✅ 推荐 | ❌ 了解即可 |

---

## 四、v-model 带参数（重要！）

### 什么时候用？

当你需要**多个双向绑定**时，用参数区分。

### 基本用法

**父组件**：
```vue
<template>
  <!-- 带参数的 v-model -->
  <MyComponent v-model:title="bookTitle" />
  <p>书名：{{ bookTitle }}</p>
</template>

<script setup>
import { ref } from 'vue'
const bookTitle = ref('Vue入门')
</script>
```

**子组件**：
```vue
<script setup>
// 'title' 是参数名
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

### 🔍 详细解释

```vue
<!-- 父组件 -->
<MyComponent v-model:title="bookTitle" />

<!-- 等价于 -->
<MyComponent 
  :title="bookTitle"
  @update:title="bookTitle = $event"
/>
```

---

## 五、多个 v-model 绑定（实战常用）

### 场景：用户姓名表单

**父组件**：
```vue
<template>
  <UserName
    v-model:first-name="first"
    v-model:last-name="last"
  />
  <p>姓名：{{ first }} {{ last }}</p>
</template>

<script setup>
import { ref } from 'vue'
import UserName from './UserName.vue'

const first = ref('张')
const last = ref('三')
</script>
```

**子组件**：
```vue
<script setup>
// 两个独立的双向绑定
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <div>
    <label>姓：</label>
    <input type="text" v-model="firstName" />
  </div>
  <div>
    <label>名：</label>
    <input type="text" v-model="lastName" />
  </div>
</template>
```

### 🔍 详细解释

```vue
<!-- 父组件绑定两个值 -->
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

<!-- 等价于 -->
<UserName
  :first-name="first"
  @update:first-name="first = $event"
  
  :last-name="last"
  @update:last-name="last = $event"
/>
```

---

## 六、v-model 修饰符（进阶）

### 什么是修饰符？

修饰符是对 v-model 值进行**预处理**的功能。

### 内置修饰符

```vue
<!-- .trim：去除首尾空格 -->
<input v-model.trim="text" />

<!-- .number：转为数字 -->
<input v-model.number="age" />

<!-- .lazy：失去焦点时才更新 -->
<input v-model.lazy="text" />
```

### 自定义修饰符

**父组件**：
```vue
<template>
  <!-- .capitalize 修饰符：首字母大写 -->
  <MyComponent v-model.capitalize="myText" />
  <p>结果：{{ myText }}</p>
</template>

<script setup>
import { ref } from 'vue'
const myText = ref('')
</script>
```

**子组件**：
```vue
<script setup>
// 解构获取修饰符
const [model, modifiers] = defineModel({
  set(value) {
    // 如果有 capitalize 修饰符，首字母大写
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

### 🔍 详细解释

```javascript
const [model, modifiers] = defineModel({
  set(value) {
    // modifiers = { capitalize: true }
    if (modifiers.capitalize) {
      // 首字母大写
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
```

**执行流程**：
1. 用户输入 "hello"
2. 触发 set 函数
3. 检测到 capitalize 修饰符
4. 返回 "Hello"
5. 父组件收到 "Hello"

---

## 七、带参数的 v-model 修饰符（高级）

### 场景：不同字段不同处理

**父组件**：
```vue
<template>
  <UserName
    v-model:first-name.capitalize="first"
    v-model:last-name.uppercase="last"
  />
</template>
```

**子组件**：
```vue
<script setup>
// 获取各自的修饰符
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```

---

## 八、完整实战案例

### 案例1：简单计数器

**子组件 Counter.vue**：
```vue
<script setup>
const count = defineModel()
</script>

<template>
  <button @click="count++">+1</button>
  <span>{{ count }}</span>
</template>
```

**父组件**：
```vue
<template>
  <Counter v-model="num" />
  <p>计数：{{ num }}</p>
</template>

<script setup>
import { ref } from 'vue'
import Counter from './Counter.vue'

const num = ref(0)
</script>
```

### 案例2：用户表单

**子组件 UserForm.vue**：
```vue
<script setup>
const username = defineModel('username')
const email = defineModel('email')
</script>

<template>
  <div>
    <label>用户名：</label>
    <input v-model="username" />
  </div>
  <div>
    <label>邮箱：</label>
    <input v-model="email" />
  </div>
</template>
```

**父组件**：
```vue
<template>
  <UserForm
    v-model:username="user.name"
    v-model:email="user.email"
  />
  <p>用户名：{{ user.name }}</p>
  <p>邮箱：{{ user.email }}</p>
</template>

<script setup>
import { ref } from 'vue'
import UserForm from './UserForm.vue'

const user = ref({
  name: '',
  email: ''
})
</script>
```

---

## 九、常见问题解答

### Q1：defineModel 和 defineProps 有什么区别？

```vue
<!-- defineModel：双向绑定 -->
const model = defineModel()  // 自动双向同步

<!-- defineProps：单向传递 -->
const props = defineProps()  // 只读，不能修改
```

### Q2：v-model 可以绑定对象吗？

```vue
<script setup>
const user = defineModel()
</script>

<template>
  <!-- 可以绑定对象 -->
  <input v-model="user.name" />
  <input v-model="user.email" />
</template>
```

### Q3：什么时候用 v-model，什么时候用 :prop + @event？

| 场景 | 推荐方式 |
|------|----------|
| 表单输入 | v-model |
| 需要自定义事件名 | :prop + @event |
| 需要在事件中做处理 | :prop + @event |
| 简单数据同步 | v-model |

---

## 十、总结对比表

| 功能 | Vue 3.4+ | 3.4之前 |
|------|----------|---------|
| 基本双向绑定 | `defineModel()` | `defineProps` + `defineEmits` |
| 带参数 | `defineModel('name')` | `defineProps` + `defineEmits(['update:name'])` |
| 多个绑定 | 多个 `defineModel()` | 复杂的 props + emits |
| 修饰符 | `defineModel({ set })` | 手动处理 |
| 代码量 | 少 | 多 |
| 推荐度 | ✅ 推荐 | ❌ 了解即可 |

### 记忆口诀

```
Vue 3.4 用 defineModel
一行代码搞定双向绑定
参数用 defineModel('name')
多个绑定就多写几个
```

---

## 十一、学习路径建议

### 第一步：掌握基础
1. 理解 v-model 是什么
2. 学会 `defineModel()` 基本用法
3. 练习简单计数器案例

### 第二步：学习参数
1. 理解 v-model 带参数
2. 学会 `defineModel('name')`
3. 练习用户表单案例

### 第三步：学习修饰符
1. 理解修饰符的作用
2. 学会自定义修饰符
3. 练习首字母大写案例

### 第四步：对比理解
1. 对比新旧写法
2. 理解底层机制
3. 选择合适的场景使用
