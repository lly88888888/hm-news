<template>
  <div class="hm-floor">
    <Hmfloor :index="index-1" v-if="comment.parent" :comment="comment.parent" @reply="reply"></Hmfloor>
    <div class="innfo">
      <div class="title">
      <div class="name">{{index}}  {{comment.user.nickname}}</div>
      <div class="time">{{comment.create_date| time('YYYY-MM-DD HH:mm:ss')}}</div>
      <div class="reply" @click="reply(comment.id)">回复</div>
    </div>
    <div class="comment">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hmfloor',
  props: {
    comment: Object,
    index: Number
  },
  methods: {
    reply (id) {
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-floor{
  .innfo{
    border: 1px solid #ccc;
    padding: 15px;
    background-color: rgb(242, 242, 242);
    .title{
      display: flex;
      align-items: center;
    .name{
      font-size: 14px;
      }
    .time{
      flex: 1;
      margin-left: 10px;
      }
    }
    .comment{
    font-size: 14px;
    padding-top: 10px;
    }
  }
}
</style>
