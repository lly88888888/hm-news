<template>
  <div class="collect">
    <Hmheader name="我的收藏" @click="back"></Hmheader>
    <HmPost :post="collectList"></HmPost>
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
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      console.log(data)
      data.forEach(element => {
        element.comment_length = element.comments.length
      })

      this.collectList = data
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
