import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import VueRouter from 'vue-router';
import router from '../router'

const service = axios.create({
  // baseURL: 'http://192.168.31.55:8001', // 总api 陈良瑞
  // baseURL: 'http://172.16.8.72:8001', // 总api 陈良瑞
  // baseURL: 'http://192.168.31.143:8001',   //总api 王宏照
  // baseURL: 'http://172.16.8.79:8001', //王宏照
  // baseURL: 'http://172.16.8.64:8001',//
  // baseURL: 'http://172.16.8.123:8001', //许玉杰
  // baseURL: 'http://172.16.8.58:8001', //
    baseURL: 'http://howling.top:8001/System', //部署上线

  timeout: 5000, // 请求超时时间
});

//****************************  请求拦截    ******************************

service.interceptors.request.use(
  (config) => {
    if (!config.headers['token']) {
      config.headers['token'] = `${window.localStorage.getItem('Authorization') || ''} `;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

//****************************  请求响应    ******************************

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(response.status)
    if (res.code === 210) {
      MessageBox.alert('用户名不存在', '错误', {
        confirmButtonText: '确定',
        type: 'error',
      });
      return Promise.reject('error');
    } else if (res.code === 201) {
      // Message.error(res.errorMsg);
      Message.error(res.message);
    } else if (res.code === 211) {
      MessageBox.alert('密码错误,请重新登录', '错误', {
        confirmButtonText: '确定',
        type: 'error',
      });
    } else if (res.code === 212) {
      Message.error(res.message);
    } else if (response.status === 213) {
      Message.error("登录已过期");
      router.replace({ path:'/login'})
      localStorage.removeItem('Authorization')
    } else if (response.status === 214) {
      Message.error("登录已过期");
      router.replace({ path: "/login" });
    } else if (res.code === 220) {
      Message.error('此教职工号不存在');
    } else if (res.code === 299) {
      Message.error(res.message);
    } else if (res.code === 509) {
      Message.error(res.message);
    } else if (res.code === 510) {
      Message.error(res.message);
    } else if (res.code === 511) {
      Message.error(res.message);
    } else if (res.code === 588) {
      Message.error(res.message);
    } else if (res.code === 520) {
      Message.error(res.message);
    } else if (res.code === 521) {
      Message.error(res.message);
    } else if (res.code === 214) {
      Message.error('token过期,请重新登录');
    } else {
      return response;
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    Message({
      message: '连接超时（后台不能连接，请联系系统管理员）',
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
