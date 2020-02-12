<template>
  <div class="category">
    <Hmheader name="栏目管理" @click="back"></Hmheader>
    <div class="del-category">
      <p>点击删除以下栏目</p>
      <div class="items" v-for="(item,index) in tabList" :key="item.id" @click="delCategory(index)">{{item.name}}</div>
    </div>
    <div class="add-category">
      <p>点击添加以下频道</p>
      <div class="items" v-for="(item,index) in addList" :key="item.id" @click="addCategory(index)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import Hmheader from '../components/Hmheader'
export default {
  components: {
    Hmheader
  },
  data () {
    return {
      tabList: [],
      addList: []
    }
  },
  created () {
    const tabList = JSON.parse(localStorage.getItem('tabList'))
    const addList = JSON.parse(localStorage.getItem('addList'))
    if (tabList && addList) {
      this.tabList = tabList
      this.addList = addList
    } else {
      this.getTabList()
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
      }
    },
    delCategory (index) {
      if (this.tabList.length <= 3) {
        this.$toast.success('展示栏目不得少于3个')
      } else {
        this.addList.unshift(this.tabList[index])
        this.tabList.splice(index, 1)
      }
    },
    addCategory (index) {
      this.tabList.push(this.addList[index])
      this.addList.splice(index, 1)
    }
  },
  watch: {
    tabList () {
      localStorage.setItem('tabList', JSON.stringify(this.tabList))
      localStorage.setItem('addList', JSON.stringify(this.addList))
    }
  }
}
</script>

<style lang="scss" scoped>
.category{
  padding: 10px;
  .del-category,
  .add-category{
    overflow: hidden;
    p{
      font-size: 12px;
      color: rgb(105, 104, 104);
      padding: 10px 0;
    }
    .items{
      float: left;
      font-size: 13px;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      background-color: #ddd;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
