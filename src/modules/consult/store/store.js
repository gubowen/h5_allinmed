/**
 * @Desc：Vuex全局状态机
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/8/23.
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    bottomNavShow:false
  },
  mutations: {
    setbottomNav(state,name){
      state.bottomNavShow=name;
    }
  }
})
