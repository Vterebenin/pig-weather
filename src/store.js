import Vue from "vue";
import Vuex from "vuex";
import weatherModule from "./storeModules/weatherModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment(context) {
      context.commit("increment");
    }
  },
  modules: {
    wm: weatherModule
  }
});
