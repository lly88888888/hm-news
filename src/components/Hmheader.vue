<template>
  <div class="Hmheader">
    <div class="icon">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="Hmtitle">{{name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.Hmheader{
  padding: 20px;
  display: flex;
  .Hmtitle{
    flex: 1;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
}
</style>
