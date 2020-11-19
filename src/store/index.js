import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eleno:0,
    floor:0,
    isOpen:0,
    runMileage:0,
    direction:0
  },
  mutations: {
    //es6语法，等同edit:funcion(){...}
    eleno(state,p) {
      state.eleno = p
    },
    floor(state,p) {
      state.floor = p
    },
    isOpen(state,p) {
      state.isOpen = p
    },
    runMileage(state,p) {
      state.runMileage = p
    },
    direction(state,p) {
      state.direction = p
    }
  },
  actions: {
  },
  modules: {
  }
})
