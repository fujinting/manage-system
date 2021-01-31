<template>
  <div class="res-editor">
    <el-form ref="form" size="small" :model="form" label-width="150px">
      <el-form-item label="项目编号" required>
        <el-input
          v-model="form.id"
          placeholder="请输入"
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目名称" required>
        <el-input
          v-model="form.name"
          placeholder="请输入"
          size="normal"
          clearable
          style="width:60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-input
          v-model="form.type"
          placeholder="请输入"
          size="normal"
          clearable
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input
          v-model="form.head"
          placeholder="请输入"
          size="normal"
          clearable
          style="width:200px "
        ></el-input>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.school"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="1" style="text-align:center">
          <!-- <span>-</span> -->-
        </el-col>
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="项目经费（万元）">
        <el-input
          v-model="form.fund"
          placeholder="请输入"
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>
      <el-form-item label="批准单位">
        <el-input
          v-model="form.turnUnit"
          placeholder="请输入"
          size="normal"
          clearable
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目级别">
        <el-input
          v-model="form.researchProjectLevel"
          placeholder="请输入"
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ReseProjectView',
  props: ['form'],
  data() {
    return {};
  },
  methods: {
    // formatDate(value) {
    //   // <!--例如后台传给我们的时间戳
    //   this.value1 = new Date(value.date); //value.createdTime是prop绑定的字段名称
    //   let dateValue = this.$moment(this.value1).format('YYYY-MM-DD HH:mm:ss'); //$moment专门转化时间的插件（使用时需要下载引入）
    //   return dateValue;
    // },
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
