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
  </div>
</template>
<script>
export default {
  methods: {
    login () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss">
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
