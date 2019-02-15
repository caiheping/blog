import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {// 要设置的全局访问的state对象
  fullscreen: false,
  minLoading: 1000,
  requestTime: 0
}
const getters = {
  loading (state) {
    return state.fullscreen
  }
}
const store = new Vuex.Store({
  state,
  getters
})

export default store
