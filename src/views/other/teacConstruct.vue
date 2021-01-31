<template>
    <div class="teac-construct">
        <!-- 查询框 -->
        <div class="header">
            <div class="search">
                <!-- 查询 -->
                <el-input
                    style="width: 430px"
                    placeholder="请输入 教材名称/教材建设类别"
                    v-model="selectInput"
                >
                    <el-select
                        style="width: 137px"
                        v-model="select"
                        slot="prepend"
                        placeholder="请选择"
                    >
                        <el-option label="教材名称" value="1"></el-option>
                        <el-option label="教材建设类别" value="2"></el-option>
                    </el-select>

                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="search()"
                    ></el-button>
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
                    action="http://howling.top:8001/System/teachingMaterial/readExcel"
                    :headers="headers"
                    :on-success="uploadSuccess"
                    :auto-upload="true"
                    accept=".xlsx"
                    :show-file-list="uploadShowList"
                >
                    <el-button type="primary" icon="el-icon-folder-add"
                        v-if="role == 'v1'"
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
            <el-table-column
                prop="name"
                label="教材名称"
                width="200"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="编写人员位次">
                <el-table-column
                    prop="editorInChief"
                    label="主编"
                    width="80"
                ></el-table-column>
                <el-table-column
                    prop="deputyEditor"
                    label="副主编"
                    width="80"
                ></el-table-column>
            </el-table-column>
            <el-table-column
                prop="projectTime"
                label="立项时间"
                width="100"
            ></el-table-column>
            <el-table-column prop="categor" label="教材建设类别">
                <el-table-column
                    label="国家级规划"
                    width="70"
                    prop="nationalCategory"
                >
                </el-table-column>
                <el-table-column
                    label="省部级规划"
                    width="70"
                    prop="provincialCategory"
                >
                </el-table-column>
            </el-table-column>
            <el-table-column prop="publisher" label="出版社" show-overflow-tooltip> </el-table-column>
            <el-table-column
                prop="publicationDate"
                label="出版时间"
                width="100"
            >
            </el-table-column>
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
                <tea-const-view :form="form" />

                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialog">取 消</el-button>
                    <el-button
                        type="primary"
                        v-show="submitshow"
                        @click="submit()"
                        >提 交</el-button
                    >
                    <el-button
                        type="primary"
                        v-show="determineshow"
                        @click="determine"
                        >确定</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import teacConstructView from "@/components/private/teacConstructView";
