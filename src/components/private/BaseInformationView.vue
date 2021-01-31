<template>
  <div class="editor">
    <el-form ref="form" size="small" :model="form" label-width="150px">
      <el-form-item label="教职工号" required>
        <el-input v-model="form.teacherId" style="width:200px"></el-input>
      </el-form-item>

      <el-form-item label="姓名" required>
        <el-input v-model="form.name" style="width:200px"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="'男'">男</el-radio>
          <el-radio :label="'女'">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="出生年月">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.birthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="年龄" :disabled="true" v-show="age1">
        <el-input v-model="form.age" style="width:80px"></el-input>
      </el-form-item>
      <el-form-item label="教龄" :disabled="true" v-show="age1">
        <el-input v-model="form.seniority" style="width:80px"></el-input>
      </el-form-item>

      <el-form-item label="来校工作时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.workTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="职称">
        <el-select v-model="form.title" placeholder="请选择职称">
          <el-option
            v-for="item in dictionary.title"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.dictionaryDescribe"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业技术岗位">
        <el-select v-model="form.technicalPositions" placeholder="请选择类型">
          <el-option
            v-for="item in dictionary.technical_positions"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.dictionaryDescribe"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="最高学历">
        <el-select v-model="form.education" placeholder="请选择">
          <el-option
            v-for="item in dictionary.education"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.dictionaryDescribe"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学位">
        <el-select v-model="form.degree" placeholder="请选择">
          <el-option
            v-for="item in dictionary.degree"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.dictionaryDescribe"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学位获得时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.degreeTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="最高学位获得单位">
        <el-input v-model="form.degreeUnit" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="最后专业或研究方向">
        <el-input v-model="form.professional" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="学术头衔">
        <el-input v-model="form.academicTitle"></el-input>
      </el-form-item>
      <el-form-item label="荣誉称号">
        <el-input v-model="form.titleHonor"></el-input>
      </el-form-item>
      <el-form-item label="是否双师型">
        <el-radio-group v-model="form.whetherDouble">
          <el-radio :label="'是'">是</el-radio>
          <el-radio :label="'否'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="研究生导师类型">
        <el-select v-model="form.postgraduateType" placeholder="请选择">
          <el-option
            v-for="item in dictionary.postgraduate_type"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.dictionaryDescribe"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="人才引进时间">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.talentIntroductionTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="校内人才认定层次">
        <el-select v-model="form.schoolTalentLevel" placeholder="请选择">
          <el-option
            v-for="item in dictionary.school_talent_level"
            :key="item.attribute"
            :label="item.attribute"
            :value="item.dictionaryDescribe"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否海外留学或访学">
        <el-radio-group v-model="form.whetherStudyAbroad">
          <el-radio :label="'是'">是</el-radio>
          <el-radio :label="'否'">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="留(访)学国家及单位">
        <el-input v-model="form.studyInUnit"></el-input>
      </el-form-item>
      <el-form-item label="留(访)学时间段">
        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.startStudy"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>

        <el-col class="line" :span="1" style="text-align:center">
          <span>-</span>
        </el-col>

        <el-col :span="11">
          <el-date-picker
            type="month"
            value-format="yyyy.MM"
            format="yyyy.MM"
            placeholder="选择日期"
            v-model="form.endStudy"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  props: ['form', 'dictionary', 'age1'],
};
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  box-sizing: border-box;
}
</style>
