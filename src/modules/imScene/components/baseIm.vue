<template>
  <section class="main-inner ev-fileUpHide" style="overflow:auto" >
      <transition name="fadeDown">
        <article class="main-message-time" v-if="lastTimeShow">
          <p class="residue-time">24小时内免费，剩余时间<span>{{lastTimeText}}</span></p>
          <p class="service-time">
            <span class="service-time-top">服务时间</span>
            <span class="service-time-bottom">09: 00-22: 00</span>
          </p>
        </article>
      </transition>
    <section class="main-message" ref="wrapper" :class="{'padding-top':lastTimeShow,'padding-bottom':inputBoxShow}">
      <transition-group name="fadeDown" tag="section" style="z-index: 0;">
        <section class="main-message-wrapper" v-for="(msg,index) in msgList" :key="index" >
          <!--时间戳-->
          <p class='time-stamp'
             v-if="getTimeStampShowFlag(msg,index)">
            {{transformTimeStamp(msg.time)}}</p>
          <!--问诊单-->
          <MedicalReport
            v-if="msg.type==='custom' && JSON.parse(msg.content).type==='medicalReport'"
            :medicalReportMessage="JSON.parse(msg.content)"
            ref="medicalReport">
          </MedicalReport>
          <!--视诊-->
          <Triage
            v-if="msg.type==='custom'&&JSON.parse(msg.content).type==='videoTriage'"
            :triageMessage="JSON.parse(msg.content)"
          >
          </Triage>
          <!--初诊建议-->
          <PreviewSuggestion
            v-if="msg.type==='custom' && JSON.parse(msg.content).type==='previewSuggestion'"
            :previewSuggestionMessage="JSON.parse(msg.content)"
            :payPopupShow.sync="payPopupShow"
            :scrollToBottom="scrollToBottom"
            :scrollElement='scrollElement'
            :refreshScroll='refreshScroll'
          >
          </PreviewSuggestion>
          <!--支付成功-->
          <PayFinishTips
            v-if="msg.type==='custom' && JSON.parse(msg.content).type==='payFinishTips'"
          ></PayFinishTips>
          <!--检查检验-->
          <CheckSuggest
            v-if="msg.type==='custom' && JSON.parse(msg.content).type==='checkSuggestion'"
            :checkSuggestMessage="JSON.parse(msg.content)"
            :scrollToBottom="scrollToBottom"
            :scrollElement='scrollElement'
            :refreshScroll='refreshScroll'
          >
          </CheckSuggest>
          <!--文本消息-->
          <ContentText
            v-if="msg.type==='text' && msg.text"
            :contentMessage="msg" :userData="userData"
            :targetData="targetData"
            @deleteMsgEvent="deleteMsgEvent(msg)"
            @longTouchEmitHandler="deleteMsgIndex=index"
            :currentIndex="index"
            :deleteMsgIndex="deleteMsgIndex"
             >
          </ContentText>
          <!--图像消息-->
          <ImageContent
            v-if="(msg.type==='file' || msg.type==='image') && msg.file"
            :imageMessage="msg"
            :nim="nim"
            ref="bigImg"
            :imageList="imageList"
            :imageProgress="imageProgress"
              @deleteMsgEvent="deleteMsgEvent(msg)"
            @longTouchEmitHandler="deleteMsgIndex=index"
            :currentIndex="index"
            :deleteMsgIndex="deleteMsgIndex"
          >
          </ImageContent>
          <!--上传视诊-->
          <section class="main-message-box"
                   v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'triageSendTips'"
          >
            <article
              class="main-message-box-item my-message"
              :data-clientid="msg.idClient"
            >
              <i class="fail-button" style="display:none">
                <img src="/image/imScene/error_tips.png" alt="">
              </i>
              <figcaption class="main-message-content">
                <p>患者已上传视诊资料</p>
              </figcaption>
              <figure class="main-message-img" v-if="msg.from===userData.account">
                <img :src="logoUrl" alt="">
              </figure>
            </article>
          </section>
          <!--上传检查检验-->
          <section class="main-message-box"
                   v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'checkSuggestSendTips'"
          >
            <article
              class="main-message-box-item my-message"
              :data-clientid="msg.idClient"
            >
              <i class="fail-button" style="display:none">
                <img src="/image/imScene/error_tips.png" alt="">
              </i>
              <figcaption class="main-message-content">
                <p>患者已上传检查资料</p>
              </figcaption>
              <figure class="main-message-img" v-if="msg.from===userData.account">
                <img :src="logoUrl" alt="">
              </figure>
            </article>
          </section>
          <!--继续问诊-->
          <MiddleTips
            v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 4"
            :tipsType="4"
          >

          </MiddleTips>
          <!--问诊结束-->
          <MiddleTips
            v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 5"
            :tipsType="5"
          >
          </MiddleTips>
                   <!--消息撤回提示-->
         <div data-alcode-mod='717' :key="0">
          <section class="main-message-box grey-tips" v-if="showFlagDeleteTips(msg)" :key="0">
            <figcaption class="first-message">
              <p>{{msg.from==="1_doctor00001"?"分诊医生":"您"}}撤回了一条消息</p>
            </figcaption>
          </section>
        </div>
        </section>
        <!--继续问诊去购买时间-->
        <div data-alcode-mod='717' :key="0">
          <section class="main-message-box grey-tips" v-if="consultTipsShow" :key="0">
            <figcaption data-alcode='e130' class="first-message" @click="getConsultPrice()">
              <p>分诊服务已结束，如需帮助，请选择</p>
              <p class="go-consult"><span>继续问诊</span></p>
            </figcaption>
          </section>
        </div>

      </transition-group>
    </section>
    <!--支付弹层-->
    <payPopup @paySuccess="toUpLoadTimes"
              :payPopupShow.sync="payPopupShow"
              :payPopupParams="payPopupDate"
              v-if="payPopupShow">
    </payPopup>
    <transition name="fadeUp">
      <footer v-if="inputBoxShow" :class="footerPosition">
        <section class="main-input-box-plus">
          <i class="icon-im-plus"></i>
          <input type="file" v-if="isIos&&inputFlag" multiple id="ev-file-send" @change="sendFile($event)" ref="imageSender"
                 accept="image/*">
          <input type="file" v-if="!isIos&&inputFlag" multiple id="ev-file-send" @change="sendFile($event)" ref="imageSender" capture="camera"
                 accept="image/*">
        </section>
        <figure class="main-input-box-textarea-inner">
          <textarea class="main-input-box-textarea"
                    rows="1"
                    v-model="sendTextContent"

                    @focus="focusFn()"
                    @blur="blurFn()"
                    @click="scrollToBottom"
                    @input="inputLimit"
                    @keypress.enter.stop="autoSizeTextarea()">
          </textarea>
          <!-- <textarea class="main-input-box-textarea"  rows="1" v-model="sendTextContent" ></textarea> -->
          <p class="main-input-box-send" :class="{'on':textLength.length}" @click="sendMessage">发送</p>
        </figure>

      </footer>
    </transition>
    <confirm :confirmParams="{
        'ensure':'支付成功',
        'cancel':'支付失败',
        'title':'请确认微信支付是否已经完成'
        }" v-if="noWXPayShow" @cancelClickEvent="noWXPayShow = false;isClick = false;localStorage.removeItem('payOk');" @ensureClickEvent="viewPayResult()">
    </confirm>
    <loading :show="finish"></loading>
     <transition name="fade">
       <Toast :content="toastTips" v-if="toastShow"></Toast>
     </transition>
  </section>

