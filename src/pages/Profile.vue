<template>
  <div class="profile" >
    <div class="header" @click="compile">
      <div class="avatar">
        <img :src="avatar" alt="" v-show="loading">
      </div>
      <div class="info">
        <p>
          <i :class="sex"></i>
          {{profile.nickname}}
        </p>
        <p>{{profile.create_date | time}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <Hmnav name="我的关注" describe="关注的用户" @click="$router.push('/attention')"></Hmnav>
      <Hmnav name="我的跟贴" describe="跟帖/回复" @click="$router.push('/followup')"></Hmnav>
      <Hmnav name="我的收藏" describe="文章/视频" @click="$router.push('/collect')"></Hmnav>
      <Hmnav name="设置"></Hmnav>
      <Hmnav name="退出" @click="exit"></Hmnav>
    </div>
  </div>
</template>

<script>
import Hmnav from '../components/Hmnav'
import img from '../assets/1564924597807792.jpg'
export default {
  components: {
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
      profile: {},
      loading: false
    }
  },
  methods: {
    compile () {
      this.$router.push({
        name: 'compile',
        params: {
        }
      })
    },
    async exit () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确认要退出吗?'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
      } catch (error) {
      }
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
      return this.profile.gender === 1 ? 'iconfont iconxingbienan' : 'iconfont iconxingbienv'
    }
  }
}
</script>

<style lang="scss" scoped>

 .header{
   padding: 15px;
   display: flex;
   border-bottom: 5px solid rgba(228, 228, 228, 1);
   .avatar{
     width: 70px;
     height: 70px;
     img{
       width: 100%;
       border-radius: 50%;
     }
   }
   .info{
     flex: 1;
     margin-left: 10px;
     p{
       margin-top: 10px;
       font-size: 14px;
       i{
         color: red;
         &.iconxingbienan {
           color: blue;
         }
       }
       &:last-child{
         font-size: 12px;
         color: #999;
       }
     }
   }
   .icon{
     width: 30px;
     i{
       line-height: 70px;
     }
   }
 }
</style>
