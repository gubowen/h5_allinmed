<template>
  <section class="consult-main-inner">
    <section class="consult-wrapper" v-show="!showSelectHospital&&!showSelectDisease&&!upLoadTip">
      <span class="consult-page page-two"></span>
      <section class="questionContainMain">
        <section class="questionItem-common">
          <p class="questionTitleCommon">有去医院就诊过吗？</p>
          <section class="questionContain-center">
            <p class="questionSelectBtn" @click="visit.none=true;visit.has=false" :class="{'selected':visit.none}">
              没有</p>
            <p class="questionSelectBtn selected-right" @click="visit.none=false;visit.has=true"
               :class="{'selected':visit.has}">有</p>
          </section>
          <section class="questionHiddenCommon selectHospitalBox" v-show="visit.has">
            <p class="selected-HospitalBtn" @click="selectHospital()" :class="{'selected':hospitalMessage.id}">
              {{hospitalMessage.name}}</p>
            <p class="selected-cureBtn" @click="selectDisease()" :class="{'selected':diseaseMessage.id}">
              {{diseaseMessage.name}}</p>
          </section>
        </section>
        <section class="questionItem-common upLoadResource">
          <p class="questionTitleCommon">有患病处照片或检查资料吗？</p>
          <section class="questionContain-center">
            <p class="questionSelectBtn" @click="upload.none=true;upload.has=false" :class="{'selected':upload.none}">
              没有</p>
            <p class="questionSelectBtn selected-right" @click="uploadEvent" :class="{'selected':upload.has}">有</p>
          </section>
          <section class="questionHiddenCommon upLoadBox" v-show="upload.has">
            <section class="tc-upLoadBox upLoadCommon-box-s">
              <form class="qu-upFormBox qu-upFormBox-s" action="">
                <figure class="qu-upLoadTitle qu-upLoadTitle-s">
                  <p class="tc-upLoadTitleName">请上传X光片/超声/CT等检查资料，便于医生为您准确诊断</p>
                  <p class="qu-upLoadTips" @click="upLoadTips()">如何清晰拍摄影像资料？查看教程</p>
                </figure>
                <ul class="qu-upLoadItemBox qu-upLoadItemBox-s docInt">
                  <li class="tc-upLoadItemList ev-imgList success" v-for="(item,index) in imageList1">
                    <img alt="" @click="showBigImg(item,index,1)" :src="item.blob">
                    <span class="tc-upLoadDel" style="cursor: pointer" @click="imgDelete(item,index,1)"
                          v-show="item.finish"></span>
                    <loading v-if="item.uploading"></loading>
                    <figure class="upload-fail" v-if="item.fail">
                      <p>重新上传</p>
                      <input class="ev-upLoadInput" accept="image/gif,image/jpeg,image/jpg,image/png" type="file"
                             @change="onFileChange($event,1,index)">
                    </figure>
                  </li>
                  <li class="ev-upLoadAdd" v-if="uploading1===false&&imageList1.length<9">
                    <input class="ev-upLoadInput" accept="image/gif,image/jpeg,image/jpg,image/png" type="file"
                           @change="onFileChange($event,1)">
                  </li>
                </ul>
              </form>
              <form class="qu-upFormBox qu-upFormBox-s" action="">
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
                      <input class="ev-upLoadInput" accept="image/gif,image/jpeg,image/jpg,image/png" type="file"
                             @change="onFileChange($event,2,index)">
                    </figure>
                  </li>
                  <li class="ev-upLoadAdd" v-if="uploading2===false&&imageList2.length<9">
                    <input class="ev-upLoadInput" accept="image/gif,image/jpeg,image/jpg,image/png" type="file"
                           @change="onFileChange($event,2)">
                  </li>
                </ul>
              </form>
            </section>
          </section>
        </section>
        <section class="questionItem-common">
          <p class="questionTitleCommon">有正在使用的药物吗？</p>
          <section class="questionContain-center">
            <p class="questionSelectBtn" @click="medical.none=true;medical.has=false"
               :class="{'selected':medical.none}">
              没有</p>
            <p class="questionSelectBtn selected-right" @click="medical.none=false;medical.has=true"
               :class="{'selected':medical.has}">有</p>
          </section>
          <section class="questionHiddenCommon qu-setMedicineBox" @click="textAreaFocus" v-show="medical.has">
            <textarea class="medicineBox" name="medicine" placeholder="填写药物名称" v-model="medicalMessage"
                      @input="contentLimit"></textarea>
            <span class="qu-underline"></span>
            <p class="limit" v-show="getByteLen(medicalMessage)<=100">{{getByteLen(medicalMessage)}}</p>
            <p class="qu-setMedicineTipText">填写示例:三七片、接骨七厘散</p>
          </section>
        </section>
      </section>
      <section class="questionSubmitBtnBox">
        <button class="questionSubmitBtn" @click="submitParamsInstall">填好了</button>
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
  </section>
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
  import api from 'common/js/util/util';
  import loading from 'components/loading';
  import toast from 'components/toast';
  import autosize from 'autosize';
  import axios from "axios";
  import confirm from 'components/confirm';

  const XHRList = {
    upload: "/mcall/customer/patient/case/attachment/v1/create/",
    create: "/mcall/customer/patient/case/v2/create/",
    triage: "/mcall/customer/case/consultation/v1/createConsultation/"
  };
  export default{
    data () {
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
        finish: false,
        upLoadTip: false,
        levelShow: false,
        uploading1: false,
        uploading2: false,
        imageList1: [],
        imageList2: [],
        netTipsNum: 0,
        cityLevel: 2,
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
        allParams: {
          operatorType: 0,
          illnessHistoryId: "",
          illnessHistory: "",
          treatmentHospital: "",
          treatmentHospitalId: "",
          caseType: 0,
          affectedAttId: "",
          inspectionAttId: "",
          visitSiteId: 13,
          takeMedicine: "",
          complication: "",
          optionList: [],
          customerId: "",
          patientId: "",
        }
      }
    },
    activated(){
      this.finish = false;
      this.initData();
       document.title = "描述病情";
    },
    mounted(){
      document.title = "描述病情";
      document.body.scrollTop = 0;
      autosize(this.$el.querySelector(".medicineBox"));
      localStorage.setItem("hasCome", 0);
    },
    methods: {
      initData () {
        if (this.$route.params.optionList){
          let params;

          if (JSON.stringify(this.$route.params) === "{}") {
            params = JSON.parse(localStorage.getItem("submitParams"))
          } else {
            params = this.$route.params;
            localStorage.setItem("submitParams", JSON.stringify(params))
          }
          this.allParams.customerId = params.userId;
          this.allParams.complication = params.complication;
          this.allParams.optionList = JSON.stringify(params.optionList);
          this.allParams.patientId = params.patientId;
        }

        if (this.$route.params.from==="disease") {
          this.diseaseMessage = this.$route.params.baseMessage;
        }

        if (this.$route.params.from==="hospital") {
          this.hospitalMessage = this.$route.params.baseMessage;
        }

      },
      selectHospital () {
        this.$router.push({
          name: 'searchList',
          params: {
            listType: 'hospital',
            level: 2,
            from: this.$route.name,
          },
          query: this.$route.query
        })
      },
      selectDisease () {
        this.$router.push({
          name: 'searchList',
          params: {
            listType: 'disease',
            level: 2,
            from: this.$route.name,
          },
          query: this.$route.query
        })
      },
      onFileChange(e, type, index) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        if (files[0].size > 1024 * 1024 * 5) {
          this.errorShow = true;
          this.errorMsg = "图片不能超过5M";
          setTimeout(() => {
            this.errorMsg = '';
            this.errorShow = false
          }, 3000);
        } else {
          this.upLoadPic(files, type, index);
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
      upLoadPic: function (files, type, index) {
        let that = this,
          _files = files,
          _imageType = '',
          _data = new FormData();
        switch (type) {
          case 1:
            _imageType = 0;
            break;
          case 2:
            _imageType = 4;
            break;
        }
        _data.append('file', _files[0]);
        _data.append('paramJson', JSON.stringify({
          caseId: "",
          imageType: _imageType,
          caseCategoryId: ''
        }));
        let blob = window.URL.createObjectURL(_files[0]);

//        this["uploading" + type] = true;
        this.uploading1 = true;
        this.uploading2 = true;

        if (typeof index !== "undefined") {
          that["imageList" + type][index] = {
            blob: blob,
            imgId: "",
            uploading: true,
            fail: false
          };
        } else {
          that["imageList" + type].push({
            blob: blob,
            imgId: "",
            uploading: true,
            fail: false
          });
        }
        axios({
          url: XHRList.upload,
          method: "post",
          data: _data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 30000,
        }).then((res) => {
          if (res.data.responseObject.responseStatus) {
            let num = index ? index : that["imageList" + type].length - 1;
            that["imageList" + type][num].imgId = res.data.responseObject.responsePk;
            that["imageList" + type][num].uploading = false;
            that["imageList" + type][num].fail = false;
            that["imageList" + type][num].finish = true;
//            that["uploading" + type] = false;
            this.uploading1 = false;
            this.uploading2 = false;
            that.$el.querySelectorAll(".tc-upLoadItemList.ev-imgList .ev-loading")[0].style.display = "none";
          } else {
            let num = index ? index : that["imageList" + type].length - 1;
            that["imageList" + type][num].uploading = false;
            that["imageList" + type][num].fail = true;
            that["imageList" + type][num].finish = false;
//            that["uploading" + type] = false;
            this.uploading1 = false;
            this.uploading2 = false;
          }
        },(err) => {
          let num = index ? index : that["imageList" + type].length - 1;
          that["imageList" + type][num].uploading = false;
          that["imageList" + type][num].fail = true;
          that["imageList" + type][num].finish = false;
//            that["uploading" + type] = false;
          this.uploading1 = false;
          this.uploading2 = false;
          console.log("net error")
        });
      },
      textAreaFocus () {
        this.$el.querySelector(".medicineBox").focus();
      },
      // 图片删除
      imgDelete(item, index, type){
        this["imageList" + type].splice(index, 1);
      },
      //上传指导页
      upLoadTips(){
        this.$router.push({
          name: "upLoadTip",
          params: ''
        });
      },
      //取消
      cancelEvent(){
        this.levelShow = false;
      },
      //确定
      ensureEvent(){
        this.levelShow = false;
      },
      //查看大图
      showBigImg(item, index, type){
        let _params = {
          imgBlob: this["imageList" + type],
          indexNum: index
        };
        this.$router.push({
          name: "showBigImg",
          params: _params
        });
      },
      // 提交参数装载
      submitParamsInstall(){

        let joinImageDataList = function (list) {
          let result = [];
          list.forEach((element, index) => {
            result.push(element.imgId);
          });
          return result.join(",");
        };
        if (!this.validateParamsFull()) {
          return false;
        } else { //全结果验证通过 参数装载开始...
          this.allParams.inspectionAttId = joinImageDataList(this.imageList1) || "";
          this.allParams.affectedAttId = joinImageDataList(this.imageList2) || "";
          this.allParams.treatmentHospitalId = this.hospitalMessage.id || "";
          this.allParams.treatmentHospital = this.hospitalMessage.id ? this.hospitalMessage.name : "";
          this.allParams.illnessHistoryId = this.diseaseMessage.id || "";
          this.allParams.illnessHistory = this.diseaseMessage.id ? this.diseaseMessage.name : "";
          this.allParams.takeMedicine = this.medicalMessage || "";

          //装载完成...
          //数据提交开始...
          this.paramsSubmit();
        }
      },
      paramsSubmit(){
        const that = this;
        this.finish=true;
        api.ajax({
          url: XHRList.create,
          method: "POST",
          data: this.allParams,
          beforeSend: function () {

          },
          timeout: 20000,
          done(data) {
            if (data.responseObject.responsePk !== 0) {
              const caseId = data.responseObject.responsePk;
              that.getTriageDoctorId(caseId);
            }
          }
        })
      },
      // 获取分流ID
      getTriageDoctorId(caseId) {
        const that = this;
        api.ajax({
          url: XHRList.triage,
          method: "POST",
          data: {
            caseId,
            isShunt: 1
          },
          beforeSend () {

          },
          done(data) {
            if (data.responseObject.responseStatus) {


              localStorage.removeItem("selectList");
              localStorage.removeItem("secondList");
              localStorage.removeItem("questionList");
              localStorage.removeItem("complication");

              that.finish=false;
              window.location.href = '/dist/imScene.html?caseId=' + caseId + '&shuntCustomerId=' + data.responseObject.responseData.shuntCustomerId + '&from=health' + '&patientId=' + that.allParams.patientId + '&customerId=' + that.allParams.customerId+'&from=health';
            }
          }
        })
      },
      // 填写情况验证
      validateParamsFull() {
        if (!this.visit.none && !this.visit.has) {
          this.validateToast("您还有问题未完善");
          return false;
        } else if (this.visit.has && !this.hospitalMessage.id) {
          this.validateToast("请选择最近一次就诊医院");
          return false;
        }

        if (!this.upload.none && !this.upload.has) {
          this.validateToast("您还有问题未完善 ");
          return false;
        } else if (this.upload.has && (this.imageList1.length === 0 && this.imageList2.length === 0)) {
          this.validateToast("请上传检查资料或患处照片");
          return false;
        }

        if (!this.medical.none && !this.medical.has) {
          this.validateToast("您还有问题未完善");
          return false;
        } else if (this.medical.has && this.medicalMessage.length === 0) {
          this.validateToast("请填写药物名称");
          return false;
        }

        return true;
      },
      validateToast(content){
        this.errorShow = true;
        this.errorMsg = content;
        setTimeout(() => {
          this.errorShow = false;
        }, 2000);
      },
      contentLimit(){
        if (api.getByteLen(this.medicalMessage) > 1000) {
          this.medicalMessage = api.getStrByteLen(this.medicalMessage,1000);
          this.validateToast("最多只能输入500字")
        }
      },
      getByteLen(len){
        return 1000-api.getByteLen(len);
      }
    },
    components: {
      selectArea,
      loading,
      toast,
      confirm
    },
  }


