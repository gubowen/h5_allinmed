<template>
  <section class="main-message-box" v-touch:long.stop="longTouchHandler">

    <article
      class="main-message-box-item"
      :data-clientid="imageMessage.idClient"
      :class="{'my-message':imageMessage.from===userData.account,
             'others-message':imageMessage.from===targetData.account}">
     <figure class="main-message-img" v-if="imageMessage.from===targetData.account">
        <img src="../../../common/image/imScene/chatting_portrait_system@2x.png" alt="">
      </figure>
      <i class="fail-button" style="display:none">
        <img src="../../../common/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content image-message-box">
        <!-- <transition name="fade">
          <span class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&contentMessage.from===userData.account">撤回</span>
        </transition> -->
        <section class="middle-tip-box" v-if="progress.uploading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading...">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <section class="mulitple-image-box" @click.stop="showBigImg">
          <figure class="mulitple-image">
            <img :src="imageMessage.file.url" alt="" v-touch:tap.stop.prevent="showBigImg">
          </figure>
        </section>
      </figcaption>i
      <figure class="main-message-img" v-if="imageMessage.from===userData.account">
        <img :src="logoUrl" alt="">
      </figure>
    </article>
  </section>
</template>
<script type="text/ecmascript-6">
/**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/17.
   */
export default {
  data() {
    return {
      imageNum: "", //图片列表中第几个
      showDeleteMsg: false
    };
  },
  computed: {
    logoUrl() {
      return this.$store.state.logoUrl;
    },
    progress() {
      if (this.currentIndex === this.imageProgress.index) {
        // return this.imageProgress;
        if (this.imageProgress.progress.includes(".")) {
          let returnObj = Object.assign(this.imageProgress, {
            progress: `${this.imageProgress.progress.split(".")[0]}%`
          });
          return returnObj;
        } else {
          return this.imageProgress;
        }
      } else {
        return {
          uploading: false,
          progress: "0",
          index: 0
        };
      }
    }
  },
  mounted() {
    if (!this.imageMessage.file.url.includes("blob:")) {
      let qualityUrl = this.nim.viewImageQuality({
        url: this.imageMessage.file.url,
        quality: 40
      });
      this.imageMessage.file.url = qualityUrl;
    }
    this.imageNum = this.imageMessage.file.url;
    // setTimeout(() => {
    //   document.body.scrollTop = Math.pow(10, 10);
    // }, 100);
  },
  methods: {
    showBigImg(item, index) {
      let that = this;
      let _indexNum = this.imageList.indexOf(this.imageNum) != -1 ? this.imageList.indexOf(this.imageNum) : this.imageList.indexOf(this.imageNum.split("?")[0]);
      this.showDeleteMsg = false;
      let _params = {
        imgBlob: (function() {
          let result = [];
          that.imageList.forEach((element, index) => {
            result.push({ blob: element });
          });
          return result;
        })(),
        indexNum: _indexNum
      };
      this.$router.push({
        name: "showBigImg",
        params: _params
      });
    },
    longTouchHandler() {
      this.showDeleteMsg = true;
      this.$emit("longTouchEmitHandler");
    },
    deleteMsgEvent() {
      this.showDeleteMsg = false;
      console.log("image组件里的我要删除");
      this.$emit("deleteMsgEvent");
    }
  },
  props: {
    imageMessage: {
      type: Object
    },
    nim: {
      type: Object
    },
    imageList: {
      type: Array
    },
    imageProgress: {
      type: Object
    },
    currentIndex: {
      type: Number
    },
    deleteMsgIndex: {
      type: Number
    },
    targetData: {
      type: Object
    },
    userData: {
      type: Object
    },
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
.delete-msg-btn {
  @include font-dpr(14px);
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: -1rem;
  line-height: rem(75px);
  text-align: center;
  display: block;
  transform: translateY(-50%);
  @include circle(rem(75px),#CCEDF2);
}
.image-message-box{
  width: rem(514px);
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
