<template>
  <div class="tem-experience">
    <!-- 查询框 -->
    <div class="header">
      <div class="search">
        <!-- 查询 -->
        <el-input
          style="width: 430px"
          placeholder="请输入 姓名/职称"
          v-model="selectInput"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="1"></el-option>
            <el-option label="职称" value="2"></el-option>
          </el-select>

          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </div>

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
          action="http://howling.top:8001/System/teacherAppoint/readExcel"
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
      <el-table-column type="index" fixed="left" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="teacherId" label="教职工号" width="160"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="title" label="职称" width="100"></el-table-column>
      <el-table-column prop="education" label="最高学历" width="100"></el-table-column>
      <el-table-column prop="degree" label="最高学位" width="100"></el-table-column>
      <el-table-column
        prop="temporaryWorkUnit"
        label="挂职单位"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="temporaryJobs"
        label="挂职岗位"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="210">
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
        :total="totals"
        :page-count="pages"
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="handleChange"
        :current-page="currentPage"
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
        width="60%"
        center
        :close-on-click-modal="false"
      >
        <tem-exper-view
          :form="form"
          :getInit="getInit"
          :editshow="editshow"
          :addshow="addshow"
        />

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" v-show="submitshow" @click="submit()"
            >提 交</el-button
          >
          <el-button type="primary" v-show="determineshow" @click="determine"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TemExperienceView from '@/components/private/TemExperienceView';
import {
  getTemExperienceInformation,
  deletTemExperienceInformation,
  addTemExperienceInformation,
  editTemExperienceInformation,
  selectTemExperienceInformation,
  downloadExcelTemplate,
  downloadTemplateFile,
} from '@/api/api';
export default {
  name: 'temexperience',
  data() {
    return {
      uploadShowList: false,
      value: '',
      check: '',
      selectInput: '',
      title: '',
      currentPage: 1,
      pagesize: 8,
      select: '1',
      //弹出的显示隐藏
      centerDialogVisible: false,
      //提交确定按钮的显示隐藏
      submitshow: true,
      determineshow: true,
      //子组件的表单的显示隐藏
      editshow: true,
      addshow: true,
      totals: 0,
      pages: 0,
      getInit: {},
      form: {},
      tableData: [],
      isClick: false,
      queryData: {},
      headers: {},
      role: '',
      uploadShowList: false,
    };
  },
  created() {
    this.init();
    this.role = window.localStorage.getItem('role');
    this.headers = { token: localStorage.getItem('Authorization') || '' };
  },
  methods: {
    handleChange(val) {
      this.currentPage = val;
      console.log(val);
      if (this.isClick == false) {
        this.init(); //查询所有
      } else {
        this.search(); //条件查询
      }
    },
    // 获得教师挂职列表
    init() {
      getTemExperienceInformation({
        current: this.currentPage,
        limit: this.pagesize,
      }).then((res) => {
        console.log(res.data.data);
        this.getInit = res.data.data;
        this.pages = res.data.data.pages;
        this.totals = res.data.data.total;
        this.tableData = res.data.data.teacherAppointList;
      });
    },

    //编辑
    handleEdit(index, row) {
      // console.log(index, row);
      this.centerDialogVisible = true;
      this.title = '编辑信息';
      this.form = row;
      this.submitshow = true;
      this.determineshow = false;
      this.editshow = false;
      this.addshow = false;
    },

    //查看
    handlevieView(index, row) {
      console.log(index, row);
      var copyrow = Object.assign({}, row);
      this.editshow = true;
      this.addshow = true;
      this.form = copyrow;
      this.centerDialogVisible = true;
      this.title = '查看信息';
      this.submitshow = false;
      this.determineshow = false;
    },

    //添加
    add() {
      this.form = {};
      this.centerDialogVisible = true;
      this.editshow = false;
      this.title = '添加信息';
      this.determineshow = true;
      this.submitshow = false;
      this.addshow = true;
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
          deletTemExperienceInformation({ id: _id }).then((res) => {
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

    // 按照条件查询
    search() {
      // console.log(111);
      if (this.select == '1') {
        this.queryData = { name: this.selectInput };
        selectTemExperienceInformation(this.queryData, {
          current: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          console.log(res);
          this.page = res.data.data.pages;
          this.total = res.data.data.total;
          this.tableData = res.data.data.teacherAppointList;
        });
      } else if (this.select == '2') {
        this.queryData = { title: this.selectInput };
        selectTemExperienceInformation(this.queryData, {
          current: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          this.page = res.data.data.pages;
          this.total = res.data.data.total;
          this.tableData = res.data.data.teacherAppointList;
          console.log(res);
        });
      }
    },

    //添加信息的确定按钮
    determine() {
      console.log(this.form.teacherId);
      if (this.form.teacherId == undefined) {
        this.$message.error('教职工号不能为空');
        return;
      }
      if (this.form.name == undefined) {
        this.$message.error('姓名不能为空');
        return;
      }
      console.log(this.form);
      addTemExperienceInformation(this.form).then((res) => {
        console.log(res);
        this.selectInput = '';
        this.init();
      });
      this.centerDialogVisible = false;
    },

    //编辑信息的提交按钮
    submit() {
      editTemExperienceInformation(this.form).then((res) => {
        console.log(res);
        this.init();
      });
      this.centerDialogVisible = false;
    },

    // 导入导出功能================================================================================

    // 下载模板
    downloadTemplate() {
      downloadTemplateFile({
        template: 'sheet03',
      }).then((res) => {
        // window.location.href = res.request.responseURL;
        this.download(res.data);
        this.$message({
          message: '下载成功',
          type: 'success',
        });
      });
    },
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
      downloadExcelTemplate(this.queryData).then((res) => {
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
      link.setAttribute('download', 'sheet03.xlsx');

      document.body.appendChild(link);
      link.click();
    },
  },
  components: {
    'tem-exper-view': TemExperienceView,
  },
};
</script>

<style lang="scss" scoped>
.tem-experience {
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
    .download-template {
      margin-right: 10px;
    }
  }
}
</style>