</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  $main-color: #00D6C6;

  html, body {
    height: 100%;
  }
  body{
    /*background:url("../../../common/image/background_wave.png") no-repeat bottom center;*/
    /*background-size:100% rem(272px);*/
  }

  //咨询问题第二页
  .consult-main-inner {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    min-height: 100%;
    background:url("../../../common/image/background_wave.png") no-repeat bottom center #F2F2F2;
    background-size:100% rem(272px);
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
            content: '';
            display: inline-block;
            width: rem(16px);
            height: rem(16px);
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            background-color: #2FC5BD;
            left: rem(32px);
            top: 50%;
            margin-top: rem(-8px);
          }

        }
        //单选按钮
        .questionContain-center {
          @include clearfix();
          padding: rem(64px) rem(28px) rem(16px);
          .questionSelectBtn {
            width: rem(284px);
            @include font-dpr(16px);
            padding: rem(20px) 0;
            text-align: center;
            float: left;
            border: 2px solid #ECECEC;
            border-radius: 100px;
            &.selected-right {
              float: right;
            }
            &.selected {
              border: 2px solid #2FC5BD;
              color: #2FC5BD;
            }
          }
        }
        //隐藏域内容样式
        .questionHiddenCommon {
          @include font-dpr(16px);
          //display: none;
          padding: rem(20px) rem(80px);
          background-color: #E5E5E5;
          p {
            color: #666666;
            @include ellipsis();
            &.selected {
              color: #07B6AC;
            }
          }
          .selected-HospitalBtn {
            border-bottom: 1px solid #D5D5D5;
          }
          .selected-HospitalBtn, .selected-cureBtn {
            position: relative;
            padding: rem(20px) 0;
            &:after {
              position: absolute;
              display: block;
              content: '';
              width: rem(28px);
              height: rem(28px);
              right: 0;
              top: 50%;
              margin-top: rem(-14px);
              background: url("../../../common/image/img00/consult_V1.2/arrow@2x.png") no-repeat center;
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
            background: #E5E5E5;
            border: none;
            @include placeholder() {
              color: #AAAAAA;
            }
          }
          .qu-underline {
            display: block;
            height: rem(2px);
            width: 100%;
            background-color: #D5D5D5;
            margin-bottom: rem(16px);
          }
          .qu-setMedicineTipText {
            @include font-dpr(12px);
            color: #AAAAAA;
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
        background-color: #2FC5BD;
        text-align: center;
        color: #ffffff;
        border-radius: rem(9999px);
        box-shadow: 0 rem(4px) rem(12px) 0 rgba(47, 197, 189, 0.40);
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
            color: #2FC5BD;
            position: relative;
            margin-top: rem(26px);
            margin-bottom: rem(14px);
            padding-left: rem(48px);
            &::after {
              position: absolute;
              content: '';
              width: rem(48px);
              height: rem(48px);
              left: 0;
              top: 50%;
              margin-top: rem(-24px);
              background: url("../../../common/image/img00/consult_V1.2/doubt@2x.png") no-repeat center;
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
              background: url("../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png") no-repeat;
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
              background: url("../../../common/image/img00/patientConsult/symptom_photo_loading@2x.png") no-repeat center;
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
              background: url("../../../common/image/img00/patientConsult/symptom_refresh_loading@2x.png") no-repeat center;
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
            border: rem(1px) solid #2FC5BD;

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
                color: #FFFFFF !important;
                text-align: center;
                position: absolute;
                top: 50%;
                width: 100%;
                left: 50%;
                transform: translate(-50%, -50%)

              }
            }
          }

          .tc-upLoadDel {
            position: absolute;
            width: 0.8rem;
            height: 0.8rem;
            top: 0;
            right: 0;
            background: url(../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png) no-repeat;
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
            background: url("../../../common/image/img00/consult_V1.2/addto@2x.png") center;
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
    }
  }

  .fadeRight-enter-active, .fadeRight-leave-active {
    transition: all ease-in-out .5s;
    transform: translateX(0);
  }

  .fadeRight-enter, .fadeRight-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateX(100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
