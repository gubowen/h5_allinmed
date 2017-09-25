<template>
  <section class="upload-wrapper">
    <section class="main-inner tc-upLoadFile ev-delete">
      <section class="tc-upLoadBox" v-for="(item,index) in uploadList">
        <figure class="tc-upLoadTitle ev-upLoadList">
          <span class="tc-upLoadTitleName" :data-treatmentid="item.adviceId"
                :data-advicetype="item.adviceType">{{item.adviceName}}</span>
          <span class="tc-upLoadRightIcon"></span>
          <span class="tc-upLoadRightCover"></span>
          <input class="ev-upLoadInput" accept="image/gif,image/jpeg,image/jpg,image/png" type="file"
                 @change="onFileChange(item,0,$event)" v-if="imageList[item.adviceId].length===0">
        </figure>
        <ul class="tc-upLoadItemBox docInt" v-show="imageList[item.adviceId].length>0">
          <li class="tc-upLoadItemList ev-imgList success" v-for="(img,imgIndex) in imageList[item.adviceId]">
            <img alt="" @click="showBigImg(img,imgIndex,1)" :src="img.blob">
            <span class="tc-upLoadDel" style="cursor: pointer"
                  @click="imgDelete(img,imgIndex,item.adviceId)"
                  v-show="img.uploading==false"></span>
            <div v-show="img.uploading">
              <span class="tc-upLoadCover"></span>
              <span class="tc-upLoading"></span>
              <span class="tc-upLoadDel" style="cursor: pointer"></span>
              <span class="tc-upLoadAfreshText">等待上传</span>
            </div>
            <figure class="upload-fail" v-if="item.fail">
              <p>重新上传</p>
              <input class="ev-upLoadInput" accept="image/gif,image/jpeg,image/jpg,image/png" type="file"
                     @change="onFileChange(img,imgIndex,$event)"
                     v-show="imageList[item.adviceId].length>0 && img.finish">
            </figure>
          </li>
          <li class="tc-upLoadAdd" style="display: list-item;" v-if="imageList[item.adviceId].length>0&&!loading&&imageList[item.adviceId].length<9">
            <a href="javascript:;">
              <span class="tc-upLoadAddMore">
                <input class="ev-upLoadInput"
                       accept="image/gif,image/jpeg,image/jpg,image/png"
                       type="file"
                       @change="onFileChange(item,imageList[item.adviceId].length,$event)"/>
              </span>
            </a>
          </li>
        </ul>
      </section>
      <footer class="tc-upLoadSubmit">
        <button class="tc-submitBtn" v-if="submitFlag" @click="backToImPage">提交</button>
        <button class="tc-submitDisabled" v-if="!submitFlag">提交</button>
      </footer>
    </section>
    <transition name="fade">
      <Toast :content="errorMsg" v-if="errorShow"></Toast>
    </transition>
    <transition name="fade">
      <!--图片上传离开的confirm-->
      <confirm
        :confirmParams="leaveConfirmParams"
        v-if="leaveConfirm"
        :showFlag.sync="leaveConfirm"
        @cancelClickEvent="cancelEvent()"
        @ensureClickEvent="ensureEvent()">
      </confirm>
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
   * Created by qiangkailiang on 2017/8/21.
   */
  import axios from "axios";
  import api from "common/js/util/util";
  import store from "../store/store";
  import confirm from 'components/confirm';
  import Loading from 'components/loading';
  import Toast from 'components/toast';

  const XHRList = {
    imgCreate: "/mcall/customer/patient/case/attachment/v1/create/",
    imgDelete: "/mcall/customer/patient/case/attachment/v1/update/",
    resetTime: "/mcall/customer/case/consultation/v1/updateFrequency/",
    updateCase: "/mcall/customer/patient/case/v1/update/"
  };
  export default{
    data(){
      return {
        leaveConfirm:false,
        leaveConfirmParams:{},//离开confirm的参数
        pageLeaveEnsure:false,//是否离开页面
        uploadList: [],
        imageListLength:false,//图片列表中是否有图片
        imageList: {},
        toClick:false,//提交按钮是否可以点击
        errorShow: false,
        errorMsg: "",
        loading: false,//是否正在上传
      }
    },
    computed: {
      //计算提交按钮是否可以点击
      submitFlag(){
        let flag = false;
        let listFlag = false;
        let uploadingFlag =false;
        this.imageListLength=false;
        this.toClick = false;
        for (let i in this.imageList) {
          if (this.imageList[i].length !== 0) {
            listFlag = true;
            this.imageListLength=true;
            for (let j in this.imageList[i]) {
              if(this.imageList[i][j].uploading){
                uploadingFlag = true;
                this.toClick = false
              }
            }
          }
        }
        if (listFlag && !uploadingFlag){
          flag =true;
          this.toClick = true;
        }
        return flag;
      }
    },
    beforeRouteLeave (to, from, next){
      let that =this;
      if (that.imageListLength || that.toClick){
        if (that.imageListLength && that.toClick){
          that.leaveConfirmParams={
            'ensure':'现在提交',
            'cancel':'暂不提交',
            'title':'要提交上传的图片么？',
          }
        }else {
          that.leaveConfirmParams={
            'ensure':'取消',
            'cancel':'离开',
            'title':'努力上传中',
            'content':'现在离开，下次还要重新上传哦',
          }
        }
        that.leaveConfirm = true;
//        that.pageLeaveEnsure =false;
        next(that.pageLeaveEnsure);
      } else {
        next(true);
      }
    },
    mounted(){

    },
    activated(){
      this.getUploadList();
      this.leaveConfirm =false;
    },
    methods: {
      getUploadList(){
        if (!localStorage.getItem("upload")) {
          localStorage.setItem("upload", JSON.stringify(this.$route.params));
        }

        this.uploadList = JSON.parse(localStorage.getItem("upload"));

        this.uploadList.forEach((element, index) => {
          this.$set(this.imageList, element.adviceId, []);
        })

      },
      upLoadPic(item, index, file){
        let that = this,
          _file = file,
          data = new FormData(),
          id = item.adviceId,
          type = item.adviceType;

        data.append('file', _file);
        data.append('paramJson', JSON.stringify({
          caseId: api.getPara().caseId,
          imageType: type,
          caseCategoryId: id,
        }));
        this.imagePreview(item, index, file);
        this.submitCreateImg(item, index, data);
      },
      imagePreview(item, index, file){
        let blob = window.URL.createObjectURL(file);
        if (this.imageList[item.adviceId]) {
          this.$set(this.imageList[item.adviceId], index, {
            blob: blob,
            imgId: "",
            uploading: true,
            fail: false
          })
        }
      },
      submitCreateImg(item, index, data){
        const that = this;
        axios({
          url: XHRList.imgCreate,
          method: "post",
          data: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 30000,
        }).then((res) => {
          const data = res.data;
          that.$set(this.imageList[item.adviceId], index, {
            blob: data.responseObject.responseMessage.logoUrl,
            imgId: data.responseObject.responsePk,
            uploading: false,
            fail: false
          })
          that.loading = false;
        }, (err) => {

        });
      },
      imgDelete(img, index, id){
        const that = this;
        api.ajax({
          url: XHRList.imgDelete,
          method: "POST",
          data: {
            id: img.imgId,
            isValid: 0
          },
          beforeSend(){

          },
          done(){
            that.imageList[id].splice(index, 1);
          }
        })
      },
      onFileChange(item, index, e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        this.loading = true;
        if (files[0].size > 1024 * 1024 * 5) {
          this.errorShow = true;
          this.errorMsg = "图片不能超过5M";
          setTimeout(() => {
            this.errorMsg = '';
            this.errorShow = false
          }, 3000);
        } else {
          this.upLoadPic(item, index, files[0]);
        }
      },
      backToImPage(){
        const that = this;
        that.pageLeaveEnsure = true;
        that.$router.push({
          path: "/BaseIm",
          query: {
            success: 1,
            queryType: "checkSuggest"
          }
        })
//        api.ajax({
//          url: XHRList.resetTime,
//          method: "POST",
//          data: {
//            consultationId: this.$store.state.consultationId,
//            frequency: "0",
//            frequencyType: "4",
//            consultationState: 0
//          },
//          done(data){
//            if (data.responseObject.responseStatus) {
//              console.log("定时重新启动...");
////              that.timeoutCount(24 * 60 * 60 * 1000);
//
//              api.ajax({
//                url: XHRList.updateCase,
//                method: "POST",
//                data: {
//                  caseId: api.getPara().caseId,
//                  state: 1
//                },
//                done(data) {
//                  if (data.responseObject.responseStatus) {
//                    console.log("病例状态更新...");
//                    store.commit("setLastTime", 24 * 60 * 60 * 1000);
//                    store.commit("lastTimeCount");
//                    that.pageLeaveEnsure = true;
//                    that.$router.push({
//                      path: "/BaseIm",
//                      query: {
//                        success: 1,
//                        queryType: "checkSuggest"
//                      }
//                    })
//                  }
//                }
//              });
//            }
//          }
//        })
      },
      //取消按钮
      cancelEvent() {
        let that = this;
        that.leaveConfirm = false;
        that.pageLeaveEnsure = true;
        that.$router.go(-1);
//        this.leaveConfirm = false;
//        this.pageLeaveEnsure = false;
        console.log("取消")
      },
      //离开函数
      ensureEvent() {
        let that = this;
        console.log("离开")
        if (!that.toClick) {
        this.leaveConfirm = false;
        this.pageLeaveEnsure = false;
        } else {
          that.backToImPage();
        }
      },
    },
    components: {
      Toast,
      Loading,
      confirm
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
  @import "../../../../scss/library/_common-modules";

  .main-header.fileUpload {
    display: flex;

  }

  .main-inner.tc-upLoadFile {
    background-color: #ffffff;
    padding-top: rem(22px);
    /*height: 100%;*/
    box-sizing: border-box;
  }

  .upload-wrapper {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    right: 0;

    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  $colorTwo: #222222;
  .tc-upLoadBox {
    background-color: white;
    .middle-tip-box {
      opacity: 0.83;
      background: #545454;
      position: absolute;
      .middle-tip-modal {
        position: absolute;
      }
    }
    .tc-upLoadTitle {
      padding: rem(30px) rem(48px) rem(30px) rem(48px);
      position: relative;

      .tc-upLoadTitleName {
        display: inline-block;
        @include font-dpr(16px);
        color: $colorTwo;
      }
      & > .ev-upLoadInput {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
      }
      .tc-upLoadRightIcon {
        float: right;
        display: inline-block;
        width: rem(26px);
        height: rem(26px);
        background: url("../../../common/image/img00/patientConsult/file_upload@2x.png");
        background-size: 100% 100%;
      }
      .tc-upLoadRightCover {
        position: absolute;
        //display: inline-block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 5;
        display: none;
      }
    }
    .tc-upLoadItemBox {

      padding-left: rem(32px);
      padding-right: rem(30px);
      padding-bottom: rem(36px);
      @include clearfix();
      .tc-upLoadItemList {
        position: relative;
        width: rem(152px);
        height: rem(152px);
        float: left;
        padding: rem(8px);
        img {
          position: relative;
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
        .tc-upLoadCover {
          position: absolute;
          display: inline-block;
          top: 0;
          left: 0;
          width: rem(152px);
          height: rem(152px);
          margin-top: rem(8px);
          margin-left: rem(8px);
          background-color: #000000;
          opacity: 0.63;
          z-index: 0;
        }
        .tc-upLoadDel {
          position: absolute;
          //display: inline-block;
          width: rem(60px);
          height: rem(60px);
          top: rem(8px);
          right: rem(8px);
          background: url("../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png") no-repeat;
          background-position: top right;
          background-size: rem(38px) rem(38px);
          z-index: 1;
        }
        //.tc-upLoadAddMore{
        //  display: inline-block;
        //  width: 0;
        //  height: 0;
        //  //position: relative;
        //  &:before{
        //    display: inline-block;
        //    content: '';
        //    position: absolute;
        //    width: rem(64px);
        //    height:rem(2px);
        //    background: #D8D8D8;
        //    top: 50%;
        //    left: 50%;
        //    margin-left: rem(-32px);
        //  }
        //  &:after{
        //    display: inline-block;
        //    content: '';
        //    position: absolute;
        //    width: rem(2px);
        //    height:rem(64px);
        //    background: #D8D8D8;
        //    top:50%;
        //    margin-top: rem(-32px);
        //  }
        //}
        .tc-upLoading {
          position: absolute;
          width: rem(40px);
          height: rem(40px);
          top: rem(44px);
          left: 50%;
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
        .tc-upLoadAfresh {
          color: #ffffff;
          position: absolute;
          width: rem(40px);
          height: rem(40px);
          top: rem(44px);
          left: 50%;
          margin-left: rem(-20px);
          background: url("/image/img00/patientConsult/symptom_refresh_loading@2x.png") no-repeat center;
          background-size: 100% 100%;
        }
        .tc-upLoadAfreshText {
          @include font-dpr(13px);
          display: inline-block;
          position: absolute;
          left: 50%;
          margin-left: rem(-76px);
          bottom: rem(30px);
          color: #ffffff;
          width: rem(152px);
          text-align: center;
          z-index: 1;
        }
        .ev-fileUpRefresh {
          position: absolute;
          display: inline-block;
          top: 0;
          left: 0;
          width: rem(152px);
          height: rem(152px);
          margin-top: rem(8px);
          margin-left: rem(8px);
          z-index: 2;
        }
      }
      .tc-upLoadAdd {
        width: rem(152px);
        height: rem(152px);
        text-align: center;
        position: relative;
        float: left;
        padding: rem(8px);
        input {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          opacity: 0;
        }
        a {
          display: block;
          height: 100%;
          background: url("../../../common/image/img00/patientConsult/upload_photo_default@2x.png");
          background-size: 100% 100%;

        }
      }
      div {
        margin-top: rem(8px);
        margin-left: rem(8px);
      }
      &.tc-reviewItemBox {
        display: block;
      }
    }
  }

  .tc-upLoadSubmit {
    padding-top: rem(70px);
    text-align: center;
    padding-bottom: rem(60px);
    background-color: white;
    .tc-submitBtn {
      width: rem(570px);
      //display: block;
      line-height: rem(70px);
      @include font-dpr(16px);
      text-align: center;
      background-color: #00D6C6;
      color: white;
      border-radius: rem(45px);
      margin: 0 auto;
    }
    .tc-submitDisabled {
      width: rem(570px);
      display: block;
      line-height: rem(70px);
      @include font-dpr(16px);
      text-align: center;
      background-color: #DFDFDF;
      color: white;
      border-radius: rem(45px);
      margin: 0 auto;
    }
  }

  .he-upLoadGuide {
    img {
      max-width: 100%;
      min-width: 100%;
      height: 100%;
      width: 100%;
    }
  }

  #EV-swiper {
    padding-top: rem(40px);
    .closeBtn {
      top: rem(40px);
      right: rem(40px);

    }
    .EV-gallery-top {
      @include font-dpr(14px)
    }
    .swiper-pagination.swiper-pagination-bullets {
      height: rem(37px);
      .swiper-pagination-bullet-active, .swiper-pagination-bullet {
        @include font-dpr(14px);
        width: rem(16px);
        height: rem(16px);
      }
    }
    .swiper-wrapper {
      height: 100%;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
