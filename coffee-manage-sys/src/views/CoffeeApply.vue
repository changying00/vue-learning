<template>

<el-card shadow="never">
  <template #header>
    申请咖啡券
  </template>

  <el-form label-width="100px">

    <el-form-item label="申请原因" label-position="top">

      <el-input type="textarea" />

    </el-form-item>

    <el-form-item label="审核老师" label-position="top">

      <el-select placeholder="选择审核教师">
        <el-option
          label="张老师"
          value="1"
        />

        <el-option
          label="李老师"
          value="2"
        />
      </el-select>

    </el-form-item>

    <el-button
      type="primary"
    >
      提交申请
    </el-button>

  </el-form>

</el-card>
</template>

<style scope>

.el-select {
    border: 1px solid #dcdfe6;
}

.el-textarea__inner {
    height: 420px;
}

@media (max-width: 768px) {
  .el-textarea__inner {
    height: 120px;
  }

}

</style>
