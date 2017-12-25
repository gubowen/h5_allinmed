<template>
  <section class="main-message-box">
    <article class="main-message-box-item"
             :data-clientid="fileMessage.idClient"
             :class="{'my-message':fileMessage.from===userData.account,
             'others-message':fileMessage.from===targetData.account}">
      <figure class="main-message-img" v-if="fileMessage.from===targetData.account">
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
          <figure class="mulitple-image">
            <a :href="fileMessage.file.url" target="_blank">{{fileMessage.file.name}}}</a>
          </figure>
        </section>
      </figcaption>
      <figure class="main-message-img" v-if="fileMessage.from===userData.account">
        <img :src="logoUrl" alt="">
      </figure>
    </article>
  </section>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      logoUrl() {
        return this.$store.state.logoUrl;
      },
    },
    props: {
      fileMessage: {
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
      deleteMsgIndex: {
        type: Number
      }
    },
    methods: {},
    mounted() {
      console.log(this.fileMessage)
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
