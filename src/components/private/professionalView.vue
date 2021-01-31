<template>
    <div class="profession">
        <el-form ref="form" size="small" :model="form" label-width="150px">                    
            <el-form-item label="课程名称" required>
                <el-input
                    clearable
                    v-model="form.name"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item label="专业级别" >
                <el-select v-model="form.level" placeholder="请选择" style="width: 160px">
                    <el-option label="省级以上特色专业" value="省级以上特色专业"></el-option>
                    <el-option label="省级以上一流专业" value="省级以上一流专业"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="获批时间">
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
    },
};
</script>

<style lang="scss" scoped>
.profession {
    width: 100%;
    box-sizing: border-box;
}
</style>
