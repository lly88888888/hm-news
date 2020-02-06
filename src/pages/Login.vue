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
    <div class="to-register">
      没有账号?立即<span @click="toRegister">注册</span>
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
      password: ''
    }
  },
  components: {
    Hminput,
    Hmbutton
  },
  created () {
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  },
  methods: {
    async enter () {
      if (!this.username && !this.password) return this.$toast('用户名或密码不能为空')
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { data } = res
      console.log(data)

      if (data.statusCode === 401) {
        this.$toast('用户名或密码错误')
      } else {
        // 将登录的token和id存到浏览器缓存中,为了后续查询登录状态
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user_id', data.data.user.id)
        this.$router.push('/profile')
      }
    },
    close () {
      this.$router.go(-1)
    },
    toRegister () {
      this.$router.push('/register')
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
  .to-register{
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    span{
      color: red;
    }
  }
}
</style>
