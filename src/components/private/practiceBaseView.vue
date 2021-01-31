<template>
  <div>
    <el-form ref="form" size="small" :model="form" label-width="150px">
      <el-form-item label="基地名称" required>
        <el-input
          v-model="form.name"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item label="基地地点" required>
        <el-input
          v-model="form.place"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="设立时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.time"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="建设或依托单位">
        <el-input
          v-model="form.constructionUnit"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="用途">
        <el-select v-model="form.application" placeholder="请选择">
          <el-option label="教学" value="教学"></el-option>
          <el-option label="科研" value="科研"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可容纳学生数">
        <el-input
          v-model="form.number"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:20%
          "
        ></el-input>
      </el-form-item>
      <el-form-item label="经费来源">
        <el-input
          v-model="form.sourceFund"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          v-model="form.note"
          placeholder=""
          size="normal"
          clearable
          @change=""
          style="width:70%"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'practiceBaseView',
  props: ['form'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
