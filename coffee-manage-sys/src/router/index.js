import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
       path: '/',
       redirect: '/login'
     },
     {
       path: '/register',
       name: 'register',
       component: () => import('../views/Register.vue'),
     },
     {
       path: '/login',
       name: 'login',
       component: () => import('../views/Login.vue'),
     },
     {
       path: '/teacher/center',
       name: 'teacher-center',
       component: () => import('../views/TeacherCenter.vue'),
     },

     {
       path: '/student',
       component: () => import('../views/StudentCenter.vue'),
       children: [
          {
            path: 'center',
            name: 'student-center',
            component: () => import('../views/CoffeeList.vue'),
          },
          {
            path: 'apply',
            name: 'student-apply',
            component: () => import('../views/CoffeeApply.vue'),
          }
       ]
     },
     {
       path: '/verfiy/coffee',
       name: 'verfiy-coffee',
       component: () => import('../views/VerfiyCoffee.vue'),
     }
  ],
})

export default router
