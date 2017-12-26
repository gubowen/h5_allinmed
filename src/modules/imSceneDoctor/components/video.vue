<template>
    <section class="main-message-box">
    <article class="main-message-box-item"
             :data-clientid="videoMessage.idClient"
             :class="{'my-message':videoMessage.from===userData.account,
             'others-message':videoMessage.from===targetData.account}">
      <figure class="main-message-img" v-if="videoMessage.from===targetData.account">
        <img :src="targetLogo" alt="">
      </figure>
      <i class="fail-button" style="display:none">
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content video-message-box">
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
        <header class="mulit-title">视频</header>
        <section class="mulitple-image-box">
          <figure class="mulitple-image" >
            <video class="im-video" ref="videoHtml" controls="controls" :src="videoMessage.file.url"></video>
            <img class="im-image" @click="videoPlay()" src="../../../common/image/imScene/play.png" alt="" style="border-radius: 0.28rem">
          </figure>
        </section>
        <article class="disclaimer-content" v-if="videoMessage.from===targetData.account">
          <span>重要提示：在线咨询不能代替面诊，医生建议仅供参考。</span>
        </article>
      </figcaption>
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
    targetLogo() {
      return this.$store.state.targetMsg.avatar.length === 0
        ? "/src/common/image/imScene/default.png"
        : this.$store.state.targetMsg.avatar;
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
    videoProgress: {
      type: Object
    },
    targetData: {
      type: Object
    },
    userData: {
      type: Object
    },
    currentIndex: {
      type: Number
    },
  },
  mounted() {
    console.log(this.videoMessage);
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
.video-message{
  width:2rem;
  height: 2rem;
}
.mulit-title {
  padding-bottom: rem(24px);
  border-bottom: 1px solid #d8d8d8;
  @include font-dpr(17px);
  color: #222222;
}
.multiple-box{
  min-width: 6.8rem;
}
.mulitple-image-box {
  text-align: left;
  padding-top: rem(24px);

  & > .mulitple-image {
    display: inline-block;
    margin-right: rem(20px);
    & > img {
      width: rem(132px);
      height: rem(132px);
      vertical-align: top;
    }
    &:nth-child(1) {
      // margin: 0;
    }
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
.im-video{
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
}
</style>
