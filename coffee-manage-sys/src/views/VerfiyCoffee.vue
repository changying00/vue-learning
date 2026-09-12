<template>
  <SysNav />
 <div class="voucher-page">

    <div class="voucher-card glass-card">

      <div class="voucher-header">

        <div class="coffee-icon">
          ☕
        </div>
        <div class="sub-title">
          Coffee Coupon
        </div>

      </div>

      <div class="info-list">

        <div class="info-item">
          <span>学生姓名</span>
          <strong>李小明</strong>
        </div>

        <div class="info-item">
          <span>手机号</span>
          <strong>133****4567</strong>
        </div>

        <div class="info-item">
          <span>班级</span>
          <strong>Python2308</strong>
        </div>

        <div class="info-item">
          <span>领取时间</span>
          <strong>2023-11-26</strong>
        </div>

        <div class="info-item">
          <span>审核教师</span>
          <strong>张四平</strong>
        </div>

        <div class="info-item">
          <span>截止时间</span>
          <strong>2023-12-01</strong>
        </div>

      </div>

      <div class="status-box">

        <span>券状态</span>

        <el-tag
          type="success"
          effect="dark"
          round
        >
          有效
        </el-tag>

      </div>

      <el-button
        class="consume-btn"
        type="primary"
      >
        确认消费
      </el-button>

    </div>

  </div>
</template>

<script setup>
import SysNav from '../components/SysNav.vue'
</script>

<style scoped>
.voucher-page {
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 40px;

    background:
        linear-gradient(
            135deg,
            #667eea,
            #764ba2
        );
}

.voucher-card {
    width: 800px;
    border-radius: 32px;

    padding: 40px;
    background:
      rgba(255,255,255,.12);

    backdrop-filter: blur(30px);
    border:
      1px solid rgba(255,255,255,.18);

    box-shadow:
      0 20px 60px rgba(0,0,0,.15);
}

.voucher-header {
    text-align: center;
    margin-bottom: 40px;
}

.coffee-icon {
    width: 80px;
    height: 80px;

    margin: auto;

    border-radius: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 40px;

    background:
      linear-gradient(
        135deg,
        #60a5fa,
        #8b5cf6
      );

    color: white;

    box-shadow:
      0 10px 30px rgba(99,102,241,.4);
}

.voucher-header h1 {
    color: white;
    margin-top: 15px;
}

.sub-title {
    color: rgba(255,255,255,.7);
}

.info-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 24px;

    border-radius: 16px;

    background:
      rgba(255,255,255,.08);

    border:
      1px solid rgba(255,255,255,.12);
}

.info-item span {
    color: rgba(255,255,255,.8);
}

.info-item strong {
    color: white;
}

.status-box {
    margin-top: 25px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 24px;

    border-radius: 16px;

    background:
      rgba(255,255,255,.08);
}

.status-box span {
    color: rgba(255,255,255,.8);
}

.consume-btn {
    width: 100%;

    height: 54px;
    margin-top: 30px;
    border: none;
    border-radius: 16px;
    font-size: 18px;
    font-weight: 700;
    background:
      linear-gradient(
        135deg,
        #60a5fa,
        #8b5cf6
      ) !important;

    box-shadow:
      0 10px 30px rgba(99,102,241,.4);
}

@media (max-width: 768px) {
  .voucher-page {
    padding: 10px;
  }
  .voucher-card {
    width: 100%;
    padding: 20px;
  }
}
</style>
