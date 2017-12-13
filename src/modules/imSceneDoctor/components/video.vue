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
      <figcaption class="main-message-content image-message">
        <!-- <section class="middle-tip-box" v-if="progress.uploading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading..."
                 @click="">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section> -->
        <video class="im-image video-message" controls="controls" :src="videoMessage.file.url"  style="border-radius: 0.28rem"></video>
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
    }
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
</style>
