<template>
  <div class="hm-search">
    <div class="header">
      <div class="icon" @click="back">
        <i class="iconfont iconjiantou"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="请输入搜索内容" v-model="searchTxt">
      </div>
      <div class="confirm" @click="confirm">确认</div>
    </div>
    <div class="search-info" v-if="postList.length>0">
      <HmPost :post="postList"></HmPost>
    </div>
    <div class="content" v-else>
      <div class="history">
      <div class="title">
        <span class="history-search">历史搜索</span>
        <span @click="clearHistory">清空历史</span>
      </div>
      <div class="innfo" v-for="item in history" :key="item" @click="searchHistory(item)">{{item}}</div>
      </div>
      <div class="hot-search">
        <div class="title">热门搜索</div>
        <div class="innfo" v-for="item in hotSearch" :key="item" @click="hotsearch(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HmPost from '../components/HmPost'
export default {
  components: {
    HmPost
  },
  data () {
    return {
      searchTxt: '',
      postList: [],
      history: [],
      hotSearch: ['性感', '关晓彤', '美女']
    }
  },
  created () {
    const history = JSON.parse(localStorage.getItem('history')) || []
    this.history = history
    console.log(this.history)
  },
  methods: {
    async confirm () {
      if (this.searchTxt) {
        this.history = this.history.filter(item => item !== this.searchTxt)
        this.history.unshift(this.searchTxt)
        localStorage.setItem('history', JSON.stringify(this.history))
        const res = await this.$axios.get(`/post_search`, {
          params: {
            keyword: this.searchTxt
          }
        })
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          if (data.length > 0) {
            this.postList = data
          } else {
            this.$toast.fail('抱歉,没有更多内容了')
            this.searchTxt = ''
          }
        }
      }
    },
    back () {
      if (this.searchTxt) {
        this.searchTxt = ''
      } else {
        this.$router.go(-1)
      }
    },
    searchHistory (item) {
      this.searchTxt = item
      this.confirm()
    },
    hotsearch (item) {
      this.searchTxt = item
      this.confirm()
    },
    clearHistory () {
      localStorage.removeItem('history')
      this.history = []
      this.$toast.success('清除成功')
    }
  },
  watch: {
    searchTxt () {
      if (!this.searchTxt) {
        this.postList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-search{
  .header{
    display: flex;
    padding: 10px 0;
    .icon{
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .search{
      flex: 1;
      border: 1px solid #ccc;
      height: 30px;
      line-height: 30px;
      margin-top: 5px;
      border-radius: 15px;
      padding:0 15px;
      display: flex;
      i{
        width: 30px;
      }
      input{
        flex: 1;
        background-color: #f7f7f7;
      }
    }
    .confirm{
      width: 50px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
    }
  }
  .content{
    padding: 0 15px;
    .history{
      border-bottom: 1px solid #ccc;
      .title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .history-search{
          font-size: 14px;
          font-weight: bold;
        }
      }
      .innfo{
        font-size: 12px;
        margin:15px 0;
        color: #888;
      }
    }
    .hot-search{
      .title{
        font-size: 14px;
        font-weight: bold;
        margin:15px 0;
      }
      .innfo{
        font-size: 12px;
        margin:15px 0;
        color: #888;

      }
    }
  }
}
</style>
