<template>
  <div class="attention">
    <Hmheader name="我的关注" @click="back"></Hmheader>
    <div class="hm-main" v-for="item in attentionList" :key="item.id">
      <div class="img">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="">
      </div>
      <div class="info">
        <p>{{item.nickname}}</p>
        <span>{{item.create_date | time}}</span>
      </div>
      <div class="cancal" @click="cancalFollow(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
import Hmheader from '../components/Hmheader'
export default {
  components: {
    Hmheader
  },
  data () {
    return {
      attentionList: []
    }
  },
  created () {
    this.getAttention()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async cancalFollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确认要取消关注该用户吗?'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success('取消关注成功')
          this.getAttention()
        }
      } catch (error) {
      }
    },
    async getAttention () {
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      this.attentionList = res.data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.attention{
  .hm-main{
    padding: 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    .img{
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .info{
      flex: 1;
      margin-left: 10px;
      p{
        font-size: 16px;
        color: rgba(0,0,0,0.87);
      }
      span{
        font-size: 14px;
        color: rgba(0,0,0,0.54);
      }
    }
    .cancal{
      width: 73px;
      height: 30px;
      font-size: 12px;
      background-color: rgba(153, 153, 153, 0.2);
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
    }
  }
  }
</style>
