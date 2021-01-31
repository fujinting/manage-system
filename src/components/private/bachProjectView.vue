<template>
    <div class="bachPro">
        <el-form ref="form" size="small" :model="form" label-width="150px">                    
            <el-form-item label="课程名称" required>
                <el-input
                    clearable
                    v-model="form.name"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item label="课程级别" required>
                <el-select v-model="form.level" placeholder="请选择" style="width: 160px">
                    <el-option label="省级以上精品课程" value="省级以上精品课程"></el-option>
                    <el-option label="省级以上一流课程" value="省级以上一流课程"></el-option>
                    <el-option label="校级在线开放课程" value="校级在线开放课程"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="获批时间" required> 
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
            rules: {
                // name: [{ required: true, message: '请输入获奖名称', trigger: 'blur' } ],
                // level: [{ required: true, message: '请输入获奖等级', trigger: 'blur' } ],
            },
        };
    }
};
</script>

<style lang="scss" scoped>
.bachPro {
    width: 100%;
    box-sizing: border-box;
}
</style>
