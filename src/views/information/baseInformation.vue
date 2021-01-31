<template>
  <div class="base-information">
    <div class="header">
      <div class="search">
        <!-- 查询 -->
        <el-input
          style="width: 430px"
          placeholder="请输入 姓名/职称/最高学历 查询教师"
          v-model="selectInput"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="1"></el-option>
            <el-option label="职称" value="2"></el-option>
            <el-option label="最高学历" value="3"></el-option>
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
          v-if="role == 'v1'"
          >添加教师</el-button
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
          action="http://howling.top:8001/System/teacher/readExcel"
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

    <el-table
      :data="tableData"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="teacherId" label="教职工号" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="110"> </el-table-column>

      <el-table-column prop="birthday" label="出生年月" width="150"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="80"> </el-table-column>
      <el-table-column prop="title" label="职称" width="120"></el-table-column>

      <el-table-column prop="education" label="最高学历" width="110"></el-table-column>
      <el-table-column prop="degree" label="最高学位" width="110"></el-table-column>
      <el-table-column
        prop="degreeTime"
        label="最高学位获得时间"
        width="150"
      ></el-table-column>

      <el-table-column label="操作" fixed="right" width="260">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleView(scope.$index, scope.row)"
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
            v-if="role == 'v1'"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
      <!-- 查看的dialog -->

      <el-dialog
        disabled
        class="prop"
        :title="title"
        :visible.sync="centerDialogVisible"
        width="60%"
        center
        :close-on-click-modal="false"
      >
        <base-infor-view :form="form" :dictionary="dictionary" :age1="age1" />

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
import BaseInformationView from '@/components/private/BaseInformationView.vue';
import {
  getTeacherBaseInformationList,
  editTeacherBaseInformation,
  deleteTeacherBaseInformation,
  selectTeacherBaseInformation,
  downloadTeacherEduProInfoList, //导出
  addTeacherEduProInfoList,
  downloadTemplateFile,
} from '@/api/api';

export default {
  name: 'baseinformation',
  data() {
    return {
      uploadShowList: false,
      form: {},
      check: '',
      title: '',
      currentPage: 1,
      pagesize: 8,
      total: 0,
      page: 0,
      role: '',
      isClick: false,
      dictionary: {},
      centerDialogVisible: false,
      submitshow: true,
      determineshow: true,
      tableData: [],
      select: '1',
      selectInput: '',
      fileData: '',
      queryData: {},
      headers: {},
      //年龄,教龄
      age1: true,
    };
  },
  created() {
    this.init();
    this.headers = { token: localStorage.getItem('Authorization') || '' };
    this.role = window.localStorage.getItem('role');
  },
  methods: {
    //教师基本情况列表
    init() {
      getTeacherBaseInformationList({
        current: this.currentPage,
        limit: this.pagesize,
      }).then((res) => {
        this.dictionary = res.data.data.dictionary;
        this.page = res.data.data.pages;
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
        console.log(res.data.data);
      });
    },
    // 查看的dialog
    handleView(index, row) {
      console.log(index, row);
      this.age1 = true;
      this.title = '查看信息';
      const row1 = {};
      Object.assign(row1, row);
      console.log(row1);
      this.form = row1;
      console.log(row1);
      this.centerDialogVisible = true;
      this.submitshow = false;
      this.determineshow = false;
    },

    // 编辑
    handleEdit(index, row) {
      this.age1 = false;
      console.log(index, row);
      this.title = '编辑信息';
      this.centerDialogVisible = true;
      this.form = row;
      this.determineshow = false;
      this.submitshow = true;
      // console.log(this.form);
    },

    //添加
    add() {
      this.form = {};
      this.title = '添加信息';
      this.age1 = false;
      this.centerDialogVisible = true;
      this.determineshow = true;
      this.submitshow = false;
    },

    // 删除本行教师信息
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(row.id);
          let id = row.id;
          deleteTeacherBaseInformation({ id: id }).then((res) => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    // 编辑的提交按钮
    submit() {
      if (this.form.teacherId == undefined) {
        this.$message.error('教职工号不能为空');
        return;
      }
      if (this.form.name == undefined) {
        this.$message.error('姓名不能为空');
        return;
      }
      editTeacherBaseInformation(this.form).then((res) => {
        console.log(res);
        this.init();
      });
      this.centerDialogVisible = false;
    },

    // 添加的确定按钮
    determine() {
      if (this.form.teacherId == undefined) {
        this.$message.error('教职工号不能为空');
        return;
      }
      if (this.form.name == undefined) {
        this.$message.error('姓名不能为空');
        return;
      }
      addTeacherEduProInfoList(this.form).then((res) => {
        console.log(res);
        this.selectInput = '';
        this.init();
      });
      this.centerDialogVisible = false;
    },
    // 按照条件查询
    search() {
      this.isClick = true;
      // console.log(this.selectInput)
      if (this.select == '1') {
        this.queryData = { name: this.selectInput };
        selectTeacherBaseInformation(this.queryData, {
          current: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          console.log(res);
          this.page = res.data.data.pages;
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      } else if (this.select == '2') {
        this.queryData = { title: this.selectInput };
        selectTeacherBaseInformation(this.queryData, {
          current: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          this.page = res.data.data.pages;
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      } else {
        this.queryData = { education: this.selectInput };
        selectTeacherBaseInformation(this.queryData, {
          current: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          this.page = res.data.data.pages;
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      }
    },

    //导入导出功能================================================================================
    // 下载模板
    downloadTemplate() {
      downloadTemplateFile({
        template: 'sheet01',
      }).then((res) => {
        // window.location.href = res.request.responseURL;
        console.log(res.data);
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
      downloadTeacherEduProInfoList(this.queryData).then((res) => {
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
      link.setAttribute('download', 'sheet01.xlsx');

      document.body.appendChild(link);
      link.click();
    },

    // 分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // this.init();
      if ((this.isClick = false)) {
        this.init();
      } else {
        this.search();
      }
    },
  },
  components: {
    'base-infor-view': BaseInformationView,
  },
};
</script>

<style lang="scss" scoped>
.base-information {
  width: 100%;
  box-sizing: border-box;
  .el-input:first-of-type {
    width: 37%;
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
