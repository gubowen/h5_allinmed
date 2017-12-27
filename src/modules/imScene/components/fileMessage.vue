<template>
  <section class="main-message-box" v-touch:long.stop="longTouchHandler">
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
        <transition name="fade">
          <button class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&fileMessage.from===userData.account">撤回</button>
        </transition>
        <!-- <header class="mulit-title">视频</header> -->
        <section class="middle-tip-box" v-if="progress.uploading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading...">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <section class="file-box">
          <figure class="file-content" @click.stop="seeFile()">
            <img class="file-image" src="../../../common/image/imScene/pdf@3x.png">
            <!-- <figcaption class="file-name">{{fileMessage.file.fileName}}</figcaption> -->
            <figcaption class="file-name">{{custom.name}}</figcaption>
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
      return {
        custom:{name:''},
        showDeleteMsg:false,//撤回按钮是否显示
      }
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
    methods: {
      seeFile(){
        location.href = this.fileMessage.file.url;
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
      console.log(this.fileMessage)
      this.custom = JSON.parse(this.fileMessage.custom);
      console.log(this.custom);
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
  .file-content{
    width: rem(442px);
    height: rem(132px);
    background: #EDEEEE;
    @include clearfix();
    .file-image{
      width: rem(104px);
      height: rem(132px);
    }
    .file-name{
      float: right;
      width: rem(306px);
      vertical-align: top;
      color: #333333;
      @include font-dpr(15px);
      box-sizing: border-box;
      margin: rem(30px) rem(22px) rem(30px) rem(0px);
      display:-webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
</style>
