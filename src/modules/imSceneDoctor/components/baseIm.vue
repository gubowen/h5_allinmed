<template>
  <section class="main-inner ev-fileUpHide">
    <section class="main-message" ref="messageBox" :class="{'bottom-tips-padding':bottomTipsShow}">
      <transition name="fadeDown">
        <article class="main-message-time" v-if="lastTimeShow&&receiveTreatmentStatus">
          <article><p>医生回复剩余次数</p><span>{{lastCount}}</span>
            <p>次</p></article>
          <article><p>对话剩余时间</p><span>{{lastTimeText}}</span>
            <p></p></article>
        </article>
      </transition>
      <transition-group name="fadeDown" tag="section">
        <section class="main-message-wrapper" v-for="(msg,index) in msgList" :key="index">
          <!--时间戳-->
          <p class='time-stamp'
             v-if="getTimeStampShowFlag(msg,index)||receivedTreatment(msg)">
            {{transformTimeStamp(msg.time)}}</p>
          <!--问诊单-->
          <MedicalReport
            v-if="msg.type==='custom' && JSON.parse(msg.content).type==='medicalReport'"
            :medicalReportMessage="JSON.parse(msg.content)"
            ref="medicalReport">
          </MedicalReport>
          <!--医生接诊-->
          <MiddleTips
            v-if="receivedTreatment(msg)"
            :tipsType="4"
          >

          </MiddleTips>
          <!--问诊结束-->
          <MiddleTips
            v-if="receivedTreatOver(msg)"
            :tipsType="5"
          >
          </MiddleTips>
          <!--支付成功-->
          <PayFinishTips
            v-if="msg.type==='custom' && JSON.parse(msg.content).type==='payFinishTips'"
          >
          </PayFinishTips>
          <!--门诊邀约-->
          <OutpatientInvite
            v-if="msg.type==='custom' && JSON.parse(msg.content).type==='outpatientInvite'"
            :outPatientMessage="JSON.parse(msg.content)"
          >
          </OutpatientInvite>
          <!--手术单-->
          <SurgicalDrape
            v-if="msg.type==='custom'&&JSON.parse(msg.content).type==='surgicalDrape'"
            :surgicalMessage="JSON.parse(msg.content)"
          >
          </SurgicalDrape>
          <!--赠送次数-->
          <SendCount
            v-if="receivedSendCount(msg)"
            :sendCountMessage="JSON.parse(msg.content)"
          >
          </SendCount>
          <!--购买问诊-->
          <section class="main-message-box grey-tips" v-if="receivedBuyCount(msg)">
            <figcaption class="first-message">
              <p>您已重新购买问诊，可继续向医生提问</p>
            </figcaption>
          </section>

          <!--住院通知-->
          <HospitalNotice
            v-if="msg.type==='custom'&&JSON.parse(msg.content).type==='hospitalNotice'"
            :hoispitalMessage="JSON.parse(msg.content)"
          >
          </HospitalNotice>
          <!--文本消息-->
          <ContentText
            v-if="msg.type==='text' && msg.text"
            :contentMessage="msg"
            :userData="userData"
            :targetData="targetData">
          </ContentText>
          <!--图像消息-->
          <ImageContent
            v-if="(msg.type==='file'||msg.type==='image') && msg.file"
            :imageMessage="msg"
            :nim="nim"
            ref="bigImg"
            :imageList="imageList"
            :imageProgress="imageProgress"
            :currentIndex="index"
            :userData="userData"
            :targetData="targetData"
          >
          </ImageContent>
          <!--音频-->
          <AudioMessage
            v-if="msg.type==='audio'"
            :audioMessage="msg"
          >
          </AudioMessage>
        </section>
      </transition-group>
    </section>
    <!--底部提示-->
    <transition name="fadeUp">
      <BottomTips
        v-if="bottomTipsShow"
        :bottomTipsType="bottomTipsType"
      >
      </BottomTips>
    </transition>
    <transition name="fadeUp">
      <footer class="main-input-box" v-if="inputBoxShow">
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
        <!--继续沟通-->
        <section class="prohibit-input" v-if="!lastTimeShow&&bottomTipsType==1" @click="retryClick(1)">
          <div>
            <span>继续沟通</span>
          </div>
        </section>
        <section class="main-input-box-plus">
          <i class="icon-im-plus"></i>
          <input type="file" id="ev-file-send" @change="sendFile($event)" ref="imageSender"  accept="image/*">
        </section>
        <figure class="main-input-box-textarea-inner">
          <textarea class="main-input-box-textarea" rows="1" v-model="sendTextContent" ref="inputTextarea"
                    @click="scrollToBottom"></textarea>
        </figure>
        <button class="main-input-box-send" @click="sendMessage">发送</button>
      </footer>
    </transition>
    <!--支付弹层-->
    <payPopup @paySuccess="refreashOrderTime" :payPopupShow.sync="payPopupShow" :payPopupParams = "payPopupDate" v-if="payPopupShow"></payPopup>
    <Loading v-if="loading"></Loading>
  </section>
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
  import api from 'common/js/util/util';
  import autosize from 'autosize';
  import store from "../store/store";

  import MedicalReport from './medicalReport';
  import ContentText from "./content"
  import ImageContent from './image';
  import BottomTips from "./bottomTips";
  import MiddleTips from "./middleTips";
  import PayFinishTips from "./payFinishTips";
  import PayTypePopup from "./payTypePopup";
  import OutpatientInvite from "./outpatientInvite";
  import SurgicalDrape from "./surgicalDrape";
  import HospitalNotice from "./hospitalNotice";
  import SendCount from "./SendCount";
  import AudioMessage from "./audioMessage";

  import Loading from "components/loading";
  import payPopup from 'components/payLayer';

  import WxPayCommon from 'common/js/wxPay/wxComm';
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
    getBaseInfo: "/mcall/customer/patient/baseinfo/v1/getMapList/"
  };
  export default{
    data(){
      return {
        nim: {},
        imageProgress: {
          uploading: false,
          progress: 0,
          index: 0
        },
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
        payPopupDate:{
          docName:this.$store.state.targetMsg.nick,
          docId:api.getPara().doctorCustomerId,
          caseId:api.getPara().caseId,
          patientId:api.getPara().patientId,
          patientCustomerId:api.getPara().patientCustomerId,
          from:'imDoctor',
          payType:'pay'
        },
        userData: {
          account: "",
          token: ""
        },
        targetData: {
          account: '2_' + api.getPara().doctorCustomerId
        },
        sendTextContent: ""
      }
    },

    methods: {
      connectToNim(){
        const that = this;
        this.nim = NIM.getInstance({
          // debug: true,
          appKey: '50c93d2ab7e207fd83231a245c07bfbc',
          account: this.userData.account,
          token: this.userData.token,
          onconnect (data) {
            console.log('连接成功');
            that.triageDoctorAssign();
          },
          onmyinfo(userData) {
            that.getMessageList();
            that.userData = userData;
          },
          onwillreconnect (obj) {
            console.log("已重连" + obj.retryCount + "次，" + obj.duration + "后将重连...")
          },
          ondisconnect () {
            console.log("链接已中断...")
          },
          onerror: this.onError,
          onroamingmsgs(obj) {
            console.log("漫游消息...");
          },
          onofflinemsgs (obj) {
            console.log("离线消息...");
            obj.msgs.forEach((index, element) => {
              that.msgList.push(element);
            });
          },
          onmsg (msg) {
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
      },
      getFirstTargetMsg(msg){
        if (msg.from === this.targetData.account) {
          this.targetMsg.push(msg);
        }
      },
      minusLastCount(msg){
        if (msg.type !== "custom") {
          store.commit("lastCountMinus");
        }
      },
      receiveSpecialMessage(msg){
        if (msg.type === "custom") {
          if (JSON.parse(msg.content) && JSON.parse(msg.content).type === "notification") {
            let type = JSON.parse(msg.content).data.actionType;
            switch (parseInt(type)) {
              case 1: //患者购买 不处理
                
                break;
              case 2://医生赠送次数
                this.lastTimeShow = true;
                store.commit("setLastCount", 3);
                store.commit("setLastTime", 5 * 24 * 60 * 60 * 1000);
                store.commit("lastTimeCount");
                break;
              case 3://医生主动拒绝
                this.lastTimeShow = false;
                this.showBottomTips(2);
//                store.commit("stopLastTimeCount");
                break;
              case 4://医生接诊
                this.lastTimeShow = true;
                this.receiveTreatmentStatus = true;
                store.commit("setLastCount", 3);
                store.commit("setLastTime", 5 * 24 * 60 * 60 * 1000);
                store.commit("lastTimeCount");
                clearInterval(this.remainTimeCount);
                break;
            }
          }
        }
      },
      getImageList(){
        if (this.$refs.bigImg) {
          this.$refs.bigImg.forEach((element, index) => {
            this.imageList.push(element.imageMessage.file.url);
          });
        }
      },
      getUserBaseData(){
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
              }
            }
            that.finish = true;
            autosize(that.$refs.inputTextarea);
            that.connectToNim();
          },
          fail(err) {
            console.log(err.message);
          }
        })
      },
      receivedTreatment(msg){
        let flag = false;
        if (msg.type === 'custom') {
          if (JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 4) {
            flag = true;
          }
        }
        return flag;
      },
      receivedTreatOver(msg){
        let flag = false;
        if (msg.type === 'custom') {
          if (JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 5) {
            flag = true;
          }
        }
        return flag;
      },
      receivedSendCount(msg){
        let flag = false;
        if (msg.type === 'custom') {
          if (JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 2) {
            flag = true;
          }
        }
        return flag;
      },
      receivedBuyCount(msg){
        let flag = false;
        if (msg.type === 'custom') {
          if (JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 1) {
            flag = true;
          }
        }
        return flag;
      },
      //首次回复更改为结束时提示
      firstReplyTips(msg){
        let flag = false;
        if (this.targetMsg.indexOf(msg) === 1) {
          flag = true;
        }
        return flag;
      },
      getMessageList () {
        let that = this;
        this.nim.getHistoryMsgs({
          scene: 'p2p',
          to: this.targetData.account,
          done(error, obj) {
            that.msgList = obj.msgs.reverse();
            that.msgList.forEach((element, index) => {
              that.getTargetMessage(element);
              that.getTimeStampShowList(element);
            });


            setTimeout(() => {
              document.body.scrollTop = Math.pow(10, 10);
              that.getImageList();
              that.loading = false;
            }, 100);
          },
          limit: 100
        });
        this.nim.getUser({
          account: this.targetData.account,
          done(error, user){
            console.log(user)
            store.commit("setTargetMsg", user);
            document.title = user.nick + "医生";
          }
        });
      },
      getTargetMessage(element){
        if (element.from === this.targetData.account) {
          this.targetMsg.push(element);
        }
      },
      getMedicalMessage(){
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
                that.sendMedicalReport({
                  data: {
                    caseId: api.getPara().caseId,  //问诊单 病例ID
                    patientName: dataList[0].patientCasemap.patientName, //患者姓名
                    sexName: dataList[0].patientCasemap.sexName, //患者性别
                    age: dataList[0].patientCasemap.age, //患者年龄
                    createDate: new Date().getTime(),
                    diagnoseConTent: dataList[0].patientCasemap.caseMain.caseMain,
                    isAttachment: dataList[0].patientCasemap.isAttachment,
                    time: dataList[0].patientCasemap.caseTime,
                    caseUrl: "https://m.allinmed.cn/pages/app_native/reservation_list.html?caseId=" + api.getPara().caseId + "&isOrder=0"
                  },
                  type: "medicalReport"  //自定义类型 问诊单
                }, dataList[0].patientCasemap.patientName);
                const userData = {
                  nick: dataList[0].patientCasemap.patientName,
                  avatar: that.$store.state.logoUrl,
                  sign: 'newSign',
                  gender: dataList[0].patientCasemap.sexName === "男" ? "male" : "female",
                  email: '',
                  birth: '',
                  tel: '',
                };

                that.nim.updateMyInfo(userData);
                that.userData = Object.assign({}, that.userData, userData);
              } else if (data.responseObject.responseMessage === "NO DATA") {
                that.getPatientBase();
              }
            }
          }
        })
      },
      //      针对老患者报道若问诊单空，则通过以下link获取name...
      getPatientBase(){
        const that = this;
        api.ajax({
          url: XHRList.getBaseInfo,
          method: "POST",
          data: {
            patientId: api.getPara().patientId,
            firstResult: "0",
            maxResult: "1"
          },
          done(data){
            if (data.responseObject && data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                store.commit("setLogoUrl", {
                  age: dataList[0].patientAge,
                  sexName: (dataList[0].patientSex == 1 ? "男" : "女")
                });
                const userData = {
                  nick: dataList[0].patientName,
                  avatar: that.$store.state.logoUrl,
                  sign: 'newSign',
                  gender: dataList[0].patientSex === "1" ? "male" : "female",
                  email: '',
                  birth: '',
                  tel: '',
                };
                that.nim.updateMyInfo(userData);
                that.userData = Object.assign({}, that.userData, userData);
              }
            }
          }
        })
      },
      sendMedicalReport(data, nickName){
        const that = this;
        this.nim.sendCustomMsg({
          scene: 'p2p',
          to: this.targetData.account,
          content: JSON.stringify(data),
          needPushNick: false,
          pushContent: `患者<${nickName}>向您咨询，点击查看详情`,
          pushPayload: JSON.stringify({
            "account": "0_" + api.getPara().caseId,
            "type": "1"
          }),
          done(error, msg) {
            that.sendMessageSuccess(error, msg);
          }
        });

      },
      triageDoctorAssign () {
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
            maxResult: 9999
          },
          done (data) {
            if (data.responseObject.responseMessage === "NO DATA") {
              that.createTriageMessage();
            } else {
              let dataList = data.responseObject.responseData.dataList;
              that.orderSourceId = dataList[dataList.length - 1].consultationId;

              that.getLastTime(parseInt(dataList[dataList.length - 1].consultationState));
              //未接诊则发送

              if (parseInt(dataList[dataList.length - 1].consultationState) < 0) {
                setTimeout(() => {
                  if (!that.$refs.medicalReport) {
                    that.getMedicalMessage();
                  }
                }, 1000);
              }
            }
          }
        })
      },
      //创建分流
      createTriageMessage(){
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
              that.shuntCustomerId = data.responseObject.responseData.dataList[0].customerId;
              that.getLastTime(-1);
              //初次创建分流发送问诊单
              that.getMedicalMessage();
            }
          }
        })
      },
      getLastTime(status){
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
            }
          },
          fail(err) {
            console.log(err.message);
          }
        })
      },
      showBottomTips(type){
        this.bottomTipsShow = true;
        this.bottomTipsType = type;

        this.scrollToBottom();
      },
      sendMessage(){
        if (this.sendTextContent.trim().length === 0) {
          return false;
        }
        const that = this;
        this.nim.sendText({
          scene: 'p2p',
          to: this.targetData.account,
          text: this.sendTextContent,
          needPushNick: false,
          pushContent: `患者<${this.userData.nick}>向您咨询，点击查看详情`,
          pushPayload: JSON.stringify({
            "account": "0_" + api.getPara().caseId,
            "type": "1"
          }),
          done(error, obj) {
            console.log(obj);
            that.sendMessageSuccess(error, obj);
          }
        });
      },
      sendMessageSuccess(error, msg){
        this.getTimeStampShowList(msg);
        console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
        this.sendTextContent = "";
        if (!error) {
          this.msgList.push(msg);
        } else {
          this.sendErrorTips(msg);
        }
        setTimeout(() => {
          document.body.scrollTop = Math.pow(10, 10);
        }, 20)
      },

      transformTimeStamp(time){
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
          day1 = normalTime(time).y + "-" + normalTime(time).m + "-" + normalTime(time).dd,
          day2 = normalTime(now).y + "-" + normalTime(now).m + "-" + normalTime(now).dd;
        if (day1 === day2) {
          result = normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y === normalTime(now).y) {
          result = normalTime(time).m + "-" + normalTime(time).dd + "  " + normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y !== normalTime(now).y) {
          result = normalTime(time).y + "-" + normalTime(time).m + "-" + normalTime(time).dd + "  " + normalTime(time).h + ":" + normalTime(time).mm;
        }
        return result;
      },
      getTimeStampShowList(element){

        if ((element.time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
          this.beginTimestamp = element.time;
          this.timeStampShowList.push(1);
        } else {
          this.timeStampShowList.push(0);
        }

      },
      getTimeStampShowFlag(msg, index){
        if (msg.type === 'custom') {
          if (JSON.parse(msg.content).type === "notification" && (JSON.parse(msg.content).data.actionType == 3 || JSON.parse(msg.content).data.actionType == 5)) {
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

      sendFile(e){
        const that = this;
        this.msgList.push({
          file: {
            url: window.URL.createObjectURL(e.target.files[0])
          },
          type: "file",
          idClient: "",
          from: this.userData.account,
        });
        console.log(window.URL.createObjectURL(e.target.files[0]));
        this.nim.previewFile({
          type: 'image',
          fileInput: this.$refs.imageSender,
          uploadprogress (obj) {
            that.scrollToBottom();
            that.imageProgress = {
              uploading: true,
              progress: obj.percentageText,
              index: that.msgList.length - 1
            };
            console.log('文件总大小: ' + obj.total + 'bytes');
            console.log('已经上传的大小: ' + obj.loaded + 'bytes');
            console.log('上传进度: ' + obj.percentage);
            console.log('上传进度文本: ' + obj.percentageText);
          },
          done (error, file) {
            console.log('上传image' + (!error ? '成功' : '失败'));
            // show file to the user
            if (!error) {
              let msg = that.nim.sendFile({
                scene: 'p2p',
                to: that.targetData.account,
                file: file,
                needPushNick: false,
                pushContent: `患者<${that.userData.nick}>向您咨询，点击查看详情`,
                pushPayload: JSON.stringify({
                  "account": "0_" + api.getPara().caseId,
                  "type": "1"
                }),
                type: "image",
                done(error, msg){
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
      scrollToBottom(){
        setTimeout(() => {
          document.body.scrollTop = Math.pow(10, 20);
        }, 300)
      },
      //接诊时间倒数
      remainTimeOut(){
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
      refreashOrderTime (count) {
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
                that.lastTimeShow = true;
                store.commit("setLastCount", 3);
                store.commit("setLastTime", 5 * 24 * 60 * 60 * 1000);
                store.commit("lastTimeCount");
                that.sendPayFinish(count);
              }
            }
          }
        })
      },
      retryClick(type){

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
                frequencyType: "2",
                consultationLevel: "1"
              },
              done(data) {
                if (data.responseObject.responseData) {
                  that.nim.sendText({
                    scene: 'p2p',
                    to: "1_doctor00001",
                    text: `${that.$store.state.targetMsg.nick}拒绝了我的咨询，请重新为我匹配对症医生`,
                    done(error, obj) {
                      window.location.href = '/pages/imScene/im_main_scene.html?&caseId=' + api.getPara().caseId + '&patientId=' + api.getPara().patientId + '&customerId=' + api.getPara().patientCustomerId + '&shuntCustomerId=' + that.shuntCustomerId + '&from=health';
                    }
                  });
                }
              }
            });

            break;
        }
      },
      checkFirstBuy(){
        if (localStorage.getItem("sendTips")&&localStorage.getItem("sendTips")==1) {
          this.nim.sendCustomMsg({
            scene: 'p2p',
            to: this.targetData.account,
            needPushNick: false,
            pushContent: `患者<${this.userData.nick}>向您咨询，点击查看详情`,
            pushPayload: JSON.stringify({
              "account": "0_" + api.getPara().caseId,
              "type": "1"
            }),
            content: JSON.stringify({
              type: "notification",
              data: {
                actionType: "1",
                contentDesc: `患者已购买了您的${desc}问诊`,
                subContentDesc: subContentDesc
              }
            }),
            done (error, msg) {
              if (!error) {
                that.sendMessageSuccess(error, msg)
              }
            }
          });
        }
      },
      sendPayFinish(count){
        const that = this;
        let desc = "",
          subContentDesc = "";
        switch (parseInt(count.orderType)) {
          case 0:
            desc = "免费";
            break;
          case 1:
            desc = "普通";
            break;
          case 3:
            desc = "特需";
            break;
          default:
            break;
        }
        if (parseInt(count.orderType) === 0) {
          subContentDesc = '[患者申请免费问诊]';
        } else {
          subContentDesc = `[患者购买问诊]`;
        }
        this.nim.sendCustomMsg({
          scene: 'p2p',
          to: that.targetData.account,
          needPushNick: false,
          pushContent: `患者<${that.userData.nick}>向您咨询，点击查看详情`,
          pushPayload: JSON.stringify({
            "account": "0_" + api.getPara().caseId,
            "type": "1"
          }),
          content: JSON.stringify({
            type: "notification",
            data: {
              actionType: "1",
              contentDesc: `患者已购买了您的${desc}问诊`,
              subContentDesc: subContentDesc
            }
          }),
          done (error, msg) {
            if (!error) {
              that.sendMessageSuccess(error, msg)
            }
          }
        });
      }
    },
    computed: {
      lastTime (){
        return this.$store.state.lastTime;
      },
      lastTimeText(){
        return api.MillisecondToDate(this.$store.state.lastTime);
      },
      lastCount(){
        return this.$store.state.lastCount;
      }
    },
    mounted(){
      this.getUserBaseData();
//      this.checkFirstBuy();
    },
    activated(){
      this.scrollToBottom();
    },
    watch: {
      lastTime (time) {
        if (time <= 0) {
          this.lastTimeShow = false;
          this.bottomTipsShow = true;
          this.showBottomTips(1);

        } else {
          this.lastTimeShow = true;
          this.bottomTipsShow = false;
        }
      },
      lastCount(count){
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
      Loading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  @import "../../../../static/scss/modules/imDoctorStyle";

  .fadeDown-enter-active, .fadeDown-leave-active {
    transition: all ease-in-out .5s
  }

  .fadeDown-enter, .fadeDown-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateY(-50%);
  }

  .fadeUp-enter-active, .fadeUp-leave-active {
    transition: all ease-in-out .5s
  }

  .fadeUp-enter, .fadeUp-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateY(50%);
  }
</style>

