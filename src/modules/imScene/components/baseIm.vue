<template>
  <section class="main-inner ev-fileUpHide">
    <transition name="fadeDown">
      <article class="main-message-time">
      <!-- <p class="residue-time">24小时内免费，剩余时间<span>{{lastTimeText}}</span></p>
      <p class="service-time">
        <span class="service-time-top">服务时间</span>
        <span class="service-time-bottom">09: 00-22: 00</span>
      </p> -->
      <p class="new-service-time">服务时间：{{serviceTime}}</p>
    </article>
    </transition>
    <section @scroll="deleteMsgIndex = -1" class="main-message" ref="wrapper"
             :class="{'padding-top':lastTimeShow,'padding-bottom':inputBoxShow,'input-flag':footerBottomFlag}">
      <transition-group name="fadeDown" tag="section" style="z-index: 0;">
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
            v-if="(msg.type==='file' || msg.type==='image') && msg.file && msg.file.ext!=='pdf'"
            :imageMessage="msg"
            :nim="nim"
            ref="bigImg"
            :userData="userData"
            :targetData="targetData"
            :imageList="imageList"
            :imageProgress="imageProgress[index]"
            @deleteMsgEvent="deleteMsgEvent(msg)"
            @longTouchEmitHandler="deleteMsgIndex=index"
            :currentIndex="index"
            :deleteMsgIndex="deleteMsgIndex"
          >

          </ImageContent>
          <!--文件消息-->
          <FileMessage
            v-if="msg.type==='file'&&msg.file&&msg.file.ext==='pdf'"
            :fileMessage="msg"
            :userData="userData"
            :targetData="targetData"
            :fileProgress="fileProgress[index]"
            @deleteMsgEvent="deleteMsgEvent(msg)"
            @longTouchEmitHandler="deleteMsgIndex=index"
            :currentIndex="index"
            :deleteMsgIndex="deleteMsgIndex"
          >
          </FileMessage>
          <!-- 图集消息 -->
          <MulitpleImage
            v-if="msg.type==='custom' && (JSON.parse(msg.content).type === 'mulitpleImage'||JSON.parse(msg.content).type ==='multipleImage' )"
            :imageMessage="msg"
            :userData="userData"
            :targetData="targetData"
            @deleteMsgEvent="deleteMsgEvent(msg)"
            @longTouchEmitHandler="deleteMsgIndex=index"
            :currentIndex="index"
            :deleteMsgIndex="deleteMsgIndex"
          >

          </MulitpleImage>
          <!-- 视频消息 -->
          <VideoMessage
            v-if="msg.type==='video' && msg.file"
            :videoMessage="msg"
            :userData="userData"
            :targetData="targetData"
            :videoProgress="videoProgress[index]"
            @deleteMsgEvent="deleteMsgEvent(msg)"
            @longTouchEmitHandler="deleteMsgIndex=index"
            :currentIndex="index"
            :deleteMsgIndex="deleteMsgIndex"
          ></VideoMessage>
          <!--音频-->
          <AudioMessage v-if="msg.type==='audio'" :audioMessage="msg">
          </AudioMessage>
          <!--上传视诊-->
          <section class="main-message-box"
                   v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'triageSendTips'"
          >
            <article
              class="main-message-box-item my-message"
              :data-clientid="msg.idClient"
            >
              <i class="fail-button" style="display:none">
                <img src="../../../common/image/imScene/error_tips.png" alt="">
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
                <img src="../../../common/image/imScene/error_tips.png" alt="">
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
          <!-- <MiddleTips
            v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 4"
            :tipsType="4"
          > -->

          </MiddleTips>
          <!--问诊结束-->
          <MiddleTips
            v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 5"
            :tipsType="5"
          >
          </MiddleTips>
          <!--拒绝问诊-->
          <MiddleTips
            v-if="msg.type==='custom' && JSON.parse(msg.content).type === 'refusePatient'"
            :tipsType="6"
            :tipsText="JSON.parse(msg.content).text"
          >
          </MiddleTips>
          </MiddleTips>
          <!--消息撤回提示-->
          <div :key="0">
            <section class="main-message-box grey-tips" v-if="showFlagDeleteTips(msg)" :key="0">
              <figcaption class="first-message">
                <p>{{msg.from==="1_doctor00001"?"分诊医生":"您"}}撤回了一条消息</p>
              </figcaption>
            </section>
          </div>
        </section>
        <!--继续问诊去购买时间-->
        <!-- <div data-alcode-mod='717' :key="0">
          <section class="main-message-box grey-tips" v-if="consultTipsShow" :key="0">
            <figcaption data-alcode='e130' class="first-message" @click="getConsultPrice()">
              <p>分诊服务已结束，如需帮助，请选择</p>
              <p class="go-consult"><span>继续问诊</span></p>
            </figcaption>
          </section>
        </div> -->

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
        <section class="footer-box-top">
          <section class="main-input-box-plus" @click='footerBottomFlag = footerBottomFlag?false:true'>
            <i class="icon-im-plus"></i>
          </section>
          <figure class="main-input-box-textarea-inner">
            <section class="area-content">
              <pre><span>{{sendTextContent}}<br></span></pre>
              <textarea class="main-input-box-textarea"
                        rows="1"
                        v-model="sendTextContent"
                        ref="inputTextarea"
                        @focus="focusFn()"
                        @blur="blurFn()"
                        @click="scrollToBottom"
                        @input="inputLimit">
              </textarea>
            </section>

            <!-- <textarea class="main-input-box-textarea"  rows="1" v-model="sendTextContent" ></textarea> -->
            <p class="main-input-box-send" :class="{'on':textLength.length}" @click="sendMessage()">发送</p>
          </figure>
        </section>
        <ul class="footer-box-bottom" v-if="footerBottomFlag">
          <li class="bottom-item" v-if="$store.state.toolbarConfig.image">
            <figure class="bottom-item-content">
              <img class="bottom-item-image" src="../../../common/image/imScene/picture@2x.png" width="350"
                   height="234"/>
              <figcaption class="bottom-item-description">图片</figcaption>
            </figure>
            <input type="file" v-if="isIos&&inputImageFlag" @change="sendImage($event)" ref="imageSender"
                   accept="image/*" multiple>
            <input type="file" v-if="!isIos&&!isWeChat&&inputImageFlag" @change="sendImage($event)" ref="imageSender"
                   accept="image/*" multiple>
            <input type="file" v-if="!isIos&&isWeChat&&inputImageFlag" @change="sendImage($event)" ref="imageSender"
                   accept="image/*" multiple capture="camera">
          </li>
          <li class="bottom-item" v-if="$store.state.toolbarConfig.video">
            <figure class="bottom-item-content">
              <img class="bottom-item-image" src="../../../common/image/imScene/pictures@2x.png" width="350"
                   height="234"/>
              <figcaption class="bottom-item-description">视频</figcaption>
            </figure>
            <input type="file" v-if="isIos&&inputVideoFlag" @change="sendVideo($event)" ref="videoSender"
                   accept="video/*">
            <input type="file" v-if="!isIos&&!isWeChat&&inputVideoFlag" @change="sendVideo($event)" ref="videoSender"
                   multiple accept="video/*">
            <input type="file" v-if="!isIos&&isWeChat&&inputVideoFlag" @change="sendVideo($event)" ref="videoSender"
                   multiple accept="video/*" capture="camcorder">
          </li>
          <li class="bottom-item" v-if="$store.state.toolbarConfig.file">
            <figure class="bottom-item-content">
              <img class="bottom-item-image" src="../../../common/image/imScene/file@2x.png" width="350" height="234"/>
              <figcaption class="bottom-item-description">文件</figcaption>
            </figure>
            <input type="file" v-if="isIos&&inputPdfFlag" multiple @change="sendPdf($event)" ref="pdfSender"
                   accept="application/*">
            <input type="file" v-if="!isIos&&isWeChat&&inputPdfFlag" multiple @change="sendPdf($event)" ref="pdfSender"
                   accept="">
            <input type="file" v-if="!isIos&& !isWeChat&&inputPdfFlag" multiple @change="sendPdf($event)" ref="pdfSender"
                   accept="application/*">
          </li>
        </ul>
      </footer>
    </transition>
    <confirm :confirmParams="{
        'ensure':'支付成功',
        'cancel':'支付失败',
        'title':'请确认微信支付是否已经完成'
        }" v-if="noWXPayShow" @cancelClickEvent="noWXPayShow = false;isClick = false;localStorage.removeItem('payOk');"
             @ensureClickEvent="viewPayResult()">
    </confirm>
    <confirm :confirmParams="{
      'ensure':'取消',
      'cancel':'离开',
      'title':'您的信息正在发送中',
      'content':'现在离开还需重新发送',
      }" v-if="isLeave"
             @cancelClickEvent="goFeedback()"
             @ensureClickEvent="isLeave =false;"
    >
    </confirm>
    <loading v-show="finish"></loading>
    <transition name="fade">
      <Toast :content="toastTips" v-if="toastShow"></Toast>
    </transition>
    <transition name="fade">
      <ensure
        :ensureParams="{
          'content':'抱歉，经平台审核，您的咨询不在该医生的接诊范围，请咨询其他匹配医生',
          'ensure':'好的'
        }" v-if="ensureShow" @ensureClickEvent="ensureClickEvent"
      ></ensure>
    </transition>
    <suggestion :customerId="patientCustomerId" :triageCustomerId="cId" :leaveFlag='leaveFlag' :isLeave.sync="isLeave"></suggestion>
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
  import store from "../store/store";
  import net from "common/js/util/net";

  import payPopup from "components/payLayer";
  import loading from "components/loading";
  import confirm from "components/confirm";
  import suggestion from "components/suggestion";
  import siteSwitch from "common/js/siteSwitch/siteSwitch";
  import Toast from "components/toast";
  import ensure from "components/ensure";

  import MedicalReport from "./medicalReport";
  import ContentText from "./content";
  import ImageContent from "./image";
  import AudioMessage from "./audioMessage";
  import VideoMessage from "./video";
  import TimeStamp from "./stamp";
  import PreviewSuggestion from "./previewSuggestion";
  import CheckSuggest from "./checkSuggest";
  import Triage from "./triage";
  import MiddleTips from "./middleTips";
  import PayFinishTips from "./payFinishTips.vue";
  import MulitpleImage from "./mulitpleImage";
  import FileMessage from "./fileMessage";

  import WxPayCommon from "common/js/wxPay/wxComm";
  import nimEnv from "common/js/nimEnv/nimEnv";

  import BScroll from "better-scroll";

  import DeleteMsg from "common/js/IM_BaseMethod/deleteMsg";
  import DeleteMsgTips from "common/js/IM_BaseMethod/deleteMsgAfterTips.js";

  import getFileType from "common/js/util/getFileType.js";

  import "babel-polyfill";
  import TouchmoveDirection from "common/js/touchmoveDirection/touchmoveDirection"

  let nim;

  let _weChat = false;
  siteSwitch.weChatJudge(() => {
    _weChat = true;
  }, () => {
    _weChat = false;
  });

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
        patientData:{}, // 患者数据
        serviceTime: "", // 服务时间
        isIos: navigator.userAgent.toLowerCase().includes("iphone"),
        isWeChat: _weChat,
        nim: {},
        // 图片发送进度
        imageProgress: {},
        // 视频发送进度
        videoProgress: {},
        allMsgsGot: false,
        // 文件pdf发送进度
        fileProgress: {},
        patientCustomerId: localStorage.getItem("userId"),
        imageLastIndex: 0, //上传图片最后一张记录在数组中的位置
        videoLastIndex: 0, //上传视频最后一个记录在数组中的位置
        fileLastIndex: 0,//上传pdf 最后一个记录在数组中的位置
        mulitpleLastIndex: 0,//多图上传最后一个记录在数组中的位置
        footerBottomFlag: false, // 底部文件选择框是否显示
        noWXPayShow: false,
        onFocus: false,
        inputImageFlag: true, //上传图片input控制
        inputVideoFlag: true, //上传视频input控制
        inputPdfFlag: true,//上传pdf文件控制
        progressNum: 0,// 正在上传的个数
        imageList: [], //页面图片数组
        consultationId: "",
        timeStampShowList: [], //时间戳数组
        orderSourceId: "",
        beginTimestamp: 0,
        historyBeginTime: 0,
        // finish: true,
        finishNum: 0, // 用来计算 loading 是否显示
        lastTimeShow: false, //顶部时间的提示和输入框是否展示
        inputBoxShow: false, //底部是否显示
        consultTipsShow: false, //购买咨询消息是否展示(与lastTimeShow分开，解决刚开始默认展示)
        msgList: [], //消息列表
        // 用户数据
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
        cId: 0, //聊天消息拓展字段的customerId
        footerPosition: "main-input-box",
        bfscrolltop: document.body.scrollTop,
        // toastTips: "",
        // toastShow: false,
        deleteMsgIndex: -1,
        mList: [],
        isLeave: false,
      };
    },

    methods: {
      // 去意见反馈；
      goFeedback() {
        // location.href = `/dist/feedback.html?from=im&customerId=${this.patientCustomerId}`;
        g_sps.jump(null, `/dist/feedback.html?from=im&customerId=${this.patientCustomerId}`);
      },
      // 控制 vuex toast控制
      toastControl(message) {
        store.commit("setToastTips", message);
        store.commit('setToastShow');
      },
      // 取消ensure框
      ensureClickEvent() {
        this.$store.commit("setEnsureShow", false);
      },
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
          this.interval = setTimeout(function () {
            document.body.scrollTop = document.body.scrollHeight; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
          }, 200);
        }


        this.onFocus = true;
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
      },
      //用户连接IM聊天
      connectToNim() {
        const that = this;
        nimEnv().then(nimEnv => {
          this.nim = NIM.getInstance({
            debug: !!localStorage.getItem("imDebugOpen"),
            appKey: nimEnv,
            account: this.userData.account,
            token: this.userData.token,
            //连接建立后的回调, 会传入一个对象, 包含登录的信息, 有以下字段
            onconnect(data) {
              console.log("连接成功");
            },
            //同步登录用户名片的回调, 会传入用户名片
            onmyinfo(userData) {
              store.commit("setHistoryStatus", "history");
              that.getMessageList("history");
              that.getMedicalMessageHistory();
              that.finishNum --;
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
              console.log(msg);
              if (msg.from === that.targetData.account) {
                store.commit("setHistoryStatus", "history");
                console.log("收到回复消息：" + JSON.stringify(msg));
                // that.pauseTime(msg); //收到检查检验隐藏顶部框；
                that.hideInput(msg); // 患者端收到拒绝问诊隐藏输入框或者分诊完成；
                that.msgList.push(msg);
                that.$nextTick(function () {
                  that.scrollToBottom();
                });
                that.getCId(msg);//每次收到消息更新cId(分诊台医生id);
                // 判断如果是图片，则把加入到图片数组中
                if (msg.type == "image") {
                  let qualityUrl = that.nim.viewImageQuality({
                    url: msg.file.url,
                    quality: 40
                  });
                  if (that.imageList.indexOf(qualityUrl) == -1) {
                    that.imageList.push(qualityUrl);
                  }
                }
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

      // 患者端收到拒绝问诊隐藏输入框
      hideInput(msg) {
        if (msg.type === "custom" && JSON.parse(msg.content).type === "refusePatient") {
          this.inputBoxShow = false; //输入框取消
          store.commit("setconsultationState", 7);
        }
        if (msg.type === "custom" && JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 5) {
          this.inputBoxShow = false; //输入框取消
          store.commit("setconsultationState", 8);
        }
      },

      //获取页面图片消息存到数组里
      getImageList() {
        if (this.$refs.bigImg) {
          this.$refs.bigImg.forEach((element, index) => {
            if (this.imageList.indexOf(element.imageMessage.file.url) == -1) {
              this.imageList.push(element.imageMessage.file.url);
            }
          });
        }
      },
      //获取用户基本信息
      getUserBaseData() {
        const that = this;
        this.finishNum ++;
        api.ajaxNoLoading({
          url: XHRList.getToken,
          method: "POST",
          data: {
            accid: "0_" + api.getPara().caseId,
            patientName: api.getPara().patientId
          },
          beforeSend: function () {
            // this.finish = true;
          },
          done(param) {
            if (param.responseObject.responseStatus) {
              that.userData = {
                account: "0_" + api.getPara().caseId,
                token: param.responseObject.responseData.token
              };
            }

            that.connectToNim();
            // that.finish = false;
          },
          fail(err) {
            console.log(err.message);
          }
        });
      },
      // 判断是否有问诊单，发送问诊单
      getMedicalMessageHistory () {
        const that = this;
        // this.finish = true;
        this.finishNum ++;
        this.nim.getHistoryMsgs({
          scene: "p2p",
          beginTime: 0,
          reverse: true, //默认false表示从endTime开始往前查找历史消息;true表示从beginTime开始往后查找历史消息
          to: this.targetData.account, //聊天对象, 账号或者群id
          done(error, obj) {
            // that.finish = false;
            that.finishNum --;
            if (obj.msgs.length === 0) {
              return that.getMedicalMessage();
            }
            let medicalFlag = false; //是否有问诊单；
            for (let i = 0; i < obj.msgs.length; i++) {
              //判断消息列表里面有几条初诊建议，记录在vuex中
              if (obj.msgs[i].type === "custom" && JSON.parse(obj.msgs[i].content).type === "medicalReport") {
                medicalFlag = true;
                return;
              }
            }
            if (!medicalFlag) {
              return that.getMedicalMessage();
            }
          },
          limit: 20 //本次查询的消息数量限制, 最多100条, 默认100条
        });
      },
      //获取消息列表
      getMessageList(type) {
        let that = this;
        //获取云端历史记录
        // this.finish = true;
        this.finishNum ++;
        this.nim.getHistoryMsgs({
          scene: "p2p",
          beginTime: 0,
          endTime: that.historyBeginTime,
          to: this.targetData.account, //聊天对象, 账号或者群id
          done(error, obj) {
            that.finishNum --;
            if (type === "scrollInit" && obj.msgs.length === 0) {
              that.toastControl(`没有更多消息了`);
              that.allMsgsGot = true;
            } else {
              obj.msgs.forEach((element, index) => {
                if (index == obj.msgs.length - 1) {
                  that.historyBeginTime = element.time
                }
                that.msgList.unshift(element);
              });
              console.log("dom更新前");
              that.getTimeStampShowList();
              // 判断是否需要发送推荐医生
              that.sendSuggestDoctor();
              //需要更改的定位
              that.$nextTick(() => {
                //循环消息列表，处理需求
                that.loopMessage(type);
                that.getImageList();
                //渲染完毕
              });
            }
            // that.finish = false;
          },
          limit: 20 //本次查询的消息数量限制, 最多100条, 默认100条
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
              JSON.parse(msg.content).data.actionType === 5)
          ) {
            return true;
          } else {
            that.sendConsultState(5);
          }
        }
      },
      //循环消息列表，处理需求
      loopMessage(type) {
        let that = this;
        let medicalFlag = true; //是否有问诊单；
        for (let i = 0; i < that.msgList.length; i++) {
          //判断消息列表里面有几条初诊建议，记录在vuex中
          if (that.msgList[i].type === "custom" && JSON.parse(that.msgList[i].content).type === "previewSuggestion") {
            store.commit("addPreviewSuggestionNum");
          }
        }
        //如果没有初诊建议，直接定位到底部
        if (type === "history") {
          that.$store.state.previewSuggestionNum || that.scrollToBottom();
        }
      },
      // 设置多媒体进度
      setMediaProgress(msg, index) {
        switch (msg.type) {
          case "image":

            this.imageProgress[index] = {
              uploading: false,
              progress: "0%",
              index: 0
            }
          case "file":
            this.fileProgress[index] = {
              uploading: false,
              progress: "0%",
              index: 0
            }
          case "video":
            this.videoProgress[index] = {
              uploading: false,
              progress: "0%",
              index: 0
            }
        }
      },
      // 获取患者数据
      getPationtData () {
        const that = this;
        api.ajaxNoLoading({
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
                that.patientData =  {
                    caseId: api.getPara().caseId, //问诊单 病例ID
                    patientName: dataList[0].patientCasemap.patientName, //患者姓名
                    sexName: dataList[0].patientCasemap.sexName, //患者性别
                    age: dataList[0].patientCasemap.age, //患者年龄
                    createDate: new Date().getTime(),
                    diagnoseConTent: "",
                    isAttachment: dataList[0].patientCasemap.isAttachment,
                    time: dataList[0].patientCasemap.caseTime
                };
                store.commit("setLogoUrl", that.patientData)
              }
            }
          }
        });
      },
      //获取患者问诊单
      getMedicalMessage() {
        const that = this;
        api.ajaxNoLoading({
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
                // that.hasMiddleTips();
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
        api.ajaxNoLoading({
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
        api.ajaxNoLoading({
          url: XHRList.triageAssign,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,
            customerId: 0,
            patientCustomerId: that.patientCustomerId,
            patientId: api.getPara().patientId,
            consultationType: 0, //会诊类型0：患者-分诊平台1：患者-医生
            consultationState: 4, //会诊状态-1-待就诊0-沟通中1-已结束2-被退回3-超时接诊退回4-新用户5-释放
            siteId: api.getSiteId(),
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
      // 更新状态
      refreshState(state) {
        const that = this;
        api.ajaxNoLoading({
          url: XHRList.refresh,
          method: "POST",
          data: {
            consultationId: that.orderSourceId,
            consultationState: state //会诊状态-1-待就诊0-沟通中1-已结束2-被退回(拒绝接诊)3-超时接诊退回4-新用户5-释放6-已上传资料7-分诊拒绝8-分诊完成9-待检查10-已推荐11-超时未回复
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              console.log("状态更新成功" + state);
            } else {
              console.log("状态更新失败" + data);
            }
          }
        });
      },
      // 另个一个更新状态
      refreshStateOther(state) {
        const that = this;
        api.ajaxNoLoading({
          url: XHRList.refresh,
          method: "POST",
          data: {
            consultationIds: that.orderSourceId,
            consultationState: state //会诊状态-1-待就诊0-沟通中1-已结束2-被退回(拒绝接诊)3-超时接诊退回4-新用户5-释放6-已上传资料7-分诊拒绝8-分诊完成9-待检查10-已推荐11-超时未回复
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              console.log("状态更新成功" + state);
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
        const _DeleteTimeLimit = `${parseInt(this.$store.state.toolbarConfig.deleteTime) / 60}分钟`;
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
                    mType: "37",
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
                      that.checkMsg(msg);//检查撤回的消息；
                      that.sendMessageSuccess(tipsError, tipsMsg);
                    }
                  }
                });
              }, 20);
            } else {
              if (parseInt(error.code) === 508) {
                // that.toastTips = `您只能撤回${_DeleteTimeLimit}内的消息`;
                // that.toastShow = true;
                // setTimeout(() => {
                //   that.toastShow = false;
                // }, 2000);
                that.toastControl(`您只能撤回${_DeleteTimeLimit}内的消息`);
              }
            }
          }
        });
      },
      // 检查撤回的消息
      checkMsg(msg) {
        if (JSON.parse(msg.custom).mType == 1) {
          console.log(msg);
          let _imageUrl = msg.file.url;
          this.imageList.forEach((element, index) => {
            if (element === _imageUrl) {
              this.imageList.removeByValue(element);
              return;
            }
          });
        }
      },
      //获取剩余时间
      getLastTime() {
        const that = this;
        api.ajaxNoLoading({
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
            // that.inputBoxShow = true;
            console.log(param);
            if (param.responseObject.responseStatus) {
              let dataList = param.responseObject.responseData.dataList;
              that.cId = dataList.customerId;
              // let time = parseInt(dataList.remainingTime); //responseData.dataList.remainingTime 剩余时间
              store.commit("setConsultation", dataList.consultationId);
              store.commit("setconsultationState", dataList.consultationState);
              // time = time > 24 * 60 * 60 * 1000 ? 24 * 60 * 60 * 1000 : time;
              // if (dataList.consultationState === -2) {
              //   that.lastTimeShow = false;
              //   that.inputBoxShow = true;
              //   that.consultTipsShow = false;
              // } else {
              //   if (time > 0) {
              //     store.commit("setLastTime", time);
              //     store.commit("lastTimeCount");
              //     that.lastTimeShow = true;
              //     that.inputBoxShow = true;
              //     that.consultTipsShow = false;
              //   } else {
              //     that.lastTimeShow = false;
              //     that.inputBoxShow = false;
              //     that.consultTipsShow = true;
              //   }
              // }
              console.log(that.inputBoxShow);
              switch (dataList.consultationState) {//	会诊状态-1-待就诊0-沟通中1-已结束2-被退回(拒绝接诊)3-超时接诊退回4-新用户5-释放6-已上传资料7-分诊拒绝8-分诊完成9-待检查10-已推荐11-超时未回复
                case 1:
                case 7:
                case 8:
                  break;
                case -1:
                case 0:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 9:
                case 10:
                case 11:
                  that.inputBoxShow = true
                  break;
              }
              console.log(that.inputBoxShow);

              // if (
              //   (dataList.consultationState == 0 ||
              //     dataList.consultationState == 4 ||
              //     dataList.consultationState == 5) &&
              //   time <= 0
              // ) {
              //   that.refreshState();
              // }
            }
          },
          fail(err) {
            console.log(err.message);
          }
        });
      },
      //点击发送消息
      sendMessage() {
        const that = this;
        that.sendTextContent = that.textLength;
        if (that.sendTextContent === "") {
          return false;
        }
        let sendTextTemp = this.sendTextContent;
        this.sendTextContent = "";
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
        if (!(msg.type === "custom" && JSON.parse(msg.content).type === "deleteMsgTips")) {
          this.sendTextContent = "";
        }
        if ((msg.time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
          this.beginTimestamp = msg.time;
          this.timeStampShowList.push(1);
        } else {
          this.timeStampShowList.push(0);
        }
        if (!error) {
          this.msgList.push(msg);
          if (navigator.userAgent.toLowerCase().includes("11")) {
            this.scrollToBottom();
          } else {
            this.scrollToBottom();
            document.body.scrollTop = document.body.scrollHeight; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
          }
        } else {
          //消息发送失败的处理
          that.sendErrorTips(msg);
        }
      },
      //聊天记录时间戳处理
      transformTimeStamp(time) {
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
        this.beginTimestamp = 0;
        this.timeStampShowList = [];
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
        if (!msg.time) {
          return false;
        }
        if (msg.type === "custom") {
          if (
            JSON.parse(msg.content).type.includes("new-") ||
            JSON.parse(msg.content).type === "payFinishTips" ||
            JSON.parse(msg.content).type === "triagePatientTips" ||
            JSON.parse(msg.content).type === "reTriageTip" ||
            JSON.parse(msg.content).type === "refusePatient" ||
            JSON.parse(msg.content).type === "overtimeTip" ||
            JSON.parse(msg.content).type === "chatOvertimeTip" ||
            (JSON.parse(msg.content).type === 'notification' && JSON.parse(msg.content).data.actionType == 3)
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
      // 替换的索引
      replaceIndex(type) {
        let indexTemp
        this.msgList.map((item, index) => {
          if (item.replace && item.replace == type) {
            indexTemp = index;
            return;
          }
        });
        return indexTemp;
      },
      //上传文件
      sendImage(e) {
        const that = this;
        console.log(e.target.files);
        that.inputImageFlag = false;
        this.$nextTick(() => {
          that.inputImageFlag = true;
        })
        if (e.target.files.length > 1) {
          if (e.target.files.length > 9) {
            this.toastControl("您最多只能选择9张图片");
            this.getMulitpleImage(Array.from(e.target.files).slice(0, 9));
          } else {
            this.getMulitpleImage(e.target.files);
          }
        } else {
          let _file = e.target.files[0];
          console.log(_file);
          console.log(window.URL.createObjectURL(_file));
          if (_file.type.includes("image")) {
            this.sendImageFile(_file);
          } else {
            // that.toastTips = `请选择图片`;
            // that.toastShow = true;
            // setTimeout(() => {
            //   that.toastShow = false;
            // }, 2000);
            this.toastControl("请选择图片");
          }
        }
      },
      getMulitpleImage(list) {
        let mList = [];
        const that = this;
        console.log(list);
        let promises = [];
        let _ele = {
          type: "custom",
          content: JSON.stringify({
            type: "multipleImage",
            data: {
              list: []
            }
          }),
          loading: true,
          from: this.userData.account,
          replace: "multiple",
        }
        that.msgList.push(_ele);
        that.progressNum++;
        that.scrollToBottom();
        that.mulitpleLastIndex = that.msgList.length - 1;
        Array.from(list).forEach((element, index) => {
          promises.push(
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(element);
              reader.onload = oFREvent => {
                that.nim.previewFile({
                  type: "image",
                  dataURL: oFREvent.target.result,
                  uploadprogress(obj) {
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
                      // that.mList.push(file);
                      resolve(file);
                    }
                  }
                });
              };
            })
          );
        });
        console.log(promises);
        Promise.all(promises).then(result => {
          console.log(result);
          this.sendMulitpleImage(result, _ele);
        });
      },
      // 发送多图文件
      sendMulitpleImage(list, _ele) {
        const that = this;
        this.nim.sendCustomMsg({
          scene: "p2p",
          to: that.targetData.account,
          custom: JSON.stringify({
            cType: "0",
            cId: that.cId,
            mType: "38",
            conId: that.orderSourceId
          }),
          content: JSON.stringify({
            type: "multipleImage",
            data: {
              list
            }
          }),
          done(error, msg) {
            if (!error) {
              console.log(msg);
              that.progressNum--;
              // that.msgList.map( (item,index) => {
              //   if (item.replace && item.replace == 'multiple') {
              //     that.mulitpleLastIndex = index;
              //     return;
              //   }
              // });
              // console.log(that.replaceIndex('multiple'));
              // that.msgList[that.replaceIndex('multiple')] = msg;
              that.msgList[that.msgList.indexOf(_ele)] = msg;
              that.scrollToBottom();
            }
          }
        });
      },
      // 上传图片文件
      sendImageFile(_file) {
        const that = this;
        let _ele = {
          file: {
            url: window.URL.createObjectURL(_file)
          },
          type: "image",
          from: that.userData.account,
          replace: 'image',
          loading: true,
        }
        this.msgList.push(_ele);
        that.progressNum++;
        this.$nextTick(() => {
          that.scrollToBottom();
        })
        that.imageLastIndex = that.msgList.length - 1;
        console.log(window.URL.createObjectURL(_file));
        this.nim.previewFile({
          type: "image",
          fileInput: this.$refs.imageSender,
          uploadprogress(obj) {
            // that.scrollToBottom();
            // that.imageProgress = {
            //   uploading: true,
            //   progress: obj.percentageText,
            //   index: that.imageLastIndex
            // };
            let indexflag = that.msgList.indexOf(_ele);
            that.$set(that.imageProgress, indexflag, {
              uploading: true,
              progress: obj.percentageText,
              index: indexflag
            })

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
                type: "image",
                done(error, msg) {
                  // that.msgList[that.imageLastIndex] = msg;
                  let numFlag = that.msgList.indexOf(_ele);
                  that.msgList[numFlag] = msg;
                  that.progressNum--;
                  that.$set(that.imageProgress, numFlag, {
                    uploading: false,
                    progress: "0%",
                    index: 0,
                  })
                  that.scrollToBottom();
                  // 老版本的imageList push
                  // that.imageList.push(
                  //   that.$refs.bigImg[that.$refs.bigImg.length - 1].imageMessage
                  //     .file.url
                  // );
                  // 新版本的imageList push
                  that.imageList.push(msg.file.url);

                  // that.imageProgress = {
                  //   uploading: false,
                  //   progress: "0%",
                  //   index: 0
                  // };
                }
              });
            } else {
              console.log(error);
            }
          }
        });
      },
      // 选择视频
      sendVideo(e) {
        if (e.target.files.length > 1) {
          this.toastControl("每次只能上传一个视频");
        }
        this.inputVideoFlag = false;
        this.$nextTick(() => {
          this.inputVideoFlag = true;
        })
        let _file = e.target.files[0];
        if (_file.size >= 104857600) {
          this.toastControl("视频最大为100M");
          return;
        }
        console.log(_file.type);
        if (_file.type.includes("video") && (/mp4/.test(_file.type) || /mov/.test(_file.type) || /quicktime/.test(_file.type))) {
          this.sendVideoFile(_file);
        } else if (_file.type.includes("video")) {
          this.toastControl("请选择mp4或mov文件");
        } else {
          this.toastControl("请选择视频文件");
        }
      },
      // 上传视频文件
      sendVideoFile(_file) {
        const that = this;
        console.log(_file);
        let _ele = {
          file: {
            url: window.URL.createObjectURL(_file)
          },
          type: "video",
          loading: true,
          from: that.userData.account,
          replace: 'video',
        }
        this.msgList.push(_ele);
        that.progressNum++;
        that.scrollToBottom();
        this.nim.previewFile({
          type: "video",
          fileInput: this.$refs.videoSender,
          uploadprogress(obj) {
            // that.scrollToBottom();
            // that.videoProgress[that.msgList.indexOf(_ele)] = {
            //   uploading: true,
            //   progress: obj.percentageText,
            //   index: that.videoLastIndex
            // };
            let indexflag = that.msgList.indexOf(_ele)
            that.$set(that.videoProgress, indexflag, {
              uploading: true,
              progress: obj.percentageText,
              index: indexflag
            })
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
                  cType: "0",
                  cId: that.cId,
                  mType: "3",
                  conId: that.orderSourceId
                }),
                to: that.targetData.account,
                file: file,
                type: "video",
                done(error, msg) {
                  that.progressNum--;
                  let numFlag = that.msgList.indexOf(_ele);
                  that.$set(that.videoProgress, numFlag, {
                    uploading: false,
                    progress: "0%",
                    index: 0,
                  })
                  that.msgList[numFlag] = msg;
                  // that.msgList.map( (item,index) => {
                  //   if (item.replace && item.replace == 'video') {
                  //     that.videoLastIndex = index;
                  //     return;
                  //   }
                  // });
                  // that.msgList[that.replaceIndex('video')] = msg;
                  that.scrollToBottom();
                  // that.videoProgress = {
                  //   uploading: false,
                  //   progress: "0%",
                  //   index: 0
                  // };
                  // that.imageList.push(msg.file.url);
                }
              });
            } else {
              console.log(error);
            }
          }
        });
      },
      // 选择pdf
      sendPdf(e) {
        this.inputPdfFlag = false;
        this.$nextTick(() => {
          this.inputPdfFlag = true;
        });
        let _file = e.target.files[0];
        if (_file.type.length === 0) {
          getFileType(_file).then((flag) => {
            if (flag) {
              this.sendPdfFile(_file);
            } else {
              this.toastControl("请选择pdf文件");
            }
          });
        } else if (_file.type.includes("pdf")) {
          this.sendPdfFile(_file);
        } else if (!_file.type.includes("pdf")) {
          this.toastControl("请选择pdf文件");
        }
      },
      // 发送pdf
      sendPdfFile(_file) {
        const that = this;
        let _ele = {
          file: {
            url: window.URL.createObjectURL(_file),
            ext: "pdf",
            fileName: _file.name,
          },
          custom: JSON.stringify({
            name: _file.name
          }),
          type: "file",
          from: that.userData.account,
          replace: "pdf",
          loading: true,
        }
        this.msgList.push(_ele);
        that.progressNum++;
        that.scrollToBottom();
        that.fileLastIndex = that.msgList.length - 1;
        const reader = new FileReader();
        reader.readAsDataURL(_file);
        reader.onload = oFREvent => {
          this.nim.previewFile({
            type: "file",
            dataURL: oFREvent.target.result,
            uploadprogress(obj) {
              // that.scrollToBottom();
              let indexflag = that.msgList.indexOf(_ele)
              that.$set(that.fileProgress, indexflag, {
                uploading: true,
                progress: obj.percentageText,
                index: indexflag
              })
              // that.fileProgress = {
              //   uploading: true,
              //   progress: obj.percentageText,
              //   index: that.fileLastIndex
              // };
              console.log("文件总大小: " + obj.total + "bytes");
              console.log("已经上传的大小: " + obj.loaded + "bytes");
              console.log("上传进度: " + obj.percentage);
              console.log("上传进度文本: " + obj.percentageText);
            },
            done(error, file) {
              console.log("上传文件" + (!error ? "成功" : "失败"));
              // show file to the user
              file = Object.assign(file, {
                name: _file.name,
                ext: "pdf"
              });
              console.log(file);
              if (!error) {
                let msg = that.nim.sendFile({
                  scene: "p2p",
                  custom: JSON.stringify({
                    cType: "0",
                    cId: that.cId,
                    mType: "6",
                    conId: that.orderSourceId,
                    name: _file.name
                  }),
                  to: that.targetData.account,
                  file: file,
                  type: "file",
                  done(error, msg) {
                    that.progressNum--;
                    let numFlag = that.msgList.indexOf(_ele);
                    that.$set(that.fileProgress, numFlag, {
                      uploading: false,
                      progress: "0%",
                      index: 0,
                    })
                    that.msgList[numFlag] = msg;
                    // that.msgList[that.replaceIndex('pdf')] = msg;
                    that.scrollToBottom();
                    // that.fileProgress = {
                    //   uploading: false,
                    //   progress: "0%",
                    //   index: 0
                    // };
                  }
                });
              } else {
                console.log(error);
              }
            }
          });
        };

      },
      //滑动到底部
      scrollToBottom(element) {
        let that = this;
        that.$nextTick(() => {
          $(".main-message").animate({
              scrollTop: $(".main-message>section").height() + 1000
            }, 30);
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
      //获取服务时间
      getConsultPrice() {
        const that = this;
        console.log("获取服务时间");
        api.ajaxNoLoading({
          url: XHRList.getPrice,
          method: "POST",
          data: {
            visitSiteId: api.getSiteId(), //string	是	站点
            maxResult: 999,
            id: 0
          },
          done(data) {
            console.log(data);
            let {responseObject: {responseStatus, responseData}} = data;
            if (responseStatus && !!responseData) {
              let {dataList: {serviceEndTime, serviceStartTime}} = responseData;
              // serviceStartTime = "14:00";
              // serviceEndTime = "14:30";
              let startTimeArray = serviceStartTime.split(":"),
                endTimeArray = serviceEndTime.split(":");
              // startTimeArray[0].length === 1 && (startTimeArray[0] = "0" + startTimeArray[0]);
              if (startTimeArray[0].length === 1) {
                startTimeArray[0] = "0" + startTimeArray[0];
                serviceStartTime = startTimeArray.join(':');
              }
              let myDate = new Date();
              let currentHours = myDate.getHours(); //获取当前小时数(0-23)
              let currentMinutes = myDate.getMinutes(); //获取当前分钟数(0-59)
              that.serviceTime = `${serviceStartTime}-${serviceEndTime}`;
              if ((currentHours < parseInt(startTimeArray[0]) || (currentHours == parseInt(startTimeArray[0]) && currentMinutes < parseInt(startTimeArray[1]))) || (currentHours > parseInt(endTimeArray[0]) || (currentHours == parseInt(endTimeArray[0]) && currentMinutes > parseInt(endTimeArray[1])))) {
                that.serviceTime = that.serviceTime + " 休息中";
              }
            } else {
              console.log("获取分诊医生服务时间失败");
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
          patientCustomerId: that.patientCustomerId, //	string	是	患者所属用户id
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
          .then(function (data) {
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
          .catch(function (err) {
            console.log(err);
          });
      },
      //支付成功后重新分流
      againShunt() {
        let that = this;
        console.log("分流参数：" + that.orderSourceId);
        api.ajaxNoLoading({
          url: XHRList.updateShunt,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,
            //            andConsultationId:that.orderSourceId,
            patientId: api.getPara().patientId,
            patientCustomerId: that.patientCustomerId,
            isShunt: 1 //是否分流0-否1-是
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              //              that.getLastTime();
              console.log("分流成功");
              that.isClick = false; //是否点击立即咨询重置
              // that.finish = true;
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
          consultationLevel: "0"
        };
        !!type &&
        Object.assign(data, {customerId: "0", consultationState: "4"}); //付款回调参数传customerId
        api.ajaxNoLoading({
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
        api.ajaxNoLoading({
          url: XHRList.updateMedicalList,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,
            state: 1
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              that.refreashOrderTime();
              console.log("更新上传了检查检验");
            }
          }
        });
      },
      toUpLoadTimes(opt) {
        let that = this;
        //        debugger
        that.finishNum ++;
        api.ajaxNoLoading({
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
              that.refreshStateOther(-1);
              that.payPopupShow = false;
              // window.location.href =
              //   "/dist/imSceneDoctor.html?from=im&caseId=" +
              //   api.getPara().caseId +
              //   "&doctorCustomerId=" +
              //   (that.$store.state.targetDoctor.customerId ||
              //     JSON.parse(localStorage.getItem("mPayDoctorDetails"))
              //       .customerId) +
              //   "&patientId=" +
              //   api.getPara().patientId;
              // that.finish = false;
              that.finishNum --;
              let urlTemp = "/dist/imSceneDoctor.html?from=im&caseId=" +
                api.getPara().caseId +
                "&doctorCustomerId=" +
                (that.$store.state.targetDoctor.customerId ||
                  JSON.parse(localStorage.getItem("mPayDoctorDetails"))
                    .customerId) +
                "&patientId=" +
                api.getPara().patientId;
                g_sps.jump(null, urlTemp);
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
            mType: "33",
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
          window.onload = function () {
            setTimeout(() => {
              window.addEventListener("popstate", function (e) {
                // alert("我监听到了浏览器的返回按钮事件啦");
                self.location = document.referrer;
              });
            }, 500);
          };
        }
      },
      initScroll() {

        this.touchmoveDirection = "";
        new TouchmoveDirection((dir) => {
          this.touchmoveDirection = dir;
        });
        document.querySelector(".main-message").addEventListener("scroll", () => {
          clearTimeout(this._scrollTips);
          this._scrollTips = setTimeout(() => {
            if (this.touchmoveDirection === "down" && document.querySelector(".main-message").scrollTop < 200) {
              if (!this.allMsgsGot) {
                if (this.historyBeginTime == 0) {
                  this.toastControl(`没有更多消息了`);
                  this.allMsgsGot = true;
                } else {
                  store.commit("setHistoryStatus", "scrollInit");
                  this.getMessageList("scrollInit");
                }

              }
            }
          }, 200);
        })
      },
      refreshScroll() {
        this.scroll && this.scroll.refresh();
      }
    },
    computed: {
      // 计算 loading 是否可以隐藏
      finish () {
        if (this.finishNum <= 0) {
          return false;
        } else {
          return true;
        }
      },
      // 是否可以离开，传给suggest 的参数
      leaveFlag() {
        if (this.progressNum != 0) {
          return true;
        } else {
          return false;
        }
      },
      // toast 提示
      toastTips() {
        return this.$store.state.toastTips;
      },
      // toast 是否显示
      toastShow() {
        return this.$store.state.toastShow;
      },
      ensureShow() {
        return this.$store.state.ensureShow;
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
          patientCustomerId: this.patientCustomerId,
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
    beforeCreate() {
    },
    mounted() {
      window.onpageshow=function(e){
        console.log(e);
        if(e.persisted) {
          window.location.reload()
        }
      };
      let that = this;
      that.getConsultPrice();
      that.getPationtData(); // 获取患者数据

      if (!api.checkOpenId()) {
        api.wxGetOpenId(1);
      }
      store.commit("getToolbarConfig");
      api.forbidShare();
      that.getUserBaseData();
      that.triageDoctorAssign();
      //      that.forceRefresh();
      localStorage.setItem("PCIMLinks", location.href);
      this.setFooterPosition();
      setTimeout(() => {
        this.initScroll();
      }, 20);
      that.isShowPaySuccess(); //支付弹层
    },
    //组件更新之前的生命钩子
    beforeUpdate() {
    },
    //组件更新之后的生命钩子
    updated() {
    },
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
            mType: "39",
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
        // 如果会话消息不是结束，则更新状态；
        if (this.$store.state.consultationState != 7 && this.$store.state.consultationState != 1 && this.$store.state.consultationState != 8) {
          that.refreshStateOther(6);
        }
        that.nim.sendCustomMsg({
          scene: "p2p",
          to: that.targetData.account,
          custom: JSON.stringify({
            cType: "0",
            cId: that.cId,
            mType: "40",
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
      // //监听图片上传完成，可以继续上传；
      // progressImage(newVal, oldVal) {
      //   if (newVal == "0%" || newVal == "100%") {
      //     this.inputImageFlag = true;
      //   } else {
      //     this.inputImageFlag = false;
      //   }
      // },
      // //监听视频上传完成，可以继续上传；
      // progressVideo(newVal, oldVal) {
      //   if (newVal == "0%" || newVal == "100%") {
      //     this.inputVideoFlag = true;
      //   } else {
      //     this.inputVideoFlag = false;
      //   }
      // },
      // // 监听pdf上传完成，可以继续上传；
      // progressFile(newVal, oldVal) {
      //   if (newVal == "0%" || newVal == "100%") {
      //     this.inputPdfFlag = true;
      //   } else {
      //     this.inputPdfFlag = false;
      //   }
      // },
      // lastTime: function (time) {
      //   if (time <= 0) {
      //     if (this.inputBoxShow) {
      //       this.sendConsultState(5);
      //       this.refreshState();
      //     }
      //     this.lastTimeShow = false;
      //     this.inputBoxShow = false;
      //     this.consultTipsShow = true;
      //   } else {
      //     this.lastTimeShow = true;
      //     this.inputBoxShow = true;
      //     this.consultTipsShow = false;
      //   }
      // }
    },
    components: {
      MedicalReport,
      ContentText,
      ImageContent,
      AudioMessage,
      VideoMessage,
      TimeStamp,
      PreviewSuggestion,
      CheckSuggest,
      Triage,
      PayFinishTips,
      MiddleTips,
      payPopup,
      loading,
      confirm,
      MulitpleImage,
      FileMessage,
      suggestion,
      ensure,
      Toast
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  @import "../../../../static/scss/modules/imStyle";

  * {
    backface-visibility: hidden;
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
    margin: 0 rem(10px);
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

  // 撤回按钮
  // .delete-msg-btn {
  //   @include font-dpr(14px);
  //   position: absolute;
  //   top: 50%;
  //   left: 0;
  //   margin-left: -1rem;
  //   line-height: rem(75px);
  //   text-align: center;
  //   display: block;
  //   transform: translateY(-50%);
  //   @include circle(rem(75px), #CCEDF2);
  // }
  .delete-msg-btn {
    @include font-dpr(14px);
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: -1.5rem;
    text-indent: -.2rem;
    color: #fff;
    line-height: rem(70px);
    text-align: center;
    display: block;
    transform: translateY(-50%);
    width: rem(136px);
    height: rem(70px);
    background: url("../../../../src/common/image/imScene/bullet_withdraw.png");
    background-size: 100% 100%;
  }

  //输入区
  .main-input-box {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%; //height: 1.3rem;
    box-sizing: border-box;
    font-size: 0;
    background-color: #fff;
    box-shadow: 0px 0px 6px 0px rgba(226, 226, 226, 0.5); //position: relative;
    //display: none;
    z-index: 3;
    & > * {
      display: inline-block;
      vertical-align: bottom;
    }
    .main-input-box-textarea-inner {
      box-sizing: border-box;
      margin-left: rem(15px);
      max-height: 2.5rem;
      overflow: auto;
      .area-content {
        position: relative;
        pre {
          display: block;
          visibility: hidden;
          @include font-dpr(14px);
          width: rem(508px);
          padding-left: rem(20px);
          padding-right: rem(20px);
          padding-top: rem(15px);
          box-sizing: border-box;
          min-height: rem(72px);
        }
        .main-input-box-textarea {
          width: rem(508px);
          border-radius: rem(40px);
          padding-left: rem(20px);
          padding-right: rem(20px);
          padding-top: rem(15px);
          @include font-dpr(14px);
          background: #f3f6f7;
          border: 0 solid #e8ecef;
          box-sizing: border-box;
          min-height: rem(60px);
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
        }
      }

    }
    .main-input-box-send {
      @include font-dpr(17px);
      color: #b6b6b6;
      position: absolute;
      right: rem(40px);
      top: 50%;
      margin-top: rem(-37.5px);
      line-height: rem(75px); //height: 1.3rem;
      &.on {
        color: #00d6c6;
      }
    }
    .main-input-box-plus {
      @include font-dpr(16px);
      width: rem(50px);
      height: rem(50px);
      position: absolute;
      left: rem(30px);
      top: 50%;
      margin-top: rem(-25px);
      input[type="file"] {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        display: block;
        width: rem(50px);
      }
    }
  }

  .footer-box-top {
    position: relative;
    width: 100%;
    padding: rem(14px) rem(90px);
    box-sizing: border-box;
  }

  // 底部上传文件盒子样式
  .footer-box-bottom {
    width: 100%;
    padding: rem(32px) rem(80px);
    box-sizing: border-box;
    border-top: 1px solid #eeeeee;
    .bottom-item {
      display: inline-block;
      position: relative;
      input {
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        display: block;
      }
      .bottom-item-image {
        width: rem(100px);
        height: rem(100px);
      }
      .bottom-item-description {
        text-align: center;
        margin-top: rem(14px);
        color: #555555;
        @include font-dpr(12px);
      }
    }
    .bottom-item + .bottom-item {
      margin-left: rem(64px);
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

