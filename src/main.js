import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$http= axios

//引入elementui 
import './utils/element.js'

//设置全局样式
import '@/assets/styles/index.scss' 

// 引入iconfont
import '@/assets/iconfont/iconfont.css';

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
