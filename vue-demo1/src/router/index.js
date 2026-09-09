import { createRouter, createWebHistory } from 'vue-router'
//导入 登录 试图组件
import Login from "@/views/Login.vue"
import Index from "@/views/Index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //管理 所有的 路由
  routes: [
    //定义 路由、一个 路由是一个对象、路由 包含 路由地址、路由名称、和对应的 视图页面
    {
      path:"/login", //设置 登录路由地址
      name:"login",  //设置 登录路由名称
      component: Login, //设置 路由对应的视图
    },
    {
      path:"/", //定义 首页路由地址
      name:"index",  //设置 首页路由名称
      component: Index, //设置 首页视图
    },
    {
      path:"/register", //设置 注册页面路由地址
      name:"register",  //设置 注册页面路由名称
      component: ()=>import('@/views/Register.vue'), //设置 注册路由对应的视图
    },
    {
      path:"/goodshow",// 设置 商品路由地址
      name:'goodshow',//设置 商品路由名称
      component: ()=>import("@/views/Goodshow.vue"),//设置 商品路由对应的视图
    }
  ],
})

export default router
