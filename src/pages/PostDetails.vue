<template>
  <div class="post-details">
    <div class="header">
      <div class="left" @click="back">
        <i class="iconfont iconjiantou2"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
       <div class="followed" v-if="postDetails.has_follow" @click="followed(postDetails.user.id)">已关注</div>
       <div class="unfollow" v-else @click="unfollow(postDetails.user.id)">关注</div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <p>{{postDetails.title}}</p>
        <span>{{postDetails.user.nickname}}</span>
        <span>{{postDetails.create_data | time}}</span>
      </div>
      <div class="video" v-if="postDetails.type === 2 && postDetails.content.startsWith('http')">
        <video :src="postDetails.content" controls></video>
      </div>
      <div v-else v-html="postDetails.content"></div>
      <div class="interact">
        <div class="likes" :class="{goods:postDetails.has_like}" @click="likes(postDetails.id)">
          <i class="iconfont icondianzan"></i>
          <span>{{postDetails.like_length}}</span>
        </div>
        <div class="share">
          <i class="iconfont iconweixin"></i>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="title">精彩跟帖</div>
      <div class="info" v-for="item in comments" :key="item.id">
        <Hmcomments :comments="item" @reply='reply'></Hmcomments>
      </div>
      <div class="more">
        <div class="more-comments">更多跟帖</div>
      </div>
    </div>
     <div class="write-comments" v-if="isShowFocus">
      <textarea rows="3" placeholder="回复:" ref="textarea" @blur="isBlur" v-model="textareaVal"></textarea>
      <div class="btn" @click="send">发送</div>
    </div>
    <div class="footer" v-else>
      <input type="text" placeholder="写跟贴" @focus="isFocus">
      <div class="comment">
        <i class="iconfont iconpinglun-"></i>
        <span>{{comments.length}}</span>
      </div>
      <i class="iconfont iconshoucang" @click="star" :class="{star:postDetails.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
  </div>
</template>

<script>
import Hmcomments from '../components/Hmcomments'
export default {
  components: {
    Hmcomments
  },
  data () {
    return {
      postDetails: {
        user: {}
      },
      isShowFocus: false,
      comments: [],
      parentId: '',
      textareaVal: ''
    }
  },
  async created () {
    await this.getPostDetails()
    this.getPostComments()
  },
  methods: {
    async getPostDetails () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postDetails = data
      }
    },
    async getPostComments () {
      const id = this.postDetails.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.comments = data
        console.log(this.comments)
      }
    },
    back () {
      this.$router.go(-1)
    },
    async followed (id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(res.data.message)
        this.postDetails.has_follow = false
      }
    },
    async unfollow (id) {
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(res.data.message)
        this.postDetails.has_follow = true
      }
    },
    async likes (id) {
      const res = await this.$axios.get(`/post_like/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        console.log(res.data.message)
        this.getPostDetails()
      }
    },
    async isFocus () {
      this.isShowFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    isBlur () {
      if (this.$refs.textarea.value) {
        return
      }
      this.isShowFocus = false
    },
    async star () {
      const id = this.postDetails.id
      const res = await this.$axios.get(`/post_star/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getPostDetails()
      }
    },
    async reply (id) {
      this.parentId = id
      this.isShowFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send () {
      const id = this.postDetails.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.textareaVal,
        parent_id: this.parentId
      })
      const { statusCode } = res.data
      console.log(res)

      if (statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getPostComments()
        this.isShowFocus = false
        this.parentId = ''
        this.textareaVal = ''
      }
    }
  },
  watch: {
    $router () {
      this.getPostDetails()
      this.getPostComments()
    }
  }
}
</script>

<style lang="scss" scoped>
.post-details{
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    background-color: rgb(247, 247, 247);
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 15px;
    .left{
      display: flex;
      align-items: center;
      .iconjiantou2{
        font-size: 15px;
      }
      .iconnew{
        font-size: 50px;
      }
    }
    .right{
      font-size: 12px;
      .followed{
        border: 1px solid #ccc;
        padding: 5px 10px;
        text-align: center;
        border-radius: 30px;
      }
      .unfollow{
        border: 1px solid red;
        padding: 5px 10px;
        text-align: center;
        border-radius: 30px;
        background-color: red;
        color: #fff;
      }
    }
  }
  .main{
    padding: 15px;
    border-bottom: 3px solid #ccc;
    video{
      width: 100%;
    }
    .title{
      margin-top: 80px;
      p{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      span{
        font-size: 12px;
        color: #999;
        &:last-child{
          margin-left: 10px;
        }
      }
    }
    .interact{
      display: flex;
      justify-content: space-around;
      padding: 20px 0;
      .likes{
        width: 80px;
        border: 1px solid #ccc;
        border-radius: 40px;
        text-align: center;
        .icondianzan{
          font-size: 17px;
        }
        span{
          font-size: 13px;
          margin-left: 5px;
        }
      }
      .goods{
        color: red;
        border: 1px solid red;
      }
      .share{
        width: 80px;
        border: 1px solid #ccc;
        border-radius: 40px;
        text-align: center;
        .iconweixin{
          color: rgb(3, 200, 3);
          font-size: 17px;
        }
        span{
          font-size: 13px;
          margin-left: 5px;
        }
      }
    }
  }
  .comments{
    margin-bottom: 100px;
    padding: 15px;
    .title{
      text-align: center;
      font-size: 20px;
    }
    .info{
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
    }
    .more{
      padding: 20px 0;
      .more-comments{
        margin: 0 auto;
        width: 120px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 15px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .footer{
    background-color: rgb(247, 247, 247);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding:15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input{
      width: 180px;
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 90px;
      padding-left: 15px;
      background-color: rgb(215, 215, 215);
    }
    .iconfont{
      font-size: 24px;
    }
    .star{
      color:red;
    }
    .comment{
      position: relative;
      span{
        padding: 0 5px;
        background-color: red;
        color: #fff;
        border-radius: 7px;
        font-size: 12px;
        position: absolute;
        left: 10px;
        top:0;
      }
    }
  }
  .write-comments{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding:15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background-color: rgb(247, 247, 247);
    textarea{
      padding: 10px;
      flex: 1;
      border-radius: 13px;
      background-color: rgb(215, 215, 215);
    }
    .btn{
      width: 60px;
      height: 26px;
      background-color: red;
      border-radius: 13px;
      line-height: 26px;
      text-align: center;
      color: #fff;
      margin-left: 10px;
    }
  }
}
</style>