</template>
<script type="text/ecmascript-6">
/**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang&&lichenyang on 2017/8/16.
   */
import api from "common/js/util/util";
import autosize from "autosize";
import store from "../store/store";
import net from "common/js/util/net";

import payPopup from "components/payLayer";
import loading from "components/loading";
import confirm from "components/confirm";
import siteSwitch from "common/js/siteSwitch/siteSwitch";
import Toast from "components/toast";

import MedicalReport from "./medicalReport";
import ContentText from "./content";
import ImageContent from "./image";
import TimeStamp from "./stamp";
import PreviewSuggestion from "./previewSuggestion";
import CheckSuggest from "./checkSuggest";
import Triage from "./triage";
import MiddleTips from "./middleTips";
import PayFinishTips from "./payFinishTips.vue";

import WxPayCommon from "common/js/wxPay/wxComm";
import nimEnv from "common/js/nimEnv/nimEnv";

import BScroll from "better-scroll";

import DeleteMsg from "common/js/IM_BaseMethod/deleteMsg";
import DeleteMsgTips from "common/js/IM_BaseMethod/deleteMsgAfterTips.js";
import "babel-polyfill";
let nim;
const XHRList = {
  getToken: "/mcall/im/interact/v1/refreshToken/",
  getMedicalList: "/mcall/customer/patient/case/v1/getMapById/",
  updateMedicalList: "/mcall/customer/patient/case/v1/update/",
  triageAssign: "/mcall/customer/case/consultation/v1/create/", //创建分流
  getTriageId: "/mcall/customer/case/consultation/v1/getMapById/",
  time: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",
  refresh: "/mcall/customer/case/consultation/v1/update/",
  updateCount: "/mcall/customer/case/consultation/v1/updateFrequency/",
  getPrice: "/mcall/customer/traige/v1/getMapById/", //获取分诊医生价格
  updateShunt: "/mcall/customer/case/consultation/v1/createConsultation/" //继续问诊后分流
};

