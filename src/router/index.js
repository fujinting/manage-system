import Vue from 'vue';
import VueRouter from 'vue-router';
import { getLocalStorage } from '@/utils/local-storage';

// 登录
// import Login from

import Home from '@/views/home/index.vue';
import Login from '@/views/login/index.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { login: true },
	},
	{
		path: '/',
		redirect: '/dashboard',
	},

	{
		path: '/dashboard',
		name: 'home',
		component: Home,
		children: [
			// 面板
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('@/views/dashboard/index'),
			},
			//个人信息
			// {
			// 	path: '/personal',
			// 	name: 'personal',
			// 	component: () => import('@/views/dashboard/Personal'),
			// },
			// 教师基本情况
			{
				path: '/information/base',
				name: 'baseinformation',
				component: () => import('@/views/information/baseInformation'),
				meta: {
					cname: '教师基本情况'
				},
			},
			// 学历提升情况
			{
				path: '/information/edu',
				name: 'eduinformation',
				component: () => import('@/views/information/eduInformation'),
				meta: {
					cname: '学历提升情况'
				}
			},


			//  教师挂职
			{
				path: '/experience/tem',
				name: 'temexperience',
				component: () => import('@/views/experience/temExperience'),
				meta: {
					cname: '教师挂职'
				}

			},
			// 教师实践锻炼
			{
				path: '/experience/pra',
				name: 'praexercise',
				component: () => import('@/views/experience/praExercise'),
				meta: {
					cname: '教师实践锻炼'
				}
			},



			// 教研项目
			{
				path: '/project/rese',
				name: 'reseproject',
				component: () => import('@/views/project/reseProject'),
				meta: {
					cname: '教研项目'
				}
			},
			// 本科教学质量工程项目
			{
				path: '/project/bach',
				name: 'bachproject',
				component: () => import('@/views/project/bachProject'),
				meta: {
					cname: '本科教学质量工程项目'
				}

			},


			// 教学成果及教学奖励

			{
				path: '/teach/award',
				name: 'teachaward',
				component: () => import('@/views/reward/teachAward'),
				meta: {
					cname: '教学成果及教学奖励'
				}

			},
			// 教研论文 
			{
				path: '/teach/paper',
				name: 'resepaper',
				component: () => import('@/views/reward/resePaper'),
				meta: {
					cname: '教研论文 '
				}
			},

			// 课程建设
			{
				path: '/course/construct',
				name: 'courseconstruct',
				component: () => import('@/views/course/courseConstruct'),
				meta: {
					cname: '课程建设 '
				}
			},




			// 教师参加教学会议情况
			{
				path: '/activity/metting',
				name: 'teachingmeet',
				component: () => import('@/views/activity/teachMeet'),
				meta: {
					cname: '教师参加教学会议情况'
				}
			},

			// 大学生创新项目  
			{
				path: '/activity/innovation',
				name: 'studinnovation',
				component: () => import('@/views/activity/studInnovation'),
				meta: {
					cname: '大学生创新项目  '
				}
			},
			// 指导学生参加科技大赛获奖情况
			{
				path: '/activity/reward',
				name: 'guidereward',
				component: () => import('@/views/guide/guideReward'),
				meta: {
					cname: '指导学生参加科技大赛获奖情况'
				}
			},
			// 指导本科生发表文章 
			{
				path: '/activity/paper',
				name: 'guidearticle',
				component: () => import('@/views/guide/guideArticle'),
				meta: {
					cname: '指导本科生发表文章'
				}
			},





			// 教学实践基地
			{
				path: '/base/practice',
				name: 'practicebase',
				component: () => import('@/views/base/practiceBase'),
				meta: {
					cname: '教学实践基地'
				}
			},





			// 教材建设与教材获奖 属于 其他
			{
				path: '/teac/construct',
				name: 'teacconstruct',
				component: () => import('@/views/other/teacConstruct'),
				meta: {
					cname: '教材建设与教材获奖'
				}
			},

			// 修改密码
			{
				path: '/reset/password',
				name: 'resetpwd',
				component: () => import('@/views/resetpwd/resetpwd'),
				meta: {
					cname: '修改密码'
				}
			},

			// 个人中心
			{
				path: '/forget/password',
				name: 'forgetpwd',
				component: () => import('@/views/resetpwd/forgetpwd'),
				meta: {
					cname: '个人中心'
				}
			},



		]
	},

	//404
	{
		path: '*',
		component: () => import('../views/notfound/404.vue'),
	},
];

const router = new VueRouter({
	routes,
});



// 路由前置守卫
router.beforeEach((to, from, next) => {
	const { Authorization, role } = getLocalStorage('Authorization');

	//如果没有token，并且不是登录页,跳转到登录页
	if (!Authorization) {
		if (!to.meta.login) {
			console.log('login');
			next({ name: 'login' });
			return;
		}
	}
	// 如果有token，并且权限是管理员
	// 如果有token，并且权限是教师
	next();
});


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router;
