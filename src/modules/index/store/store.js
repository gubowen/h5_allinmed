import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    attentionFlag:true,
    loading:false
  },
  mutations:{
     setAttentionFlag(state,data){
        state.attentionFlag = data;
     },
     setLoadingState(state,status){
       state.loading=status;
     }
  }
})
