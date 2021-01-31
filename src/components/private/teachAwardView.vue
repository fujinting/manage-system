<template>
    <div class="teachA">
        <el-form ref="form" size="small" :model="form" label-width="150px">
            <el-form-item label="项目名称" required>
                <el-input
                    clearable
                    v-model="form.name"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item label="教学成果奖名称">
                <el-input  
                    clearable
                    v-model="form.achievementName"
                ></el-input>
            </el-form-item>
            <el-form-item label="教学奖励名称">
                <el-input clearable v-model="form.rewardName"></el-input>
            </el-form-item>
            <el-form-item label="省级奖">
                <el-input clearable v-model="form.awardProvinceLevel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="校级奖">
                <el-input clearable v-model="form.awardSchoolLevel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="personsInvolv" label="完成人">
                <el-input clearable type="textarea" v-model="form.personsInvolv" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="certificateNumber" label="获奖证书编号">
                <el-input
                    clearable
                    v-model="form.certificateNumber"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="approvalUnits" label="批准单位">
                <el-input
                    clearable
                    v-model="form.approvalUnits"
                    style="width: 300px"
                ></el-input>
            </el-form-item>
            <el-form-item label="获奖时间">
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
    props: ["form"]
};
</script>

<style lang="scss" scoped>
.teachA {
    width: 100%;
    box-sizing: border-box;
}
</style>
