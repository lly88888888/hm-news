<template>
  <div class="hm-comments">
    <div class="message">
      <img :src="$axios.defaults.baseURL + comments.user.head_img" alt="">
      <div class="info">
        <div class="name">{{comments.user.nickname}}</div>
        <div class="time">{{comments.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
    <div class="reply" @click="reply(comments.id)">回复</div>
    </div>
    <Hmfloor :comment="comments.parent" v-if="comments.parent" :index="index" @reply="reply"></Hmfloor>
    <div class="comments">{{comments.content}}</div>
  </div>
</template>

<script>
import Hmfloor from '../components/Hmfloor'
export default {
  data () {
    return {
      index: this.getParents(0, this.comments)
    }
  },
  props: {
    comments: Object
  },
  components: {
    Hmfloor
  },
  methods: {
    getParents (num, comments) {
      if (comments.parent) {
        return this.getParents(num + 1, comments.parent)
      } else {
        return num
      }
    },
    reply (id) {
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-comments{
  .message{
    display: flex;
    margin-bottom: 10px;
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .info{
      flex: 1;
      margin-left: 10px;
      .name{
        font-size: 14px;
      }
      .time{
        color: #ccc;
      }
    }
  }
  .comments{
    font-size: 14px;
    padding-top: 10px;
  }
}
</style>
