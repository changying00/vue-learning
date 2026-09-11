import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,  // 启用严格模式
  routes: [
    {
      path:"/test",
      name:'test',
      component: () => import("@/views/Test.vue"),
      sensitive: true  // 区分大小写

    },
    {
      path:"/test1",
      name:"test1",
      component:() => import('@/views/Test1.vue')
    }
  ],
})

export default router
