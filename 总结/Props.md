# Vue Props 详解

## 一、Props 声明

### 1. 使用 `<script setup>`（推荐）

```vue
<script setup>
const props = defineProps(['foo'])
console.log(props.foo)
</script>
```

### 2. 不使用 `<script setup>`

```javascript
export default {
  props: ['foo'],
  setup(props) {
    console.log(props.foo)
  }
}
```

### 3. 对象形式声明

```javascript
// 使用 <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```javascript
// 非 <script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

### 4. TypeScript 类型标注

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

---

## 二、响应式 Props 解构

### Vue 3.5+ 版本

```javascript
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
  console.log(foo)
})
```

Vue 编译器会自动在前面添加 `props.`，等同于：

```javascript
const props = defineProps(['foo'])

watchEffect(() => {
  console.log(props.foo)  // 编译器转换
})
```

### 默认值

```javascript
const { foo = 'hello' } = defineProps<{ foo?: string }>()
```

### 传递解构的 prop 到函数中

```javascript
const { foo } = defineProps(['foo'])

// ❌ 不会按预期工作
watch(foo, /* ... */)

// ✅ 正确方式：使用 getter
watch(() => foo, /* ... */)

// ✅ 传递到外部函数
useComposable(() => foo)
```

---

## 三、Prop 名字格式

### camelCase 声明

```javascript
defineProps({
  greetingMessage: String
})
```

### 模板中使用

```vue
<!-- ✅ camelCase -->
<span>{{ greetingMessage }}</span>

<!-- ✅ kebab-case 传递 -->
<MyComponent greeting-message="hello" />
```

### 命名规范

| 场景 | 推荐格式 | 示例 |
|------|----------|------|
| 组件名 | PascalCase | `<MyComponent />` |
| Prop 名 | camelCase | `greetingMessage` |
| 传递时 | kebab-case | `greeting-message="hello"` |

---

## 四、静态 vs 动态 Props

### 静态 Props

```vue
<BlogPost title="My journey with Vue" />
```

### 动态 Props

```vue
<!-- 变量 -->
<BlogPost :title="post.title" />

<!-- 表达式 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

---

## 五、传递不同的值类型

### Number

```vue
<!-- 常量也需要 v-bind -->
<BlogPost :likes="42" />

<!-- 变量 -->
<BlogPost :likes="post.likes" />
```

### Boolean

```vue
<!-- 隐式转换为 true -->
<BlogPost is-published />

<!-- 显式 false -->
<BlogPost :is-published="false" />

<!-- 变量 -->
<BlogPost :is-published="post.isPublished" />
```

### Array

```vue
<!-- 常量 -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- 变量 -->
<BlogPost :comment-ids="post.commentIds" />
```

### Object

```vue
<!-- 对象字面量 -->
<BlogPost :author="{ name: 'Veronica', company: 'Veridian Dynamics' }" />

<!-- 变量 -->
<BlogPost :author="post.author" />
```

### 使用 v-bind 绑定多个 prop

```javascript
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

```vue
<!-- 等价于 :id="post.id" :title="post.title" -->
<BlogPost v-bind="post" />
```

---

## 六、单向数据流

### 原则

- props 由父组件的更新而变化，向下流往子组件
- **不能在子组件中更改 prop**

```javascript
const props = defineProps(['foo'])

// ❌ 警告！prop 是只读的！
props.foo = 'bar'
```

### 场景1：prop 作为初始值

```javascript
const props = defineProps(['initialCounter'])

// ✅ 定义局部数据属性
const counter = ref(props.initialCounter)
```

### 场景2：对 prop 做转换

```javascript
const props = defineProps(['size'])

// ✅ 使用计算属性
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

### 更改对象/数组类型的 props

```javascript
// ⚠️ 可以更改内部值，但不推荐
const props = defineProps(['items'])
props.items.push(newItem)  // 不推荐

// ✅ 推荐：抛出事件通知父组件
emit('add-item', newItem)
```

---

## 七、Prop 校验

### 完整校验选项

```javascript
defineProps({
  // 基础类型检查
  propA: Number,

  // 多种可能的类型
  propB: [String, Number],

  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },

  // 必传但可为 null
  propD: {
    type: [String, null],
    required: true
  },

  // Number 类型的默认值
  propE: {
    type: Number,
    default: 100
  },

  // 对象类型的默认值
  propF: {
    type: Object,
    default(rawProps) {
      return { message: 'hello' }
    }
  },

  // 自定义类型校验函数
  propG: {
    validator(value, props) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  },

  // 函数类型的默认值
  propH: {
    type: Function,
    default() {
      return 'Default function'
    }
  }
})
```

### 校验规则

| 选项 | 说明 |
|------|------|
| `type` | 类型检查 |
| `required` | 是否必传 |
| `default` | 默认值 |
| `validator` | 自定义校验函数 |

---

## 八、运行时类型检查

### 支持的原生构造函数

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- `Error`

### 自定义类

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}

defineProps({
  author: Person  // 通过 instanceof 检查
})
```

### 可为 null 的类型

```javascript
defineProps({
  id: {
    type: [String, null],  // 数组语法
    required: true
  }
})
```

---

## 九、Boolean 类型转换

### 基本规则

```javascript
defineProps({
  disabled: Boolean
})
```

```vue
<!-- 等同于 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于 :disabled="false" -->
<MyComponent />
```

### 多种类型时的转换规则

```javascript
// Boolean 在前，转换为 true
defineProps({ disabled: [Boolean, Number] })
defineProps({ disabled: [Boolean, String] })
defineProps({ disabled: [Number, Boolean] })

// Boolean 在后，解析为空字符串
defineProps({ disabled: [String, Boolean] })  // disabled=""
```

### 转换规则表

| 类型声明 | 未传值时的值 |
|----------|-------------|
| `Boolean` | `false` |
| `String` | `undefined` |
| `Number` | `undefined` |
| `[Boolean, String]` | `false`（Boolean在前） |
| `[String, Boolean]` | `""`（Boolean在后） |

---

## 十、总结

| 要点 | 说明 |
|------|------|
| 声明方式 | `defineProps()` 或 `props` 选项 |
| 命名格式 | camelCase 声明，kebab-case 传递 |
| 单向数据流 | 只读，不能在子组件中修改 |
| 校验 | type、required、default、validator |
| 默认值 | 对象/数组需要工厂函数 |
| Boolean转换 | 特殊规则，注意类型顺序 |

### 最佳实践

```vue
<script setup>
// ✅ 推荐：使用 defineProps + 类型校验
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})
</script>
```
