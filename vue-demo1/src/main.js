// 从vue 库导入createApp方法
import { createApp } from 'vue' 
//从pinia导入状态管理工具
import { createPinia } from 'pinia'

//导入根组件 App.vue
import App from './App.vue'
//导入路由配置
import router from './router'
//导入弹窗组件库（vue3-layer v2 没有默认导出，需要按需导入）
import { S3Layer, layer } from 'vue3-layer'
import 'vue3-layer/style.css'

//创建Vue应用实例 、传入根组件
const app = createApp(App)

// 全局注册组件
app.component('S3Layer', S3Layer)

// 把 layer 挂载到全局属性，这样所有组件都能通过 this.$layer 使用
app.config.globalProperties.$layer = layer

app.use(createPinia())
app.use(router)

//把应用挂载到index.html的#app元素上
app.mount('#app')
