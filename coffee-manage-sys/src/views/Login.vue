<template>
  <div class="page-center">

    <div
      class="glass-card"
      style="width:750px;padding:40px"
    >
      <div class="page-title">
        咖啡券领取系统
      </div>

      <el-form auto-complete="off" ref="formRef" :model="form">

        <el-form-item prop="tel">
          <el-input placeholder="请输入手机号" v-model="form.tel" size="large">
            <template #prefix>
                <el-icon>
                <Iphone />
                </el-icon>
            </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" show-password size="large">

            <template #prefix>
                <el-icon>
                <Lock />
                </el-icon>
            </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="role">
          <el-select
            placeholder="选择角色"
            v-model="form.role"
            size="large"
          >
            <template #prefix>
                <el-icon>
                <User />
                </el-icon>
            </template>
            <el-option
              label="学生"
              value="1"
            />
            <el-option
              label="教师"
              value="2"
            />
          </el-select>
        </el-form-item>

        <el-button
          type="primary"
          size="large"
          style="width:100%"
          @click="onSubmit(formRef)"
        >
          登录
        </el-button>

        <div style="text-align: center; margin-top: 20px;">
          <span>没有账号？</span>
          <router-link to="/register" style="color: #409eff; text-decoration: none; cursor: pointer;">去注册</router-link>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/counter";
import { ElMessage } from "element-plus";
import API from '../api/index.js' ;
import Token from '../api/token.js' ;
import {layer} from 'vue3-layer';

const router = useRouter();
const userStore = useUserStore();
const formRef = ref(null);

// 定义 表单数据
const form = reactive({
  tel: "",
  password: "",
  role: ""
});

const onSubmit = (formRef) => {
    // 表单验证
    if (!form.tel || !form.password || !form.role) {
      layer.msg("请填写所有字段");
      return;
    }

    API.login(form).then(response => {
        if (response.status) {
            // 接口调用成功、存储令牌 
            let {sub, name, role } = Token.saveToken(response.data.accessToken, response.data.refreshToken, true);
            // 存储数据到 Pinia 中
            userStore.setUser({sub, name, role }) ;
            ElMessage.success("登录成功");
             // 重定向到首页或仪表板
             if (form.role === "1") {
                 router.push({name: "student-center"});
             }else {
                 router.push({name: "teacher-center"});
             }
        }else {
            layer.msg(response.error.invalid)
        }
    })
};

</script>

