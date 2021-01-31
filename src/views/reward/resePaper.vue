<template>
  <div class="rese-paper">
    <div class="header">
      <div class="search">
        <!-- 查询 -->
        <el-input
          style="width: 430px;"
          placeholder="请输入论文题目/作者名称/期刊级别"
          v-model="selectInput"
        >
          <el-select
            v-model="select"
            style="width: 104px"
            slot="prepend"
            placeholder="请选择"
            @change="datanull"
          >
            <el-option label="论文题目" value="1"></el-option>
            <el-option label="作者名称" value="2"></el-option>
            <el-option label="期刊级别" value="3"></el-option>
            <el-option label="时间范围" value="4"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>

        <div style="float: right;" v-if="select == 4">
          <el-date-picker
            v-model="start"
            style="margin:0 0 0 10px;width:200px"
            type="monthrange"
            format="yyyy.MM"
            value-format="yyyy.MM"
            range-separator=" - "
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            @change="starts"
          >
          </el-date-picker>
        </div>
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
          action="http://howling.top:8001/System/teacherResearchPapers/readExcel"
          :headers="headers"
          :on-success="uploadSuccess"
          :auto-upload="true"
          accept=".xlsx"
          :show-file-list="uploadShowList"
        >
          <el-button type="primary" icon="el-icon-folder-add"
          v-if="role == 'v1'">导入</el-button>
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
      <el-table-column prop="name" label="论文题目" width="250" show-overflow-tooltip></el-table-column>
      <el-table-column prop="author" label="作者姓名" width="120"></el-table-column>
      <el-table-column prop="authorPlaces" label="作者位次" width="100"></el-table-column>
      <el-table-column
        prop="publication"
        show-overflow-tooltip
        label="刊物名称，卷期页码（含守尾页码）"
      ></el-table-column>
      <el-table-column prop="rank" label="刊期级别" width="120"></el-table-column>
      <el-table-column prop="time" label="发表时间" width="150"></el-table-column>
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
      <el-dialog
        disabled
        class="prop"
        :title="title"
        :visible.sync="centerDialogVisible"
        width="60%"
        center
        :close-on-click-modal="false"
      >
        <base-infor-view :form="form" :tit="tit" :dictionary="dictionary" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" v-show="show" @click="sumbit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import resePaperView from '@/components/private/resePaperView.vue';
import {
  getAllResearchPapersInfo,
  getEditResearchPapersInfo,
  getDeleteResearch,
  getSelectTeacherResearch,
  getInsertResearchPapers,
  getWriteExcel, //导出
  downloadTemplateFile,
} from '@/api/api';

export default {
  name: 'resepaper',
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
      select: '1',
      selectInput: '',
      pages: 0,
      totals: 0,
      start: [],
      isClick: false,
      dictionary: {},
      queryData: {},
      headers: {},
      uploadShowList: false,
      role:'',
      tit:''
    };
  },
  created() {
    this.init();
    this.role = window.localStorage.getItem("role");
    this.headers = { token: localStorage.getItem('Authorization') || '' };
  },
  methods: {
    datanull(val) {
      if (val == 1 || 2 || 3) {
        this.selectInput = '';
      }
      if (val == 4) {
        this.start = [];
      }
    },
    starts(val) {
      console.log(val);
      this.selectInput = val[0] + '-' + val[1];
      console.log(this.selectInput);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);
      if (this.isClick == false) {
        this.init(); //查询所有
      } else {
        this.search(); //条件查询
      }
    },
    //所有数据
    init() {
      getAllResearchPapersInfo({
        current: this.currentPage,
        size: this.pagesize,
      }).then((res) => {
        console.log(res.data.data)
        this.pages = res.data.data.pages;
        this.totals = res.data.data.totals;
        this.tableData = res.data.data.list;
        this.dictionary = res.data.data.dictionary;
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

    // 按照条件查询
    search() {
      this.isClick = true;
      if (this.select == '1') {
        this.queryData = { name: this.selectInput };
        getSelectTeacherResearch(this.queryData, {
          current: this.currentPage,
          size: this.pagesize,
        }).then((res) => {
          this.pages = res.data.data.pages;
          this.totals = res.data.data.totals;
          //   console.log();
          let data = res.data.data.list;
          this.tableData = data;
        });
      } else if (this.select == '2') {
        this.queryData = { author: this.selectInput };
        getSelectTeacherResearch(this.queryData, {
          current: this.currentPage,
          size: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.totals;
          this.tableData = res.data.data.list;
        });
      } else if (this.select == '3') {
        this.queryData = { rank: this.selectInput };
        getSelectTeacherResearch(this.queryData, {
          current: this.currentPage,
          size: this.pagesize,
        }).then((res) => {
          console.log(res.data.data);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.totals;
          this.tableData = res.data.data.list;
        });
      } else if (this.select == '4') {
        this.queryData = { period: this.selectInput };
        getSelectTeacherResearch(this.queryData, {
          current: this.currentPage,
          size: this.pagesize,
        }).then((res) => {
          console.log(res);
          this.pages = res.data.data.pages;
          this.totals = res.data.data.totals;
          let data = res.data.data.list;
          this.tableData = data;
        });
      }
    },
    // 提交编辑后的信息
    sumbit() {
      const updateData = Object.assign({}, this.form);
      if(updateData.name == undefined){
        this.$message.error('论文题目不能为空');
        return;
      }
      if(updateData.author == undefined){
        this.$message.error('作者姓名不能为空');
        return;
      }
      if (this.title == '修改信息') {
        console.log(updateData);
        getEditResearchPapersInfo(updateData).then((res) => {
          if (this.isClick == true) {
            this.search();
          } else {
            this.init();
          }
        });
        this.centerDialogVisible = false;
      }
      if (this.title == '添加信息') {
        console.log(updateData);
        getInsertResearchPapers(updateData).then((res) => {
          console.log(res);
          this.selectInput = ''
          this.init();
        });
        this.centerDialogVisible = false;
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
          getDeleteResearch({ id: id }).then((res) => {
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

    //导入导出功能================================================================================
    // ----------以下为导入Excel数据功能-----------

    // 下载模板
    downloadTemplate() {
      downloadTemplateFile({
        template: 'sheet08',
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
      getWriteExcel(this.queryData).then((res) => {
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
      link.setAttribute('download', 'sheet08.xlsx');

      document.body.appendChild(link);
      link.click();
    },
  },
  components: {
    'base-infor-view': resePaperView,
  },
};
</script>

<style lang="scss" scoped>
.rese-paper {
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
