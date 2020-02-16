<template>
  <div id="app" >
    <keep-alive :include="catchList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['catchList'])
}
</script>
<style lang="scss">
</style>
