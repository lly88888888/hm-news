import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  catchList: []
}
const mutations = {
  catch (state, name) {
    if (!state.catchList.includes(name)) {
      state.catchList.push(name)
      console.log('缓存组件', name)
    }
  },
  uncatch (state, name) {
    if (state.catchList.includes(name)) {
      state.catchList = state.catchList.filter(item => {
        return item !== name
      })
    }
  }
}
const store = new Vuex.Store({
  state,
  mutations
})
export default store