const IS_IOS = net.browser().ios;
const IS_Android = net.browser().android;
export default {
  data() {
    return {
        isIos: navigator.userAgent.toLowerCase().includes("iphone"),
      nim: {},
      imageProgress: {
        uploading: false,
        progress: "0%",
        index: 0
      },
      imageLastIndex: 0, //上传图片最后一张记录在数组中的位置
      noWXPayShow: false,
      onFocus: false,
      inputFlag: true, //上传图片input控制
      //        firstIn:true,//是否是第一次进来，MutationObserver需要判断，不然每次都执行
      imageList: [], //页面图片数组
      consultationId: "",
      timeStampShowList: [], //时间戳数组
      orderSourceId: "",
      beginTimestamp: 0,
      finish: true,
      lastTimeShow: false, //顶部时间的提示和输入框是否展示
      inputBoxShow: false, //底部是否显示
      consultTipsShow: false, //购买咨询消息是否展示(与lastTimeShow分开，解决刚开始默认展示)
      msgList: [], //消息列表
      //用户数据
      userData: {
        account: "",
        token: ""
      },
      payPopupShow: false, //支付弹窗是否显示
      isClick: false, //立即咨询按钮是否点击
      //聊天目标数据
      targetData: {
        account: "1_doctor00001"
      },
      sendTextContent: "", //文本消息
      cId: "0", //聊天消息拓展字段的customerId
      footerPosition: "main-input-box",
      bfscrolltop: document.body.scrollTop,
      toastTips: "",
      toastShow: false,
      deleteMsgIndex: -1
    };
  },

  methods: {
    setFooterPosition() {
      if (IS_IOS) {
        this.footerPosition = "main-input-box relative";
      } else if (IS_Android) {
        this.footerPosition = "main-input-box absolute";
      }
    },
    focusFn() {
      if (navigator.userAgent.toLowerCase().includes("11")) {
        this.scrollToBottom();
      } else {
        this.interval = setInterval(function() {
          document.body.scrollTop = document.body.scrollHeight; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
        }, 100);
      }

      this.onFocus = true;
      this.autoSizeTextarea();
    },
    blurFn() {
      if (navigator.userAgent.toLowerCase().includes("11")) {
        this.scrollToBottom();
      } else {
        setTimeout(() => {
          clearInterval(this.interval); //清除计时器
          document.body.scrollTop = this.bfscrolltop;
        }, 20);
      }

      this.onFocus = false;
      this.autoSizeTextarea();
    },
    //用户连接IM聊天
    connectToNim() {
      const that = this;
      nimEnv().then(nimEnv => {
        this.nim = NIM.getInstance({
          //          debug: true,
          appKey: nimEnv,
          account: this.userData.account,
          token: this.userData.token,
          //连接建立后的回调, 会传入一个对象, 包含登录的信息, 有以下字段
          onconnect(data) {
            console.log("连接成功");
          },
          //同步登录用户名片的回调, 会传入用户名片
          onmyinfo(userData) {
            that.getMessageList();
          },
          onwillreconnect(obj) {
            console.log(
              "已重连" + obj.retryCount + "次，" + obj.duration + "后将重连..."
            );
          },
          //断开连接后的回调
          ondisconnect() {
            console.log("链接已中断...");
          },
          //发生错误的回调, 会传入错误对象
          onerror: this.onError,
          onroamingmsgs(obj) {
            console.log("漫游消息...");
            console.log(obj);
            obj.msgs.forEach((index, element) => {
              that.msgList.push(element);
            });
          },
          onofflinemsgs(obj) {
            console.log("离线消息...");
            obj.msgs.forEach((index, element) => {
              that.msgList.push(element);
            });
          },
          //收到消息的回调, 会传入消息对象
          onmsg(msg) {
            if (msg.from === that.targetData.account) {
              console.log("收到回复消息：" + JSON.stringify(msg));
              that.pauseTime(msg); //收到检查检验隐藏顶部框；
              that.msgList.push(msg);
              that.$nextTick(function() {
                that.scrollToBottom();
              });
              that.getCId(msg);
            }
          }
        });
      });
    },
    //每次收到消息更新cId(分诊台医生id);
    getCId(msg) {
      const that = this;
      console.log(!!msg.custom);
      if (!!msg.custom) {
        that.cId = JSON.parse(msg.custom).cId;
      }
    },

    //收到检查检验隐藏顶部框；
    pauseTime(msg) {
      let that = this;
      if (
        msg.type === "custom" &&
        JSON.parse(msg.content).type === "checkSuggestion"
      ) {
        that.lastTimeShow = false; //顶部时间取消
        store.commit("stopLastTimeCount"); //时间计时取消
      }
    },
    //获取页面图片消息存到数组里
    getImageList() {
      if (this.$refs.bigImg) {
        this.$refs.bigImg.forEach((element, index) => {
          this.imageList.push(element.imageMessage.file.url);
        });
      }
    },
    //获取用户基本信息
    getUserBaseData() {
      const that = this;
      api.ajax({
        url: XHRList.getToken,
        method: "POST",
        data: {
          accid: "0_" + api.getPara().caseId,
          patientName: api.getPara().patientId
        },
        beforeSend: function() {
          this.finish = false;
        },
        done(param) {
          if (param.responseObject.responseStatus) {
            that.userData = {
              account: "0_" + api.getPara().caseId,
              token: param.responseObject.responseData.token
            };
          }
          that.finish = true;
          autosize(that.$refs.inputTextarea);
          that.connectToNim();
        },
        fail(err) {
          console.log(err.message);
        }
      });
    },
    //获取消息列表
    getMessageList() {
      let that = this;
      //获取云端历史记录
      document.body.scrollTop = 0;
      this.nim.getHistoryMsgs({
        scene: "p2p",
        to: this.targetData.account, //聊天对象, 账号或者群id
        done(error, obj) {
          that.msgList = obj.msgs.reverse();
          console.log("dom更新前");
          console.log(obj);
          that.getTimeStampShowList();
          // 判断是否需要发送推荐医生
          that.sendSuggestDoctor();
          //需要更改的定位
          that.$nextTick(function() {
            //循环消息列表，处理需求
            that.loopMessage();
            that.getImageList();
            //渲染完毕
          });
        },
        limit: 100 //本次查询的消息数量限制, 最多100条, 默认100条
      });
    },
    // 判断是否需要发送推荐医生
    sendSuggestDoctor() {
      let that = this;
      let doctorName = sessionStorage.getItem("doctor");
      if (!!doctorName) {
        that.nim.sendText({
          scene: "p2p",
          to: that.targetData.account,
          text: `${doctorName}拒绝了我的咨询，请重新为我匹配对症医生`,
          custom: JSON.stringify({
            cType: "0",
            cId: that.cId,
            mType: "0",
            conId: that.orderSourceId
          }),
          done(error, obj) {
            console.log(obj);
            that.sendMessageSuccess(error, obj);
            sessionStorage.removeItem("doctor");
          }
        });
      }
    },
    //判断消息列表里面是否有结束问诊，没有的话发送一条
    hasMiddleTips() {
      let that = this;
      let msg = that.msgList[that.msgList.length - 1];
      //        debugger;
      if (msg) {
        if (
          (msg.type === "custom" &&
            JSON.parse(msg.content).type === "notification" &&
            JSON.parse(msg.content).data.actionType === 5) ||
          !that.consultTipsShow
        ) {
          return true;
        } else {
          that.sendConsultState(5);
        }
      }
    },
    //循环消息列表，处理需求
    loopMessage() {
      let that = this;
      let medicalFlag = true; //是否有问诊单；
      for (let i = 0; i < that.msgList.length; i++) {
        //          console.log(i);
        //判断消息列表里面是否有问诊单，没有的话发送一条
        if (
          that.msgList[i].type === "custom" &&
          JSON.parse(that.msgList[i].content).type === "medicalReport"
        ) {
          medicalFlag = false;
        }
        //判断消息列表里面有几条初诊建议，记录在vuex中
        if (
          that.msgList[i].type === "custom" &&
          JSON.parse(that.msgList[i].content).type === "previewSuggestion"
        ) {
          store.commit("addPreviewSuggestionNum");
        }
      }
      // debugger;
      //如果没有初诊建议，直接定位到底部
      that.$store.state.previewSuggestionNum || that.scrollToBottom();
      if (medicalFlag) {
        that.getMedicalMessage();
      } else {
        //判断消息列表里面是否有结束问诊，没有的话发送一条
        that.hasMiddleTips();
      }
    },
    //获取患者问诊单
    getMedicalMessage() {
      const that = this;
      api.ajax({
        url: XHRList.getMedicalList,
        method: "POST",
        data: {
          caseId: api.getPara().caseId,
          attUseFlag: 1,
          isOrder: 0
        },
        beforeSend(config) {},
        done(data) {
          if (data.responseObject && data.responseObject.responseData) {
            let dataList = data.responseObject.responseData.dataList;
            if (dataList && dataList.length !== 0) {
              that.sendMedicalReport({
                data: {
                  caseId: api.getPara().caseId, //问诊单 病例ID
                  patientName: dataList[0].patientCasemap.patientName, //患者姓名
                  sexName: dataList[0].patientCasemap.sexName, //患者性别
                  age: dataList[0].patientCasemap.age, //患者年龄
                  createDate: new Date().getTime(),
                  diagnoseConTent: "",
                  isAttachment: dataList[0].patientCasemap.isAttachment,
                  time: dataList[0].patientCasemap.caseTime
                },
                type: "medicalReport" //自定义类型 问诊单
              });
              //判断消息列表里面是否有结束问诊，没有的话发送一条
              that.hasMiddleTips();
            }
          }
        }
      });
    },
    //发送问诊单
    sendMedicalReport(data) {
      const that = this;
      this.nim.sendCustomMsg({
        scene: "p2p",
        custom: JSON.stringify({
          cType: "0",
          cId: that.cId,
          mType: "27",
          conId: that.orderSourceId
        }),
        to: this.targetData.account,
        content: JSON.stringify(data),
        done(error, msg) {
          that.sendMessageSuccess(error, msg);
          that.tipNewPatient(data);
        }
      });
    },
    tipNewPatient(data) {
      const that = this;
      //提示信息
      //分诊台刷新患者
      this.nim.sendCustomMsg({
        scene: "p2p",
        custom: JSON.stringify({
          cType: "0",
          cId: that.cId,
          mType: "32",
          conId: that.orderSourceId
        }),
        to: this.targetData.account,
        content: JSON.stringify({
          type: "new-health",
          data: Object.assign({}, data.data, {
            patientId: api.getPara().patientId,
            consultationid: this.orderSourceId
            //              shuntCustomerId: api.getPara().shuntCustomerId
          })
        }),
        done(error, msg) {
          that.sendMessageSuccess(error, msg);
          console.log("新用户提醒发送...");
        }
      });
    },
    //是否有分诊会话记录
    triageDoctorAssign() {
      const that = this;
      //是否有分诊会话记录
      //无则创建
      //有则获取
      api.ajax({
        url: XHRList.getTriageId,
        method: "POST",
        data: {
          caseId: api.getPara().caseId,
          consultationType: 0,
          sortType: 1,
          firstResult: 0,
          maxResult: 9999
        },
        done(data) {
          if (data.responseObject.responseMessage === "NO DATA") {
            that.createTriageMessage();
          } else {
            let dataList = data.responseObject.responseData.dataList;
            that.orderSourceId = dataList[dataList.length - 1].consultationId;
            that.getLastTime();
          }
        }
      });
    },
    //创建分流
    createTriageMessage() {
      const that = this;
      api.ajax({
        url: XHRList.triageAssign,
        method: "POST",
        data: {
          caseId: api.getPara().caseId,
          customerId: 0,
          patientCustomerId: api.getPara().patientCustomerId,
          patientId: api.getPara().patientId,
          consultationType: 0, //会诊类型0：患者-分诊平台1：患者-医生
          consultationState: 4, //会诊状态-1-待就诊0-沟通中1-已结束2-被退回3-超时接诊退回4-新用户5-释放
          siteId: 17,
          caseType: 0
        },
        done(data) {
          if (data.responseObject.responseStatus) {
            console.log("用户已分流...");
            that.orderSourceId = data.responseObject.responsePk;
            that.getLastTime();
          }
        }
      });
    },
    //
    refreshState() {
      const that = this;
      api.ajax({
        url: XHRList.refresh,
        method: "POST",
        data: {
          consultationId: that.orderSourceId,
          consultationState: 1 //会诊状态-1-待就诊0-沟通中1-已结束2-被退回3-超时接诊退回4-新用户5-释放
        },
        done(data) {
          if (data.responseObject.responseStatus) {
            console.log("状态更新成功");
          } else {
            console.log("状态更新失败" + data);
          }
        }
      });
    },
    showFlagDeleteTips(msg) {
      let flag = false;
      if (
        msg.type === "custom" &&
        JSON.parse(msg.content).type === "deleteMsgTips"
      ) {
        flag = true;
        let idClient = JSON.parse(msg.content).data.deleteMsg.idClient;
        this.msgList.forEach((element, index) => {
          if (element.idClient === idClient) {
            this.msgList.removeByValue(element);
            return;
          }
        });
        // this.msgList.removeByValue(JSON.parse(msg.content).data.deleteMsg)
      }
      return flag;
    },
    deleteMsgEvent(msg) {
      // const deleteMsg = new DeleteMsg(this.nim, msg);
      // const deleteMsgTips = new DeleteMsgTips(
      //   this.nim,
      //   this.targetData.account,
      //   {
      //     cType: "0",
      //     cId: this.cId,
      //     mType: "36",
      //     conId: this.orderSourceId,
      //     patientName: this.$store.state.patientName,
      //     deleteMsg: msg
      //   }
      // );
      const _DeleteTimeLimit = "2分钟";
      const that = this;
      this.nim.deleteMsg({
        msg: msg,
        done(error) {
          console.log(error);
          if (!error) {
            setTimeout(() => {
              that.nim.sendCustomMsg({
                scene: "p2p",
                to: that.targetData.account,
                custom: JSON.stringify({
                  cType: "0",
                  cId: that.cId,
                  mType: "36",
                  conId: that.orderSourceId,
                  patientName: that.$store.state.patientName,
                  idClient: msg.idClient
                }),
                content: JSON.stringify({
                  type: "deleteMsgTips",
                  data: {
                    from: that.$store.state.patientName || "患者",
                    deleteMsg: msg || {}
                  }
                }),
                done(tipsError, tipsMsg) {
                  console.log("发送撤回消息完成");
                  console.log(tipsError);
                  console.log(tipsMsg);
                  if (!tipsError) {
                    console.log(tipsError, tipsMsg);
                    console.log(`撤回消息提示--发送成功`);
                    that.sendMessageSuccess(tipsError, tipsMsg);
                  }
                }
              });
            }, 20);
          } else {
            if (parseInt(error.code) === 508) {
              that.toastTips = `您只能撤回${_DeleteTimeLimit}内的消息`;
              that.toastShow = true;
              setTimeout(() => {
                that.toastShow = false;
              }, 2000);
            }
          }
        }
      });
      // deleteMsg
      //   .deleteMessage()
      //   .then(msg => {
      //     console.log(99999);
      //     deleteMsgTips.sendDeleteTips().then((tipsMsg, tipsError) => {
      //       console.log(tipsMsg, tipsError);
      //       console.log(`撤回消息提示--发送成功`);
      //       that.sendMessageSuccess(tipsError, tipsMsg);
      //     });
      //   })
      //   .catch((error, msg) => {
      //     console.log(error);
      //     console.log(8888);
      //     if (parseInt(error.code) === 508) {
      //       this.toastTips = `您只能撤回${_DeleteTimeLimit}内的消息`;
      //       this.toastShow = true;
      //       setTimeout(() => {
      //         this.toastShow = false;
      //       }, 2000);
      //     }
      //   });
    },
    //获取剩余时间
    getLastTime() {
      const that = this;
      api.ajax({
        url: XHRList.time,
        method: "POST",
        data: {
          caseId: api.getPara().caseId,
          //            customerId: api.getPara().shuntCustomerId,
          isValid: 1,
          consultationType: 0, //咨询对象：0-分诊医生，1-专业医生
          firstResult: 0,
          maxResult: 9999
        },
        done(param) {
          that.inputBoxShow = true;
          console.log(param);
          if (param.responseObject.responseStatus) {
            let dataList = param.responseObject.responseData.dataList;
            that.cId = dataList.customerId;
            let time = parseInt(dataList.remainingTime); //responseData.dataList.remainingTime 剩余时间
            store.commit("setConsultation", dataList.consultationId);
            time = time > 24 * 60 * 60 * 1000 ? 24 * 60 * 60 * 1000 : time;
            //  time = 100000;
            if (dataList.consultationState === -2) {
              that.lastTimeShow = false;
              that.inputBoxShow = true;
              that.consultTipsShow = false;
            } else {
              if (time > 0) {
                store.commit("setLastTime", time);
                store.commit("lastTimeCount");
                that.lastTimeShow = true;
                that.inputBoxShow = true;
                that.consultTipsShow = false;
              } else {
                that.lastTimeShow = false;
                that.inputBoxShow = false;
                that.consultTipsShow = true;
              }
            }
            that.$nextTick(() => {
              that.inputBoxShow && autosize(that.$refs.inputTextarea);
            });
            if (
              (dataList.consultationState == 0 ||
                dataList.consultationState == 4 ||
                dataList.consultationState == 5) &&
              time <= 0
            ) {
              that.refreshState();
            }
          }
        },
        fail(err) {
          console.log(err.message);
        }
      });
    },
    // 调整输入框大小
    autoSizeTextarea() {
      const that = this;
      that.sendTextContent = that.textLength;
      autosize.update(that.$refs.inputTextarea);
      return false;
    },
    //点击发送消息
    sendMessage() {
      const that = this;
      that.sendTextContent = that.textLength;
      if (that.sendTextContent === "") {
        // autosize.update(that.$refs.inputTextarea);
        autosize.destroy(that.$refs.inputTextarea);
        autosize(that.$refs.inputTextarea);
        return false;
      }
      let sendTextTemp = this.sendTextContent;
      this.sendTextContent = "";
      autosize.destroy(that.$refs.inputTextarea);
      // autosize(that.$refs.inputTextarea);
      this.nim.sendText({
        scene: "p2p",
        to: this.targetData.account,
        text: sendTextTemp,
        custom: JSON.stringify({
          cType: "0",
          cId: that.cId,
          mType: "0",
          conId: that.orderSourceId
        }),
        done(error, obj) {
          console.log(obj);
          that.sendMessageSuccess(error, obj);
          autosize(that.$refs.inputTextarea);
        }
      });

      $(".main-input-box-textarea").focus();
    },
    //消息发送之后成功还是失败的函数
    sendMessageSuccess(error, msg) {
      let that = this;
      console.log(
        `发送${msg.scene}${msg.type}消息${!error ? "成功" : "失败"}id=${msg.idClient}`
      );
      this.sendTextContent = "";
      if ((msg.time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
        this.beginTimestamp = msg.time;
        this.timeStampShowList.push(1);
      } else {
        this.timeStampShowList.push(0);
      }
      if (!error) {
        this.msgList.push(msg);
        this.scrollToBottom();
        this.refreshScroll();
      } else {
        //消息发送失败的处理
        that.sendErrorTips(msg);
      }
    },
    //聊天记录时间戳处理
    transformTimeStamp(time) {
      let format = function(num) {
        return num > 9 ? num : "0" + num;
      };
      let normalTime = function(time) {
        let d = new Date(time);
        let obj = {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          dd: d.getDate(),
          h: d.getHours(),
          mm: format(d.getMinutes())
        };
        return obj;
      };
      let result = "";
      let now = new Date().getTime(),
        day1 =
          normalTime(time).y +
          "-" +
          normalTime(time).m +
          "-" +
          normalTime(time).dd,
        day2 =
          normalTime(now).y +
          "-" +
          normalTime(now).m +
          "-" +
          normalTime(now).dd;
      if (day1 === day2) {
        result = normalTime(time).h + ":" + normalTime(time).mm;
      } else if (normalTime(time).y === normalTime(now).y) {
        result =
          normalTime(time).m +
          "月" +
          normalTime(time).dd +
          "日  " +
          normalTime(time).h +
          ":" +
          normalTime(time).mm;
      } else if (normalTime(time).y !== normalTime(now).y) {
        result =
          normalTime(time).y +
          "年" +
          normalTime(time).m +
          "月" +
          normalTime(time).dd +
          "日  " +
          normalTime(time).h +
          ":" +
          normalTime(time).mm;
      }
      return result;
    },
    //聊天记录时间处理压入是0还是1
    getTimeStampShowList() {
      this.msgList.forEach((element, index) => {
        if ((element.time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
          this.beginTimestamp = element.time;
          this.timeStampShowList.push(1);
        } else {
          this.timeStampShowList.push(0);
        }
      });
    },
    //聊天记录里时间戳是否显示
    getTimeStampShowFlag(msg, index) {
      if (msg.type === "custom") {
        if (
          JSON.parse(msg.content).type.includes("new-") ||
          JSON.parse(msg.content).type === "payFinishTips" ||
          JSON.parse(msg.content).type === "triagePatientTips" ||
          JSON.parse(msg.content).type === "reTriageTip"
        ) {
          return false;
        } else {
          if (this.timeStampShowList[index] == 1) {
            return true;
          }
        }
      } else {
        if (this.timeStampShowList[index] == 1) {
          return true;
        }
      }
    },
    //上传文件
    sendFile(e) {
      const that = this;
      that.inputFlag = false;
      this.msgList.push({
        file: {
          url: window.URL.createObjectURL(e.target.files[0])
        },
        type: "image"
      });
      that.imageLastIndex = that.msgList.length - 1;
      console.log(window.URL.createObjectURL(e.target.files[0]));
      this.nim.previewFile({
        type: "image",
        fileInput: this.$refs.imageSender,
        uploadprogress(obj) {
          that.scrollToBottom();
          that.imageProgress = {
            uploading: true,
            progress: obj.percentageText,
            index: that.imageLastIndex
          };

          console.log("文件总大小: " + obj.total + "bytes");
          console.log("已经上传的大小: " + obj.loaded + "bytes");
          console.log("上传进度: " + obj.percentage);
          console.log("上传进度文本: " + obj.percentageText);
        },
        done(error, file) {
          console.log("上传image" + (!error ? "成功" : "失败"));
          // show file to the user
          if (!error) {
            let msg = that.nim.sendFile({
              scene: "p2p",
              to: that.targetData.account,
              custom: JSON.stringify({
                cType: "0",
                cId: that.cId,
                mType: "1",
                conId: that.orderSourceId
              }),
              file: file,
              done(error, msg) {
                that.msgList[that.imageLastIndex] = msg;
                that.imageList.push(
                  that.$refs.bigImg[that.$refs.bigImg.length - 1].imageMessage
                    .file.url
                );
                that.imageProgress = {
                  uploading: false,
                  progress: "0%",
                  index: 0
                };
              }
            });
          }
        }
      });
    },
    //滑动到底部
    scrollToBottom(element) {
      let that = this;
      that.$nextTick(() => {
        $(".main-message").animate(
          {
            scrollTop: $(".main-message>section").height() + 1000
          },
          300
        );
      });
    },
    //滑动到某个元素
    scrollElement(distance) {
      let that = this;
      // that.refreshScroll();
      // this.scroll.scrollToElement(element, 1000);
      console.log("position" + distance);
      $(".main-message").animate(
        {
          scrollTop: distance
        },
        300
      );
    },

    //输入框字数限制
    inputLimit() {
      this.scrollToBottom();
      let content = this.sendTextContent;
      if (api.getByteLen(content) > 1000) {
        this.sendTextContent = api.getStrByteLen(content, 1000);
      }
    },
    //获取咨询价格
    getConsultPrice() {
      const that = this;
      if (that.isClick) {
        return false;
      }
      that.isClick = true;
      that.finish = false;
      console.log("获取价格");
      api.ajax({
        url: XHRList.getPrice,
        method: "POST",
        data: {
          visitSiteId: 17, //string	是	站点
          maxResult: 999,
          id: 0
        },
        done(data) {
          if (
            data.responseObject.responseStatus &&
            data.responseObject.responseData
          ) {
            let price = data.responseObject.responseData.dataList.adviceAmount;
            console.log("获取分诊医生价格成功" + price);
            that.buyTime(price);
          } else {
            console.log("获取分诊医生价格失败");
          }
        }
      });
    },
    //购买时间
    buyTime(price) {
      const that = this;
      let flag;
      price === "0" ? (flag = "false") : (flag = "true");
      //        that.lastTimeShow=true;
      //        that.sendConsultState(4);
      console.log("走支付方法");
      let data = {
        patientCustomerId: api.getPara().patientCustomerId, //	string	是	患者所属用户id
        patientId: api.getPara().patientId, // 	string	是	患者id
        //          doctorId: api.getPara().shuntCustomerId,          //	string	是	医生id
        doctorId: 0, //	string	是	医生id
        orderType: "1", //	string	是	订单类型  1-咨询2-手术3-门诊预约
        orderSourceId: this.orderSourceId, //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
        orderSourceType: "1", //	string	是	来源类型  问诊：1-普通2-特需3-加急 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
        orderAmount: price, //	string	否	订单金额  （单位/元 保留两位小数）
        status: "1", //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
        body: "咨询", //   string  否  订单描述 （微信支付展示用）
        isCharge: flag, //   string  是  true-收费  false-免费
        caseId: api.getPara().caseId
      };
      WxPayCommon.wxCreateOrder({
        data: data, //data为Object 参考下面给出格式
        backCreateSuccess(_data) {
          //创建订单成功  （手术必选）
          console.log("创建订单成功 ");
          that.refreashOrderTime("free");
        },
        backCreateError(_data) {
          //创建订单失败  (必选)
        },
        wxPaySuccess(_data) {
          console.log("支付成功");
          that.refreashOrderTime("pay");
          //支付成功回调  (问诊/门诊类型 必选)
        },
        wxPayError(_data) {
          that.isClick = false; //是否点击立即咨询重置
          //支付失败回调  (问诊/门诊类型 必选)
        }
      });
      //      siteSwitch.weChatJudge(()=>that.noWXPayShow = false,()=>that.noWXPayShow = true);
    },
    //判断是否显示支付结果弹层
    isShowPaySuccess() {
      localStorage.removeItem("payCaseId");
      localStorage.removeItem("payPatientId");
      if (localStorage.getItem("payOk") == 1) {
        if (localStorage.getItem("mOrder")) {
          this.payPopupShow = true;
        } else {
          this.noWXPayShow = true;
        }
      } else {
        this.payPopupShow = false;
        this.noWXPayShow = false;
      }
    },
    //查看m站支付结果
    viewPayResult() {
      let that = this;
      WxPayCommon.PayResult({
        outTradeNo: localStorage.getItem("orderNumber") //微信订单号
      })
        .then(function(data) {
          console.log("查看回调", data);
          if (data.resultCode == "SUCCESS") {
            that.noWXPayShow = false;
            localStorage.removeItem("payOk");
            that.refreashOrderTime("pay");
          } else {
            that.isClick = false; //是否点击立即咨询重置
            console.log("未支付成功");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //支付成功后重新分流
    againShunt() {
      let that = this;
      console.log("分流参数：" + that.orderSourceId);
      api.ajax({
        url: XHRList.updateShunt,
        method: "POST",
        data: {
          caseId: api.getPara().caseId,
          //            andConsultationId:that.orderSourceId,
          patientId: api.getPara().patientId,
          patientCustomerId: api.getPara().patientCustomerId,
          isShunt: 1 //是否分流0-否1-是
        },
        done(data) {
          if (data.responseObject.responseStatus) {
            //              that.getLastTime();
            console.log("分流成功");
            that.isClick = false; //是否点击立即咨询重置
            that.finish = true;
          } else {
            console.log("分流失败");
          }
        }
      });
    },
    //重置时间
    refreashOrderTime(type) {
      const that = this;
      let typeStr = type ? "2" : "6";
      console.log("更新时间");
      let data = {
        consultationId: this.orderSourceId,
        frequency: "0",
        frequencyType: typeStr,
        consultationLevel: "1"
      };
      !!type &&
        Object.assign(data, { customerId: "0", consultationState: "4" }); //付款回调参数传customerId
      api.ajax({
        url: XHRList.updateCount,
        method: "POST",
        data: data,
        done(data) {
          if (
            data.responseObject.responseData &&
            data.responseObject.responseStatus
          ) {
            //              that.lastTimeShow = true;
            //              store.commit("setLastTime", 24 * 60 * 60 * 1000);
            //              store.commit("lastTimeCount");
            if (type) {
              //                that.againShunt();
              if (type === "pay") {
                that.sendPayFinish();
              }
            }
            that.getLastTime();
          } else {
            console.log("重置时间失败");
          }
        }
      });
    },
    //更新上传了检查检验
    updateMedical() {
      let that = this;
      api.ajax({
        url: XHRList.updateMedicalList,
        method: "POST",
        data: {
          caseId: api.getPara().caseId,
          state: 1
        },
        done(data) {
          if (data.responseObject.responseStatus) {
            that.refreashOrderTime();
          }
        }
      });
    },
    toUpLoadTimes(opt) {
      let that = this;
      //        debugger
      api.ajax({
        url: XHRList.updateCount,
        method: "POST",
        data: {
          consultationId: sessionStorage.getItem("orderSourceId"),
          frequency: opt.orderFrequency,
          frequencyType: 2,
          consultationState: -1,
          consultationLevel: opt.orderType
        },
        done(data) {
          if (data.responseObject.responseStatus) {
            localStorage.setItem("sendTips", JSON.stringify(opt));
            that.payPopupShow = false;
            window.location.href =
              "/dist/imSceneDoctor.html?from=im&caseId=" +
              api.getPara().caseId +
              "&doctorCustomerId=" +
              (that.$store.state.targetDoctor.customerId ||
                JSON.parse(localStorage.getItem("mPayDoctorDetails"))
                  .customerId) +
              "&patientCustomerId=" +
              api.getPara().patientCustomerId +
              "&patientId=" +
              api.getPara().patientId;
          }
        }
      });
    },
    //支付成功回调
    sendPayFinish() {
      const that = this;
      this.nim.sendCustomMsg({
        scene: "p2p",
        to: that.targetData.account,
        custom: JSON.stringify({
          cType: "0",
          cId: that.cId,
          mType: "32",
          conId: that.orderSourceId
        }),
        content: JSON.stringify({
          type: "payFinishTips"
        }),
        done(error, msg) {
          if (!error) {
            that.sendMessageSuccess(error, msg);
          }
        }
      });
    },
    //发送问诊结束或者开始消息--4开始、5结束
    sendConsultState(num) {
      let that = this;
      this.nim.sendCustomMsg({
        scene: "p2p",
        to: that.targetData.account,
        custom: JSON.stringify({
          cType: "0",
          cId: that.cId,
          mType: "24",
          conId: that.orderSourceId
        }),
        content: JSON.stringify({
          type: "notification",
          data: {
            actionType: num
          }
        }),
        type: "custom",
        done(error, msg) {
          if (!error) {
            that.sendMessageSuccess(error, msg);
          }
        }
      });
    },
    //IOS手机微信返回按钮不刷新
    forceRefresh() {
      var nua = navigator.userAgent;
      if (nua.indexOf("iPhone") > -1) {
        //苹果手机
        window.onload = function() {
          setTimeout(() => {
            window.addEventListener("popstate", function(e) {
              // alert("我监听到了浏览器的返回按钮事件啦");
              self.location = document.referrer;
            });
          }, 500);
        };
      }
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true,
        // swipeTime:1500,
        momentum: true,
        deceleration: 0.01
      });
    },
    refreshScroll() {
      this.scroll && this.scroll.refresh();
    }
  },
  computed: {
    //配合watch图片上传进度使用
    progess() {
      return this.imageProgress.progress;
    },
    lastTime() {
      return this.$store.state.lastTime;
    },
    lastTimeText() {
      return api.MillisecondToDateNew(this.$store.state.lastTime);
    },
    logoUrl() {
      return this.$store.state.logoUrl;
    },
    //      payPopupShow(){
    //        return this.$store.state.payPopupShow;
    //      }
    payPopupDate() {
      return {
        docName:
          this.$store.state.targetDoctor.nick ||
          JSON.parse(localStorage.getItem("mPayDoctorDetails")).nick,
        docId:
          this.$store.state.targetDoctor.customerId ||
          JSON.parse(localStorage.getItem("mPayDoctorDetails")).customerId,
        caseId: api.getPara().caseId,
        patientId: api.getPara().patientId,
        patientCustomerId: api.getPara().patientCustomerId,
        from: "checkSuggest",
        payType:
          this.$store.state.targetDoctor.payType ||
          JSON.parse(localStorage.getItem("mPayDoctorDetails")).payType
      };
    },
    // 输入框的长度
    textLength() {
      return this.sendTextContent.replace(/(^(\r|\n|\s)*)|((\r|\n|\s)*$)/g, "");
    }
  },
  beforeCreate() {},
  mounted() {
    let that = this;
    if (!api.checkOpenId()) {
      api.wxGetOpenId(1);
    }
    api.forbidShare();
    that.getUserBaseData();
    that.triageDoctorAssign();
    //      that.forceRefresh();
    localStorage.setItem("PCIMLinks", location.href);
    this.setFooterPosition();
    setTimeout(() => {
      // this.initScroll();
    }, 20);
    that.isShowPaySuccess(); //支付弹层
  },
  //组件更新之前的生命钩子
  beforeUpdate() {},
  //组件更新之后的生命钩子
  updated() {},
  beforeRouteLeave(to, from, next) {
    // 记录查看大图时离开的位置
    if (to.name === "showBigImg") {
      console.log($(".main-message").scrollTop());
      sessionStorage.setItem("imagePosition", $(".main-message").scrollTop());
    }
    next(true);
  },
  activated() {
    let that = this;
    // document.body.scrollTop = 1;
    api.forbidShare();
    // that.refreshScroll();
    // 判断是否有查看大图的位置，定位到响应位置
    if (sessionStorage.getItem("imagePosition")) {
      $(".main-message").scrollTop(sessionStorage.getItem("imagePosition"));
      sessionStorage.removeItem("imagePosition");
    }
    if (that.$route.query.queryType === "triage") {
      that.nim.sendCustomMsg({
        scene: "p2p",
        to: that.targetData.account,
        custom: JSON.stringify({
          cType: "0",
          cId: that.cId,
          mType: "34",
          conId: that.orderSourceId
        }),
        content: JSON.stringify({
          type: "triageSendTips",
          data: {
            actionType: that.$route.query.triageType
          }
        }),
        type: "custom",
        done(error, msg) {
          if (!error) {
            that.sendMessageSuccess(error, msg);
          }
        }
      });
    } else if (
      that.$route.query &&
      that.$route.query.queryType === "checkSuggest"
    ) {
      that.updateMedical();
      that.nim.sendCustomMsg({
        scene: "p2p",
        to: that.targetData.account,
        custom: JSON.stringify({
          cType: "0",
          cId: that.cId,
          mType: "0",
          conId: that.orderSourceId
        }),
        content: JSON.stringify({
          type: "checkSuggestSendTips",
          data: {
            actionType: that.$route.query.queryType
          }
        }),
        type: "custom",
        done(error, msg) {
          if (!error) {
            that.sendMessageSuccess(error, msg);
          }
        }
      });
    }
    that.$router.replace({
      query: {}
    });
  },
  watch: {
    msgList: {
      handler(newValue, oldValue) {
        setTimeout(() => {
          this.refreshScroll();
        }, 20);
      },
      deep: true
    },
    //监听上传完成，可以继续上传；
    progess(newVal, oldVal) {
      if (newVal == "0%" || newVal == "100%") {
        this.inputFlag = true;
      }
    },
    lastTime: function(time) {
      if (time <= 0) {
        if (this.inputBoxShow) {
          this.sendConsultState(5);
          this.refreshState();
        }
        this.lastTimeShow = false;
        this.inputBoxShow = false;
        this.consultTipsShow = true;
      } else {
        this.lastTimeShow = true;
        this.inputBoxShow = true;
        this.consultTipsShow = false;
      }
    }
  },
  components: {
    MedicalReport,
    ContentText,
    ImageContent,
    TimeStamp,
    PreviewSuggestion,
    CheckSuggest,
    Triage,
    PayFinishTips,
    MiddleTips,
    payPopup,
    loading,
    confirm,
    Toast
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
@import "../../../../static/scss/modules/imStyle";

* {
  -webkit-backface-visibility: hidden;
}
.ev-fileUpHide {
  box-shadow: none !important;
  border: none;
}

//问诊开始结束提示样式
.first-message {
  @include font-dpr(13px);
  color: #aaa;
  background-color: #edeeee;
  text-align: center;
  margin: 0 rem(30px);
  padding: rem(15px) rem(26px);
  box-sizing: border-box;
  border-radius: 0.2rem;
  display: inline-block;
}

.grey-tips {
  text-align: center;
}

//继续问诊样式
.go-consult {
  text-align: center;
  span {
    color: #26bdb5;
    border-bottom: 1px solid #26bdb5;
    line-height: 1;
    display: inline-block;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fadeDown-enter-active,
.fadeDown-leave-active {
  transition: all ease-in-out 0.5s;
}

.fadeDown-enter,
.fadeDown-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

.fadeUp-enter-active,
.fadeUp-leave-active {
  transition: all ease-in-out 0.5s;
}

.fadeUp-enter,
.fadeUp-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>

