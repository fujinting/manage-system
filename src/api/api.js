import request from '../utils/request';

// 编辑信息
// const test = '/teacher/getAll'
// export function Test(query){
//     return request({
//         url:test,
//         method:'get',
//         params:query
//     })
// }

//饼状图获取数据 user/getRoleNum
const dashboard = '/user/getRoleNum';
export function getDashboard() {
  return request({
    url: dashboard,
    method: 'get',
  });
}
// 登录
const login = '/user/login';
export function Login(data) {
  return request({
    url: login,
    method: 'post',
    data: data,
  });
}

// 获取教师基本情况的列表
const getBaseInformationList = '/teacher/selectAllTeacherInfo';
export function getTeacherBaseInformationList(data) {
  return request({
    url: getBaseInformationList,
    params:data,
    method: 'get',
  });
}

//编辑教师基本情况
const editBaseInformation = '/teacher/updateTeacherInfo';
export function editTeacherBaseInformation(data) {
  return request({
    url: editBaseInformation,
    method: 'put',
    data: data,
  });
}

// 删除教师 :放请求体
const deleteBaseInformation = '/teacher/deleteTeacherById';
export function deleteTeacherBaseInformation(data) {
  return request({
    url: deleteBaseInformation,
    method: 'delete',
    data: data,
  });
}

// 按条件查询教师基本信息
const selectBaseInformation = '/teacher/teacherConditionalQuery';
export function selectTeacherBaseInformation(data,query) {
  return request({
    url: selectBaseInformation,
    method: 'post',
    params:query,
    data: data,
  });
}

// 按条件查询教师基本信息
const teacherInfo = 'user/getTeacherInfo';
export function getTeacherInfo(data) {
  return request({
    url: teacherInfo,
    method: 'post',
    data: data,
  });
}

//添加教师基本情况信息
const addBaseInformation = '/teacher/insertTeacherInfo';
export function addTeacherEduProInfoList(data) {
  return request({
    url: addBaseInformation,
    method: 'post',
    data: data,
  });
}

// 导出教师基本信息Excel
const downloadEduProInfoList = '/teacher/writeExcel';
export function downloadTeacherEduProInfoList(data) {
  return request({
    url: downloadEduProInfoList,
    params:data,
    method: 'get',
    responseType: 'blob',
  });
}

//===================================================================================================

// 学历提升教师信息列表
const getEduProInfoList = '/teacherEducationPromotion/getAllTeacherPromotion';
export function getTeacherEduProInfoList(query) {
  return request({
    url: getEduProInfoList,
    method: 'get',
    params: query,
  });
}

//编辑教师学历提升情况
const editPromoteInformation = '/teacherEducationPromotion/putTeacherPromotion';
export function editTeacherPromoteInformation(data) {
  return request({
    url: editPromoteInformation,
    method: 'put',
    data: data,
  });
}

//添加教师学历提升情况
const addPromoteInformation = '/teacherEducationPromotion/postTeacherPromotion';
export function addTeacherProInformation(data) {
  return request({
    url: addPromoteInformation,
    method: 'post',
    data: data,
  });
}
// 删除教师 :放请求体
const deletePromInformation = '/teacherEducationPromotion/deleteTeacherPromotion';
export function deleteTeacherProInformation(data) {
  return request({
    url: deletePromInformation,
    method: 'delete',
    data: data,
  });
}

// 按条件查询教师提升信息
const selectPromInformation =
  '/teacherEducationPromotion/selectTeacherPromotionByCondition';
export function selectTeacherPromInformation(data, query) {
  return request({
    url: selectPromInformation,
    method: 'post',
    data: data,
    params: query,
  });
}

