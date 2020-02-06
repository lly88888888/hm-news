import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Index from '../pages/Index.vue'
import Profile from '../pages/Profile.vue'
import Compile from '../pages/Compile.vue'
import Attention from '../pages/Attention.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/index', component: Index, name: 'index' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/compile', component: Compile, name: 'compile' },
    { path: '/attention', component: Attention, name: 'attention' }
  ]
})
const pathURL = ['/profile', '/compile']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (pathURL.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
