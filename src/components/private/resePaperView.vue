<template>
    <div class="rese">
        <el-form ref="form" size="small" :model="form" label-width="150px">
            <el-form-item label="论文题目" required>
                <el-input clearable v-model="form.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="作者姓名" required>
                <el-input clearable v-model="form.author" style="width: 200px"></el-input>
            </el-form-item>

            <el-form-item label="作者位次">
                <el-input
                    clearable
                    v-model="form.authorPlaces"
                    style="width: 80px"
                ></el-input>
            </el-form-item>
            <el-form-item prop="publication" label="刊物名称，卷期页码（含守尾页码）">
                <el-input
                    v-model="form.publication"
                    clearable
                    style="width: 200px"
                ></el-input>
            </el-form-item>

            <el-form-item prop="rank" label="期刊级别">
                <el-select v-model="form.rank" placeholder="请选择">
                    <el-option
                        v-for="item in dictionary.rank"
                        :key="item.attribute"
                        :label="item.attribute"
                        :value="item.attribute"
                    ></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item prop="time" label="发表时间">
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
    props: ["form","dictionary"],
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scoped>
.resr {
    width: 100%;
    box-sizing: border-box;
    
}
</style>
