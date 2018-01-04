<template>
  <section class="main-message-box" v-touch:long="longTouchHandler">
    <article class="main-message-box-item"
             :data-clientid="imageMessage.idClient"
             :class="{'my-message':imageMessage.from===userData.account,
             'others-message':imageMessage.from===targetData.account}">
      <figure class="main-message-img" v-if="imageMessage.from===targetData.account" @click.stop="$emit('clickLogo')">
        <img :src="targetLogo" alt="">
      </figure>
      <i class="fail-button" style="display:none">
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content image-message">
        <section class="middle-tip-box" v-if="progress.uploading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading..."
                 @click="">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <transition name="fade">
          <span class="delete-msg-btn" @click.stop="deleteMsgEvent"
                v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&imageMessage.from===userData.account">撤回</span>
        </transition>
        <img class="im-image" @click.stop="showBigImg" :src="imageMessage.file.url" alt=""
             style="border-radius: 0.28rem">
        <article class="disclaimer-content" v-if="imageMessage.from===targetData.account">
          <span>重要提示：在线咨询不能代替面诊，医生建议仅供参考。</span>
        </article>
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
        showDeleteMsg: false
      }
    },
    computed: {
      progress() {
        if (this.currentIndex === this.imageProgress.index) {
          // return this.imageProgress;
          if (this.imageProgress.progress.includes(".")) {
            let returnObj = Object.assign(this.imageProgress, {
              progress: `${this.imageProgress.progress.split(".")[0]}%`
            })
            return returnObj;
          } else {
            return this.imageProgress;
          }
        } else {
          return {
            uploading: false,
            progress: "0",
            index: 0
          }
        }
      },

      logoUrl() {
        return this.$store.state.logoUrl
      },
      targetLogo() {
        return this.$store.state.targetMsg.avatar.length === 0 ? "/src/common/image/imScene/default.png" : this.$store.state.targetMsg.avatar;
      }

    },
    mounted() {
      this.imageNum = "";
      if (!this.imageMessage.file.url.includes("blob:")) {
        let qualityUrl = this.nim.viewImageQuality({
          url: this.imageMessage.file.url,
          quality: 40
        });
        this.imageMessage.file.url = qualityUrl;

      }
      setTimeout(() => {
        document.body.scrollTop = Math.pow(10, 10);
      }, 100);


    },
    methods: {
      longTouchHandler() {
        if (this.$store.state.toolbarConfig.delete) {
          this.showDeleteMsg = true;
          this.$emit("longTouchEmitHandler");
        }
      },
      deleteMsgEvent() {
        this.showDeleteMsg = false;
        this.$emit("deleteMsgEvent");
      },
      showBigImg(item, index) {
        let that = this;
        let _params = {
          imgBlob: (function () {
            let result = [];
            that.imageList.forEach((element, index) => {
              result.push({blob: element});
            });
            return result;
          }()),
          indexNum: this.imageList.indexOf(this.imageMessage.file.url)
        };
        this.$router.push({
          name: "showBigImg",
          params: _params
        });
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
      targetData: {
        type: Object
      },
      deleteMsgIndex: {
        type: Number
      },
      userData: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .image-message {
    background-color: #fff !important;
    .im-image {
      margin: rem(36px);
    }
    .disclaimer-content {
      color: #97A8BA;
      background: #fafafb;
      @include font-dpr(13px);
      margin: 0;
      padding: rem(20px) rem(36px);
      box-sizing: border-box;
      border-radius: rem(21px);
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 2px solid #d8d8d8;
    }
  }
</style>
