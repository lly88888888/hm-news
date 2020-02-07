<template>
  <div class="followUp" @click="back">
    <Hmheader name="我的跟帖" class="hm-header"></Hmheader>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad">
      <div class="main" v-for="item in followList" :key="item.id">
        <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
        <div class="parent" v-if="item.parent">
          <p>回复： {{item.parent.user.nickname}}</p>
          <span>{{item.parent.content}}</span>
        </div>
        <div class="comment">
          {{item.content}}
        </div>
        <div class="original">
          <div class="info one-txt-cut">
            {{item.post.title}}
          </div>
          <div class="icon">
            <i class="iconfont iconjiantou1"></i>
          </div>
        </div>
      </div>
    </van-list>
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
      followList: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5
    }
  },
  async created () {
    this.getFollow()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    onLoad () {
      this.pageIndex++
      this.getFollow()
    },
    async getFollow () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = [...this.followList, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.followUp{
  .hm-header{
    width: 100%;
    background-color: #f7f7f7;
    position: fixed;
    top: 0;
    left: 0;
  }
  .van-list{
    margin-top: 50px;
    .main{
      padding: 15px;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      .time{
        color: rgba(148, 148, 148, 0.866666666666667);
      }
      .parent{
        background-color: #ccc;
        padding: 10px;
        color: rgba(134, 134, 134, 0.866666666666667);
        p{
          font-size: 12px;
        }
      }
      .comment{
        margin: 10px 0;
        color: rgba(0, 0, 0, 0.866666666666667);
      }
      .original{
        color: rgba(121, 121, 121, 0.866666666666667);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info{
          flex: 1;
        }
        .icon{
          width: 30px;
          height: 30px;
        }
      }
    }
  }

}
</style>
