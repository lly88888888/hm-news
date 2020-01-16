<template>
  <div class="hm-nav" @click="details">
    <div class="hm-left">{{name}}</div>
    <div class="hm-center">{{describe}}</div>
    <div class="hm-right">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    describe: {
      type: String
    }
  },
  methods: {
    details () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-nav{
  display: flex;
   padding: 15px;
   padding-left: 0;
   margin-left: 15px;
   border-bottom: 1px solid #ccc;
   line-height: 30px;
  .hm-left{
    flex: 1;
    font-size: 14px;
  }
  .hm-center{
    font-size: 12px;
    margin-right: 10px;
  }
  .hm-right{
    width: 30px;
    height: 30px;
  }
}
</style>
