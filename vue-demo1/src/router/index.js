import { createRouter, createWebHistory } from 'vue-router'

// 导入 登录 视图组件 
import LoginView from '@/views/Login.vue' ;
import Index from '@/views/Index.vue' ;


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 管理 所有的路由 
  routes: [
      // 定义 路由 、 一个 路由是一个 对象， 路由 包含 路由地址， 路由名称 、和 对应的 视图页面
      {
         path: "/login" ,  // 设置 路由地址
         name: "login" ,  // 设置 路由名称 
         component: LoginView ,  // 设置 路由对应的视图页面
      },

      {
         path: '/'  ,   // 定义首页路由地址
         name: "index" ,  // 设置 路由的名称 
         component: Index , // 设置 首页视图 
         
      },

      {
        path: "/register" , // 设置 注册路由地址
        name: "register" ,  // 设置路由名称
        // 动态 (懒加载) 加载路由 
        component: ()=> import('@/views/Register.vue')
      },

      {
        path: "/todolist",
        name: "todolist",
        component: () => import("@/views/TodoList.vue")
      },

      {
        path: "/test",
        name: "test",
        component: ()=> import("@/views/Test.vue")
      }



  ],
})

export default router
