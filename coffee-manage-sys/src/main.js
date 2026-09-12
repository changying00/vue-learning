import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { s3Layer } from 'vue3-layer';
import 'vue3-layer/vue3-layer.css' ;


const app = createApp(App)

// 关联 ElementPlus
app.use(ElementPlus)
// 注册 ElementPlus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//注册 layer
app.component("s3-layer", s3Layer)

app.use(createPinia())
app.use(router)

app.mount('#app')
