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
import GetPersonal from 'common/js/auth/getPersonal';

const getPersonal = new GetPersonal();
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    bottomNavShow: false,
    isSubscribe: false,
    patientBaseMessage: {}
  },
  mutations: {
    setbottomNav(state, name) {
      state.bottomNavShow = name;
    },
    setPatientMessage(state, param) {
      state.patientBaseMessage = param;
      // if (!state.patientBaseMessage.weight) {
      //   state.patientBaseMessage.weight = state.patientBaseMessage.sex === 1 ? 65 : 50;
      // }
      // if (!state.patientBaseMessage.height) {
      //   state.patientBaseMessage.height = state.patientBaseMessage.sex === 1 ? 170 : 160;
      // }
    },
    getSubscribeStatus(state, name) {
      getPersonal.getMessage(localStorage.getItem("userId")).then((data) => {
        if (data.responseObject.responseData) {
          if (data.responseObject.responseData.uniteFlagWeixin == 1) {
            state.isSubscribe = true;
          } else {
            state.isSubscribe = false;
          }
        }
      });
    }
  }
})
