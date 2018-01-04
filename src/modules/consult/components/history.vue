<template>
  <div data-alcode-mod='712'>
    <section class="consult-main-inner">
      <progerssBar :progerssBarShow.sync="progerssBarShow" :progerssBarParams="{progerssParams:'3'}"></progerssBar>
      <section class="consult-wrapper" v-show="!showSelectHospital&&!showSelectDisease&&!upLoadTip">
        <!-- <span class="consult-page page-two"></span> -->
        <section class="questionContainMain">
          <section class="questionItem-common isComeCure">
            <p class="questionTitleCommon">有去医院就诊过吗？</p>
            <section class="questionContain-center">
              <p class="questionSelectBtn" @click="visit.none=true;visit.has=false" :class="{'selected':visit.none}">
                没有就诊过</p>
              <p class="questionSelectBtn selected-right" @click="visit.none=false;visit.has=true"
                 :class="{'selected':visit.has}">就诊过</p>
            </section>
            <section class="questionHiddenCommon selectHospitalBox" v-show="visit.has">
              <p class="selected-HospitalBtn" @click="selectHospital()" :class="{'selected':hospitalMessage.id}">
                {{hospitalMessage.name}}</p>
              <p class="selected-cureBtn" @click="selectDisease()" :class="{'selected':diseaseMessage.id}">
                {{diseaseMessage.name}}</p>
            </section>
          </section>
          <section class="questionItem-common upLoadResource">
            <p class="questionTitleCommon">请上传X光/CT/核磁等影像资料<span class="qu-upLoadTips" @click="upLoadTips()"></span></p>
            <p class="upLoadForPerson"><span class="upLoadForPersonIcon"></span>影像资料是您咨询的重要依据，请尽量上传</p>
            <section class="questionContain-center">
              <p class="questionSelectBtn" @click="upload.none=true;upload.has=false" :class="{'selected':upload.none}">
                暂不上传</p>
              <p class="questionSelectBtn selected-right" @click="uploadBtnFn" :class="{'selected':upload.has}">去上传</p>
            </section>
            <section class="questionHiddenCommon upLoadBox" v-show="upload.has">
              <section class="tc-upLoadBox upLoadCommon-box-s">
                <form class="qu-upFormBox qu-upFormBox-s" action="">
                  <figure class="qu-upLoadTitle qu-upLoadTitle-s">
                    <p class="tc-upLoadTitleName">温馨提示：患病处如有外观变化，请将患处照片一并上传，以便医生了解病情</p>
                    <!-- <p class="qu-upLoadTips" @click="upLoadTips()">如何清晰拍摄影像资料？查看教程</p> -->
                  </figure>
                  <ul class="qu-upLoadItemBox qu-upLoadItemBox-s docInt">
                    <li class="tc-upLoadItemList ev-imgList success" v-for="(item,index) in imageList1" v-if="index<9">
                      <img alt="" @click="showBigImg(item,index,1)" :src="item.blob">
                      <span class="tc-upLoadDel" style="cursor: pointer" @click="imgDelete(item,index,1)"
                            v-show="item.finish"></span>
                      <loading v-if="item.uploading"></loading>
                      <figure class="upload-fail" v-if="item.fail">
                        <p>重新上传</p>
                         <div class="ev-upLoadInput" 
                               @click="upLoadReload(index)"  ref="uploader"></div>
                        <!-- <input v-if="!isIos&&isWeChat" class="ev-upLoadInput" accept="image/*" type="file"
                               @change="onFileChange($event,1,index)"  ref="uploader" capture="camera">
                        <input v-if="!isIos&&!isWeChat" class="ev-upLoadInput" accept="image/*" type="file"
                               @change="onFileChange($event,1,index)"    ref="uploader">
                        <input v-if="isIos" class="ev-upLoadInput" accept="image/*" type="file"
                               @change="onFileChange($event,1,index)"    ref="uploader"> -->
                      </figure>
                    </li>
                    <li class="ev-upLoadAdd" v-show="isReadyLoad&&imageList1.length<50">
                      <input class="ev-upLoadInput" accept="image/*" type="file"
                             v-if="!isIos&&isWeChat&&uploading1===false&&imageList1.length<50"
                             @change="onFileChange($event,1)" multiple   capture="camera" ref="uploader">
                      <input class="ev-upLoadInput" accept="image/*" type="file"
                             v-if="!isIos&&!isWeChat&&uploading1===false&&imageList1.length<50"
                             @change="onFileChange($event,1)" multiple ref="uploader">
                      <input class="ev-upLoadInput" accept="image/*" type="file"
                             v-if="isIos&&uploading1===false&&imageList1.length<50"
                             @change="onFileChange($event,1)" multiple ref="uploader">
                    </li>
                  </ul>
                </form>
                <p class="upLoadContentNum"  v-show="imageList1.length>0">已上传{{imageList1.length}}张，<span class="upLoadViewAll" @click="showBigImg( {}, 0 , 1)">查看全部</span></p>
                <!-- <p class="upLoadForPerson"><span class="upLoadForPersonIcon"></span>影像资料是您咨询的重要依据，请尽量上传</p> -->
                <form class="qu-upFormBox qu-upFormBox-s" action="" v-show="false">
                  <figure class="qu-upLoadTitle-s">
                    <p class="tc-upLoadTitleName">请上传患病处照片</p>
                  </figure>
                  <ul class="qu-upLoadItemBox qu-upLoadItemBox-s docInt">
                    <li class="tc-upLoadItemList ev-imgList success" v-for="(item,index) in imageList2">
                      <img alt="" @click="showBigImg(item,index,2)" :src="item.blob">
                      <span class="tc-upLoadDel" style="cursor: pointer" @click="imgDelete(item,index,2)"
                            v-show="item.finish"></span>
                      <loading v-if="item.uploading"></loading>
                      <figure class="upload-fail" v-if="item.fail">
                        <p>重新上传</p>
                        <input v-if="!isIos&&isWeChat" class="ev-upLoadInput" accept="image/*" type="file"
                               @change="onFileChange($event,2,index)" multiple capture="camera" ref="uploader">
                        <input v-if="!isIos&&!isWeChat" class="ev-upLoadInput" accept="image/*" type="file"
                               @change="onFileChange($event,2,index)" multiple   ref="uploader">
                        <input v-if="isIos" class="ev-upLoadInput" accept="image/*" type="file"
                               @change="onFileChange($event,2,index)" multiple   ref="uploader">
                      </figure>
                    </li>
                    <li class="ev-upLoadAdd" v-show="imageList2.length<9">
                      <input class="ev-upLoadInput" accept="image/*" type="file"
                             v-if="!isIos&&isWeChat&&uploading2===false&&imageList2.length<9"
                             @change="onFileChange($event,2)" multiple   capture="camera" ref="uploader">
                       <input class="ev-upLoadInput" accept="image/*" type="file"
                             v-if="!isIos&&!isWeChat&&uploading2===false&&imageList2.length<9"
                             @change="onFileChange($event,2)" multiple ref="uploader">
                       <input class="ev-upLoadInput" accept="image/*" type="file"
                             v-if="isIos&&uploading2===false&&imageList2.length<9"
                             @change="onFileChange($event,2)" multiple ref="uploader">
                    </li>
                  </ul>
                </form>
              </section>
            </section>
          </section>
          <section class="questionItem-common isUseDrug">
            <p class="questionTitleCommon">最近的用药情况</p>
            <section class="questionContain-center">
              <p class="questionSelectBtn" @click="medical.none=true;medical.has=false"
                 :class="{'selected':medical.none}">
                暂无服用</p>
              <p class="questionSelectBtn selected-right" @click="medical.none=false;medical.has=true"
                 :class="{'selected':medical.has}">有服用</p>
            </section>
            <section class="questionHiddenCommon qu-setMedicineBox" @click="textAreaFocus" v-show="medical.has">
            <textarea class="medicineBox" name="medicine" placeholder="填写药物名称" v-model="medicalMessage"
                      @input="contentLimit"></textarea>
              <span class="qu-underline"></span>
              <p class="limit" v-show="getByteLen(medicalMessage.length)<=50">{{getByteLen(medicalMessage.length)}}</p>
              <p class="qu-setMedicineTipText">填写示例:双氯芬酸钠缓释片、盐酸乙哌立松</p>
            </section>
          </section>
        </section>
        <section class="questionSubmitBtnBox">
          <button class="questionSubmitBtn" @click="submitParamsInstall" data-alcode='e128'>下一页</button>
        </section>
      </section>
      <!--<transition name="fadeRight">-->
      <!--<selectArea v-if="showSelectHospital" :show.sync="showSelectHospital" :level.sync="cityLevel"-->
      <!--:areaParam.sync="hospitalMessage" :listType="hospitalType"></selectArea>-->
      <!--</transition>-->
      <!--<transition name="fadeRight">-->
      <!--<selectArea v-if="showSelectDisease" :show.sync="showSelectDisease" :level.sync="cityLevel"-->
      <!--:areaParam.sync="diseaseMessage" :listType="diseaseType"></selectArea>-->
      <!--</transition>-->
      <transition name="fade">
        <toast :content="errorMsg" v-if="errorShow"></toast>
      </transition>
      <loading v-if="finish"></loading>
      <transition name="fadeRight">
        <section class="qu-upLoadGuide"></section>
      </transition>
      <transition name="fade">
        <confirm
          :confirmParams="{
          'ensure':'确定',
          'cancel':'取消',
          'content':'确定要使用手机流量上传吗?',
          'title':'当前WIFI未连接'
          }" v-if="levelShow&&netTipsNum==1" :showFlag.sync="levelShow" @cancelClickEvent="cancelEvent"
          @ensureClickEvent="ensureEvent"></confirm>
      </transition>
      <!-- <transition name="fade">
        <confirm
          :confirmParams="{
          'ensure':'确定提交',
          'cancel':'返回修改',
