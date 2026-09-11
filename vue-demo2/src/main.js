import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//导入组件ButtonCounter
// import  ButtonCounter from "@/components/ButtonCounter.vue"
const app = createApp(App)

app.use(createPinia())
app.use(router)
//全局绑定，所有都可以用
// app.component("ButtonCounter",ButtonCounter)
app.mount('#app')