import {
    deletTeacConstructInformation,
    getTeacConstructInformation,
    addTeacConstructInformation,
    editTeacConstructInformation,
    selectTeacConstructInformation,
    downloadTemplateFile,
    downloadTeacConstructInformation,
} from "@/api/api";
export default {
    name: "teacConstruct",
    data() {
        return {
            headers: {},
            check: "",
            form: {},
            title: "",
            selectInput: "",
            select: "1",
            currentPage: 1,
            pagesize: 7,
            total: 0,
            page: 0,
            //是否点击搜索按钮
            isClick: false,
            //权限
            role: "",
            //弹框显示隐藏
            centerDialogVisible: false,
            // 提交和确定按钮的显示隐藏
            submitshow: true,
            determineshow: true,
            tableData: [],
            uploadShowList: false,
            queryData: {},
        };
    },
    created() {
        this.init();
        this.role = window.localStorage.getItem("role");
        this.headers = { token: localStorage.getItem("Authorization") || "" };
    },
    methods: {
        // 获取教材建设与教材获奖列表
        init() {
            // console.log(1111);
            // this.token = window.localStorage.getItem('Authorization');
            this.role = window.localStorage.getItem("role");
            getTeacConstructInformation({
                currentPage: this.currentPage,
                limit: this.pagesize,
            }).then((res) => {
                // console.log(res);
                this.total = res.data.data.total;
                this.page = res.data.data.pages;
                this.tableData = res.data.data.list;
            });
        },
        //编辑
        handleEdit(index, row) {
            console.log(index, row);
            this.centerDialogVisible = true;
            this.title = "编辑信息";
            // this.show = true;
            this.determineshow = false;
            this.submitshow = true;
            this.form = row;
        },

        //查看
        handlevieView(index, row) {
            console.log(index, row);
            this.centerDialogVisible = true;
            this.title = "查看信息";
            var copyrow = Object.assign({}, row);
            this.form = copyrow;
            // this.show = false;
            this.determineshow = false;
            this.submitshow = false;
        },

        //添加
        add() {
            this.title = "添加信息";
            this.form = {};
            this.centerDialogVisible = true;
            this.submitshow = false;
            this.determineshow = true;
        },

        //删除
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    let _id = row.id;
                    deletTeacConstructInformation({ id: _id }).then((res) => {
                        console.log(res);
                        this.currentPage=1
                        this.init();
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 查询
        search() {
            this.isClick = true;
            if (this.select == "1") {
                this.queryData = { name: this.selectInput };
                selectTeacConstructInformation(this.queryData, {
                    currentPage: this.currentPage,
                    limit: this.pagesize,
                }).then((res) => {
                    if (res.data.data.list.length == 0) {
                        this.$message.error(res.data.message);
                    } else {
                        console.log(res);
                        this.page = res.data.data.pages;
                        this.total = res.data.data.total;
                        // console.log(this.page);
                        this.tableData = res.data.data.list;
                    }
                });
            } else if (this.select == "2") {
                this.queryData = { category: this.selectInput };
                selectTeacConstructInformation(this.queryData, {
                    currentPage: this.currentPage,
                    limit: this.pagesize,
                }).then((res) => {
                    if (res.data.data.list.length == 0) {
                        this.$message.error(res.data.message);
                    } else {
                        this.page = res.data.data.pages;
                        this.total = res.data.data.total;
                        this.tableData = res.data.data.list;
                        console.log(res);
                    }
                });
            }
        },

        //编辑信息的提交按钮
        submit() {
            if(this.form.name == undefined){
                this.$message.error('教材名称不能为空');
                return;
            }
            if(this.form.editorInChief == undefined){
                this.$message.error('主编不能为空');
                return;
            }
            editTeacConstructInformation(this.form).then((res) => {
                console.log(res);
                this.init();
            });
            this.centerDialogVisible = false;
        },

        //添加中的确定按钮
        determine() {
            if(this.form.name == undefined){
                this.$message.error('教材名称不能为空');
                return;
            }
            if(this.form.editorInChief == undefined){
                this.$message.error('主编不能为空');
                return;
            }
            addTeacConstructInformation(this.form).then((res) => {
                console.log(res);
                this.selectInput=''
                this.init();
            });
            this.centerDialogVisible = false;
        },

        // 导入导出功能================================================================================
        // 下载模板
        downloadTemplate() {
            downloadTemplateFile({
                template: "sheet10",
            }).then((res) => {
                this.download(res.data);
                //成功信息
                this.$message({
                    message: "下载成功",
                    type: "success",
                });
            });
        },
        // 导入导出功能================================================================================
        // 导入
        uploadSuccess: function (res) {
            if (res.code == 200) {
                this.init()
                this.$message({
                    message: "导入成功",
                    type: "success",
                });
            } else if (res.code == 520) {
                this.$message.error("请不要导入已存在的老师信息");
            } else if (res.code == 521) {
                this.$notify({
                    title: "提示",
                    message: res.message,
                    duration: 0,
                });
            }
        },
        // 导出
        downloadExcel() {
            downloadTeacConstructInformation(this.queryData).then((res) => {
                this.download(res.data);
                this.$message({
                    message: "导出成功",
                    type: "success",
                });
                console.log(res);
            });
        },

        download(data) {
            if (!data) {
                return;
            }
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "sheet10.xlsx");

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
        "tea-const-view": teacConstructView,
    },
};
</script>

<style lang="scss" scoped>
.teac-construct {
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
