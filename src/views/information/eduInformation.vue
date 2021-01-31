<template>
    <div class="edu-information">
        <!-- 查询框 -->
        <div class="header">
            <div class="search">
                <!-- 查询 -->
                <el-input
                    style="width: 430px"
                    placeholder="请输入 姓名/完成情况"
                    v-model="selectInput"
                >
					<!-- <el-cascader
                    	style="width: 120px"
						v-model="select"
						slot="prepend"
						placeholder="请选择"
						:options="options"
						@change="handleChange"
						clearable
					>
					</el-cascader> -->

                    <el-select v-model="select" slot="prepend" placeholder="请选择">
						<el-option label="姓名" value="1"></el-option>
						<el-option label="完成情况" value="2"></el-option>
					</el-select>

                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="search()"
                    ></el-button>
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
                    action="http://172.16.8.49:8001/teacherEducationPromotion/readExcel"
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
            <el-table-column type="index" label="序号" width="50"> </el-table-column>
            <el-table-column
                prop="teacherId"
                label="教职工号"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="80"
            ></el-table-column>
            <el-table-column
                prop="originalProfessionalTechnical"
                label="原专业技术职务"
                width="120"
            ></el-table-column>

            <el-table-column
                prop="qualifications"
                label="取得学历"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="degree"
                label="取得学位"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="school"
                label="就读学校"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="professional"
                label="就读专业"
            ></el-table-column>
            <el-table-column
                prop="completion"
                label="完成情况"
                width="100"
            ></el-table-column>
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
                layout="prev, pager, next"
                :page-size="pagesize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                :page-count="page"
                :total="total"
            >
            </el-pagination>
        </div>
        <div>
            <!-- dialog -->
            <el-dialog
                disabled
                class="prop"
                :title="title"
                :visible.sync="centerDialogVisible"
                :before-close="handleClose"
                width="60%"
                center
                :close-on-click-modal="false"
            >
                <edu-edit-view :form="form" :editshow="editshow" />

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
import {
    getTeacherEduProInfoList,
    editTeacherPromoteInformation,
    deleteTeacherProInformation,
    selectTeacherPromInformation,
    addTeacherProInformation,
    downloadTemplateFile,
    downloadTeacherPromInformation,
} from "@/api/api";
import EduEditorView from "@/components/private/EduEditorView.vue";

