<template>
    <div class="teamView">
        <el-form ref="form" size="small" :model="form" label-width="150px">                    
            <el-form-item label="姓名" required>
                <el-input
                    clearable
                    v-model="form.name"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="title" label="称号" >
                <el-select v-model="form.title" placeholder="请选择" style="width: 160px">
                    <el-option label="教学名师" value="教学名师"></el-option>
                    <el-option label="卓越教学奖" value="卓越教学奖"></el-option>
                    <el-option label="教学能手" value="教学能手"></el-option>
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
    }
};
</script>

<style lang="scss" scoped>
.teamView {
    width: 100%;
    box-sizing: border-box;
}
</style>
