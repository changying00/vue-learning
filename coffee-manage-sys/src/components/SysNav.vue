<template>
  <div class="sys-nav" v-if="userStore.isLoggedIn">
    <div class="nav-container">
      <!-- 系统名称 -->
      <div class="nav-title">
        <span class="system-name"><a class="logo">☕</a> 咖啡券领取系统</span>
      </div>

      <!-- 用户信息 -->
      <div class="nav-user-info">
        <div class="user-details">
          <span class="user-name">{{ userStore.user.name }}</span>
          <el-tag
            :type="userStore.user.role === '2' ? 'success' : 'primary'"
            size="small"
            style="margin-left: 12px;"
          >
            {{ userStore.roleText }}
          </el-tag>
        </div>
        <el-button
          type="danger"
          size="small"
          @click="handleLogout"
          style="margin-left: 20px;"
        >
          退出登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/counter'
import { useRouter } from 'vue-router'
import Token from '../api/token.js' ;

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  Token.removeCurrentUser()
  router.push({name: 'login'})
}
</script>

<style scoped>
.sys-nav {
  background: rgba(26, 44, 146, 0.76);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  color: #fff;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  display: flex;
  align-items: center;
  color: #fff;
}

.system-name {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.nav-user-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.user-details {
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}
.system-name .logo {
  background-color: #ffffffde;
  padding: 5px 10px;
  border-radius: 50%;
  font-size: 20px;
  box-shadow: 0 2px 12px rgba(0, 3, 2, 5);
  user-select: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    height: auto;
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .system-name {
    font-size: 16px;
  }

  .user-details {
    align-items: flex-start;
    gap: 8px;
  }

  .nav-user-info {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
