<template>
  <div class="rese-project">
    <!-- 查询框 -->
    <div class="header">
      <div class="search">
        <!-- 查询 -->
        <el-input
          style="width: 430px"
          placeholder="请输入 项目名称/项目类型"
          v-model="selectInput"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="项目名称" value="1"></el-option>
            <el-option label="项目类型" value="2"></el-option>
          </el-select>

          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </div>
      <!-- 导入导出 -->
      <div class="import-export">
        <el-button
          class="addbtn"
          type="warning"
          size="default"
          icon="el-icon-circle-plus-outline"
          @click="add"
          style="margin-right: 10px"
          >添加</el-button
        >
        <el-button
          class="download-template"
          @click="downloadTemplate"
          icon="el-icon-download"
          type="danger"
          v-if="role == 'v1'"
          >下载模板</el-button
        >

        <el-upload
          class="import"
          action="http://howling.top:8001/System/researchProject/readExcel"
          :headers="headers"
          :on-success="uploadSuccess"
          :auto-upload="true"
          accept=".xlsx"
          :show-file-list="uploadShowList"
        >
          <el-button type="primary" icon="el-icon-folder-add" v-if="role == 'v1'"
            >导入</el-button
          >
        </el-upload>

        <el-button
          class="output"
          type="success"
          icon="el-icon-download"
          @click="downloadExcel"
          >导出</el-button
        >
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="id" label="项目编号" width="120"></el-table-column>
      <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
      <el-table-column prop="type" label="项目类型" width="200"></el-table-column>
      <el-table-column prop="head" label="负责人" width="80"></el-table-column>
      <el-table-column prop="fund" label="经费（万元）" width="110"></el-table-column>
      <el-table-column
        prop="turnUnit"
        label="批准单位"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="researchProjectLevel"
        label="项目级别"
        width="120"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="210">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handlevieView(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-count="page"
        :total="total"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog
        disabled
        class="prop"
        :title="title"
        :visible.sync="centerDialogVisible"
        :before-close="handleClose"
        width="60%"
        center
      >
        <res-pro-view :form="form" />

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialog">取 消</el-button>
          <el-button type="primary" v-show="submitshow" @click="submit()"
            >提 交</el-button
          >
          <el-button type="primary" v-show="determineshow" @click="determine()"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ReseProjectView from '@/components/private/ReseProjectView';
import {
  deletReseProjectInformation,
  selectReseProjectInformation,
  getReseProjectInformation,
  editReseProjectInformation,
  addReseProjectInformation,
  downloadTemplateFile,
  downloadReseProjectInformation,
} from '@/api/api';
export default {
  name: 'reseproject',
  data() {
    return {
      headers: {},
      uploadShowList: false,
      queryData: {},
      check: '',
      selectInput: '',
      select: '1',
      title: '',
      currentPage: 1,
      pagesize: 8,
      total: 0,
      page: 0,
      //是否点击搜索按钮
      isClick: false,
      // 权限
      role: '',
      // 提交和登录按钮显示隐藏
      submitshow: true,
      determineshow: true,
      // 弹窗的显示隐藏
      centerDialogVisible: false,
      form: {},
      tableData: [],
    };
  },
  created() {
    this.init();
    this.role = window.localStorage.getItem('role');
    this.headers = { token: localStorage.getItem('Authorization') || '' };
  },
  methods: {
    init() {
      this.role = window.localStorage.getItem('role');
      getReseProjectInformation({
        current: this.currentPage,
        limit: this.pagesize,
      }).then((res) => {
        console.log(res);
        this.total = res.data.data.total;
        this.page = res.data.data.pages;
        this.tableData = res.data.data.list;
      });
    },

    //查看
    handlevieView(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.title = '查看信息';
      var copyrow = Object.assign({}, row);
      this.form = copyrow;
      // this.show = false;
      this.determineshow = false;
      this.submitshow = false;
    },

    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.title = '修改信息';
      // this.show = true;
      this.submitshow = true;
      this.determineshow = false;
      this.form = row;
    },

    //添加
    add() {
      this.title = '添加信息';
      this.form = {};
      this.centerDialogVisible = true;
      this.submitshow = false;
      this.determineshow = true;
    },

    //删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
          let id = row.researchProjectId;
          deletReseProjectInformation(id).then((res) => {
            this.currentPage = 1
            this.init();
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },

    //编辑信息的提交按钮
    submit() {
      if (this.form.id == undefined) {
        this.$message.error('项目编号不能为空');
        return;
      }
      if (this.form.name == undefined) {
        this.$message.error('项目名称不能为空');
        return;
      }
      editReseProjectInformation(this.form).then((res) => {
        // alert(1)
        console.log(res);
        this.init();
      });
      this.centerDialogVisible = false;
    },

    //添加的确定按钮
    determine() {
      if (this.form.id == undefined) {
        this.$message.error('项目编号不能为空');
        return;
      }
      if (this.form.name == undefined) {
        this.$message.error('项目名称不能为空');
        return;
      }
      addReseProjectInformation(this.form).then((res) => {
        console.log(res);
        this.selectInput = '';
        this.init();
      });
      this.centerDialogVisible = false;
    },

    // 查询
    search() {
      this.isClick = true;
      if (this.select == '1') {
        this.queryData = { name: this.selectInput };
        selectReseProjectInformation(this.queryData, {
          current: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          this.page = res.data.data.pages;
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
          console.log(res);
        });
      } else {
        this.queryData = { type: this.selectInput };
        selectReseProjectInformation(this.queryData, {
          current: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          this.page = res.data.data.pages;
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      }
    },

    // 导入导出功能================================================================================
    // 下载模板
    downloadTemplate() {
      downloadTemplateFile({
        template: 'sheet05',
      }).then((res) => {
        this.download(res.data);
        this.$message({
          message: '下载成功',
          type: 'success',
        });
      });
    },

    // 导入导出功能================================================================================
    // 导入
    uploadSuccess: function(res) {
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: '导入成功',
          type: 'success',
        });
        this.init();
      } else if (res.code == 520) {
        this.$message.error('请不要导入已存在的老师信息');
      } else if (res.code == 521) {
        this.$notify({
          title: '提示',
          message: res.message,
          duration: 0,
        });
      }
    },
    // 导出
    downloadExcel() {
      downloadReseProjectInformation(this.queryData).then((res) => {
        this.download(res.data);
        this.$message({
          message: '导出成功',
          type: 'success',
        });
        console.log(res);
      });
    },
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', 'sheet05.xlsx');

      document.body.appendChild(link);
      link.click();
    },

    //分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.isClick == false) {
        this.init();
      } else {
        this.search();
      }
    },
    // 关闭弹框
    handleClose() {
      this.cancel();
    },
    centerDialog() {
      this.cancel();
    },
    cancel() {
      this.centerDialogVisible = false;
      if (this.isClick == true) {
        this.search();
      } else {
        this.init();
      }
    },
  },
  components: {
    'res-pro-view': ReseProjectView,
  },
};
</script>

<style lang="scss" scoped>
.rese-project {
  width: 100%;
  box-sizing: border-box;
  .el-input:first-of-type {
    width: 37%;
  }
  .addbtn {
    margin-left: 15px;
  }
  .page {
    text-align: center;
    margin-top: 20px;
  }
  .el-select {
    width: 110px;
  }
  .search {
    margin-bottom: 12px;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }

  .import-export {
    margin-right: 28px;
    .import {
      display: inline-block;
      margin-right: 10px;
    }
    .export {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .download-template {
    margin-right: 10px;
  }
}
</style>
