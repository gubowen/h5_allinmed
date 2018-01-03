<template>
  <section class="main-message-box" v-touch:long.stop="longTouchHandler">
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
      <figcaption class="main-message-content video-message-box":class="{'my-video':videoMessage.from===userData.account}">
        <transition name="fade">
          <button class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&videoMessage.from===userData.account">撤回</button>
        </transition>
        <section class="middle-tip-box" v-if="videoMessage.loading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading...">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <header class="mulit-title" v-if="videoMessage.from===targetData.account">视频</header>
        <section class="mulitple-image-box">
          <figure class="mulitple-image" >
            <video class="im-video" ref="videoHtml" controls="controls" :src="videoMessage.file.url"></video>
            <img class="im-image" @click="videoPlay()" src="../../../common/image/imScene/video_play@76.png" alt="" style="border-radius: 0.28rem">
          </figure>
          <section class="tips-content" v-if="videoMessage.from===targetData.account">
            重要提示：在线咨询不能代替面诊，医生建议仅供参考。
          </section>
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
    return {
      showDeleteMsg:false,//撤回按钮是否显示
    };
  },
  computed: {
    logoUrl() {
      return this.$store.state.logoUrl;
    },
    progress() {
      // if (this.currentIndex === this.videoProgress.index) {
        // return this.imageProgress;
        if (this.videoProgress.progress.includes(".")) {
          let returnObj = Object.assign(this.videoProgress, {
            progress: `${this.videoProgress.progress.split(".")[0]}%`
          });
          return returnObj;
        } else {
          return this.videoProgress;
        }
      // } else {
        // return {
        //   uploading: false,
        //   progress: "0",
        //   index: 0
        // };
      // }
    }
  },
  props: {
    videoMessage: {
      type: Object
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
    longTouchHandler() {
      this.showDeleteMsg = true;
      this.$emit("longTouchEmitHandler");
    },
    deleteMsgEvent() {
      this.showDeleteMsg = false;
      console.log("video组件里的我要删除");
      this.$emit("deleteMsgEvent");
    }
  },
  mounted() {
    console.log(this.videoMessage);
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules";

  .video-message-box{
    position: relative;
  }
  .tips-content{
    padding:rem(18px) rem(36px);
    background: #FAFAFB;
    color: #97A8BA;
    @include font-dpr(13px);
    // border: 1px solid  #e4e9eb;
    border-top: none;
    margin: rem(34px) rem(-36px) 0;
    border-bottom-right-radius: rem(21px);
    border-bottom-left-radius: rem(21px);
  }
  .im-video{
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }
  .mulitple-image{
    display: inline-block;
    margin-right: rem(20px);
    position: relative;
    width: rem(200px);
    height: rem(200px);
    background: url("../../../../src/common/image/imScene/default_video.jpg");
    background-size: 100% 100%;
    border-radius: 0.28rem;
    & > img {
      width: rem(76px);
      height: rem(76px);
      vertical-align: top;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: rem(-38px);
      margin-top: rem(-38px);
    }
    &:nth-child(1) {
      // margin: 0;
    }
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
  .im-image{
    width: rem(132px);
    height: rem(132px);
  }
  .video-message-box{
    width: rem(514px);
  }
  .main-message-box-item.others-message > .main-message-content{
    padding-bottom: 0;
  }
  .mulit-title {
    padding-bottom: rem(24px);
    border-bottom: 1px solid #d8d8d8;
    @include font-dpr(17px);
    color: #222222;
  }
  .main-message-box-item.my-message > .main-message-content.video-message-box{
    padding: 0;
    width: rem(200px);
    height: rem(200px);

    border-top-right-radius:0.28rem;
    .mulitple-image-box{
      padding-top: 0;
    }
  }
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
</style>
