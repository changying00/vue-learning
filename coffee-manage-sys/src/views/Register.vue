<template>
  <div class="page-center">

    <div
      class="glass-card"
      style="width:720px;padding:40px"
    >
      <div class="page-title">
        用户注册
      </div>

      <el-form>
        <el-form-item>
          <el-input placeholder="请输入手机号" v-model="form.tel" size="large">
            <template #prefix>
                <el-icon>
                <Iphone />
                </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
            <el-input placeholder="请输入密码" v-model="form.password" show-password size="large">
                <template #prefix>
                    <el-icon>
                    <Lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="请确认密码" v-model="form.confirmPassword" show-password size="large">
                <template #prefix>
                    <el-icon>
                    <Lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="请输入真实姓名" v-model="form.name" size="large">
            <template #prefix>
                <el-icon>
                <User />
                </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="请输入班级" v-model="form.className" size="large">
            <template #prefix>
                <el-icon>
                <School />
                </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
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
          style="width:100%" size="large"
          @click="onSubmit"
        >
          注册
        </el-button>

        <div style="text-align: center; margin-top: 20px;">
          <span>已有账号？</span>
          <router-link to="/login" style="color: #409eff; text-decoration: none; cursor: pointer;">去登录</router-link>
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
import {layer} from 'vue3-layer';
import API from '../api/index.js' ;

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  tel: "",
  password: "",
  confirmPassword: "",
  name: "",
  className: "",
  role: ""
});

const onSubmit = () => {
  // 表单验证
  if (!form.tel || !form.password || !form.confirmPassword || !form.name || !form.role) {
    layer.msg("请填写所有必填字段");
    return;
  }

  if (form.password !== form.confirmPassword) {
    layer.msg("两次输入的密码不一致");
    return;
  }
  API.registerUser({name: form.name, tel: form.tel, password: form.password, role: form.role, className: form.className}).then(response => {
      if (response.status) {
         ElMessage.success("注册成功");
         router.push({name: "login"});
      }else {
         layer.msg(response.error.invalid)
      }

  })
 
};

</script>