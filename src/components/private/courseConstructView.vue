<template>
    <div class="course">
        <el-form ref="form" size="small" :model="form" label-width="150px">
            <el-form-item label="课程名称" required>
                <el-input
                    v-model="form.name"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item label="课程建设负责人" required>
                <el-input v-model="form.head" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="课程建设队员" required>
                <el-input type="textarea" v-model="form.players" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="建设总经费（万元）" required>
                <el-input v-model="form.fund" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="课程建设类型" required>
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option label="线下一流" value="线下一流"></el-option>
                    <el-option label="社会实践一流" value="社会实践一流"></el-option>
                    <el-option label="在线开放课程" value="在线开放课程"></el-option>
                    <el-option label="线上线下混合式一流" value="线上线下混合式一流"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业技术类型" required>
                <el-select
                    v-model="form.level"
                    placeholder="请选择"
                >
                    <el-option label="省级" value="省级"></el-option>
                    <el-option label="校级" value="校级"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="建设起止时间" required>
                <el-col :span="11">
                    <el-form-item>
                        <el-date-picker
                        type="month"
                        placeholder="选择日期"
                        v-model="form.start"
                        format="yyyy.MM"
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
                        format="yyyy.MM"
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
        // var check = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('不能为空'));
        //     }
        //     setTimeout(() => {
        //         if (!Number.isInteger(value)) {
        //             callback(new Error('请输入数字值'));
        //         }
        //     }, 100);
        // };
        return {
            rules: {
                // name: [{ required: true, message: '请输入姓名', trigger: 'blur' } ],
                // head: [{ required: true, message: '请输入队员', trigger: 'blur' }],
                // players: [{ required: true, message: '请输入队员', trigger: 'blur' }],
                // // fund: [{ validator: check }],
                // category: [{ required: true, message: '请选择', trigger: 'change' }],
                // level: [{ required: true, message: '请选择', trigger: 'change' }]
            },
        };
    }
};
</script>

<style lang="scss" scoped>
.course {
    width: 100%;
    box-sizing: border-box;
}
</style>
