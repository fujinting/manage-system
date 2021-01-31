<template>
  <div class="practice-base">
    <!-- 查询框 -->
    <div class="header">
      <div class="search">
        <!-- 查询 -->
        <el-input
          style="width: 430px"
          placeholder="请输入 基地名称"
          v-model="selectInput"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="基地名称" value="1"></el-option>
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
          action="http://howling.top:8001/System/teachingPracticeBase/readExcel"
          :headers="headers"
          :on-success="uploadSuccess"
          :auto-upload="true"
          accept=".xlsx"
          :show-file-list="uploadShowList"
        >
          <el-button type="primary" icon="el-icon-folder-add" v-if="role == 'v1'">导入</el-button>
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

    <el-table
      :data="tableData"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="50"  label="序号"> </el-table-column>
      <el-table-column prop="name" label="基地名称" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="place" label="基地地点" width="260" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="constructionUnit" label="建设或依托单位" width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="application" label="用途" width="100">
      </el-table-column>
      <el-table-column prop="sourceFund" label="经费来源" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作" width="210" fixed="right">
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

    <!-- 弹窗 -->
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
        <pra-bas-view :form="form" />
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
import practiceBaseView from '@/components/private/practiceBaseView';
import {
  deletPracticeBaseInformation,
  getPracticeBaseInformation,
  addPracticeBaseInformation,
  editPracticeBaseInformation,
  selectPracticeBaseInformation,
  downloadTemplateFile,
  downloadPracticeBaseInformation,
} from '@/api/api';
export default {
  name: 'practiceBase',
  data() {
    return {
      headers: {},
      uploadShowList: false,
      check: '',
      form: {},
      title: '',
      selectInput: '',
      select: '1',
      currentPage: 1,
      pagesize: 7,
      total: 0,
      page: 0,
      // 权限
      role: '',
      // 弹框的显示隐藏
      centerDialogVisible: false,
      // 提交和确定按钮的显示隐藏
      submitshow: true,
      determineshow: true,
      // 是否点击查询
      isClick: false,

      tableData: [],
      queryData: {},
    };
  },
  created() {
    this.init();
    this.headers = { token: localStorage.getItem('Authorization') || '' };
    this.role = window.localStorage.getItem("role");
  },
  methods: {
    // 获取教学实践基地列表
    init() {
      this.role = window.localStorage.getItem('role');
      getPracticeBaseInformation({
        current: this.currentPage,
        size: this.pagesize,
      }).then((res) => {
        // console.log(res);
        this.total = res.data.data.total;
        this.page = res.data.pages;
        this.tableData = res.data.data.list;
      });
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.title = '编辑信息';
      this.determineshow = false;
      this.submitshow = true;
      this.form = row;
    },

    //查看
    handlevieView(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.title = '查看信息';
      var copyrow = Object.assign({}, row);
      this.form = copyrow;
      this.determineshow = false;
      this.submitshow = false;
    },

    //删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let _id = row.id;
          deletPracticeBaseInformation({ id: _id }).then((res) => {
            console.log(res);
            this.currentPage=1
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

    //添加
    add() {
      this.title = '添加信息';
      this.form = {};
      this.centerDialogVisible = true;
      this.submitshow = false;
      this.determineshow = true;
    },

    // 查询
    search() {
      this.isClick = true;
      if (this.select == '1') {
        if (this.selectInput == '') {
          this.init();
        } else {
          this.queryData = { name: this.selectInput };
          selectPracticeBaseInformation(this.queryData,
            {
              current: this.currentPage,
              size: this.pagesize,
            }
          ).then((res) => {
            if (res.data.data.length == 0) {
              this.$message.error(res.data.message);
            } else {
              console.log(res);
              this.page = res.data.data.pages;
              this.total = res.data.data.total;
              this.tableData = res.data.data.list;
            }
          });
        }
      }
    },
    // 编辑的提交按钮
    submit() {
      if(this.form.name == undefined){
        this.$message.error('基地名称不能为空');
        return;
      }
      if(this.form.place == undefined){
        this.$message.error('基地地点不能为空');
        return;
      }
      editPracticeBaseInformation(this.form).then((res) => {
        console.log(res);
        this.init();
      });
      this.centerDialogVisible = false;
    },

    // 添加的确定按钮
    determine() {
      if(this.form.name == undefined){
        this.$message.error('基地名称不能为空');
        return;
      }
      if(this.form.place == undefined){
        this.$message.error('基地地点不能为空');
        return;
      }
      addPracticeBaseInformation(this.form).then((res) => {
        console.log(res);
        this.selectInput = ''
        this.init();
      });
      this.centerDialogVisible = false;
    },
    // 导入导出功能================================================================================
    // 下载模板
    downloadTemplate() {
      downloadTemplateFile({
        template: 'sheet16',
      }).then((res) => {
        // window.location.href = res.request.responseURL;
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
      downloadPracticeBaseInformation(this.queryData).then((res) => {
        // window.location.href = res.request.responseURL;
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
      link.setAttribute('download', 'sheet15.xlsx');

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
    'pra-bas-view': practiceBaseView,
  },
};
</script>

<style lang="scss" scoped>
.practice-base {
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
