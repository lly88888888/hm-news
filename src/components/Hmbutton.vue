<template>
  <div class="enter"
       @click="enter">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    enter () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.enter {
  width: 100%;
  background-color: #c30;
  height: 48px;
  line-height: 48px;
  border-radius: 24px;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>
