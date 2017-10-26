<template>
  <section class="main-inner ev-fileUpHide">
    <section class="main-message">
      <transition name="fadeDown">
        <article class="main-message-time" v-if="lastTimeShow">
          <p class="residue-time">24小时内免费，剩余时间<span>{{lastTimeText}}</span></p>
          <p class="service-time"><span class="service-time-top">服务时间</span><span class="service-time-bottom">09: 00-22: 00</span></p>
        </article>
      </transition>
      <transition-group name="fadeDown" tag="section">
        <section class="main-message-wrapper" v-for="(msg,index) in msgList" :key="index">
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
          >
          </CheckSuggest>
          <!--文本消息-->
          <ContentText
            v-if="msg.type==='text' && msg.text"
            :contentMessage="msg" :userData="userData"
            :targetData="targetData">
          </ContentText>
          <!--图像消息-->
          <ImageContent
            v-if="msg.type==='file' && msg.file"
            :imageMessage="msg"
            :nim="nim"
            ref="bigImg"
            :imageList="imageList"
            :imageProgress="imageProgress"
            :currentIndex="index"
          >
          </ImageContent>
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
        </section>
        <!--继续问诊去购买时间-->
        <div data-alcode-mod='717' :key="0">
          <section class="main-message-box grey-tips" v-if="consultTipsShow"  :key="0">
          <figcaption data-alcode='e130' class="first-message" @click="getConsultPrice()">
            <p>分诊服务已结束，如需帮助，请选择</p>
            <p class="go-consult"><span>继续问诊</span></p>
          </figcaption>
        </section>
        </div>
      </transition-group>
    </section>
    <transition name="fadeUp">
      <footer class="main-input-box" v-if="inputBoxShow">
        <section class="main-input-box-plus">
          <i class="icon-im-plus"></i>
          <input type="file" v-if="inputFlag" id="ev-file-send" @change="sendFile($event)" ref="imageSender"  accept="image/*" >
        </section>
        <figure class="main-input-box-textarea-inner">
          <textarea class="main-input-box-textarea" rows="1" v-model.trim="sendTextContent" ref="inputTextarea"
                    @click="scrollToBottom" @input="inputLimit"></textarea>
        </figure>
        <p class="main-input-box-send" @click="sendMessage">发送</p>
      </footer>
    </transition>
    <!--支付弹层-->
    <payPopup @paySuccess="toUpLoadTimes"
              :payPopupShow.sync="payPopupShow"
              :payPopupParams = "payPopupDate"
              v-if="payPopupShow">
    </payPopup>
    <loading :show="finish"></loading>
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
  import api from 'common/js/util/util';
  import autosize from 'autosize';
  import store from "../store/store";

  import payPopup from 'components/payLayer';
  import loading from 'components/loading';

  import MedicalReport from './medicalReport';
  import ContentText from "./content"
  import ImageContent from './image';
  import TimeStamp from "./stamp";
  import PreviewSuggestion from './previewSuggestion';
  import CheckSuggest from "./checkSuggest";
  import Triage from "./triage";
  import MiddleTips from "./middleTips";
  import PayFinishTips from "./payFinishTips.vue";

  import WxPayCommon from 'common/js/wxPay/wxComm';
  import nimEnv from 'common/js/nimEnv/nimEnv';
  let nim;
  const XHRList = {
    getToken: "/mcall/im/interact/v1/refreshToken/",
    getMedicalList: "/mcall/customer/patient/case/v1/getMapById/",
    updateMedicalList: "/mcall/customer/patient/case/v1/update/",
    triageAssign: "/mcall/customer/case/consultation/v1/create/",//创建分流
    getTriageId: "/mcall/customer/case/consultation/v1/getMapById/",
    time: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",
    refresh: "/mcall/customer/case/consultation/v1/update/",
    updateCount: "/mcall/customer/case/consultation/v1/updateFrequency/",
    getPrice:'/mcall/customer/traige/v1/getMapById/',//获取分诊医生价格
    updateShunt:'/mcall/customer/case/consultation/v1/createConsultation/',//继续问诊后分流
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
        inputFlag:true,//上传图片input控制
//        firstIn:true,//是否是第一次进来，MutationObserver需要判断，不然每次都执行
        imageList: [],//页面图片数组
        consultationId: "",
        timeStampShowList: [],//时间戳数组
        orderSourceId: "",
        beginTimestamp: 0,
        finish: true,
        lastTimeShow: false,//顶部时间的提示和输入框是否展示
        inputBoxShow: false,//底部是否显示
        consultTipsShow:false,//购买咨询消息是否展示(与lastTimeShow分开，解决刚开始默认展示)
        msgList: [],//消息列表
        //用户数据
        userData: {
          account: "",
          token: ""
        },
        payPopupShow:false,//支付弹窗是否显示
        isClick:false,//立即咨询按钮是否点击
        //聊天目标数据
        targetData: {
          account: "1_doctor00001"
        },
        sendTextContent: ""//文本消息
      }
    },

    methods: {
      //用户连接IM聊天
      connectToNim(){
        const that = this;

        this.nim = NIM.getInstance({

          debug: true,
          appKey: nimEnv(),
          account: this.userData.account,
          token: this.userData.token,
          //连接建立后的回调, 会传入一个对象, 包含登录的信息, 有以下字段
          onconnect (data) {
            console.log('连接成功');
          },
          //同步登录用户名片的回调, 会传入用户名片
          onmyinfo(userData) {
            that.getMessageList();
          },
          onwillreconnect (obj) {
            console.log("已重连" + obj.retryCount + "次，" + obj.duration + "后将重连...")
          },
          //断开连接后的回调
          ondisconnect () {
            console.log("链接已中断...")
          },
          //发生错误的回调, 会传入错误对象
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
          //收到消息的回调, 会传入消息对象
          onmsg (msg) {
            that.scrollToBottom();
            console.log("收到回复消息："+JSON.stringify(msg));
            that.pauseTime(msg);//收到检查检验隐藏顶部框；
            that.msgList.push(msg);


          }
        });

      },
      //收到检查检验隐藏顶部框；
      pauseTime(msg){
        let that = this;
        if (msg.type==='custom' && JSON.parse(msg.content).type==='checkSuggestion') {
          that.lastTimeShow = false;//顶部时间取消
          store.commit("stopLastTimeCount");//时间计时取消
        }
      },
      //获取页面图片消息存到数组里
      getImageList(){
        if (this.$refs.bigImg) {
          this.$refs.bigImg.forEach((element, index) => {
            this.imageList.push(element.imageMessage.file.url);
          });
        }
      },
      //获取用户基本信息
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
      //获取消息列表
      getMessageList () {
        let that = this;
        //获取云端历史记录
        this.nim.getHistoryMsgs({
          scene: 'p2p',
          to: this.targetData.account,//聊天对象, 账号或者群id
          done(error, obj) {
            that.msgList = obj.msgs.reverse();
            console.log("dom更新前")
            that.getTimeStampShowList();
            //循环消息列表，处理需求
            that.loopMessage();
            //需要更改的定位
            that.$nextTick(function(){
//              console.log("dom更新完成")
////              debugger;
//              if (api.getPara().suggest) {
//                console.log("有推荐医生");
//                function callBack () {
//                  if (that.firstIn) {
//                    document.body.scrollTop = that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length-1].offsetTop;
//                    that.firstIn = false;
//                  } else {
//                    return false;
//                  }
//                }
//                let MutationObserver = window.MutationObserver ||
//                  window.WebKitMutationObserver ||
//                  window.MozMutationObserver;
//                if (MutationObserver) {
//                  let mo = new MutationObserver(callBack);
//                  let option = {
//                    'childList': true,
//                    'subtree': true
//                  };
//
//                  mo.observe(document.body, option);
//                } else {
//                  setTimeout(function () {
//                    callBack();
//                  },2000);
//                }
////                alert(that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length].offsetTop);
////                console.log(that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length-1])
//              } else{
//                console.log("无推荐医生")
//                function callBackBottom () {
////                  debugger;
//                  if (that.firstIn) {
//                    document.body.scrollTop = Math.pow(10, 20);
//                    that.firstIn = false;
//                  } else {
//                    return false;
//                  }
//                }
//                let MutationObserver = window.MutationObserver ||
//                  window.WebKitMutationObserver ||
//                  window.MozMutationObserver;
//                if (MutationObserver) {
//                  let mo = new MutationObserver(callBackBottom);
//                  let option = {
//                    'childList': true,
//                    'subtree': true
//                  };
//
//                  mo.observe(document.body, option);
//                } else {
//                  setTimeout(function () {
//                    callBackBottom();
//                  },2000);
//                }
////                document.body.scrollTop = Math.pow(10, 20);
//              }
              that.getImageList();
              //渲染完毕
            });
//            setTimeout(() => {
////              console.log(that.$el.querySelector(".main-message"));
//              if (api.getPara().suggest && that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length-1]) {
////                alert(that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length].offsetTop);
//                document.body.scrollTop = that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length-1].offsetTop;
////                console.log(that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length-1])
//              } else{
//                document.body.scrollTop = Math.pow(10, 20);
//              }
//              that.getImageList();
//              //判断消息列表里面是否有问诊单，没有的话发送一条
////              if (!that.$refs.medicalReport) {
////                that.getMedicalMessage();
////              }
//            }, 600);
          },
          limit: 100,//本次查询的消息数量限制, 最多100条, 默认100条
        });
      },
      //判断消息列表里面是否有结束问诊，没有的话发送一条
      hasMiddleTips () {
        let that = this;
        let msg = that.msgList[that.msgList.length-1];
//        debugger;
        if (msg) {
          if ((msg.type==='custom' && JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType === 5) || !that.consultTipsShow){
            return true;
          } else {
            that.sendConsultState(5);
          }
        }
      },
      //循环消息列表，处理需求
      loopMessage(){
        let that = this;
        let medicalFlag = true;//是否有问诊单；
        for (let i=0;i<that.msgList.length;i++){
//          console.log(i);
          //判断消息列表里面是否有问诊单，没有的话发送一条
          if (that.msgList[i].type==='custom' && JSON.parse(that.msgList[i].content).type==='medicalReport'){
            medicalFlag = false;
          }
          //判断消息列表里面有几条初诊建议，记录在vuex中
          if (that.msgList[i].type==='custom' && JSON.parse(that.msgList[i].content).type==='previewSuggestion'){
            store.commit("addPreviewSuggestionNum");
          }
        }
        //如果没有初诊建议，直接定位到底部
        that.$store.state.previewSuggestionNum || that.scrollToBottom();
        if (medicalFlag){
          that.getMedicalMessage();
        }else {
          //判断消息列表里面是否有结束问诊，没有的话发送一条
          that.hasMiddleTips();
        }
      },
      //获取患者问诊单
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
                    diagnoseConTent: "",
                    isAttachment: dataList[0].patientCasemap.isAttachment,
                    time: dataList[0].patientCasemap.caseTime
                  },
                  type: "medicalReport"  //自定义类型 问诊单
                });
                //判断消息列表里面是否有结束问诊，没有的话发送一条
                that.hasMiddleTips();
              }
            }
          }
        })
      },
      //发送问诊单
      sendMedicalReport(data){
        const that = this;
        this.nim.sendCustomMsg({
          scene: 'p2p',
          to: this.targetData.account,
          content: JSON.stringify(data),
          done(error, msg) {
            that.sendMessageSuccess(error, msg);
          }
        });
        //提示信息
        //分诊台刷新患者
        this.nim.sendCustomMsg({
          scene: 'p2p',
          to: this.targetData.account,
          content: JSON.stringify({
            type: "new-health",
            data: Object.assign({}, data.data, {
              patientId: api.getPara().patientId,
              consultationid: this.orderSourceId,
//              shuntCustomerId: api.getPara().shuntCustomerId
            })
          }),
          done(error, msg) {
            that.sendMessageSuccess(error, msg);
            console.log("新用户提醒发送...");
          }
        })
      },
      //是否有分诊会话记录
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
            consultationType: 0,
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
              that.getLastTime();
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
            customerId: 0,
            patientCustomerId: api.getPara().patientCustomerId,
            patientId: api.getPara().patientId,
            consultationType: 0,//会诊类型0：患者-分诊平台1：患者-医生
            consultationState: 4,//会诊状态-1-待就诊0-沟通中1-已结束2-被退回3-超时接诊退回4-新用户5-释放
            siteId: 17,
            caseType: 0
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              console.log("用户已分流...");
              that.orderSourceId = data.responseObject.responsePk;
              that.getLastTime()
            }
          }
        })
      },
      //获取剩余时间
      getLastTime(){
        const that = this;
        api.ajax({
          url: XHRList.time,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,
//            customerId: api.getPara().shuntCustomerId,
            isValid: 1,
            consultationType: 0,//咨询对象：0-分诊医生，1-专业医生
            firstResult: 0,
            maxResult: 9999
          },
          done(param) {
            that.inputBoxShow = true;
            console.log(param);
            if (param.responseObject.responseStatus) {
              let dataList = param.responseObject.responseData.dataList;
              let time = parseInt(dataList.remainingTime);//responseData.dataList.remainingTime 剩余时间
              store.commit("setConsultation", dataList.consultationId);
              time = time > 24 * 60 * 60 * 1000 ? 24 * 60 * 60 * 1000 : time;
              //consultationFrequency 聊天次数、分诊台不需要
//              if (dataList.consultationFrequency == "-1") {
//                that.lastTimeShow = false;
//                that.inputBoxShow = false;
//                that.consultTipsShow = true;
//              } else {
//                time = 10000;
                if (dataList.consultationState === -2){
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
//              }
            }
          },
          fail(err) {
            console.log(err.message);
          }
        })
      },
      //点击发送消息
      sendMessage(){
        const that = this;
        if (that.sendTextContent === "") {
          return false;
        }
        let sendTextTemp = this.sendTextContent;
        this.sendTextContent = "";
        this.nim.sendText({
          scene: 'p2p',
          to: this.targetData.account,
          text: sendTextTemp,
          done(error, obj) {
            console.log(obj)
            that.sendMessageSuccess(error, obj);
          }
        });
      },
      //消息发送之后成功还是失败的函数
      sendMessageSuccess(error, msg){
        let that = this;
        console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
        this.sendTextContent = "";
        if (!error) {
          this.msgList.push(msg);
        } else {
          //消息发送失败的处理
          that.sendErrorTips(msg);
        }
        setTimeout(() => {
          document.body.scrollTop = Math.pow(10, 20);
        }, 20)
      },
      //聊天记录时间戳处理
      transformTimeStamp(time){
        let format = function (num) {
          return num > 9 ? num : "0" + num;
        };
        let normalTime = function (time) {
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
          day1 = normalTime(time).y + "-" + normalTime(time).m + "-" + normalTime(time).dd,
          day2 = normalTime(now).y + "-" + normalTime(now).m + "-" + normalTime(now).dd;
        if (day1 === day2) {
          result = normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y === normalTime(now).y) {
          result = normalTime(time).m + "月" + normalTime(time).dd + "日  " + normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y !== normalTime(now).y) {
          result = normalTime(time).y + "年" + normalTime(time).m + "月" + normalTime(time).dd + "日  " + normalTime(time).h + ":" + normalTime(time).mm;
        }
        return result;
      },
      //聊天记录时间处理压入是0还是1
      getTimeStampShowList(){
        this.msgList.forEach((element, index) => {
          if ((element.time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
            this.beginTimestamp = element.time;
            this.timeStampShowList.push(1);
          } else {
            this.timeStampShowList.push(0);
          }
        })
      },
      //聊天记录里时间戳是否显示
      getTimeStampShowFlag(msg, index){
        if (msg.type === 'custom') {
          if (JSON.parse(msg.content).type.includes('new-') || JSON.parse(msg.content).type === "payFinishTips" || JSON.parse(msg.content).type === "reTriageTip") {
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
      sendFile(e){
        const that = this;
        that.inputFlag = false;
        this.msgList.push({
          file: {
            url: window.URL.createObjectURL(e.target.files[0]),
          },
          type: "file"
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
            that.inputFlag = true;
            console.log('上传image' + (!error ? '成功' : '失败'));
            // show file to the user
            if (!error) {
              let msg = that.nim.sendFile({
                scene: 'p2p',
                to: that.targetData.account,
                file: file,
                done(error, msg){
                  that.msgList[that.msgList.length - 1] = msg;
                  that.imageList.push(that.$refs.bigImg[that.$refs.bigImg.length-1].imageMessage.file.url);
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
      scrollToBottom(){
        setTimeout(() => {
          //滑动到底部
          document.body.scrollTop = Math.pow(10, 20);
        }, 300)
      },
      //输入框字数限制
      inputLimit(){
        let content = this.sendTextContent;
        if (api.getByteLen(content) > 1000){
          this.sendTextContent=api.getStrByteLen(content);
        }
      },
      //获取咨询价格
      getConsultPrice(){
        const that = this;
        if (that.isClick){
          return false;
        }
        that.isClick=true;
        that.finish = false;
        api.ajax({
          url: XHRList.getPrice,
          method: "POST",
          data: {
            visitSiteId:17,	//string	是	站点
            maxResult:999,
            id:0,
          },
          done(data) {
            if (data.responseObject.responseStatus && data.responseObject.responseData) {
              let price = data.responseObject.responseData.dataList.adviceAmount
//              price = "0";
//              price === "0"?that.refreashOrderTime('free'):that.buyTime(price)
              that.buyTime(price);
            } else {
              console.log("获取分诊医生价格失败")
            }
          }
        })
      },
      //购买时间
      buyTime(price){
        const that = this;
        let flag;
        price === "0"?flag = "false":flag = "true";
//        that.lastTimeShow=true;
//        that.sendConsultState(4);
        let data = {
          patientCustomerId: api.getPara().patientCustomerId, //	string	是	患者所属用户id
          patientId: api.getPara().patientId,         // 	string	是	患者id
//          doctorId: api.getPara().shuntCustomerId,          //	string	是	医生id
          doctorId: 0,          //	string	是	医生id
          orderType: '1',                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
          orderSourceId: this.orderSourceId,     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
          orderSourceType: "1",                //	string	是	来源类型  问诊：1-普通2-特需3-加急 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
          orderAmount: price,                  //	string	否	订单金额  （单位/元 保留两位小数）
          status: '1',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
          body: '咨询',   //   string  否  订单描述 （微信支付展示用）
          isCharge: flag,                    //   string  是  true-收费  false-免费
          caseId: api.getPara().caseId
        };
        WxPayCommon.wxCreateOrder({
          data: data,        //data为Object 参考下面给出格式
          backCreateSuccess(_data){
            //创建订单成功  （手术必选）
            that.refreashOrderTime('free')
          },
          backCreateError(_data){
            //创建订单失败  (必选)
          },
          wxPaySuccess(_data){
            console.log("支付成功")
            that.refreashOrderTime('pay');
            //支付成功回调  (问诊/门诊类型 必选)
          },
          wxPayError(_data){
            that.isClick = false;//是否点击立即咨询重置
            //支付失败回调  (问诊/门诊类型 必选)
          }
        });
      },
      //支付成功后重新分流
      againShunt () {
        let that = this;
        console.log("分流参数："+that.orderSourceId);
        api.ajax({
          url: XHRList.updateShunt,
          method: 'POST',
          data: {
            caseId:api.getPara().caseId,
//            andConsultationId:that.orderSourceId,
            patientId:api.getPara().patientId,
            patientCustomerId:api.getPara().patientCustomerId,
            isShunt:1,//是否分流0-否1-是
          },
          done(data) {
            if (data.responseObject.responseStatus) {
//              that.getLastTime();
              console.log("分流成功");
              that.isClick = false;//是否点击立即咨询重置
              that.finish = true;
            } else {
              console.log("分流失败");
            }
          }
        })
      },
      //重置时间
      refreashOrderTime (type) {
        const that = this;
        let stateStr = type?"5":"";
        api.ajax({
          url: XHRList.updateCount,
          method: "POST",
          data: {
            consultationId: this.orderSourceId,
            frequency: "0",
            frequencyType: "2",
            consultationLevel: "1",
            consultationState:stateStr,
          },
          done(data) {
            if (data.responseObject.responseData) {
//              that.lastTimeShow = true;
//              store.commit("setLastTime", 24 * 60 * 60 * 1000);
//              store.commit("lastTimeCount");
              if(type){
//                that.againShunt();
                if (type === 'pay') {
                  that.sendPayFinish();
                }
              }
              that.getLastTime();
            }
          }
        })
      },
      //更新上传了检查检验
      updateMedical () {
        let that = this;
        api.ajax({
          url: XHRList.updateMedicalList,
          method: 'POST',
          data: {
            caseId:api.getPara().caseId,
            state:1,
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              that.refreashOrderTime();
            }
          }
        })
      },
      toUpLoadTimes(opt) {
        let that = this;
//        debugger
        api.ajax({
          url: XHRList.updateCount,
          method: 'POST',
          data: {
            consultationId: sessionStorage.getItem("orderSourceId"),
            frequency: opt.orderFrequency,
            frequencyType: 2,
            consultationState: -1,
            consultationLevel: opt.orderType
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              that.payPopupShow = false;
              localStorage.setItem("sendTips", JSON.stringify(opt));
              window.location.href = '/dist/imSceneDoctor.html?from=im&caseId=' + api.getPara().caseId + '&doctorCustomerId=' + that.$store.state.targetDoctor.customerId + '&patientCustomerId=' + api.getPara().patientCustomerId + '&patientId=' + api.getPara().patientId;
            }
          }
        })
      },
      //支付成功回调
      sendPayFinish(){
        const that = this;
        this.nim.sendCustomMsg({
          scene: 'p2p',
          to: that.targetData.account,
          content: JSON.stringify({
            type: "payFinishTips"
          }),
          done (error, msg) {
            if (!error) {
              that.sendMessageSuccess(error, msg)
            }
          }
        });
      },
      //发送问诊结束或者开始消息--4开始、5结束
      sendConsultState(num){
        let that = this;
        this.nim.sendCustomMsg({
          scene: 'p2p',
          to: that.targetData.account,
          content: JSON.stringify({
            type: "notification",
            data:{
              actionType:num,
            }
          }),
          type: "custom",
          done (error, msg) {
            if (!error) {
              that.sendMessageSuccess(error, msg)
            }
          }
        });
      },
      //IOS手机微信返回按钮不刷新
      forceRefresh(){
        var nua = navigator.userAgent;
        if (nua.indexOf('iPhone') > -1) {//苹果手机
          window.onload = function () {
            setTimeout(() => {
              window.addEventListener("popstate", function (e) {
                // alert("我监听到了浏览器的返回按钮事件啦");
                self.location = document.referrer;
              });
            }, 500)
          }
        }
      }
    },
    computed: {
      lastTime (){
        return this.$store.state.lastTime;
      },
      lastTimeText(){
        return api.MillisecondToDateNew(this.$store.state.lastTime);
      },
//      payPopupShow(){
//        return this.$store.state.payPopupShow;
//      }
      payPopupDate(){
        return {
          docName: this.$store.state.targetDoctor.nick,
          docId: this.$store.state.targetDoctor.customerId,
          caseId: api.getPara().caseId,
          patientId: api.getPara().patientId,
          patientCustomerId: api.getPara().patientCustomerId,
          from: 'checkSuggest',
          payType: this.$store.state.targetDoctor.payType,
        }
      },
    },
    mounted(){
      let that = this;
//      let _checkOpenId=api.checkOpenId();
      if(!api.checkOpenId()){
        api.wxGetOpenId(1);
      }
      that.getUserBaseData();
      that.triageDoctorAssign();
//      that.forceRefresh();
      localStorage.setItem("PCIMLinks",location.href);

//      let p1 = new Promise(resolve => that.getUserBaseData());
//      let p2 = new Promise(resolve => that.triageDoctorAssign());
//      Promise.all([p1,p2]).then(function () {
//        console.log("页面加载完成");
//      }).catch(function () {
//        console.log("页面加载失败");
//      })
    },
    //组件更新之前的生命钩子
    beforeUpdate(){
//      console.log("组件更新前"+document.querySelector(".main-message-wrapper"))
    },
    //组件更新之后的生命钩子
    updated(){
//      console.log("组件更新后"+document.querySelector(".main-message-wrapper"))
    },
    activated(){
      let that = this;
      if (that.$route.query && that.$route.query.queryType === "triage") {
        that.nim.sendText({
          scene: 'p2p',
          to: that.targetData.account,
          text: "患者已上传视诊资料",
          done(error, obj) {
            that.sendMessageSuccess(error, obj);
          }
        });
      }else if (that.$route.query && that.$route.query.queryType === "checkSuggest"){
        that.updateMedical();
        that.nim.sendText({
          scene: 'p2p',
          to: that.targetData.account,
          text: "患者已上传检查资料",
          done(error, obj) {
            that.sendMessageSuccess(error, obj);
          }
        });
      }
      that.$router.push({
        query: {}
      });
    },
    watch: {
      lastTime: function (time) {
        if (time <= 0) {
          this.lastTimeShow = false;
          this.inputBoxShow = false;
          this.consultTipsShow = true;
          if (this.inputBoxShow = true) {
            this.sendConsultState(5);
          }
        } else {
          this.lastTimeShow = true;
          this.inputBoxShow = true;
          this.consultTipsShow = false;
        }
      },
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
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  @import "../../../../static/scss/modules/imStyle";

  .ev-fileUpHide{
    box-shadow: none !important;
    border: none;
  }
  //问诊开始结束提示样式
  .first-message {
    @include font-dpr(13px);
    color: #AAAAAA;
    background-color: #EDEEEE;
    text-align: center;
    margin: 0 rem(30px);
    padding: rem(15px) rem(26px);
    box-sizing: border-box;
    border-radius: 0.2rem;
    display: inline-block;
  }
  .grey-tips{
    text-align: center;
  }
  //继续问诊样式
  .go-consult{
    text-align: center;
    span{
      color: #26BDB5;
      border-bottom: 1px solid #26BDB5;
      line-height: 1;
      display: inline-block;
    }
  }

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

