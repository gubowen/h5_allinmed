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
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content image-message">
        <transition name="fade">
          <button class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&imageMessage.from===userData.account">撤回</button>
        </transition>
        <section class="middle-tip-box" v-if="imageMessage.loading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading...">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <img class="im-image"  v-touch:tap.stop.prevent="showBigImg" :src="imageMessage.file.url" alt="">
        <section class="tips-content" v-if="imageMessage.from===targetData.account">
          重要提示：在线咨询不能代替面诊，医生建议仅供参考。
        </section>
      </figcaption>
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
    // 配合watch图片的url 变化
    imageUrl () {
      return this.imageMessage.file.url;
    },
    progress() {
      // if (this.currentIndex === this.imageProgress.index) {
        // return this.imageProgress;
        if (this.imageProgress.progress.includes(".")) {
          let returnObj = Object.assign(this.imageProgress, {
            progress: `${this.imageProgress.progress.split(".")[0]}%`
          });
          return returnObj;
        } else {
          return this.imageProgress;
        }
      // } else {
      //   return {
      //     uploading: false,
      //     progress: "0",
      //     index: 0
      //   };
      // }
    }
  },
  watch : {
    imageUrl (newVal, oldVal) {
      this.imageNum = newVal;
    },
  },
  mounted() {
    // debugger;
    if (!this.imageMessage.file.url.includes("blob:")) {
      let qualityUrl = this.nim.viewImageQuality({
        url: this.imageMessage.file.url,
        quality: 40
      });
      this.imageMessage.file.url = qualityUrl;
    }
    this.imageNum = this.imageMessage.file.url;
  },
  methods: {
    showBigImg(item, index) {
      let that = this;
      this.showDeleteMsg = false;
      let _params = {
        imgBlob: (function() {
          let result = [];
          that.imageList.forEach((element, index) => {
            result.push({ blob: element });
          });
          return result;
        })(),
        indexNum: this.imageList.indexOf(this.imageNum)
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
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../scss/library/_common-modules";
.delete-msg-btn {
  @include font-dpr(14px);
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: -2rem;
  text-indent: -.2rem;
  color: #fff;
  line-height: rem(70px);
  text-align: center;
  display: block;
  transform:translateY(-50%);
  width: rem(136px);
  height: rem(70px);
  background: url("../../../../src/common/image/imScene/bullet_withdraw.png");
  background-size: 100% 100%;
}

.image-message{
  background-color: #ffffff;
}
.tips-content{
  padding:rem(18px) rem(36px);
  background: #FAFAFB;
  color: #97A8BA;
  @include font-dpr(13px);
  // border: 1px solid  #e4e9eb;
  // border-top: none;
  border-bottom-right-radius: rem(21px);
  border-bottom-left-radius: rem(21px);
}
.my-message{
  .im-image{
    border-radius: 0.28rem
  }
}
.main-message-box-item.others-message{
  .image-message{
    background-color: #ffffff;
    .im-image{
      margin:rem(36px);
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
</style>
