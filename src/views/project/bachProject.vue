<template>
    <div class="bach-project" style="overflow-y: scroll; height: 630px">

        <div class="header">
            <div class="import-export">
                <el-button
                    class="download-template"
                    @click="downloadTemplate"
                    icon="el-icon-download"
                    type="danger"
                    v-if="role == 'v1'"
                >下载模板</el-button>
                <el-upload
                    class="import"
                    action="http://howling.top:8001/System/qualityCourse/readExcel"
                    :headers = "headers"
                    :on-success="uploadSuccess"
                    :auto-upload="true"
                    accept=".xlsx"
                    :show-file-list="uploadShowList"
                >
                    <el-button type="primary" icon="el-icon-folder-add" 
                    v-if="role == 'v1'">导入</el-button>
                </el-upload>
                <el-button class="output" @click="downloadExcel" type="success" icon="el-icon-download"
                >导出</el-button>
            </div>
        </div>
        <el-collapse v-model="activeName" accordion @change="init">
        	<!-- 精品课程 -->
            <el-collapse-item title="精品课程" name="1">
                <div class="search">
                    <el-input
                        style="width: 430px"
                        placeholder="请输入内容"
                        class="input-with-select"
						v-model="selectInput"
                    >
                        <el-select
                            v-model="select"
                            slot="prepend"
                            style="width: 106px"
                            placeholder="请选择"
							@change="changeSelect"
                        >
                            <el-option label="课程名称" value="1"></el-option>
                            <el-option label="课程级别" value="2"></el-option>
                        </el-select>
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        	@click="search()"
                        ></el-button>
                    </el-input>
					<el-button class="addbtn" type="warning" size="default" icon="el-icon-circle-plus-outline" @click="add" style="float:right;margin-right:20px">
						添加
					</el-button>
                </div>
                <el-table
                    :data="tableData1"
                    :header-cell-style="{ textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }"
                    border
                    style="width: 100%"
                >
					<el-table-column
						type="index"
						label="序号"
						fixed="left"
						width="50">
					</el-table-column>
					<el-table-column
						prop="name"
						label="课程名称"
                        show-overflow-tooltip
					></el-table-column>
					<el-table-column
						prop="level"
						label="课程级别"
					></el-table-column>
					<el-table-column
						prop="time"
						label="获批时间"
					></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
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
						:visible.sync="centerDialogVisible1"
                        :before-close="handleClose"
						width="60%"
						center
					>
						<base-infor-view :form="form" />
						<span slot="footer" class="dialog-footer">
							<el-button @click="centerDialog">取 消</el-button>
							<el-button type="primary"  @click="sumbit"
							>确 定</el-button>
						</span>
					</el-dialog>
				</div>
            </el-collapse-item>
			
        	<!-- 特色专业 -->
            <el-collapse-item title="特色专业" name="2">
                <div class="search">
                    <el-input
                        style="width: 430px"
                        placeholder="请输入内容"
                        class="input-with-select"
						v-model="selectInput"
                    >
                        <el-select
                            v-model="select"
                            slot="prepend"
                            style="width: 106px"
                            placeholder="请选择"
							@change="changeSelect"
                        >
                            <el-option label="专业名称" value="1"></el-option>
                            <el-option label="专业级别" value="2"></el-option>
                        </el-select>
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        	@click="search()"
                        ></el-button>
                    </el-input>
					<el-button class="addbtn" type="warning" size="default" icon="el-icon-circle-plus-outline" @click="add" style="float:right;margin-right:20px">
						添加
					</el-button>
                </div>
                <el-table
                    :data="tableData2"
                    :header-cell-style="{ textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }"
                    border
                    style="width: 100%"
                >
					<el-table-column
						type="index"
						label="序号"
						fixed="left"
						width="50">
					</el-table-column>
					<el-table-column
						prop="name"
						label="专业名称"
                        show-overflow-tooltip
					></el-table-column>
					<el-table-column
						prop="level"
						label="专业级别"
					></el-table-column>
					<el-table-column
						prop="time"
						label="获批时间"
					></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
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
						:visible.sync="centerDialogVisible2"
                        :before-close="handleClose"
						width="60%"
						center
					>
						<prof-infor-view :form="form"/>
						<span slot="footer" class="dialog-footer">
							<el-button @click="centerDialog">取 消</el-button>
							<el-button type="primary"  @click="sumbit"
							>确 定</el-button>
						</span>
					</el-dialog>
				</div>
            </el-collapse-item> 

        	<!-- 教学名师 -->
            <el-collapse-item title="教学名师" name="3">
                <div class="search">
                    <el-input
                        style="width: 430px"
                        placeholder="请输入内容"
                        class="input-with-select"
						v-model="selectInput"
                    >
                        <template slot="prepend">课程名称</template>
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        	@click="search()"
                        ></el-button>
                    </el-input>
					<el-button class="addbtn" type="warning" size="default" icon="el-icon-circle-plus-outline" @click="add" style="float:right;margin-right:20px">
						添加
					</el-button>
                </div>
                <el-table
                    :data="tableData3"
                    :header-cell-style="{ textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }"
                    border
                    style="width: 100%"
                >
					<el-table-column
						type="index"
						label="序号"
						fixed="left"
						width="50">
					</el-table-column>
					<el-table-column
						prop="name"
						label="课程名称"
                        show-overflow-tooltip
					></el-table-column>
					<el-table-column
						prop="time"
						label="获批时间"
					></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
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
						:visible.sync="centerDialogVisible3"
                        :before-close="handleClose"
						width="60%"
						center
					>
                        <teacher-infor-view :form="form" />
						<span slot="footer" class="dialog-footer">
							<el-button @click="centerDialog">取 消</el-button>
							<el-button type="primary"  @click="sumbit"
							>确 定</el-button>
						</span>
					</el-dialog>
				</div>
            </el-collapse-item> 
        
        	<!-- 教学团队 -->
            <el-collapse-item title="教学团队" name="4">
                <div class="search">
                    <el-input
                        style="width: 430px"
                        placeholder="请输入内容"
                        class="input-with-select"
						v-model="selectInput"
                    >
                        <el-select
                            v-model="select"
                            slot="prepend"
                            style="width: 106px"
                            placeholder="请选择"
							@change="changeSelect"
                        >
                            <el-option label="团队名称" value="1"></el-option>
                            <el-option label="团队级别" value="2"></el-option>
                        </el-select>
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        	@click="search()"
                        ></el-button>
                    </el-input>
                    
					<el-button class="addbtn" type="warning" size="default" icon="el-icon-circle-plus-outline" @click="add" style="float:right;margin-right:20px">
						添加
					</el-button>
                </div>
                <el-table
                    :data="tableData4"
                    :header-cell-style="{ textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }"
                    border
                    style="width: 100%"
                >
					<el-table-column
						type="index"
						label="序号"
						fixed="left"
						width="50">
					</el-table-column>
					<el-table-column
						prop="name"
						label="团队名称"
                        show-overflow-tooltip
					></el-table-column>
					<el-table-column
						prop="level"
						label="团队级别"
					></el-table-column>
					<el-table-column
						prop="time"
						label="获批时间"
					></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
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
						:visible.sync="centerDialogVisible4"
                        :before-close="handleClose"
						width="60%"
						center
					>
                        <team-infor-view :form="form" />
						<span slot="footer" class="dialog-footer">
							<el-button @click="centerDialog">取 消</el-button>
							<el-button type="primary"  @click="sumbit"
							>确 定</el-button>
						</span>
					</el-dialog>
				</div>
            </el-collapse-item>  
            
        	<!-- 教学称号 -->
            <el-collapse-item title="教学称号" name="5">
                <div class="search">
                    <el-input
                        style="width: 430px"
                        placeholder="请输入内容"
                        class="input-with-select"
						v-model="selectInput"
                    >
                        <el-select
                            v-model="select"
                            style="width: 106px"
                            slot="prepend"
                            placeholder="请选择"
							@change="changeSelect"
                        >
                            <el-option label="姓名" value="1"></el-option>
                            <el-option label="教学称号" value="2"></el-option>
                        </el-select>
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        	@click="search()"
                        ></el-button>
                    </el-input>
                    
					<el-button class="addbtn" type="warning" size="default" icon="el-icon-circle-plus-outline" @click="add" style="float:right;margin-right:20px">
						添加
					</el-button>
                </div>
                <el-table
                    :data="tableData5"
                    :header-cell-style="{ textAlign: 'center' }"
                    :cell-style="{ textAlign: 'center' }"
                    border
                    style="width: 100%"
                >
					<el-table-column
						type="index"
						label="序号"
						fixed="left"
						width="50">
					</el-table-column>
					<el-table-column
						prop="name"
						label="姓名"
					></el-table-column>
					<el-table-column
						prop="title"
						label="称号"
					></el-table-column>
					<el-table-column
						prop="time"
						label="获批时间"
					></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
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
						:visible.sync="centerDialogVisible5"
                        :before-close="handleClose"
						width="60%"
						center
					>
                        <title-infor-view :form="form" :titleLevel="titleLevel" />
						<span slot="footer" class="dialog-footer">
							<el-button @click="centerDialog">取 消</el-button>
							<el-button type="primary"  @click="sumbit">确 定</el-button>
						</span>
					</el-dialog>
				</div>
            </el-collapse-item>  
        
		</el-collapse>

    </div>
