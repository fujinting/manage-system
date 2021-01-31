<template>
  <div>
    <el-form ref="form" :model="ruleForm" label-width="80px" :rules="rules">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          placeholder="请输入原密码"
          v-model="ruleForm.oldPassword"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="password">
        <el-input
          placeholder="请输入新密码"
          v-model="ruleForm.password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="requirepwd">
        <el-input
          placeholder="确认密码"
          v-model="ruleForm.requirepwd"
          @blur="requirePassword"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="resetPwd">重置</el-button>
        <el-button type="success">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { resetPassword } from "@/api/api";
import { removeLocalStorage } from '@/utils/local-storage.js'


export default {
  data() {
    return {
      ruleForm: {
        oldPassword: "",
        password: "",
        requirepwd: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "原密码为6-12位密码",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "新密码为6-12位密码",
            trigger: "blur",
          },
        ],
        requirepwd: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "确认密码为6-12位密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetPwd() {
      if (this.ruleForm.password == this.ruleForm.requirepwd) {
        this.$confirm("确认修改密码吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            resetPassword({
              oldPwd: this.ruleForm.oldPassword,
              password: this.ruleForm.password,
            }).then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                setTimeout(() => {
                  removeLocalStorage("Authorization");
                  removeLocalStorage("role");
                  this.$router.push({ name: "login" });
                }, 500);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
      }
    },
    requirePassword() {
      if (this.ruleForm.password != this.ruleForm.requirepwd) {
        this.$message({
          message: "请确保密码与输入密码一致",
          type: "warning",
        });
      }
    },
  },
  created() {},
};
</script>
<style>
.el-input {
  width: 300px;
}
</style>