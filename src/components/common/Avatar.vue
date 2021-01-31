<template>
    <el-dropdown>
      <span style="font-size:16px;font-weight:bold">{{ teacherId }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="forgetPassword" >个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="resetPassword">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
 
</template>

<script>

import { removeLocalStorage } from '@/utils/local-storage.js'

export default {
    data(){
      return {
        role:''
      }
    },
    created() {
        this.role = window.localStorage.getItem("role");
        this.teacherId = window.localStorage.getItem("teacherId");
    },
    methods:{
        exit(){
          removeLocalStorage('Authorization')
          removeLocalStorage('role')
            this.$router.push({name:'login'})
          
        },
        // 修改密码
        resetPassword(){
           this.$router.push({name:'resetpwd'})
        },
        // 个人中心
        forgetPassword(){
           this.$router.push({name:'forgetpwd'})

        }
        
    }
};
</script>

<style>
.header-img {
  width: 40px;
  height: 40px;
  margin: 15px 20px 0 0;
  border-radius: 10px;
}
</style>