//          'content':'确定要使用手机流量上传吗?',
          'title':'问诊单提交后不可修改\n请确定填写信息无误'
          }" v-if="submitTip" :showFlag.sync="submitTip" @cancelClickEvent="subCancelEvent"
          @ensureClickEvent="submitData()"></confirm>
      </transition> -->
      <transition name="fade">
        <confirm
          :confirmParams="{
          'ensure':'取消',
          'cancel':'确定',
//          'content':'',
          'title':'确定删除图片吗？'
          }" v-if="deletePicTip" :showFlag.sync="deletePicTip" @cancelClickEvent="ensureDeletePic()"
          @ensureClickEvent="cancelDeletePic"></confirm>
      </transition>
      <!-- <transition name="fade">
        <confirm :confirmParams="{
          'ensure':'支付成功',
          'cancel':'支付失败',
          'title':'请确认微信支付是否已经完成'
          }" v-if="noWXPayShow" @cancelClickEvent="payFail()" @ensureClickEvent="viewPayResult()">
        </confirm>
      </transition> -->
      <backPopup v-if="backPopupShow" :backPopupShow.sync="backPopupShow"
                 :backPopupParams="{patientParams:patientParams}"></backPopup>
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
   * Created by qiangkailiang/jukun on 2017/7/25.
   */

