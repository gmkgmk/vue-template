import Vue from './node_modules/vue';
import Vuex from './node_modules/vuex';
import modules from './modules';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules
});
export default store;
