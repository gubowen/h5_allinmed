<template>
  <div data-alcode-mod='720' style="box-shadow: none">
    <section class="main-inner">
      <transition name="fadeDown">
        <article class="main-message-time" v-if="lastTimeShow&&receiveTreatmentStatus">
          <article>
            <p>医生回复剩余次数</p>
            <span>{{lastCount}}</span>
            <p>次</p>
          </article>
          <article>
            <p>对话剩余时间</p>
            <span>{{lastTimeText}}</span>
            <p></p>
          </article>
        </article>
      </transition>
      <section class="main-message" ref="wrapper"
               :class="{'padding-top':lastTimeShow&&receiveTreatmentStatus,'bottom-tips-padding':bottomTipsShow}">

        <transition-group name="fadeDown" tag="section">
          <section class="main-message-wrapper" v-for="(msg,index) in msgList" :key="index"
                   @click.stop="$refs.inputTextarea.blur()" @touchmove="$refs.inputTextarea.blur()">
            <!--时间戳-->
            <p class='time-stamp' v-if="getTimeStampShowFlag(msg,index)||receivedTreatment(msg)">
              {{transformTimeStamp(msg.time)}}</p>
            <!--问诊单-->
            <MedicalReport v-if="receiveMedicalReport(msg)" :medicalReportMessage="JSON.parse(msg.content)"
                           ref="medicalReport">
            </MedicalReport>
            <!--医生接诊-->
            <MiddleTips v-if="receivedTreatment(msg)" :tipsType="4">

            </MiddleTips>
            <!--消息撤回提示-->
            <div data-alcode-mod='717' :key="0">
              <section class="main-message-box grey-tips" v-if="showFlagDeleteTips(msg)" :key="0">
                <figcaption class="first-message">
                  <p>{{msg.from==="1_doctor00001"?"分诊医生":"您"}}撤回了一条消息</p>
                </figcaption>
              </section>
            </div>
            <!--问诊结束-->
            <MiddleTips v-if="receivedTreatOver(msg)" :tipsType="5">
            </MiddleTips>
            <!--支付成功-->
            <PayFinishTips v-if="msg.type==='custom' && JSON.parse(msg.content).type==='payFinishTips'">
            </PayFinishTips>
            <!--门诊邀约-->
            <OutpatientInvite v-if="msg.type==='custom' && JSON.parse(msg.content).type==='outpatientInvite'"
                              :outPatientMessage="JSON.parse(msg.content)" ref="outpatientInvite">
            </OutpatientInvite>
            <!--手术单-->
            <SurgicalDrape v-if="msg.type==='custom'&&JSON.parse(msg.content).type==='surgicalDrape'"
                           :surgicalMessage="JSON.parse(msg.content)">
            </SurgicalDrape>
            <!--赠送次数-->
            <SendCount v-if="receivedSendCount(msg)" :sendCountMessage="JSON.parse(msg.content)">
            </SendCount>
            <!--购买问诊-->
            <section class="main-message-box grey-tips" v-if="receivedBuyCount(msg)">
              <figcaption class="first-message">
                <p>您已完成支付，可与主诊医生继续沟通</p>
              </figcaption>
            </section>
            <!--住院通知-->
            <HospitalNotice v-if="msg.type==='custom'&&JSON.parse(msg.content).type==='hospitalNotice'"
                            :hoispitalMessage="JSON.parse(msg.content)">
            </HospitalNotice>
            <!--文本消息-->
            <ContentText v-if="msg.type==='text' && msg.text" :contentMessage="msg" :userData="userData"
                         :targetData="targetData"  @deleteMsgEvent="deleteMsgEvent(msg)" @longTouchEmitHandler="deleteMsgIndex=index">
            </ContentText>
            <!--图像消息-->
            <ImageContent v-if="(msg.type==='file'||msg.type==='image') && msg.file" :imageMessage="msg" :nim="nim"
                          ref="bigImg" :imageList="imageList" :imageProgress="imageProgress" :currentIndex="index"
                          :userData="userData" :targetData="targetData">
            </ImageContent>
            <!-- 视频消息 -->
            <VideoMessage
              v-if="msg.type==='video' && msg.file"
              :videoMessage="msg"
              :userData="userData"
              :targetData="targetData"
            ></VideoMessage>
            <!--音频-->
            <AudioMessage v-if="msg.type==='audio'" :audioMessage="msg">
            </AudioMessage>
            <!--患者扫码报道-->
            <section class="main-message-box grey-tips" v-if="receivedReportTips(msg)" ref="reportTip">
              <figcaption class="first-message">
                <p>报到成功，您可继续补充您的情况，便于医生更好了解病情</p>
              </figcaption>
            </section>
          </section>
        </transition-group>
      </section>
      <!--底部提示-->

      <transition name="fadeUp">
        <footer :class="footerPosition" v-if="inputBoxShow">
          <transition name="fadeUp">
            <BottomTips v-if="bottomTipsShow" :bottomTipsType="bottomTipsType">
            </BottomTips>
          </transition>
          <!--医生拒绝-->
          <section class="prohibit-input" v-if="!lastTimeShow&&bottomTipsType==2" @click="retryClick(2)">
            <div>
              <span>重新推荐</span>
            </div>
          </section>
          <!--超时未接诊-->
          <section class="prohibit-input" v-if="!lastTimeShow&&bottomTipsType==-1" @click="retryClick(-1)">
            <div>
              <span>重新支付</span>
            </div>
          </section>
          <!--超时未接诊-扫码报道-->
          <section class="prohibit-input" v-if="!lastTimeShow&&(bottomTipsType==2&&from==='report')">
            <div>
              <span>已退诊</span>
            </div>
          </section>
          <!--继续沟通-->
          <section data-alcode='e134' class="prohibit-input" v-if="!lastTimeShow&&bottomTipsType==1"
                   @click="retryClick(1)">
            <div>
              <span>继续沟通</span>
            </div>
          </section>
          <section class="main-input-box-plus">
            <i class="icon-im-plus"></i>
            <input v-if="isIos&&inputFlag" multiple type="file" id="ev-file-send" @change="sendFile($event)"
                   ref="imageSender">
            <input v-if="!isIos&&inputFlag" multiple type="file" id="ev-file-send" @change="sendFile($event)"
                   ref="imageSender" capture="camera" accept="image/*">
          </section>
          <figure class="main-input-box-textarea-inner">
            <textarea class="main-input-box-textarea"
                      rows="1"
                      v-model="sendTextContent"
                      ref="inputTextarea"
                      @focus="focusFn()"
                      @blur="blurFn()"
                      @click="scrollToBottom"
                      @input="inputLimit"
                      @keypress.enter.stop="autoSizeTextarea()">
            </textarea>
            <p class="main-input-box-send" :class="{'on':sendTextContent.length}" @click="sendMessage">发送</p>
          </figure>


        </footer>
      </transition>
      <!--支付弹层-->
      <payPopup @paySuccess="refreashOrderTime" :payPopupShow.sync="payPopupShow" :payPopupParams="payPopupDate"
                v-if="payPopupShow"></payPopup>
      <Loading v-if="loading"></Loading>
      <transition name="fade">
        <Toast :content="toastTips" v-if="toastShow"></Toast>
      </transition>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/16.
   */

  /*
     * 老患者报道流程进入 from参数为report
     * 此时被拒绝不能回去找分诊医生
     * 底部不可点击，新状态至组件bottomTips规定为组件状态4，于状态3中区分
     */
  import api from "common/js/util/util";
  import autosize from "autosize";
  import store from "../store/store";
  import net from "common/js/util/net";

  import MedicalReport from "./medicalReport";
  import ContentText from "./content";
  import ImageContent from "./image";
  import BottomTips from "./bottomTips";
  import MiddleTips from "./middleTips";
  import Toast from "components/toast";
  import PayFinishTips from "./payFinishTips";
  import PayTypePopup from "./payTypePopup";
  import OutpatientInvite from "./outpatientInvite";
  import SurgicalDrape from "./surgicalDrape";
  import HospitalNotice from "./hospitalNotice";
  import SendCount from "./SendCount";
  import AudioMessage from "./audioMessage";
  import VideoMessage from "./video";

  import Loading from "components/loading";
  import payPopup from "components/payLayer";

  import WxPayCommon from "common/js/wxPay/wxComm";
  import nimEnv from "common/js/nimEnv/nimEnv";
  import scrollPosition from "../api/scrollPosition";
  import BScroll from "better-scroll";


  import $ from "jquery";

  let nim;
  const XHRList = {
    getToken: "/mcall/im/interact/v1/refreshToken/",
    getMedicalList: "/mcall/customer/patient/case/v1/getMapById/",
    updateMedicalList: "/mcall/customer/patient/case/v1/update/",
    triageAssign: "/mcall/customer/case/consultation/v1/create/",
    getTriageId: "/mcall/customer/case/consultation/v1/getMapById/",
    time: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",
    refresh: "/mcall/customer/case/consultation/v1/update/",
    updateCount: "/mcall/customer/case/consultation/v1/updateFrequency/",
    getBaseInfo: "/mcall/customer/patient/baseinfo/v1/getMapList/",
    getDoctorBaseMsg: "/mcall/customer/auth/v1/getSimpleById/"
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
          progress: 0,
          index: 0
        },
        onFocus: false,
        inputFlag: true, //上传图片input控制
        loading: true,
        payPopupShow: false,
        shuntCustomerId: "",
        bottomTipsShow: false,
        bottomTipsType: "",
        receiveTreatmentStatus: false,
        receiveTime: "",
        imageList: [],
        consultationId: "",
        timeStampShowList: [],
        orderSourceId: "",
        triageOrderSourceId: "",
        beginTimestamp: 0,
        finish: true,
        lastTimeShow: false,
        inputBoxShow: false,
        msgList: [],
        targetMsg: [],
        from: api.getPara().from,
        imageLastIndex: 0, //上传图片最后一张记录在数组中的位置
        userData: {
          account: "",
          token: ""
        },
        targetData: {
          account: "2_" + api.getPara().doctorCustomerId
        },
        sendTextContent: "",
        footerPosition: "main-input-box",
        scrollHeight: document.body.scrollTop,
        deleteMsgIndex: -1,
        toastTips: "",
        toastShow: false,
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
          this.interval = setInterval(function () {
            document.body.scrollTop = document.body.scrollHeight - 200; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
          }, 100);
        }
        // setTimeout(() => {
        //   $(".main-message-time").css({
        //     top: document.body.scrollTop
        //   });
        // }, 300);
        this.onFocus = true;
        this.autoSizeTextarea();
      },
      blurFn() {
        if (navigator.userAgent.toLowerCase().includes("11")) {
          this.scrollToBottom();
        } else {
          clearInterval(this.interval); //清除计时器
          setTimeout(() => {
            document.body.scrollTop = this.bfscrolltop;
          }, 20);
        }

        // $(".main-message-time").css({
        //   top: 0
        // })

        this.onFocus = false;
        this.autoSizeTextarea();
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
      connectToNim() {
        const that = this;
        nimEnv().then(nimEnv => {
          this.nim = NIM.getInstance({
            // debug: true,
            appKey: nimEnv,
            account: this.userData.account,
            token: this.userData.token,
            onconnect(data) {
              console.log("连接成功");
              that.triageDoctorAssign();
              that.getPatientBase();
            },
            onmyinfo(userData) {
              that.getMessageList();
              //            that.userData = userData;
            },
            onwillreconnect(obj) {
              console.log(
                "已重连" + obj.retryCount + "次，" + obj.duration + "后将重连..."
              );
            },
            ondisconnect() {
              console.log("链接已中断...");
            },
            onerror: this.onError,
            onroamingmsgs(obj) {
              console.log("漫游消息...");
            },
            onofflinemsgs(obj) {
              console.log("离线消息...");
              obj.msgs.forEach((index, element) => {
                that.msgList.push(element);
              });
            },
            onmsg(msg) {
              console.log(msg);
              if (msg.from === that.targetData.account) {
                that.msgList.push(msg);

                that.scrollToBottom();
                that.receiveSpecialMessage(msg);
                that.getTimeStampShowList(msg);
                that.minusLastCount(msg);
                that.getFirstTargetMsg(msg);
                if (msg.type === "image") {
                  let qualityUrl = that.nim.viewImageQuality({
                    url: msg.file.url,
                    quality: 40
                  });
                  that.imageList.push(qualityUrl);
                }
              }
            }
          });
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
      getFirstTargetMsg(msg) {
        if (msg.from === this.targetData.account) {
          this.targetMsg.push(msg);
        }
      },
      minusLastCount(msg) {
        if (msg.type !== "custom") {
          store.commit("lastCountMinus");
        }
      },
      receiveSpecialMessage(msg) {
        if (msg.type === "custom") {
          if (
            JSON.parse(msg.content) &&
            JSON.parse(msg.content).type === "notification"
          ) {
            let type = JSON.parse(msg.content).data.actionType;
            switch (parseInt(type)) {
              case 1: //患者购买 不处理
                break;
              case 2: //医生赠送次数
                this.lastTimeShow = true;
                store.commit("setLastCount", 3);
                store.commit("setLastTime", 5 * 24 * 60 * 60 * 1000);
                store.commit("lastTimeCount");
                this.payPopupShow = false;
                break;
              case 3: //医生主动拒绝
                this.lastTimeShow = false;
                this.showBottomTips(2);
                break;
              case 4: //医生接诊
                this.getLastTime(0);
                break;
            }
          }
        }
      },
      getImageList() {
        if (this.$refs.bigImg) {
          this.$refs.bigImg.forEach((element, index) => {
            this.imageList.push(element.imageMessage.file.url);
          });
        }
      },
      getUserBaseData() {
        const that = this;

        api.ajax({
          url: XHRList.getToken,
          method: "POST",
          data: {
            accid: "0_" + api.getPara().caseId
          },
          beforeSend: function () {
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
      receivedTreatment(msg) {
        let flag = false;
        if (msg.type === "custom") {
          if (
            JSON.parse(msg.content).type === "notification" &&
            JSON.parse(msg.content).data.actionType == 4
          ) {
            flag = true;
          }
        }
        return flag;
      },
      receivedTreatOver(msg) {
        let flag = false;
        if (msg.type === "custom") {
          if (
            JSON.parse(msg.content).type === "notification" &&
            JSON.parse(msg.content).data.actionType == 5
          ) {
            flag = true;
          }
        }
        return flag;
      },
      receivedSendCount(msg) {
        let flag = false;
        if (msg.type === "custom") {
          if (
            JSON.parse(msg.content).type === "notification" &&
            JSON.parse(msg.content).data.actionType == 2
          ) {
            flag = true;
          }
        }
        return flag;
      },
      receivedBuyCount(msg) {
        let flag = false;
        if (msg.type === "custom") {
          if (
            JSON.parse(msg.content).type === "notification" &&
            JSON.parse(msg.content).data.actionType == 1
          ) {
            if (this.msgList.indexOf(msg) !== 0) {
              flag = true;
            }
          }
        }
        return flag;
      },
      receivedReportTips(msg) {
        let flag = false;
        if (msg.type === "custom") {
          if (
            JSON.parse(msg.content).type === "notification" &&
            JSON.parse(msg.content).data.actionType == 6
          ) {
            if (this.msgList.indexOf(msg) === 0) {
              flag = true;
            }
          }
        }
        return flag;
      },
      receiveMedicalReport(msg) {
        let flag = false;
        if (
          msg.type === "custom" &&
          JSON.parse(msg.content).type === "medicalReport"
        ) {
          if (this.msgList.indexOf(msg) <= 1) {
            flag = true;
          }
        }
        return flag;
      },
      //首次回复更改为结束时提示
      firstReplyTips(msg) {
        let flag = false;
        if (this.targetMsg.indexOf(msg) === 1) {
          flag = true;
        }
        return flag;
      },
      getMessageList() {
        let that = this;
        this.nim.getHistoryMsgs({
          scene: "p2p",
          to: this.targetData.account,
          done(error, obj) {
            that.getDoctorMsg(() => {
              that.msgList = obj.msgs.reverse();
              that.msgList.forEach((element, index) => {
                that.getTargetMessage(element);
                that.getTimeStampShowList(element);
              });
              that.$nextTick(() => {
                //        通过动画结束判断
                //                  that.$refs.outpatientInvite[that.$refs.outpatientInvite.length-1].$el.addEventListener("transitionend",()=>{
                //
                //                    console.log(that.$refs.outpatientInvite)
                //                  });

                setTimeout(() => {
                  if (
                    api.getPara().position === "push" &&
                    that.$refs.outpatientInvite
                  ) {
                    that.scroll.scrollToElement(
                      that.$refs.outpatientInvite[0].$el,
                      1000
                    );
                  } else {
                    that.scrollToBottom();
                  }
                  that.getImageList();
                  that.loading = false;
                }, 700);
              });
            });
          },
          limit: 100
        });
        that.checkFirstBuy();
      },
      // 获取医生姓名、头像
      // 四证统一后，医生数据从唯医数据库获取，不确保能准确同步云信名片
      // 因此通过云信SDK获取已经是不安全的方式
      getDoctorMsg(callback) {
        api.ajax({
          url: XHRList.getDoctorBaseMsg,
          method: "POST",
          data: {
            customerId: api.getPara().doctorCustomerId,
            logoUseFlag: 5
          },
          done(data) {
            if (data.responseObject && data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList[0];
              store.commit("setTargetMsg", {
                avatar: dataList.logoUrl,
                nick: dataList.customerName
              });
              document.title = `${dataList.customerName}医生`;
              callback && callback();
            }
          }
        });
      },
      getTargetMessage(element) {
        if (element.from === this.targetData.account) {
          this.targetMsg.push(element);
        }
      },
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
          beforeSend(config) {
          },
          done(data) {
            if (data.responseObject && data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                that.sendMedicalReport(
                  {
                    data: {
                      caseId: api.getPara().caseId, //问诊单 病例ID
                      patientName: dataList[0].patientCasemap.patientName, //患者姓名
                      sexName: dataList[0].patientCasemap.sexName, //患者性别
                      age: dataList[0].patientCasemap.age, //患者年龄
                      createDate: new Date().getTime(),
                      diagnoseConTent:
                      dataList[0].patientCasemap.caseMain.caseMain,
                      isAttachment: dataList[0].patientCasemap.isAttachment,
                      time: dataList[0].patientCasemap.caseTime,
                      caseUrl: `${window.location
                        .origin}/pages/app_native/reservation_list.html?caseId=${api.getPara()
                        .caseId}&isOrder=0`
                    },
                    type: "medicalReport" //自定义类型 问诊单
                  },
                  dataList[0].patientCasemap.patientName
                );
                //                const userData = {
                //                  nick: dataList[0].patientCasemap.patientName,
                //                  avatar: that.$store.state.logoUrl,
                //                  sign: 'newSign',
                //                  gender: dataList[0].patientCasemap.sexName === "男" ? "male" : "female",
                //                  email: '',
                //                  birth: '',
                //                  tel: '',
                //                };
                //
                //                that.nim.updateMyInfo(userData);
                //                that.userData = Object.assign({}, that.userData, userData);
              }
            }
          }
        });
      },
      //      针对老患者报道若问诊单空，则通过以下link获取name...
      getPatientBase(callback) {
        const that = this;
        api.ajax({
          url: XHRList.getBaseInfo,
          method: "POST",
          data: {
            patientId: api.getPara().patientId,
            firstResult: "0",
            maxResult: "1"
          },
          done(data) {
            if (data.responseObject && data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                store.commit("setLogoUrl", {
                  age: dataList[0].patientAge,
                  sexName: dataList[0].patientSex == 1 ? "男" : "女"
                });
                const userData = {
                  nick: dataList[0].patientName,
                  avatar: that.$store.state.logoUrl,
                  sign: "newSign",
                  gender: dataList[0].patientSex === "1" ? "male" : "female",
                  email: "",
                  birth: "",
                  tel: ""
                };
                that.nim.updateMyInfo(userData);
                that.userData = Object.assign(that.userData, userData);

                callback && callback(userData);
              }
            }
          }
        });
      },
      sendMedicalReport(data, nickName) {
        const that = this;
        this.nim.sendCustomMsg({
          scene: "p2p",
          to: this.targetData.account,
          custom: JSON.stringify({
            cType: "1",
            cId: api.getPara().doctorCustomerId,
            mType: "27",
            conId: that.orderSourceId
          }),
          content: JSON.stringify(data),
          isPushable: false,
          // needPushNick: false,
          // pushContent: `患者<${nickName}>向您问诊，点击查看详情`,
          // pushPayload: JSON.stringify({
          //   "account": "0_" + api.getPara().caseId,
          //   "type": "1"
          // }),
          done(error, msg) {
            that.sendMessageSuccess(error, msg);
            that.sendHistoryTips();
          }
        });
      },
      sendHistoryTips(){
        const that=this;
        this.nim.sendCustomMsg({
          scene: "p2p",
          to: this.targetData.account,
          custom: JSON.stringify({
            cType: "1",
            cId: api.getPara().doctorCustomerId,
            mType: "44",
            conId: this.orderSourceId
          }),
          content: JSON.stringify({
            type:"getHistoryTip",
            data:{
              caseId:this.targetData.account.substring(2)
            }
          }),
          isPushable: false,
          done(error, msg) {
            that.sendMessageSuccess(error, msg);
          }
        });
      },
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
            consultationType: 1,
            sortType: 1,
            firstResult: 0,
            maxResult: 9999,
            customerId: api.getPara().doctorCustomerId
          },
          done(data) {
            if (data.responseObject.responseMessage === "NO DATA") {
              that.createTriageMessage();
            } else {
              let dataList = data.responseObject.responseData.dataList;
              that.orderSourceId = dataList[0].consultationId;

              that.getLastTime(parseInt(dataList[0].consultationState));
              //未接诊则发送：

              that.firstMessageType(parseInt(dataList[0].consultationState));
            }
          }
        });
      },
      firstMessageType(state) {
        /*
           * 场景区分：
           * 咨询：发送问诊单
           * 扫码问诊：发送问诊单，但被拒无法联系分诊台
           * 扫码报道：无问诊单，发送报道提示，被拒不联系分诊台
           *
           * query：from=report与缓存noMR皆存在则为扫码报道
           * 此时发送App端提示消息，被拒状态不同
           * query：from=report则为扫码问诊与扫码报道
           * 此时正常发送问诊单，但被拒状态不同
           * */
        //        this.getPatientBase(this.sendReportTipMessage);
        if (state < 0) {
          setTimeout(() => {
            if (api.getPara().from === "report" && localStorage.getItem("noMR")) {
              if (!this.$refs.reportTip) {
                this.getPatientBase(this.sendReportTipMessage);
              }
            } else {
              if (!this.$refs.medicalReport) {
                this.getPatientBase(this.getMedicalMessage);
              }
            }
          }, 1000);
        }
      },
      //扫码报道提示语
      sendReportTipMessage(userData) {
        const that = this;
        this.nim.sendCustomMsg({
          scene: "p2p",
          to: this.targetData.account,
          custom: JSON.stringify({
            cType: "1",
            cId: api.getPara().doctorCustomerId,
            mType: "21",
            conId: that.orderSourceId
          }),
          content: JSON.stringify({
            type: "notification",
            data: {
              actionType: "6",
              contentDesc: "患者向您报到",
              subContentDesc: "[患者向您报到]"
            }
          }),
          needPushNick: false,
          pushContent: `患者<${userData.nick ? userData.nick : ""}>向您问诊，点击查看详情`,
          pushPayload: JSON.stringify({
            account: "0_" + api.getPara().caseId,
            type: "1"
          }),
          done(error, msg) {
            that.sendMessageSuccess(error, msg);
            localStorage.removeItem("noMR");
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
            customerId: api.getPara().doctorCustomerId,
            patientCustomerId: api.getPara().patientCustomerId,
            patientId: api.getPara().patientId,
            consultationType: 1,
            consultationState: -1,
            siteId: 17
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              console.log("用户已分流...");
              that.orderSourceId = data.responseObject.responsePk;
              //              that.shuntCustomerId = data.responseObject.responseData.dataList[0].customerId;
              that.getLastTime(-1);
              //初次创建分流发送问诊单
              that.firstMessageType(-1);
            }
          }
        });
      },
      getLastTime(status) {
        const that = this;
        api.ajax({
          url: XHRList.time,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,
            customerId: api.getPara().doctorCustomerId,
            isValid: 1,
            consultationType: 1,
            firstResult: 0,
            maxResult: 9999
          },
          done(param) {
            that.inputBoxShow = true;
            if (param.responseObject.responseStatus) {
              let dataList = param.responseObject.responseData.dataList;
              let time = parseInt(dataList.remainingTime);
              let count = parseInt(dataList.consultationFrequency);
              let receiveTime = parseInt(dataList.receiveTime);

              that.shuntCustomerId = dataList.triageCustomerId;
              that.triageOrderSourceId = dataList.triageConsultationId;
              // 若未接诊，接诊是否已超时...
              if (status < 0) {
                that.receiveTreatmentStatus = false;
                if (receiveTime <= 0) {
                  that.showBottomTips(-1);
                } else {
                  that.receiveTime = receiveTime;
                  that.remainTimeOut();
                }
              } else if (status === 0) {
                // 已接诊，设置剩余时间次数...
                that.receiveTreatmentStatus = true;
                store.commit("setConsultation", dataList.consultationId);

                if (time > 0 && count > 0) {
                  store.commit("setLastTime", time);
                  store.commit("lastTimeCount");
                  store.commit("setLastCount", count);
                  that.lastTimeShow = true;
                } else {
                  that.lastTimeShow = false;
                  that.showBottomTips(1);
                }
              } else if (status == 3) {
                that.lastTimeShow = false;
                that.showBottomTips(-1);
              } else if (status == 2) {
                that.lastTimeShow = false;
                that.showBottomTips(2);
              } else if (status == 1) {
                that.lastTimeShow = false;
                that.showBottomTips(1);
              }
              that.$nextTick(() => {
                autosize(that.$refs.inputTextarea);
              });
            }
          },
          fail(err) {
            console.log(err.message);
          }
        });
      },
      showBottomTips(type) {
        this.bottomTipsShow = true;
        this.bottomTipsType = type;

        this.scrollToBottom();
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
          autosize.update(that.$refs.inputTextarea);
          // autosize.destroy(that.$refs.inputTextarea);
          return false;
        }
        let sendTextTemp = this.sendTextContent;
        this.sendTextContent = "";
        autosize.destroy(that.$refs.inputTextarea);
        this.nim.sendText({
          scene: "p2p",
          custom: JSON.stringify({
            cType: "1",
            cId: api.getPara().doctorCustomerId,
            mType: "0",
            conId: that.orderSourceId
          }),
          to: this.targetData.account,
          text: sendTextTemp,
          needPushNick: false,
          pushContent: `患者<${this.userData.nick
            ? this.userData.nick
            : ""}>向您问诊，点击查看详情`,
          pushPayload: JSON.stringify({
            account: "0_" + api.getPara().caseId,
            type: "1"
          }),
          done(error, obj) {
            console.log(obj);
            that.sendMessageSuccess(error, obj);
            autosize(that.$refs.inputTextarea);
          }
        });
        $(".main-input-box-textarea").focus();
      },
      sendMessageSuccess(error, msg) {
        this.getTimeStampShowList(msg);
        console.log(
          "发送" +
          msg.scene +
          " " +
          msg.type +
          "消息" +
          (!error ? "成功" : "失败") +
          ", id=" +
          msg.idClient
        );
        this.sendTextContent = "";
        if (!error) {
          this.msgList.push(msg);
        } else {
          //          this.sendErrorTips(msg);
        }
        this.scrollToBottom();
      },

      transformTimeStamp(time) {
        if (!time) {
          return "";
        }
        let format = function (num) {
          return num > 9 ? num : "0" + num;
        };
        let normalTime = function (time) {
          let d = new Date(time);
          let obj = {
            y: d.getFullYear(),
            m: format(d.getMonth() + 1),
            dd: format(d.getDate()),
            h: format(d.getHours()),
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
            "-" +
            normalTime(time).dd +
            "  " +
            normalTime(time).h +
            ":" +
            normalTime(time).mm;
        } else if (normalTime(time).y !== normalTime(now).y) {
          result =
            normalTime(time).y +
            "-" +
            normalTime(time).m +
            "-" +
            normalTime(time).dd +
            "  " +
            normalTime(time).h +
            ":" +
            normalTime(time).mm;
        }
        return result;
      },
      getTimeStampShowList(element) {
        if ((element.time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
          this.beginTimestamp = element.time;
          this.timeStampShowList.push(1);
        } else {
          this.timeStampShowList.push(0);
        }
      },
      getTimeStampShowFlag(msg, index) {
        if (msg.type === "custom" && msg.content) {
          if (
            JSON.parse(msg.content).type === "notification" &&
            (JSON.parse(msg.content).data.actionType == 3 ||
              JSON.parse(msg.content).data.actionType == 5)
          ) {
            return false;
          } else {
            if (
              msg.type === "custom" &&
              JSON.parse(msg.content).type === "medicalReport"
            ) {
              if (this.msgList.indexOf(msg) > 0) {
                return false;
              }
            }
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

      sendFile(e) {
        const that = this;
        that.inputFlag = false;
        const file = e.target.files[0];
        this.msgList.push({
          file: {
            url: window.URL.createObjectURL(file)
          },
          type: "file",
          idClient: "",
          from: this.userData.account
        });
        console.log(file);
        if (file.type.includes("image")) {
          this.sendImageFile(file);
        } else if (file.type.includes("video")) {
          this.sendVideoFile(file);
        }
      },
      sendImageFile(file) {
        const that = this;
        that.imageLastIndex = that.msgList.length - 1;
        this.nim.previewFile({
          type: "image",
          fileInput: this.$refs.imageSender,
          uploadprogress(obj) {
            that.scrollToBottom();
            that.imageProgress = {
              uploading: true,
              progress: obj.percentageText,
              index: that.imageLastIndex,
            };
            console.log("文件总大小: " + obj.total + "bytes");
            console.log("已经上传的大小: " + obj.loaded + "bytes");
            console.log("上传进度: " + obj.percentage);
            console.log("上传进度文本: " + obj.percentageText);
          },
          done(error, file) {
            console.log("上传image" + (!error ? "成功" : "失败"));
            // show file to the user
            console.log(file);
            if (!error) {
              let msg = that.nim.sendFile({
                scene: "p2p",
                custom: JSON.stringify({
                  cType: "1",
                  cId: api.getPara().doctorCustomerId,
                  mType: "1",
                  conId: that.orderSourceId
                }),
                to: that.targetData.account,
                file: file,
                needPushNick: false,
                pushContent: `患者<${that.userData.nick
                  ? that.userData.nick
                  : ""}>向您问诊，点击查看详情`,
                pushPayload: JSON.stringify({
                  account: "0_" + api.getPara().caseId,
                  type: "1"
                }),
                type: "image",
                done(error, msg) {
                  that.msgList[that.imageLastIndex] = msg;
                  that.imageProgress = {
                    uploading: false,
                    progress: "0%",
                    index: 0
                  };
                  that.imageList.push(msg.file.url);
                }
              });
            }
          }
        });
      },
      sendVideoFile(file) {
        const that = this;
        this.nim.previewFile({
          type: "video",
          fileInput: this.$refs.imageSender,
          uploadprogress(obj) {
            that.scrollToBottom();
            that.imageProgress = {
              uploading: true,
              progress: obj.percentageText,
              index: that.msgList.length - 1
            };
            console.log("文件总大小: " + obj.total + "bytes");
            console.log("已经上传的大小: " + obj.loaded + "bytes");
            console.log("上传进度: " + obj.percentage);
            console.log("上传进度文本: " + obj.percentageText);
          },
          done(error, file) {
            console.log("上传video" + (!error ? "成功" : "失败"));
            // show file to the user
            console.log(file);
            if (!error) {
              let msg = that.nim.sendFile({
                scene: "p2p",
                custom: JSON.stringify({
                  cType: "1",
                  cId: api.getPara().doctorCustomerId,
                  mType: "1",
                  conId: that.orderSourceId
                }),
                to: that.targetData.account,
                file: file,
                needPushNick: false,
                pushContent: `患者<${that.userData.nick
                  ? that.userData.nick
                  : ""}>向您问诊，点击查看详情`,
                pushPayload: JSON.stringify({
                  account: "0_" + api.getPara().caseId,
                  type: "1"
                }),
                type: "video",
                done(error, msg) {
                  that.msgList[that.msgList.length - 1] = msg;
                  that.imageProgress = {
                    uploading: false,
                    progress: "0%",
                    index: 0
                  };
                  that.imageList.push(msg.file.url);
                }
              });
            }
          }
        });
      },
      scrollToBottom() {
        let that = this;
        that.$nextTick(() => {
          $(".main-message").animate(
            {
              scrollTop: $(".main-message>section").height()
            },
            300
          );
        });
      },
      inputLimit() {
        let content = this.sendTextContent;
        if (api.getByteLen(content) > 1000) {
          this.sendTextContent = api.getStrByteLen(content, 1000);
        }
      },
      //接诊时间倒数
      remainTimeOut() {
        this.remainTimeCount = setInterval(() => {
          if (this.receiveTime <= 0) {
            this.bottomTipsType(-1);
            clearInterval(this.remainTimeCount);
          } else {
            this.receiveTime = this.receiveTime - 1000;
          }
        }, 1000);
      },
      //支付成功...刷新页面并重置时间
      refreashOrderTime(count) {
        const that = this;
        let state = "";
        if (this.bottomTipsType == -1) {
          state = -1;
        } else {
          state = 0;
        }

        api.ajax({
          url: XHRList.updateCount,
          method: "POST",
          data: {
            consultationId: that.orderSourceId,
            frequency: count.orderFrequency,
            frequencyType: "2",
            consultationLevel: count.orderType,
            consultationState: state
          },

          done(data) {
            if (data.responseObject.responseData) {
              if (state === -1) {
                that.receiveTime = 2 * 60 * 60 * 1000;
                that.remainTimeOut();
                that.lastTimeShow = true;
                that.bottomTipsShow = false;
                that.sendPayFinish(count);
              } else {
                store.commit("setLastCount", parseInt(count.orderFrequency));
                store.commit("setLastTime", 5 * 24 * 60 * 60 * 1000);
                store.commit("lastTimeCount");
                that.sendPayFinish(count);
                setTimeout(() => {
                  that.lastTimeShow = true;
                  that.receiveTreatmentStatus = true;
                }, 200);

                //                console.log(count.orderFrequency);
              }
            }
          }
        });
      },
      retryClick(type) {
        const that = this;
        switch (type) {
          case -1:
            this.payPopupShow = true;
            break;
          case 1:
            this.payPopupShow = true;
            break;
          case 2:
            api.ajax({
              url: XHRList.updateCount,
              method: "POST",
              data: {
                consultationId: this.triageOrderSourceId,
                frequency: "0",
                frequencyType: "5",
                consultationLevel: "1",
                consultationState: "2"
              },
              done(data) {
                if (data.responseObject.responseData) {
                  // 存储sessionStorage，给分诊医生im使用；
                  sessionStorage.setItem(
                    "doctor",
                    that.$store.state.targetMsg.nick
                  );

                  window.location.href =
                    "/dist/imScene.html?&caseId=" +
                    api.getPara().caseId +
                    "&patientId=" +
                    api.getPara().patientId +
                    "&patientCustomerId=" +
                    api.getPara().patientCustomerId +
                    "&shuntCustomerId=" +
                    that.shuntCustomerId;
                  // that.nim.sendText({
                  //   scene: "p2p",
                  //   to: "1_doctor00001",
                  //   custom: JSON.stringify({
                  //     cType: "1",
                  //     cId: api.getPara().doctorCustomerId,
                  //     mType: "0",
                  //     conId: that.orderSourceId
                  //   }),
                  //   text: `${that.$store.state.targetMsg
                  //     .nick}拒绝了我的咨询，请重新为我匹配对症医生`,
                  //   done(error, obj) {

                  //   }
                  // });
                }
              }
            });

            break;
        }
      },
      checkFirstBuy() {
        if (localStorage.getItem("sendTips")) {
          let count = JSON.parse(localStorage.getItem("sendTips"));
          this.getPatientBase(this.sendPayFinish);
        }
      },
      resetLogoUrl() {
        if (!this.$store.state.logoUrl) {
          this.getPatientBase();
        }
      },
      sendPayFinish(args) {
        const that = this;
        let count = "",
          userData = "";
        if (args.nick) {
          userData = args;
          count = JSON.parse(localStorage.getItem("sendTips"));
        } else {
          count = args;
          userData = this.userData;
        }

        let desc = "",
          subContentDesc = "",
          contentType = "",
          amount = "";

        switch (parseInt(count.orderType)) {
          case 0:
            desc = "免费";
            break;
          case 1:
            desc = "图文";
            break;
          case 3:
            desc = "特需";
            break;
          default:
            break;
        }

        if (count.orderAmount) {
          amount = `(${count.orderAmount}元)`;
        } else {
          amount = "";
        }

        if (parseInt(count.orderType) === 0) {
          subContentDesc = "[患者申请免费问诊]";
          contentType = "申请";
        } else {
          subContentDesc = `[患者购买问诊]`;
          contentType = "购买";
        }
        localStorage.removeItem("sendTips");
        this.nim.sendCustomMsg({
          scene: "p2p",
          custom: JSON.stringify({
            cType: "1",
            cId: api.getPara().doctorCustomerId,
            mType: "33",
            conId: that.orderSourceId
          }),
          to: that.targetData.account,
          needPushNick: false,
          pushContent: `患者<${userData.nick ? userData.nick : ""}>向您问诊，点击查看详情`,
          pushPayload: JSON.stringify({
            account: "0_" + api.getPara().caseId,
            type: "1"
          }),
          content: JSON.stringify({
            type: "notification",
            data: {
              actionType: "1",
              contentDesc: `患者已${contentType}您的${desc}问诊${amount}`,
              subContentDesc: subContentDesc
            }
          }),
          done(error, msg) {
            if (!error) {
              if (that.msgList.length !== 0) {
                that.sendMessageSuccess(error, msg);
                //                localStorage.removeItem("sendTips");
              }
            }
          }
        });
      },
      initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 1,
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
        return api.MillisecondToDate(this.$store.state.lastTime);
      },
      lastCount() {
        return this.$store.state.lastCount;
      },
      payPopupDate() {
        return {
          docName: this.$store.state.targetMsg.nick,
          docId: api.getPara().doctorCustomerId,
          caseId: api.getPara().caseId,
          patientId: api.getPara().patientId,
          patientCustomerId: api.getPara().patientCustomerId,
          from: "imDoctor",
          payType: "pay"
        };
      },
      // 输入框的长度
      textLength() {
        return this.sendTextContent.replace(/(^(\r|\n|\s)*)|((\r|\n|\s)*$)/g, "");
      }
    },
    mounted() {
      this.setFooterPosition();
      // this.initScroll();
      this.getUserBaseData();
      //以下M站支付使用
      localStorage.removeItem("mPayDoctorId");
      if (localStorage.getItem("payOk") == 1) {
        this.payPopupShow = true;
      } else {
        this.payPopupShow = false;
      }

      //      this.resetLogoUrl();
      api.forbidShare();


      if (api.getPara().from === "im") {
        return;
      } else {
        localStorage.setItem("APPIMLinks", location.href);
        localStorage.setItem("PCIMLinks", location.href);
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === 'showBigImg') {
        console.log($(".main-message").scrollTop());
        sessionStorage.setItem('imagePosition', $(".main-message").scrollTop());
      }
      next(true);
    },
    activated() {
      // this.scrollToBottom();
      if (sessionStorage.getItem('imagePosition')) {
        $(".main-message").scrollTop(sessionStorage.getItem('imagePosition'));
        sessionStorage.removeItem('imagePosition');
      }
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
      lastTime(time) {
        if (time <= 0) {
          this.lastTimeShow = false;
          this.bottomTipsShow = true;
          this.showBottomTips(1);
        } else {
          this.lastTimeShow = true;
          this.bottomTipsShow = false;
        }
      },
      lastCount(count) {
        if (count <= 0) {
          this.lastTimeShow = false;
          this.bottomTipsShow = true;
          store.commit("stopLastTimeCount");
          this.showBottomTips(1);
        } else {
          this.lastTimeShow = true;
          this.bottomTipsShow = false;
        }
      }
    },
    components: {
      MedicalReport,
      ContentText,
      ImageContent,
      BottomTips,
      MiddleTips,
      PayFinishTips,
      payPopup,
      OutpatientInvite,
      SurgicalDrape,
      HospitalNotice,
      SendCount,
      AudioMessage,
      VideoMessage,
      Loading,
      Toast
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  @import "../../../../static/scss/modules/imDoctorStyle";

  .animated {
    box-shadow: none !important;
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

