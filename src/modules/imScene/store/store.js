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
let totalTimeCount;
export default new Vuex.Store({
  state: {
    consultationId: "",
    logoUrl: "",
    lastTime:"",
    targetDoctor:{
      nick:'',//医生名字
      customerId:'',//医生id
      payType:'pay',
    },
    previewSuggestionNum:0,//初诊建议次数
    renderSuggestionNum:0,//渲染出诊建议次数
  },
  mutations: {
    setConsultation(state, id){
      state.consultationId = id;
    },
    setTargetMsg(state,params){
      state.targetDoctor= Object.assign({},state.targetDoctor,params);
    },
    setLogoUrl(state, param){
      var sex = param.sexName,
        age = parseInt(param.age),
        img = "";
      if (age <= 12) {
        img = require("../../../common/image/img00/myServices/chatting_portrait_child@2x.png");
      } else if (age > 12 && age <= 59) {
        img = (sex === "男" ? require("../../../common/image/img00/myServices/chatting_chatting_man@2x.png") : require("../../../common/image/img00/myServices/chatting_portrait_woman@2x.png"));
      } else if (age > 59) {
        img = (sex === "男" ? require("../../../common/image/img00/myServices/chatting_portrait_old_man@2x.png") : require("../../../common/image/img00/myServices/chatting_portrait_old_woman@2x.png"));
      }
      state.logoUrl = img;
    },
    //初诊建议次数增加
    addPreviewSuggestionNum(state){
      state.previewSuggestionNum++;
    },
    //渲染初诊建议次数增加
    addRenderSuggestionNum(state){
      state.renderSuggestionNum++;
    },
    setLastTime(state,time){
      state.lastTime=time;
    },
    stopLastTimeCount(state){
      clearInterval(totalTimeCount);
      // Attention
      // 若直接置为0，业务组件引用Vuex状态作监听体，归零直接进入另一状态
      // state.lastTime=0;
    },
    lastTimeCount(state){
      clearInterval(totalTimeCount);
      totalTimeCount=setInterval(()=>{
        if (state.lastTime<=0){
         clearInterval(totalTimeCount);
        }else{
          state.lastTime=state.lastTime-1000;
        }
      },1000);

    }
  }
})
