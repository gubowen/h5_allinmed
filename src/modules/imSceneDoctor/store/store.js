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
    logoUrl: "",
    lastTime: "",
    lastCount: "",
    targetMsg: {},
    targetList: [],
    toolbarConfig: {
      image: false,
      video: false,
      file: false,
      delete: false
    }
  },
  mutations: {
    setConsultation(state, id) {
      state.consultationId = id;
    },
    setTargetMsg(state, params) {
      state.targetMsg = params;
    },
    setLastCount(state, count) {
      state.lastCount = count;
    },
    setTargetList(state, param) {
      state.targetList.push(param);
    },
    setLogoUrl(state, param) {
      let sex = param.sexName,
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
    setLastTime(state, time) {
      state.lastTime = time;
    },
    stopLastTimeCount(state) {
      clearInterval(totalTimeCount);
      // Attention
      // 若直接置为0，业务组件引用Vuex状态作监听体，归零直接进入另一状态
      state.lastTime = 0;
    },
    lastTimeCount(state) {
      clearInterval(totalTimeCount);
      totalTimeCount = setInterval(() => {
        if (state.lastTime <= 0) {
          clearInterval(totalTimeCount);
        } else {
          state.lastTime = state.lastTime - 1000;
        }
      }, 1000);
    },
    lastCountMinus(state) {
      state.lastCount = state.lastCount - 1;
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
    }
  }
})
