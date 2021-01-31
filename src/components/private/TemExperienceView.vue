<template>
  <div>
    <el-form ref="form" size="small" :model="form" label-width="150px" >
      <el-form-item label="教职工号" v-show="addshow" required>
        <el-input
          v-model="form.teacherId"
          placeholder=""
          size="normal"
          clearable
          style="width:200px"
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
      <el-form-item label="性别" v-show="editshow">
        <el-radio-group v-model="form.sex">
          <el-radio :label="'男'">男</el-radio>
          <el-radio :label="'女'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" v-show="editshow">
        <el-input
          v-model="form.age"
          placeholder=""
          size="normal"
          clearable
          style="width:80px"
        ></el-input>
      </el-form-item>
      <el-form-item label="职称" v-show="editshow">
        <el-select v-model="form.title" placeholder="请选择职称">
          <el-option
            v-for="item in getInit.title"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.attribute"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学历" v-show="editshow">
        <el-select v-model="form.education" placeholder="请选择">
          <el-option
            v-for="item in getInit.education"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.attribute"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学位" v-show="editshow">
        <el-select v-model="form.degree" placeholder="请选择">
          <el-option
            v-for="item in getInit.degree"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.attribute"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂职单位">
        <el-input
          v-model="form.temporaryWorkUnit"
          placeholder=""
          size="normal"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="挂职岗位">
        <el-input
          v-model="form.temporaryJobs"
          placeholder=""
          size="normal"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker
              value-format="yyyy.MM"
              format="yyyy.MM"
              type="month"
              placeholder="选择日期"
              v-model="form.startTime"
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
              value-format="yyyy.MM"
              format="yyyy.MM"
              type="month"
              placeholder="选择日期"
              v-model="form.endTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="成效">
        <el-input
          v-model="form.results"
          placeholder=""
          size="normal"
          clearable
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>  

<script>
export default {
  name: 'TemEditor',
  props: ['form', 'getInit','editshow','addshow'],
  data() {
    return {
    };
  },
  created() {
   
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
