/**
 * @Desc：Vuex全局状态机
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by jukun on 2018/1/30.
 */

import Vue from "vue";
import Vuex from "vuex";
// import GetPersonal from 'common/js/auth/getPersonal';

// const getPersonal = new GetPersonal();
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    bottomNavShow: false,
  },
  mutations: {
    setbottomNav(state, name) {
      state.bottomNavShow = name;
    }
  }
})
