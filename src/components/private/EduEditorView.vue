<template>
  <div>
    <el-form ref="form" size="small" :model="form" label-width="150px">
      <el-form-item label="教职工号" v-show="editshow" required>
        <el-input v-model="form.teacherId" style="width:200px"></el-input>
      </el-form-item>

      <el-form-item label="姓名" v-show="editshow" required>
        <el-input
          v-model="form.name"
          size="normal"
          style="width:20%"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="原专业技术职务">
        <el-input
          v-model="form.originalProfessionalTechnical"
          size="normal"
          clearable
          style="width:60%"
        ></el-input>
      </el-form-item>

      <el-form-item label="取得学历">
        <el-input
          v-model="form.qualifications"
          placeholder=""
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>
      <el-form-item label="取得学位">
        <el-input
          v-model="form.degree"
          placeholder=""
          size="normal"
          clearable
          style="width:20%"
        ></el-input>
      </el-form-item>
      <el-form-item label="就读学校">
        <el-input
          v-model="form.school"
          placeholder=""
          size="normal"
          clearable
          style="width:60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="就读专业">
        <el-input
          v-model="form.professional"
          placeholder=""
          size="normal"
          clearable
          style="width:60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="经费来源">
        <el-input
          v-model="form.sourcesFounds"
          placeholder=""
          size="normal"
          clearable
          style="width:60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="进修内容">
        <el-input
          type="textarea"
          v-model="form.educationContent"
          placeholder=""
          size="normal"
          clearable
          style="width:60%"
        ></el-input>
      </el-form-item>
      <el-form-item label="进修时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="进修开始时间"
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
            placeholder="进修结束时间"
            v-model="form.endTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="完成情况">
        <el-select v-model="form.completion" placeholder="请选择类型">
          <el-option label="未完成" value="未完成"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EduEditor',
  props: ['form', 'editshow'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
