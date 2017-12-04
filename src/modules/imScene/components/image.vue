<template>
  <section class="main-message-box" v-touch:long.stop="longTouchHandler">
    <article class="main-message-box-item my-message" data-clientid="9c5718e331459678f2a759f16c90dd7c">
      <i class="fail-button" style="display:none">
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content image-message">
        <transition name="fade">
          <button class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg">撤回</button>
        </transition>
        <section class="middle-tip-box" v-if="progress.uploading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading...">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <img class="im-image"  v-touch:tap="showBigImg" :src="imageMessage.file.url" alt="" style="border-radius: 0.28rem">
      </figcaption>
      <figure class="main-message-img">
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
      console.log('image组件里的我要删除');
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
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
