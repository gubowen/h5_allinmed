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
      <figcaption class="main-message-content file-message-box">
        <!-- <transition name="fade">
          <span class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&contentMessage.from===userData.account">撤回</span>
        </transition> -->
        <!-- <header class="mulit-title">视频</header> -->
        <section class="middle-tip-box" v-if="progress.uploading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading...">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <section class="mulitple-image-box">
          <figure class="mulitple-image">
            <a :href="fileMessage.file.url" target="_blank">{{fileMessage.file.url}}</a>
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
      progress() {
        if (this.currentIndex === this.fileProgress.index) {
          // return this.imageProgress;
          if (this.fileProgress.progress.includes(".")) {
            let returnObj = Object.assign(this.fileProgress, {
              progress: `${this.fileProgress.progress.split(".")[0]}%`
            });
            return returnObj;
          } else {
            return this.fileProgress;
          }
        } else {
          return {
            uploading: false,
            progress: "0",
            index: 0
          };
        }
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
      fileProgress: {
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