export default {
    name: "eduInformation",
    data() {
        return {
			options:[
				{
					value:'1',
					label:'姓名'
				},
				{
					value:'2',
					label:'完成情况',
					children:[
						{
							value:'已完成',
							label:'已完成'
						},
						{
							value:'未完成',
							label:'未完成'
						},
					]
				}
			],
			sele:'',
            headers: {},
            uploadShowList: false,
            check: "",
            title: "",
            currentPage: 1,
            pagesize: 8,
            select: "1",
            selectInput: "",
            form: {},
            isClick: false,
            //权限
            role: "",
            //弹窗的显示隐藏
            centerDialogVisible: false,
            //提交确定按钮的显示隐藏
            determineshow: true,
            submitshow: true,
            //子组件中表单的显示隐藏
            editshow: true,
            tableData: [],
            total: 0,
            page: 0,
            queryData: {},
        };
    },
    created() {
        this.init();
        this.headers = { token: localStorage.getItem("Authorization") || "" };
        this.role = window.localStorage.getItem("role");
    },
    methods: {
        //教师学历提升信息列表
        init() {
            getTeacherEduProInfoList({
                current: this.currentPage,
                limit: this.pagesize,
            }).then((res) => {
                // console.log(res);
                this.total = res.data.data.total;
                this.page = res.data.data.pages;
                // console.log(this.page);
                this.tableData = res.data.data.teacherEducationPromotionList;
            });
        },
		handleChange(value){
			this.selectInput = value[1]
			console.log(this.select)
			console.log(this.selectInput)
		},
        //查看
        handlevieView(index, row) {
            const row1 = {};
            Object.assign(row1, row);
            this.form = row1;
            this.centerDialogVisible = true;
            this.submitshow = false;
            this.determineshow = false;
            this.editshow = true;
            this.title = "查看信息";
        },

        //添加
        add() {
            this.editshow = true;
            this.form = {};
            this.title = "添加信息";
            this.centerDialogVisible = true;
            this.determineshow = true;
            this.submitshow = false;
        },

        //编辑
        handleEdit(index, row) {
            console.log(index, row);
            this.centerDialogVisible = true;
            this.form = row;
            this.submitshow = true;
            this.determineshow = false;
            this.editshow = false;
            this.title = "编辑信息";
        },

        //删除
        handleDelete(index, row) {
            this.$confirm("此操作将永久此信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    console.log(row.id);
                    let id = row.id;
                    deleteTeacherProInformation({ id: id }).then((res) => {
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

        // 按照条件查询
        search() {
            this.isClick = true;
            // console.log(this.selectInput)
            if (this.select == "1") {
                if (this.selectInput == "") {
                    this.init();
                } else {
                    this.queryData = { name: this.selectInput };
                    selectTeacherPromInformation(
                        {
                            name: this.selectInput,
                        },
                        {
                            current: this.currentPage,
                            limit: this.pagesize,
                        }
                    ).then((res) => {
                        if (
                            res.data.data.teacherEducationPromotionList
                                .length == 0
                        ) {
                            this.$message.error(res.data.message);

                            // console.log(res.data.message)
                        } else {
                            console.log(res);
                            this.page = res.data.data.pages;
                            this.total = res.data.data.total;
                            this.tableData =
                                res.data.data.teacherEducationPromotionList;
                        }
                    });
                }
            } else if (this.select == "2") {
                if (this.selectInput == "") {
                    this.init();
                } else {
                    this.queryData = { completion: this.selectInput };
                    selectTeacherPromInformation(
                        {
                            completion: this.selectInput,
                        },
                        {
                            current: this.currentPage,
                            limit: this.pagesize,
                        }
                    ).then((res) => {
                        if (
                            res.data.data.teacherEducationPromotionList
                                .length == 0
                        ) {
                            this.$message.error(res.data.message);

                            // console.log(res.data.message)
                        } else {
                            this.page = res.data.data.pages;
                            this.total = res.data.data.total;
                            this.tableData =
                                res.data.data.teacherEducationPromotionList;
                        }
                    });
                }
            }
        },

        //编辑新消息提交
        submit() {
            if(this.form.teacherId == undefined){
                this.$message.error('教职工号不能为空');
                return;
            }
            if(this.form.name == undefined){
                this.$message.error('姓名不能为空');
                return;
            }
            editTeacherPromoteInformation(this.form).then((res) => {
                console.log(res);
                this.init();
            });
            this.centerDialogVisible = false;
        },
        //添加的确定按钮
        determine() {
            if(this.form.teacherId == undefined){
                this.$message.error('教职工号不能为空');
                return;
            }
            if(this.form.name == undefined){
                this.$message.error('姓名不能为空');
                return;
            }
            addTeacherProInformation(this.form).then((res) => {
                console.log(res);
                this.selectInput = "";
                this.init();
            });
            this.centerDialogVisible = false;
        },

        // 导入导出功能================================================================================
        // 下载模板
        downloadTemplate() {
            downloadTemplateFile({
                template: "sheet02",
            }).then((res) => {
                // window.location.href = res.request.responseURL;
                this.download(res.data);

                this.$message({
                    message: "下载成功",
                    type: "success",
                });
            });
        },
        // 分页
        handleCurrentChange(currentPage) {
            // return currentPage;
            this.currentPage = currentPage;
            if (this.isClick == false) {
                this.init();
            } else {
                this.search();
            }
        },
        // 导入导出功能================================================================================
        // 导入
        uploadSuccess: function (res) {
            console.log(res);
            if (res.code == 200) {
                this.$message({
                    message: "导入成功",
                    type: "success",
                });
                this.init();
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
            downloadTeacherPromInformation(this.queryData).then((res) => {
                // window.location.href = res.request.responseURL;

                this.download(res.data);
                this.$message({
                    message: "导出成功",
                    type: "success",
                });
                console.log(res);
            });
        },
        //下载
        download(data) {
            if (!data) {
                return;
            }
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "sheet02.xlsx");

            document.body.appendChild(link);
            link.click();
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
        "edu-edit-view": EduEditorView,
    },
    beforedestory: {},
};
</script>

<style lang="scss" scoped>
.edu-information {
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
    .header {
        display: flex;
		justify-content: space-between;
		.search {
			margin-bottom: 12px;
			.el-input-group{
				.el-input-group__prepend{
					.el-cascader{
						.el-input{
							.el-input__inner{
								border: 0;
								background-color: #f6f6f6;
								width: 115px;
							}
						}
					}
				}
			}
		}
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