// import selectArea from 'components/selectArea';
let _cameraType = "";
let _weChat = false;
if (navigator.userAgent.toLowerCase().includes("iphone")) {
  _cameraType = "";
} else {
  _cameraType = "camera";
}

import api from "common/js/util/util";
import loading from "components/loading";
import toast from "components/toast";
import autosize from "autosize";
import axios from "axios";
import confirm from "components/confirm";
import backPopup from "components/backToastForConsult";
import WxPayCommon from "common/js/wxPay/wxComm"; //微信支付的方法
import siteSwitch from "common/js/siteSwitch/siteSwitch";
import nimEnv from "common/js/nimEnv/nimEnv";
import imageCompress from "common/js/imgCompress/toCompress";
import progerssBar from "../components/progressBar";
import GetUploadLimit from "../api/getUploadLimit";
import CheckUpLoadStatus from "../api/checkUpLoadStatus";
import store from "../store/store";

const getUploadLimit = new GetUploadLimit();
const checkUpLoadStatus = new CheckUpLoadStatus();

siteSwitch.weChatJudge(
  () => {
    _weChat = true;
  },
  () => {
    _weChat = false;
  }
);

const XHRList = {
  upload: "/mcall/customer/patient/case/attachment/v1/create/",
  create: "/mcall/customer/patient/case/v2/create/",
  triage: "/mcall/customer/case/consultation/v1/createConsultation/",
  createProfessionalConsultation:
    "/mcall/customer/case/consultation/v1/create/", //创建专业医生问诊
  updateCount: "/mcall/customer/case/consultation/v1/updateFrequency/", //更新问诊次数
  getPrice: "/mcall/customer/traige/v1/getMapById/", //获取分诊医生价格
  triageAssign: "/mcall/customer/case/consultation/v1/create/",
  getToken: "/mcall/im/interact/v1/refreshToken/",
  getMedicalList: "/mcall/customer/patient/case/v1/getMapById/"
};
export default {
  data() {
    return {
      visit: {
        has: false,
        none: false
      },
      upload: {
        has: false,
        none: false
      },
      medical: {
        has: false,
        none: false
      },
      cameraType: _cameraType,
      patientParams: {
        customerId: localStorage.getItem("userId"),
        doctorId: api.getPara().doctorId
      },
      isIos: navigator.userAgent.toLowerCase().includes("iphone"),
      isWeChat: _weChat,
      orderSourceId: "", //进入分诊im需要orderSourceId
      finish: false,
      deletePic: {},
      deletePicTip: false,
      noWXPayShow: false,
      upLoadTip: false,
      levelShow: false,
      progerssBarShow: true, //进度条（显示）
      // progerssNum:'3',
      backPopupShow: false,
      submitTip: false,
      uploading1: false,
      uploading2: false,
      imageList1: [],
      imageList2: [],
      uploadContalNum: 0, //已上传数量
      upLoadGuideTip: 1, //上传指导路径 （1-问号提示 2-去上传按钮）
      filesObj: [], //每次选择文件的对象（下次清空）
      base64Arr: [], //每次选择完文件的压缩对象（下次清空）
      uploadIndex: 0,
      filesObjAll: [], //所有选择文件对象（不清空）
      base64ArrAll: [], //所有选选择完文件的压缩对象（不清空）
      reload: false,
      isReadyLoad: true,
      netTipsNum: 0,
      cityLevel: 2,
      responseCaseId: "", //提交订单响应回来的caseId
      hospitalMessage: {
        name: "最近一次就诊的医院"
      },
      showSelectHospital: false,
      diseaseMessage: {
        name: "医生给出的诊断(未确诊可不选)"
      },
      showSelectDisease: false,
      hospitalType: "hospital",
      diseaseType: "disease",
      medicalMessage: "",
      errorMsg: "",
      errorShow: false,
      isClick: false, //确认提交是否点击
      userData: {
        account: "",
        token: ""
      },
      allParams: {
        operatorType: 0,
        illnessHistoryId: "",
        illnessHistory: "",
        treatmentHospital: "",
        treatmentHospitalId: "",
        caseType: api.getPara().doctorId ? 11 : 0, // 类型0-咨询1-复诊2-手术直约3-首诊4-手术犹豫5-待通知入院6-已通知入院7-住院中8-已出院9-术后复诊10-老患者报到(诊后报道)11-立即问诊
        affectedAttId: "",
        inspectionAttId: "",
        visitSiteId: 17,
        takeMedicine: "",
        complication: "",
        optionList: [],
        customerId: localStorage.getItem("userId"),
        patientId: ""
      }
    };
  },
  activated() {
    this.finish = false;
    this.initData();
    // this.isShowPaySuccess(); //支付弹层
    document.title = "描述病情";
    if (localStorage.getItem("PCIMLinks") !== null) {
      this.backPopupShow = true;
    } else {
      this.backPopupShow = false;
    }
    if (localStorage.getItem("isSubmit") == "1") {
      this.clearPageData();
      localStorage.removeItem("isSubmit");
    }
    siteSwitch.weChatJudge(
      () => {
        store.commit("setbottomNav", false);
      },
      () => {
        store.commit("setbottomNav", true);
      }
    );
    if (this.upLoadGuideTip == "2") {
      //展示上传按钮
      this.uploadEvent();
    }
  },
  mounted() {
    document.title = "描述病情";
    this.initData();
    // this.isShowPaySuccess(); //支付弹层
    // document.body.scrollTop = 0;
    autosize(this.$el.querySelector(".medicineBox"));
    localStorage.setItem("hasCome", 0);
    if (localStorage.getItem("PCIMLinks") !== null) {
      this.backPopupShow = true;
    } else {
      this.backPopupShow = false;
    }
    api.forbidShare();
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "discription") {
      document.body.scrollTop = 0;
    }
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(true);
  },
  methods: {
    initData() {
      if (this.$route.params.optionList) {
        let params;

        if (JSON.stringify(this.$route.params) === "{}") {
          params = JSON.parse(localStorage.getItem("submitParams"));
        } else {
          params = this.$route.params;
          localStorage.setItem("submitParams", JSON.stringify(params));
        }
        //          this.allParams.customerId = params.userId;
        this.allParams.complication = params.complication;
        this.allParams.optionList = JSON.stringify(params.optionList);
        this.allParams.patientId = params.patientId;
      }

      if (this.$route.params.from === "disease") {
        this.diseaseMessage = this.$route.params.baseMessage;
      }

      if (this.$route.params.from === "hospital") {
        this.hospitalMessage = this.$route.params.baseMessage;
      }
      // alert(navigator.userAgent.toLowerCase())
      if (navigator.userAgent.toLowerCase().includes("iphone")) {
        $(".ev-upLoadInput").removeAttr("capture");
      }
    },
    selectHospital() {
      this.$router.push({
        name: "searchList",
        params: {
          listType: "hospital",
          level: 2,
          from: this.$route.name
        },
        query: this.$route.query
      });
    },
    selectDisease() {
      this.$router.push({
        name: "searchList",
        params: {
          listType: "disease",
          level: 2,
          from: this.$route.name
        },
        query: this.$route.query
      });
    },
    onFileChange(e, type, index) {
      let _files = e.target.files || e.dataTransfer.files;
      let files = []
      let that = this;
      that.filesObj = [];
      that.base64Arr = [];
      that.uploadIndex = 0;
      _files = Array.from(_files);
      if (!_files.length) {
        return;
      } else if (_files.length > 9) {
        files = _files.slice(0,9);
        that.toastCommonTips("一次最多上传9张图片");
      }else{
        files = _files;
      }
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 1024 * 1024 * 10) {
          this.errorShow = true;
          this.errorMsg = "图片不能超过10M";
          this["uploading" + [type]] = true; //重置input file 对象
          setTimeout(() => {
            this.errorMsg = "";
            this.errorShow = false;
            if (i == files.length - 1) {
              // this.loading = false;   //开启上传权限
              this["uploading" + [type]] = false;
            }
          }, 3000);
        } else {
          that.filesObj.push(files[i]); //保存文件对象
          that.filesObjAll.unshift(files[i]); //保存文件对象（不清空）
          //图片压缩处理
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = oFREvent => {
            imageCompress(
              {
                imgSrc: oFREvent.target.result,
                quality: 0.8,
                file: files[i]
              },
              base64 => {
                that.base64Arr.push(base64); //保存压缩图片
                that.base64ArrAll.unshift(base64); //保存压缩图片
                if (i == files.length - 1) {
                  this.upLoadPic(
                    that.filesObj[that.uploadIndex],
                    type,
                    index,
                    that.base64Arr[that.uploadIndex]
                  );
                }
              }
            );
          };
        }
      }
      console.log(this.filesObj);
      console.log(this.base64Arr);
      console.log(this.filesObjAll);
      console.log(this.base64ArrAll);
      console.log("=================");
    },
    //去上传按钮
    uploadBtnFn() {
      let _this = this;
      _this.upLoadGuideTip = "2";
      let _customerId = localStorage.getItem("customerId")
        ? localStorage.getItem("customerId")
        : localStorage.getItem("userId");
      if (localStorage.getItem("customerId")) {
        _customerId = localStorage.getItem("customerId");
      } else if (localStorage.getItem("userId")) {
        _customerId = localStorage.getItem("userId");
      } else {
        _customerId = api.getPara().customerId;
      }
      if (_this.upload.has) {
        return;
      } else {
        //是否上传过检测
        checkUpLoadStatus
          .getDataInit({ patientCustomerId: _customerId })
          .then(res => {
            if (
              res &&
              res.responseObject &&
              res.responseObject.responseData &&
              res.responseObject.responseData.dataList
            ) {
              // 上传过
              _this.uploadEvent();
            } else {
              //未上传过
              _this.upLoadTips();
            }
          })
          .catch(err => {
            // _this.toastComm("网络信号差，建议您稍后再试");
            // _this.imgUrl = _this.toastImg.wifi;
          });
      }
    },
    uploadEvent() {
      this.upload.none = false;
      this.upload.has = true;
      this.netTipsNum++;
      let netType = api.getConnectType();
      if (netType !== 1) {
        this.levelShow = true;
      }
    },
    //失败重传图片
    upLoadReload(index) {
      let _this = this,
        _type = 1,
        _files = _this.filesObjAll[index],
        _base64 = _this.base64ArrAll[index];
      _this.reload = true;
      _this.upLoadPic(_files, _type, index, _base64);
    },
    //多图上传
    upLoadPic(files, type, index, base64) {
      let that = this,
        _files = files,
        _imageType = "";
      that.uploading1 = true;
      that.uploading2 = true;
      let _localViewUrl = window.URL.createObjectURL(files);
      let _fileName = "",
        _rex = /\./g;
      if (files.name.match(_rex).length == 1) {
        _fileName = files.name.split(".")[1];
      } else {
        _fileName = files.name.split(".")[2];
      }
      switch (type) {
        case 1:
          _imageType = 0;
          break;
        case 2:
          _imageType = 4;
          break;
      }
      if (typeof index !== "undefined") {
        that["imageList" + type][index] = {
          blob: _localViewUrl,
          imgId: "",
          uploading: true,
          fail: false
        };
      } else {
        that["imageList" + type].unshift({
          blob: _localViewUrl,
          imgId: "",
          uploading: true,
          fail: false
        });
      }
      api.ajax({
        url: XHRList.upload,
        method: "POST",
        data: {
          fileContent: base64
            .split(",")[1]
            .replace(/\+/g, "%2B")
            .replace(/\n/g, ""),
          fileName: files.name,
          extName: _fileName,
          caseId: "",
          imageType: _imageType,
          caseCategoryId: ""
        },
        timeout: 300000,
        done(res) {
          if (res.responseObject.responseStatus) {
            // let num = index ? index : that["imageList" + type].length - 1;
            let num = index ? index : 0;
            that["imageList" + type][num].imgId = res.responseObject.responsePk;
            that["imageList" + type][num].uploading = false;
            that["imageList" + type][num].fail = false;
            that["imageList" + type][num].finish = true;
            //            that["uploading" + type] = false;
            that.uploading1 = false;
            that.uploading2 = false;
            that.$el.querySelectorAll(
              ".tc-upLoadItemList.ev-imgList .ev-loading"
            )[0].style.display =
              "none";
            that.isExistUpLoadFail();
            //上传下一张图片(重传跳过)
            if (!that.reload) {
              that.uploadIndex = parseInt(that.uploadIndex) + 1;
              let totalUpNum = that["imageList" + type].length;
              if (
                that.filesObj[that.uploadIndex] !== "undefined" &&
                that.uploadIndex < that.base64Arr.length &&
                totalUpNum < 50
              ) {
                that.upLoadPic(
                  that.filesObj[that.uploadIndex],
                  type,
                  index,
                  that.base64Arr[that.uploadIndex]
                );
              } else {
                if (that.filesObj[that.uploadIndex]) {
                  that.errorShow = true;
                  that.errorMsg = "图片最多上传50张！";
                  setTimeout(() => {
                    that.errorShow = false;
                    that.errorMsg = "";
                  }, 3000);
                }
              }
            }
          } else {
            //上传失败（网络正常情况）
            that.isExistUpLoadFail();
            let num = index ? index : 0;
            that["imageList" + type][num].uploading = false;
            that["imageList" + type][num].fail = true;
            that["imageList" + type][num].finish = false;
            //            that["uploading" + type] = false;
            that.uploading1 = false;
            that.uploading2 = false;
            //上传下一张图片
            that.uploadIndex = parseInt(that.uploadIndex) + 1;
            let totalUpNum = that["imageList" + type].length;
            if (
              that.filesObj[that.uploadIndex] !== "undefined" &&
              that.uploadIndex < that.base64Arr.length &&
              totalUpNum < 50
            ) {
              that.upLoadPic(
                that.filesObj[that.uploadIndex],
                type,
                index,
                that.base64Arr[that.uploadIndex]
              );
            } else {
              if (that.filesObj[that.uploadIndex]) {
                that.errorShow = true;
                that.errorMsg = "图片最多上传50张！";
                setTimeout(() => {
                  that.errorShow = false;
                  that.errorMsg = "";
                }, 3000);
              }
            }
          }
        },
        fail(res) {
          //上传失败（网络异常）
          that.isReadyLoad = false;
          let num = index ? index : 0;
          that["imageList" + type][num].uploading = false;
          that["imageList" + type][num].fail = true;
          that["imageList" + type][num].finish = false;
          //            that["uploading" + type] = false;
          that.uploading1 = false;
          that.uploading2 = false;
        }
      });
    },
    //是否存在上传失败图片
    isExistUpLoadFail() {
      let _this = this,
        _failNum = 0;
      this.imageList1.forEach((item, index) => {
        if (item.fail) {
          _failNum++;
        }
      });
      if (_failNum > 0) {
        _this.isReadyLoad = false;
      } else {
        _this.isReadyLoad = true;
      }
    },
    textAreaFocus() {
      this.$el.querySelector(".medicineBox").focus();
    },
    // 图片删除
    imgDelete(item, index, type) {
      this.deletePicTip = true;
      this.deletePic.type = type;
      this.deletePic.index = index;
      // this["imageList" + type].splice(index, 1);
    },
    cancelDeletePic() {
      this.deletePic.type = "";
      this.deletePic.index = "";
      this.deletePicTip = false;
    },
    ensureDeletePic() {
      let _deletePic = this.deletePic;
      this["imageList" + _deletePic.type].splice(_deletePic.index, 1);
      this.filesObjAll.splice(_deletePic.index, 1);
      this.base64ArrAll.splice(_deletePic.index, 1);
      this.deletePicTip = false;
    },
    //上传指导页
    upLoadTips() {
      store.commit("setbottomNav", false);
      this.$router.push({
        name: "upLoadTip"
      });
    },
    //取消
    cancelEvent() {
      this.levelShow = false;
    },
    //提交取消
    subCancelEvent() {
      this.submitTip = false;
    },
    //确定
    ensureEvent() {
      this.levelShow = false;
    },
    //查看大图
    showBigImg(item, index, type) {
      let _params = {
        imgBlob: this["imageList" + type],
        indexNum: index
      };
      store.commit("setbottomNav", false);
      this.$router.push({
        name: "showBigImg",
        params: _params
      });
    },
    //跳过指导
    skipCallBackFn() {
      console.log("已跳过");
    },
    // 提交校验
    submitParamsInstall() {
      if (!this.validateParamsFull()) {
        return false;
      } else if (this.uploading1 || this.uploading1) {
        //图片上传中
        this.errorShow = true;
        this.errorMsg = "图片上传中...";
        setTimeout(() => {
          this.errorMsg = "";
          this.errorShow = false;
        }, 1000);
      } else {
        this.submitData();
        //跳转第四部分
        // this.$router.push({
        //   name:"bodyMessage"
        // });

        // 提示用户提交后不可修改提交内容
        // if (localStorage.getItem("PCIMLinks") !== null) {
        //   this.backPopupShow = true;
        // } else {
        //   this.backPopupShow = false;
        //   this.submitTip = true;
        // }
      }
    },
    //toast提示方法
    toastCommonTips(content) {
      let _this = this;
      _this.errorShow = true;
      _this.errorMsg = content;
      setTimeout(() => {
        _this.errorMsg = "";
        _this.errorShow = false;
      }, 3000);
    },
    //提交数据
    submitData() {
      this.submitTip = false;
      //全结果验证通过 参数装载开始...
      let joinImageDataList = function(list) {
        let result = [];
        list.forEach((element, index) => {
          result.push(element.imgId);
        });
        return result.join(",");
      };
      if (this.visit.has) {
        this.allParams.treatmentHospitalId = this.hospitalMessage.id || "";
        this.allParams.treatmentHospital = this.hospitalMessage.id
          ? this.hospitalMessage.name
          : "";
        this.allParams.illnessHistoryId = this.diseaseMessage.id || "";
        this.allParams.illnessHistory = this.diseaseMessage.id
          ? this.diseaseMessage.name
          : "";
      } else {
        this.allParams.treatmentHospitalId = "";
        this.allParams.treatmentHospital = "";
        this.allParams.illnessHistoryId = "";
        this.allParams.illnessHistory = "";
      }
      if (this.upload.has) {
        this.allParams.inspectionAttId =
          joinImageDataList(this.imageList1) || "";
        this.allParams.affectedAttId = joinImageDataList(this.imageList2) || "";
      } else {
        this.allParams.inspectionAttId = "";
        this.allParams.affectedAttId = "";
      }
      if (this.medical.has) {
        this.allParams.takeMedicine = this.medicalMessage || "";
      } else {
        this.allParams.takeMedicine = "";
      }
      //装载完成...
      //数据提交开始...
      //跳转第四部分
      this.$router.push({
        name: "bodyMessage",
        params: {
          pageParam: this.allParams,
          height: this.$route.params.height,
          weight: this.$route.params.weight,
          sex: this.$route.params.sex
        }
      });
      // this.paramsSubmit();
    },
    // 填写情况验证
    validateParamsFull() {
      if (!this.visit.none && !this.visit.has) {
        this.validateToast("您还有问题未完善");
        document.body.scrollTop = this.$el.querySelector(
          ".questionItem-common.isComeCure"
        ).offsetTop;
        return false;
      } else if (this.visit.has && !this.hospitalMessage.id) {
        this.validateToast("请选择最近一次就诊医院");
        document.body.scrollTop = this.$el.querySelector(
          ".questionItem-common.isComeCure"
        ).offsetTop;
        return false;
      }

      if (!this.upload.none && !this.upload.has) {
        this.validateToast("您还有问题未完善 ");
        document.body.scrollTop = this.$el.querySelector(
          ".questionItem-common.upLoadResource"
        ).offsetTop;
        return false;
      } else if (
        this.upload.has &&
        (this.imageList1.length === 0 && this.imageList2.length === 0)
      ) {
        this.validateToast("请上传检查资料或患处照片");
        document.body.scrollTop = this.$el.querySelector(
          ".questionItem-common.upLoadResource"
        ).offsetTop;
        return false;
      }

      if (!this.medical.none && !this.medical.has) {
        this.validateToast("您还有问题未完善");
        document.body.scrollTop = this.$el.querySelector(
          ".questionItem-common.isUseDrug"
        ).offsetTop;
        return false;
      } else if (this.medical.has && this.medicalMessage.length === 0) {
        this.validateToast("请填写药物名称");
        return false;
      }
      //是否存在上传失败的图片
      let _failNum = 0;
      for (let item of this.imageList1) {
        if (item.fail) {
          _failNum++;
        }
      }
      if (_failNum > 0) {
        this.validateToast("请完成未上传成功的图片");
        return false;
      }
      return true;
    },
    validateToast(content) {
      this.errorShow = true;
      this.errorMsg = content;
      setTimeout(() => {
        this.errorShow = false;
      }, 2000);
    },
    contentLimit() {
      if (this.medicalMessage.length > 500) {
        this.medicalMessage = this.medicalMessage.substring(0, 500);
        this.validateToast("最多只能输入500字");
      }
    },
    getByteLen(len) {
      if (500 - len <= 0) {
        return 0;
      } else {
        return 500 - len;
      }
    },
    clearPageData() {
      let _this = this;
      _this.visit.has = false;
      _this.visit.none = false;
      _this.diseaseMessage.id = "";
      _this.diseaseMessage.name = "医生给出的诊断(未确诊可不选)";
      _this.hospitalMessage.id = "";
      _this.hospitalMessage.name = "最近一次就诊的医院";
      _this.upload.has = false;
      _this.upload.none = false;
      _this.imageList1 = [];
      _this.imageList2 = [];
      _this.medical.has = false;
      _this.medical.none = false;
      _this.medicalMessage = "";
    }
  },
  components: {
    loading,
    toast,
    confirm,
    backPopup,
    progerssBar
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";

$main-color: #00d6c6;

html,
body {
  height: 100%;
}

body {
  /*background:url("../../../common/image/background_wave.png") no-repeat bottom center;*/
  /*background-size:100% rem(272px);*/
}

//咨询问题第二页
.consult-main-inner {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  min-height: 100%;
  background: url("../../../common/image/background_wave.png") no-repeat bottom
    center #f2f2f2;
  background-size: 100% rem(272px);
  border-radius: rem(8px);
  .consult-wrapper {
    padding: rem(30px);
  }
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
  //页内公共样式
  .questionContainMain {
    border-radius: 16px;
    background-color: #ffffff;
    .questionItem-common {
      padding-bottom: rem(68px);
      &:first-child {
        padding-top: rem(54px);
      }
      &:last-child {
        padding-bottom: rem(80px);
      }
      //问题标题
      .questionTitleCommon {
        position: relative;
        @include font-dpr(20px);
        padding: 0 rem(64px);
        color: #222222;
        font-weight: bold;
        &:after {
          position: absolute;
          content: "";
          display: inline-block;
          width: rem(16px);
          height: rem(16px);
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          border-radius: 50px;
          background-color: #2fc5bd;
          left: rem(32px);
          top: 50%;
          margin-top: rem(-8px);
        }
        .qu-upLoadTips {
          position: absolute;
          content: "";
          width: rem(48px);
          height: rem(48px);
          right: rem(23px);
          top: 50%;
          margin-top: rem(-24px);
          background: url("../../../common/image/img00/consult_V1.2/doubt2@2x.png")
            no-repeat center;
          background-size: 100% 100%;
        }
      }
      //单选按钮
      .questionContain-center {
        @include clearfix();
        padding: rem(64px) rem(28px) rem(16px);
        .questionSelectBtn {
          width: rem(284px);
          @include font-dpr(18px);
          padding: rem(20px) 0;
          text-align: center;
          float: left;
          border: 1px solid #ececec;
          border-radius: 100px;
          &.selected-right {
            float: right;
          }
          &.selected {
            border: 1px solid #2fc5bd;
            color: #2fc5bd;
          }
        }
      }
      //隐藏域内容样式
      .questionHiddenCommon {
        @include font-dpr(16px);
        //display: none;
        padding: rem(20px) rem(80px);
        background-color: #e5e5e5;
        p {
          color: #666666;
          //            @include ellipsis();
          &.selected {
            color: #07b6ac;
          }
        }
        .selected-HospitalBtn {
          border-bottom: 1px solid #d5d5d5;
        }
        .selected-HospitalBtn,
        .selected-cureBtn {
          position: relative;
          padding: rem(38px) 0;
          &:after {
            position: absolute;
            display: block;
            content: "";
            width: rem(36px);
            height: rem(36px);
            right: 0;
            top: 50%;
            margin-top: rem(-18px);
            background: url("../../../common/image/img00/consult_V1.2/arrow@2x.png")
              no-repeat center;
            background-size: 100% 100%;
          }
        }
        //输入框
        .medicineBox {
          @include font-dpr(16px);
          width: 100%;
          padding-bottom: rem(16px);
          height: 0.6rem;
          max-height: 1.3rem;
          outline: medium;
          background: #e5e5e5;
          border: none;
          border: none;
          @include placeholder() {
            color: #aaaaaa;
          }
        }
        .qu-underline {
          display: block;
          height: rem(2px);
          width: 100%;
          background-color: #d5d5d5;
          margin-bottom: rem(16px);
        }
        .qu-setMedicineTipText {
          @include font-dpr(12px);
          color: #aaaaaa;
        }
        //选择医院隐藏域
        &.selectHospitalBox {
          padding: rem(20px) rem(60px) rem(20px) rem(100px);
        }
        //填写药物隐藏域
        &.qu-setMedicineBox {
          padding: rem(60px) rem(60px) rem(60px) rem(106px);
          position: relative;
          .limit {
            position: absolute;
            right: rem(60px);
            bottom: rem(60px);
            color: #0ab375;
            @include font-dpr(12px);
          }
        }
      }
      .upLoadForPerson {
        @include font-dpr(15px);
        color: #555555;
        position: relative;
        padding-left: rem(64px);
        padding-top: rem(5px);
        .upLoadForPersonIcon {
          position: absolute;
          content: "";
          width: rem(18px);
          height: rem(18px);
          left: rem(32px);
          top: 50%;
          margin-top: rem(-9px);
          background: url("../../../common/image/img00/consult_V1.2/uploadStar.png")
            no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
  }
  //底部按钮
  .questionSubmitBtnBox {
    text-align: center;
    padding-top: rem(76px);
    padding-bottom: rem(68px);
    .questionSubmitBtn {
      @include font-dpr(20px);
      width: rem(560px);
      height: rem(100px);
      line-height: rem(100px);
      background-color: #2fc5bd;
      text-align: center;
      color: #ffffff;
      border-radius: rem(9999px);
      box-shadow: 0 rem(4px) rem(12px) 0 rgba(47, 197, 189, 0.4);
      //margin:0 auto;
    }
  }
}

//upload tips
.qu-upLoadGuide {
  > img {
    width: 100%;
  }
}

.upLoadBox {
  .upLoadCommon-box-s {
    padding-bottom: rem(16px);
    .qu-upFormBox-s {
      margin-bottom: rem(26px);
      .qu-upLoadTitle-s {
        position: relative;
        .tc-upLoadTitleName {
          @include font-dpr(16px);
          color: #666666;
          padding-top: rem(40px);
        }
        .qu-upLoadTips {
          @include font-dpr(14px);
          color: #2fc5bd;
          position: relative;
          margin-top: rem(26px);
          margin-bottom: rem(14px);
          padding-left: rem(48px);
          overflow: visible;
          &::after {
            position: absolute;
            content: "";
            width: rem(48px);
            height: rem(48px);
            left: 0;
            top: 50%;
            margin-top: rem(-24px);
            background: url("../../../common/image/img00/consult_V1.2/doubt2@2x.png")
              no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
      .qu-upLoadItemBox-s {
        @include clearfix();
        padding-left: rem(26px);
        //每个上传图片缩略图
        .qu-upLoadItemList-s {
          position: relative;
          width: rem(136px);
          height: rem(136px);
          float: left;

          margin-right: rem(30px);
          margin-top: rem(30px);
          img {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .qu-upLoadCover-s {
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            width: rem(136px);
            height: rem(136px);
            //margin-top:rem(8px);
            //margin-left:rem(8px);
            background-color: #545454;
            opacity: 0.63;
            z-index: 0;
          }
          .qu-upLoadDel-s {
            display: none;
            position: absolute;
            //display: inline-block;
            width: rem(60px);
            height: rem(60px);
            top: 0;
            right: 0;
            background: url("../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png")
              no-repeat;
            background-position: top right;
            background-size: rem(38px) rem(38px);
            z-index: 1;
          }
          .qu-upLoading-s {
            position: absolute;
            width: rem(40px);
            height: rem(40px);
            top: 50%;
            left: 50%;
            margin-top: rem(-20px);
            margin-left: rem(-20px);
            background: url("../../../common/image/img00/patientConsult/symptom_photo_loading@2x.png")
              no-repeat center;
            background-size: 100% 100%;
            animation: submitIng 1s linear infinite;
            -webkit-animation: submitIng 1s linear infinite;
            @keyframes submitIng {
              0% {
                -webkit-transform: rotate(0deg);
              }
              100% {
                -webkit-transform: rotate(360deg);
              }
            }
          }
          .qu-upLoadAfresh-s {
            color: #ffffff;
            position: absolute;
            width: rem(40px);
            height: rem(40px);
            top: 50%;
            left: 50%;
            margin-top: rem(-20px);
            margin-left: rem(-20px);
            background: url("../../../common/image/img00/patientConsult/symptom_refresh_loading@2x.png")
              no-repeat center;
            background-size: 100% 100%;
          }
          .qu-upLoadAfreshText-s {
            @include font-dpr(12px);
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: rem(-17px);
            margin-left: rem(-76px);
            //bottom: rem(30px);
            color: #ffffff;
            width: rem(152px);
            text-align: center;
            z-index: 1;
          }
          .qu-fileUpRefresh-s {
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            width: rem(136px);
            height: rem(136px);
            //margin-top:rem(8px);
            //margin-left:rem(8px);
            z-index: 2;
          }
        }
        //原始样式
        .tc-upLoadItemList {
          width: rem(136px);
          height: rem(136px);
          float: left;
          display: inline-block;
          position: relative;
          vertical-align: top;
          margin-top: rem(30px);
          margin-right: rem(25px);
          border: rem(1px) solid #2fc5bd;

          & > img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
          //上传失败
          .upload-fail {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0.83;
            background: #545454;
            & > input {
              opacity: 0;
              width: 100%;
              height: 100%;
            }
            & > p {
              @include font-dpr(12px);
              color: #ffffff !important;
              text-align: center;
              position: absolute;
              top: 50%;
              width: 100%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }

        .tc-upLoadDel {
          position: absolute;
          width: 0.8rem;
          height: 0.8rem;
          top: 0;
          right: 0;
          background: url(../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png)
            no-repeat;
          background-position: top right;
          background-size: 0.50667rem 0.50667rem;
          z-index: 1;
        }

        .tc-upLoadItemList {
          position: relative;
          float: left;
          .ev-loading {
            position: absolute;
            opacity: 0.83;
            background: #545454;
            .middle-tip-modal {
              position: absolute;
            }
          }
        }
        //上传按钮
        .ev-upLoadAdd {
          box-sizing: border-box;
          width: rem(136px);
          height: rem(136px);
          float: left;
          text-align: center;
          position: relative;
          display: inline-block;
          vertical-align: top;
          margin-top: rem(30px);
          //padding:rem(8px);
          background: url("../../../common/image/img00/consult_V1.2/addto@2x.png")
            center;
          background-size: contain;
          //span{
          //  display: block;
          //  width: rem(136px);
          //  height: rem(136px);
          //  background: url("/image/img00/patientConsult/addto@2x.png");
          //  background-size: 100% 100%;
          //
          //}
        }
        //上传初始化input
        .ev-upLoadInput {
          opacity: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    .upLoadContentNum {
      @include font-dpr(14px);
      color: #666666;
      .upLoadViewAll {
        color: #07b6ac;
      }
    }
  }
}

.fadeRight-enter-active,
.fadeRight-leave-active {
  transition: all ease-in-out 0.5s;
  transform: translateX(0);
}

.fadeRight-enter,
.fadeRight-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
