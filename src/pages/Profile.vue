<template>
  <div class="profile">
    <div class="header" @click="compile">
      <div class="avatar">
        <img src="http://img.zhaogexing.com/2019/08/04/1564924597807792.jpg" alt="">
      </div>
      <div class="info">
        <p>
          <i class="iconfont iconxingbienv"></i>
          小小书童
        </p>
        <p>2020-01-07</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <Hmnav name="我的关注" describe="关注的用户"></Hmnav>
      <Hmnav name="我的跟贴" describe="跟帖/回复"></Hmnav>
      <Hmnav name="我的收藏" describe="文章/视频"></Hmnav>
      <Hmnav name="设置"></Hmnav>
    </div>
  </div>
</template>

<script>
import Hmnav from '../components/Hmnav'
export default {
  components: {
    Hmnav
  },
  async created () {
    const res = await this.$axios.get('/user/:id', {
      params: {
        id: localStorage.getItem('user_id')
      }
    })
    if (res.data.statusCode === 401) {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  methods: {
    compile () {
      this.$router.push({
        name: 'compile',
        params: {
        }
      })
    }
  }
}
</script>

<style lang="scss">
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
