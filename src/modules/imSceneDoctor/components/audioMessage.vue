<template>
  <section class="main-message-box">
    <article class="main-message-box-item others-message" @click="audioPlay">
      <figure class="main-message-img" @click.stop="$emit('clickLogo')">
        <img :src="targetLogo" alt="">
      </figure>
      <figcaption class="main-message-content audio-message" :class="{'playing':playing===true}">
        <p>
          <audio class="voice-message" ref="audioElement">
            <source
              :src="audioMessage.file.mp3Url"
              type="audio/mpeg">
          </audio>
          <span>{{formatTime}}</span>
        </p>
        <article class="disclaimer-content" v-if="audioMessage.from===targetData.account">
          <span>重要提示：在线咨询不能代替面诊，医生建议仅供参考。</span>
        </article>
      </figcaption>
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
   * Created by qiangkailiang on 2017/8/31.
   */
  export default{
    data(){
      return {
        playing: false
      }
    },
    mounted(){

    },
    methods: {
      audioPlay(){
        this.playing = true;
        const audio = this.$refs.audioElement;
        audio.addEventListener("ended", () => {
          this.playing = false;
        });
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      },
    },
    computed: {
      targetLogo(){
        return this.$store.state.targetMsg.avatar.length===0? "/src/common/image/imScene/default.png":this.$store.state.targetMsg.avatar;
      },
      formatTime(){
        const time = this.audioMessage.file.dur;
        let result = "",
          fTime = Math.round(time / 1000);

        if (fTime < 10) {
          result = "0:0" + fTime;
        } else if (fTime >= 10 && fTime < 60) {
          result = "0:" + fTime;
        } else {
          result = "1:00";
        }
        return result;
      }
    },
    props: {
      audioMessage: {
        type: Object
      },
      targetData: {
        type: Object
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .audio-message {
    width: 6.8rem;
    text-align: right;
    position: relative;
    &.playing:before{
      animation:fade_in_out 1s linear infinite;
    }
    .disclaimer-content{
      text-align: left;
    }
    &:before {
      content: '';
      width: rem(40px);
      height: rem(40px);
      display: inline-block;
      vertical-align: middle;
      position: absolute;
      left: rem(20px);
/*      top: 50%;
      margin-top: rem(-20px);*/
      background: url("../../../../src/common/image/imScene/chat_play.png") no-repeat;
      background-size: contain;
    }
  }
  @include keyframes(fade_in_out){
    0%{
      opacity: 1;
    }
    50%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
</style>
