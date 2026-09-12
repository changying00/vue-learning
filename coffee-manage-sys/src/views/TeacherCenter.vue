<template>
   <SysNav />

  <div class="glass-card content">

    <h2>
      待审核咖啡券
    </h2>

    <el-table
      :data="tableData"
    >

      <el-table-column
        prop="studentName"
        label="学生"
      />

      <el-table-column
        prop="className"
        label="班级"
      />

      <el-table-column
        prop="reason"
        label="申请原因"
      />

      <el-table-column
        prop="createTime"
        label="申请时间"
      />

      <el-table-column
        label="操作"
      >
        <template #default>

          <el-button
            type="success"
            size="small"
          >
            通过
          </el-button>

          <el-button
            type="danger"
            size="small"
          >
            驳回
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <div style="margin-top:20px">
      <el-pagination
        background
        :pager-count="5"
        layout="prev,pager,next"
        :total="100"
      />
    </div>

  </div>

</template>

<script setup>

import SysNav from '../components/SysNav.vue'

const tableData = [
  {
    studentName: "张三",
    className: "高一(1)班",
    reason: "学习努力，成绩优异",
    createTime: "2024-06-01 10:00:00"
  },
  {
    studentName: "李四",
    className: "高一(2)班",
    reason: "积极参与班级活动",
    createTime: "2024-06-02 11:30:00"
  },
  {
    studentName: "王五",
    className: "高一(3)班",
    reason: "帮助同学解决问题",
    createTime: "2024-06-03 14:15:00"
  }
];

</script>

<style scoped>
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
  }
}
</style>