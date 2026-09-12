<script setup>
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 背景 */
body {
  margin: 0;
  min-height: 100vh;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 50%,
      #6dd5ed 100%
    );

  background-size: 400% 400%;
  animation: gradientMove 12s ease infinite;

  font-family:
    Inter,
    "PingFang SC",
    "Microsoft YaHei",
    sans-serif;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* 毛玻璃 */
.glass-card {
  background: rgba(255,255,255,0.15);

  backdrop-filter: blur(18px);

  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,0.2);

  box-shadow: 0 8px 32px rgba(31,38,135,0.2);

  border-radius: 24px;
}

/* 页面居中 */
.page-center {
  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;
}

/* 标题 */
.page-title {
  text-align: center;

  color: white;

  font-size: 32px;

  font-weight: 700;

  margin-bottom: 30px;
}

/* Element */
.el-input__wrapper,
.el-select__wrapper {

    box-shadow:
        inset 0 0 0 1px rgba(255,255,255,.15) !important;

    border-radius: 14px;
    backdrop-filter: blur(10px);
    transition: all .3s;
}

input.el-input__inner:-internal-autofill-selected {
    background-color: #fff !important;
}



.el-input__wrapper.is-focus,
.el-select__wrapper.is-focused{
    box-shadow:
        inset 0 0 0 1px rgba(99,102,241,.8),
        0 0 20px rgba(99,102,241,.35) !important;
}
</style>
