<template>
  <div>
    <section class="consult-main-inner dis-four" :class="{'isMB':!isWeChat}">
      <progerssBar :progerssBarParams="{progerssParams:'4'}"></progerssBar>
      <transition name="fade">
        <section class="consult-wrapper">
          <section class="consult-inner">
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>填写病情描述</span>
                </h2>
                <p>有什么要对医生说的，如：诱因，症状，身体现状，病情加重或缓解情况</p>
              </header>

              <section class="input-area disIllness">
                <section class="box">
                  <section class="area-content">
                    <pre><span>{{disContent}}<br></span></pre>
                    <textarea
                      @focus="hideBar()"
                      @blur="showBar()"
                      class="main-input-box-textarea"
                      placeholder="请输入至少10个字"
                      v-model.trim="disContent"
                      @input="contentLimit('disContent',1000)">
                      </textarea>
                  </section>
                </section>
                <span class="qu-underline"></span>
                <span class="text-num-tips">{{disContent.length}}/1000</span>
              </section>
            </section>
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>想要医生提供帮助</span>
                </h2>
                <p>可向医生咨询如何控制病情，是否需要手术等...</p>
              </header>

              <figure class="input-area helpIllness">
                <section class="box">
                  <section class="area-content">
                    <pre><span>{{helpContent}}<br></span></pre>
                    <textarea @focus="hideBar()"
                              @blur="showBar()"
                              class="main-input-box-textarea"
                              placeholder="请输入至少6个字"
                              v-model.trim="helpContent"
                              rows="1"
                              @input="contentLimit('helpContent',1000)">
                </textarea>
                  </section>
                </section>
                <span class="text-num-tips">{{helpContent.length}}/1000</span>
                <span class="qu-underline"></span>
              </figure>
            </section>
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>请填写你的身高体重</span>
                </h2>
                <p>方便医生判断病情</p>
              </header>
              <ul class="hwBox">
                <li class="hBox">身高<span><i @click="heightPicker.show()">{{heightContent}}</i>厘米</span></li>
                <li class="wBox">体重<span><i @click="weightPicker.show()">{{weightContent}}</i>千克</span></li>
              </ul>
            </section>
          </section>
          <button data-alcode='e128' class="conditionSubmit" @click="conditionSubmit">提交</button>
        </section>
      </transition>
    </section>
    <transition name="fade">
      <confirm
        :confirmParams="{
          'ensure':'确定提交',
          'cancel':'返回修改',
          'title':'问诊单提交后不可修改\n请确定填写信息无误'
          }" v-if="submitTip" @cancelClickEvent="submitTip=false" @ensureClickEvent="createCaseData()">
      </confirm>
    </transition>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
    <backPopup v-if="backPopupShow" :backPopupShow.sync="backPopupShow"
               :backPopupParams="{patientParams:patientParams}"></backPopup>
    <loading v-if="finish"></loading>
  </div>
</template>

