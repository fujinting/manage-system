<template>
    <div class="studl">
        <el-form ref="form" size="small" :model="form" label-width="150px">
            <el-form-item label="主持人姓名" required>
                <el-input
                    clearable
                    v-model="form.hostName"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item label="学生学号" required>
                <el-input clearable v-model="form.studentId" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="立项项目名称" required>
                <el-input
                    clearable
                    v-model="form.projectName"
                ></el-input>
            </el-form-item>

            <el-form-item prop="classes" label="所在专业班级">
                <el-input clearable v-model="form.classes" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item prop="projectType" label="项目类型">
                <el-select v-model="form.projectType" placeholder="请选择">
                    <el-option label="创新训练" value="创新训练"></el-option>
                    <el-option label="创业训练" value="创业训练"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="level" label="立项层次">
                <el-select v-model="form.level" placeholder="请选择类型" >
                    <el-option label="校级" value="校级"></el-option>
                    <el-option label="省级" value="省级"></el-option>
                    <el-option label="国家级" value="国家级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="list" label="参与学生名单">
                <el-input
                    type="textarea"
                    clearable
                    v-model="form.list"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="fund" label="项目资助经费">
                <el-input
                    v-model="form.fund"
                    clearable
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="teacherName" label="指导教师">
                <el-input
                    v-model="form.teacherName"
                    clearable
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            
            <el-form-item label="起止时间">
                <el-col :span="11">
                    <el-form-item>
                        <el-date-picker
                        type="month"
                        placeholder="选择日期"
                        v-model="form.start"
                        format="yyyy.MM  "
                        value-format="yyyy.MM"
                        style="width: 100%;"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1" style="text-align:center">
                -
                </el-col>
                <el-col :span="11">
                    <el-form-item>
                        <el-date-picker
                        type="month"
                        placeholder="选择日期"
                        v-model="form.end"
                        format="yyyy.MM  "
                        value-format="yyyy.MM"
                        style="width: 100%;"
                        ></el-date-picker>
                    </el-form-item>
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
.studl {
    width: 100%;
    box-sizing: border-box;
}
</style>
