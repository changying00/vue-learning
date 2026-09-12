import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


const CURRENT_USER_KEY = "current-user"

export const useUserStore = defineStore('user', () => {
  // 定义当前登录的用户
  const user = ref({
    id: null,
    name: null,
    role: null
  })
  // 设置用户
  function setUser({sub, name, role}) {
    user.value = {
       id: sub,
       name: name,
       role: role
    }
    // 存储用户 到 本地存储中
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user.value)) ;
  }
  // 定义一个函数、用来获取当前登录的用户, 该函数不需要对外暴漏
  function currentUser() {
      if (user.value.id == null) {
         // 尝试 从 本地存储中获取 
         const data = localStorage.getItem(CURRENT_USER_KEY) 
         // 如果 结果 为 null, 说明 没有登录 
         if (data != null) {
            user.value = JSON.parse(data) ;
         }
      }
      return user.value ;
  }

  function logout() {
    // 退出登录，清空数据
    localStorage.removeItem(CURRENT_USER_KEY);
    user.value = {
      id: null,
      name: null,
      role: null
    }
  }

  // 验证是否登录
  const isLoggedIn = computed(() => currentUser()?.id != null)

  const roleText = computed(() => {
    const roleMap = {'1': '学生','2': '教师'}
    return roleMap[user.value.role] || ''
  })

  return { user, setUser, logout, isLoggedIn, roleText }
})
