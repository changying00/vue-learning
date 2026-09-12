<template>
  <SysNav />
  <div class="layout">

    <el-container>

      <el-aside>
          <el-menu default-active="1">
            <el-menu-item index="1" @click="$router.push({name: 'student-center'})">
              我的咖啡券
            </el-menu-item>
            <div class="nav-logo ">☕</div>    
            <el-menu-item index="2" @click="$router.push({name: 'student-apply'})">
              申请咖啡券
            </el-menu-item>
          </el-menu>
      </el-aside>

      <el-main>
        <div class="glass-card content">
          <RouterView />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import SysNav from '@/components/SysNav.vue'
</script>

<style scoped>

.el-aside {
    position: fixed;
    top: calc(50vh - 230px);
    left: 10px;
    width: 40px;
    height: 450px;
    border-radius: 30px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0);
}

.elel-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-menu-item {
    height: 200px;
    width: 100%;
    font-size: 16px;
    transition: all 0.3s;
    white-space: wrap !important;
    line-height: 20px;
    align-items: center;
    justify-content: center;
    outline: none;
}

.el-menu-item.is-active {
    background:
        linear-gradient(
            180deg,
            rgba(106,92,255,.35),
            rgba(76,81,191,.45)
        );

    backdrop-filter: blur(30px);
    border: 1px solid rgba(255,255,255,.12);
    box-shadow:
        0 20px 60px rgba(79,70,229,.25),
        inset 0 1px 0 rgba(255,255,255,.15);
    color: white;
}

.nav-logo {
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    background: rgba(255,255,255,.25);
    box-shadow:
      0 0 25px rgba(139,92,246,.5);
}

.content {
  width: 80%;
  margin: 30px auto ;  
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.content h2 {
  margin-bottom: 20px;
  color: #333;
}

@media (max-width: 768px) {
  .content {
    width: 95%;
    padding: 20px;
    margin: 30px 0px 30px 32px;
  }
}

</style>