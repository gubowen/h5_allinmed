<template>
  <section class="he-videoUpHide ev-videoImgUpHide">
    <section class="he-videoUpLoadBox">
      <section class="he-videosMain">
        <p class="he-loadTitle">{{baseMessage.content}}</p>
        <ul class="he-loadFiles he-videoImageBox docInt" v-if="baseMessage.type==2">
          <li class="tc-imageItemList ev-imgList success" v-for="(item,index) in imageList" v-if="imageList.length>0">
            <img :src="item.blob" alt="">
            <span class="tc-upLoadDel" @click="imgDelete(index,item.imgId)"></span>
            <div v-if="item.uploading">
              <span class="tc-upLoadCover"></span>
              <span class="tc-upLoading"></span>
              <span class="tc-upLoadAfreshText">等待上传</span>
            </div>
          </li>
          <li class="tc-imageUpLoadAdd" v-if="!uploading&&imageList.length<9">
            <a href="javascript:;">
              <span class="tc-upLoadAddMore"></span>
              <input class="tc-upLoadInput" type="file"
                     @change="onFileChange(imageList[imageList.length],imageList.length,$event)">
            </a>
          </li>
        </ul>
        <ul class="he-loadFiles" v-show="baseMessage.type==1&&!videoObj.size">
          <li class="he-videoAddFirstBtn" ref="upload">
            <a href="javascript:;" class="he-videoFirstLoadBtn" id="uploadBtn" ref="uploadBtn"></a>
          </li>
        </ul>
        <ul class="he-loadFiles ev-success" issubmit="0" v-show="baseMessage.type==1&&videoObj.size">
          <li class="he-loadVideoSuccess">
            <span class="he-loadVideoSuccessBox">
            <span class="he-loadSuccessTip"></span>
            <span class="he-loadSuccessText">已上传</span>
          </span>
          </li>
          <!--<li class="he-videoAddBtn he-loadSuccessTextBox">-->
            <!--<a href="javascript:;" class="he-reLoadText" id="reloadBtn" @click="againUpload()">重新上传</a>-->
          <!--</li>-->
          <!--<li class="he-videoAddBtn he-loadSuccessTextBoxBtn" id="container1" style="display: none;"><a-->
            <!--href="javascript:;" id="videoUpBtn" class="he-reLoadText">重新上传</a>-->
            <!--<div id="html5_1bo9j4hlh15o6vqacnv1qmj1j4j17_container" class="moxie-shim moxie-shim-html5"-->
                 <!--style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; overflow: hidden;"><input-->
              <!--id="html5_1bo9j4hlh15o6vqacnv1qmj1j4j17" type="file"-->
              <!--style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"-->
              <!--accept="video/mp4,video/quicktime,video/avi,video/x-ms-wmv,video/x-flv"></div>-->
          <!--</li>-->
        </ul>
        <section class="he-videosSubmit ev-submitUpData" v-show="baseMessage.type==2">
          <button class="usable downBtn" v-show="imageList.length && !uploading" @click="submitImage" style="display: inline-block;">提交</button>
          <button class="unusable" v-show="!imageList.length || uploading">提交</button>
        </section>
        <section class="he-videosSubmit ev-submitUpData" v-show="baseMessage.type==1">
          <button class="usable downBtn" :disabled="uploadVideo" style="display: inline-block;" @click="submitVideo" v-show="videoObj.size">提交
          </button>
          <button class="unusable" v-show="!videoObj.size">提交</button>
        </section>
      </section>
    </section>
    <section class="video-upLoad-box"  v-if="videoUploading">
      <section class="ev-videoUpLoading">
        <div class="tc-videoLoadingImg">
          <img src="../../../common/image/img00/patientConsult/symptom_photo_loading@2x.png" alt="">
        </div>
        <p class="tc-videoLoadingText">上传中...</p>
      </section>
    </section>
    <transition name="fade">
      <toast :content="tip" v-show="tipShow"></toast>
    </transition>
    <transition name="fade">
      <!--图片上传离开的confirm-->
      <confirm
        :confirmParams="imgLeaveConfirmParams"
        v-if="imgLeaveConfirm"
        :showFlag.sync="imgLeaveConfirm"
        @cancelClickEvent="imgCancel()"
        @ensureClickEvent="imgEnsure()">
      </confirm>
    </transition>
    <transition name="fade">
      <!--视频上传离开的confirm-->
      <confirm
        :confirmParams="videoLeaveConfirmParams"
        v-if="videoLeaveConfirm"
        :showFlag.sync="videoLeaveConfirm"
        @cancelClickEvent="cancelEvent()"
        @ensureClickEvent="ensureEvent()">
      </confirm>
    </transition>
    <transition name="fade">
      <!--视频是否重新上传的confirm-->
      <confirm
        :confirmParams="{
            'ensure':'取消',
            'cancel':'替换',
            'title':'重新上传后',
            'content':'原有视频将被替换',
          }"
        v-if="reloadVideoConfirm"
        :showFlag.sync="reloadVideoConfirm"
        @cancelClickEvent="uploadEnsure()"
        @ensureClickEvent="uploadCancel()">
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
   * Created by lichenyang on 2017/8/23.
   */
  import api from "common/js/util/util";
  import axios from "axios";
  import Qiniu from "common/js/third-party/qiniu/qiniu";
  import Toast from "components/toast";
  import confirm from 'components/confirm';
  const XHRList = {
    imgCreate: "/mcall/customer/patient/case/attachment/v1/create/",//上传图片
    imgDelete: "/mcall/customer/patient/case/attachment/v1/update/",//更新图片
    saveVideo:'/mcall/qiniu/storage/v1/saveVideoInfo/',               //视频保存
    resetTime: "/mcall/customer/case/consultation/v1/updateFrequency/",
    updateCase: "/mcall/customer/patient/case/v1/update/",
    getToken: "/mcall/qiniu/storage/v1/getToken/"
  };
  export default{
    data(){
      return {
        imgLeaveConfirm:false,//上传图片离开confirm框是否显示
        imgLeaveConfirmParams:{},//图片离开的参数
        videoLeaveConfirm:false,//上传视频离开confirm框是否显示
        videoLeaveConfirmParams:{},//上传视频离开confirm的参数
        pageLeaveEnsure: false,//页面是否离开
        reloadVideoConfirm:false,//视频重新上传的confirm框是否显示
        baseMessage: {},
        imageList: [],
        uploading: false,
        videoUploading: false,//视频正在上传七牛
        videoObj: {},
        videoSubmitParam: {},
        tip: "上传完成",
        tipShow: false,
        uploadVideo:false,//点击提交之后，提交按钮是否可以点击
      }
    },
    beforeRouteLeave (to, from, next){
      let that =this;
//      debugger;
      if (that.baseMessage.type==1){
        if(that.videoObj.size || that.videoUploading){
          if (that.videoUploading) {
            that.videoLeaveConfirmParams={
              'ensure':'离开',
              'cancel':'取消',
              'title':'努力上传中',
              'content':'现在离开，下次还要重新上传哦',
            }
          } else {
            that.videoLeaveConfirmParams={
              'ensure':'现在提交',
              'cancel':'暂不提交',
              'title':'要提交上传的视频么',
              'content':'',
            }
          }
          that.videoLeaveConfirm = true;
//        that.pageLeaveEnsure =false;
          next(that.pageLeaveEnsure)
        } else {
          next(true);
        }
        this.reloadVideoConfirm = false;
      } else {
        if(that.imageList.length){
          if(that.uploading){
            that.imgLeaveConfirmParams={
              'ensure':'取消',
              'cancel':'离开',
              'title':'努力上传中',
              'content':'现在离开，下次还要重新上传哦',
            }
          } else {
            that.imgLeaveConfirmParams={
              'ensure':'现在提交',
              'cancel':'暂不提交',
              'title':'要提交上传的图片么？',
            }
          }
          that.imgLeaveConfirm = true;
//        that.pageLeaveEnsure =false;
          next(that.pageLeaveEnsure);
        } else {
          next(true);
        }
      }
    },
    props: {},
    methods: {
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
      upLoadPic(item, index, file){
        let that = this,
          _file = file,
          data = new FormData();

        data.append('file', _file);
        data.append('paramJson', JSON.stringify({
          caseId: api.getPara().caseId,
          imageType: 1,
          caseCategoryId: "",
        }));
        this.imagePreview(item, index, file);
        this.submitCreateImg(item, index, data);
      },
      imgDelete(index, id){
        const that = this;
        api.ajax({
          url: XHRList.imgDelete,
          method: "POST",
          data: {
            id: id,
            isValid: 0
          },
          beforeSend(){

          },
          done(){
            that.imageList.splice(index, 1);
            that.uploading=false;
          }
        })
      },
      imagePreview(item, index, file){
        let blob = window.URL.createObjectURL(file);
        if (!this.imageList[index]) {
          this.imageList.push({
            blob: blob,
            imgId: "",
            uploading: true,
            fail: false
          })
          this.uploading = true;
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
          this.$set(this.imageList[index], "blob", data.responseObject.responseMessage.logoUrl);
          this.$set(this.imageList[index], "imgId", data.responseObject.responsePk);
          this.$set(this.imageList[index], "uploading", false);
          this.$set(this.imageList[index], "fail", false);

          this.uploading = false;
        }, (err) => {

        });
      },
      videoUpload(){
        const that = this;

        Qiniu.uploader({
          runtimes: 'html5,flash,html4',      // 上传模式，依次退化
          browse_button: "uploadBtn",         // 上传选择的点选按钮，必需
          multi_selection: false,
          uptoken_url: XHRList.getToken,         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
          get_new_uptoken: true,             // 设置上传文件的时候是否每次都重新获取新的uptoken
          domain: 'tocure',     // bucket域名，下载资源时用到，必需
          container: this.$refs.upload,             // 上传区域DOM ID，默认是browser_button的父元素
          max_file_size: '100mb',             // 最大文件体积限制
          flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
          dragdrop: true,                     // 开启可拖曳上传
          drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',                  // 分块上传时，每块的体积
          filters: {
            mime_types: [                                   //只允许上传video
              {title: "video", extensions: "mp4,mov,avi,wmv,flv"}
            ],
            prevent_duplicates: true                        //不允许选取重复文件
          },
          auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
          init: {
            'FilesAdded': function (up, files) {
              plupload.each(files, function (file) {
                // 文件添加进队列后，处理相关的事情
              });
            },
            'BeforeUpload': function (up, file) {
              // 每个文件上传前，处理相关的事情
            },
            'UploadProgress': function (up, file) {
              // 每个文件上传时，处理相关的事情
              that.videoUploading = true;
            },
            'FileUploaded': function (up, file, info) {
              that.videoUploading = false;
              that.videoObj = file;
              that.videoSubmitParam = JSON.parse(info);
              that.tipShow = true;
              setTimeout(() => {
                that.tipShow = false;
              }, 2000)
            },
            'Error': function (up, err, errTip) {
              //上传出错时，处理相关的事情
            },
            'UploadComplete': function () {
              //队列文件处理完毕后，处理相关的事情

            },
            'Key': function (up, file) {
              // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
              // 该配置必须要在unique_names: false，save_key: false时才生效
              var key = "";
              // do something with key here
              return key
            }
          }
        });
      },
      //图片提交
      submitImage(){
        const that = this;
        that.pageLeaveEnsure = true;
        that.$router.push({
          path: "/BaseIm",
          params: {
            success:1,
          },
          query: {
            success:1,
            queryType:"triage"
          }
        })
      },
      //视频提交
      submitVideo(){
        const that = this;
        that.uploadVideo = true;
        api.ajax({
          url: XHRList.saveVideo,
          method: "POST",
          data: {
            videoName: this.videoObj.name,
            key: this.videoSubmitParam.key,
            persistentId: this.videoSubmitParam.persistentId,
            caseId: api.getPara().caseId,
            refType: 1
          },
          beforeSend(){

          },
          done(){
            that.uploadVideo = false;
            that.pageLeaveEnsure = true;
            that.$router.push({
              path: "/BaseIm",
              params: {
                success:1,
              },
              query: {
                success:1,
                queryType:"triage"
              }
            })

          }
        })
      },
      //视频上传离开confirm取消函数
      cancelEvent() {
        this.videoLeaveConfirm = false;
        if (!this.videoUploading) {
          this.pageLeaveEnsure = true;
          this.$router.go(-1);
        } else {
          this.pageLeaveEnsure = false;
        }
      },
      //视频上传离开confirm离开函数
      ensureEvent() {
        let that = this;
        if (that.videoUploading) {
          that.videoLeaveConfirm = false;
          that.pageLeaveEnsure = true;
          that.$router.go(-1);
        } else {
          if(that.uploadVideo){
            return false;
          }
          that.submitVideo();
        }
      },
      //重新上传按钮
      againUpload(){
        this.reloadVideoConfirm = true;
      },
      //重新上传confirm取消函数
      uploadCancel() {
        this.reloadVideoConfirm = false;
      },
      //重新上传confirm替换函数
      uploadEnsure() {
        let that = this;
        this.reloadVideoConfirm = false;
        console.log(this.$refs.uploadBtn);
        this.$refs.uploadBtn.click();
      },
      //图片离开取消按钮
      imgCancel() {
        let that = this;
        that.imgLeaveConfirm = false;
        that.pageLeaveEnsure = true;
        that.$router.go(-1);
//        this.leaveConfirm = false;
//        this.pageLeaveEnsure = false;
        console.log("取消")
      },
      //图片离开函数
      imgEnsure() {
        let that = this;
        console.log("离开");
        if (that.uploading) {
          this.imgLeaveConfirm = false;
          this.pageLeaveEnsure = false;
        } else {
          this.submitImage();
        }
      },
    },
    mounted(){
//      if (!sessionStorage.getItem("triageRoute")) {
//        sessionStorage.setItem("triageRoute", JSON.stringify(this.$route.params));
//      }
//
//      this.baseMessage = JSON.parse(sessionStorage.getItem("triageRoute"));
//      this.videoUpload();
      let that = this;
      that.imageList = [];
      that.videoObj={};
      that.videoSubmitParam={};
      if (!sessionStorage.getItem("triageRoute")) {
        sessionStorage.setItem("triageRoute", JSON.stringify(this.$route.params));
      }

      that.baseMessage = JSON.parse(sessionStorage.getItem("triageRoute"));
      that.videoUpload();
    },
    activated(){
      let that = this;
      that.imageList = [];
      that.videoObj={};
      that.videoSubmitParam={};
      if (!sessionStorage.getItem("triageRoute")) {
        sessionStorage.setItem("triageRoute", JSON.stringify(this.$route.params));
      }

      that.baseMessage = JSON.parse(sessionStorage.getItem("triageRoute"));
      that.videoUpload();
      that.reloadUpload();
    },
    components: {
      Toast,
      confirm
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .he-videoUpHide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    $main-color: #00D6C6;
    height: 100%;
    background-color: #ffffff;
    box-sizing: border-box;
    //video up load
    .he-videoUpLoadBox {
      height: 100%;

      .he-videosMain {
        min-height: 100%;
        height: auto;
        box-sizing: border-box;
        position: relative;
        padding-bottom: rem(117px);
        background-color: #fff;
        z-index: 5;
        //问题样式
        .he-loadTitle {
          padding: rem(48px) rem(40px) rem(10px);
          @include font-dpr(17px);
          line-height: 1.5;
          color: #222222;
        }
        .he-loadFiles {
          @include clearfix();
          padding: 0 rem(40px);
          &.he-videoImageBox {
            padding-left: rem(32px);
            padding-right: rem(40px);
            .tc-imageUpLoadAdd {

            }
            .tc-upLoadInput {
              cursor: pointer;
              position: absolute;
              right: 0;
              opacity: 0;
              outline: none;
              width: 100%;
              height: 100%;
            }
            div {
              margin-top: rem(8px);
              margin-left: rem(8px);
            }
          }
          .he-loadVideoSuccess {
            width: rem(152px);
            height: rem(152px);
            text-align: center;
            padding: rem(8px);
            opacity: 0.7;
            background: #000000;
            .he-loadVideoSuccessBox {
              display: block;
              padding-top: rem(40px);
              .he-loadSuccessTip {
                display: block;
                margin: 0 auto;
                width: rem(36px);
                height: rem(36px);
                background: url("../../../common/image/img00/patientConsult/upload_success.png");
                background-size: 100% 100%;
              }
              .he-loadSuccessPercent {
                display: block;
                text-align: center;
                color: #FFFFFF;
              }
              .he-loadSuccessText {
                @include font-dpr(12px);
                display: block;
                color: #FFFFFF;
                padding-top: rem(10px);
                text-align: center;
              }
            }
          }
          .he-videoAddBtn.he-loadSuccessTextBox {
            width: rem(152px);
            height: auto;
            text-align: center;
            position: static;
            float: none;
            padding: rem(8px);
            .he-reLoadText {
              @include font-dpr(12px);
              color: #526085;
              padding-top: rem(4px);
              display: block;
              text-align: center;
            }
          }
          //.he-loadVideoItem{
          //  position: relative;
          //  height: rem(236px);
          //  width: rem(315px);
          //  background-color: #000000;
          //  display: none;
          //  .he-videoDelBtn{
          //    //display: none;
          //    position: absolute;
          //    display: inline-block;
          //    width: rem(38px);
          //    height: rem(38px);
          //    top: rem(2px);
          //    right: rem(2px);
          //    background: url("/image/img00/patientConsult/symptom_photo_delete@2x.png") no-repeat center;
          //    background-size: 100% 100%;
          //    z-index: 1;
          //  }
          //  .he-videoLoading{
          //    display: none;
          //    position: absolute;
          //    width: rem(72px);
          //    height: rem(72px);
          //    top:50%;
          //    left: 50%;
          //    margin-top: rem(-36px);
          //    margin-left: rem(-36px);
          //    background: url("/image/img00/patientConsult/suggestion_upload@2x.png") no-repeat center;
          //    background-size: 100% 100%;
          //    animation: submitIng 1s linear infinite;
          //    -webkit-animation: submitIng 1s linear infinite;
          //    @keyframes submitIng {
          //      0% {-webkit-transform:rotate(0deg);}
          //      100% {-webkit-transform:rotate(360deg);}
          //    }
          //  }
          //  .he-videoPlayBtn{
          //    //display: none;
          //    position: absolute;
          //    width: rem(72px);
          //    height: rem(72px);
          //    top:50%;
          //    left: 50%;
          //    margin-top: rem(-36px);
          //    margin-left: rem(-36px);
          //    background: url("/image/img00/patientConsult/suggestion_play@2x.png") no-repeat center;
          //    background-size: 100% 100%;
          //  }
          //}
          .he-videoAddBtn {
            width: rem(152px);
            height: rem(152px);
            text-align: center;
            position: relative;
            float: left;
            padding: rem(8px);
            .he-videoFirstLoadBtn {
              display: block;
              height: 100%;
              background: url("/image/img00/patientConsult/upload_photo_default@2x.png");
              background-size: 100% 100%;
            }
            .he-videoInputBtn {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 1;
              opacity: 0;
            }
            &.ev-videoLoadHide {
              display: none;
            }
          }
          .he-videoAddFirstBtn {
            width: rem(152px);
            height: rem(152px);
            text-align: center;
            position: relative;
            float: left;
            padding: rem(8px);
            .he-videoFirstLoadBtn {
              display: block;
              height: 100%;
              background: url("../../../common/image/img00/patientConsult/upload_photo_default@2x.png");
              background-size: 100% 100%;
            }
            //.he-videoInputBtn{
            //  position: absolute;
            //  width: 100%;
            //  height:100%;
            //  top: 0;
            //  left: 0;
            //  z-index: 1;
            //  opacity: 0;
            //}
          }
          .tc-upLoadVideoInput {
            display: none;
          }
          .tc-imageItemList {
            position: relative;
            width: rem(152px);
            height: rem(152px);
            float: left;
            padding: rem(8px);
            img {
              position: relative;
              width: 100%;
              height: 100%;

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
          .tc-imageUpLoadAdd {
            width: rem(152px);
            height: rem(152px);
            text-align: center;
            position: relative;
            float: left;
            padding: rem(8px);
            a {
              display: block;
              height: 100%;
              background: url("../../../common/image/img00/patientConsult/upload_photo_default@2x.png");
              background-size: 100% 100%;
            }
          }
        }
        .he-videosSubmit {
          text-align: center;
          position: absolute;
          bottom: rem(60px);
          padding: 0 rem(90px);
          .usable {
            display: none;
          }
          .unusable {
            background-color: #DFDFDF;
          }
          button {
            width: rem(570px);
            display: block;
            line-height: rem(70px);
            @include font-dpr(16px);
            text-align: center;
            background-color: $main-color;
            color: white;
            border-radius: rem(45px);
          }
        }
      }
    }
  }

  .video-upLoad-box{
    position: fixed;
    z-index: 5;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0);
  }
  .ev-videoUpLoading {
    width: rem(258px);
    height: rem(258px);
    position: fixed;
    top: 50%;
    margin-top: rem(-129px);
    margin-left: rem(-129px);
    left: 50%;
    right: 0;
    opacity: 0.8;
    background: #000000;
    border-radius: 6px;
    .tc-videoLoadingImg {
      padding-top: rem(66px);
      img {
        margin: 0 auto;
        width: rem(60px);
        height: rem(60px);
        display: block;
        animation: rotate 1s linear forwards infinite;
      }
    }
    .tc-videoLoadingText {
      padding-top: rem(35px);
      @include font-dpr(14px);
      color: #FFFFFF;
      text-align: center;
    }
  }

  @include keyframes(rotate) {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .popup-tips {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .middle-tip-modal.popup-tips {
    z-index: 5;
  }

  .middle-tip-box.ev-loading {
    z-index: 5;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