</template>

<script>
import bachprojectView from "@/components/private/bachProjectView.vue"
import professionalView from "@/components/private/professionalView.vue"
import teacherView from "@/components/private/teacherView.vue"
import teamView from "@/components/private/teamView.vue"
import titleView from "@/components/private/titleView.vue"

import {
	// 精品课程
    getAllQualiyuCourse,//查所有
    getPutQualityCourse,//修改
    getDeleteQualityCourse,//删除
    getSelectQualityCourseByCondition,//条件查询
	getPostQualityCourse,//添加

	//特色专业
	getAllProfessional,
	getPutProfessional,
	getDeleteProfessional,
	getSelectProfessionalByCondition,
	getPostProfessional,

	//教学名师
    getAllTeacher,
    getPutTeacher,
    getDeleteTeacher,
    getSelectTeacherByCondition,
    getPostTeacher,

    //教学团队
    getAllQualityTeam,
    getPutQualityTeam,
    getDeleteQualityTeam,
    getSelectQualityTeamByCondition,
    getPostQualityTeam,

    //教学称号
    getAllQualityTitle,
    getPutQualityTitle,
    getDeleteQualityTitle,
    getSelectQualityTitleByCondition,
    getPostQualityTitle,

    downloadTemplateFile,
    getAllWriteExcel
    //字典表
    // getTitle
} from "@/api/api";
export default {
    name: "bachproject",
    data() {
        return {
			activeName:'1',
            check: "",
            title: "",
            currentPage: 1,
            pagesize: 8,
            centerDialogVisible1: false,
            centerDialogVisible2: false,
            centerDialogVisible3: false,
            centerDialogVisible4: false,
            centerDialogVisible5: false,
            tableData1:[],
			tableData5:[],
            tableData2:[],
            tableData3:[],
            tableData4:[],
			form:{},
            pages: 0,
			totals: 0,
			select:'1',
			selectInput:'',
            isClick:false,
            titleLevel:{},
            role:'',
            headers: {},
            uploadShowList: false,
        };
    },
    created() {
        this.init();
        this.role = window.localStorage.getItem("role");
        this.headers = { token: localStorage.getItem('Authorization') || '' };
    },
    methods: {
		// 课程titleLevel为空
		changeSelect(val){
			if(val == 1||2){
                this.selectInput = ''
			}
		},
		//分页
        handleChange(val) {
			this.currentPage = val;
			console.log(this.isClick)
            if(this.isClick == false){
                this.init() //查询所有
            }else{
                this.search()//条件查询
            }
		},
		//查询所有
        init() {
            this.role = window.localStorage.getItem('role')
            this.selectInput = ''
            switch(this.activeName){
                case "1":
                    this.select = '1'
                    console.log(this.currentPage)
                    getAllQualiyuCourse({
                        current:this.currentPage,
                        limit:this.pagesize
                    }).then((res) => {
                        this.pages = res.data.data.pages;
                        this.totals = res.data.data.total;
                        this.tableData1 = res.data.data.qualityCourseList
                    });
                break
                case "2":
                    this.select = '1'
                    getAllProfessional({
                        current:this.currentPage,
                        limit:this.pagesize
                    }).then((res) => {
                        console.log(res.data);
                        this.pages = res.data.data.pages;
                        this.totals = res.data.data.total;
                        this.tableData2 = res.data.data.qualityProfessionalList
                    });
                break
                case "3":
                    this.selectInput = ''
                    getAllTeacher({
                        current:this.currentPage,
                        limit:this.pagesize
                    }).then((res) => {
                        console.log(res.data);
                        this.pages = res.data.data.pages;
                        this.totals = res.data.data.total;
                        this.tableData3 = res.data.data.teacherList
                    });
                break
                case "4":
                    this.select = '1'
                    getAllQualityTeam({
                        current:this.currentPage,
                        limit:this.pagesize
                    }).then((res) => {
                        console.log(res.data);
                        this.pages = res.data.data.pages;
                        this.totals = res.data.data.total;
                        this.tableData4 = res.data.data.qualityTeamList
                    });
                break
                case "5":
                    this.select = '1'
                    getAllQualityTitle({
                        current:this.currentPage,
                        limit:this.pagesize
                    }).then((res) => {
                        console.log(res.data.data);
                        this.pages = res.data.data.pages;
                        this.totals = res.data.data.total;
                        this.tableData5 = res.data.data.qualityTitleList
                        this.titleLevel = res.data.data
                    });
                break
            }
        },
        //添加
        add() {
            this.form = {};
            console.log(this.form)
            this.title = '添加信息';
            switch(this.activeName){
                case "1":
                    this.centerDialogVisible1 = true;
                break
                case "2":
                    this.centerDialogVisible2 = true;
                break
                case "3":
                    this.centerDialogVisible3 = true;
                break
                case "4":
                    this.centerDialogVisible4 = true;
                break
                case "5":
                    this.centerDialogVisible5 = true;
                break
            }
        },
        //修改
        handleEdit(index, row) {
            console.log(index, row);
            this.title = "修改信息";
            switch(this.activeName){
                case "1":
                    this.centerDialogVisible1 = true;
                break
                case "2":
                    this.centerDialogVisible2 = true;
                break
                case "3":
                    this.centerDialogVisible3 = true;
                break
                case "4":
                    this.centerDialogVisible4 = true;
                break
                case "5":
                    this.centerDialogVisible5 = true;
                break
            }
            this.form = row;
        },
        // 关闭弹框
        centerDialog(){
            this.cancel()
        },
        handleClose(){
            this.cancel()
        },
        cancel(){
            switch(this.activeName){
                case "1":
                    this.centerDialogVisible1 = false;
                break
                case "2":
                    this.centerDialogVisible2 = false;
                break
                case "3":
                    this.centerDialogVisible3 = false;
                break
                case "4":
                    this.centerDialogVisible4 = false;
                break
                case "5":
                    this.centerDialogVisible5 = false;
                break
            }
            if(this.isClick == true){
                this.search()
            }else{
                this.init();
            }
        },
        // 提交编辑后的信息
        sumbit() {
            let updateData = Object.assign({},this.form)
            switch(this.activeName){
                case "1":
                    console.log(updateData.name)
                    if(updateData.name == undefined || updateData.name == ""){
                        this.$message.error('课程名称不能为空');
                        return;
                    }
                    if(updateData.level == undefined){
                        this.$message.error('课程级别不能为空');
                        return;
                    }
                    if(updateData.time == undefined){
                        this.$message.error('获批时间不能为空');
                        return;
                    }
                    if(this.title == "修改信息"){
                        getPutQualityCourse(updateData).then((res) => {
                            console.log(res);
                            if(this.isClick==true){
                                this.search()
                            }else{
                                this.init();
                            }
                        });
                        this.centerDialogVisible1 = false;
                    }
                    if(this.title == "添加信息"){
                        getPostQualityCourse(updateData).then((res) => {
                            console.log(res);
                            this.selectInput = ''
                            this.init();
                        });
                        this.centerDialogVisible1 = false;
                    }
                break
                case "2":
                    if(updateData.name == undefined || updateData.name == ""){
                        this.$message.error('专业名称不能为空');
                        return;
                    }
                    if(this.title == "修改信息"){
                        getPutProfessional(updateData).then((res) => {
                            console.log(res);
                            if(this.isClick==true){
                                this.search()
                            }else{
                                this.init();
                            }
                        });
                        this.centerDialogVisible2 = false;
                    }
                    if(this.title == "添加信息"){
                        getPostProfessional(updateData).then((res) => {
                            console.log(res);
                            this.selectInput = ''
                            this.init();
                        });
                        this.centerDialogVisible2 = false;
                    }
                break
                case "3":
                    if(updateData.name == undefined || updateData.name == ""){
                        this.$message.error('课程名称不能为空');
                        return;
                    }
                    if(this.title == "修改信息"){
                        getPutTeacher(updateData).then((res) => {
                            console.log(res);
                            if(this.isClick==true){
                                this.search()
                            }else{
                                this.init();
                            }
                        });
                        this.centerDialogVisible3 = false;
                    }
                    if(this.title == "添加信息"){
                        getPostTeacher(updateData).then((res) => {
                            console.log(res);
                            this.selectInput = ''
                            this.init();
                        });
                        this.centerDialogVisible3 = false;
                    }
                break
                case "4":
                    if(updateData.name == undefined || updateData.name == ""){
                        this.$message.error('团队名称不能为空');
                        return;
                    }
                    if(this.title == "修改信息"){
                        getPutQualityTeam(updateData).then((res) => {
                            console.log(res);
                            if(this.isClick==true){
                                this.search()
                            }else{
                                this.init();
                            }
                        });
                        this.centerDialogVisible4 = false;
                    }
                    if(this.title == "添加信息"){
                        getPostQualityTeam(updateData).then((res) => {
                            console.log(res);
                            this.selectInput = ''
                            this.init();
                        });
                        this.centerDialogVisible4 = false;
                    }
                break
                case "5":
                    if(updateData.name == undefined || updateData.name == ""){
                        this.$message.error('姓名不能为空');
                        return;
                    }
                    if(this.title == "修改信息"){
                        getPutQualityTitle(updateData).then((res) => {
                            console.log(res);
                            if(this.isClick==true){
                                this.search()
                            }else{
                                this.init();
                            }
                        });
                        this.centerDialogVisible5 = false;
                    }
                    if(this.title == "添加信息"){
                        getPostQualityTitle(updateData).then((res) => {
                            console.log(res);
                            this.selectInput = ''
                            this.init();
                        });
                        this.centerDialogVisible5 = false;
                    }
                break
            }
            
		},
		// 按照条件查询
        search() {
            this.isClick = true
            switch(this.activeName){
                case "1":
                    if (this.select == "1") {
                        getSelectQualityCourseByCondition({
                            name: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData1 = res.data.data.qualityCourseList
                        });
                    } else if (this.select == "2") {
                        getSelectQualityCourseByCondition({
                            level: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData1 = res.data.data.qualityCourseList
                            
                        });
                    }
                break
                case "2":
                    if (this.select == "1") {
                        getSelectProfessionalByCondition({
                            name: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData2 = res.data.data.qualityProfessional
                        });
                    } else if (this.select == "2") {
                        getSelectProfessionalByCondition({
                            level: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData2 = res.data.data.qualityProfessional
                            
                        });
                    }
                break
                case "3":
                    getSelectTeacherByCondition({
                        name: this.selectInput,
                    },{
                        current:this.currentPage,
                        limit:this.pagesize
                    }).then((res) => {
                        console.log(res.data.data)
                        this.pages = res.data.data.pages;
                        this.totals = res.data.data.total;
                        this.tableData3 = res.data.data.teacherList
                    });
                break
                case "4":
                    if (this.select == "1") {
                        getSelectQualityTeamByCondition({
                            name: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData4 = res.data.data.qualityTeamList
                        });
                    } else if (this.select == "2") {
                        getSelectQualityTeamByCondition({
                            level: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData4 = res.data.data.qualityTeamList
                            
                        });
                    }
                break
                case "5":
                    if (this.select == "1") {
                        getSelectQualityTitleByCondition({
                            name: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData5 = res.data.data.qualityTitleList
                        });
                    } else if (this.select == "2") {
                        getSelectQualityTitleByCondition({
                            title: this.selectInput,
                        },{
                            current:this.currentPage,
                            limit:this.pagesize
                        }).then((res) => {
                            console.log(res.data.data)
                            this.pages = res.data.data.pages;
                            this.totals = res.data.data.total;
                            this.tableData5 = res.data.data.qualityTitleList
                            
                        });
                    }
                break
            }
            
        },
        // 删除信息
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let id = row.id;
                switch(this.activeName){
                    case "1":
                        getDeleteQualityCourse({id:id}).then((res) => {
                            console.log(id)
                            console.log(res);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.init();
                        });
                    break
                    case "2":
                        getDeleteProfessional({id:id}).then((res) => {
                            console.log(id)
                            console.log(res);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.init();
                        });
                    break
                    case "3":
                        getDeleteTeacher({id:id}).then((res) => {
                            console.log(id)
                            console.log(res);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.init();
                        });
                    break
                    case "4":
                        getDeleteQualityTeam({id:id}).then((res) => {
                            console.log(id)
                            console.log(res);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.init();
                        });
                    break
                    case "5":
                        getDeleteQualityTitle({id:id}).then((res) => {
                            console.log(id)
                            console.log(res);
                            this.currentPage=1
                            this.init();
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        });
                    break
                }
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },	
         // 下载模板
        downloadTemplate() {
            downloadTemplateFile({
                template: 'sheet06',
            }).then((res) => {
                this.download(res.data);
                this.$message({
                    message: '下载成功',
                    type: 'success',
                });
            });
        },

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
            getAllWriteExcel().then((res) => {
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
            link.setAttribute('download', 'sheet06.xlsx');

            document.body.appendChild(link);
            link.click();
        }
	},
    components: {
		"base-infor-view": bachprojectView,
		"prof-infor-view": professionalView,
		"teacher-infor-view": teacherView,
		"team-infor-view": teamView,
		"title-infor-view": titleView,
    },
};
</script>

<style lang="scss">
.bach-project {
    width: 100%;
    box-sizing: border-box;

    .page {
        text-align: center;
        margin-top: 20px;
    }
    .el-select {
        width: 120px;
    }
    .search {
        margin-bottom: 12px;
    }
    .header {
        display: flex;
        justify-content: flex-end;
    }
    .import-export {
        margin-right: 28px;
        margin-bottom: 10px;
        .import {
            display: inline-block;
            margin-right: 10px;
        }
        .download-template {
            margin-right: 10px;
        }
    }
}
</style>
