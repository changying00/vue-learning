# Vue Router 路由详解

## 一、安装与配置

### 1. 安装
```bash
npm install vue-router@4
```

### 2. 创建路由配置文件（src/router/index.js）

```javascript
import { createRouter, createWebHistory } from 'vue-router'

// 导入组件
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',          // 路由地址
            name: 'home',       // 路由名称
            component: Home     // 对应组件
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
})

export default router
```

### 3. 在 main.js 中注册

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)  // 注册路由
app.mount('#app')
```

### 4. 在 App.vue 中使用

```vue
<template>
    <!-- 路由出口，匹配到的组件会渲染在这里 -->
    <RouterView />
</template>
```

---

## 二、路由配置详解

### 1. 基础配置

```javascript
{
    path: '/user',        // 路由路径
    name: 'user',         // 路由名称（唯一）
    component: User       // 对应组件
}
```

### 2. 懒加载（推荐）

```javascript
{
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')  // 按需加载
}
```

### 3. 嵌套路由（子路由）

```javascript
{
    path: '/user',
    component: User,
    children: [
        {
            path: 'profile',      // 子路由路径（不加/）
            name: 'user-profile',
            component: Profile
        },
        {
            path: 'settings',
            name: 'user-settings',
            component: Settings
        }
    ]
}
```

父组件中使用：
```vue
<template>
    <h1>用户页面</h1>
    <RouterView />  <!-- 子路由渲染在这里 -->
</template>
```

### 4. 重定向

```javascript
{
    path: '/',
    redirect: '/home'  // 访问/时重定向到/home
}
```

### 5. 404页面

```javascript
{
    path: '/:pathMatch(.*)*',  // 匹配所有未定义的路由
    name: 'not-found',
    component: NotFound
}
```

---

## 三、路由跳转

### 1. 声明式导航（RouterLink）

```vue
<template>
    <!-- 基础用法 -->
    <RouterLink to="/home">首页</RouterLink>

    <!-- 使用路由名称 -->
    <RouterLink :to="{ name: 'home' }">首页</RouterLink>

    <!-- 携带路径参数 -->
    <RouterLink :to="{ name: 'user', params: { id: 123 }}">用户</RouterLink>

    <!-- 携带查询参数 -->
    <RouterLink :to="{ name: 'search', query: { keyword: 'vue' }}">搜索</RouterLink>
</template>
```

### 2. 编程式导航（useRouter）

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 字符串路径
router.push('/home')

// 路由对象
router.push({ name: 'home' })

// 携带参数
router.push({ name: 'user', params: { id: 123 }})
router.push({ name: 'search', query: { keyword: 'vue' }})

// 替换当前路由（不留历史记录）
router.replace('/home')

// 返回上一页
router.go(-1)
router.back()
</script>
```

### 3. 选项式API中的编程式导航

```vue
<script>
export default {
    methods: {
        goHome() {
            this.$router.push('/home')
            this.$router.push({ name: 'home' })
        }
    }
}
</script>
```

---

## 四、路由参数

### 1. 路径参数（params）

路由配置：
```javascript
{
    path: '/user/:id',    // :id 是动态参数
    name: 'user',
    component: User
}
```

跳转：
```javascript
router.push({ name: 'user', params: { id: 123 }})
```

获取参数：
```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id)  // 123
</script>
```

### 2. 查询参数（query）

跳转：
```javascript
router.push({ name: 'search', query: { keyword: 'vue', page: 1 }})
// URL: /search?keyword=vue&page=1
```

获取参数：
```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query.keyword)  // 'vue'
console.log(route.query.page)     // 1
</script>
```

### 3. params 与 query 的区别

| 特性 | params | query |
|------|--------|-------|
| URL显示 | `/user/123` | `/search?keyword=vue` |
| 刷新后 | 保留（需配置） | 保留 |
| 使用场景 | 资源标识 | 搜索、筛选 |

---

## 五、路由守卫

### 1. 全局前置守卫

```javascript
// router/index.js
router.beforeEach((to, from, next) => {
    // to: 即将进入的路由
    // from: 当前离开的路由
    // next: 放行函数

    if (to.path === '/admin' && !isLogin) {
        next('/login')  // 未登录，跳转登录页
    } else {
        next()          // 放行
    }
})
```

### 2. 路由独享守卫

```javascript
{
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
        if (!isLogin) {
            next('/login')
        } else {
            next()
        }
    }
}
```

### 3. 组件内守卫

```vue
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

// 进入组件前
onBeforeRouteEnter((to, from, next) => {
    next()
})

// 离开组件前
onBeforeRouteLeave((to, from, next) => {
    if (hasUnsavedChanges) {
        if (confirm('有未保存的更改，确定离开吗？')) {
            next()
        } else {
            next(false)  // 取消导航
        }
    } else {
        next()
    }
})
</script>
```

---

## 六、导航链接激活状态

### 1. 自动添加激活类名

```vue
<template>
    <!-- 当前路由匹配时，自动添加 router-link-active 类 -->
    <RouterLink to="/home">首页</RouterLink>
</template>

<style>
.router-link-active {
    color: red;
    font-weight: bold;
}
</style>
```

### 2. 精确匹配

```vue
<template>
    <!-- exact: 只有完全匹配时才添加类名 -->
    <RouterLink to="/" exact>首页</RouterLink>
</template>
```

### 3. 自定义激活类名

```javascript
const router = createRouter({
    linkActiveClass: 'active',      // 激活时的类名
    linkExactActiveClass: 'exact',  // 精确激活时的类名
    // ...
})
```

---

## 七、常见问题

### 1. 路由模式

```javascript
// History模式（推荐，URL美观）
createWebHistory()

// Hash模式（兼容性好，URL带#）
createWebHashHistory()
```

### 2. 路由跳转后页面不刷新

```javascript
// 使用路由名称跳转
router.push({ name: 'user', params: { id: newId }})

// 或者使用路径
router.push(`/user/${newId}`)
```

### 3. 获取当前路由信息

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()      // 当前路由信息
const router = useRouter()    // 路由实例

console.log(route.path)       // 当前路径
console.log(route.params)     // 路径参数
console.log(route.query)      // 查询参数
console.log(route.name)       // 路由名称
</script>
```

---

## 八、完整示例

### 路由配置

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/user/:id',
        name: 'user',
        component: () => import('@/views/User.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

### 导航组件

```vue
<template>
    <nav>
        <RouterLink :to="{ name: 'home' }">首页</RouterLink>
        <RouterLink :to="{ name: 'user', params: { id: 1 }}">用户</RouterLink>
    </nav>
</template>
```

### 动态路由页面

```vue
<template>
    <h1>用户 {{ route.params.id }}</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
```
