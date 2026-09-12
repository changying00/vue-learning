<template>
<el-card shadow="never">

  <template #header>
    我的咖啡券
  </template>

  <el-tabs>

    <el-tab-pane
      label="全部"
    />

    <el-tab-pane
      label="待审核"
    />

    <el-tab-pane
      label="已审核"
    />

    <el-tab-pane
      label="已使用"
    />

    <el-tab-pane
      label="已作废"
    />

  </el-tabs>

  <el-table
    :data="tableData"
  >
    <el-table-column
      prop="id"
      label="券号"
    />

    <el-table-column
      prop="name"
      label="审核老师"
    />

    <el-table-column
      prop="stateText"
      label="状态"
    />

    <el-table-column
      prop="applyTime"
      label="申请时间"
    />

    <el-table-column
      prop="effectTime"
      label="失效时间"
    />

    <el-table-column label="操作" :width="180">
        <template #default>
          <el-button
            type="success"
            size="small" 
            @click="openDialog(1)"
          >
            使用
          </el-button>

          <el-button
            type="warning"
            size="small" 
          >
            删除
          </el-button>
        </template>
      </el-table-column>
  </el-table>

  <div
    style="margin-top:20px"
  >
    <el-pagination
      background
      :pager-count="5"
      layout="prev,pager,next"
      :total="100"
    />
  </div>

</el-card>


<!-- 二维码弹出层 -->
<el-dialog v-model="centerDialogVisible" title="咖啡券二维码(微信扫一扫即可使用)" width="400" :center="false" :destroy-on-close="true">
    <img :src="qrcodeURL"/>
</el-dialog>

</template>

<script setup>
import { ref } from 'vue';
import QRCode from 'qrcode'

const qrcodeURL = ref(null)

const centerDialogVisible = ref(false);

const tableData = ref([
  {
    id: '123456',
    name: '张老师',
    stateText: '待审核',
    applyTime: '2024-06-01 10:00:00',
    effectTime: '2024-06-08 10:00:00'
  },
  {
    id: '234567',
    name: '李老师',
    stateText: '已审核',
    applyTime: '2024-06-02 11:00:00',
    effectTime: '2024-06-08 10:00:00'
  },
  {
    id: '345678',
    name: '王老师',
    stateText: '已使用',
    applyTime: '2024-06-03 12:00:00',
    effectTime: '2024-06-08 10:00:00'
  },
  {
    id: '456789',
    name: '赵老师',
    stateText: '已作废',
    applyTime: '2024-06-04 13:00:00',
    effectTime: '2024-06-08 10:00:00'
  }
]);

// 打开二维码 
const openDialog = async (cid) => {
    // 打开弹出层
    centerDialogVisible.value = true; 
    // 获取当前请求地址 (需要替换为真实的 URL)
    const url = `${location.protocol}//${location.host}/verfiy/coffee` 

    console.log(url)
    // 显示二维码
    qrcodeURL.value = await QRCode.toDataURL(url, {
        width: 300
    })

}
</script>

<style scope>

.el-card {
    height: 700px;
}
.el-dialog__body {
    text-align: center;
}

</style>