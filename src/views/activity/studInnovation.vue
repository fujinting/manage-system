<template>
  <div class="studlnnovation">
    <div class="header">
      <div class="search">
        <!-- 查询 -->
        <el-input
          style="width: 430px"
          placeholder="请输入 立项项目名称/项目类型/立项层次"
          v-model="selectInput"
        >
          <el-select
            v-model="select"
            style="width: 134px"
            slot="prepend"
            @change="datanull"
          >
            <el-option label="立项项目名称" value="1"></el-option>
            <el-option label="项目类型" value="2"></el-option>
            <el-option label="立项层次" value="3"></el-option>
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
        >
          添加
        </el-button>

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
          action="http://howling.top:8001/System/startupProject/readExcel"
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
          @click="downloadExcel"
          type="success"
          icon="el-icon-download"
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
      <el-table-column type="index" fixed="left" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="hostName" label="主持人姓名" width="120"></el-table-column>
      <el-table-column prop="studentId" label="学生学号" width="130"></el-table-column>
      <el-table-column prop="classes" label="所在专业班级" width="250" show-overflow-tooltip></el-table-column>
      <el-table-column prop="projectName" label="立项项目名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="fund" label="项目资助经费" width="110"></el-table-column>
      <el-table-column prop="teacherName" label="指导教师" width="120"></el-table-column>
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
        :total="totals"
        :page-count="pages"
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
    <!-- 弹框 -->
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
        <base-infor-view :form="form" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="cenDialogVisible">取 消</el-button>
          <el-button type="primary" v-show="show" @click="sumbit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import studlnnovationView from '@/components/private/studlnnovationView.vue';
import {
  getSelectAllStartupInfo,
  getEditStartupInfo,
  getDeleteStartupById,
  getStartupConditionalQuery,
  getInsertStartup,
  downloadTemplateFile,
  getStartupProjectWriteExcel,
} from '@/api/api';

export default {
  name: 'studlnnovation',
  data() {
    return {
      check: '',
      title: '',
      currentPage: 1,
      pagesize: 8,
      tableData: [],
      show: false,
      form: {},
      centerDialogVisible: false,
      selectInput: '',
      select: '1',
      role: "",
      pages: 0,
      totals: 0,
      isClick: false,
      queryData: {},
      headers: {},
      uploadShowList: false,
    };
  },
  created() {
    this.init();
    this.headers = { token: localStorage.getItem('Authorization') || '' };
    this.role = window.localStorage.getItem("role");
  },
  methods: {
    datanull(val) {
      if (val == 1 || 2 || 3) {
        this.selectInput = '';
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.isClick);
      if (this.isClick == false) {
        this.init(); //查询所有
      } else {
        this.search(); //条件查询
      }
    },
    init() {
      getSelectAllStartupInfo({
        current: this.currentPage,
        size: this.pagesize,
      }).then((res) => {
        console.log(res.data.data);
        this.pages = res.data.data.pages;
        this.totals = res.data.data.total;
        this.tableData = res.data.data.list;
      });
    },
    //添加
    add() {
      this.form = {};
      console.log(this.form);
      this.centerDialogVisible = true;
      this.show = true;
      this.title = '添加信息';
    },
    handlevieView(index, row) {
      console.log(index, row);
      var copyrow = Object.assign({}, row);
      this.form = copyrow;
      this.centerDialogVisible = true;
      this.title = '查看信息';
      this.show = false;
    },

    handleEdit(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.title = '修改信息';
      this.form = row;
      this.show = true;
    },
    //弹框取消按钮
    cenDialogVisible() {
      this.centerDialogVisible = false;
      this.init();
    },
    // 提交编辑后的信息
    sumbit() {
      const updateData = Object.assign({}, this.form);
      if(updateData.hostName == undefined){
        this.$message.error('主持人姓名不能为空');
        return;
      }
      if(updateData.studentId == undefined){
        this.$message.error('学生学号不能为空');
        return;
      }
      if(updateData.projectName == undefined){
        this.$message.error('立项项目不能为空');
        return;
      }
      if (this.title == '修改信息') {
        getEditStartupInfo(updateData).then((res) => {
          console.log(res);
          this.init();
        });
        this.centerDialogVisible = false;
      }
      if (this.title == '添加信息') {
        getInsertStartup(updateData).then((res) => {
          console.log(res);
          this.selectInput = ''
          this.init();
        });
        this.centerDialogVisible = false;
      }
    },
    // 按照条件查询
    search() {
      this.isClick = true;
      if (this.select == '1') {
        this.queryData = { projectName: this.selectInput };
        getStartupConditionalQuery(this.queryData, {
          current: this.currentPage,
          size: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      } else if (this.select == '2') {
        this.queryData = { projectType: this.selectInput };
        getStartupConditionalQuery(this.queryData, {
          current: this.currentPage,
          size: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.total;
          let data = res.data.data.list;
          this.tableData = data;
        });
      } else if (this.select == '3') {
        this.queryData = { level: this.selectInput };
        getStartupConditionalQuery(this.queryData, {
          current: this.currentPage,
          size: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.total;
          let data = res.data.data.list;
          this.tableData = data;
        });
      }
    },
    focus(val) {
      this.selectInput = val;
    },
    // 删除信息
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(row.id);
          let id = row.id;
          getDeleteStartupById({ id: id }).then((res) => {
            console.log(res);
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
    //导入导出功能================================================================================
    // ----------以下为导入Excel数据功能-----------

    // 下载模板
    downloadTemplate() {
      downloadTemplateFile({
        template: 'sheet12',
      }).then((res) => {
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
      getStartupProjectWriteExcel(this.queryData).then((res) => {
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
      link.setAttribute('download', 'sheet12.xlsx');

      document.body.appendChild(link);
      link.click();
    },
  },
  components: {
    'base-infor-view': studlnnovationView,
  },
};
</script>

<style lang="scss" scoped>
.studlnnovation {
  width: 100%;
  box-sizing: border-box;
  .page {
    text-align: center;
    margin-top: 20px;
  }
  .el-input:first-of-type {
    width: 37%;
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