// 学历提升导出接口
const downloadPromInformation = '/teacherEducationPromotion/writeExcel';
export function downloadTeacherPromInformation(query) {
  return request({
    url: downloadPromInformation,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}
// ==================================================================================
//获取教师挂职列表
const getTemExperience = '/teacherAppoint/getAllTeacherAppoint';
export function getTemExperienceInformation(query) {
  return request({
    url: getTemExperience,
    method: 'get',
    params: query,
  });
}

//编辑教师挂职信息
const editTemExperience = '/teacherAppoint/putTeacherAppoint';
export function editTemExperienceInformation(data) {
  return request({
    url: editTemExperience,
    method: 'put',
    data: data,
  });
}

//删除教师挂职信息
const deletTemExperience = '/teacherAppoint/deleteTeacherAppoint';
export function deletTemExperienceInformation(data) {
  return request({
    url: deletTemExperience,
    method: 'delete',
    data: data,
  });
}

//添加教师挂职信息
const addTemExperience = '/teacherAppoint/postTeacherAppoint';
export function addTemExperienceInformation(data) {
  return request({
    url: addTemExperience,
    method: 'post',
    data: data,
  });
}

//按条件查询教师挂职信息
const selectTemExperience = '/teacherAppoint/selectTeacherAppointByCondition';
export function selectTemExperienceInformation(data, query) {
  return request({
    url: selectTemExperience,
    method: 'post',
    data: data,
    params: query,
  });
}

// 导出接口
const downloadexcel = '/teacherAppoint/writeExcel';
export function downloadExcelTemplate(query) {
  return request({
    url: downloadexcel,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}

// ===============================================================================
// 教师实践锻炼

// 删除教师实践锻炼信息
const deletPraExercise = '/teacherPractice/deleteTeacherById';
export function deletPraExerciseInformation(data) {
  return request({
    url: deletPraExercise,
    method: 'delete',
    data: data,
  });
}

// 教师实践信息列表
const getPraExercise = '/teacherPractice/selectAllTeacherPracticeInfo';
export function getPraExerciseInformation(query) {
  return request({
    url: getPraExercise,
    method: 'get',
    params: query,
  });
}

//教师实践条件查询
const searchPraExercise = '/teacherPractice/teacherPracticeQuery';
export function searchPraExerciseInformation(data, query) {
  return request({
    url: searchPraExercise,
    method: 'post',
    data: data,
    params: query,
  });
}

//编辑教师实践
const editPraExercise = '/teacherPractice/updateTeacherInfo';
export function editPraExerciseInformation(data) {
  return request({
    url: editPraExercise,
    method: 'put',
    data: data,
  });
}

//添加教师实践信息
const addPraExercise = '/teacherPractice/insertTeacherPractice';
export function addPraExerciseInformation(data) {
  return request({
    url: addPraExercise,
    method: 'post',
    data: data,
  });
}

// 教师实践导出接口
const downloadPraExercise = '/teacherPractice/writeExcel';
export function downloadPraExerciseInformation(query) {
  return request({
    url: downloadPraExercise,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}
// ======================================================================
//教研项目

//删除教研项目
const deletReseProject = '/researchProject/deleteResearchProjectById';
export function deletReseProjectInformation(data) {
  return request({
    url: deletReseProject,
    method: 'delete',
    data: data,
  });
}

//获得教研项目列表
const getReseProject = '/researchProject/selectAllResearchProjectInfo';
export function getReseProjectInformation(data) {
  return request({
    url: getReseProject,
    method: 'get',
    params: data,
  });
}

//添加教研项目信息
const addReseProject = '/researchProject/insertTeacherPractice';
export function addReseProjectInformation(data) {
  return request({
    url: addReseProject,
    method: 'post',
    data: data,
  });
}

//编辑教研项目的信息
const editReseProject = '/researchProject/updateResearchProjectInfo';
export function editReseProjectInformation(data) {
  return request({
    url: editReseProject,
    method: 'put',
    data: data,
  });
}

//条件教研项目
const selectReseProject = '/researchProject/researchProjectQuery';
export function selectReseProjectInformation(data, query) {
  return request({
    url: selectReseProject,
    method: 'post',
    data: data,
    params: query,
  });
}

// 教研项目导出接口
const downloadReseProject = '/researchProject/writeExcel';
export function downloadReseProjectInformation(query) {
  return request({
    url: downloadReseProject,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}

//================================================================================
//教研论文
//获取列表
const allResearchPapersInfo = '/teacherResearchPapers/getTeacherResearchPapers';
export function getAllResearchPapersInfo(query) {
  return request({
    url: allResearchPapersInfo,
    method: 'get',
    params: query,
  });
}

//编辑
const editResearchPapersInfo = '/teacherResearchPapers/putTeacherResearchPapers';
export function getEditResearchPapersInfo(data) {
  return request({
    url: editResearchPapersInfo,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteResearch = '/teacherResearchPapers/deleteTeacherResearchPapers';
export function getDeleteResearch(data) {
  return request({
    url: deleteResearch,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectTeacherResearch =
  '/teacherResearchPapers/selectTeacherResearchPapersByCondition';
export function getSelectTeacherResearch(data, query) {
  return request({
    url: selectTeacherResearch,
    method: 'post',
    data: data,
    params: query,
  });
}

// 添加
const insertResearchPapers = '/teacherResearchPapers/postTeacherResearchPapers';
export function getInsertResearchPapers(data) {
  return request({
    url: insertResearchPapers,
    method: 'post',
    data: data,
  });
}

//导出教研论文
const writeExcel = '/teacherResearchPapers/writeExcel';
export function getWriteExcel(query) {
  return request({
    url: writeExcel,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}
// =======================================================================
//大学生创新项目
//获取列表
const selectAllStartupInfo = '/startupProject/getStartupProject';
export function getSelectAllStartupInfo(query) {
  return request({
    url: selectAllStartupInfo,
    method: 'get',
    params: query,
  });
}

//编辑
const editStartupInfo = '/startupProject/putStartupProject';
export function getEditStartupInfo(data) {
  return request({
    url: editStartupInfo,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteStartupById = '/startupProject/deleteStartupProject';
export function getDeleteStartupById(data) {
  return request({
    url: deleteStartupById,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const startupConditionalQuery = '/startupProject/selectStartupProjectByCondition';
export function getStartupConditionalQuery(data, query) {
  return request({
    url: startupConditionalQuery,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const insertStartup = '/startupProject/postStartupProject';
export function getInsertStartup(data) {
  return request({
    url: insertStartup,
    method: 'post',
    data: data,
  });
}

// 导出大学生创新项目
const startupProjectWriteExcel = '/startupProject/writeExcel';
export function getStartupProjectWriteExcel(query) {
  return request({
    url: startupProjectWriteExcel,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}

// //===================================================================================================
//课程建设
//获取列表
const courseBuild = '/courseBuild/getCourseBuild';
export function getCourseBuild(query) {
  return request({
    url: courseBuild,
    method: 'get',
    params: query,
  });
}

//编辑
const putCourseBuild = '/courseBuild/putCourseBuild';
export function getPutCourseBuild(data) {
  return request({
    url: putCourseBuild,
    method: 'put',
    data: data,
  });
}

// // 删除 :放请求体
const deleteCourseBuild = '/courseBuild/deleteCourseBuild';
export function getDeleteCourseBuild(data) {
  return request({
    url: deleteCourseBuild,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectCourseBuildByCondition = '/courseBuild/selectCourseBuildByCondition';
export function getSelectCourseBuildByCondition(data, query) {
  return request({
    url: selectCourseBuildByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postCourseBuild = '/courseBuild/postCourseBuild';
export function getPostCourseBuild(data) {
  return request({
    url: postCourseBuild,
    method: 'post',
    data: data,
  });
}

// 课程建设导出接口
const downloadCourseBuild = '/courseBuild/writeExcel';
export function downloadCourseBuildByCondition(query) {
  return request({
    url: downloadCourseBuild,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}
//===================================================================================================
//教师参加教学会议情况
//获取列表
const teachingMeet = '/teachingMeet/getTeachingMeet';
export function getTeachingMeet(query) {
  return request({
    url: teachingMeet,
    method: 'get',
    params: query,
  });
}

//编辑
const putTeachingMeet = '/teachingMeet/putTeachingMeet';
export function getPutTeachingMeet(data) {
  return request({
    url: putTeachingMeet,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteTeachingMeet = '/teachingMeet/deleteTeachingMeet';
export function getDeleteTeachingMeet(data) {
  return request({
    url: deleteTeachingMeet,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectTeachingMeetByCondition = '/teachingMeet/selectTeachingMeetByCondition';
export function getSelectTeachingMeetByCondition(data, query) {
  return request({
    url: selectTeachingMeetByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postTeachingMeet = '/teachingMeet/postTeachingMeet';
export function getPostTeachingMeet(data) {
  return request({
    url: postTeachingMeet,
    method: 'post',
    data: data,
  });
}
// 导出
const teachingMeetWriteExcel = '/teachingMeet/writeExcel';
export function getTeachingMeetWriteExcel(data) {
  return request({
    url: teachingMeetWriteExcel,
    method: 'get',
    params: data,
    responseType: 'blob',
  });
}

//===================================================================================================
//精品课程
//获取列表
const allQualiyuCourse = '/qualityCourse/getAllQualiyuCourse';
export function getAllQualiyuCourse(query) {
  return request({
    url: allQualiyuCourse,
    method: 'get',
    params: query,
  });
}

//编辑
const putQualityCourse = '/qualityCourse/putQualityCourse';
export function getPutQualityCourse(data) {
  return request({
    url: putQualityCourse,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteQualityCourse = '/qualityCourse/deleteQualityCourse';
export function getDeleteQualityCourse(data) {
  return request({
    url: deleteQualityCourse,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectQualityCourseByCondition = '/qualityCourse/selectQualityCourseByCondition';
export function getSelectQualityCourseByCondition(data, query) {
  return request({
    url: selectQualityCourseByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postQualityCourse = '/qualityCourse/postQualityCourse';
export function getPostQualityCourse(data) {
  return request({
    url: postQualityCourse,
    method: 'post',
    data: data,
  });
}
//导出五个表
const allWriteExcel = '/qualityCourse/writeExcel';
export function getAllWriteExcel(query) {
  return request({
    url: allWriteExcel,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}
//===================================================================================================
//教学名师
//获取列表
const allTeacher = '/qualityTeacher/getAllTeacher';
export function getAllTeacher(query) {
  return request({
    url: allTeacher,
    method: 'get',
    params: query,
  });
}

//编辑
const putTeacher = '/qualityTeacher/putTeacher';
export function getPutTeacher(data) {
  return request({
    url: putTeacher,
    method: 'put',
    data: data,
  });
}

// // 删除 :放请求体
const deleteTeacher = '/qualityTeacher/deleteTeacher';
export function getDeleteTeacher(data) {
  return request({
    url: deleteTeacher,
    method: 'delete',
    data: data,
  });
}

//按条件查询
const selectTeacherByCondition = '/qualityTeacher/selectTeacherByCondition';
export function getSelectTeacherByCondition(data, query) {
  return request({
    url: selectTeacherByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postTeacher = '/qualityTeacher/postTeacher';
export function getPostTeacher(data) {
  return request({
    url: postTeacher,
    method: 'post',
    data: data,
  });
}
//===================================================================================================
//特色专业
//获取列表
const allProfessional = '/qualityProfessional/getAllProfessional';
export function getAllProfessional(query) {
  return request({
    url: allProfessional,
    method: 'get',
    params: query,
  });
}

//编辑
const putProfessional = '/qualityProfessional/putProfessional';
export function getPutProfessional(data) {
  return request({
    url: putProfessional,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteProfessional = '/qualityProfessional/deleteProfessional';
export function getDeleteProfessional(data) {
  return request({
    url: deleteProfessional,
    method: 'delete',
    data: data,
  });
}

//按条件查询
const selectProfessionalByCondition =
  '/qualityProfessional/selectProfessionalByCondition';
export function getSelectProfessionalByCondition(data, query) {
  return request({
    url: selectProfessionalByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postProfessional = '/qualityProfessional/postProfessional';
export function getPostProfessional(data) {
  return request({
    url: postProfessional,
    method: 'post',
    data: data,
  });
}

//===================================================================================================
// 教学称号

//获取列表
const allQualityTitle = '/qualityTitle/getAllQualityTitle';
export function getAllQualityTitle(query) {
  return request({
    url: allQualityTitle,
    method: 'get',
    params: query,
  });
}

//编辑
const putQualityTitle = '/qualityTitle/putQualityTitle';
export function getPutQualityTitle(data) {
  return request({
    url: putQualityTitle,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteQualityTitle = '/qualityTitle/deleteQualityTitle';
export function getDeleteQualityTitle(data) {
  return request({
    url: deleteQualityTitle,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectQualityTitleByCondition = '/qualityTitle/selectQualityTitleByCondition';
export function getSelectQualityTitleByCondition(data, query) {
  return request({
    url: selectQualityTitleByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postQualityTitle = '/qualityTitle/postQualityTitle';
export function getPostQualityTitle(data) {
  return request({
    url: postQualityTitle,
    method: 'post',
    data: data,
  });
}

//===================================================================================================
//教学团队
//获取列表
const allQualityTeam = '/qualityTeam/getAllQualityTeam';
export function getAllQualityTeam(query) {
  return request({
    url: allQualityTeam,
    method: 'get',
    params: query,
  });
}

//编辑
const putQualityTeam = '/qualityTeam/putQualityTeam';
export function getPutQualityTeam(data) {
  return request({
    url: putQualityTeam,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteQualityTeam = '/qualityTeam/deleteQualityTeam';
export function getDeleteQualityTeam(data) {
  return request({
    url: deleteQualityTeam,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectQualityTeamByCondition = '/qualityTeam/selectQualityTeamByCondition';
export function getSelectQualityTeamByCondition(data, query) {
  return request({
    url: selectQualityTeamByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postQualityTeam = '/qualityTeam/postQualityTeam';
export function getPostQualityTeam(data) {
  return request({
    url: postQualityTeam,
    method: 'post',
    data: data,
  });
}
//===================================================================================================
//指导本科生发表文章
//获取列表
const publications = '/publications/getPublications';
export function getPublications(query) {
  return request({
    url: publications,
    method: 'get',
    params: query,
  });
}

//编辑
const putPublications = '/publications/putPublications';
export function getPutPublications(data) {
  return request({
    url: putPublications,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deletePublications = '/publications/deletePublications';
export function getDeletePublications(data) {
  return request({
    url: deletePublications,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectPublicationsByCondition = '/publications/selectPublicationsByCondition';
export function getSelectPublicationsByCondition(data, query) {
  return request({
    url: selectPublicationsByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const postPublications = '/publications/postPublications';
export function getPostPublications(data) {
  return request({
    url: postPublications,
    method: 'post',
    data: data,
  });
}

//导出
const writePublicationsn = '/publications/writeExcel';
export function getWritePublicationsn(query) {
  return request({
    url: writePublicationsn,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}

//================================================================================
// 获取教学成果及教学奖励列表
const getTeachAwardList = '/teacherAchievementAward/selectAllByPage';
export function getTeacherAwardList(query) {
  return request({
    url: getTeachAwardList,
    method: 'get',
    params: query,
  });
}

//编辑教学成果及教学奖励
const editTeachAward = '/teacherAchievementAward/update';
export function editTeacherAward(data) {
  return request({
    url: editTeachAward,
    method: 'put',
    data: data,
  });
}

// 删除教学成果及教学奖励 :放请求体
const deleteTeachAward = '/teacherAchievementAward/deleteById';
export function deleteTeacherAward(data) {
  return request({
    url: deleteTeachAward,
    method: 'delete',
    data: data,
  });
}

// 按条件查询教学成果及教学奖励基本信息
const selectTeachAward = '/teacherAchievementAward/selectByCondition';
export function selectTeacherAward(data, query) {
  return request({
    url: selectTeachAward,
    method: 'post',
    data: data,
    params: query,
  });
}

//添加教学成果及教学奖励基本信息
const addInsert = '/teacherAchievementAward/insert';
export function getAddInsert(data) {
  return request({
    url: addInsert,
    method: 'post',
    data: data,
  });
}

//教学成果及教学奖励导出
const writeByCondition = '/teacherAchievementAward/writeByCondition';
export function getWriteByCondition(data) {
  return request({
    url: writeByCondition,
    method: 'get',
    params: data,
    responseType: 'blob',
  });
}

//===================================================================================================
//指导学生参加科技大赛获奖情况
//获取列表
const selectPage = '/technologyCompetition/selectPage';
export function getSelectPage(query) {
  return request({
    url: selectPage,
    method: 'get',
    params: query,
  });
}

//编辑
const update = '/technologyCompetition/update';
export function getUpdate(data) {
  return request({
    url: update,
    method: 'put',
    data: data,
  });
}

// 删除 :放请求体
const deleteById = '/technologyCompetition/deleteById';
export function getDeleteById(data) {
  return request({
    url: deleteById,
    method: 'delete',
    data: data,
  });
}

// 按条件查询
const selectByCondition = '/technologyCompetition/selectByCondition';
export function getSelectByCondition(data, query) {
  return request({
    url: selectByCondition,
    method: 'post',
    data: data,
    params: query,
  });
}
// 添加
const insert = '/technologyCompetition/insert';
export function getInsert(data) {
  return request({
    url: insert,
    method: 'post',
    data: data,
  });
}
//导出
const writeCompetition = '/technologyCompetition/writeExcel';
export function getWriteCompetition(query) {
  return request({
    url: writeCompetition,
    method: 'get',
    params: query,
    responseType: 'blob'
  });
}
// =========================================================================================
//教学实践基地
//删除教学实践基地信息
const deletPracticeBase = '/teachingPracticeBase/deleteTeachingPracticeBase';
export function deletPracticeBaseInformation(data) {
  return request({
    url: deletPracticeBase,
    method: 'delete',
    data: data,
  });
}

//获得教学实践基地列表
const getPracticeBase = '/teachingPracticeBase/getTeachingPracticeBase';
export function getPracticeBaseInformation(query) {
  return request({
    url: getPracticeBase,
    method: 'get',
    params: query,
  });
}

//添加教学实践基地信息
const addPracticeBase = '/teachingPracticeBase/postTeachingPracticeBase';
export function addPracticeBaseInformation(data) {
  return request({
    url: addPracticeBase,
    method: 'post',
    data: data,
  });
}

//编辑教学实践基地的信息
const editPracticeBase = '/teachingPracticeBase/putTeachingPracticeBase';
export function editPracticeBaseInformation(data) {
  return request({
    url: editPracticeBase,
    method: 'put',
    data: data,
  });
}

//条件查询教学实践基地
const selectPracticeBase = '/teachingPracticeBase/selectTeachingPracticeBaseByCondition';
export function selectPracticeBaseInformation(data, query) {
  return request({
    url: selectPracticeBase,
    method: 'post',
    data: data,
    params: query,
  });
}

// 导出接口
const downloadPracticeBase = '/teachingPracticeBase/writeExcel';
export function downloadPracticeBaseInformation(query) {
  return request({
    url: downloadPracticeBase,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}
// ==========================================================================
//教材建设与获奖

//删除教材建设与教材获奖
const deletTeacConstruct = '/teachingMaterial/deleteById';
export function deletTeacConstructInformation(data) {
  return request({
    url: deletTeacConstruct,
    method: 'delete',
    data: data,
  });
}

//获得教材建设与教材获奖列表
const getTeacConstruct = '/teachingMaterial/selectPage';
export function getTeacConstructInformation(query) {
  return request({
    url: getTeacConstruct,
    method: 'get',
    params: query,
  });
}

//添加教材建设与教材获奖信息
const addTeacConstruct = '/teachingMaterial/insert';
export function addTeacConstructInformation(data) {
  return request({
    url: addTeacConstruct,
    method: 'post',
    data: data,
  });
}

//编辑教材建设与教材获奖的信息
const editTeacConstruct = '/teachingMaterial/update';
export function editTeacConstructInformation(data) {
  return request({
    url: editTeacConstruct,
    method: 'put',
    data: data,
  });
}

//条件查询教材建设与教材获奖
const selectTeacConstruct = '/teachingMaterial/selectByCondition';
export function selectTeacConstructInformation(data, query) {
  return request({
    url: selectTeacConstruct,
    method: 'post',
    data: data,
    params: query,
  });
}

// 教材建设与教材获奖导出接口
const downloadTeacConstruct = '/teachingMaterial/writeExcel';
export function downloadTeacConstructInformation(query) {
  return request({
    url: downloadTeacConstruct,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}

//===================================================================================================
// 管理员修改密码,教师修改密码
const resetpwd = '/user/postTeacherPassword';
export function resetPassword(data) {
  return request({
    url: resetpwd,
    method: 'post',
    data: data,
  });
}

const resetForgetPwd = '/teacher/postForcedTeacherPassowrd';
export function resetForgePassword(data) {
  return request({
    url: resetForgetPwd,
    method: 'post',
    data: data,
  });
}

// 下载模板
const downloadtemplate = 'template/download';
export function downloadTemplateFile(query) {
  return request({
    url: downloadtemplate,
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}
