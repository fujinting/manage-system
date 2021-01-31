<template>
    <div class="guideA">
        <el-form ref="form" size="small" :model="form" label-width="150px">
            <el-form-item label="学生姓名" required>
                <el-input v-model="form.studentName" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="专业班级" required>
                <el-input v-model="form.classes" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="论文题目" required>
                <el-input v-model="form.title" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="学生位次" required>
                <el-input v-model="form.arrangement" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="发表刊物名称" required>
                <el-input v-model="form.physicsLetters" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="发表刊物年卷期页码" required>
                <el-input v-model="form.pageNumbers" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="期刊性质" required>
                <el-select v-model="form.physicsProperties" placeholder="请选择">
                    <el-option label="SCI" value="SCI"></el-option>
                    <el-option label="中文核心" value="中文核心"></el-option>
                    <el-option label="一般期刊" value="一般期刊"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="导师姓名" required>
                <el-input v-model="form.teacherName" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="发表时间" required>
                <el-col :span="11">
                    <el-date-picker
                        type="month"
                        placeholder="选择日期"
                        v-model="form.time"
                        format="yyyy.MM  "
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
.guideA {
    width: 100%;
    box-sizing: border-box;
}
</style>
