<template>
 
    <el-container>
      <el-aside width="auto">
        <el-menu
          router
          text-color="#BFCBD9"
          background-color="#304156"
          @close="handleClose"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          style="height: 100vh; overflow-x: hidden;"
          :collapse-transition="false"
          :default-active="$route.path"
        >
          <el-menu-item index="/dashboard" style="margin-left: 6px">
            <i class="el-icon-menu"></i>
            <span slot="title" style="font-size: 15px">首页</span>
          </el-menu-item>

          <el-submenu
            style="padding: 0 5px 0 5px"
            :index="index + ''"
            v-for="(item, index) in sidedata"
            :key="index"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item
                style="font-size: 12px"
                v-for="(v, i) in item.children"
                :key="i"
                :index="v.roter"
                >{{ v.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="height:92px">
          <div class="header-one">
            <div class="collapse">
              <span>
                <i
                  class="el-icon-s-fold"
                  style="font-size: 28px"
                  v-show="!isCollapse"
                  @click="_isShow"
                ></i>
              </span>

              <span>
                <i
                  class="el-icon-s-unfold"
                  style="font-size: 28px"
                  v-show="isCollapse"
                  @click="_isShow"
                ></i>
              </span>
            </div>

            <h-avatar />
          </div>

          <h-bread></h-bread>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
 
</template>

<script>
import sidedata from "@/localdata/sidebar.json";
import BreadCrump from "@/components/common/BreadCrump";
import Avatar from '@/components/common/Avatar'

export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    return {
      tableData: Array(20).fill(item),
      isCollapse: false,
      isShow: true,
      sidedata: null,
    };
  },
  components: {
    'h-bread': BreadCrump,
    'h-avatar': Avatar,
  },
  methods: {
    handleClose(key, keyPath) {},
    handleOpen(key, keyPath) {},

    //点击侧边栏收缩
    _isShow() {
      this.isCollapse = !this.isCollapse;
    },
  },
  created() {
    console.log('尤雨溪曾经说过 当你不知道该不该用vuex的时候 就不用vuex');
    this.sidedata = sidedata.data;
    console.log(sidedata.data);
  },
};
</script>
<style lang="scss" scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  width: 200px;
}
.el-submenu span {
  font-size: 15px;
}
.collapse {
  margin: 16px 0;
  cursor: pointer;
  width: 200px;
}

html,
body {
  padding: 0;
  margin: 0;
}
.el-header {
  background-color: whitesmoke;
  color: #333;
  
}

.bread-crumbs {
  height: 45px;
  padding: 4px 0 0 0;
  box-sizing: border-box;
}
.el-breadcrumb-item {
  margin-top: 10px;
}
.header-one {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

</style>
