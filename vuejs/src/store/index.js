import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import moduleCountry from "./country/country";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    country: moduleCountry,
  },
});
