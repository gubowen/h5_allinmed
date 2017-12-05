<template>
  <section class="upload-wrapper">
    <section class="al-uploadNumLimit"><span>提示：每一项最多可以上传9张图片</span></section>
    <section class="tc-upLoadFile ev-delete">
      <section class="tc-upLoadBox" v-for="(item,index) in uploadList">
        <figure class="tc-upLoadTitle ev-upLoadList">
          <span class="tc-upLoadTitleName" :data-treatmentid="item.adviceId"
                :data-advicetype="item.adviceType">{{item.adviceName}}</span>
          <span class="tc-upLoadRightIcon"></span>
          <span class="tc-upLoadRightCover"></span>
          <input class="ev-upLoadInput" accept="image/*" type="file" multiple
          :capture="cameraType"
                 @change="onFileChange($event, item)" v-if="imageList[item.adviceId].length===0&&!loading">
        </figure>
        <ul class="tc-upLoadItemBox docInt" v-show="imageList[item.adviceId].length>0">
          <li class="tc-upLoadItemList ev-imgList success" v-for="(img,imgIndex) in imageList[item.adviceId]">
            <img alt="" @click="showBigImg(img,imgIndex,item.adviceId)" :src="img.blob">
            <span class="tc-upLoadDel" style="cursor: pointer"
                  @click="imgDelete(img,imgIndex,item.adviceId)"
                  v-show="img.uploading==false&&!img.fail"></span>
            <div v-show="img.uploading">
              <span class="tc-upLoadCover"></span>
              <span class="tc-upLoading"></span>
              <!-- <span class="tc-upLoadDel" style="cursor: pointer"></span> -->
              <span class="tc-upLoadAfreshText">等待上传</span>
            </div>
            <figure class="upload-fail" v-if="img.fail">
              <p>重新上传</p>
              <input class="ev-upLoadInput" accept="image/*" type="file" multiple
                     @change="onFileChange($event, item, imgIndex)"
                     :capture="cameraType"
                     v-show="imageList[item.adviceId].length>0 && img.finish">
            </figure>
          </li>
          <li class="tc-upLoadAdd" style="display: list-item;" v-show="imageList[item.adviceId].length>0&&imageList[item.adviceId].length<9">
            <a href="javascript:;">
              <span class="tc-upLoadAddMore">
                <input class="ev-upLoadInput"
                       accept="image/*"
                       type="file"
                       multiple
                       v-if="imageList[item.adviceId].length>0&&!loading&&imageList[item.adviceId].length<9"
                       :capture="cameraType"
                       @change="onFileChange($event, item)"/>
              </span>
            </a>
          </li>
        </ul>
      </section>
      <div data-alcode-mod='718'>
        <footer class="tc-upLoadSubmit">
        <button data-alcode='e131' class="tc-submitBtn" v-if="submitFlag" @click="backToImPage">提交</button>
        <button class="tc-submitDisabled" v-if="!submitFlag">提交</button>
      </footer>
      </div>
    </section>
    <transition name="fade">
      <Toast :content="errorMsg" v-if="errorShow"></Toast>
    </transition>
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
   * @Desc： 上传检查检验
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/21.
   */
import axios from "axios";
import api from "common/js/util/util";
import store from "../store/store";
import confirm from "components/confirm";
import Loading from "components/loading";
import Toast from "components/toast";
import imageCompress from "common/js/imgCompress/toCompress";
let _cameraType = "";

