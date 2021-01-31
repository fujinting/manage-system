<template>
  <div class="teach-award">
    <div class="header">
      <div class="search">
        <!-- 查询 -->
        <el-input style="width: 430px" placeholder="请输入项目名称" v-model="selectInput">
          <el-select
            v-model="select"
            @change="datanull"
            slot="prepend"
            placeholder="请选择奖励级别"
          >
            <el-option label="教学成果奖名称" value="1"></el-option>
            <el-option label="教学奖励名称" value="2"></el-option>
            <el-option label="省级奖" value="3"></el-option>
            <el-option label="校级奖" value="4"></el-option>
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
          action="http://howling.top:8001/System/teacherAchievementAward/readExcel"
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
      <el-table-column type="index" label="序号" fixed="left" width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        width="250"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="奖励级别（请注明奖励等级）">
        <el-table-column
          prop="awardProvinceLevel"
          label="省级"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="awardSchoolLevel"
          label="校级"
          width="120"
        ></el-table-column>
      </el-table-column>
      <!-- <el-table-column prop="approvalUnits" label="批准单位"></el-table-column> -->
      <el-table-column label="教学成果奖励名称" prop="achievementName"></el-table-column>
      <!-- <el-table-column
        prop="certificateNumber"
        label="获奖证书编号"
        width="170"
      ></el-table-column> -->
      <el-table-column label="教学奖励名称" prop="rewardName"></el-table-column>
      <el-table-column prop="time" label="获奖时间" width="140"></el-table-column>
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
    <!-- 弹框 -->
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
        <base-infor-view :form="form" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" v-show="show" @click="sumbit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import teachAwardView from '@/components/private/teachAwardView.vue';
import {
  getTeacherAwardList,
  editTeacherAward,
  deleteTeacherAward,
  selectTeacherAward,
  getAddInsert,
  downloadTemplateFile,
  getWriteByCondition,
} from '@/api/api';

export default {
  name: 'teachAward',
  data() {
    return {
      check: '',
      title: '',
      currentPage: 1,
      pagesize: 7,
      tableData: [],
      show: false,
      form: {},
      centerDialogVisible: false,
      fileData: '',
      select: '1',
      isClick: false,
      selectInput: '',
      pages: 0,
      totals: 0,
      queryData: {},
      headers: {},
      uploadShowList: false,
      role: '',
    };
  },
  created() {
    this.init();
    this.role = window.localStorage.getItem('role');
    this.headers = { token: localStorage.getItem('Authorization') || '' };
  },
  methods: {
    datanull(val) {
      if (val == 1 || 2 || 3) {
        this.selectInput = '';
      }
    },
    handleChange(val) {
      this.currentPage = val;
      if (this.isClick == false) {
        this.init(); //查询所有
      } else {
        this.search(); //条件查询
      }
    },
    init() {
      getTeacherAwardList({
        currentPage: this.currentPage,
        limit: this.pagesize,
      }).then((res) => {
        console.log(res);
        // console.log(res.data);
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

    // 提交编辑后的信息
    sumbit() {
      const updateData = Object.assign({}, this.form);

      if (updateData.name == undefined) {
        this.$message.error('项目名称不能为空');
        return;
      }
      if (this.title == '修改信息') {
        editTeacherAward(updateData).then((res) => {
          console.log(res);
          if (this.isClick == true) {
            this.search();
          } else {
            this.init();
          }
        });
        this.centerDialogVisible = false;
      }
      if (this.title == '添加信息') {
        getAddInsert(updateData).then((res) => {
          console.log(res);
          this.selectInput = '';
          this.init();
        });
        this.centerDialogVisible = false;
      }
    },

    // 按照条件查询
    search() {
      this.isClick = true;
      if (this.select == '1') {
        this.queryData = { achievementName: this.selectInput };
        selectTeacherAward(this.queryData, {
          currentPage: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      } else if (this.select == '2') {
        this.queryData = { rewardName: this.selectInput };
        selectTeacherAward(this.queryData, {
          currentPage: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      } else if (this.select == '3') {
        this.queryData = { awardProvinceLevel: this.selectInput };
        selectTeacherAward(this.queryData, {
          currentPage: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      } else if (this.select == '4') {
        this.queryData = { awardSchoolLevel: this.selectInput };
        selectTeacherAward(this.queryData, {
          currentPage: this.currentPage,
          limit: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.total;
          this.tableData = res.data.data.list;
        });
      }
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
          deleteTeacherAward({ id: id }).then((res) => {
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

    //导入导出功能================================================================================
    // ----------以下为导入Excel数据功能-----------

    // 下载模板
    downloadTemplate() {
      downloadTemplateFile({
        template: 'sheet07',
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
      getWriteByCondition(this.queryData).then((res) => {
        console.log(this.queryData);
        this.download(res.data);
        this.$message({
          message: '导出成功',
          type: 'success',
        });
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
      console.log(url);
      console.log(link);

      link.setAttribute('download', 'sheet07.xlsx');

      document.body.appendChild(link);
      link.click();
    },
  },
  components: {
    'base-infor-view': teachAwardView,
  },
};
</script>

<style lang="scss" scoped>
.teach-award {
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
    width: 150px;
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
