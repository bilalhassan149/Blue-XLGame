import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import state from './state'

//输出暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
}); 