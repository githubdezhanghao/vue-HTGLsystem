import Vue from 'vue'
import Vuex from 'vuex'
import tab from './moudules/tab'
import user from './moudules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tab,user
  }
})
