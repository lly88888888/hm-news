<template>
  <div class="compile">
    <div class="header">
      <Hmheader name="编辑资料" @click="back"></Hmheader>
    </div>
    <div class="avatar">
      <img :src="avatar" alt="" v-show="loading">
    </div>
    <div class="name" @click="updateName">
      <Hmnav name="昵称" :describe="profile.nickname"></Hmnav>
    </div>
    <div class="password">
      <Hmnav name="密码" describe="*******"></Hmnav>
    </div>
    <div class="sex">
      <Hmnav name="性别" :describe="sex"></Hmnav>
    </div>
  </div>
</template>

<script>
import Hmheader from '../components/Hmheader'
import Hmnav from '../components/Hmnav'
import img from '../assets/1564924597807792.jpg'
export default {
  components: {
    Hmheader,
    Hmnav
  },
  async created () {
    const id = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    this.profile = res.data.data
    this.loading = true
    console.log(this.profile)
  },
  data () {
    return {
      loading: false,
      profile: {}
    }
  },
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    },
    sex () {
      return this.profile.gender === 1 ? '男' : '女'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    updateName () {
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.compile{
  .avatar{
     width: 70px;
     height: 70px;
     margin: 0 auto;
     margin-bottom: 15px;
     img{
       width: 100%;
       border-radius: 50%;
     }
   }
}
</style>
