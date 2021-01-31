<template>
  <div>
    <el-form ref="form" size="small" :model="form" label-width="150px">
      <el-form-item label="教师职工号" v-show="addshow" required>
        <el-input
          v-model="form.id"
          placeholder=""
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>

      <el-form-item label="姓名" v-show="addshow" required>
        <el-input
          v-model="form.name"
          placeholder=""
          size="normal"
          clearable
          style="width:200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" v-show="eidtshow">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age" v-show="eidtshow">
        <el-input
          v-model="form.age"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:80px"
        ></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="title" v-show="eidtshow">
        <el-select v-model="form.title" placeholder="请选择职称">
          <el-option label="教授" value="教授"></el-option>
          <el-option label="副教授" value="副教授"></el-option>
          <el-option label="讲师" value="讲师"></el-option>
          <el-option label="助教" value="助教"></el-option>
          <el-option label="高级实验师" value="高级实验师"></el-option>
          <el-option label="实验师" value="实验师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学历" prop="education" v-show="eidtshow">
        <el-select v-model="form.education" placeholder="请选择">
          <el-option label="研究生" value="研究生"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="专科" value="专科"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学位" prop="degree" v-show="eidtshow">
        <el-select v-model="form.degree" placeholder="请选择">
          <el-option label="博士" value="博士"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="学士" value="学士"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="实践单位" prop="practiceUnit">
        <el-input
          v-model="form.practiceUnit"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="实践形式及内容" prop="practiceFormContent">
        <el-input
          type="textarea"
          v-model="form.practiceFormContent"
          style="width:70%;"
        ></el-input>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.start"
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
            v-model="form.end"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="成效" prop="results">
        <el-input type="textarea" v-model="form.results" style="width:70%;"></el-input>
      </el-form-item>
      <el-form-item label="所在教室" prop="staffRoom">
        <el-input
          v-model="form.staffRoom"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:20%;"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ParEditor',
  props: ['form', 'eidtshow', 'addshow'],
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
// /deep/ .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
//   content: ' ';
//   width: 0px;
//   margin-right: 0px;
// }
</style>
