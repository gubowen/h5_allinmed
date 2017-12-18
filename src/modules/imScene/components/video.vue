<template>
  <section class="main-message-box">
    <article class="main-message-box-item"
             :data-clientid="videoMessage.idClient"
             :class="{'my-message':videoMessage.from===userData.account,
             'others-message':videoMessage.from===targetData.account}">
      <figure class="main-message-img" v-if="videoMessage.from===targetData.account">
        <img src="../../../common/image/imScene/chatting_portrait_system@2x.png" alt="">
      </figure>
      <i class="fail-button" style="display:none">
        <img src="../../../common/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content video-message-box">
        <!-- <transition name="fade">
          <span class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&contentMessage.from===userData.account">撤回</span>
        </transition> -->
        <header class="mulit-title">视频</header>
        <section class="mulitple-image-box">
          <figure class="mulitple-image" >
            <video class="im-video" ref="videoHtml" controls="controls" :src="videoMessage.file.url"></video>
            <img class="im-image" @click="videoPlay()" src="../../../common/image/imScene/play.png" alt="" style="border-radius: 0.28rem">
          </figure>
        </section>
      </figcaption>
      <figure class="main-message-img" v-if="videoMessage.from===userData.account">
        <img :src="logoUrl" alt="">
      </figure>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    logoUrl() {
      return this.$store.state.logoUrl;
    },
    progress() {
      if (this.currentIndex === this.videoProgress.index) {
        // return this.imageProgress;
        if (this.videoProgress.progress.includes(".")) {
          let returnObj = Object.assign(this.videoProgress, {
            progress: `${this.videoProgress.progress.split(".")[0]}%`
          });
          return returnObj;
        } else {
          return this.videoProgress;
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
  props: {
    videoMessage: {
      type: Object
    },
    targetData: {
      type: Object
    },
    userData: {
      type: Object
    },
    videoProgress: {
      type: Object
    },
    currentIndex: {
      type: Number
    },
  },
  methods : {
    // 播放视频路由
    videoPlay () {
      this.$refs.videoHtml.play();
      // this.$router.push({
      //   name: "videoPlay",
      //   params: {
      //     url: this.videoMessage.file.url
      //   }
      // });
    },
  },
  mounted() {
    console.log(this.videoMessage);
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules";
  .im-video{
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }
  .video-message-box{
    width: rem(514px);
  }
</style>