<script>
  import api from "common/js/util/util";
  import loading from "components/loading";
  import toast from "components/toast";
  import confirm from "components/confirm";
  import progerssBar from "../components/progressBar";
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import nimEnv from "common/js/nimEnv/nimEnv";
  import backPopup from "components/backToastForConsult";
  import Picker from 'better-picker';
  import store from "../store/store";
  import 'common/styles/_ustbPicker.css';
  import {mapState} from "vuex";
  import "babel-polyfill";

  const XHRList = {
    createCase: "/mcall/customer/patient/case/v2/create/",
    createProfessionalConsultation: "/mcall/customer/case/consultation/v1/create/", //创建专业医生问诊
    updateCount: "/mcall/customer/case/consultation/v1/updateFrequency/", //更新问诊次数
    getToken: "/mcall/im/interact/v1/refreshToken/",
    triageAssign: "/mcall/customer/case/consultation/v1/create/",
    getMedicalList: "/mcall/customer/patient/case/v1/getMapById/",
    uploadWX: "/mcall/customer/patient/case/attachment/v1/createWx/"  //微信上传图片
  }

  export default {
    data() {
      return {
        errorMsg: "",
        errorShow: false,
        finish: false,
        disContent: "",
        helpContent: "",
        isWeChat: true,
        heightPicker: null,
        heightContent: "",
        weightPicker: null,
        weightContent: "",
        submitTip: false,
        backPopupShow: false,
        patientParams: {
          customerId: localStorage.getItem('userId'),
          doctorId: api.getPara().doctorId
        },
        createParams: {
          visitSiteId: api.getSiteId(),
          operatorType: 0,
          caseType: api.getPara().doctorId ? 11 : 0,
          customerId: "",
          patientId: "",
          illnessHistoryId: "",
          illnessHistory: "",
          treatmentHospital: "",
          treatmentHospitalId: "",
          affectedAttId: "",
          inspectionAttId: "",
          takeMedicine: "",
          complication: "",
          height: "",
          weight: "",
          descriptionDisease: "",
          needHelp: "",
          optionList: []
        },
        userData: {
          account: "",
          token: ""
        },
        responseCaseId: "",
        orderSourceId: "", //进入分诊im需要orderSourceId
//        wxImgLists:[]
      }
    },
    computed: {
      ...mapState([
        "patientBaseMessage"
      ])
    },
    methods: {
      // 隐藏底部
      hideBar() {
        store.commit("setbottomNav", false);
      },
      // 显示底部
      showBar() {
        siteSwitch.weChatJudge(() => {
          // store.commit("setbottomNav",false);
        }, () => {
          store.commit("setbottomNav", true);
        });
      },
      initCaseParams() {
        let params = this.patientBaseMessage;
        this.heightContent = params.height;
        this.weightContent = params.weight;
        this.createParams.patientId = params.patientId;
        this.createParams.customerId = params.customerId;
        this.createParams.illnessHistoryId = params.illnessHistoryId;
        this.createParams.illnessHistory = params.illnessHistory;
        this.createParams.treatmentHospital = params.treatmentHospital;
        this.createParams.treatmentHospitalId = params.treatmentHospitalId;
        this.createParams.affectedAttId = params.affectedAttId;
        this.createParams.inspectionAttId = params.inspectionAttId;
        this.createParams.takeMedicine = params.takeMedicine;
        this.createParams.complication = params.complication;
        this.createParams.optionList = params.optionList;
      },
      contentLimit(element, limit) {
        let ranges = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;

        if (ranges.test(this[element])) {
          this[element] = this[element].replace(ranges, "");
        }
        let content = this[element];
        if (content.length > limit) {
          // this[element] = api.getStrByteLen(content, limit );
          this[element] = content.substring(0, 1000);
          this.errorShow = true;
          this.errorMsg = `最多只能输入${limit}字`;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          return false;
        }
      },
      heightPickerInit() {
        const that = this;
        let heightData = [], defaultHeight;
        console.log(that.$route.params.sex);
        if (Number(that.$route.params.sex) == 1) {
          console.log("这是男的");
          defaultHeight = 169;
        } else {
          console.log("这是女的");
          defaultHeight = 159;
        }
        for (let i = 1; i <= 300; i++) {
          heightData.push({
            text: i,
            value: ""
          })
        }
        that.heightPicker = new Picker({
          data: [heightData],//初始化的数据
          selectedIndex: [defaultHeight],//默认哪个选中
        });
        that.heightPicker.on('picker.select', (selectedVal, selectedIndex) => {
          that.heightContent = `${heightData[selectedIndex].text}`
        })
      },
      weightPickerInit() {
        const that = this;
        let weightData = [], defaultWeight;
        if (Number(that.$route.params.sex) == 1) {
          defaultWeight = 64;
        } else {
          defaultWeight = 49;
        }
        for (let i = 1; i <= 200; i++) {
          weightData.push({
            text: i,
            value: ""
          })
        }
        that.weightPicker = new Picker({
          data: [weightData],//初始化的数据
          selectedIndex: [defaultWeight],//默认哪个选中
        });
        that.weightPicker.on('picker.select', (selectedVal, selectedIndex) => {
          that.weightContent = `${weightData[selectedIndex].text}`
        })
      },
      //验证填写规则
      conditionSubmit() {
        //验证最小字数限制
        if (this.disContent.length < 10) {
          let disHeight = document.querySelector(".disIllness").offsetTop;
          window.scrollTo(0, disHeight);
          this.errorShow = true;
          this.errorMsg = `请详细描述病情，至少10个字`;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          return false;
        }
        if (this.helpContent.length < 6) {
          let helpHeight = document.querySelector(".helpIllness").offsetTop;
          window.scrollTo(0, helpHeight);
          this.errorShow = true;
          this.errorMsg = `请详细描述所需帮助，至少6个字`;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          return false;
        }
        if (this.heightContent.length == 0 || this.weightContent.length == 0) {
          this.errorShow = true;
          this.errorMsg = `请补全身高体重`;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          return false;
        }
        //提示用户提交后不可修改提交内容
        if (localStorage.getItem("PCIMLinks") !== null) {
          this.backPopupShow = true;
        } else {
          this.backPopupShow = false;
          this.submitTip = true;
        }
      },
      //创建问诊单
      createCaseData() {
        let that = this;
        this.submitTip = false;
        this.finish = true;
        this.createParams.height = this.heightContent;
        this.createParams.weight = this.weightContent;
        this.createParams.descriptionDisease = encodeURIComponent(this.disContent);
        this.createParams.needHelp = encodeURIComponent(this.helpContent);
        api.ajax({
          url: XHRList.createCase,
          method: "POST",
          data: this.createParams,
          timeout: 30000,
          done(data) {
            if (data.responseObject.responsePk !== 0) {
              that.responseCaseId = data.responseObject.responsePk;
              localStorage.setItem("payCaseId", that.responseCaseId);
              //判断url里面是不是有doctorId，有则创建专业医生会话，无则分流分诊医生
              api.getPara().doctorId ? that.getProfessionalDoctor() : that.getTriageDoctorId();
              //微信上传图片
//              if(that.wxImgLists.length>0){
//                api.ajax({
//                  url: XHRList.uploadWX,
//                  method: "post",
//                  data: {
//                    caseCategoryId: "1",
//                    imageType: "0",
//                    mediaId: that.wxImgLists.join(),
//                    caseId: data.responseObject.responsePk
//                  },
//                  done(res) {
//                    if (res.responseObject.responseStatus) {
//                      console.log("上传成功");
//                      api.getPara().doctorId ? that.getProfessionalDoctor() : that.getTriageDoctorId();
//                    }
//                  }
//                })
//              }else{
//                //判断url里面是不是有doctorId，有则创建专业医生会话，无则分流分诊医生
//                api.getPara().doctorId ? that.getProfessionalDoctor() : that.getTriageDoctorId();
//              }
            } else {
              that.finish = false;
            }
          }
        });
      },
      //创建专业医生会话
      getProfessionalDoctor() {
        let that = this;
        api.ajax({
          url: XHRList.createProfessionalConsultation,
          method: "POST",
          data: {
            caseId: that.responseCaseId,
            customerId: api.getPara().doctorId,
            patientCustomerId: that.createParams.customerId,
            patientId: that.createParams.patientId,
            consultationType: 1,
            consultationState: -1,
            consultationLevel: 6, //咨询级别0-免费1-普通2-加急3-特需4-医生赠送5-老患者报到(诊后报道)6-立即问诊
            siteId: api.getSiteId(),
            caseType: 11 //从医生主页进来的立即问诊caseType 为11；10-老患者报到(诊后报道)11-立即问诊
          },
          done(res) {
            if (res.responseObject.responseStatus) {
              that.updateTimes(res.responseObject.responsePk);
            }
          }
        });
      },
      //更新次数
      updateTimes(consultationId) {
        let that = this;
        api.ajax({
          url: XHRList.updateCount,
          method: "POST",
          data: {
            consultationId: consultationId,
            frequency: 3,
            frequencyType: 2,
            consultationState: -1,
            consultationLevel: 0
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              let arg = {
                orderType: 0,
                orderAmount: 0,
                orderFrequency: 3
              };
              localStorage.setItem("sendTips", JSON.stringify(arg));
              localStorage.removeItem("selectList");
              localStorage.removeItem("secondList");
              localStorage.removeItem("questionList");
              localStorage.removeItem("complication");
              localStorage.removeItem("noMR");
              if (navigator.userAgent.toLowerCase().includes("iphone")) {
                that.backPopupShow = true;
              }
              that.finish = false;
              let urlTemp = "/dist/imSceneDoctor.html?from=report&caseId=" +
                that.responseCaseId +
                "&doctorCustomerId=" +
                api.getPara().doctorId +
                "&patientId=" +
                that.createParams.patientId;
              // window.location.href =
              //   "/dist/imSceneDoctor.html?from=report&caseId=" +
              //   that.responseCaseId +
              //   "&doctorCustomerId=" +
              //   api.getPara().doctorId +
              //   "&patientId=" +
              //   that.createParams.patientId;

              g_sps.jump(null, urlTemp);
            }
          }
        });
      },
      // 获取分流ID
      getTriageDoctorId() {
        const that = this;
        localStorage.removeItem("selectList");
        localStorage.removeItem("secondList");
        localStorage.removeItem("questionList");
        localStorage.removeItem("complication");
        siteSwitch.weChatJudge(
          () => {
            if (navigator.userAgent.toLowerCase().includes("iphone")) {
              that.backPopupShow = true;
            }
            that.finish = false;
            let urlTemp = "/dist/imScene.html?caseId=" +
              that.responseCaseId +
              "&patientId=" +
              that.createParams.patientId;
            // window.location.href =
            //   "/dist/imScene.html?caseId=" +
            //   that.responseCaseId +
            //   "&patientId=" +
            //   that.createParams.patientId ;

            g_sps.jump(null, urlTemp);
          },
          () => {
            if (that.$store.state.isSubscribe) {
              if (navigator.userAgent.toLowerCase().includes("iphone")) {
                that.backPopupShow = true;
              }
              that.finish = false;
              let urlTemp = "/dist/imScene.html?caseId=" +
                that.responseCaseId +
                "&patientId=" +
                that.createParams.patientId;
              // window.location.href =
              //   "/dist/imScene.html?caseId=" +
              //   that.responseCaseId +
              //   "&patientId=" +
              //   that.createParams.patientId ;
              g_sps.jump(null, urlTemp);
            } else {
              that.getUserBaseData();
            }
          }
        );
      },
      //获取用户信息
      getUserBaseData() {
        const that = this;
        api.ajax({
          url: XHRList.getToken,
          method: "POST",
          data: {
            accid: "0_" + this.responseCaseId,
            patientName: this.createParams.patientId
          },
          done(param) {
            if (param.responseObject.responseStatus) {
              that.userData = {
                account: "0_" + that.responseCaseId,
                token: param.responseObject.responseData.token
              };
            }
            that.connectToNim();
          },
          fail(err) {
            console.log(err.message);
          }
        });
      },
      //用户连接IM聊天
      connectToNim() {
        const that = this;
        nimEnv().then(nimEnv => {
          that.nim = NIM.getInstance({
            appKey: nimEnv,
            account: that.userData.account,
            token: that.userData.token,
            //连接建立后的回调, 会传入一个对象, 包含登录的信息, 有以下字段
            onconnect(data) {
              console.log("连接成功");
              that.createTriageMessage();
            }
          });
        });
      },
      //创建分流
      createTriageMessage() {
        const that = this;
        api.ajax({
          url: XHRList.triageAssign,
          method: "POST",
          data: {
            caseId: this.responseCaseId,
            customerId: 0,
            patientCustomerId: localStorage.getItem("userId"),
            patientId: this.createParams.patientId,
            consultationType: 0, //会诊类型0：患者-分诊平台1：患者-医生
            consultationState: 4, //会诊状态-1-待就诊0-沟通中1-已结束2-被退回3-超时接诊退回4-新用户5-释放
            siteId: api.getSiteId(),
            caseType: 0
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              console.log("用户已分流...");
              that.orderSourceId = data.responseObject.responsePk;
              that.getMedicalMessage();
            }
          }
        });
      },
      //获取问诊单...M站预发送消息
      getMedicalMessage() {
        const that = this;
        api.ajax({
          url: XHRList.getMedicalList,
          method: "POST",
          data: {
            caseId: that.responseCaseId,
            attUseFlag: 1,
            isOrder: 0
          },
          done(data) {
            if (data.responseObject && data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                that.sendMedicalReport({
                  data: {
                    caseId: that.responseCaseId, //问诊单 病例ID
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
            cId: 0,
            mType: "27",
            conId: 0
          }),
          to: "1_doctor00001",
          content: JSON.stringify(data),
          done(error, msg) {
            console.log("问诊单发送成功...");
            that.tipNewPatient(data);
          }
        });
      },
      //新患者提示
      tipNewPatient(arg) {
        const that = this;
        //提示信息
        //分诊台刷新患者
        this.nim.sendCustomMsg({
          scene: "p2p",
          custom: JSON.stringify({
            cType: "0",
            cId: 0,
            mType: "32",
            conId: 0 // that.orderSourceId
          }),
          to: "1_doctor00001",
          content: JSON.stringify({
            type: "new-health",
            data: Object.assign({}, arg.data, {
              patientId: this.createParams.patientId,
              consultationid: this.orderSourceId
            })
          }),
          done(error, msg) {
            console.log("新用户提醒发送...");
            if (navigator.userAgent.toLowerCase().includes("iphone")) {
              that.backPopupShow = true;
            }
            that.finish = false;
            that.$router.push({
              name: "conGuide"
            });
          }
        });
      }
    },
    mounted() {
      document.title = "描述病情";
      window.scrollTo(0, 0);
      if (localStorage.getItem("PCIMLinks") !== null) {
        this.backPopupShow = true;
      } else {
        this.backPopupShow = false;
      }
      siteSwitch.weChatJudge(() => {
        this.isWeChat = true;
      }, () => {
        this.isWeChat = false;
      });
      this.initCaseParams();
      this.heightPickerInit();
      this.weightPickerInit();
      api.forbidShare();
    },
    components: {
      progerssBar,
      loading,
      backPopup,
      toast,
      confirm
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .isMB {
    padding-bottom: rem(100px);
  }

  .text-num-tips {
    padding-right: rem(20px);
    float: right;
    front-size: rem(13px);
    color: #AFAFAF;
  }

  .conditionSubmit {
    display: block;
    width: rem(560px);
    height: rem(100px);
    margin: rem(76px) auto rem(100px);
    line-height: rem(100px);
    text-align: center;
    @include font-dpr(18px);
    background: #2FC5BD;
    color: #ffffff;
    border-radius: rem(100px);
    box-shadow: 0 rem(4px) rem(12px) 0 rgba(47, 197, 189, 0.4);
  }

  .consult-main-inner {
    background: url("../../../common/image/background_wave.png") no-repeat bottom center #f2f2f2;
    background-size: 100% rem(272px);
    box-sizing: border-box;
  }

  .dis-four {
    .consult-wrapper {
      padding: rem(30px);
    }
    .consult-total {
      .qu-underline {
        display: block;
        height: rem(2px);
        width: 100%;
        background-color: #d5d5d5;
        margin-bottom: rem(16px);
      }
      .input-area {
        background-color: #e5e5e5;
        position: relative;
        padding: rem(64px) rem(64px);
        padding-bottom: rem(80px);
        margin: 0;
        box-sizing: border-box;
        max-height: 4rem;
        overflow: hidden;
        .box {
          max-height: 2rem;
          .area-content {
            pre {
              display: block;
              visibility: hidden;
              @include font-dpr(14px);
              width: 100%;
              box-sizing: border-box;
              min-height: rem(72px);
            }
            .main-input-box-textarea {
              display: block;
              max-height: 2rem;
              background-color: #e5e5e5;
              padding-top: rem(15px);
              padding-bottom: rem(15px);
              width: 100%;
              @include font-dpr(14px);
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
      }
      .text-num-tips {
        padding-right: rem(20px);
        front-size: rem(13px);
        color: #AFAFAF;
        display: block;
      }
      .hwBox {
        padding: 0 rem(60px);
        @include font-dpr(16px);
        color: #333333;
        li {
          span {
            display: inline-block;
            margin-left: rem(16px);
            padding-bottom: rem(12px);
            border-bottom: 1px solid #D5D5D5;
          }
          i {
            display: inline-block;
            width: rem(200px);
            height: rem(32px);
          }
        }
        .wBox {
          margin-top: rem(20px);
        }
      }
    }

    .consult-inner {
      background: #ffffff;
      border-radius: rem(16px);
      padding-bottom: rem(100px);
      .consult-page {
        position: absolute;
        right: 0;
        top: 0;
        width: rem(86px);
        height: rem(64px);
        &.page-one {
          background: url("../../../common/image/img00/consult_V1.2/page number@2x.png");
          background-size: contain;
        }
        &.page-two {
          background: url("../../../common/image/img00/consult_V1.2/pagenumber02@2x.png");
          background-size: contain;
        }
      }
    }

    .consult-total {
      .consult-inner-title {
        padding: rem(60px) rem(60px);
        padding-bottom: rem(50px);
        & > p {
          @include font-dpr(15px);
          color: #555555;
          margin-top: rem(10px);
        }
        & > h2 {
          @include font-dpr(20px);
          color: #222222;
          position: relative;
          &:before {
            content: "";
            position: absolute;
            @include circle(rem(16px), #2fc5bd);
            top: 50%;
            margin-top: rem(-4px);
            margin-left: rem(-32px);
          }
          span {
            vertical-align: middle;
          }
          & > em {
            @include font-dpr(16px);
            color: #666666;
            font-style: normal;
            font-weight: normal;
            vertical-align: middle;
          }
        }
      }
    }

    .consult-question-inner {
      .detail-tips {
        @include font-dpr(14px);
        color: #07b6ac;
        vertical-align: middle;
        &:before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: rem(48px);
          height: rem(48px);
          background: url(../../../common/image/img00/consult_V1.2/doubt2@2x.png);
          background-size: contain;
          margin-left: rem(28px);
        }
      }
      &.mSelector {
        .selected {
          & > .icon-select {
            background: url("../../../common/image/img00/consult_V1.2/multiplechoice_on@2x.png");
            background-size: contain;
          }
        }
        .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/multiplechoice_off@2x.png");
          background-size: contain;
        }
      }
      &.select-item {
        .icon-select {
          width: rem(36px);
          height: rem(36px);
          background: url("../../../common/image/img00/consult_V1.2/arrow@2x.png");
          background-size: contain;
        }
      }
      &.sSelector {
        .selected {
          & > .icon-select {
            background: url("../../../common/image/img00/consult_V1.2/radio_on@2x.png");
            background-size: contain;
          }
        }
        .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/radio_off@2x.png");
          background-size: contain;
        }
      }
      .consult-question-item {
        &.selected > p {
          color: #07b6ac;
        }
        padding: rem(38px) rem(60px);
        &.dark {
          background-color: rgba(239, 239, 239, 0.3);
        }
        & > .icon-select {
          width: rem(48px);
          height: rem(48px);
          float: right;
        }
        & > p {
          @include font-dpr(18px);
          color: #333333;
          display: inline-block;
          max-width: 80%;
          @include ellipsis();
          vertical-align: middle;
        }
      }
    }

    .welcome-tips {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      text-align: center;
      z-index: 5;
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
      & > figure {
        display: inline-block;
        vertical-align: middle;
        width: rem(716px);
        height: rem(760px);
        position: relative;
        & > img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
        .welcome-tips-ensure {
          width: 66.7%;
          position: absolute;
          bottom: rem(96px);
          padding: rem(30px) 0;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 rem(4px) rem(12px) 0 rgba(74, 74, 74, 0.5);
        }
      }
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
    opacity: 1;
    transition: all ease-in-out 0.4s;
  }

  .fadeDown-enter,
  .fadeDown-leave-to {
    opacity: 0;
  }
</style>
