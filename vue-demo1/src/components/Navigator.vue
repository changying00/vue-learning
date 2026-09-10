<template>
<div class="nav">
    <div class="title">奇酷课堂练习</div>
    <div class="link">
        <!-- RouterLink 实现的跳转 被称为 声明式 导航 -->
        <RouterLink :to="{name: 'index'}">首页</RouterLink>
        <RouterLink :to="{name: 'todolist'}">任务清单</RouterLink>
        <RouterLink :to="{name: 'test'}">测试页</RouterLink>
    </div>
    <div class="link-right">
        <RouterLink :to="{name: 'login'}">登录</RouterLink>
        <RouterLink :to="{name: 'register'}">注册</RouterLink>
    </div>
</div>
</template>

<!-- 
编程式导航 :  如何使用 JS 代码 实现 路由跳转 
-->
<script setup>
// 导入 RouterLink 组件
import { RouterLink } from 'vue-router';
</script>



<style scoped>
.nav {
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 0 40px;
    height: 70px;
    background: linear-gradient(135deg, #3E2723 0%, #4E342E 50%, #5D4037 100%);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 3px solid #8B7355;
}

.title {
    font-size: 22px;
    font-weight: 700;
    color: #FFD700;
    letter-spacing: 3px;
    font-family: 'Georgia', serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.link {
    display: flex;
    gap: 10px;
}

.link-right {
    display: flex;
    gap: 10px;
    margin-left: auto;
}

.link a,
.link-right a {
    color: #DEB887;
    text-decoration: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-size: 15px;
    font-family: 'Georgia', serif;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    letter-spacing: 1px;
}

.link a:hover,
.link-right a:hover {
    color: #FFD700;
    background: rgba(139, 69, 19, 0.3);
    border-color: #8B7355;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

/* 当前激活的链接样式 */
.link a.router-link-active,
.link-right a.router-link-active {
    color: #FFD700;
    background: rgba(139, 69, 19, 0.4);
    border-color: #D2691E;
}
</style>