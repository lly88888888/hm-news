<template>
  <div class="Hmheader">
    <div class="icon" @click="back">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="Hmtitle">{{name}}</div>
    <div class="icon"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    back () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.Hmheader{
  padding: 20px;
  display: flex;
  line-height: 30px;
  text-align: center;
  .icon {
    width: 30px;
    height: 30px;
  }
  .Hmtitle{
    flex: 1;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
}
</style>
