<template>
    <div class="guideR">
        <el-form ref="form" size="small" :model="form" label-width="150px">                    
            <el-form-item label="主持人姓名" required>
                <el-input
                    clearable
                    v-model="form.hostName"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item label="所在专业班级">
                <el-input
                    clearable
                    v-model="form.classes"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item label="项目名称" required>
                <el-input
                    clearable
                    v-model="form.projectName"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item label="参加学生数">
                <el-input
                    clearable
                    v-model="form.attendNumberStudents"
                    style="width: 80px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="category" label="科技竞赛类别">
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option label="校级" value="3"></el-option>
                    <el-option label="省级" value="2"></el-option>
                    <el-option label="国家级" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="name" label="获奖名称">
                <el-input
                    clearable
                    v-model="form.name"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="level" label="获奖等级">
                <el-input
                    clearable
                    v-model="form.level"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item label="获奖人数">
                <el-input
                    clearable
                    v-model="form.number"
                    style="width: 80px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="awardTime" label="获奖时间">
                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        placeholder="选择日期"
                        v-model="form.awardTime"
                        format="yyyy.MM"
                        value-format="yyyy.MM"
                        style="width: 100%"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item prop="teacherName" label="指导教师">
                <el-input
                    clearable
                    v-model="form.teacherName"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="organization" label="组织单位">
                <el-input
                    clearable
                    v-model="form.organization"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="place" label="竞赛地点">
                <el-input clearable v-model="form.place" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item prop="time" label="时间">
                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        placeholder="选择日期"
                        v-model="form.time"
                        format="yyyy.MM"
                        value-format="yyyy.MM"
                        style="width: 100%"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: ["form"],
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scoped>
.guideR {
    width: 100%;
    box-sizing: border-box;
}
</style>
