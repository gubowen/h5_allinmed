import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    attentionFlag:true
  },
  mutations:{
     setAttentionFlag(state,data){
        state.attentionFlag = data;
     }
  }
})