if (navigator.userAgent.toLowerCase().includes("iphone")) {
  _cameraType = "";
} else {
  _cameraType = "camera";
}
const XHRList = {
  imgCreate: "/mcall/customer/patient/case/attachment/v1/create/",
  imgDelete: "/mcall/customer/patient/case/attachment/v1/update/",
  resetTime: "/mcall/customer/case/consultation/v1/updateFrequency/",
  updateCase: "/mcall/customer/patient/case/v1/update/",
  saveImage: "/mcall/customer/patient/case/attachment/v1/update/" //图片保存
};
let refreshFlag = true; //路由进来的时候判断是否是查看大图返回来的
export default {
  data() {
    return {
      leaveConfirm: false,
      leaveConfirmParams: {}, //离开confirm的参数
      pageLeaveEnsure: false, //是否离开页面
      uploadList: [], //上传列表项
      imageListLength: false, //图片列表中是否有图片
      imageList: {}, //上传成功后的图片数组
      filesObj: [], //多图file对象存储，用于获取每张图的信息
      base64Arr: [], //base64压缩后的图片
      uploadIndex: "", //多图上传递增索引
      toClick: false, //提交按钮是否可以点击
      errorShow: false,
      errorMsg: "",
      loading: false, //是否正在上传
      deletePic: {},
      deletePicTip: false, //删除图片弹层
      cameraType: _cameraType
    };
  },
  computed: {
    //计算提交按钮是否可以点击
    submitFlag() {
      let flag = false;
      let listFlag = false;
      let uploadingFlag = false;
      this.imageListLength = false;
      this.toClick = false;
      for (let i in this.imageList) {
        if (this.imageList[i].length !== 0) {
          listFlag = true;
          this.imageListLength = true;
          for (let j in this.imageList[i]) {
            if (this.imageList[i][j].uploading) {
              uploadingFlag = true;
              this.toClick = false;
            }
          }
        }
      }
      //        debugger;
      if (listFlag && !uploadingFlag) {
        flag = true;
        this.toClick = true;
      }
      return flag;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "showBigImg") {
      refreshFlag = false;
    } else {
      refreshFlag = true;
    }
    next(true);
  },
  beforeRouteLeave(to, from, next) {
    let that = this;
    if (to.name === "showBigImg") {
      next(true);
      return;
    }
    if (that.imageListLength || that.toClick) {
      console.log("confirm框");
      if (that.imageListLength && that.toClick) {
        that.leaveConfirmParams = {
          ensure: "现在提交",
          cancel: "暂不提交",
          title: "要提交上传的图片么？"
        };
      } else {
        that.leaveConfirmParams = {
          ensure: "取消",
          cancel: "离开",
          title: "努力上传中",
          content: "现在离开，下次还要重新上传哦"
        };
      }
      that.leaveConfirm = true;
      next(that.pageLeaveEnsure);
      if (that.pageLeaveEnsure) {
        that.leaveConfirm = false; //离开之后confirm框隐藏
        that.imageList = {}; //离开之后上传图片对象置为空
      }
      that.pageLeaveEnsure = false;
    } else {
      console.log("没有上传图片");
      that.imageList = {}; //离开之后上传图片对象置为空
      that.leaveConfirm = false; //离开之后confirm框隐藏
      next(true);
    }
  },
  mounted() {
    api.forbidShare();
  },
  activated() {
    this.leaveConfirm = false;
    refreshFlag && this.getUploadList();
    console.log("fuck");
    api.forbidShare();
    setTimeout(() => {
      if (navigator.userAgent.toLowerCase().includes("iphone")) {
        $(".ev-upLoadInput").removeAttr("capture");
      }
    }, 500);
  },
  methods: {
    getUploadList() {
      if (!localStorage.getItem("upload")) {
        localStorage.setItem("upload", JSON.stringify(this.$route.params));
      }
      this.uploadList = JSON.parse(localStorage.getItem("upload"));
      this.uploadList.forEach((element, index) => {
        this.$set(this.imageList, element.adviceId, []);
      });
    },
    upLoadPic(files, item, index, base64) {
      const that = this;
      //本地图片预览处理
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
      //上传请求
      api.ajax({
        url: XHRList.imgCreate,
        method: "POST",
        data: {
          fileContent: base64
            .split(",")[1]
            .replace(/\+/g, "%2B")
            .replace(/\n/g, ""),
          fileName: files.name,
          extName: files.name.split(".")[1],
          caseId: "",
          imageType: item.adviceType,
          caseCategoryId: ""
        },
        timeout: 300000,
        done(res) {
          if (res.responseObject.responseStatus) {
            let num = index
              ? index
              : that["imageList"][item.adviceId].length - 1; //图片索引，如果有值则是重传图片，替换已存数组中的键值；如果没有则是新上传的图片，取新上传图片所在数组的长度减一；
            that.$set(that.imageList[item.adviceId], num, {
              blob: res.responseObject.responseData.logoUrl,
              imgId: res.responseObject.responsePk,
              uploading: false,
              fail: false
            });
            //上传下一张图片
            that.uploadIndex = parseInt(that.uploadIndex) + 1;
            let totalUpNum = that["imageList"][item.adviceId].length;
            if (
              that.filesObj[that.uploadIndex] &&
              that.uploadIndex < that.filesObj.length &&
              totalUpNum < 9
            ) {
              that.upLoadPic(
                that.filesObj[that.uploadIndex],
                item,
                index,
                that.base64Arr[that.uploadIndex]
              );
            } else {
              that.loading = false; //放开上传权限
              if (that.filesObj[that.uploadIndex]) {
                that.errorShow = true;
                that.errorMsg = "图片最多上传9张！";
                setTimeout(() => {
                  that.errorShow = false;
                  that.errorMsg = "";
                }, 3000);
              }
            }
          } else {
            //接口异常上传失败处理
            let num = index
              ? index
              : that["imageList"][item.adviceId].length - 1;
            that["imageList"][item.adviceId][num].uploading = false;
            that["imageList"][item.adviceId][num].fail = true;
            that["imageList"][item.adviceId][num].finish = true;
            that.loading = false; //放开上传权限
          }
        },
        fail(res) {
          //网络异常上传失败处理
          let num = index ? index : that["imageList"][item.adviceId].length - 1;
          that["imageList"][item.adviceId][num].uploading = false;
          that["imageList"][item.adviceId][num].fail = true;
          that["imageList"][item.adviceId][num].finish = true;
          that.loading = false; //放开上传权限
        }
      });
    },
    //删除图片
    imgDelete(img, index, id) {
      const that = this;
      this.deletePicTip = true;
      this.deletePic.type = id;
      this.deletePic.index = index;
    },
    cancelDeletePic() {
      this.deletePic.type = "";
      this.deletePic.index = "";
      this.deletePicTip = false;
    },
    ensureDeletePic() {
      let _deletePic = this.deletePic;
      this["imageList"][_deletePic.type].splice(_deletePic.index, 1);
      this.deletePicTip = false;
    },
    //查看大图
    showBigImg(item, index, type) {
      let _params = {
        imgBlob: this["imageList"][type],
        indexNum: index
      };
      this.$router.push({
        name: "showBigImg",
        params: _params
      });
    },
    //图片读取
    onFileChange(e, item, index) {
      let files = e.target.files || e.dataTransfer.files;
      let that = this;
      let num = index ? index : that["imageList"][item.adviceId].length - 1;
      that.filesObj = [];
      that.base64Arr = [];
      that.uploadIndex = 0; //重置上传顺序索引
      if (!files.length) {
        return;
      }
      this.loading = true; //关闭上传权限
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 1024 * 1024 * 10) {
          this.errorShow = true;
          this.errorMsg = "图片不能超过10M";
          setTimeout(() => {
            this.errorMsg = "";
            this.errorShow = false;
            //放开上传权限（最后一张图是大于上传限制时触发）
            if (i == files.length - 1) {
              this.loading = false;
            }
          }, 3000);
        } else {
          that.filesObj.push(files[i]);
          //图片压缩处理
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = oFREvent => {
            imageCompress(
              {
                imgSrc: oFREvent.target.result,
                quality: 0.8
              },
              base64 => {
                that.base64Arr.push(base64); //保存压缩图片
                if (i == files.length - 1) {
                  this.upLoadPic(
                    that.filesObj[that.uploadIndex],
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
    },
    backToImPage() {
      const that = this;
      let _picIdList = "";
      this.leaveConfirm = false;
      for (let i of that.uploadList) {
        for (let k of that.imageList[i.adviceId]) {
          _picIdList += `${k.imgId},`;
        }
      }
      api.ajax({
        url: XHRList.saveImage,
        method: "POST",
        data: {
          caseId: api.getPara().caseId, //string	是	病例id
          idList: _picIdList.substring(0, _picIdList.length - 1) //string	是	附件id串
        },
        done(data) {
          if (
            data &&
            data.responseObject &&
            data.responseObject.responseStatus
          ) {
            that.pageLeaveEnsure = true;
            that.$router.push({
              path: "/BaseIm",
              query: {
                success: 1,
                queryType: "checkSuggest"
              }
            });
          }
        }
      });
    },
    //取消按钮
    cancelEvent() {
      let that = this;
      that.leaveConfirm = false;
      that.pageLeaveEnsure = true;
      that.$router.go(-1);
      //        this.leaveConfirm = false;
      //        this.pageLeaveEnsure = false;
      console.log("取消");
    },
    //离开函数
    ensureEvent() {
      let that = this;
      console.log("离开");
      if (!that.toClick) {
        this.leaveConfirm = false;
        this.pageLeaveEnsure = false;
      } else {
        that.backToImPage();
      }
    }
  },
  components: {
    Toast,
    Loading,
    confirm
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
@import "../../../../scss/library/_common-modules";

.tc-upLoadFile.fileUpload {
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
  .al-uploadNumLimit {
    @include font-dpr(16px);
    padding: rem(30px) rem(60px) rem(30px) rem(48px);

    span {
      display: inline-block;
      position: relative;
      // padding-left: rem(30px);
      padding: rem(10px) rem(30px) rem(10px) rem(65px);
      background-color: #fa787a2b;
      border-radius: 50px;
      width: 100%;
      box-sizing: border-box;
      color: #444444;
      &::before {
        position: absolute;
        content: "";
        display: inline-block;
        width: rem(28px);
        height: rem(28px);
        background: url("../../../common/image/img00/doctorHome/upLoadTip.png")
          no-repeat center;
        background-size: rem(28px) rem(28px);
        top: 50%;
        margin-top: rem(-14px);

        left: rem(20px);
      }
    }
  }
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
    border-bottom: rem(1px) solid #ffffff;
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
      width: 100%;
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
      margin: rem(8px);
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
        // margin-top: rem(8px);
        // margin-left: rem(8px);
        background-color: #000000;
        opacity: 0.63;
        z-index: 0;
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
      .tc-upLoadDel {
        position: absolute;
        //display: inline-block;
        width: rem(60px);
        height: rem(60px);
        top: rem(8px);
        right: rem(8px);
        background: url("../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png")
          no-repeat;
        background-position: top right;
        background-size: rem(38px) rem(38px);
        z-index: 1;
      }
      .tc-upLoadAddMore {
        display: inline-block;
        width: 0;
        height: 0;
        //position: relative;
        &:before {
          display: inline-block;
          content: "";
          position: absolute;
          width: rem(64px);
          height: rem(2px);
          background: #d8d8d8;
          top: 50%;
          left: 50%;
          margin-left: rem(-32px);
        }
        &:after {
          display: inline-block;
          content: "";
          position: absolute;
          width: rem(2px);
          height: rem(64px);
          background: #d8d8d8;
          top: 50%;
          margin-top: rem(-32px);
        }
      }
      .tc-upLoading {
        position: absolute;
        width: rem(40px);
        height: rem(40px);
        top: rem(44px);
        left: 50%;
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
      .tc-upLoadAfresh {
        color: #ffffff;
        position: absolute;
        width: rem(40px);
        height: rem(40px);
        top: rem(44px);
        left: 50%;
        margin-left: rem(-20px);
        background: url("/image/img00/patientConsult/symptom_refresh_loading@2x.png")
          no-repeat center;
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
        width: 100%;
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
    background-color: #00d6c6;
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
    background-color: #dfdfdf;
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
    @include font-dpr(14px);
  }
  .swiper-pagination.swiper-pagination-bullets {
    height: rem(37px);
    .swiper-pagination-bullet-active,
    .swiper-pagination-bullet {
      @include font-dpr(14px);
      width: rem(16px);
      height: rem(16px);
    }
  }
  .swiper-wrapper {
    height: 100%;
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
</style>
