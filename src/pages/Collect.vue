<template>
  <div class="collect">
    <Hmheader name="我的收藏" @click="back"></Hmheader>
    <div class="main" v-for="item in collectList" :key="item.id">
      <div class="info">
        <p class="txt-cut">{{item.title}}</p>
        <p>
          <span>{{item.user.nickname}}</span>
          <span>52跟帖</span>
        </p>
      </div>
      <div class="img">
        <img :src="item.cover[0].url" alt="">
      </div>
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
      collectList: []
    }
  },
  async created () {
    const res = await this.$axios.get('/user_star')
    if (res.data.statusCode === 200) {
      console.log(res)

      this.collectList = res.data.data
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="scss" scoped>
.collect{
  .main{
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .info{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 10px;
      font-size: 15px;
      span{
        font-size: 13px;
        color: #868686;
        &:last-child{
          margin-left: 20px;
        }
      }
    }
    .img{
      img{
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
}
</style>
