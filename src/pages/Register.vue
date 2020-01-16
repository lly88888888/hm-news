<template>
  <div class="register">
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
               err-msg="账号格式错误"></Hminput>
    </div>
    <div class="nickname">
      <Hminput v-model="nickname"
               type="text"
               placeholder="请输入您的昵称"
               :rules="/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/"
               err-msg="请输入合法昵称"></Hminput>
    </div>
    <div class="password">
      <Hminput v-model="password"
               type="password"
               placeholder="请输入密码"
               :rules="/^1\d{2,8}$/"
               err-msg="密码格式错误"></Hminput>
    </div>
    <div class="login">
      <Hmbutton @click="register">注册</Hmbutton>
    </div>
    <div class="to-login">
      已有账号?立即<span @click="toLogin">登录</span>
    </div>
  </div>
</template>

<script>
import '../css/font.css'
import Hminput from '../components/Hminput'
import Hmbutton from '../components/Hmbutton'
export default {
  data () {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  components: {
    Hminput,
    Hmbutton
  },
  methods: {
    async register () {
      if (!this.username && !this.password && !this.nickname) return
      const res = await this.$axios.post('/register', {
        username: this.username,
        nickname: this.nickname,
        password: this.password
      })
      const { data } = res
      if (data.statusCode === 400) {
        this.$toast(data.message)
      } else {
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      }
    },
    close () {
      this.$router.go(-1)
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
.register {
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
  .to-login{
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    span{
      color: red;
    }
  }
}
</style>
