<template>
  <section class="upload-wrapper">
    <section class="main-inner tc-upLoadFile ev-delete">
      <section class="tc-upLoadBox" v-for="(item,index) in uploadList">
        <figure class="tc-upLoadTitle ev-upLoadList">
          <span class="tc-upLoadTitleName" :data-treatmentid="item.adviceId" :data-advicetype="item.adviceType">{{item.adviceName}}</span>
          <span class="tc-upLoadRightIcon"></span>
          <span class="tc-upLoadRightCover"></span>
          <input class="ev-upLoadInput" accept="image/*" type="file" @change="onFileChange($event,item,0)" v-show="imageList[item.adviceId].length===0">
        </figure>
        <ul class="tc-upLoadItemBox docInt" v-show="imageList[item.adviceId].length>0">
          <li class="tc-upLoadItemList ev-imgList success" v-for="(img,imgIndex) in imageList[item.adviceId]">
            <img alt="" @click="showBigImg(img,imgIndex,1)" :src="img.blob">
            <span class="tc-upLoadDel" style="cursor: pointer" @click="imgDelete(img,imgIndex,item.adviceId)" v-show="img.uploading==false"></span>
            <div v-show="img.uploading">
              <span class="tc-upLoadCover"></span>
              <span class="tc-upLoading"></span>
              <span class="tc-upLoadDel" style="cursor: pointer"></span>
              <span class="tc-upLoadAfreshText">等待上传</span>
            </div>
            <figure class="upload-fail" v-if="item.fail">
              <p>重新上传</p>
              <input class="ev-upLoadInput" accept="image/*" type="file" multiple @change="onFileChange(img,imgIndex,$event)" v-show="imageList[item.adviceId].length>0 && img.finish">
            </figure>
          </li>
          <li class="tc-upLoadAdd" style="display: list-item;" v-if="imageList[item.adviceId].length>0&&!loading">
            <a href="javascript:;">
              <span class="tc-upLoadAddMore">
                <input class="ev-upLoadInput" accept="image/*" type="file" multiple @change="onFileChange(item,imageList[item.adviceId].length,$event)"/>
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
  import confirm from 'components/confirm';
  import Loading from 'components/loading';
  import Toast from 'components/toast';
  import nimEnv from 'common/js/nimEnv/nimEnv';
  import imageCompress from "common/js/imgCompress/toCompress";
  let nim;
  const XHRList = {
    getToken: "/mcall/im/interact/v1/refreshToken/",                                                //获取token
    imgCreate: "/mcall/customer/patient/case/attachment/v1/create/",                //上传图片
    imgDelete: "/mcall/customer/patient/case/attachment/v1/update/",               //历史图片删除
    updateCount: "/mcall/customer/case/consultation/v1/updateFrequency/",    //更新时间
    updateConsultState:'/mcall/customer/patient/case/v1/update/'                       //更新上传成功后状态
  };
  export default{
    data(){
      return {
        uploadList: [],
        imageList: {}, 
        filesObj:{},      //多图file对象存储，用于获取每张图的信息
        base64Arr:[],     //base64压缩后的图片
        uploadIndex:'',   //多图上传递增索引
        errorShow: false,
        errorMsg: "",
        loading: false,
        userData: {
          account:"",
          token: ""
        }
      }
    },
    computed: {
      submitFlag(){
        let flag = false;
        for (let i in this.imageList) {
          if (this.imageList[i].length !== 0) {
            flag = true;
            break
          }
        }
        return flag;
      }
    },
    mounted(){
      this.getUploadList();
      api.forbidShare();
    },
    methods: {
      getUploadList(){
        if (this.$route.params.hisPicLists) {
          this.uploadList = this.$route.params.hisPicLists;
          this.uploadList.forEach((element) => {
            this.$set(this.imageList, element.adviceId, []);
          })
        }
      },
      upLoadPic(files,item, index, base64){
        let that = this,
            _file = files,
            data = new FormData(),
            id = item.adviceId,
            type = item.adviceType;

        data.append('file', _file);
        data.append('paramJson', JSON.stringify({
          caseId: that.$route.params.caseId,
          imageType: type,
          caseCategoryId: id,
        }));
        this.imagePreview(item, index, base64);
        this.submitCreateImg(files, item, index, base64);
      },
      imagePreview(item, index, base64){
        let that = this;
        // let blob = window.URL.createObjectURL(file);
        // if (this.imageList[item.adviceId]) {
        //   this.$set(this.imageList[item.adviceId], index, {
        //     blob: blob,
        //     imgId: "",
        //     uploading: true,
        //     fail: false
        //   })
        // }
        if (typeof index !== "undefined") {
          that["imageList"][item.adviceId][index] = {
            blob: base64,
            imgId: "",
            uploading: true,
            fail: false
          };
        } else {
          that["imageList"][item.adviceId].push({
            blob: base64,
            imgId: "",
            uploading: true,
            fail: false
          });
        }
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
      submitCreateImg(files, item, index, base64){
        const that = this;
        // axios({
        //   url: XHRList.imgCreate,
        //   method: "post",
        //   data: data,
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   timeout: 30000,
        // }).then((res) => {
        //   const data = res.data;
        //   that.$set(this.imageList[item.adviceId], index, {
        //     blob: data.responseObject.responseMessage.logoUrl,
        //     imgId: data.responseObject.responsePk,
        //     uploading: false,
        //     fail: false
        //   })
        //   that.loading = false;
        // }, (err) => {

        // });
        api.ajax({
        url: XHRList.imgCreate,
        method: "POST",
        data: {
          fileContent: base64.split(",")[1].replace(/\+/g,"%2B").replace(/\n/g,""),
          fileName: files.name,
          extName:files.name.split(".")[1],
          caseId: "",
          imageType: item.adviceType,
          caseCategoryId: ""
        },
        timeout: 300000,
        done(res) {
          if (res.responseObject.responseStatus) {
            const data = res.data;
            that.$set(that.imageList[item.adviceId], index, {
              blob: res.responseObject.responseMessage.logoUrl,
              imgId: res.responseObject.responsePk,
              uploading: false,
              fail: false
            })
            that.loading = false;
            //上传下一张图片
            that.uploadIndex = parseInt(that.uploadIndex) + 1;
            let totalUpNum = that["imageList"][item.adviceId].length;
            if (
              that.filesObj[that.uploadIndex] !== "undefined" &&
              that.uploadIndex < that.filesObj.length &&
              totalUpNum < 9
            ) {
              that.upLoadPic(
                that.filesObj[that.uploadIndex],
                item,
                index,
                that.base64Arr[that.uploadIndex]
              );
            }
          } else {
            let num = index ? index : that["imageList" + type].length - 1;
            that["imageList" + type][num].uploading = false;
            that["imageList" + type][num].fail = true;
            that["imageList" + type][num].finish = false;
            //            that["uploading" + type] = false;
            that.uploading1 = false;
            that.uploading2 = false;
          }
        },
        fail(res) {
          let num = index ? index : that["imageList" + type].length - 1;
          that["imageList" + type][num].uploading = false;
          that["imageList" + type][num].fail = true;
          that["imageList" + type][num].finish = false;
          //            that["uploading" + type] = false;
          that.uploading1 = false;
          that.uploading2 = false;
          console.log("net error");
        }
      });
      },
      onFileChange(e, item, index){
        let files = e.target.files || e.dataTransfer.files;
        let that = this;
        that.filesObj = files;
        that.base64Arr = [];
        that.uploadIndex = 0;
        if (!files.length) {
          return;
        }
        console.log(item,index,e);
        debugger
        this.loading = true;
        for (let i = 0; i < files.length; i++) {
        if (files[i].size > 1024 * 1024 * 10) {
          this.errorShow = true;
          this.errorMsg = "图片不能超过10M";
          setTimeout(() => {
            this.errorMsg = "";
            this.errorShow = false;
          }, 3000);
        } else {
          //图片压缩处理
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = oFREvent => {
            imageCompress(
              {
                imgSrc: oFREvent.target.result,
                quality: 0.8,
                width: 1920,
                height: 1080
              },
              base64 => {
                that.base64Arr.push(base64); //保存压缩图片
                if (i == files.length - 1) {
                  this.upLoadPic(
                    files[that.uploadIndex],
                    item,
                    index,
                    that.base64Arr[that.uploadIndex]
                  );
                }
              }
            );
          };
        }
      }
        // if (files[0].size > 1024 * 1024 * 5) {
        //   this.errorShow = true;
        //   this.errorMsg = "图片不能超过5M";
        //   setTimeout(() => {
        //     this.errorMsg = '';
        //     this.errorShow = false
        //   }, 3000);
        // } else {
        //   this.upLoadPic(item, index, files[0]);
        // }
      },
      backToImPage(){
        const that = this;
        api.ajax({
          url: XHRList.updateConsultState,
          method: "POST",
          data: {
            caseId: that.$route.params.caseId,
            state: "0"
          },
          done(data){
            if (data.responseObject.responseStatus) {
              that.getUserBaseData(that.$route.params.caseId,that.$route.params.consultationId);
              that.$router.push({
                path:"/consultHis"
              })
            }else{
                console.log("更新状态失败")
            }
          }
        })
      },
      getUserBaseData(caseId,consultationId){
        const that = this;
        api.ajax({
          url: XHRList.getToken,
          method: "POST",
          data: {
            accid: "0_" + caseId
          },
          done(param) {
            if (param.responseObject.responseStatus) {
              that.userData = {
                account: "0_" + caseId,
                token: param.responseObject.responseData.token
              }
              that.connectToNim(consultationId);
            }
          }
        })
      },
      connectToNim(cid){
        const that = this;
        this.nim = NIM.getInstance({
          // debug: true,
          appKey: nimEnv(),
          account: that.userData.account,
          token: that.userData.token,
          onconnect (data) {
            console.log('连接成功');
            that.nimSendSuccess(cid);
          },
          onwillreconnect (obj) {
            console.log("已重连" + obj.retryCount + "次，" + obj.duration + "后将重连...")
          },
          ondisconnect () {
            console.log("链接已中断...")
          }
        });
      },
      nimSendSuccess(cd){
        let that = this;
        that.nim.sendCustomMsg({
          scene: 'p2p',
          to: "1_doctor00001",
          custom:JSON.stringify({
            cType:"0",
            cId:cd,
            mType:"0",
          }),
          content: JSON.stringify({
            type: "checkSuggestSendTips",
            data: {
              actionType: "checkSuggest",
            }
          }),
          type: "custom",
          done(error, obj) {
            console.log( "该患者已上传检查资料");
            that.refreashOrderTime(cd);
          }
        });
      },
      refreashOrderTime (consultationId) {
        let that = this;
        api.ajax({
          url: XHRList.updateCount,
          method: "POST",
          data: {
            consultationId: consultationId,
            frequency: "0",
            frequencyType: "2",
            consultationLevel: "1",
            consultationState:"",
          },
          done(data) {
            if (data.responseObject.responseData) {
              console.log("更新时间成功");
            }
          }
        })
      },
    },
    components: {
      Toast,
      Loading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .main-header.fileUpload {
    display: flex;

  }

  .main-inner.tc-upLoadFile {
    background-color: #ffffff;
    padding-top: rem(22px);
  }

  .upload-wrapper {
    width: 100%;
    height: 100%;
    background-color: #f4f5f7;
  }

  $colorTwo: #222222;
  .tc-upLoadBox {
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

</style>
