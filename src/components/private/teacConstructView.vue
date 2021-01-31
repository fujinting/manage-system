<template>
  <div>
    <el-form ref="form" size="small" :model="form" label-width="150px">
      <el-form-item label="教材名称" required>
        <el-input
          v-model="form.name"
          placeholder=""
          size="normal"
          clearable
          style="width:25%"
        ></el-input>
      </el-form-item>
      <el-form-item label="主编" required>
        <el-input
          v-model="form.editorInChief"
          placeholder=""
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>
      <el-form-item label="副主编">
        <el-input
          v-model="form.deputyEditor"
          placeholder=""
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>
      <el-form-item label="立项时间">
        <el-col :span="8">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.projectTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="教材建设类别">
        <el-radio-group v-model="form.category">
          <el-radio :label="'国家级规划'">国家级规划</el-radio>
          <el-radio :label="'省部级规划'">省部级规划</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input
          v-model="form.publisher"
          placeholder=""
          size="normal"
          clearable
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="出版时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.publicationDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="ISSN">
        <el-input
          v-model="form.issn"
          placeholder=""
          size="normal"
          clearable
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item label="教材奖励名称">
        <el-input
          type="textarea"
          v-model="form.reward"
          placeholder=""
          size="normal"
          clearable
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="教材获奖">
        <el-radio-group v-model="form.awards">
          <el-radio :label="'国家级'">国家级</el-radio>
          <el-radio :label="'省部级'">省部级</el-radio>
          <el-radio :label="'校级'">校级</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'practiceBaseView',
  props: ['form'],
  data() {
    return {
      // form: {},
    };
  },
  //   form: {},
  created() {
    // 对号转换
    console.log(this.form);
    if (this.form.nationalAwards != null) {
      this.form.awards = '国家级';
      // this.form.nationalAwards = '国家级'
    } else if (this.form.provincialAwards != null) {
      // this.form.provincialAwards = ''
      this.form.awards = '省部级';
    } else if (this.form.schoolAwards != null) {
      this.form.awards = '校级';
    }
    if (this.form.nationalCategory != null) {
      this.form.category = '省部级规划';
    } else if (this.form.provincialCategory != null) {
      this.form.category = '省部级规划';
    }
  },
};
</script>

<style lang="scss" scoped></style>
