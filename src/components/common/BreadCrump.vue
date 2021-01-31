<template>
<!-- 面包屑 -->
        <div class="bread-crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item >{{routee}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
</template>

<script>

export default {
    data(){
        return{
            
        }
    },
   created(){
       this.init()
   },
   methods:{
       init(){
          
       }
   },
   computed:{
       routee:function(){
           return this.$route.meta.cname
       }
   }
}
</script>
<style>
    
</style>
