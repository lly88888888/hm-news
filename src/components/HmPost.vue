<template>
  <div class="hm-post">
    <div class="main" v-for="item in post" :key="item.id" @click="$router.push(`/postdetails/${item.id}`)">
      <div class="video" v-if="item.type == 2">
        <p class="txt-cut">{{item.title}}</p>
        <div class="imgs">
          <img :src="item.cover[0].url" alt="">
          <div class="icon">
            <i class="iconfont iconshipin"></i>
          </div>
        </div>
        <p>
          <span>{{item.user.nickname}}</span>
          <span>{{item.comment_length}}跟帖</span>
        </p>
      </div>
      <div class="one" v-else-if="item.cover.length == 1">
        <div class="info">
          <p class="txt-cut">{{item.title}}</p>
          <p>
            <span>{{item.user.nickname}}</span>
            <span>{{item.comment_length}}跟帖</span>
          </p>
        </div>
        <div class="img">
          <img :src="item.cover[0].url" alt="">
        </div>
      </div>
      <div class="other" v-else>
        <p class="txt-cut">{{item.title}}</p>
        <div class="imgs">
          <img :src="items.url" alt="" v-for="items in item.cover" :key="items.id">
        </div>
        <p>
          <span>{{item.user.nickname}}</span>
          <span>{{item.comment_length}}跟帖</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-post{
  .main{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    img{
      width: 121px;
      height: 75px;
      object-fit: cover;
    }
    span{
      font-size: 13px;
      color: #868686;
      &:last-child{
        margin-left: 20px;
      }
    }
    .one{
      display: flex;
      .info{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-right: 10px;
      }
    }
    .other{
      .imgs{
        display: flex;
        margin: 10px 0;
        justify-content: space-evenly;
        img{
          width: 112px;
          height: 75px;
        }
      }
    }
    .video{
      .imgs{
        position: relative;
        margin: 10px 0;
          img{
          width: 100%;
          height: 170px;
        }
      .icon{
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background-color: rgba(0,0,0,.5);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        line-height: 46px;
        color: #fff;
        .iconshipin{
          font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
