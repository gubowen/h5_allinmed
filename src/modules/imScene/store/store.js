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
import getToolbarConfig from "common/js/toolbarConfig/toolbarConfig"

Vue.use(Vuex);
let totalTimeCount;
export default new Vuex.Store({
  state: {
    consultationId: "",
    consultationState: 0,//会话咨询状态
    toastTips: "",// toast框提示内容
    toastShow: false,// toast框是否显示
    ensureShow: false,// ensure框是否显示
    logoUrl: "",
    lastTime:"",
    upLoadPercent:"",
    targetDoctor:{
      nick:'',//医生名字
      customerId:'',//医生id
      payType:'pay',
    },
    previewSuggestionNum:0,//初诊建议次数
    renderSuggestionNum:0,//渲染出诊建议次数
    patientName:"",
    deleteBtnShow:false,
    historyStatus:"history",
    toolbarConfig: {
      image: false,
      video: false,
      file: false,
      delete: false,
      deleteTime:""
    }
  },
  mutations: {
    setPatientName(state,name){
      state.patientName=name;
    },
    setHistoryStatus(state,status){
      state.historyStatus=status;
    },
    setEnsureShow(state,flag) {
      state.ensureShow=flag;
    },
    upLoadPercentFn(state,percent){
      state.upLoadPercent = percent;
    },
    setConsultation(state, id){
      state.consultationId = id;
    },
    setconsultationState(state, num){
      state.consultationState = num;
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
    setDeleteBtnShow(state,flag){
        state.deleteBtnShow=flag;
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
    // 设置toast框话术
    setToastTips (state,str) {
      state.toastTips = str;
    },
    // 设置toast框显示
    setToastShow (state) {
      state.toastShow = true;
      setTimeout(() => {
        state.toastShow = false;
      }, 2000);
    },
    getToolbarConfig(state) {
      getToolbarConfig().then((data) => {
        console.log(data)
        if (data.responseObject.responseData) {
          let dataList = data.responseObject.responseData.dataList;
          dataList.forEach((element, index) => {
            if (element.state==1){
              switch (parseInt(element.toolType)) {
                case 1://图片
                  state.toolbarConfig.image = true;
                  break;
                case 4://撤回
                  state.toolbarConfig.delete = true;
                  state.toolbarConfig.deleteTime=element.toolConfig;
                  break;
                case 5://视频
                  state.toolbarConfig.video = true;
                  break;
                case 6://文件
                  state.toolbarConfig.file = true;
                  break;
                default:
                  break;
              }
            }
          });
        }
      })
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
