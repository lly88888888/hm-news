<template>
  <div class="hm-input">
    <input :type="type"
           :placeholder="placeholder"
           :value="value"
           @input="input"
           :class="[isShow]">
    <span class="tips"
          v-show="isShow==='error'&&this.errMsg">{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  methods: {
    input (e) {
      const { value } = e.target
      this.$emit('input', value)
      if (!value) return
      if (this.rules.test(value)) {
        this.isShow = 'success'
      } else {
        this.isShow = 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-input {
  padding-bottom: 15px;
  position: relative;
  input {
    width: 100%;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #666;
    font-size: 18px;
    background-color: transparent;
    &.error {
      border-bottom-color: red;
    }
    &.success {
      border-bottom-color: green;
    }
  }
  .tips {
    position: absolute;
    color: red;
    bottom: 0;
    left: 0;
  }
}
</style>
