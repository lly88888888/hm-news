<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索中心</span>
      </div>
      <div class="login"
           @click="login">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-tabs v-model="active" sticky swipeable animated>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            :immediate-check="false"
            :offset="5"
            @load="onLoad">
            <HmPost :post="item.postList"></HmPost>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      tabList: [],
      loading: false,
      pageSize: 5,
      refreshing: false
    }
  },
  async created () {
    await this.getTabList()
    this.getPostList()
  },
  methods: {
    login () {
      this.$router.push('/profile')
    },
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data.forEach(element => {
          element.postList = []
          element.pageIndex = 1
          element.finished = false
        })
        this.tabList = data
      }
    },
    async getPostList () {
      const id = this.tabList[this.active].id

      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.tabList[this.active].pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList[this.active].postList = [...this.tabList[this.active].postList, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.tabList[this.active].finished = true
        }
      }
    },
    onLoad () {
      console.log(1)
      setTimeout(() => {
        this.tabList[this.active].pageIndex++
        this.getPostList()
      }, 1500)
    },
    onRefresh () {
      this.tabList[this.active].postList = []
      this.loading = true
      this.tabList[this.active].finished = false
      this.tabList[this.active].pageIndex = 1
      setTimeout(() => {
        this.refreshing = false
      }, 50000)
      this.getPostList()
    }
  },
  watch: {
    active (value) {
      this.loading = true
      if (this.tabList[this.active].postList.length) {
        return
      }
      this.getPostList()
    }
  }
}
</script>
<style lang="scss" scoped>
.index {
  .header {
    display: flex;
    height: 49px;
    background-color: rgba(255, 0, 0, 1);
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
    .logo {
      i {
        font-size: 54px;
      }
    }
    .search {
      position: relative;
      width: 210px;
      height: 34px;
      line-height: 34px;
      border-radius: 17px;
      background-color: rgba(242, 242, 242, 0.7);
      i {
        position: absolute;
        left: 30%;
        top: 50%;
        transform: translate(-30%, -50%);
        font-size: 18px;
      }
      span {
        position: absolute;
        left: 55%;
        top: 50%;
        transform: translate(-55%, -50%);
        font-size: 16px;
      }
    }
    .login {
      i {
        font-size: 32px;
      }
    }
  }
}
</style>
