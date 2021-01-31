<template>
    <div class="teachM">
        <el-form ref="form" size="small" :model="form" label-width="150px">
            <el-form-item label="教师姓名" required>
                <el-input
                    clearable
                    v-model="form.teacherName"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item label="会议名称" required>
                <el-input clearable v-model="form.name" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="会议地点" required>
                <el-input clearable v-model="form.place" style="width: 300px"></el-input>
            </el-form-item>
            
            <el-form-item label="发表时间" required>
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.time"
                        format="yyyy.MM.dd "
                        value-format="yyyy.MM.dd"
                        style="width: 100%"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="经费来源">
                <el-input
                    clearable
                    v-model="form.sourcesFunds"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item label="提交论文和会议发言情况">
                <el-input clearable type="textarea" style="width: 300px" v-model="form.essaySpeech"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input clearable type="textarea" style="width: 300px" v-model="form.note"></el-input>
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
    created() {
        this.init();
    },
    methods: {
        init() {
            console.log(this.form.sex);
        },
    },
};
</script>

<style lang="scss" scoped>
.teachM {
    width: 100%;
    box-sizing: border-box;
}
</style>
