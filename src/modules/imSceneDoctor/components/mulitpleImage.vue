<template>
  <section class="main-message-box" v-touch:long="longTouchHandler">
    <article
      class="main-message-box-item my-message"
      :data-clientid="imageMessage.idClient">

      <i class="fail-button" style="display:none">
        <img src="../../../common/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content multiple-box image-type">
         <transition name="fade">
          <span class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&imageMessage.from===userData.account">撤回</span>
        </transition>
        <section class="middle-tip-modal" v-if="imageMessage.loading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading...">
          </figure>
        </section>

        <header class="mulit-title">图片({{imageList.length}})</header>
        <section class="mulitple-image-box" @click.stop="showBigImg">
          <figure class="mulitple-image" v-for="item in imageList.slice(0,3)">
            <img :src="item.url" alt="">
          </figure>
        </section>
      </figcaption>

      <figure class="main-message-img" v-if="imageMessage.from===userData.account">
        <img :src="logoUrl" alt="">
      </figure>
    </article>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        imageList: [],
        showDeleteMsg: false
      };
    },
    watch: {
      "imageMessage"(data) {
        this.imageList = JSON.parse(data.content).data.list;
      }
    },
    components: {},
    methods: {
      showBigImg() {
        let that = this;
        let _indexNum =0;
        this.showDeleteMsg = false;
        let _params = {
          imgBlob: (function() {
            let result = [];
            that.imageList.forEach((element, index) => {
              result.push({ blob: element.url });
            });
            return result;
          })(),
          indexNum: 0
        };

        this.$router.push({
          name: "showBigImg",
          params: _params
        });
      },
      longTouchHandler() {
        if (this.$store.state.toolbarConfig.delete) {
          this.showDeleteMsg = true;
          this.$emit("longTouchEmitHandler");
        }
      },
      deleteMsgEvent() {
        this.showDeleteMsg = false;
        this.$emit("deleteMsgEvent");
      }
    },
    mounted() {
      this.imageList = JSON.parse(this.imageMessage.content).data.list;
    },
    computed: {
      logoUrl() {
        return this.$store.state.logoUrl;
      }
    },
    props: {
      imageMessage: {
        type: Object,
        default: {}
      },
      targetData: {
        type: Object
      },
      userData: {
        type: Object
      },
      mulitpleLoading: {
        type: Boolean
      },
      currentIndex:{
        type:Number
      },
      deleteMsgIndex:{
        type:Number
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .mulit-title {
    padding-bottom: rem(24px);
    border-bottom: 1px solid #d8d8d8;
    @include font-dpr(17px);
    color: #222222;
  }

  .multiple-box {
    min-width: 6.8rem;
    position: relative;
    &.image-type{
      .mulitple-image-box {

        & > .mulitple-image {
          width: rem(132px);
          height: rem(132px);
          /*margin-right: 0;*/
          & > img {
            width: 100%;
            height: 100%;
            position: static;
            margin-top: 0;
            margin-left: 0;
          }
          &:nth-child(1) {
            // margin: 0;
          }
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
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

    .middle-tip-modal {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      transform: translate(0,0);
      text-align: center;
      border-radius: rem(21px);
      &:before{
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
      .middle-tip-modal .middle-tip-box-text > img {
        width: 0.53333rem;
        height: 0.53333rem;
        border-radius: 50%;
        background-color: transparent;
        -webkit-animation: rotate 1s linear forwards infinite;
        animation: rotate 1s linear forwards infinite;
      }
    }

  }


  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
