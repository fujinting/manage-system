<template>
    <div class="forgetpwd">
        <el-form ref="ruleForm" class="from1" size="small" :model="ruleForm" label-width="150px">
            <el-form-item label="姓名">
                <el-input v-model="ruleForm.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="'男'">男</el-radio>
                    <el-radio :label="'女'">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="职称">
                <el-select v-model="ruleForm.title" placeholder="请选择职称">
                    <el-option
                        v-for="item in dictionary.title"
                        :key="item.attribute"
                        :label="item.attribute"
                        :value="item.dictionaryDescribe"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="教职工号">
                <el-input
                    v-model="ruleForm.teacherId"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item label="出生年月">
                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        value-format="yyyy.MM"
                        format="yyyy.MM"
                        placeholder="选择日期"
                        v-model="ruleForm.birthday"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="学术头衔">
                <el-input v-model="ruleForm.academicTitle"></el-input>
            </el-form-item>
            <el-form-item label="荣誉称号">
                <el-input v-model="ruleForm.titleHonor"></el-input>
            </el-form-item>
            <el-form-item label="来校工作时间">
                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        value-format="yyyy.MM"
                        format="yyyy.MM"
                        placeholder="选择日期"
                        v-model="ruleForm.workTime"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
        </el-form>
        <el-form ref="ruleForm" class="from2" size="small" :model="ruleForm" label-width="150px">
            
            <el-form-item label="是否双师型">
                <el-radio-group v-model="ruleForm.whetherDouble">
                    <el-radio :label="'是'">是</el-radio>
                    <el-radio :label="'否'">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="人才引进时间">
                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        value-format="yyyy.MM"
                        format="yyyy.MM"
                        placeholder="选择日期"
                        v-model="ruleForm.talentIntroductionTime"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="专业技术岗位">
                <el-select
                    v-model="ruleForm.technicalPositions"
                    placeholder="请选择类型"
                >
                    <el-option
                        v-for="item in dictionary.technical_positions"
                        :key="item.attribute"
                        :label="item.attribute"
                        :value="item.dictionaryDescribe"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="研究生导师类型">
                <el-select v-model="ruleForm.postgraduateType" placeholder="请选择">
                    <el-option
                        v-for="item in dictionary.postgraduate_type"
                        :key="item.attribute"
                        :label="item.attribute"
                        :value="item.dictionaryDescribe"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="校内人才认定层次">
                <el-select
                    v-model="ruleForm.schoolTalentLevel"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in dictionary.school_talent_level"
                        :key="item.attribute"
                        :label="item.attribute"
                        :value="item.dictionaryDescribe"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否海外留学或访学">
                <el-radio-group v-model="ruleForm.whetherStudyAbroad">
                    <el-radio :label="'是'">是</el-radio>
                    <el-radio :label="'否'">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="留(访)学国家及单位">
                <el-input v-model="ruleForm.studyInUnit"></el-input>
            </el-form-item>
            <el-form-item label="留(访)学时间段">
                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        value-format="yyyy.MM"
                        format="yyyy.MM"
                        placeholder="选择日期"
                        v-model="ruleForm.startStudy"
                        style="width: 100%"
                    ></el-date-picker>
                </el-col>

                <el-col class="line" :span="1" style="text-align: center">
                    <span>-</span>
                </el-col>

                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        value-format="yyyy.MM"
                        format="yyyy.MM"
                        placeholder="选择日期"
                        v-model="ruleForm.endStudy"
                        style="width: 100%"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <div style="float:right;margin:10px 50px">
                <el-button
                    type="primary"
                    @click="preservation"
                    >返回</el-button
                >
            </div>
        </el-form>
    </div>
</template>

<script>
import { 
    getTeacherBaseInformationList,
    getTeacherInfo,
	editTeacherBaseInformation, 
} from "@/api/api";

export default {
	name:'forgetpwd',
    data() {
        return {
            ruleForm: {
                teacherId: "",
                name: "",
                sex: "",
                birthday: null,
                workTime: null,
                technicalPositions: "",
                academicTitle: "",
                titleHonor: "",
                whetherDouble: "",
                postgraduateType: "",
                talentIntroductionTime: "",
                schoolTalentLevel: "",
                whetherStudyAbroad: "",
                studyInUnit: "",
                startStudy: "",
				endStudy: null,
				title:''
			},
			dictionary:{},
            role:''
        };
    },
    created() {
        this.init();
        this.role = window.localStorage.getItem("role");
    },
    methods: {
        init() {
            this.teacherId = window.localStorage.getItem("teacherId");
            getTeacherInfo({teacherId:this.teacherId}).then((res) => {
                this.ruleForm = res.data.data.teacher;
                console.log(res.data.data);
            });

            getTeacherBaseInformationList({
				current: 1,
                limit: 1,
			}).then((res) => {
                this.dictionary = res.data.data.dictionary;
                console.log(res.data.data);
            });
		},
		preservation(){
			this.$router.push({ path: "/" });
		}
	}
};
</script>

<style lang="scss" scoped>
.forgetpwd{
    width: 900px;
    display: flex;
    justify-content: space-between;
    padding-top:50px;
    .from1{
        width: 400px;
    }
    .from2{
        width: 400px;
    }
    
}
</style>