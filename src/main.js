import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'lib-flexible'
import './css/base.css'
import { Toast, Dialog, Field, Cell, CellGroup, RadioGroup, Radio, Uploader, Button, List } from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(List)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  if (res.data.statusCode === 401 && res.data.message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    Toast('用户信息验证失败')
    router.push('/login')
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
//  添加请求拦截器
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
Vue.filter('time', (value, format = 'YYYY-MM-DD') => {
  return moment(value).format(format)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
