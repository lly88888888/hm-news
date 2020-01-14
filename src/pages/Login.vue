<template>
  <div class="login">
    <div class="close"
         @click="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="username">
      <Hminput v-model="username"
               type="text"
               placeholder="请输入用户名/手机号"
               :rules="/^1\d{4,12}$/"
               err-msg="输入手机号格式错误"></Hminput>
    </div>
    <div class="password">
      <Hminput v-model="password"
               type="password"
               placeholder="请输入密码"
               :rules="/^1\d{2,8}$/"
               err-msg="输入密码格式错误"></Hminput>
    </div>
    <div class="enter">
      <Hmbutton @click="enter">登录</Hmbutton>
    </div>
  </div>
</template>

<script>
import '../css/font.css'
import Hminput from '../components/Hminput'
import Hmbutton from '../components/Hmbutton'
import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    Hminput,
    Hmbutton
  },
  methods: {
    async enter () {
      if (!this.username && !this.password) return
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      const { data } = res
      console.log(data)

      if (data.statusCode === 401) {
        Toast('用户名或密码错误')
      } else {
        this.$router.push('/index')
      }
    },
    close () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  i {
    font-size: 27px;
  }
  .logo {
    text-align: center;
    color: #d81e06;
    span {
      font-size: 127px;
    }
  }
  .password {
    padding-bottom: 66px;
  }
}
</style>
