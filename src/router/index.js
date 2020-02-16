import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Index from '../pages/Index.vue'
import Profile from '../pages/Profile.vue'
import Compile from '../pages/Compile.vue'
import Attention from '../pages/Attention.vue'
import Collect from '../pages/Collect.vue'
import FollowUp from '../pages/FollowUp.vue'
import PostDetails from '../pages/PostDetails.vue'
import Category from '../pages/Category.vue'
import Search from '../pages/Search.vue'
import store from '../store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/index', component: Index, name: 'index' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/compile', component: Compile, name: 'compile' },
    { path: '/attention', component: Attention, name: 'attention' },
    { path: '/collect', component: Collect, name: 'collect' },
    { path: '/followup', component: FollowUp, name: 'followup' },
    { path: '/postdetails/:id', component: PostDetails, name: 'postdetails' },
    { path: '/category', component: Category, name: 'category' },
    { path: '/search', component: Search, name: 'search' }
  ]
})
const pathURL = ['/profile', '/compile', '/followup', '/collect', '/attention']
router.beforeEach((to, from, next) => {
  if (to.name === 'index') {
    store.commit('catch', 'index')
  }
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
