import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'; // 使用mutation修改state时将修改记录打印到控制台

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

// 在开发环境中开启debug
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
